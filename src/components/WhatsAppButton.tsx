"use client";

import { motion } from "framer-motion";

export function WhatsAppButton() {
  const message = "Hello Arvex, I would like a private consultation regarding your luxury lighting collection.";
  const waUrl = `https://wa.me/919599075766?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consult via WhatsApp"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className="fixed bottom-6 right-6 z-[60] group flex items-center gap-3 rounded-full bg-white/70 pl-4 pr-5 py-3 shadow-editorial backdrop-blur-md ring-1 ring-champagne-300/40 transition-all duration-500 hover:bg-white/90 hover:shadow-glass-hover hover:scale-[1.02] md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 safe-bottom"
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-graphite text-ivory">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.38c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.575-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.445 4.432-9.878 9.885-9.878 2.64 0 5.122 1.028 6.988 2.895A9.824 9.824 0 0121.93 11.91c0 5.446-4.433 9.874-9.879 9.874m8.902-18.774A12.527 12.527 0 0012.053 0C5.143 0-.005 5.147-.005 12.057a12.49 12.49 0 001.674 6.275L0 24l5.82-1.526a12.464 12.464 0 006.229 1.672h.005c6.908 0 12.054-5.148 12.054-12.058a12.522 12.522 0 00-3.155-8.86" />
        </svg>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-graphite/80 group-hover:text-graphite">
        Private Consultation
      </span>
    </motion.a>
  );
}
