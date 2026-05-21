"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const ShaderBackground = dynamic(
  () => import("./three/ShaderBackground").then((m) => m.ShaderBackground),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-high-key" /> }
);

// Banner photograph — replaces the procedural R3F chandelier on the homepage
// hero. Editorial penthouse foyer, real photograph, far stronger emotional
// anchor than the wireframe scene it replaces.
const HERO_BANNER_SRC = "/assets/products/generated/hero-banner.jpg";

const SLIDES = [
  {
    eyebrow: "The Studio",
    title: ["Bespoke lighting,", "built one at", "a time."],
    body: "Every piece is built to order in our Noida studio — drawn, engineered, and assembled by the same hands. We deliver and install directly to projects across India.",
    meta: ["Made in our Noida studio", "Numbered editions", "14–22 week lead time"],
  },
  {
    eyebrow: "Featured Piece — Aurora",
    title: ["Aurora — ", "champagne brass", "& cut crystal."],
    body: "Hand-cut crystal pendants suspended from a solid brass spine. A 2.4-metre fixture designed for double-height foyers and grand staircases.",
    meta: ["Edition of 12", "240 × 90 cm", "Price on request"],
  },
  {
    eyebrow: "Featured Piece — Axis",
    title: ["Axis — ", "kinetic light", "in motion."],
    body: "Twelve brushed-brass rings that rotate independently on magnetic bearings. Engineered for villa entrance halls and hotel lobbies, casting slowly shifting shadows.",
    meta: ["Edition of 10", "150 × 110 cm", "Price on request"],
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    // Slower cadence — luxury reveals, not a carousel.
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 11000);
    return () => window.clearInterval(id);
  }, []);

  const slide = SLIDES[index];

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden md:min-h-[680px]"
    >
      {/* Animated shader plane — desktop only. On mobile the photo covers
          the full viewport so the shader is wasted GPU work. */}
      <ShaderBackground className="pointer-events-none absolute inset-0 -z-10 hidden md:block" />

      {/* Architectural ambient — ceiling wash and floor catch suggest a room
          without drawing one. Sits behind the 3D chandelier. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-[5] h-[42%] ceiling-fade" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-[36%] floor-fade" />

      {/* Hero banner photograph (right side). Carries its own atmosphere —
          we drop the previous champagne halo and floor wash because the photo
          already includes warm daylight and a believable floor. */}
      <motion.div
        style={{ y: sceneY, scale: sceneScale }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute inset-y-0 right-0 w-full md:w-[68%] lg:w-[58%]">
          <Image
            src={HERO_BANNER_SRC}
            alt="A bespoke Arvex chandelier hanging in a private villa foyer at golden hour."
            fill
            sizes="(min-width: 1024px) 58vw, (min-width: 768px) 68vw, 100vw"
            priority
            // On mobile we shift focal point upward so the chandelier stays
            // visible above the headline copy that sits in the lower half.
            className="object-cover object-[center_30%] md:object-center"
          />
          {/* Bone fade for headline legibility. On mobile we use a bottom-up
              gradient so the chandelier reads on top and the copy reads on
              the bottom; on desktop we use the left-to-right fade. */}
          <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-bone via-bone/65 to-transparent md:hidden" />
          <div className="absolute inset-y-0 left-0 hidden w-full bg-gradient-to-r from-bone via-bone/55 to-transparent md:block md:w-1/2 md:from-bone/95 md:via-bone/30" />
          <div className="absolute inset-x-0 bottom-0 hidden h-1/4 bg-gradient-to-t from-bone/35 to-transparent md:block" />
        </div>
      </motion.div>

      {/* Editorial hairline at top — under the nav, suggests a building line */}
      <div className="absolute top-[120px] left-0 right-0 h-px hairline" />

      {/* Slide indicator — top-right on mobile (below nav, above copy);
          bottom-right on desktop. Tap targets bumped to 44px for touch. */}
      <div className="absolute right-6 top-[150px] z-10 flex items-center gap-3 md:right-12 md:top-auto md:bottom-12 lg:right-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/40">
          {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="group relative flex h-11 w-11 cursor-pointer items-center justify-center md:h-px md:w-12"
              aria-label={`Slide ${i + 1}`}
            >
              <span
                className={`block h-px w-9 transition-colors md:absolute md:inset-0 md:w-12 ${
                  i === index ? "bg-graphite" : "bg-graphite/20"
                }`}
              />
              {i === index && (
                <motion.span
                  className="pointer-events-none absolute left-1 right-1 h-px origin-left bg-champagne-400 md:inset-y-0 md:left-0 md:right-auto md:w-12"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 11, ease: "linear" }}
                  key={index}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Copy — sits in lower-left, leaves the chandelier its own air */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-16 md:px-12 md:pb-24 lg:px-16 lg:pb-32"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 1.4, ease: [0.3, 0.8, 0.2, 1] }}
            className="max-w-2xl"
          >
            <p className="eyebrow mb-7 text-graphite/70 md:mb-10">{slide.eyebrow}</p>
            <h1 className="font-display text-[clamp(2.05rem,7vw,5.6rem)] leading-[1.08] tracking-[-0.018em] text-graphite md:leading-[1.06]">
              {slide.title.map((part, i) => (
                <motion.span
                  key={`${index}-${i}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: 0.2 + i * 0.18,
                    ease: [0.3, 0.8, 0.2, 1],
                  }}
                  className="inline-block"
                >
                  {part}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-6 max-w-[560px] font-sans text-[15px] leading-[1.75] text-graphite/60 md:mt-8 md:text-[17px] md:leading-[1.8]"
            >
              {slide.body}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0 }}
              className="mt-9 flex flex-wrap items-center gap-3 md:mt-12"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new Event('open-consultation-modal'));
                }}
                className="btn-primary"
              >
                Request Private Consultation
                <span aria-hidden>→</span>
              </button>
              <a href="#collection" className="btn-ghost">
                View Collection
              </a>
            </motion.div>
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, delay: 1.25 }}
              className="mt-10 hidden flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/45 md:mt-16 md:flex"
            >
              {slide.meta.map((m, i) => (
                <span key={m} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="hidden h-px w-5 bg-champagne-300 md:inline-block" />
                  )}
                  {m}
                </span>
              ))}
            </motion.dl>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px hairline" />

      {/* Scroll cue — quieter, more editorial */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-12 left-6 z-10 hidden flex-col items-start gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/40 md:left-12 md:flex lg:left-16"
      >
        <span className="block h-10 w-px bg-graphite/25" />
        Scroll to explore
      </motion.div>
    </section>
  );
}
