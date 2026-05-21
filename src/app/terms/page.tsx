import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Arvex Atelier",
  description: "Terms governing commissions, bespoke production, pricing, delivery, and installation policies for Arvex luxury lighting fixtures.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="relative bg-ivory-veil min-h-screen py-28 md:py-44">
      {/* Subtle aesthetic lines */}
      <div className="absolute left-0 right-0 top-0 section-rule" aria-hidden />
      
      <div className="mx-auto max-w-[800px] px-6 md:px-8">
        {/* Header */}
        <header className="mb-16 md:mb-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600 mb-4">
            Legal & Production
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] tracking-tight text-graphite">
            Terms & Conditions
          </h1>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-graphite/40">
            Last Updated: May 2026
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-stone max-w-none text-[15px] leading-[1.85] text-graphite/75 space-y-12">
          <section className="space-y-4">
            <h2 className="font-display text-2xl text-graphite tracking-tight">1. Atelier Commissions</h2>
            <p>
              All Arvex lighting fixtures are handcrafted individually to order. Commissions are initiated upon receipt of the deposit. Any technical customization requests (such as custom drops or rod lengths) must be finalized and signed off in the technical drawings prior to the commencement of handcrafting.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-graphite tracking-tight">2. Payment & Valuation</h2>
            <p>
              Pricing is subject to customization specifications and material costs. Unless explicitly stated in a project proposal, estimates remain valid for 30 days. Commissions require a standard deposit to secure craftsmanship scheduling, with the remaining balance settled prior to final delivery or hand-off.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-graphite tracking-tight">3. Production & Lead Times</h2>
            <p>
              Standard lead times represent handcrafting durations at our Jaipur workshop. While we strive to meet all estimates, custom commissions or complex structural requirements may alter production timelines. Clients will receive periodic status reviews from their dedicated project coordinator.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-graphite tracking-tight">4. Logistics, Delivery & Installation</h2>
            <p>
              Delivery is executed via our white-glove transport partners to ensure the physical integrity of delicate materials (hand-blown glass, custom metals). The client is responsible for ensuring that the site ceiling support structure has been prepared to handle the weight specified in the technical data sheet. Installation must be conducted by certified electricians.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-graphite tracking-tight">5. Limited Warranty & Intellectual Property</h2>
            <p>
              Arvex warrants all structural frameworks and electrical hardware components against defects in materials and workmanship under normal use for a specified duration from installation. All designs, sketches, glass configurations, and digital content remain the intellectual property of Arvex Atelier.
            </p>
          </section>

          {/* Contact Block */}
          <footer className="pt-16 border-t border-champagne-200/60 mt-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600 mb-2">
              Legal Enquiries
            </p>
            <p className="text-[13px] text-graphite/60">
              For complete contractual templates, architectural contracts, or trade terms, reach our legal support team at{" "}
              <a href="mailto:trade@arvex.studio" className="text-graphite underline hover:text-champagne-600 transition-colors">
                trade@arvex.studio
              </a>.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
