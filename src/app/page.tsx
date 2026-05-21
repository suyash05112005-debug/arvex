import { Hero } from "@/components/Hero";
import { FeaturedPiece } from "@/components/FeaturedPiece";
import { Manifesto } from "@/components/Manifesto";
import { Gallery } from "@/components/Gallery";
import { Craftsmanship } from "@/components/Craftsmanship";
import { Recognition } from "@/components/Recognition";
import { ConsultationCTA } from "@/components/ConsultationCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPiece />
      <Manifesto />
      <Gallery />
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
