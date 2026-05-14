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
    title: "Discovery",
    body:
      "A short call or visit. We listen — to the room, the architecture, the brief, and the people who will live with the piece. No drawings yet, just conversation.",
    duration: "30–60 min",
  },
  {
    n: "02",
    title: "Spatial planning",
    body:
      "Hand-drawn elevations show the piece in your room — proportions, drop length, suspension points, cable routing, dimming protocol.",
    duration: "1–2 weeks",
  },
  {
    n: "03",
    title: "Design recommendation",
    body:
      "We present a single piece, an edition variant, or a fully bespoke design. References from the archive accompany every proposal.",
    duration: "Within 1 week",
  },
  {
    n: "04",
    title: "Material selection",
    body:
      "Crystal lots, brass alloys, finish swatches, porcelain colours — presented in person at the atelier or shipped to your studio for in-room review.",
    duration: "1–3 weeks",
  },
  {
    n: "05",
    title: "Delivery & installation",
    body:
      "Crated, transported, and installed by our team. On-site dimming and acoustic calibration. Final hand-over with full aftercare.",
    duration: "2–4 days on-site",
  },
];

export function ConsultationProcess() {
  return (
    <section className="relative bg-ivory-veil py-24 md:py-44">
      <div className="absolute left-0 right-0 top-0 section-rule" aria-hidden />
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-10 text-graphite/65">The Process</p>
            <h2 className="font-display text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.04] tracking-[-0.012em] text-graphite">
              Five quiet stages,{" "}
              <span className="text-iridescent">from first call to ceiling.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
            <p className="max-w-[580px] text-[17px] leading-[1.78] text-graphite/65 md:text-[18px]">
              A consultation is not a sales conversation. It is a slow,
              architectural process. The first call is unhurried; the last
              installation is the same. Most clients meet the same maker at
              every stage.
            </p>
          </div>
        </div>

        <ol className="mt-20 space-y-px md:mt-24">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-12 gap-x-4 gap-y-3 border-t border-champagne-200/70 py-8 md:gap-x-8 md:gap-y-4 md:py-12"
            >
              {/* Mobile header row: number + duration on the same line */}
              <div className="col-span-12 flex items-center justify-between md:hidden">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600">
                  Stage {s.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/55">
                  {s.duration}
                </span>
              </div>

              {/* Desktop number cell */}
              <span className="hidden md:col-span-1 md:inline font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600">
                {s.n}
              </span>
              <div className="col-span-12 md:col-span-5">
                <h3 className="font-display text-[24px] leading-[1.1] tracking-tight text-graphite md:text-[32px]">
                  {s.title}
                </h3>
              </div>
              <p className="col-span-12 max-w-[560px] text-[14px] leading-[1.7] text-graphite/65 md:col-span-5 md:col-start-7 md:text-[16px] md:leading-[1.78]">
                {s.body}
              </p>
              {/* Desktop duration cell */}
              <span className="hidden md:col-span-1 md:col-start-12 md:inline text-right font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/55">
                {s.duration}
              </span>
            </motion.li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-start gap-4 md:mt-14 md:flex-row md:items-center md:gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/45">
            Total · 12 to 22 weeks, atelier to ceiling
          </span>
          <div className="hidden h-px flex-1 bg-champagne-200 md:block" />
          <a
            href="#enquire"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite transition-colors hover:text-champagne-600"
          >
            Begin a consultation →
          </a>
        </div>
      </div>
    </section>
  );
}
