#!/usr/bin/env node
/**
 * Category-aware batch hero generator. Reads products.ts, generates a single
 * dominance-style hero photograph per product, writes manifest as it goes.
 *
 * Usage:
 *   node --env-file=.env.local scripts/generate-collection-heroes.mjs --category=quantum-cascade
 *   node --env-file=.env.local scripts/generate-collection-heroes.mjs --slug=stratus-fall,photon-rain
 *   node --env-file=.env.local scripts/generate-collection-heroes.mjs --all
 *
 * Skips products already in src/data/product-images.json.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "assets", "products", "generated");
const MANIFEST_PATH = path.join(ROOT, "src", "data", "product-images.json");

const API = "https://cloud.leonardo.ai/api/rest/v1";
const KEY = process.env.LEONARDO_API_KEY;
const MODEL_ID = "5c232a9e-9061-4777-980a-ddc8e65647c6";

if (!KEY) {
  console.error("✗ LEONARDO_API_KEY missing.");
  process.exit(1);
}

// ─── Art direction ──────────────────────────────────────────────────────

const SHARED =
  "Cover photograph for Architectural Digest. Hasselblad medium format, " +
  "natural light, real photograph, museum-grade composition, restrained, " +
  "timeless, photorealistic, fine film grain, no people, no text, no signage.";

// Negatives tuned to common failure modes we have seen across runs.
const NEGATIVE_BASE =
  "futuristic, sci-fi, neon, plasma, cyberpunk, gaming, fantasy, AI render, " +
  "glow effect, lens flare, chromatic aberration, oversaturated, HDR look, " +
  "fish-eye, distorted geometry, busy background, watermark, signage, text, " +
  "people, hands, faces, woman, man, bride, dress, gown, model, child, " +
  "clutter, banding, cartoon, render, CGI, illustration, drawing, " +
  "low-resolution, dirty, dusty, vintage, antique, derelict";

// Per-category positive accents.
const CATEGORY_ACCENT = {
  "quantum-cascade":
    "Hand-cut crystal pendants in graduated tiers, polished champagne brass " +
    "spine, cascading vertical form, jewelry-like reflections, restrained " +
    "luxury hospitality mood.",
  "kinetic-geometry":
    "Brushed champagne brass and bronze, articulated geometric form, " +
    "concentric rings or stacked planes, architectural precision, spatial " +
    "rhythm, floating balance.",
  "bio-luminescent":
    "Hand-blown silicate glass or porcelain, organic sculptural silhouette " +
    "(coral, lotus, floral references), soft inner glow, premium artisan " +
    "feel, warm warm ivory and bone tones.",
  "hyper-minimalist":
    "Reductive elegance — a single line, plane, or point of warm light. " +
    "Brushed aluminum or carbon fiber edge-lit. Strictly NO crystal pendants, " +
    "NO brass cascade, NO traditional chandelier — this is reductive light. " +
    "Architectural minimalism, soft linear illumination, calm luxury restraint.",
};

// Per-category negative accents — block the recurring hallucinations.
const CATEGORY_NEGATIVE = {
  "quantum-cascade": "",
  "kinetic-geometry":
    ", hanging crystals, faceted gemstone pendants, glass spheres dangling, " +
    "Calder mobile, stick mobile, traditional crystal chandelier, " +
    "frilly drapery, fringe",
  "bio-luminescent":
    ", brass rings, mechanical gears, cogs, geometric grids, " +
    "traditional crystal chandelier, faceted crystal pendants, brass cascade, " +
    "industrial fixture",
  "hyper-minimalist":
    ", crystal, crystals, faceted gemstone, hanging crystals, glass spheres, " +
    "glass orbs, bulbs, traditional chandelier, traditional crystal " +
    "chandelier, brass cage, lampshade, fringe, drapery, ornate, baroque, " +
    "decorative, ornamental, jewelry-like, sparkle",
};

// ─── Prompt builders ────────────────────────────────────────────────────

function buildHeroPrompt(product) {
  const desc = product.description.length > 200
    ? product.description.slice(0, 197) + "..."
    : product.description;

  // Hyper-minimalist gets a different scene description — anything that
  // smells of "chandelier" leads the model back to crystal cascades.
  const sceneLine =
    product.category === "hyper-minimalist"
      ? `The fixture is the absolute subject — a single line, plane, or point of light dominating 50–60% of the frame. Behind: a tall warm ivory plaster wall, completely empty, with the quietest hint of soft late-afternoon light from one side. Pale travertine or oak floor, no furniture, no clutter, no people. Architectural minimalism, museum-grade restraint.`
      : `The fixture is the unmistakable subject — it occupies 55–65% of the frame. Behind the fixture: a tall warm ivory plaster wall with the quietest hint of architectural detail (a recessed alcove, an arched window edge), pale travertine or oak floor, soft warm late-afternoon light from one side. No furniture, no clutter, no people.`;

  return (
    `Editorial cover photograph of a single ${product.name} luxury lighting ` +
    `fixture as the absolute centerpiece of a private Indian luxury interior. ` +
    `${product.tagline} ${desc} ` +
    `Materials: ${product.materials.join(", ")}. ` +
    `${sceneLine} ` +
    `Vertical 4:5 portrait composition, fixture centered, generous negative ` +
    `space above and below. ` +
    `${CATEGORY_ACCENT[product.category] || ""} ${SHARED}`
  );
}

function buildNegative(product) {
  return NEGATIVE_BASE + (CATEGORY_NEGATIVE[product.category] || "");
}

// ─── Product loader ─────────────────────────────────────────────────────

async function loadProducts() {
  const raw = await fs.readFile(
    path.join(ROOT, "src", "data", "products.ts"),
    "utf8"
  );
  const products = [];
  const matches = raw.matchAll(
    /\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*category:\s*"([^"]+)",[\s\S]*?tagline:\s*"([^"]+)",[\s\S]*?description:\s*"([^"]+)",[\s\S]*?materials:\s*\[([^\]]+)\]/g
  );
  for (const m of matches) {
    products.push({
      slug: m[1],
      name: m[2],
      category: m[3],
      tagline: m[4],
      description: m[5],
      materials: [...m[6].matchAll(/"([^"]+)"/g)].map((x) => x[1]),
    });
  }
  return products;
}

async function loadManifest() {
  try {
    return JSON.parse(await fs.readFile(MANIFEST_PATH, "utf8"));
  } catch {
    return {};
  }
}

async function writeManifest(m) {
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(m, null, 2) + "\n");
}

// ─── API ────────────────────────────────────────────────────────────────

async function leonardo(p, init = {}) {
  const res = await fetch(`${API}${p}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Leonardo ${p} → ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generate({ prompt, negative, width = 832, height = 1216 }) {
  const create = await leonardo("/generations", {
    method: "POST",
    body: JSON.stringify({
      modelId: MODEL_ID,
      prompt,
      negative_prompt: negative,
      width,
      height,
      num_images: 1,
      guidance_scale: 9,
      public: false,
      alchemy: false,
    }),
  });
  const id = create?.sdGenerationJob?.generationId || create?.generationId;
  if (!id) throw new Error("No generationId");
  for (let i = 0; i < 30; i++) {
    await sleep(2000);
    const status = await leonardo(`/generations/${id}`);
    const gen = status?.generations_by_pk;
    if (!gen) continue;
    if (gen.status === "COMPLETE") {
      const url = gen.generated_images?.[0]?.url;
      if (!url) throw new Error("Complete but no URL");
      return url;
    }
    if (gen.status === "FAILED") throw new Error("Generation failed");
  }
  throw new Error("Timed out");
}

async function downloadTo(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, buf);
}

function parseArgs() {
  const args = {};
  for (const a of process.argv.slice(2)) {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) args[m[1]] = m[2];
    else if (a.startsWith("--")) args[a.slice(2)] = true;
  }
  return args;
}

// ─── Main ───────────────────────────────────────────────────────────────

async function main() {
  const args = parseArgs();
  const products = await loadProducts();
  const manifest = await loadManifest();

  let target = products;
  if (args.category) {
    target = target.filter((p) => p.category === args.category);
  }
  if (args.slug) {
    const slugs = new Set(args.slug.split(","));
    target = target.filter((p) => slugs.has(p.slug));
  }
  if (!args.all && !args.category && !args.slug) {
    console.error("✗ Pass --all, --category=..., or --slug=a,b,c");
    process.exit(1);
  }

  // Skip products that already have a hero in the manifest.
  const todo = target.filter((p) => !manifest[p.slug]?.hero);

  console.log(`→ ${todo.length} hero(es) to generate (${target.length - todo.length} already in manifest, skipped)`);

  let made = 0;
  let failed = 0;
  for (const p of todo) {
    const filename = `${p.slug}-hero.jpg`;
    const dest = path.join(OUT_DIR, filename);

    process.stdout.write(`  [${p.category}] ${p.slug} ... `);
    try {
      const url = await generate({
        prompt: buildHeroPrompt(p),
        negative: buildNegative(p),
      });
      await downloadTo(url, dest);
      manifest[p.slug] = {
        ...(manifest[p.slug] || {}),
        hero: `/assets/products/generated/${filename}`,
      };
      await writeManifest(manifest);
      made++;
      console.log("ok");
    } catch (e) {
      failed++;
      console.log(`fail: ${e.message}`);
    }
    await sleep(800);
  }

  console.log(`\n— summary —`);
  console.log(`generated: ${made}`);
  console.log(`failed:    ${failed}`);
  console.log(`est. cost: ${made * 8} credits`);
}

main().catch((e) => {
  console.error("✗", e);
  process.exit(1);
});
