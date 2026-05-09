#!/usr/bin/env node
/**
 * One-off script: generate 3 distinct hero compositions for Aurora Veil.
 * Saves them to public/assets/products/_alternates/ for side-by-side review.
 *
 * Each composition pursues a different cinematic logic. Run with:
 *   node --env-file=.env.local scripts/generate-hero-alternates.mjs
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
const MODEL_ID = "5c232a9e-9061-4777-980a-ddc8e65647c6"; // Leonardo Vision XL

if (!KEY) {
  console.error("✗ LEONARDO_API_KEY missing.");
  process.exit(1);
}

const NEGATIVE =
  "futuristic, sci-fi, neon, plasma, cyberpunk, gaming, fantasy, AI render, " +
  "glow effect, lens flare, chromatic aberration, oversaturated, HDR look, " +
  "fish-eye, distorted geometry, busy background, watermark, signage, text, " +
  "people, hands, faces, clutter, reflections of camera, banding, " +
  "modern stage lighting, conference room, cheap hotel, plastic, fake gold";

const SHARED =
  "Architectural Digest cover photography, editorial cinematic, golden hour, " +
  "warm indirect daylight, ivory and champagne palette, real photographic depth " +
  "of field, restrained, timeless, museum-grade composition, photorealistic, " +
  "subtle film grain, no people.";

const ALTERNATES = [
  {
    id: "a",
    label: "Dominance — chandelier as the subject",
    width: 832,
    height: 1216,
    prompt:
      "A tightly framed editorial portrait of a single Aurora Veil crystal chandelier — " +
      "champagne brass spine, faceted hand-cut crystal teardrops cascading in tiers. " +
      "The chandelier dominates 70% of the frame. The room is reduced to almost nothing: " +
      "a soft ivory plaster wall behind, a hint of late afternoon light from frame-right. " +
      "No furniture, no foreground, no distracting architecture. Vertical 4:5 composition. " +
      "Shallow depth of field on the wall. Hero campaign image for a luxury lighting brand. " +
      SHARED,
  },
  {
    id: "b",
    label: "Architectural awe — looking up",
    width: 832,
    height: 1216,
    prompt:
      "Low-angle architectural photograph looking up at the Aurora Veil chandelier in a " +
      "double-height ivory atrium. The piece extends downward toward the camera, " +
      "champagne-brass spine catching golden hour light, hand-cut crystal pendants " +
      "sparkling against a soft plaster ceiling rosette and cornice. Vertical 4:5, " +
      "dramatic perspective, deep focus from crystals up to the ceiling, " +
      "negative space at the top. Warm interior, no furniture in frame. " +
      SHARED,
  },
  {
    id: "c",
    label: "Foyer landing — villa entrance",
    width: 832,
    height: 1216,
    prompt:
      "Vertical editorial of the Aurora Veil chandelier suspended in the central foyer " +
      "of a private Indian luxury villa. A travertine stone stair rises softly behind " +
      "and to the left, an ivory plaster wall with a single tall arched window flooding " +
      "warm late-afternoon light. The chandelier hangs at first-floor landing height, " +
      "champagne brass and crystal catching the golden hour. " +
      "Architectural composition, no people, deep depth of field, restrained palette. " +
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

async function generate({ prompt, width, height }) {
  const create = await leonardo("/generations", {
    method: "POST",
    body: JSON.stringify({
      modelId: MODEL_ID,
      prompt,
      negative_prompt: NEGATIVE,
      width,
      height,
      num_images: 1,
      guidance_scale: 8, // slightly higher for tighter prompt adherence
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

async function main() {
  console.log(`→ Generating ${ALTERNATES.length} hero alternates for Aurora Veil`);
  for (const a of ALTERNATES) {
    const dest = path.join(OUT_DIR, `aurora-veil-hero-${a.id}.jpg`);
    process.stdout.write(`  [${a.id}] ${a.label} ... `);
    try {
      const url = await generate({
        prompt: a.prompt,
        width: a.width,
        height: a.height,
      });
      await downloadTo(url, dest);
      console.log("ok");
    } catch (e) {
      console.log(`fail: ${e.message}`);
    }
    await sleep(800);
  }
  console.log(`\nSaved to ${path.relative(ROOT, OUT_DIR)}`);
}

main().catch((e) => {
  console.error("✗", e);
  process.exit(1);
});
