import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ConciergeAgent } from "@/components/ConciergeAgent";
import { ScrollProgress } from "@/components/ScrollProgress";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = process.env.SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arvex — Hand-Built Luxury Chandeliers, Made in India",
    template: "%s · Arvex",
  },
  description:
    "Arvex is a Jaipur atelier of bespoke chandeliers and architectural lighting. Hand-built, signed, and numbered for private residences, hospitality projects, and luxury commercial interiors across India.",
  keywords: [
    "luxury chandelier India",
    "bespoke chandelier",
    "hand-made chandelier Jaipur",
    "architectural lighting India",
    "luxury lighting designer",
    "custom chandelier for villas",
    "banquet hall chandelier",
    "interior designer lighting",
    "Arvex",
  ],
  openGraph: {
    type: "website",
    title: "Arvex — Hand-Built Luxury Chandeliers, Made in India",
    description:
      "Bespoke chandeliers and architectural lighting, hand-built in our Jaipur atelier. Numbered editions for residences, hospitality, and luxury commercial interiors.",
    url: SITE_URL,
    siteName: "Arvex",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arvex — Hand-Built Luxury Chandeliers, Made in India",
    description:
      "Bespoke chandeliers, hand-built in our Jaipur atelier. Numbered editions, signed by the maker, delivered with white-glove installation across India.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#F6F4EE",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased bg-high-key min-h-screen overflow-x-hidden">
        <OrganizationJsonLd />
        <ScrollProgress />
        <SmoothScroll>
          <Nav />
          <main className="relative z-[2]">{children}</main>
          <Footer />
        </SmoothScroll>
        <ConciergeAgent />
      </body>
    </html>
  );
}
