"use client";

import { motion } from "framer-motion";

// Project types we accept commissions for. Visual moment formerly held by a
// press wall — we replaced fictional editorial appearances with the
// architectural categories Arvex actually serves.
const PROJECT_TYPES = [
  "Private residences",
  "Heritage restorations",
  "Banquet & event halls",
  "Boutique hotels",
  "Hospitality suites",
  "Architectural commissions",
];

// Anonymized commissions across India. Specific clients are not named —
// luxury bespoke clients expect privacy. Locations and years are illustrative
// of the brand's positioning and would be confirmed as real commissions
// before launch.
const PROJECTS: { name: string; place: string; year: string }[] = [
  { name: "Private residence", place: "Lutyens Bungalow Zone · New Delhi", year: "2025" },
  { name: "Penthouse", place: "Worli · Mumbai", year: "2024" },
  { name: "Sea-facing villa", place: "North Goa", year: "2024" },
  { name: "Heritage residence", place: "Udaipur" , year: "2024" },
  { name: "Banquet hall", place: "Civil Lines · Jaipur", year: "2023" },
  { name: "Boutique hotel suite", place: "Pondicherry", year: "2023" },
  { name: "Penthouse", place: "Indiranagar · Bengaluru", year: "2023" },
  { name: "Yacht commission", place: "Mumbai", year: "2022" },
];

export function Recognition() {
  return (
    <section className="relative border-y border-champagne-200/60 bg-ivory-veil py-24 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Heading */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-10 text-graphite/65">Selected Work</p>
            <h2 className="font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.04] tracking-[-0.012em] text-graphite">
              Trusted by leading Indian architects and interior designers.
            </h2>
            <p className="mt-8 max-w-[480px] text-[16px] leading-[1.78] text-graphite/65 md:text-[17px]">
              Arvex pieces are commissioned for private residences, heritage
              restorations, banquet halls, and boutique hospitality projects across
              India. Clients are not named in line with our discretion policy; a
              fuller list of references is shared during a private consultation.
            </p>
          </div>

          {/* Right column — what we make for + selected commissions */}
          <div className="lg:col-span-7">
            {/* Project types */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600">
                Commissions we accept
              </p>
              <ul className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 md:mt-7 md:gap-x-12 md:gap-y-5">
                {PROJECT_TYPES.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-[19px] leading-[1.15] tracking-tight text-graphite/80 md:text-[28px] md:leading-[1.1]"
                  >
                    {p}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="my-14 h-px w-full bg-champagne-200" />

            {/* Projects */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600">
                Selected commissions
              </p>
              <ul className="mt-7 divide-y divide-champagne-200/70">
                {PROJECTS.map((p, i) => (
                  <motion.li
                    key={`${p.name}-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="py-5 md:grid md:grid-cols-12 md:items-baseline md:gap-4"
                  >
                    {/* Mobile: stacked layout. Desktop: 12-col grid. */}
                    <div className="flex items-baseline justify-between md:hidden">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/45">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/55">
                        {p.year}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-[20px] leading-tight tracking-tight text-graphite md:hidden">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-[13px] leading-snug text-graphite/65 md:hidden">
                      {p.place}
                    </p>

                    {/* Desktop grid */}
                    <span className="hidden md:col-span-1 md:inline font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/45">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="hidden md:col-span-5 md:inline font-display text-[22px] leading-tight tracking-tight text-graphite">
                      {p.name}
                    </span>
                    <span className="hidden md:col-span-4 md:inline text-[13px] leading-snug text-graphite/65">
                      {p.place}
                    </span>
                    <span className="hidden md:col-span-2 md:inline text-right font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/55">
                      {p.year}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
