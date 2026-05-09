#!/usr/bin/env node
/**
 * Generate 3 cinematic hero alternates each for Halo Mercury and Axis Mundi.
 * Each product gets three distinct compositions (Dominance / Alcove /
 * Hospitality vignette), saved under public/assets/products/_alternates/.
 *
 * Run with:  node --env-file=.env.local scripts/generate-product-alternates.mjs
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "assets", "products", "_alternates");

const API = "https://cloud.leonardo.ai/api/rest/v1";
const KEY = process.env.LEONARDO_API_KEY;
const MODEL_ID = "5c232a9e-9061-4777-980a-ddc8e65647c6"; // Vision XL

if (!KEY) {
  console.error("✗ LEONARDO_API_KEY missing.");
  process.exit(1);
}

const SHARED =
  "Cover photograph for Architectural Digest. Hasselblad medium format, " +
  "natural light, real photograph, large negative space, museum-grade " +
  "composition, restrained, timeless, photorealistic, fine film grain, " +
  "no people, no text, no signage.";

const NEGATIVE_BASE =
  "futuristic, sci-fi, neon, plasma, cyberpunk, gaming, fantasy, AI render, " +
  "glow effect, lens flare, chromatic aberration, oversaturated, HDR look, " +
  "fish-eye, distorted geometry, busy background, watermark, signage, text, " +
  "people, hands, faces, woman, man, bride, dress, gown, model, child, " +
  "clutter, banding, cartoon, render, CGI, illustration, drawing, low-resolution";

// ─────────────────────────────────────────────────────────────────────────
// HALO MERCURY — mercury-silver mirror-finish blown-glass spheres
// ─────────────────────────────────────────────────────────────────────────
const HALO_DESC =
  "A mercury-silver mirror-finish blown-glass cluster chandelier, made of " +
  "approximately fifty hand-blown reflective glass spheres of varying sizes, " +
  "cascading down a slim polished steel armature. The spheres have a soft " +
  "metallic mercury-silver finish — like vintage mercury glass, antique " +
  "silvering — they catch warm light with subtle reflective highlights, " +
  "not chrome and not transparent crystal.";

const HALO_NEGATIVE =
  NEGATIVE_BASE +
  ", crystal, faceted gemstone, chandelier with crystal pendants, " +
  "hanging crystals, traditional brass crown, gold metal, polished gold";

const HALO = [
  {
    id: "halo-mercury-hero-a",
    label: "Dominance — sphere cluster fills the frame",
    prompt:
      `${HALO_DESC} ` +
      `The chandelier is the absolute subject of the photograph — it occupies ` +
      `60% of the frame. Behind, only a soft warm ivory plaster wall with the ` +
      `quietest hint of late-afternoon light. No furniture, no foreground. ` +
      `Vertical 4:5 portrait composition, the cluster hanging slightly above ` +
      `centre, breathing room above and below. Restrained, sculptural. ` +
      SHARED,
  },
  {
    id: "halo-mercury-hero-b",
    label: "Architectural alcove — centred against arched recess",
    prompt:
      `${HALO_DESC} ` +
      `The chandelier hangs in the centre of a tall ivory plaster wall with a ` +
      `single recessed arched alcove behind it. A pale travertine floor below, ` +
      `a single shaft of warm late-afternoon daylight from frame-right grazing ` +
      `the spheres. The room is empty — no furniture, no people, no clutter. ` +
      `Vertical 4:5 portrait. The cluster sits in the upper-half, the architecture ` +
      `quietly framing it. ` +
      SHARED,
  },
  {
    id: "halo-mercury-hero-c",
    label: "Editorial dining vignette — restrained luxury",
    prompt:
      `${HALO_DESC} ` +
      `Suspended above a single round dark-walnut dining table in an otherwise ` +
      `empty warm Indian luxury dining room. Ivory plaster walls, pale travertine ` +
      `floor, a single linen-upholstered dining chair just visible at frame edge. ` +
      `Late-afternoon golden hour through a tall window outside the frame. ` +
      `The chandelier is the unmistakable focal point — it occupies 45% of the ` +
      `vertical composition. Vertical 4:5 portrait, museum-grade restraint. ` +
      SHARED,
  },
];

// ─────────────────────────────────────────────────────────────────────────
// AXIS MUNDI — twelve concentric brass rings on magnetic bearings
// ─────────────────────────────────────────────────────────────────────────
const AXIS_DESC =
  "An architectural light fixture composed of TWELVE concentric horizontal " +
  "rings of brushed champagne brass, stacked one above the other on a single " +
  "thin central rod, like a brass orrery or astronomical armillary sphere. " +
  "The rings are flat brass bands of slightly different diameters, each ring " +
  "edge-lit with a thin warm-white LED line. No pendants, no crystals, no " +
  "spheres — just rings. The smallest ring is at the top, the largest at the " +
  "bottom. The whole fixture is approximately 1.5 metres wide and 1 metre tall.";

const AXIS_NEGATIVE =
  NEGATIVE_BASE +
  ", crystal, faceted gemstone, hanging crystals, glass spheres, glass orbs, " +
  "bulbs, kinetic mobile, designer pendant, asymmetric mobile, stick mobile, " +
  "Calder mobile, traditional crystal chandelier, brass cage, lampshade";

const AXIS = [
  {
    id: "axis-mundi-hero-a",
    label: "Dominance — concentric rings fill the frame",
    prompt:
      `${AXIS_DESC} ` +
      `The fixture is the absolute subject of the photograph — twelve stacked ` +
      `brass rings dominate 60% of the frame. Behind: soft warm ivory plaster ` +
      `with a hint of late-afternoon light. No furniture, no foreground. ` +
      `Vertical 4:5 portrait composition, the orrery hanging slightly above ` +
      `centre. Restrained, sculptural, museum-grade. ` +
      SHARED,
  },
  {
    id: "axis-mundi-hero-b",
    label: "Architectural alcove — orrery centered against arch",
    prompt:
      `${AXIS_DESC} ` +
      `The fixture hangs in the centre of a tall ivory plaster wall with a ` +
      `single recessed arched alcove behind it. Pale travertine floor below. ` +
      `A single shaft of warm late-afternoon daylight from frame-right grazes ` +
      `the brass rings. Empty room — no furniture, no people. ` +
      `Vertical 4:5 portrait, the rings stacked horizontally and dominant. ` +
      SHARED,
  },
  {
    id: "axis-mundi-hero-c",
    label: "Modern dining lounge — rings hovering above table",
    prompt:
      `${AXIS_DESC} ` +
      `Suspended above a long minimal dark-walnut dining table in a calm modern ` +
      `Indian luxury dining room. Ivory plaster walls, pale travertine floor, ` +
      `low-back linen chairs barely visible at the table edges. ` +
      `Late-afternoon golden hour. The fixture is the unmistakable focal point ` +
      `— twelve concentric brass rings, edge-lit, occupying 45% of the vertical ` +
      `composition. Vertical 4:5 portrait, restrained. ` +
      SHARED,
  },
];

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

async function runBatch(label, items, negative) {
  console.log(`\n→ ${label}`);
  for (const it of items) {
    const dest = path.join(OUT_DIR, `${it.id}.jpg`);
    process.stdout.write(`  [${it.id}] ${it.label} ... `);
    try {
      const url = await generate({ prompt: it.prompt, negative });
      await downloadTo(url, dest);
      console.log("ok");
    } catch (e) {
      console.log(`fail: ${e.message}`);
    }
    await sleep(800);
  }
}

async function main() {
  await runBatch("Halo Mercury", HALO, HALO_NEGATIVE);
  await runBatch("Axis Mundi", AXIS, AXIS_NEGATIVE);
  console.log(`\nSaved to ${path.relative(ROOT, OUT_DIR)}`);
}

main().catch((e) => {
  console.error("✗", e);
  process.exit(1);
});
