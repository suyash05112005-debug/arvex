"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/collection", label: "Collection" },
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
          "sticky top-0 z-50 w-full transition-all duration-500 border-b border-graphite/5 bg-high-key/85 backdrop-blur-xl",
          scrolled ? "py-3 shadow-sm" : "py-5"
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-12 lg:px-16">
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
            <ul className="flex items-center gap-6">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      if (l.label === "Consultation" || l.label === "Quick Enquire") {
                        e.preventDefault();
                        window.dispatchEvent(new Event('open-consultation-modal'));
                      }
                    }}
                    className="group relative flex items-center px-2 py-2 text-[11px] uppercase tracking-[0.18em] text-graphite/70 transition-colors hover:text-graphite"
                  >
                    {l.label}
                    <span className="absolute inset-x-2 bottom-1.5 h-px scale-x-0 bg-champagne-400 transition-transform duration-500 ease-luxury group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center md:flex gap-4">
            <a 
              href="https://www.instagram.com/arvexgroups/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full text-graphite/70 transition-all hover:bg-white/50 hover:text-graphite"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <button
              onClick={() => window.dispatchEvent(new Event('open-consultation-modal'))}
              className="group relative overflow-hidden rounded-sm border border-graphite/20 bg-transparent px-6 py-2.5 text-[10.5px] uppercase tracking-[0.2em] text-graphite transition-all duration-500 hover:border-graphite hover:bg-graphite hover:text-ivory"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Consultation
              </span>
            </button>
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
                      onClick={(e) => {
                        setOpen(false);
                        if (l.label === "Consultation" || l.label === "Quick Enquire") {
                          e.preventDefault();
                          window.dispatchEvent(new Event('open-consultation-modal'));
                        }
                      }}
                      className="block font-display text-[clamp(2.5rem,10vw,3.5rem)] tracking-tight text-graphite"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div>
                <button
                  onClick={() => {
                    setOpen(false);
                    window.dispatchEvent(new Event('open-consultation-modal'));
                  }}
                  className="btn-primary w-full justify-center"
                >
                  Book Private Consultation →
                </button>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/40">
                  info@arvexgroup.in · Noida · Mumbai · Delhi
                </p>
              </div>

              <div className="mt-12 flex justify-between items-end border-t border-graphite/10 pt-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/50">
                  Arvex Atelier
                </span>
                <a 
                  href="https://www.instagram.com/arvexgroups/?hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite hover:text-champagne-600 transition-colors"
                >
                  Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
