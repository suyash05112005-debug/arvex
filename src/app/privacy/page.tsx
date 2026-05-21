import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Arvex Atelier",
  description: "How Arvex Atelier handles data collection, client confidentiality, and security across our digital platforms and bespoke lighting commissions.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="relative bg-ivory-veil min-h-screen py-28 md:py-44">
      {/* Subtle aesthetic lines */}
      <div className="absolute left-0 right-0 top-0 section-rule" aria-hidden />
      
      <div className="mx-auto max-w-[800px] px-6 md:px-8">
        {/* Header */}
        <header className="mb-16 md:mb-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600 mb-4">
            Legal & Confidentiality
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] tracking-tight text-graphite">
            Privacy Policy
          </h1>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-graphite/40">
            Last Updated: May 2026
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-stone max-w-none text-[15px] leading-[1.85] text-graphite/75 space-y-12">
          <section className="space-y-4">
            <h2 className="font-display text-2xl text-graphite tracking-tight">1. Commitment to Discretion</h2>
            <p>
              At Arvex, discretion is fundamental to our craftsmanship. We respect the privacy of our clients, architectural partners, and digital visitors. This policy outlines how we gather, utilize, and protect your information when engaging with our atelier or using our online channels.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-graphite tracking-tight">2. Information We Collect</h2>
            <p>
              We only collect data essential to delivering our lighting commissions, consultations, and architectural integrations:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Consultation Details:</strong> Name, contact coordinates (phone, email), and company name provided during private enquiries.</li>
              <li><strong>Project Metadata:</strong> Project types, room dimensions, spatial drawings, and designer briefs uploaded or shared during consultation.</li>
              <li><strong>Usage Analytics:</strong> Anonymous diagnostic data regarding how visitors navigate our collection page and interact with design layouts.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-graphite tracking-tight">3. How Your Data is Used</h2>
            <p>
              All shared details remain strictly internal. We use your parameters to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Process and execute bespoke chandelier commissions.</li>
              <li>Deliver technical calculations, height measurements, and structural advice.</li>
              <li>Coordinate white-glove transport and installations directly to private residences.</li>
              <li>Send twice-yearly newsletters (only if explicitly subscribed to our Atelier Journal).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-graphite tracking-tight">4. Client Discretion & Third Parties</h2>
            <p>
              We do not sell, lease, or distribute client records. To execute installations or structural verifications, project details may be shared only with verified logistical partners under strict confidentiality agreements.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-graphite tracking-tight">5. Data Integrity & Security</h2>
            <p>
              All customer interactions are safeguarded using secure server routing. Submission forms are processed through modern web integrations with restricted administrative access. Project documents (drawings, renders) are archived in localized offline servers within our workshop.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-graphite tracking-tight">6. Your Rights</h2>
            <p>
              You have the right to request a copy of the personal information we hold, update incorrect parameters, or ask for complete deletion of your records from our archive.
            </p>
          </section>

          {/* Contact Block */}
          <footer className="pt-16 border-t border-champagne-200/60 mt-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-600 mb-2">
              Enquiries
            </p>
            <p className="text-[13px] text-graphite/60">
              For security requests or questions regarding data usage, contact our data protection coordinator at{" "}
              <a href="mailto:privacy@arvex.studio" className="text-graphite underline hover:text-champagne-600 transition-colors">
                privacy@arvex.studio
              </a>.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
