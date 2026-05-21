"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function ConsultationCTA() {
  return (
    <section id="enquire" className="relative py-24 md:py-44 scroll-mt-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center lg:gap-24">
          {/* Left: copy */}
          <div className="max-w-2xl flex-1">
            <p className="eyebrow mb-10 text-graphite/65">Private Consultation</p>
            <h2 className="font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.08] tracking-[-0.012em] text-graphite">
              Discuss your project with the atelier.
            </h2>
            <p className="mt-8 max-w-[460px] text-[15px] leading-[1.8] text-graphite/60 md:text-[16px]">
              A senior member of our studio responds within 24 hours. We arrange
              in-person consultations in Noida, Mumbai, and New Delhi, and travel
              for on-site project visits across India.
            </p>

            <ul className="mt-12 space-y-5 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/50">
              <li className="flex items-start gap-4">
                <Dot /> 24-hour response, atelier-direct
              </li>
              <li className="flex items-start gap-4">
                <Dot /> Private viewings in Noida, Mumbai & Delhi
              </li>
              <li className="flex items-start gap-4">
                <Dot /> White-glove delivery and installation across India
              </li>
              <li className="flex items-start gap-4">
                <Dot /> Architectural integration drawings on request
              </li>
            </ul>
          </div>

          {/* Right: CTA Card */}
          <div className="w-full lg:w-[480px]">
            <div className="relative">
              {/* Decorative halo */}
              <div className="pointer-events-none absolute -inset-16 -z-10 glow-champagne blur-3xl opacity-60" />

              <div className="glass relative flex flex-col items-center justify-center overflow-hidden rounded-sm p-10 text-center md:p-16">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="mb-6 opacity-60">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#1F1B16" strokeWidth="1" />
                  <path d="M12 16L16 12L12 8" stroke="#1F1B16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 12H16" stroke="#1F1B16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                
                <h3 className="mb-4 font-display text-[26px] leading-[1.1] tracking-tight text-graphite md:text-[30px]">
                  Begin your commission
                </h3>
                <p className="mb-10 text-sm text-graphite/60">
                  Share your brief and architectural references with our team.
                </p>

                <button
                  onClick={() => window.dispatchEvent(new Event("open-consultation-modal"))}
                  className="btn-primary w-full justify-center py-4"
                >
                  Book Private Consultation
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return (
    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-ether-500" />
  );
}
