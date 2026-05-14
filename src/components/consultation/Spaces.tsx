"use client";

import { motion } from "framer-motion";

type Space = {
  title: string;
  body: string;
  hint: string;
};

const SPACES: Space[] = [
  {
    title: "Private villas",
    body: "Foyers, double-height stairwells, formal dining, and primary bedroom suites. Pieces calibrated to the architecture and to the household's rhythm.",
    hint: "Most common brief",
  },
  {
    title: "Duplexes & penthouses",
    body: "High-rise residences with deliberate sight-lines. Vertical pieces for the stair atrium, restrained forms for the lounge, focal pieces for the dining.",
    hint: "Mumbai, Bengaluru, Gurugram",
  },
  {
    title: "Banquet & event halls",
    body: "Ceremony spaces requiring scale, dimming control, and acoustic discretion. Pieces engineered for repeated installation and seasonal load.",
    hint: "Capacity 150–800",
  },
  {
    title: "Boutique hotels",
    body: "Lobbies, suites, restaurants, and spa interiors. Brand-aligned palettes, integrated dimming, and on-site calibration with the operator's lighting designer.",
    hint: "Heritage & contemporary",
  },
  {
    title: "Hospitality suites",
    body: "Single-room commissions for presidential and signature suites. Discreet maintenance protocol and a lifetime aftercare commitment.",
    hint: "Per-suite bespoke",
  },
  {
    title: "Premium commercial",
    body: "Galleries, design showrooms, atelier flagships, and members' clubs. Pieces that anchor an interior without becoming the brand.",
    hint: "By referral",
  },
];

export function ConsultationSpaces() {
  return (
    <section className="relative py-24 md:py-44">
      <div className="absolute left-0 right-0 top-0 section-rule" aria-hidden />
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-10 text-graphite/65">Architectural Spaces</p>
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.05] tracking-[-0.012em] text-graphite">
              Where Arvex pieces hang.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
            <p className="max-w-[560px] text-[17px] leading-[1.78] text-graphite/65 md:text-[18px]">
              Arvex is commissioned for spaces where lighting is an
              architectural decision, not a finishing touch. A short list of
              the briefs we accept regularly:
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px bg-champagne-200/60 md:mt-24 md:grid-cols-2 lg:grid-cols-3">
          {SPACES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.95, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-ivory-veil p-9 transition-colors duration-700 hover:bg-porcelain"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600">
                  Brief {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/45">
                  {s.hint}
                </span>
              </div>
              <h3 className="mt-6 font-display text-[24px] leading-[1.15] tracking-tight text-graphite">
                {s.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.75] text-graphite/65">
                {s.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
