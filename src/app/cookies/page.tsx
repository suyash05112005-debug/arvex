import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies Policy — Arvex Atelier",
  description: "How Arvex Atelier uses essential, performance, and analytical cookies to refine your collection browsing and navigation experience.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <main className="relative bg-ivory-veil min-h-screen py-28 md:py-44">
      {/* Subtle aesthetic lines */}
      <div className="absolute left-0 right-0 top-0 section-rule" aria-hidden />
      
      <div className="mx-auto max-w-[800px] px-6 md:px-8">
        {/* Header */}
        <header className="mb-16 md:mb-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600 mb-4">
            Digital Experience
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] tracking-tight text-graphite">
            Cookies Policy
          </h1>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-graphite/40">
            Last Updated: May 2026
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-stone max-w-none text-[15px] leading-[1.85] text-graphite/75 space-y-12">
          <section className="space-y-4">
            <h2 className="font-display text-2xl text-graphite tracking-tight">1. Understanding Cookies</h2>
            <p>
              Cookies are small text documents saved on your device when you load our online collection. They allow our systems to recognize your parameters (such as filter choices or page preferences) and deliver a smooth, high-fidelity experience.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-graphite tracking-tight">2. Types of Cookies We Use</h2>
            <p>
              We utilize a minimal set of cookies, categorized into:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Essential Cookies:</strong> Critical for navigation, system operations, and loading layouts (such as local caching parameters).</li>
              <li><strong>Performance & Analytics:</strong> Tracking how visitors navigate products, select filter categories, or interact with images. This remains strictly anonymous and is used purely to optimize site performance.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-graphite tracking-tight">3. Controlling Your Preferences</h2>
            <p>
              You can modify or block cookie settings inside your browser controls. Please note that disabling essential cookies may impact specific visual features, such as 3D tilts, image scaling, or layout transitions.
            </p>
          </section>

          {/* Contact Block */}
          <footer className="pt-16 border-t border-champagne-200/60 mt-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600 mb-2">
              Questions
            </p>
            <p className="text-[13px] text-graphite/60">
              If you have queries regarding our cookie preferences or web technology integrations, please write to us at{" "}
              <a href="mailto:aftercare@arvex.studio" className="text-graphite underline hover:text-champagne-600 transition-colors">
                aftercare@arvex.studio
              </a>.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
