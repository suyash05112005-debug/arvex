"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/#collection", label: "Collection" },
  { href: "/consultation", label: "Consultation" },
  { href: "/#enquire", label: "Quick Enquire" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-6"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1440px] items-center justify-between px-6 transition-all duration-500 md:px-12 lg:px-16",
            scrolled && "rounded-full"
          )}
        >
          <Link
            href="/"
            className="font-display text-2xl tracking-[0.02em] text-graphite md:text-3xl"
          >
            Arvex
            <span className="ml-1 align-super font-mono text-[8px] tracking-[0.2em] text-graphite/55">
              ®
            </span>
          </Link>

          <nav className="hidden md:block">
            <ul
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-1 transition-all duration-500",
                scrolled
                  ? "glass shadow-glass"
                  : "bg-transparent"
              )}
            >
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="rounded-full px-4 py-2 text-[11.5px] uppercase tracking-[0.16em] text-graphite/70 transition-colors hover:bg-white/55 hover:text-graphite"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/consultation"
              className="rounded-full bg-graphite px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-ivory transition-all duration-500 hover:bg-ink hover:shadow-halo"
            >
              Book Consultation
            </a>
          </div>

          {/* Mobile trigger — 44px tap target per accessibility minimum */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full glass md:hidden"
            aria-label="Open menu"
          >
            <span className="flex h-3 w-5 flex-col justify-between">
              <span className="block h-px w-full bg-graphite" />
              <span className="block h-px w-3/4 self-end bg-graphite" />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[70] md:hidden"
          >
            {/* Holographic backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 glass"
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full flex-col justify-between px-8 py-10"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl text-graphite">Arvex</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70"
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="#0B0B0E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <ul className="space-y-6">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block font-display text-[clamp(2.5rem,10vw,3.5rem)] tracking-tight text-graphite"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div>
                <a
                  href="/consultation"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Book Private Consultation →
                </a>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/40">
                  info@arvexgroup.in · Noida · Mumbai · Delhi
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
