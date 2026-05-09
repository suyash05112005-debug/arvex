"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { Product } from "@/data/products";

const ChandelierScene = dynamic(
  () => import("./three/ChandelierScene").then((m) => m.ChandelierScene),
  { ssr: false, loading: () => null }
);

export function ProductHero({ product }: { product: Product }) {
  return (
    <section className="relative pt-44 pb-28 md:pt-52">
      {/* Soft champagne ambient — anchors the page */}
      <div className="pointer-events-none absolute right-0 top-0 h-[60%] w-[55%] glow-champagne opacity-70 blur-[100px]" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5 lg:pt-16">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow mb-8 text-graphite/65"
            >
              {product.category.replace(/-/g, " · ")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.6rem,6vw,5.6rem)] leading-[1] tracking-[-0.022em] text-graphite"
            >
              {product.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-[480px] font-display text-[26px] italic leading-[1.25] text-graphite/70 md:text-[28px]"
            >
              {product.tagline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 max-w-[480px] text-[16px] leading-[1.78] text-graphite/65 md:text-[17px]"
            >
              {product.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 flex flex-wrap gap-3"
            >
              <a href="#enquire" className="btn-primary">
                Enquire about this piece →
              </a>
              <a href="/#collection" className="btn-ghost">
                Back to Collection
              </a>
            </motion.div>
          </div>

          <div className="relative lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-editorial"
              style={{
                background: `radial-gradient(120% 90% at 50% 30%, ${product.layers[0].from} 0%, ${product.layers[0].to} 100%)`,
              }}
            >
              <div
                className="absolute inset-0 mix-blend-screen"
                style={{
                  background: `radial-gradient(80% 60% at 50% 50%, ${product.layers[1].from} 0%, ${product.layers[1].to} 100%)`,
                }}
              />

              {/* Real photography when generated — replaces the R3F scene as the hero */}
              {product.images.hero ? (
                <>
                  <Image
                    src={product.images.hero}
                    alt={`${product.name} chandelier — ${product.tagline}`}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    priority
                    className="object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-graphite/35 via-graphite/10 to-transparent" />
                </>
              ) : (
                <>
                  {/* Picture-light spill at the top */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-warm-cream/35 to-transparent" />
                  {/* Soft floor catch */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-warm-taupe/20 to-transparent" />
                  <ChandelierScene className="absolute inset-0" />
                </>
              )}

              <div className="pointer-events-none absolute inset-4 rounded-[1px] ring-1 ring-inset ring-white/35" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
