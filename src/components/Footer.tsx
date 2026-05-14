"use client";

import { useState, type FormEvent } from "react";

export function Footer() {
  return (
    <footer className="relative border-t border-champagne-200/60 bg-ivory-veil pt-20 md:pt-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        {/* Top row — newsletter + atelier */}
        <div className="grid grid-cols-1 gap-12 pb-16 md:gap-14 md:pb-20 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-7 text-graphite/65">The Atelier Journal</p>
            <h3 className="font-display text-[clamp(1.8rem,2.6vw,2.4rem)] leading-[1.1] tracking-tight text-graphite">
              Two letters a year, from the atelier — new pieces, archived
              commissions, and the occasional drawing.
            </h3>
            <NewsletterForm />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/40">
              No promotions. No third parties. Unsubscribe in one click.
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600">
              Atelier
            </p>
            <address className="mt-5 not-italic text-[14px] leading-[1.85] text-graphite/75">
              Arvex
              <br />
              G-19, Sector 2
              <br />
              Noida, UP 201301, India
              <br />
              <a
                className="mt-3 inline-block text-graphite hover:text-champagne-600 transition-colors"
                href="mailto:info@arvexgroup.in"
              >
                info@arvexgroup.in
              </a>
              <br />
              <a
                className="inline-block text-graphite hover:text-champagne-600 transition-colors"
                href="tel:+919599075766"
              >
                +91 95990 75766
              </a>
            </address>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600">
              Presence
            </p>
            <ul className="mt-5 space-y-1.5 text-[14px] leading-[1.85] text-graphite/75">
              <li>Noida · Studio & Workshop</li>
              <li>Mumbai · by appointment</li>
              <li>New Delhi · by appointment</li>
              <li>Bengaluru · by appointment</li>
              <li>Hyderabad · by appointment</li>
            </ul>
          </div>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 gap-8 border-t border-champagne-200/60 py-12 md:grid-cols-5 md:gap-10 md:py-14">
          <Col title="Collection">
            <a href="#collection">All pieces</a>
            <a href="/?collection=quantum-cascade#collection">Flowing Crystal</a>
            <a href="/?collection=kinetic-geometry#collection">Modern Geometric</a>
            <a href="/?collection=bio-luminescent#collection">Organic Series</a>
            <a href="/?collection=hyper-minimalist#collection">The Minimalist</a>
          </Col>
          <Col title="Atelier">
            <a href="#craft">The Craft</a>
            <a href="#enquire">Bespoke commissions</a>
            <a href="#enquire">Architectural integration</a>
            <a href="#recognition">Recognition</a>
          </Col>
          <Col title="Service">
            <a href="/consultation">Private consultation</a>
            <a href="/consultation">Project visits</a>
            <a href="/consultation">White-glove installation</a>
            <a href="mailto:aftercare@arvex.studio">Aftercare</a>
            <a
              href={`https://wa.me/919599075766?text=${encodeURIComponent(
                "Hello Arvex, I would like a private consultation regarding your luxury lighting collection."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consult via WhatsApp
            </a>
          </Col>
          <Col title="Press">
            <a href="mailto:press@arvex.studio">Media enquiries</a>
            <a href="mailto:press@arvex.studio">Press kit</a>
          </Col>
          <Col title="Trade">
            <a href="mailto:trade@arvex.studio">Architects & designers</a>
            <a href="mailto:trade@arvex.studio">Distributor enquiries</a>
            <a href="mailto:trade@arvex.studio">Hospitality groups</a>
          </Col>
        </div>

        {/* Wordmark + meta */}
        <div className="border-t border-champagne-200/60 pb-10 pt-10 md:pb-12 md:pt-12">
          <div className="font-display text-[clamp(3.5rem,18vw,16rem)] leading-none tracking-tight text-graphite">
            Arvex
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/40 md:mt-10 md:flex-row md:items-center">
            <span>© {new Date().getFullYear()} Arvex Atelier. All rights reserved.</span>
            <span>Hand-built in Jaipur · Numbered editions across India</span>
            <span className="flex gap-6">
              <a href="/privacy" className="hover:text-graphite">Privacy</a>
              <a href="/terms" className="hover:text-graphite">Terms</a>
              <a href="/cookies" className="hover:text-graphite">Cookies</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600">
        {title}
      </p>
      <ul className="space-y-2.5 text-[13px] text-graphite/75">
        {Array.isArray(children) ? (
          children.map((c, i) => (
            <li key={i} className="block transition-colors hover:text-graphite">
              {c}
            </li>
          ))
        ) : (
          <li>{children}</li>
        )}
      </ul>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "ok") return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("err");
      return;
    }
    
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "b5344f78-734c-4845-941e-b97f77654b73",
          subject: "New Newsletter Subscriber",
          from_name: "Arvex Newsletter",
          replyto: email,
          email,
        }),
      });
      
      if (!res.ok) throw new Error();
      
      setStatus("ok");
      setEmail("");
    } catch (err) {
      console.error("[Web3Forms Newsletter Error]:", err);
      setStatus("err");
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 max-w-md">
      <label className="flex items-stretch overflow-hidden rounded-full border border-graphite/15 bg-white/60 transition-colors focus-within:border-champagne-500 focus-within:shadow-halo">
        <span className="sr-only">Email address</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="Your email address"
          className="flex-1 bg-transparent py-3.5 pl-6 pr-3 text-[14px] text-graphite placeholder:text-graphite/40 outline-none"
        />
        <button
          type="submit"
          className="m-1 rounded-full bg-graphite px-6 text-[10px] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-ink"
        >
          Subscribe
        </button>
      </label>
      {status === "ok" && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-champagne-700">
          Thank you. The next letter will arrive at the start of the season.
        </p>
      )}
      {status === "err" && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-rose-700">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}
