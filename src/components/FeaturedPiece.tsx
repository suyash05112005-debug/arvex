"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { getProduct } from "@/data/products";

/**
 * Editorial spotlight on a single signature piece. Sits between the hero and
 * the atelier story — gives first-time visitors a "look at this one" moment
 * before they meet the full collection.
 */
export function FeaturedPiece({ slug = "aurora" }: { slug?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04]);

  const product = getProduct(slug);
  if (!product) return null;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-champagne-200/60 bg-ivory-veil py-24 md:py-44"
    >
      {/* Soft champagne wash, anchored upper-right */}
      <div className="pointer-events-none absolute -right-[10%] top-0 h-[80%] w-[60%] glow-champagne opacity-80 blur-[100px]" />
      {/* Floor wash — anchors visual to a believable plane */}
      <div className="pointer-events-none absolute inset-x-[10%] bottom-0 h-[18%] floor-fade" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          {/* Visual */}
          <motion.div
            className="relative lg:col-span-7"
            style={{ y: visualY }}
          >
            <motion.div
              style={{ scale: visualScale }}
              className="relative aspect-[5/6] w-full overflow-hidden rounded-sm shadow-editorial"
            >
              {/* Layered gradient stack — placeholder while the photograph loads,
                  fallback when the manifest doesn't include this piece yet. */}
              {product.layers.map((layer, i) => (
                <div
                  key={i}
                  className="absolute inset-[-6%]"
                  style={{
                    background: `radial-gradient(120% 90% at 50% ${30 + i * 8}%, ${layer.from} 0%, ${layer.to} 100%)`,
                  }}
                />
              ))}

              {/* Real photography, when generated */}
              {product.images.hero && (
                <Image
                  src={product.images.hero}
                  alt={`${product.name} — ${product.tagline}`}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  priority
                  className="object-cover object-center"
                />
              )}

              {/* Cinematic ivory wash — only when the photograph is absent;
                  applying it over a real photo would dust out the highlights. */}
              {!product.images.hero && (
                <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_30%,rgba(255,247,229,0.55),transparent_70%)]" />
              )}

              {/* Crystal cascade silhouette — only when the photograph is absent */}
              <div
                className={
                  product.images.hero
                    ? "hidden"
                    : "absolute inset-0 flex items-center justify-center"
                }
              >
                <svg
                  viewBox="0 0 320 480"
                  className="h-[78%] w-auto opacity-95"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="featured-strand" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#FBF6E9" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#D7BB72" stopOpacity="0.25" />
                    </linearGradient>
                    <linearGradient id="featured-ring" x1="0" x2="1">
                      <stop offset="0%" stopColor="#9D7C39" stopOpacity="0.15" />
                      <stop offset="50%" stopColor="#D7BB72" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#9D7C39" stopOpacity="0.15" />
                    </linearGradient>
                    <radialGradient id="featured-orb">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                      <stop offset="60%" stopColor="#F4E9D5" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#F4E9D5" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Suspension */}
                  <line x1="160" y1="0" x2="160" y2="60" stroke="#1F1B16" strokeOpacity="0.4" strokeWidth="0.6" />

                  {/* Top crown ring */}
                  <ellipse cx="160" cy="68" rx="78" ry="9" stroke="url(#featured-ring)" strokeWidth="1.6" fill="none" />

                  {/* Crystal pendants — staggered cascade */}
                  {Array.from({ length: 64 }).map((_, i) => {
                    const t = i / 64;
                    const angle = t * Math.PI * 6;
                    const r = 78 * (0.55 + 0.45 * Math.sin(t * Math.PI));
                    const x = 160 + Math.cos(angle) * r * 0.45;
                    const y = 80 + t * 280;
                    return (
                      <line
                        key={i}
                        x1={x}
                        y1={y}
                        x2={x + Math.sin(angle) * 1.2}
                        y2={y + 14 + (i % 4) * 4}
                        stroke="url(#featured-strand)"
                        strokeWidth="0.7"
                      />
                    );
                  })}

                  {/* Lower accent ring */}
                  <ellipse cx="160" cy="380" rx="58" ry="7" stroke="url(#featured-ring)" strokeWidth="1" fill="none" />

                  {/* Core orb */}
                  <circle cx="160" cy="380" r="34" fill="url(#featured-orb)" />
                  <circle cx="160" cy="380" r="6" fill="#FFFFFF" />
                </svg>
              </div>

              {/* Subtle bottom shade — kept light because the new "dominance" hero
                  is bright; we only need enough contrast for the edition badge. */}
              {product.images.hero && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-graphite/22 via-graphite/6 to-transparent" />
              )}

              {/* Inset frame — gallery glass */}
              <div className="pointer-events-none absolute inset-4 rounded-[2px] ring-1 ring-inset ring-white/40" />

              {/* Edition badge — bottom-left */}
              <div
                className={
                  product.images.hero
                    ? "absolute bottom-6 left-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/90 drop-shadow"
                    : "absolute bottom-6 left-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/60"
                }
              >
                <span className="h-px w-8 bg-champagne-500" />
                {product.edition}
              </div>
            </motion.div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:pt-12"
          >
            <p className="eyebrow mb-10 text-graphite/65">Signature · Volume IV</p>
            <h2 className="font-display text-[clamp(2.8rem,5.6vw,5rem)] leading-[1.06] tracking-[-0.018em] text-graphite">
              {product.name}
            </h2>
            <p className="mt-8 max-w-[520px] font-display text-[26px] italic leading-[1.25] text-graphite/70 md:text-[28px]">
              {product.tagline}
            </p>
            <p className="mt-9 max-w-[520px] text-[15px] leading-[1.8] text-graphite/60 md:text-[16px]">
              {product.description}
            </p>

            {/* Spec table */}
            <dl className="mt-14 max-w-[520px] divide-y divide-champagne-200">
              <SpecRow label="Materials" value={product.materials.join(" · ")} />
              <SpecRow
                label="Dimensions"
                value={`${product.diameterCm} × ${product.heightCm} cm`}
              />
              <SpecRow label="Edition" value={product.edition} />
              <SpecRow
                label="Lead time"
                value={`${product.leadTimeWeeks} weeks`}
              />
            </dl>

            <div className="mt-14 flex flex-wrap items-center gap-3">
              <Link href={`/product/${product.slug}`} className="btn-primary">
                Discover {product.name}
                <span aria-hidden>→</span>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new Event('open-consultation-modal'));
                }}
                className="btn-ghost"
              >
                Enquire about this piece
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-5">
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600">
        {label}
      </dt>
      <dd className="col-span-2 font-sans text-[15px] leading-[1.55] text-graphite">
        {value}
      </dd>
    </div>
  );
}
