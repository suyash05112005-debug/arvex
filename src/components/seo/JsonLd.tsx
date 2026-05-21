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
    <>
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
          sameAs: ["https://www.instagram.com/arvexgroups/?hl=en"],
          address: {
            "@type": "PostalAddress",
            addressCountry: "IN",
            addressRegion: "UP",
            addressLocality: "Noida",
            postalCode: "201301",
            streetAddress: "G-19, Noida Sector 3",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+91-74286-90215",
              email: "info@arvexgroup.in",
              contactType: "customer support",
              areaServed: "IN",
              availableLanguage: ["en", "hi"],
            },
          ],
        }}
      />
      <Script
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Arvex Atelier",
          image: `${SITE_URL}/logo.svg`,
          "@id": `${SITE_URL}/#localbusiness`,
          url: SITE_URL,
          telephone: "+91-74286-90215",
          address: {
            "@type": "PostalAddress",
            streetAddress: "G-19, Noida Sector 3",
            addressLocality: "Noida",
            addressRegion: "UP",
            postalCode: "201301",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 28.5759,
            longitude: 77.3150
          },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            opens: "10:00",
            closes: "19:00"
          },
          sameAs: [
            "https://www.instagram.com/arvexgroups/?hl=en"
          ]
        }}
      />
    </>
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
