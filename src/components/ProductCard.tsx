"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import type { Product } from "@/data/products";

/**
 * Pseudo-3D parallax card. Tracks pointer, drives:
 *   - container 3D tilt
 *   - per-layer translateZ-equivalent (translate × depth)
 *   - specular sheen sweep
 */
export function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  // Restrained tilt — luxury cards lean, not lunge.
  const rotX = useSpring(useTransform(my, [0, 1], [3.5, -3.5]), { stiffness: 200, damping: 26 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-4.5, 4.5]), { stiffness: 200, damping: 26 });

  // Specular sweep (CSS gradient angle moves with cursor).
  const sheenX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(my, [0, 1], ["0%", "100%"]);

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1,
        delay: (index % 6) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1600 }}
      className="group"
    >
      <Link
        ref={ref}
        href={`/product/${product.slug}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="block"
      >
        {/* Picture light — a tiny ambient halo above the card */}
        <div
          aria-hidden
          className="pointer-events-none mx-auto h-3 w-[55%] picture-light opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />

        <motion.div
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-ivory shadow-editorial transition-[transform,box-shadow] duration-[700ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:shadow-glass-hover"
        >
          {/* Gradient backdrop — always present, becomes a placeholder when an
              image is loading and the fallback when no image exists. */}
          <ParallaxLayers product={product} mx={mx} my={my} />

          {/* Real photography, when generated */}
          {product.images.hero && (
            <Image
              src={product.images.hero}
              alt={`${product.name} chandelier — ${product.tagline}`}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-center transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
              priority={index < 4}
            />
          )}

          {/* Specular sheen — softened, low opacity. Shines on real photo too. */}
          <motion.div
            style={{
              background: useTransform(
                [sheenX, sheenY],
                ([x, y]) =>
                  `radial-gradient(circle at ${x} ${y}, rgba(255,247,229,0.55) 0%, rgba(255,247,229,0) 42%)`
              ),
            }}
            className="pointer-events-none absolute inset-0 mix-blend-screen opacity-60"
          />

          {/* Subtle internal vignette — pulls focus to centerpiece */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_45%,transparent_0%,rgba(54,42,22,0.08)_100%)]" />

          {/* Top-edge picture light spill — softer when real image is present */}
          <div
            className={
              product.images.hero
                ? "pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-warm-cream/12 to-transparent"
                : "pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-warm-cream/35 to-transparent"
            }
          />

          {/* Bottom-edge soft floor catch */}
          <div
            className={
              product.images.hero
                ? "pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-graphite/30 via-graphite/10 to-transparent"
                : "pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-warm-taupe/20 to-transparent"
            }
          />

          {/* Museum-glass inner frame */}
          <div className="pointer-events-none absolute inset-3 rounded-[1px] ring-1 ring-inset ring-white/30" />
          <div className="pointer-events-none absolute inset-3 rounded-[1px] ring-1 ring-inset ring-graphite/[0.04]" />

          {/* Edition number — top-left */}
          <div
            className={
              product.images.hero
                ? "pointer-events-none absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.32em] text-ivory/85 drop-shadow"
                : "pointer-events-none absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.32em] text-graphite/55"
            }
          >
            № {String(index + 1).padStart(2, "0")}
          </div>

          {/* Hover prompt — bottom-right, animates with line */}
          <div
            className={
              product.images.hero
                ? "pointer-events-none absolute right-5 bottom-5 flex translate-y-1 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-ivory/90 opacity-0 transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
                : "pointer-events-none absolute right-5 bottom-5 flex translate-y-1 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite/65 opacity-0 transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
            }
          >
            <span className="h-px w-5 bg-champagne-500" />
            View piece
          </div>
        </motion.div>

        {/* Caption — editorial, jewelry-card spacing */}
        <div className="mt-5 flex items-start justify-between gap-3 md:mt-6 md:gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-[20px] leading-[1.15] tracking-tight text-graphite transition-colors duration-500 group-hover:text-ink md:text-[24px]">
              {product.name}
            </h3>
            <p className="mt-1.5 font-sans text-[13px] leading-[1.5] text-graphite/55 md:mt-2 md:text-[13.5px] md:leading-[1.55]">
              {product.tagline}
            </p>
          </div>
          <span className="shrink-0 pt-1 font-mono text-[9px] uppercase tracking-[0.26em] text-champagne-600 md:pt-1.5 md:text-[10px] md:tracking-[0.28em]">
            {product.edition}
          </span>
        </div>

        {/* Materials — quiet luxury detail line */}
        <div className="mt-3 flex items-center gap-3 md:mt-3.5">
          <span className="h-px w-6 bg-champagne-300 transition-all duration-500 group-hover:w-12 group-hover:bg-champagne-500 md:w-7" />
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-graphite/50 md:text-[10px] md:tracking-[0.26em]">
            {product.materials.slice(0, 2).join(" · ")}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function ParallaxLayers({
  product,
  mx,
  my,
}: {
  product: Product;
  mx: ReturnType<typeof useMotionValue<number>>;
  my: ReturnType<typeof useMotionValue<number>>;
}) {
  return (
    <>
      {product.layers.map((layer, i) => (
        <ParallaxLayer key={i} layer={layer} index={i} mx={mx} my={my} />
      ))}
      <SilhouetteBadge category={product.category} mx={mx} my={my} />
    </>
  );
}

function ParallaxLayer({
  layer,
  index,
  mx,
  my,
}: {
  layer: Product["layers"][number];
  index: number;
  mx: ReturnType<typeof useMotionValue<number>>;
  my: ReturnType<typeof useMotionValue<number>>;
}) {
  const factor = 8 * layer.depth;
  const tx = useTransform(mx, [0, 1], [factor, -factor]);
  const ty = useTransform(my, [0, 1], [factor, -factor]);
  const blur = layer.depth > 0.7 ? "blur(0.3px)" : undefined;
  return (
    <motion.div
      style={{
        x: tx,
        y: ty,
        background: `radial-gradient(120% 90% at 50% ${30 + index * 10}%, ${layer.from} 0%, ${layer.to} 100%)`,
        filter: blur,
      }}
      className="absolute inset-[-8%] will-change-transform"
    />
  );
}

function SilhouetteBadge({
  category,
  mx,
  my,
}: {
  category: Product["category"];
  mx: ReturnType<typeof useMotionValue<number>>;
  my: ReturnType<typeof useMotionValue<number>>;
}) {
  // Restrained counter-parallax — the piece moves with the viewer, not against.
  const tx = useTransform(mx, [0, 1], [-5, 5]);
  const ty = useTransform(my, [0, 1], [-5, 5]);

  return (
    <motion.div
      style={{ x: tx, y: ty }}
      className="absolute inset-0 flex items-center justify-center will-change-transform"
    >
      <div className="relative h-[68%] w-[68%]">
        {/* Soft warm spot — like a gallery picture light. */}
        <div className="absolute inset-0 rounded-full bg-warm-cream/60 blur-3xl" />
        <Silhouette category={category} />
      </div>
    </motion.div>
  );
}

function Silhouette({ category }: { category: Product["category"] }) {
  // Lightweight SVG signatures per category — replaceable with real imagery later.
  const common = "absolute inset-0 mx-auto h-full w-auto opacity-90";
  switch (category) {
    case "quantum-cascade":
      return (
        <svg viewBox="0 0 200 320" className={common} fill="none">
          <defs>
            <linearGradient id="qc" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#9DC7FF" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="40" rx="52" ry="6" fill="#FFFFFF" />
          {Array.from({ length: 30 }).map((_, i) => {
            const x = 50 + i * 3.2;
            return (
              <line
                key={i}
                x1={x}
                y1="46"
                x2={x + (i % 2 === 0 ? -2 : 2)}
                y2={250 - (i % 5) * 12}
                stroke="url(#qc)"
                strokeWidth="0.7"
              />
            );
          })}
          <circle cx="100" cy="270" r="6" fill="#FFFFFF" />
        </svg>
      );
    case "kinetic-geometry":
      return (
        <svg viewBox="0 0 240 200" className={common} fill="none">
          <defs>
            <linearGradient id="kg" x1="0" x2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#EDD8B2" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          {[80, 60, 42, 28, 16].map((r, i) => (
            <ellipse
              key={i}
              cx="120"
              cy="100"
              rx={r}
              ry={r * 0.18}
              stroke="url(#kg)"
              strokeWidth="1"
            />
          ))}
          <circle cx="120" cy="100" r="4" fill="#FFFFFF" />
          <line x1="120" y1="20" x2="120" y2="40" stroke="#FFFFFF" strokeWidth="0.6" />
        </svg>
      );
    case "bio-luminescent":
      return (
        <svg viewBox="0 0 220 280" className={common} fill="none">
          <defs>
            <radialGradient id="bl">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#C7E8DD" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          <ellipse cx="110" cy="100" rx="78" ry="58" fill="url(#bl)" />
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d={`M${50 + i * 10} 140 Q ${52 + i * 10} 200 ${48 + i * 10} 250`}
              stroke="#FFFFFF"
              strokeOpacity="0.7"
              strokeWidth="0.7"
              fill="none"
            />
          ))}
        </svg>
      );
    case "hyper-minimalist":
      return (
        <svg viewBox="0 0 220 220" className={common} fill="none">
          <defs>
            <linearGradient id="hm" x1="0" x2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <circle cx="110" cy="110" r="80" stroke="url(#hm)" strokeWidth="1.4" />
          <line x1="110" y1="20" x2="110" y2="40" stroke="#FFFFFF" strokeWidth="0.6" />
        </svg>
      );
  }
}
