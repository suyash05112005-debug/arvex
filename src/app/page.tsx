import { Hero } from "@/components/Hero";
import { FeaturedPiece } from "@/components/FeaturedPiece";
import { Manifesto } from "@/components/Manifesto";
import { FeaturedCollection } from "@/components/FeaturedCollection";
import { Craftsmanship } from "@/components/Craftsmanship";
import { Recognition } from "@/components/Recognition";
import { ConsultationCTA } from "@/components/ConsultationCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPiece />
      <Manifesto />
      <FeaturedCollection />
      <section id="craft" className="scroll-mt-24">
        <Craftsmanship />
      </section>
      <section id="recognition" className="scroll-mt-24">
        <Recognition />
      </section>
      <ConsultationCTA />
    </>
  );
}
