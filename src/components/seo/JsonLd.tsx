import type { Product } from "@/data/products";

const SITE_URL = process.env.SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

function Script({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // schema.org JSON-LD — server-rendered, never user-controlled
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Arvex",
        legalName: "Arvex Atelier",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.svg`,
        description:
          "Hand-built bespoke chandeliers and architectural lighting — made one at a time in our Noida studio for private residences, hospitality projects, and luxury commercial interiors across India.",
        sameAs: [],
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
          addressRegion: "UP",
          addressLocality: "Noida",
          postalCode: "201301",
          streetAddress: "G-19, Sector 2",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+91-95990-75766",
            email: "info@arvexgroup.in",
            contactType: "customer support",
            areaServed: "IN",
            availableLanguage: ["en", "hi"],
          },
        ],
      }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        brand: { "@type": "Brand", name: "Arvex" },
        category: product.category,
        material: product.materials.join(", "),
        productionDate: new Date().getFullYear().toString(),
        additionalProperty: [
          { "@type": "PropertyValue", name: "Diameter (cm)", value: product.diameterCm },
          { "@type": "PropertyValue", name: "Height (cm)", value: product.heightCm },
          { "@type": "PropertyValue", name: "Weight (kg)", value: product.weightKg },
          { "@type": "PropertyValue", name: "Lead time (weeks)", value: product.leadTimeWeeks },
          { "@type": "PropertyValue", name: "Edition", value: product.edition },
        ],
        offers: {
          "@type": "AggregateOffer",
          availability: "https://schema.org/MadeToOrder",
          priceCurrency: "INR",
          // Indicative range only. Every Arvex piece is bespoke and quoted
          // per project after a brief; treat these figures as illustrative
          // rather than fixed.
          lowPrice: 1500000,
          highPrice: 20000000,
        },
        url: `${SITE_URL}/product/${product.slug}`,
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  trail,
}: {
  trail: { name: string; url: string }[];
}) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.name,
          item: t.url.startsWith("http") ? t.url : `${SITE_URL}${t.url}`,
        })),
      }}
    />
  );
}
