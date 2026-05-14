"use client";

import { motion } from "framer-motion";

type Step = {
  n: string;
  title: string;
  body: string;
  duration: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Consultation",
    body:
      "A senior member of the atelier studies your room — ceiling height, the architecture, the play of natural light — and proposes a piece, an edition variant, or a fully bespoke commission.",
    duration: "1–2 weeks",
  },
  {
    n: "02",
    title: "Drawings & Materials",
    body:
      "Hand-drawn elevations are produced alongside material samples — crystal lots, brass alloys, finish swatches — for in-person review at the atelier or in your studio.",
    duration: "2–3 weeks",
  },
  {
    n: "03",
    title: "Hand Build, Noida",
    body:
      "Each piece is cut, polished, wired, and assembled by a single maker, who signs and numbers it. Photographs are sent through every stage of build.",
    duration: "8–14 weeks",
  },
  {
    n: "04",
    title: "White-Glove Installation",
    body:
      "Crated, flown, and installed by our team — anywhere in the world. Acoustic and lighting calibration is performed on-site before handover.",
    duration: "2–4 days on-site",
  },
];

export function Craftsmanship() {
  return (
    <section className="relative py-24 md:py-44">
      <div className="absolute left-0 right-0 top-0 section-rule" aria-hidden />
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-10 text-graphite/65">The Craft</p>
            <h2 className="font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.04] tracking-[-0.012em] text-graphite">
              From drawing to installation,{" "}
              <span className="text-iridescent">all under one roof.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
            <p className="max-w-[580px] text-[17px] leading-[1.78] text-graphite/65 md:text-[18px]">
              Every Arvex piece passes through four stages, all in our Noida studio.
              No outsourcing, no white-label assembly. The same team draws, cuts, builds,
              and installs — which is why each piece can be signed by the maker and why
              we can stand behind every fixture for the lifetime of the building.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-20 grid grid-cols-1 gap-x-px gap-y-px bg-champagne-200/60 md:mt-24 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-ivory p-9 transition-colors duration-700 hover:bg-porcelain"
            >
              {/* Step number */}
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600">
                  Stage {s.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/45">
                  {s.duration}
                </span>
              </div>

              {/* Oversized numeral, ghosted */}
              <div
                aria-hidden
                className="pointer-events-none mt-1 select-none font-display text-[140px] leading-none tracking-tight text-champagne-100 transition-colors duration-700 group-hover:text-champagne-200"
              >
                {s.n}
              </div>

              <h3 className="mt-3 font-display text-[30px] leading-[1.1] tracking-tight text-graphite">
                {s.title}
              </h3>
              <p className="mt-5 text-[14px] leading-[1.75] text-graphite/65">
                {s.body}
              </p>

              {/* Hairline footer */}
              <div className="mt-10 flex items-center gap-3">
                <span className="h-px w-6 bg-champagne-400 transition-all duration-500 group-hover:w-12" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/55">
                  {i === STEPS.length - 1 ? "Hand-over" : "Continues to next stage"}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-14 flex items-center gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/45">
            Total — 12 to 22 weeks, atelier to ceiling
          </span>
          <div className="h-px flex-1 bg-champagne-200" />
          <a
            href="#enquire"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite transition-colors hover:text-champagne-600"
          >
            Begin your consultation →
          </a>
        </div>
      </div>
    </section>
  );
}
