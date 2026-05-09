"use client";

import { motion } from "framer-motion";

type Service = {
  title: string;
  body: string;
};

const SERVICES: Service[] = [
  {
    title: "Spatial lighting planning",
    body: "We study the room — proportions, natural light, sight-lines — and recommend a single piece, an array, or a fully bespoke fixture sized to the architecture.",
  },
  {
    title: "Chandelier sizing & ceiling height",
    body: "Hand-drawn elevations show exactly how the piece will sit in the room. Drop length, body diameter, and clearance above furniture are confirmed before any material is cut.",
  },
  {
    title: "Material customisation",
    body: "Crystal lots, brass alloys, finish swatches, and porcelain colours are presented in person at the atelier or shipped to your studio for in-room review.",
  },
  {
    title: "Bespoke commissions",
    body: "Pieces designed from scratch for a single ceiling. Lead time 14–22 weeks, signed by the maker, delivered with white-glove installation.",
  },
  {
    title: "Architect & designer collaboration",
    body: "Trade pricing, technical drawings, IES files, and on-site consultation for studios working on private residences or hospitality projects.",
  },
  {
    title: "Hospitality & commercial briefs",
    body: "Banquet halls, boutique hotels, lobbies, and event spaces — calibrated to the venue's acoustics, dimming protocol, and brand standard.",
  },
];

export function ConsultationServices() {
  return (
    <section className="relative py-24 md:py-44">
      <div className="absolute left-0 right-0 top-0 section-rule" aria-hidden />
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-10 text-graphite/65">What we offer</p>
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.05] tracking-[-0.012em] text-graphite">
              Personalised lighting design,{" "}
              <span className="text-iridescent">from drawing to handover.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
            <p className="max-w-[560px] text-[17px] leading-[1.78] text-graphite/65 md:text-[18px]">
              The consultation is unhurried. We listen to the brief, study
              drawings, and walk you through every option — including ones that
              do not yet exist. Most pieces leaving the atelier are some
              combination of an existing form and a personal note from the
              client.
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px bg-champagne-200/60 md:mt-24 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-ivory p-9 transition-colors duration-700 hover:bg-porcelain"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-[24px] leading-[1.15] tracking-tight text-graphite">
                {s.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.75] text-graphite/65">
                {s.body}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-6 bg-champagne-400 transition-all duration-500 group-hover:w-12" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
