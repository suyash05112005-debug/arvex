import { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { ConsultationCTA } from "@/components/ConsultationCTA";

export const metadata: Metadata = {
  title: "Luxury Chandeliers & Premium Designer Lighting | The Collection",
  description:
    "Explore the complete Arvex Collection of luxury chandeliers, modern pendant lights, and architectural lighting installations. Hand-built in India for elite residential and hospitality projects.",
  alternates: { canonical: "/collection" },
};

export default function CollectionPage() {
  return (
    <>
      <div className="pt-32">
        <Gallery />
      </div>
      <ConsultationCTA />
    </>
  );
}
