"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Apple-style scroll progress hairline. A single 1px champagne line at the top
 * of the viewport, scaling left-to-right as the page is read. Restrained — the
 * eye should notice it only on second viewing.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-[80] h-px origin-left bg-champagne-500/60"
    />
  );
}
