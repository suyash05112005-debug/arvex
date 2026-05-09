"use client";

import { motion } from "framer-motion";

type Channel = {
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
};

const CHANNELS: Channel[] = [
  {
    eyebrow: "WhatsApp",
    title: "Message the atelier directly",
    body: "Quick brief, room photographs, sketches — send them over and a senior member of the atelier will reply within the working day.",
    cta: { label: "Open WhatsApp →", href: "https://wa.me/919800000000" },
  },
  {
    eyebrow: "Showroom",
    title: "Private appointments",
    body: "Visit the atelier in Jaipur or our showroom appointments in Mumbai (BKC), New Delhi (Khan Market), Bengaluru, and Hyderabad. By appointment only.",
    cta: { label: "Request an appointment →", href: "#enquire" },
  },
  {
    eyebrow: "Trade",
    title: "Architect & designer collaboration",
    body: "Trade pricing, technical drawings, IES files, on-site consultation, and shared moodboards. We work alongside studios across India and the GCC.",
    cta: { label: "trade@arvex.studio →", href: "mailto:trade@arvex.studio" },
  },
  {
    eyebrow: "Video",
    title: "Video consultation",
    body: "For first calls and remote project reviews. Share screen, walk through drawings, and discuss material samples by post.",
    cta: { label: "Schedule a video call →", href: "#enquire" },
  },
];

export function ConsultationChannels() {
  return (
    <section className="relative bg-ivory-veil py-24 md:py-40">
      <div className="absolute left-0 right-0 top-0 section-rule" aria-hidden />
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-10 text-graphite/65">Other ways to reach the atelier</p>
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.05] tracking-[-0.012em] text-graphite">
              However suits the brief.
            </h2>
            <p className="mt-7 max-w-[460px] text-[16px] leading-[1.78] text-graphite/65 md:text-[17px]">
              The atelier responds within 24 hours, by whichever channel
              suits you. All initial consultations are at no charge.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
            <ul className="divide-y divide-champagne-200/70">
              {CHANNELS.map((c, i) => (
                <motion.li
                  key={c.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group py-8 first:pt-0 last:pb-0"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne-600">
                      {c.eyebrow}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[24px] leading-[1.15] tracking-tight text-graphite md:text-[26px]">
                    {c.title}
                  </h3>
                  <p className="mt-3 max-w-[520px] text-[14px] leading-[1.75] text-graphite/65 md:text-[15px]">
                    {c.body}
                  </p>
                  <a
                    href={c.cta.href}
                    {...(c.cta.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="mt-4 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-graphite transition-colors hover:text-champagne-600"
                  >
                    <span className="h-px w-6 bg-champagne-400 transition-all group-hover:w-12" />
                    {c.cta.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
