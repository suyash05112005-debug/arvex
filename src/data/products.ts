import imageManifest from "./product-images.json";

export type Category =
  | "quantum-cascade"
  | "kinetic-geometry"
  | "bio-luminescent"
  | "hyper-minimalist";

export type ImageKind = "hero" | "detail" | "context" | "ortho" | "low" | "side";

export type ProductImages = Partial<Record<ImageKind, string>>;

export type Product = {
  slug: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  materials: string[];
  diameterCm: number;
  heightCm: number;
  weightKg: number;
  leadTimeWeeks: number;
  edition: string;
  // Pseudo-3D parallax depth: each layer renders with a different translate factor.
  // Used as the loading state (and as the fallback when generated images are absent).
  layers: { hue: string; from: string; to: string; depth: number }[];
  // Real photography paths, populated from product-images.json by the
  // Leonardo generation script. Absent keys → component falls back to the
  // gradient/SVG composition. Empty object until the script has run.
  images: ProductImages;
};

const MANIFEST = imageManifest as Record<string, ProductImages>;

export const CATEGORIES: { id: Category; name: string; description: string }[] =
  [
    {
      id: "quantum-cascade",
      name: "Flowing Crystal",
      description:
        "Luminous cascades of hand-cut crystal and champagne-brass. Glamorous, atmospheric lighting for grand Indian residences.",
    },
    {
      id: "kinetic-geometry",
      name: "Modern Geometric",
      description:
        "Balanced, spatial forms with contemporary luxury at their core. Architectural precision meeting the warmth of home.",
    },
    {
      id: "bio-luminescent",
      name: "Organic Series",
      description:
        "Soft, emotional silhouettes inspired by nature. Artistic glass and porcelain forms that feel collectible and timeless.",
    },
    {
      id: "hyper-minimalist",
      name: "The Minimalist",
      description:
        "Clean, sculptural structures of light. The architecture of a room, distilled to its most essential, timeless line.",
    },
  ];

const PRODUCTS_BASE: Omit<Product, "images">[] = [
  // QUANTUM CASCADE
  {
    slug: "aurora",
    name: "Aurora",
    category: "quantum-cascade",
    tagline: "A waterfall of crystal, in champagne brass.",
    description:
      "Aurora suspends 1,184 hand-cut crystal pendants along a curved champagne-brass spine. A dimmable warm-white core lets the piece ripple from soft candlelight to a clear evening glow, controllable by app or wall dimmer.",
    materials: ["Champagne brass", "Hand-cut crystal", "Warm-white LED core"],
    diameterCm: 90,
    heightCm: 240,
    weightKg: 38,
    leadTimeWeeks: 14,
    edition: "Edition of 12",
    layers: [
      { hue: "210", from: "#E2F0FF", to: "#9DC7FF", depth: 0 },
      { hue: "210", from: "#FFFFFF", to: "#C2DEFF", depth: 0.4 },
      { hue: "210", from: "rgba(255,255,255,0.0)", to: "rgba(111,168,247,0.6)", depth: 0.8 },
    ],
  },
  {
    slug: "cascade",
    name: "Cascade",
    category: "quantum-cascade",
    tagline: "A pillar of atmospheric light.",
    description:
      "A 3.2-metre vertical column of refractive crystal rods, internally lit by a slow-pulsing core. Cascade slows the eye like a snowstorm seen from a warm room.",
    materials: ["Optical crystal", "Brushed titanium", "RGB-W core"],
    diameterCm: 60,
    heightCm: 320,
    weightKg: 52,
    leadTimeWeeks: 16,
    edition: "Edition of 8",
    layers: [
      { hue: "200", from: "#FAF8F3", to: "#E2F0FF", depth: 0 },
      { hue: "200", from: "rgba(255,255,255,0.0)", to: "rgba(157,199,255,0.7)", depth: 0.45 },
      { hue: "200", from: "rgba(255,255,255,0.0)", to: "rgba(232,236,240,0.95)", depth: 0.85 },
    ],
  },
  {
    slug: "celeste",
    name: "Celeste",
    category: "quantum-cascade",
    tagline: "Liquid light, frozen mid-fall.",
    description:
      "Bespoke mercury-finished blown-glass spheres cascade along a parametric curve. Internal fiber-optic threads thread through every sphere, creating the illusion of trapped liquid light.",
    materials: ["Mercury-blown glass", "Polished steel", "Fiber optics"],
    diameterCm: 110,
    heightCm: 200,
    weightKg: 44,
    leadTimeWeeks: 12,
    edition: "Edition of 20",
    layers: [
      { hue: "220", from: "#F2F8FF", to: "#CCD3DB", depth: 0 },
      { hue: "220", from: "rgba(255,255,255,0.0)", to: "rgba(168,178,190,0.8)", depth: 0.5 },
      { hue: "220", from: "rgba(255,255,255,0.0)", to: "rgba(111,168,247,0.5)", depth: 0.85 },
    ],
  },
  {
    slug: "vesper",
    name: "Vesper",
    category: "quantum-cascade",
    tagline: "1,000 quiet points of light.",
    description:
      "A choreographic chandelier: 1,024 cut-crystal pendants on near-invisible steel filament, lit individually by a warm dimmable core. Programmable scenes shift from a single point of light to a soft rainfall.",
    materials: ["Cut crystal", "Steel filament", "Anodized aluminum frame"],
    diameterCm: 140,
    heightCm: 220,
    weightKg: 36,
    leadTimeWeeks: 18,
    edition: "Made-to-order",
    layers: [
      { hue: "215", from: "#FFFFFF", to: "#E8ECF0", depth: 0 },
      { hue: "215", from: "rgba(255,255,255,0.0)", to: "rgba(111,168,247,0.55)", depth: 0.55 },
      { hue: "215", from: "rgba(255,255,255,0.0)", to: "rgba(208,196,232,0.55)", depth: 0.9 },
    ],
  },
  {
    slug: "opal",
    name: "Opal",
    category: "quantum-cascade",
    tagline: "Glacial water, suspended.",
    description:
      "Hand-cut crystal slabs hang along a champagne-brass ribbon, each edge-lit to mimic the cool blue interior of a deep-water reflection.",
    materials: ["Hand-cut crystal", "Champagne-brass ribbon", "Edge-lit LED"],
    diameterCm: 80,
    heightCm: 260,
    weightKg: 48,
    leadTimeWeeks: 14,
    edition: "Edition of 16",
    layers: [
      { hue: "200", from: "#E2F0FF", to: "#9DC7FF", depth: 0 },
      { hue: "200", from: "rgba(255,255,255,0.0)", to: "rgba(157,199,255,0.7)", depth: 0.5 },
      { hue: "200", from: "rgba(255,255,255,0.0)", to: "rgba(26,55,104,0.5)", depth: 0.85 },
    ],
  },
  // KINETIC GEOMETRY
  {
    slug: "axis",
    name: "Axis",
    category: "kinetic-geometry",
    tagline: "A constellation that turns, slowly.",
    description:
      "Twelve concentric brass rings rotate on independent magnetic bearings. Each ring carries a single LED line — the result is a slow-shifting orrery of architectural light.",
    materials: ["Brushed brass", "Magnetic bearings", "Linear LED"],
    diameterCm: 150,
    heightCm: 110,
    weightKg: 62,
    leadTimeWeeks: 18,
    edition: "Edition of 10",
    layers: [
      { hue: "40", from: "#FAF8F3", to: "#EDD8B2", depth: 0 },
      { hue: "40", from: "rgba(255,255,255,0.0)", to: "rgba(237,216,178,0.85)", depth: 0.5 },
      { hue: "40", from: "rgba(255,255,255,0.0)", to: "rgba(180,140,90,0.55)", depth: 0.85 },
    ],
  },
  {
    slug: "nova",
    name: "Nova",
    category: "kinetic-geometry",
    tagline: "A folded sky.",
    description:
      "Articulated mirror-polished panels open and close in a slow choreography (≈30 minutes per cycle). Light reflects, refracts, and disappears into negative space.",
    materials: ["Mirror-polished steel", "Servo array", "Edge-lit panels"],
    diameterCm: 120,
    heightCm: 95,
    weightKg: 54,
    leadTimeWeeks: 20,
    edition: "Edition of 6",
    layers: [
      { hue: "230", from: "#F4F6F8", to: "#CCD3DB", depth: 0 },
      { hue: "230", from: "rgba(255,255,255,0.0)", to: "rgba(208,196,232,0.7)", depth: 0.5 },
      { hue: "230", from: "rgba(255,255,255,0.0)", to: "rgba(95,110,135,0.55)", depth: 0.85 },
    ],
  },
  {
    slug: "eclipse",
    name: "Eclipse",
    category: "kinetic-geometry",
    tagline: "Architecture, levitating.",
    description:
      "Forty-eight cubic modules rise and fall on quiet linear actuators, mapping the room's acoustic signature in physical light.",
    materials: ["Anodized aluminum", "Linear actuators", "Inset LED"],
    diameterCm: 200,
    heightCm: 160,
    weightKg: 88,
    leadTimeWeeks: 22,
    edition: "Made-to-order",
    layers: [
      { hue: "220", from: "#F4F6F8", to: "#A8B2BE", depth: 0 },
      { hue: "220", from: "rgba(255,255,255,0.0)", to: "rgba(168,178,190,0.7)", depth: 0.45 },
      { hue: "220", from: "rgba(255,255,255,0.0)", to: "rgba(58,72,92,0.55)", depth: 0.85 },
    ],
  },
  {
    slug: "obsidian",
    name: "Obsidian",
    category: "kinetic-geometry",
    tagline: "A rhythmic spiral of light.",
    description:
      "A two-metre double-helix structure that rotates through one full turn over twelve hours, marking the passage of time in light.",
    materials: ["Brushed titanium", "Glass capsule", "Programmable LED"],
    diameterCm: 70,
    heightCm: 200,
    weightKg: 32,
    leadTimeWeeks: 16,
    edition: "Edition of 12",
    layers: [
      { hue: "210", from: "#FAF8F3", to: "#E8ECF0", depth: 0 },
      { hue: "210", from: "rgba(255,255,255,0.0)", to: "rgba(111,168,247,0.7)", depth: 0.5 },
      { hue: "210", from: "rgba(255,255,255,0.0)", to: "rgba(38,78,146,0.45)", depth: 0.85 },
    ],
  },
  {
    slug: "verona",
    name: "Verona",
    category: "kinetic-geometry",
    tagline: "A flower of polished steel.",
    description:
      "Hexagonal petals expand and contract on a slow circadian rhythm — closed in the morning, fully open at golden hour.",
    materials: ["Mirror steel", "Circadian controller", "Warm-white LED"],
    diameterCm: 130,
    heightCm: 90,
    weightKg: 46,
    leadTimeWeeks: 18,
    edition: "Edition of 8",
    layers: [
      { hue: "20", from: "#FAF8F3", to: "#F5C7C0", depth: 0 },
      { hue: "20", from: "rgba(255,255,255,0.0)", to: "rgba(245,199,192,0.75)", depth: 0.5 },
      { hue: "20", from: "rgba(255,255,255,0.0)", to: "rgba(180,90,75,0.45)", depth: 0.85 },
    ],
  },
  // BIO-LUMINESCENT
  {
    slug: "mira",
    name: "Mira",
    category: "bio-luminescent",
    tagline: "A luminous marine silhouette.",
    description:
      "Hand-blown silicate domes drape around a luminous core, simulating the slow, rhythmic pulse of deep-sea life.",
    materials: ["Silicate glass", "Soft silicone tendrils", "Bio-warm LED"],
    diameterCm: 95,
    heightCm: 175,
    weightKg: 28,
    leadTimeWeeks: 14,
    edition: "Edition of 14",
    layers: [
      { hue: "160", from: "#FAF8F3", to: "#C7E8DD", depth: 0 },
      { hue: "160", from: "rgba(255,255,255,0.0)", to: "rgba(199,232,221,0.8)", depth: 0.5 },
      { hue: "160", from: "rgba(255,255,255,0.0)", to: "rgba(80,160,140,0.45)", depth: 0.85 },
    ],
  },
  {
    slug: "solis",
    name: "Solis",
    category: "bio-luminescent",
    tagline: "A reef, captured in glass.",
    description:
      "Branching cast-glass structures, each individually lit, modeled on Indo-Pacific staghorn coral. No two pieces are identical.",
    materials: ["Cast glass", "Internal fiber optics", "Bronze armature"],
    diameterCm: 120,
    heightCm: 140,
    weightKg: 56,
    leadTimeWeeks: 20,
    edition: "Edition of 10",
    layers: [
      { hue: "30", from: "#FAF8F3", to: "#EDD8B2", depth: 0 },
      { hue: "30", from: "rgba(255,255,255,0.0)", to: "rgba(245,199,192,0.7)", depth: 0.5 },
      { hue: "30", from: "rgba(255,255,255,0.0)", to: "rgba(190,120,90,0.4)", depth: 0.85 },
    ],
  },
  {
    slug: "aura",
    name: "Aura",
    category: "bio-luminescent",
    tagline: "Forest after rain.",
    description:
      "A sculpted resin canopy with embedded micro-LEDs that breathe through a slow circadian curve — cool blue-green at dawn, warm amber at dusk.",
    materials: ["Bio-resin", "Embedded micro-LED", "Aluminum spine"],
    diameterCm: 160,
    heightCm: 60,
    weightKg: 34,
    leadTimeWeeks: 16,
    edition: "Edition of 12",
    layers: [
      { hue: "140", from: "#FAF8F3", to: "#C7E8DD", depth: 0 },
      { hue: "140", from: "rgba(255,255,255,0.0)", to: "rgba(199,232,221,0.85)", depth: 0.5 },
      { hue: "140", from: "rgba(255,255,255,0.0)", to: "rgba(60,140,110,0.5)", depth: 0.85 },
    ],
  },
  {
    slug: "elara",
    name: "Elara",
    category: "bio-luminescent",
    tagline: "A core of bioluminescent warmth.",
    description:
      "A 75 cm sphere with a translucent shell that hides a slow internal storm — a minimalist homage to deep-sea bioluminescence.",
    materials: ["Translucent polymer", "Internal LED grid", "Steel suspension"],
    diameterCm: 75,
    heightCm: 75,
    weightKg: 22,
    leadTimeWeeks: 12,
    edition: "Edition of 18",
    layers: [
      { hue: "240", from: "#F2F8FF", to: "#9DC7FF", depth: 0 },
      { hue: "240", from: "rgba(255,255,255,0.0)", to: "rgba(157,199,255,0.7)", depth: 0.5 },
      { hue: "240", from: "rgba(255,255,255,0.0)", to: "rgba(26,55,104,0.6)", depth: 0.9 },
    ],
  },
  {
    slug: "silhouette",
    name: "Silhouette",
    category: "bio-luminescent",
    tagline: "A bloom that listens.",
    description:
      "Silk-finish porcelain petals, each a soft luminaire. The full installation breathes in response to ambient sound, dimming when conversation rises.",
    materials: ["Bone-white porcelain", "Acoustic sensor", "Warm LED"],
    diameterCm: 110,
    heightCm: 120,
    weightKg: 40,
    leadTimeWeeks: 16,
    edition: "Edition of 10",
    layers: [
      { hue: "15", from: "#FAF8F3", to: "#F5C7C0", depth: 0 },
      { hue: "15", from: "rgba(255,255,255,0.0)", to: "rgba(245,199,192,0.7)", depth: 0.5 },
      { hue: "15", from: "rgba(255,255,255,0.0)", to: "rgba(200,140,130,0.4)", depth: 0.9 },
    ],
  },
  // HYPER-MINIMALIST
  {
    slug: "meridian",
    name: "Meridian",
    category: "hyper-minimalist",
    tagline: "A line of light, nothing else.",
    description:
      "A 2.4 m suspended bar, 12 mm thick, machined from a single billet of 6061 aluminum and edge-lit. Specified by museum architects.",
    materials: ["6061 aluminum", "Edge-lit LED", "Invisible suspension"],
    diameterCm: 5,
    heightCm: 240,
    weightKg: 12,
    leadTimeWeeks: 10,
    edition: "Made-to-order",
    layers: [
      { hue: "0", from: "#FFFFFF", to: "#E8ECF0", depth: 0 },
      { hue: "0", from: "rgba(255,255,255,0.0)", to: "rgba(232,236,240,0.95)", depth: 0.5 },
      { hue: "0", from: "rgba(255,255,255,0.0)", to: "rgba(140,150,165,0.5)", depth: 0.85 },
    ],
  },
  {
    slug: "halo",
    name: "Halo",
    category: "hyper-minimalist",
    tagline: "A perfect ring, holding nothing.",
    description:
      "An 80 cm carbon-fiber circle, hand-finished and edge-lit at exactly 4000 K. The simplest possible form for a chandelier.",
    materials: ["Carbon fiber", "Edge-lit 4000K LED", "Aircraft cable"],
    diameterCm: 80,
    heightCm: 80,
    weightKg: 6,
    leadTimeWeeks: 8,
    edition: "Edition of 25",
    layers: [
      { hue: "0", from: "#FFFFFF", to: "#F4F6F8", depth: 0 },
      { hue: "0", from: "rgba(255,255,255,0.0)", to: "rgba(204,211,219,0.7)", depth: 0.5 },
      { hue: "0", from: "rgba(255,255,255,0.0)", to: "rgba(110,120,135,0.45)", depth: 0.85 },
    ],
  },
  {
    slug: "horizon",
    name: "Horizon",
    category: "hyper-minimalist",
    tagline: "A constellation, on a plane.",
    description:
      "An invisible grid of micro-pendants — 64 individual points — appearing to float against the ceiling. Custom-mapped to each room.",
    materials: ["Micro-pendant array", "Invisible mesh", "Warm-white LED"],
    diameterCm: 240,
    heightCm: 30,
    weightKg: 18,
    leadTimeWeeks: 14,
    edition: "Made-to-order",
    layers: [
      { hue: "0", from: "#FFFFFF", to: "#F4F6F8", depth: 0 },
      { hue: "0", from: "rgba(255,255,255,0.0)", to: "rgba(168,178,190,0.6)", depth: 0.5 },
      { hue: "0", from: "rgba(255,255,255,0.0)", to: "rgba(45,55,75,0.4)", depth: 0.9 },
    ],
  },
  {
    slug: "arc",
    name: "Arc",
    category: "hyper-minimalist",
    tagline: "A single point, suspended.",
    description:
      "A 14 mm hand-cut crystal sphere, lit internally by a fiber-optic core. Specified by architects who wanted nothing — but lit.",
    materials: ["Optical crystal", "Single fiber-optic core", "Stainless thread"],
    diameterCm: 1.4,
    heightCm: 1.4,
    weightKg: 0.4,
    leadTimeWeeks: 6,
    edition: "Edition of 50",
    layers: [
      { hue: "0", from: "#FFFFFF", to: "#FAF8F3", depth: 0 },
      { hue: "0", from: "rgba(255,255,255,0.0)", to: "rgba(232,236,240,0.7)", depth: 0.5 },
      { hue: "0", from: "rgba(255,255,255,0.0)", to: "rgba(110,120,135,0.4)", depth: 0.9 },
    ],
  },
  {
    slug: "lumiere",
    name: "Lumiere",
    category: "hyper-minimalist",
    tagline: "An arc of light. The wall behind, gone.",
    description:
      "A precision arc that throws indirect light onto the ceiling, erasing the wall behind it and turning the entire room into the luminaire.",
    materials: ["Brushed steel", "Indirect LED", "Concealed mount"],
    diameterCm: 180,
    heightCm: 60,
    weightKg: 24,
    leadTimeWeeks: 12,
    edition: "Edition of 20",
    layers: [
      { hue: "210", from: "#FFFFFF", to: "#E2F0FF", depth: 0 },
      { hue: "210", from: "rgba(255,255,255,0.0)", to: "rgba(157,199,255,0.5)", depth: 0.5 },
      { hue: "210", from: "rgba(255,255,255,0.0)", to: "rgba(58,82,128,0.4)", depth: 0.9 },
    ],
  },
];

// Decorate the base array with image paths from the manifest. Empty manifest
// → empty `images` per product → components fall back to gradient compositions.
export const PRODUCTS: Product[] = PRODUCTS_BASE.map((p) => ({
  ...p,
  images: MANIFEST[p.slug] ?? {},
}));

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsByCategory(category: Category) {
  return PRODUCTS.filter((p) => p.category === category);
}

export function hasAnyImage(p: Product): boolean {
  return Object.keys(p.images).length > 0;
}
