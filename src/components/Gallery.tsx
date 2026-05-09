"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CATEGORIES, PRODUCTS, type Category } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/cn";

const FILTERS: { id: Category | "all"; name: string }[] = [
  { id: "all", name: "All" },
  ...CATEGORIES.map((c) => ({ id: c.id, name: c.name })),
];

const VALID_IDS = new Set<string>(CATEGORIES.map((c) => c.id));

export function Gallery() {
  const [filter, setFilter] = useState<Category | "all">("all");

  // Hydrate filter from ?collection=... so Manifesto/Footer category links
  // arrive at the gallery already filtered.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const c = sp.get("collection");
    if (c && VALID_IDS.has(c)) setFilter(c as Category);
  }, []);

  const items = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <section
      id="collection"
      className="relative py-24 md:py-44 scroll-mt-24"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        {/* Section heading */}
        <div className="mb-14 flex flex-col items-start gap-8 md:mb-28 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-2xl">
            <p className="eyebrow mb-7 text-graphite/65 md:mb-10">The Collection</p>
            <h2 className="font-display text-[clamp(2.1rem,5vw,4.4rem)] leading-[1.04] tracking-[-0.012em] text-graphite md:leading-[1.02]">
              Twenty pieces.{" "}
              <span className="text-iridescent">Four collections.</span>{" "}
              Made one at a time.
            </h2>
            <p className="mt-6 max-w-[560px] text-[15px] leading-[1.7] text-graphite/65 md:mt-8 md:text-[18px] md:leading-[1.78]">
              Every Arvex chandelier is hand-built to order in our Jaipur atelier.
              Browse the current edition, request a private consultation, or commission
              a piece tailored to your architecture.
            </p>
          </div>

          {/* Filter rail */}
          <div className="-mx-6 flex gap-2 self-stretch overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:self-end md:overflow-visible md:px-0 md:pb-0">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-2.5 text-[10px] uppercase tracking-[0.24em] font-medium transition-all duration-500 md:px-5 md:tracking-[0.28em]",
                  filter === f.id
                    ? "bg-graphite text-ivory"
                    : "border border-graphite/15 text-graphite/65 hover:text-graphite hover:border-champagne-400"
                )}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-16 xl:grid-cols-4"
        >
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </motion.div>

        {/* Footer hairline + count */}
        <div className="mt-16 flex flex-col items-start gap-4 md:mt-28 md:flex-row md:items-center md:gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-graphite/45">
            {String(items.length).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")} pieces
          </span>
          <div className="h-px w-full flex-1 bg-champagne-200" />
          <a
            href="#enquire"
            className="font-mono text-[10px] uppercase tracking-[0.32em] text-graphite transition-colors hover:text-champagne-600"
          >
            Commission a bespoke piece →
          </a>
        </div>
      </div>
    </section>
  );
}
