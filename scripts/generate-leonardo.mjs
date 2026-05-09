#!/usr/bin/env node
/**
 * Arvex — Leonardo AI batch generator.
 *
 * Generates hero / detail / context / orthographic shots for every chandelier in
 * src/data/products.ts. Designed for tight credit budgets:
 *   - Hard credit cap (LEONARDO_MAX_CREDITS, default 200)
 *   - Sequential, awaitable generations with backoff
 *   - Skips files that already exist on disk (resumable)
 *   - One concise prompt per shot, fixed-resolution per shot type
 *
 * Run:
 *   1. copy .env.example .env.local   (Windows)  or  cp .env.example .env.local
 *   2. Put your *rotated* Leonardo API key in LEONARDO_API_KEY
 *   3. npm run generate:assets        (uses Node 20+ --env-file built-in)
 *
 * Read the printed credit summary before re-running.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "assets", "products", "generated");

const API = "https://cloud.leonardo.ai/api/rest/v1";
const KEY = process.env.LEONARDO_API_KEY;
const MAX_CREDITS = Number(process.env.LEONARDO_MAX_CREDITS || 200);

if (!KEY) {
  console.error(
    "✗ LEONARDO_API_KEY is missing. Put your rotated key in .env.local before running."
  );
  process.exit(1);
}

// Leonardo Vision XL (good for hyperreal product shots).
// Replace if you find a model with better tokens-per-pixel.
const MODEL_ID = "5c232a9e-9061-4777-980a-ddc8e65647c6";

// Editorial luxury photography prompts — written for Architectural Digest style,
// not sci-fi. Base direction is universal; category-specific accents avoid
// biasing minimalist pieces toward "crystal cascade" aesthetics.
const ART_BASE =
  "Photographed for Architectural Digest. " +
  "Editorial interior photography, golden hour, soft indirect daylight, " +
  "warm ivory palette, real photographic depth of field, " +
  "calm wealthy atmosphere, museum-grade composition, " +
  "no people, no signage, no text, restrained, timeless, photorealistic.";

const CATEGORY_ACCENT = {
  "quantum-cascade":
    "Hand-cut crystal sparkle, brushed champagne brass highlights, cascading vertical form.",
  "kinetic-geometry":
    "Brushed champagne brass and bronze, articulated geometric form, architectural precision.",
  "bio-luminescent":
    "Hand-blown silicate or porcelain, soft inner glow, organic sculptural silhouette.",
  "hyper-minimalist":
    "Almost-invisible structure: a single line, plane or point of warm light. " +
    "Brushed aluminum or carbon fiber edge-lit. Absolute architectural restraint. " +
    "Strictly NO crystal, NO chandelier, NO brass cascade — this is reductive light.",
};

function artDirectionFor(category) {
  return `${ART_BASE} ${CATEGORY_ACCENT[category] || ""}`;
}

const NEGATIVE =
  "futuristic, sci-fi, neon, plasma, cyberpunk, gaming, fantasy, AI render, " +
  "glow effect, lens flare, chromatic aberration, oversaturated, HDR look, " +
  "fish-eye, distorted geometry, busy background, watermark, signage, text, " +
  "people, hands, faces, clutter, reflections of camera, banding";

const SHOTS = [
  {
    id: "hero",
    width: 832,
    height: 1216,
    suffix: "hero",
    prompt: (p) =>
      `A single ${p.name} fixture as the editorial centerpiece. ${p.tagline} ${p.description.slice(0, 200)} ` +
      `Materials: ${p.materials.join(", ")}. ` +
      `Hung in a tall, minimal warm interior — ivory plaster wall, oak parquet, single window of soft daylight. ` +
      `Vertical 4:5 portrait composition, fixture centered with generous negative space above and below. ` +
      artDirectionFor(p.category),
  },
  {
    id: "detail",
    width: 768,
    height: 1024,
    suffix: "detail",
    prompt: (p) =>
      `Macro detail of the ${p.name} fixture. ` +
      `Focus on the interplay of ${p.materials.join(", ")}. ` +
      `Extreme close-up, very shallow depth of field, warm rim light, soft falloff into ivory shadow. ` +
      artDirectionFor(p.category),
  },
  {
    id: "context",
    width: 1216,
    height: 832,
    suffix: "context",
    prompt: (p) =>
      `Wide editorial shot of a luxury interior at golden hour with the ${p.name} fixture suspended above the room. ` +
      `Modern penthouse: travertine marble floor, pale oak ceiling, ivory linen sofa, tall windows with sheer linen drapery diffusing late afternoon light. ` +
      `No people. Calm, expensive, wealthy. Wide horizontal composition, the fixture as the visual anchor. ` +
      artDirectionFor(p.category),
  },
  {
    id: "ortho",
    width: 768,
    height: 1024,
    suffix: "ortho",
    prompt: (p) =>
      `Studio product photograph of the ${p.name} fixture on a seamless warm ivory backdrop. ` +
      `Direct frontal elevation, balanced soft lighting, perfect symmetry, almost no shadow. ` +
      `Materials: ${p.materials.join(", ")}. ${CATEGORY_ACCENT[p.category] || ""} ` +
      `Editorial product photography for a luxury catalogue, photorealistic.`,
  },
];

async function loadProducts() {
  // The TS file is compiled at runtime by importing via a small JS shim. To keep
  // this script dependency-light, we read and regex-extract product fields.
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

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function leonardo(path, init = {}) {
  const res = await fetch(`${API}${path}`, {
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
    throw new Error(`Leonardo ${path} → ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function generateOne({ prompt, width, height }) {
  const create = await leonardo("/generations", {
    method: "POST",
    body: JSON.stringify({
      modelId: MODEL_ID,
      prompt,
      negative_prompt: NEGATIVE,
      width,
      height,
      num_images: 1,
      guidance_scale: 7,
      public: false,
      alchemy: false, // alchemy doubles cost; off keeps the budget safe
    }),
  });
  const id =
    create?.sdGenerationJob?.generationId || create?.generationId || null;
  if (!id) throw new Error("No generationId returned");

  // Poll until COMPLETE (or fail after ~60s).
  for (let i = 0; i < 30; i++) {
    await sleep(2000);
    const status = await leonardo(`/generations/${id}`);
    const gen = status?.generations_by_pk;
    if (!gen) continue;
    if (gen.status === "COMPLETE") {
      const url = gen.generated_images?.[0]?.url;
      if (!url) throw new Error("Complete but no image URL");
      return url;
    }
    if (gen.status === "FAILED") throw new Error("Generation failed");
  }
  throw new Error("Generation timed out");
}

async function downloadTo(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, buf);
}

async function getCreditsLeft() {
  try {
    const me = await leonardo("/me");
    const subs = me?.user_details?.[0];
    if (!subs) return null;
    // API credits, not web-app credits — `apiPaidTokens` is what generations
    // actually deplete. Sum with subscription bucket if present.
    return (subs.apiPaidTokens ?? 0) + (subs.apiSubscriptionTokens ?? 0);
  } catch {
    return null;
  }
}

const MANIFEST_PATH = path.join(ROOT, "src", "data", "product-images.json");

async function loadManifest() {
  try {
    const raw = await fs.readFile(MANIFEST_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeManifest(manifest) {
  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}

function publicPath(filename) {
  // Path used by Next.js — relative to /public.
  return `/assets/products/generated/${filename}`;
}

// Curated brief — when called with `--curated`, generate only the highest-impact
// shots: the homepage Featured Piece (Aurora Veil) gets all four kinds; three
// other gallery anchors get a hero only. ~7 generations ≈ 60 credits, well
// inside a $5 budget while still transforming the visible hero of the site.
const CURATED_PLAN = {
  "aurora-veil": ["hero", "detail", "context", "ortho"],
  "axis-mundi": ["hero"],
  "halo-mercury": ["hero"],
  "monolith-thin": ["hero"],
};

async function main() {
  const isCurated = process.argv.includes("--curated");
  const products = await loadProducts();
  const manifest = await loadManifest();
  console.log(
    `→ ${products.length} chandeliers × ${SHOTS.length} shots = ${
      products.length * SHOTS.length
    } generations`
  );

  const startCredits = await getCreditsLeft();
  if (startCredits != null) {
    console.log(`→ credits available: ${startCredits}`);
    if (startCredits < 1) {
      console.error("✗ no credits remaining. exiting.");
      process.exit(1);
    }
  }

  let used = 0;
  let made = 0;
  let skipped = 0;

  outer: for (const p of products) {
    // Curated mode: skip products not in the priority plan.
    if (isCurated && !CURATED_PLAN[p.slug]) continue;

    for (const shot of SHOTS) {
      // Curated mode: only generate the kinds explicitly listed for this slug.
      if (isCurated && !CURATED_PLAN[p.slug].includes(shot.suffix)) continue;

      const filename = `${p.slug}-${shot.suffix}.jpg`;
      const dest = path.join(OUT_DIR, filename);

      // Resumable: skip files that are already on disk AND in the manifest.
      const inManifest = manifest[p.slug]?.[shot.suffix];
      if ((await fileExists(dest)) && inManifest) {
        skipped++;
        continue;
      }
      if (used >= MAX_CREDITS) {
        console.log(`✋ credit cap hit (${MAX_CREDITS}). stopping.`);
        break outer;
      }
      try {
        process.stdout.write(`  ${p.slug} / ${shot.suffix} ... `);
        const url = await generateOne({
          prompt: shot.prompt(p),
          width: shot.width,
          height: shot.height,
        });
        await downloadTo(url, dest);
        manifest[p.slug] = { ...(manifest[p.slug] || {}), [shot.suffix]: publicPath(filename) };
        // Persist the manifest after every success so a Ctrl-C is recoverable.
        await writeManifest(manifest);
        const est = shot.suffix === "context" ? 10 : 8;
        used += est;
        made++;
        console.log(`ok (${est} cr)`);
      } catch (e) {
        console.log(`fail: ${e.message}`);
      }
      await sleep(800);
    }
  }

  const endCredits = await getCreditsLeft();
  console.log("\n— summary —");
  console.log(`generated:        ${made}`);
  console.log(`skipped (cached): ${skipped}`);
  console.log(`est. used:        ${used} credits`);
  if (startCredits != null && endCredits != null) {
    console.log(`actual used:      ${startCredits - endCredits} credits`);
  }
  console.log(`\nmanifest:         ${path.relative(ROOT, MANIFEST_PATH)}`);
  console.log("Run `npm run build` to bake the new imagery into static pages.");
}

main().catch((e) => {
  console.error("✗", e);
  process.exit(1);
});
