import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ConsultationHero } from "@/components/consultation/Hero";
import { ConsultationServices } from "@/components/consultation/Services";
import { ConsultationProcess } from "@/components/consultation/Process";
import { ConsultationSpaces } from "@/components/consultation/Spaces";
import { ConsultationChannels } from "@/components/consultation/Channels";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Private Consultation",
  description:
    "Book a private lighting consultation with the Arvex atelier. Personalised guidance on chandelier sizing, ceiling height, materials, and bespoke commissions for villas, hospitality, and luxury commercial interiors across India.",
  alternates: { canonical: "/consultation" },
};

// Resolve the hero image at build time. If the dedicated consultation
// photograph hasn't been generated yet, fall back to an existing context
// shot so the page is still beautiful from day one.
// NOTE: The fallback filename references the physical file on disk which
// retains its original generation name regardless of the product rename.
function resolveHeroImage(): string {
  const dedicated = "/assets/consultation/consultation-hero.jpg";
  const fallback = "/assets/products/generated/aurora-veil-context.jpg";
  const dedicatedPath = join(process.cwd(), "public", dedicated);
  return existsSync(dedicatedPath) ? dedicated : fallback;
}

export default function ConsultationPage() {
  const heroSrc = resolveHeroImage();
  return (
    <>
      <ConsultationHero heroSrc={heroSrc} />
      <ConsultationServices />
      <ConsultationProcess />
      <ConsultationSpaces />
      <LeadForm />
      <ConsultationChannels />
    </>
  );
}
