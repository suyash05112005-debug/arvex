"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Procedural luxury chandelier — crystal pendants on a polished champagne frame.
 * Composition tuned for editorial framing: low-and-slow rotation, soft
 * three-point studio light, warm ambient bounce. Reads as a real fixture.
 */

const CHAMPAGNE = "#C29A50";          // Darker brushed-brass tone — reads as metal, not gloss
const CHAMPAGNE_HIGHLIGHT = "#E5C57E"; // Used on top crown ring for depth
const CRYSTAL_TINT = "#FFFCEF";        // Slightly warmer crystal than pure ivory
const WARM_GLOW = "#F8E7C2";           // Inner light — candle warmth
const WARM_BOUNCE = "#FFE9C2";         // Soft warm fill

function CrystalPendants({
  count = 72,
  radius = 1.18,
  height = 4.4,
}: {
  count?: number;
  radius?: number;
  height?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Crystals are arranged along a controlled "skirt" curve. Two staggered
  // tiers per turn keeps the silhouette legible from any angle.
  const pendants = useMemo(() => {
    const arr: { x: number; y: number; z: number; phase: number; scale: number }[] = [];
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 2 * 3;
      const r = radius * (0.6 + 0.4 * Math.sin(t * Math.PI));
      // Slight vertical alternation between tiers — a magazine-y stagger.
      const tier = i % 2 === 0 ? 0 : -0.05;
      const y =
        -height * 0.5 * (0.35 + 0.65 * (1.0 - Math.cos(t * Math.PI)) * 0.5) + tier;
      arr.push({
        x: Math.cos(angle) * r,
        y,
        z: Math.sin(angle) * r,
        phase: t * Math.PI * 6,
        scale: 0.13 + 0.04 * Math.sin(t * Math.PI),
      });
    }
    return arr;
  }, [count, radius, height]);

  useFrame((state) => {
    if (group.current) {
      // Almost imperceptible — luxury rotates barely.
      group.current.rotation.y = state.clock.elapsedTime * 0.025;
    }
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    pendants.forEach((p, i) => {
      // Tiny crystal-on-thread sway. 0.012 is just enough to feel alive.
      const sway = Math.sin(t * 0.45 + p.phase) * 0.012;
      dummy.position.set(p.x, p.y + sway, p.z);
      dummy.scale.setScalar(p.scale);
      dummy.rotation.set(0, p.phase, sway * 6);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        {/* Octahedron reads as a faceted crystal teardrop — the most architectural cut. */}
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={CRYSTAL_TINT}
          transmission={0.96}
          thickness={0.55}
          roughness={0.02}
          metalness={0}
          ior={1.48}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.2}
          attenuationColor={WARM_GLOW}
          attenuationDistance={3.2}
          specularIntensity={1}
        />
      </instancedMesh>
    </group>
  );
}

function ChampagneSpine() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.025;
  });

  return (
    <group ref={ref}>
      {/* Crown ring — top, slightly thicker for visual weight */}
      <mesh position={[0, 1.4, 0]}>
        <torusGeometry args={[1.08, 0.04, 48, 240]} />
        <meshPhysicalMaterial
          color={CHAMPAGNE_HIGHLIGHT}
          metalness={1}
          roughness={0.14}
          envMapIntensity={1.4}
          clearcoat={0.7}
          clearcoatRoughness={0.1}
        />
      </mesh>
      {/* Mid-ring — accent */}
      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[1.26, 0.022, 32, 220]} />
        <meshPhysicalMaterial
          color={CHAMPAGNE}
          metalness={1}
          roughness={0.18}
          envMapIntensity={1.15}
        />
      </mesh>
      {/* Lower ring — footprint */}
      <mesh position={[0, -1.55, 0]}>
        <torusGeometry args={[0.82, 0.03, 32, 200]} />
        <meshPhysicalMaterial
          color={CHAMPAGNE}
          metalness={1}
          roughness={0.16}
          envMapIntensity={1.2}
          clearcoat={0.5}
        />
      </mesh>
      {/* Suspension cable — graphite, thin, restrained */}
      <mesh position={[0, 2.55, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 1.95, 8]} />
        <meshBasicMaterial color="#1F1B16" />
      </mesh>
      {/* Canopy at the top, suggests an architectural ceiling mount */}
      <mesh position={[0, 3.55, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.05, 48]} />
        <meshPhysicalMaterial
          color={CHAMPAGNE}
          metalness={1}
          roughness={0.2}
          clearcoat={0.5}
        />
      </mesh>
    </group>
  );
}

function CoreLuminaire() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    // Candle-flame breathing — barely perceptible.
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.55) * 0.01;
    ref.current.scale.setScalar(s);
  });
  return (
    <group>
      <mesh ref={ref} position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.26, 64, 64]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          emissive={WARM_GLOW}
          emissiveIntensity={1.6}
          roughness={0}
          transmission={0.96}
          thickness={1.2}
          ior={1.5}
        />
      </mesh>
      {/* Inner warm bloom — anchors the visible light source. */}
      <pointLight
        position={[0, 0.1, 0]}
        intensity={2.4}
        color={WARM_GLOW}
        distance={5.2}
        decay={1.7}
      />
      {/* Up-light to give the brass crown a believable highlight. */}
      <pointLight
        position={[0, 0.9, 0]}
        intensity={0.6}
        color={WARM_BOUNCE}
        distance={2.5}
        decay={2}
      />
    </group>
  );
}

function Chandelier() {
  return (
    <Float
      floatIntensity={0.08}
      rotationIntensity={0.04}
      speed={0.55}
    >
      <group position={[0, -0.2, 0]}>
        <ChampagneSpine />
        <CrystalPendants />
        <CoreLuminaire />
      </group>
    </Float>
  );
}

export function ChandelierScene({
  className,
}: {
  className?: string;
  variant?: "hero" | "compact";
}) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.4, 5.7], fov: 34 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        {/* Three-point studio lighting — warm key, soft fill, cool rim. */}
        <ambientLight intensity={0.42} color="#FFF7E5" />
        {/* Key light — warm, upper-front-right */}
        <directionalLight
          position={[6, 9, 4]}
          intensity={1.25}
          color="#FFE9C2"
        />
        {/* Fill — soft, opposite side */}
        <directionalLight
          position={[-6, 3, -2]}
          intensity={0.32}
          color="#F8E7C2"
        />
        {/* Rim — quiet cool edge to separate from background */}
        <directionalLight
          position={[0, 2, -6]}
          intensity={0.45}
          color="#FFFFFF"
        />
        {/* Subtle uplight from below to catch the underside of the brass */}
        <pointLight
          position={[0, -2.4, 0]}
          intensity={0.45}
          color="#F4E9D5"
          distance={3.2}
          decay={2}
        />

        <Suspense fallback={null}>
          <Chandelier />
          {/* Long, soft floor shadow — anchors the fixture in a believable space. */}
          <ContactShadows
            position={[0, -2.55, 0]}
            opacity={0.28}
            blur={2.8}
            far={4.5}
            scale={6}
            color="#3E3017"
          />
          <Environment preset="apartment" environmentIntensity={0.55} />
        </Suspense>
      </Canvas>
    </div>
  );
}
