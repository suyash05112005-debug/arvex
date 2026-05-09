"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Warm ivory flow — calm, editorial, sits quietly behind type.
// Reads as a softly lit photograph, not a screensaver.
const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(1.4, 1.0);
    float t = uTime * 0.018; // slower, more meditative drift

    vec2 q = vec2(fbm(p + t), fbm(p - t + 1.7));
    float f = fbm(p + q);

    // Warm luxury palette: ivory base with restrained champagne and soft taupe.
    vec3 base       = vec3(0.984, 0.965, 0.925); // ivory
    vec3 champagne  = vec3(0.957, 0.920, 0.788); // soft champagne
    vec3 taupe      = vec3(0.890, 0.842, 0.776); // warm taupe shadow
    vec3 cream      = vec3(0.961, 0.918, 0.835); // warm cream highlight

    vec3 col = base;
    col = mix(col, champagne, smoothstep(0.45, 0.95, f) * 0.18);
    col = mix(col, cream,     smoothstep(0.55, 0.95, q.x) * 0.10);
    col = mix(col, taupe,     smoothstep(0.30, 0.85, 1.0 - f) * 0.08);

    // Editorial vignette — luminous toward upper-left, warmer toward lower-right.
    float vTop = smoothstep(1.05, 0.05, length(uv - vec2(0.42, 0.18)));
    col *= 0.94 + 0.06 * vTop;

    // Subtle warm tint toward bottom edges, like a softbox spill.
    float warmth = smoothstep(0.0, 1.0, uv.y);
    col = mix(col, col * vec3(1.02, 0.99, 0.95), warmth * 0.22);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function ShaderBackground({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      >
        <Plane />
      </Canvas>
    </div>
  );
}
