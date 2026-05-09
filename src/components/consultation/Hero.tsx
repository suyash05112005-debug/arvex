"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function ConsultationHero({ heroSrc }: { heroSrc: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden"
    >
      {/* Background photograph with subtle parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image
          src={heroSrc}
          alt="The Arvex atelier consultation room at golden hour."
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-bone via-bone/55 to-transparent md:w-2/3 md:from-bone/95 md:via-bone/40" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-bone/40 to-transparent" />
      </motion.div>

      {/* Top hairline */}
      <div className="absolute top-[120px] left-0 right-0 h-px hairline" />

      {/* Copy */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-24 md:px-12 lg:px-16 lg:pb-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mb-10 text-graphite/70"
        >
          Private Consultation
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-display text-[clamp(2.4rem,6.4vw,5.4rem)] leading-[1.02] tracking-[-0.022em] text-graphite"
        >
          Lighting design,{" "}
          <span className="text-iridescent">made for the room you live in.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-[560px] text-[16px] leading-[1.78] text-graphite/65 md:text-[17px]"
        >
          A senior member of the atelier will study the room, walk you through
          the collection, and propose either an existing piece, an edition
          variant, or a fully bespoke commission. The first consultation is
          unhurried and at no charge.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <a href="#enquire" className="btn-primary">
            Book a private consultation
            <span aria-hidden>→</span>
          </a>
          <a
            href="https://wa.me/919800000000"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            WhatsApp the atelier
          </a>
        </motion.div>
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 1.1 }}
          className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.32em] text-graphite/55"
        >
          <span>24-hour response</span>
          <span className="hidden h-px w-5 bg-champagne-300 md:inline-block" />
          <span>Atelier-direct</span>
          <span className="hidden h-px w-5 bg-champagne-300 md:inline-block" />
          <span>By appointment</span>
        </motion.dl>
      </motion.div>
    </section>
  );
}
