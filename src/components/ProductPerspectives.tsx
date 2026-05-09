"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Product } from "@/data/products";

/**
 * Editorial multi-angle gallery for the product detail page. Renders any
 * combination of context, low-angle, detail, and ortho shots that exist for
 * the product. Hidden entirely if the product has nothing beyond the hero.
 */
export function ProductPerspectives({ product }: { product: Product }) {
  // Order intentionally: wide context first (the "where it lives"), then a
  // dramatic perspective (low-angle), then material detail, then catalogue.
  const panels: { kind: string; src: string; alt: string; aspect: string; full?: boolean }[] = [];

  if (product.images.context) {
    panels.push({
      kind: "In situ",
      src: product.images.context,
      alt: `${product.name} chandelier installed in a private interior.`,
      aspect: "aspect-[3/2]",
      full: true,
    });
  }
  if (product.images.low) {
    panels.push({
      kind: "From below",
      src: product.images.low,
      alt: `${product.name} chandelier viewed from a low angle.`,
      aspect: "aspect-[4/5]",
    });
  }
  if (product.images.detail) {
    panels.push({
      kind: "Material detail",
      src: product.images.detail,
      alt: `Material study of the ${product.name} chandelier.`,
      aspect: "aspect-[4/5]",
    });
  }
  if (product.images.ortho) {
    panels.push({
      kind: "Catalogue",
      src: product.images.ortho,
      alt: `${product.name} chandelier on a studio backdrop.`,
      aspect: "aspect-[4/5]",
    });
  }

  if (panels.length === 0) return null;

  return (
    <section className="relative border-t border-champagne-200/60 bg-ivory-veil py-24 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="mb-14 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-7 text-graphite/65">Perspectives</p>
            <h2 className="font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] tracking-tight text-graphite">
              {product.name}, from every angle.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-[1.78] text-graphite/65">
              Editorial photographs from a recent commission, lit and
              calibrated in the room before sign-off.
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne-600">
            {String(panels.length).padStart(2, "0")} {panels.length === 1 ? "perspective" : "perspectives"}
          </span>
        </div>

        {/* First panel — usually the wide in-situ — full bleed */}
        {panels[0]?.full && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className={`relative ${panels[0].aspect} w-full overflow-hidden rounded-sm shadow-editorial`}
          >
            <Image
              src={panels[0].src}
              alt={panels[0].alt}
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-graphite/22 via-graphite/6 to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-ivory/85">
              <span className="h-px w-6 bg-champagne-400" />
              {panels[0].kind}
            </div>
          </motion.div>
        )}

        {/* Remaining panels — 2/3-up grid */}
        {panels.length > 1 && (
          <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {panels.slice(panels[0]?.full ? 1 : 0).map((p, i) => (
              <motion.div
                key={p.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 1,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative ${p.aspect} w-full overflow-hidden rounded-sm shadow-editorial`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-3 rounded-[1px] ring-1 ring-inset ring-white/30" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.32em] text-ivory/85 drop-shadow">
                  <span className="h-px w-5 bg-champagne-400" />
                  {p.kind}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
