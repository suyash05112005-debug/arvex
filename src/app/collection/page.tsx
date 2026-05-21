import { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { ConsultationCTA } from "@/components/ConsultationCTA";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Explore the full collection of Arvex bespoke lighting and architectural masterpieces.",
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
