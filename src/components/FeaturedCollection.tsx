"use client";

import { motion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function FeaturedCollection() {
  // Show only top 4 pieces on homepage
  const items = PRODUCTS.slice(0, 4);

  return (
    <section className="relative py-24 md:py-44">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        {/* Section heading */}
        <div className="mb-14 flex flex-col items-start gap-8 md:mb-24 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-2xl">
            <p className="eyebrow mb-7 text-graphite/65 md:mb-10">Featured Works</p>
            <h2 className="font-display text-[clamp(2.1rem,5vw,4.4rem)] leading-[1.08] tracking-[-0.012em] text-graphite md:leading-[1.06]">
              Selected pieces from the <span className="text-iridescent">Arvex Atelier.</span>
            </h2>
          </div>
          
          <a
            href="/collection"
            className="group hidden md:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite transition-colors hover:text-champagne-600"
          >
            Explore Full Collection <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-7"
        >
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </motion.div>

        {/* Mobile View All Link */}
        <div className="mt-12 flex justify-center md:hidden">
          <a
            href="/collection"
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite transition-colors hover:text-champagne-600"
          >
            Explore Full Collection <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
