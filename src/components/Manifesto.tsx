"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/products";

export function Manifesto() {
  return (
    <section className="relative py-24 md:py-44">
      {/* Section divider rule, top */}
      <div className="absolute left-0 right-0 top-0 section-rule" aria-hidden />
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        {/* Eyebrow + headline */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-10 text-graphite/65">The Atelier</p>
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.08] tracking-[-0.012em] text-graphite">
              Hand-built lighting,{" "}
              <span className="text-iridescent">signed and numbered.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
            <p className="max-w-[580px] text-[16px] leading-[1.8] text-graphite/60 md:text-[17px]">
              Arvex is a small studio of craftspeople, working from our workshop
              in Noida. We draw on the region's long traditions of crystal,
              brass, and stone, and pair them with modern lighting engineering. Every
              chandelier is made one at a time — cut, polished, and assembled by the
              same maker from start to finish, then signed and delivered with
              white-glove installation.
            </p>
            <div className="mt-14 grid grid-cols-2 gap-x-12 gap-y-10 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/50">
              <Stat n="100%" l="Made in our atelier" />
              <Stat n="1 : 1" l="One maker per piece" />
              <Stat n="14 wk" l="Average lead time" />
              <Stat n="Lifetime" l="Aftercare on every piece" />
            </div>
          </div>
        </div>

        {/* Collections — editorial card row */}
        <div className="mt-28 grid grid-cols-1 gap-px bg-champagne-200/60 md:grid-cols-2 lg:grid-cols-4 md:mt-32">
          {CATEGORIES.map((c, i) => (
            <motion.a
              key={c.id}
              href={`/collection?collection=${c.id}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-ivory p-9 transition-colors duration-700 hover:bg-porcelain"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600">
                Collection {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-7 font-display text-[26px] leading-[1.1] tracking-tight text-graphite">
                {c.name}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.65] text-graphite/60">
                {c.description}
              </p>
              <span className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/50 transition-colors group-hover:text-graphite">
                <span className="h-px w-6 bg-champagne-400 transition-all group-hover:w-10" />
                View collection
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-[34px] leading-none tracking-tight text-graphite">
        {n}
      </div>
      <div className="mt-3">{l}</div>
    </div>
  );
}
