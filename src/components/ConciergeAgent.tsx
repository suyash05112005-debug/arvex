"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "agent"; text: string; suggestions?: string[] };

const INTRO: Message = {
  role: "agent",
  text:
    "Welcome to Arvex. I can help you find a piece for a specific room, or arrange a private consultation with a senior member of the atelier.",
  suggestions: [
    "Help me find a piece",
    "Book a private consultation",
    "What is the lead time?",
  ],
};

export function ConciergeAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INTRO]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || pending) return;
    setMessages((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setPending(true);
    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: t }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Concierge unavailable");
      setMessages((m) => [
        ...m,
        { role: "agent", text: data.reply, suggestions: data.suggestions },
      ]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "agent",
          text:
            e instanceof Error
              ? e.message
              : "Concierge is briefly unavailable. The atelier email is fastest: hello@arvex.studio",
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      {/* Concierge trigger — restrained, warm, hospitality-style. */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close consultation" : "Open consultation"}
        className="fixed bottom-6 right-6 z-[60] h-14 w-14 rounded-full transition-transform duration-700 hover:scale-[1.04] md:h-[60px] md:w-[60px]"
      >
        <span className="absolute -inset-1 rounded-full glow-champagne blur-md opacity-70" />
        <span className="relative flex h-full w-full items-center justify-center rounded-full bg-graphite text-ivory shadow-editorial ring-1 ring-champagne-300/40">
          {open ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <span className="font-display text-[20px] leading-none">A</span>
          )}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[60] flex h-[72vh] max-h-[640px] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[6px] glass shadow-halo"
            role="dialog"
            aria-label="Arvex concierge"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/40 px-6 py-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne-600">
                  Atelier · Jaipur
                </p>
                <p className="mt-1 font-display text-[22px] leading-tight text-graphite">
                  Consultation
                </p>
              </div>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite/55">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-champagne-500" />
                </span>
                Available
              </span>
            </div>

            {/* Messages */}
            <div
              ref={scrollerRef}
              className="flex-1 overflow-y-auto px-5 py-5 space-y-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[85%] rounded-sm bg-graphite px-4 py-2.5 text-[14px] leading-relaxed text-ivory"
                      : "mr-auto max-w-[90%] rounded-sm bg-white/75 px-4 py-3 text-[14px] leading-[1.65] text-graphite"
                  }
                >
                  {m.text}
                  {m.suggestions && m.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {m.suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="rounded-full border border-champagne-300/60 bg-white/40 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-graphite/70 transition-colors hover:border-champagne-500 hover:text-graphite"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {pending && (
                <div className="mr-auto rounded-[2px] bg-white/70 px-4 py-2.5 text-sm">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-graphite/60 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-graphite/60 [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-graphite/60 [animation-delay:240ms]" />
                  </span>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-white/40 bg-white/30 p-3"
            >
              <div className="flex items-center gap-2 rounded-full border border-graphite/15 bg-white/65 pl-5 pr-1.5 focus-within:border-champagne-500 focus-within:shadow-halo">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tell us about your project…"
                  className="flex-1 bg-transparent py-3 text-[14px] text-graphite placeholder:text-graphite/40 outline-none"
                  maxLength={500}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || pending}
                  className="rounded-full bg-graphite px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-ivory disabled:opacity-30"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
