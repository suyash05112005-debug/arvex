#!/usr/bin/env node
/**
 * One-off script: generate 2 dedicated photographs for the homepage Hero
 * banner (the right-column visual that currently runs the procedural R3F
 * chandelier). Distinct from the FeaturedPiece's tighter "dominance" crop —
 * these need cinematic atmosphere because they sit underneath the headline.
 *
 * Saves to public/assets/products/_alternates/ for review.
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
const MODEL_ID = "5c232a9e-9061-4777-980a-ddc8e65647c6";

if (!KEY) {
  console.error("✗ LEONARDO_API_KEY missing.");
  process.exit(1);
}

const NEGATIVE =
  "futuristic, sci-fi, neon, plasma, cyberpunk, gaming, fantasy, AI render, " +
  "glow effect, lens flare, chromatic aberration, oversaturated, HDR look, " +
  "fish-eye, distorted geometry, busy background, watermark, signage, text, " +
  "people, hands, faces, clutter, reflections of camera, banding, cartoon, " +
  "modern stage lighting, conference room, cheap hotel, plastic, fake gold, " +
  "low-resolution, render, CGI, illustration, drawing";

const SHARED =
  "Cover photograph for Architectural Digest. Hasselblad, medium format, " +
  "natural light, real photograph, large negative space, museum-grade " +
  "composition, restrained, timeless, photorealistic, fine film grain, " +
  "no people, no text.";

const HERO_BANNERS = [
  {
    id: "hero-banner-1",
    label: "Cinematic atelier portrait — chiaroscuro chandelier",
    width: 832,
    height: 1216,
    prompt:
      "A single Aurora Veil crystal chandelier hanging in a tall, otherwise empty, " +
      "warm ivory atelier room. Champagne brass spine and multi-tier hand-cut crystal " +
      "cascade. A single shaft of warm late afternoon light enters from frame right, " +
      "lighting the crystals from the side and casting long soft shadows on the ivory " +
      "plaster wall behind. The lower portion of the frame is in soft warm shadow with " +
      "a hint of dark walnut floor. Vertical 4:5 portrait, the chandelier centered " +
      "vertically with breathing room above, dramatic chiaroscuro, very cinematic. " +
      "The chandelier is unmistakably the subject — it occupies 50–60% of the frame. " +
      SHARED,
  },
  {
    id: "hero-banner-2",
    label: "Indian penthouse foyer — golden hour anchor",
    width: 832,
    height: 1216,
    prompt:
      "A vertical editorial photograph of an Aurora Veil crystal chandelier hanging " +
      "in the double-height foyer of a private Indian luxury villa at golden hour. " +
      "The chandelier is the absolute centerpiece, hanging at first-floor landing " +
      "height, occupying the upper-centre of the frame. Behind: a single tall arched " +
      "window with diffused warm late-afternoon light, ivory plaster wall, a hint of " +
      "a curved travertine staircase to the side. Floor: pale travertine. " +
      "Vertical 4:5 portrait composition. The chandelier dominates the upper half; " +
      "the lower half is calm architecture. Restrained, expensive, museum-grade. " +
      "MUST INCLUDE the chandelier prominently and centrally. " +
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
      guidance_scale: 8,
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
  console.log(`→ Generating ${HERO_BANNERS.length} dedicated hero-banner shots`);
  for (const b of HERO_BANNERS) {
    const dest = path.join(OUT_DIR, `${b.id}.jpg`);
    process.stdout.write(`  [${b.id}] ${b.label} ... `);
    try {
      const url = await generate({
        prompt: b.prompt,
        width: b.width,
        height: b.height,
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
