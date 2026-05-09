import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, getProduct } from "@/data/products";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/seo/JsonLd";
import { ProductHero } from "@/components/ProductHero";
import { ProductPerspectives } from "@/components/ProductPerspectives";
import { LeadForm } from "@/components/LeadForm";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getProduct(params.slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.tagline}`,
    description: p.description,
    openGraph: {
      title: `${p.name} — Arvex`,
      description: p.tagline,
      type: "website",
    },
    alternates: { canonical: `/product/${p.slug}` },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) return notFound();

  // Suggest 3 related pieces (same category, excluding current).
  const related = PRODUCTS.filter(
    (x) => x.category === p.category && x.slug !== p.slug
  ).slice(0, 3);

  return (
    <>
      <ProductJsonLd product={p} />
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", url: "/" },
          { name: "Collection", url: "/#collection" },
          { name: p.name, url: `/product/${p.slug}` },
        ]}
      />

      <ProductHero product={p} />

      {/* Specifications */}
      <section className="relative border-t border-champagne-200/60 py-24 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-7 text-graphite/65">Specifications</p>
              <h2 className="font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] tracking-tight text-graphite">
                Built to outlive the building it lights.
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-[1.7] text-graphite/65">
                All Arvex chandeliers are made to order, signed by the maker, and
                delivered with a lifetime aftercare commitment.
              </p>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <dl className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
                <Spec k="Diameter" v={`${p.diameterCm} cm`} />
                <Spec k="Height" v={`${p.heightCm} cm`} />
                <Spec k="Weight" v={`${p.weightKg} kg`} />
                <Spec k="Lead time" v={`${p.leadTimeWeeks} weeks`} />
                <Spec k="Edition" v={p.edition} />
                <Spec k="Materials" v={p.materials.join(" · ")} />
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Materials & atmosphere */}
      <section className="relative border-t border-champagne-200/60 bg-ivory-veil py-24 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-7 text-graphite/65">Materials</p>
              <h2 className="font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] tracking-tight text-graphite">
                Hand-selected, hand-finished.
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-graphite/65">
                Every material is chosen during the consultation and approved against
                physical samples. The list below indicates the standard build —
                bespoke variants are quoted on request.
              </p>
            </div>
            <ul className="lg:col-span-7 lg:col-start-6">
              {p.materials.map((m, i) => (
                <li
                  key={m}
                  className="grid grid-cols-12 items-baseline gap-4 border-t border-champagne-200/70 py-5 first:border-t-0"
                >
                  <span className="col-span-1 font-mono text-[10px] uppercase tracking-[0.28em] text-champagne-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-11 font-display text-[22px] leading-tight tracking-tight text-graphite md:text-[26px]">
                    {m}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ProductPerspectives product={p} />

      {/* Related */}
      {related.length > 0 && (
        <section className="relative border-t border-champagne-200/60 py-24 md:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
            <div className="mb-14 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow mb-7 text-graphite/65">From the same collection</p>
                <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.05] tracking-tight text-graphite">
                  Other pieces in this philosophy.
                </h2>
              </div>
              <Link
                href="/#collection"
                className="font-mono text-[10px] uppercase tracking-[0.32em] text-graphite hover:text-champagne-600"
              >
                View full collection →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/product/${r.slug}`}
                  className="group block"
                >
                  <div
                    className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-editorial transition-shadow duration-700 group-hover:shadow-glass-hover"
                    style={{
                      background: `radial-gradient(120% 80% at 50% 30%, ${r.layers[0].from} 0%, ${r.layers[0].to} 100%)`,
                    }}
                  >
                    <div
                      className="absolute inset-0 mix-blend-screen"
                      style={{
                        background: `radial-gradient(80% 60% at 50% 50%, ${r.layers[1].from} 0%, ${r.layers[1].to} 100%)`,
                      }}
                    />
                    {r.images.hero && (
                      <Image
                        src={r.images.hero}
                        alt={`${r.name} chandelier — ${r.tagline}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-center transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
                      />
                    )}
                    <div className="pointer-events-none absolute inset-3 rounded-[1px] ring-1 ring-inset ring-white/30" />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-[22px] leading-tight tracking-tight text-graphite">
                        {r.name}
                      </h3>
                      <p className="mt-1.5 text-[13px] text-graphite/55">{r.tagline}</p>
                    </div>
                    <span className="shrink-0 pt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-champagne-600">
                      {r.edition}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <LeadForm />
    </>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-b border-champagne-200/70 py-5">
      <dt className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne-600">
        {k}
      </dt>
      <dd className="mt-2 font-display text-[26px] leading-tight tracking-tight text-graphite">
        {v}
      </dd>
    </div>
  );
}
