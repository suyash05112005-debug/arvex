#!/usr/bin/env node
/**
 * One combined batch:
 *   1. Consultation page hero shot (atelier/showroom interior)
 *   2. Missing details for Halo Mercury + Axis Mundi
 *   3. Context retries for Medusa Bloom, Void Arc, Monolith Thin (very strict)
 *   4. Low-angle cinematic shots for Aurora Veil + Medusa Bloom
 *
 * Total: ~10 generations, ~85 credits.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "assets", "products", "generated");
const CONSULTATION_DIR = path.join(ROOT, "public", "assets", "consultation");
const MANIFEST_PATH = path.join(ROOT, "src", "data", "product-images.json");

const API = "https://cloud.leonardo.ai/api/rest/v1";
const KEY = process.env.LEONARDO_API_KEY;
const MODEL_ID = "5c232a9e-9061-4777-980a-ddc8e65647c6";

if (!KEY) { console.error("✗ LEONARDO_API_KEY missing."); process.exit(1); }

const SHARED =
  "Cover photograph for Architectural Digest. Hasselblad medium format, " +
  "natural light, real photograph, museum-grade composition, restrained, " +
  "timeless, photorealistic, fine film grain, no people, no text, no signage.";

const NEGATIVE_BASE =
  "futuristic, sci-fi, neon, plasma, cyberpunk, gaming, fantasy, AI render, " +
  "glow effect, lens flare, chromatic aberration, oversaturated, HDR look, " +
  "fish-eye, distorted geometry, busy background, watermark, signage, text, " +
  "people, hands, faces, woman, man, bride, dress, gown, model, child, " +
  "clutter, banding, cartoon, render, CGI, illustration, drawing, " +
  "low-resolution, dirty, dusty, vintage, antique, derelict";

// ─── 1. Consultation page hero ──────────────────────────────────────────

const CONSULTATION_HERO = {
  destSubdir: "consultation",
  filename: "consultation-hero.jpg",
  label: "Consultation atelier interior",
  width: 1216,
  height: 832,
  prompt:
    "Wide editorial photograph of a private Indian luxury lighting showroom " +
    "interior at golden hour. A long polished walnut consultation desk " +
    "centred in a tall warm ivory plaster room, with hand-drawn architectural " +
    "elevations on tracing paper, brass measuring rule, and a small array of " +
    "crystal sample chips arranged on a linen tray. A single Aurora Veil " +
    "champagne-brass crystal chandelier visible in soft focus in the upper-" +
    "background, partially in frame. Pale travertine floor, single tall " +
    "arched window on the left throwing warm late-afternoon daylight across " +
    "the desk. Wide horizontal 3:2 composition. No people, restrained, " +
    "calm, expensive. " + SHARED,
  negative: NEGATIVE_BASE + ", cluttered desk, computer, monitor, papers everywhere, modern office",
};

// ─── 2. Missing detail + context for Halo Mercury and Axis Mundi ────────

const MISSING_SHOTS = [
  {
    slug: "halo-mercury",
    kind: "detail",
    width: 832,
    height: 1216,
    label: "Halo Mercury — mercury-silver sphere macro",
    prompt:
      "Macro detail photograph of the Halo Mercury chandelier. " +
      "Extreme close-up on the surface of mercury-silver mirror-finish blown-" +
      "glass spheres clustered together, with each sphere catching warm " +
      "afternoon light in soft reflective highlights. The thin steel " +
      "armature visible between spheres. Very shallow depth of field, focus " +
      "on a single sphere with the rest softly blurred. Warm ivory backdrop. " +
      "Editorial jewelry-grade material study. " + SHARED,
    negative: NEGATIVE_BASE + ", crystal, faceted gemstone, brass, gold",
  },
  {
    slug: "halo-mercury",
    kind: "context",
    width: 1216,
    height: 832,
    label: "Halo Mercury — wide editorial in luxury dining",
    prompt:
      "Wide editorial photograph of a luxury Indian dining room at golden " +
      "hour, with a HALO MERCURY chandelier — a large cluster of " +
      "approximately fifty hand-blown mercury-silver mirror-finish reflective " +
      "glass spheres on a slim polished steel armature — suspended " +
      "PROMINENTLY AND CENTRALLY above a long ivory marble dining table. " +
      "The chandelier is the visual anchor, occupying the upper third of " +
      "the frame, dominant. Travertine floor, ivory plaster walls, low-back " +
      "linen chairs, tall windows with sheer linen drapery on the left " +
      "diffusing warm late-afternoon daylight. No people. Wide horizontal " +
      "3:2 composition. The mercury sphere cluster MUST be visible and " +
      "central in the frame. " + SHARED,
    negative: NEGATIVE_BASE + ", crystal, faceted gemstone pendants, brass cascade, missing fixture, no chandelier, empty ceiling",
  },
  {
    slug: "axis-mundi",
    kind: "detail",
    width: 832,
    height: 1216,
    label: "Axis Mundi — brass ring edge macro",
    prompt:
      "Macro detail photograph of the Axis Mundi lighting fixture. " +
      "Extreme close-up on the edge of a brushed champagne-brass horizontal " +
      "ring, where a thin warm-white edge-lit LED line is concealed. The " +
      "brass surface has a fine brushed grain. A second brass ring visible " +
      "in soft focus behind. Very shallow depth of field, focus on the LED " +
      "edge of the foreground ring, the rest fading into warm shadow. " +
      "Editorial architectural product detail. " + SHARED,
    negative: NEGATIVE_BASE + ", crystal, faceted gemstone, hanging crystals, glass orb",
  },
  {
    slug: "axis-mundi",
    kind: "context",
    width: 1216,
    height: 832,
    label: "Axis Mundi — wide editorial in luxury lounge",
    prompt:
      "Wide editorial photograph of a luxury Indian villa lounge at golden " +
      "hour, with an AXIS MUNDI lighting fixture — two large concentric " +
      "horizontal brushed champagne-brass rings stacked on a single thin " +
      "central rod, edge-lit with warm-white LED — suspended PROMINENTLY " +
      "AND CENTRALLY in the upper third of the frame above an ivory linen " +
      "sectional sofa. The brass orrery is the visual anchor and dominant. " +
      "Pale travertine floor, ivory plaster walls, tall arched window on " +
      "the right with sheer drapery, golden-hour light. No people. Wide " +
      "horizontal 3:2 composition. The brass rings MUST be visible and " +
      "central in the frame. " + SHARED,
    negative: NEGATIVE_BASE + ", crystal, hanging crystals, glass spheres, kinetic mobile, empty ceiling, missing fixture",
  },
];

// ─── 3. Context retries with VERY strict fixture-presence language ──────

const CONTEXT_RETRIES = [
  {
    slug: "medusa-bloom",
    kind: "context",
    width: 1216,
    height: 832,
    label: "Medusa Bloom — wide editorial (retry, fixture-strict)",
    prompt:
      "Wide editorial photograph of a luxury Indian dining room at golden " +
      "hour, with a MEDUSA BLOOM jellyfish chandelier — a large hand-blown " +
      "translucent silicate glass DOME with cascading silken white silicone " +
      "TENDRILS hanging downward — suspended PROMINENTLY AND CENTRALLY in " +
      "the upper third of the frame above a long oak dining table. The " +
      "jellyfish chandelier MUST be visible, large, and central in the " +
      "frame, occupying at least 35% of the composition. Travertine floor, " +
      "ivory plaster walls, low-back linen chairs, soft warm late-afternoon " +
      "light. No people. Wide horizontal 3:2 composition. " + SHARED,
    negative: NEGATIVE_BASE + ", coral, branching coral, crystal, faceted, brass cascade, empty ceiling, missing fixture, no chandelier",
  },
  {
    slug: "void-arc",
    kind: "context",
    width: 1216,
    height: 832,
    label: "Void Arc — wide editorial (retry, fixture-strict)",
    prompt:
      "Wide editorial photograph of a calm modern Indian luxury foyer, with " +
      "a VOID ARC lighting fixture — a precision-machined brushed steel " +
      "vertical ARC suspended on the wall, throwing warm indirect light " +
      "onto the ivory plaster ceiling — visible PROMINENTLY in the centre " +
      "of the frame. The brushed steel arc MUST be visible against the " +
      "wall, with its glow on the ceiling above. Pale travertine floor, " +
      "low walnut bench against the opposite wall. No other lighting. " +
      "Late-afternoon golden hour. No people. Wide horizontal 3:2 " +
      "composition. The arc fixture MUST be the visible focal point. " +
      SHARED,
    negative: NEGATIVE_BASE + ", chandelier, crystal, hanging fixture, ceiling fixture, empty wall, missing fixture, no fixture",
  },
  {
    slug: "monolith-thin",
    kind: "context",
    width: 1216,
    height: 832,
    label: "Monolith Thin — wide editorial (retry, fixture-strict)",
    prompt:
      "Wide editorial photograph of a long modern Indian luxury dining " +
      "room. THREE VERTICAL THIN BRUSHED ALUMINUM BARS, each approximately " +
      "1 metre long and 12 mm thick, edge-lit with a warm-white LED line, " +
      "are suspended in a row from the ceiling above a long oak dining " +
      "table. The three bars MUST be visible, central, and dominant in " +
      "the upper half of the frame, hanging vertically with clear " +
      "suspension cords from the ceiling. Linen chairs, pale travertine " +
      "floor, ivory plaster walls, golden-hour light from tall windows on " +
      "the left. No people. Wide horizontal 3:2 composition. The three " +
      "vertical bars MUST be visible and prominent. " + SHARED,
    negative: NEGATIVE_BASE + ", crystal chandelier, brass cascade, empty ceiling, missing fixture, no fixture, recessed lighting only",
  },
];

// ─── 4. Low-angle cinematic shots ───────────────────────────────────────

const LOW_ANGLE_SHOTS = [
  {
    slug: "aurora-veil",
    kind: "low",
    width: 832,
    height: 1216,
    label: "Aurora Veil — low-angle cinematic upward",
    prompt:
      "Cinematic low-angle photograph looking UPWARD at the Aurora Veil " +
      "crystal chandelier. The polished champagne-brass spine extends " +
      "toward the camera and up into a soft ivory plaster ceiling. " +
      "Hand-cut crystal pendants cascade in graduated tiers, catching warm " +
      "late-afternoon light. Subtle upward perspective, no exaggerated " +
      "distortion. Restrained sculptural dominance. Vertical 4:5 portrait. " +
      "The chandelier fills 70% of the frame from below. Soft warm " +
      "interior, no furniture. " + SHARED,
    negative: NEGATIVE_BASE + ", fish-eye, distorted, exaggerated wide-angle",
  },
  {
    slug: "medusa-bloom",
    kind: "low",
    width: 832,
    height: 1216,
    label: "Medusa Bloom — low-angle cinematic upward",
    prompt:
      "Cinematic low-angle photograph looking UPWARD at the Medusa Bloom " +
      "jellyfish chandelier. The translucent silicate glass dome glows " +
      "warm above, with silken white silicone tendrils descending toward " +
      "the camera. Subtle upward perspective on a soft ivory plaster " +
      "ceiling. Restrained sculptural dominance. Vertical 4:5 portrait. " +
      "The chandelier fills 70% of the frame from below. " + SHARED,
    negative: NEGATIVE_BASE + ", fish-eye, distorted, coral, brass rings",
  },
];

// ─── API plumbing ───────────────────────────────────────────────────────

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

async function generate({ prompt, negative, width, height }) {
  const create = await leonardo("/generations", {
    method: "POST",
    body: JSON.stringify({
      modelId: MODEL_ID, prompt, negative_prompt: negative,
      width, height, num_images: 1, guidance_scale: 9,
      public: false, alchemy: false,
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

async function loadManifest() {
  try { return JSON.parse(await fs.readFile(MANIFEST_PATH, "utf8")); }
  catch { return {}; }
}

async function writeManifest(m) {
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(m, null, 2) + "\n");
}

// ─── Run ────────────────────────────────────────────────────────────────

async function main() {
  const manifest = await loadManifest();

  // 1. Consultation hero
  console.log(`\n→ Consultation hero`);
  process.stdout.write(`  ${CONSULTATION_HERO.label} ... `);
  try {
    const url = await generate({
      prompt: CONSULTATION_HERO.prompt,
      negative: CONSULTATION_HERO.negative,
      width: CONSULTATION_HERO.width,
      height: CONSULTATION_HERO.height,
    });
    await downloadTo(url, path.join(CONSULTATION_DIR, CONSULTATION_HERO.filename));
    console.log("ok");
  } catch (e) { console.log(`fail: ${e.message}`); }
  await sleep(800);

  // 2. Missing detail/context for Halo Mercury and Axis Mundi
  console.log(`\n→ Missing details + contexts (${MISSING_SHOTS.length})`);
  for (const s of MISSING_SHOTS) {
    process.stdout.write(`  [${s.slug}/${s.kind}] ... `);
    try {
      const url = await generate(s);
      const filename = `${s.slug}-${s.kind}.jpg`;
      await downloadTo(url, path.join(OUT_DIR, filename));
      manifest[s.slug] = { ...(manifest[s.slug] || {}), [s.kind]: `/assets/products/generated/${filename}` };
      await writeManifest(manifest);
      console.log("ok");
    } catch (e) { console.log(`fail: ${e.message}`); }
    await sleep(800);
  }

  // 3. Context retries — overwrite existing context paths
  console.log(`\n→ Context retries (${CONTEXT_RETRIES.length})`);
  for (const s of CONTEXT_RETRIES) {
    process.stdout.write(`  [${s.slug}/${s.kind} retry] ... `);
    try {
      const url = await generate(s);
      // Save to a "retry" filename so we can compare with the original
      const filename = `${s.slug}-context-retry.jpg`;
      await downloadTo(url, path.join(OUT_DIR, filename));
      console.log("ok (saved as -context-retry.jpg, manifest unchanged pending review)");
    } catch (e) { console.log(`fail: ${e.message}`); }
    await sleep(800);
  }

  // 4. Low-angle shots
  console.log(`\n→ Low-angle shots (${LOW_ANGLE_SHOTS.length})`);
  for (const s of LOW_ANGLE_SHOTS) {
    process.stdout.write(`  [${s.slug}/${s.kind}] ... `);
    try {
      const url = await generate(s);
      const filename = `${s.slug}-${s.kind}.jpg`;
      await downloadTo(url, path.join(OUT_DIR, filename));
      manifest[s.slug] = { ...(manifest[s.slug] || {}), [s.kind]: `/assets/products/generated/${filename}` };
      await writeManifest(manifest);
      console.log("ok");
    } catch (e) { console.log(`fail: ${e.message}`); }
    await sleep(800);
  }

  console.log(`\n— done —`);
}

main().catch((e) => { console.error("✗", e); process.exit(1); });
