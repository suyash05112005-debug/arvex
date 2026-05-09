#!/usr/bin/env node
/**
 * Editorial depth completion: hero retries (with strict dominance language),
 * detail shots (macro material studies), and context shots (wide editorial
 * in-situ) for the strongest products. Writes manifest as it goes.
 *
 * Run with:  node --env-file=.env.local scripts/generate-collection-extras.mjs
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

// ─── Shared art direction ───────────────────────────────────────────────

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

// ─── Phase 1: HERO RETRIES (very strict dominance) ──────────────────────

const HERO_RETRIES = [
  {
    slug: "origami-nebula",
    label: "Origami Nebula — folded mirror panels",
    prompt:
      "A SUSPENDED chandelier hanging from a thin steel cord visibly from " +
      "the ceiling at the very TOP of the frame, occupying the upper 50–60% " +
      "of a vertical 4:5 portrait composition. The chandelier is composed of " +
      "large mirror-polished stainless-steel triangular and trapezoidal " +
      "panels, articulated, faceted, arranged like folded origami in a " +
      "constellation, edge-lit with thin warm-white LED lines. " +
      "Architectural sculptural form, like an installation by Anish Kapoor " +
      "or Olafur Eliasson. Behind the chandelier: a tall warm ivory plaster " +
      "wall, completely empty, with the quietest hint of late afternoon " +
      "light from frame-right. No floor visible, no furniture, no clutter. " +
      "The chandelier hangs and dominates the frame. " +
      SHARED,
    negative:
      NEGATIVE_BASE +
      ", origami architecture, folded ceiling, vaulted ceiling, " +
      "architectural plaster, room without chandelier, empty room, " +
      "missing fixture, no fixture, ceiling design, no chandelier, " +
      "tabletop arrangement, console table, sideboard, hanging crystals, " +
      "crystal pendants",
  },
  {
    slug: "petal-quiet",
    label: "Petal Quiet — porcelain lotus pendant",
    prompt:
      "A SUSPENDED chandelier hanging visibly from a thin black cord from " +
      "the ceiling at the TOP of the frame, occupying the upper 50–60% of a " +
      "vertical 4:5 portrait composition. The chandelier is sculpted from " +
      "bone-white porcelain into the form of a single large open lotus " +
      "flower with overlapping petals, glowing warm white softly from " +
      "within. Approximately 110 cm in diameter. The fixture is the " +
      "absolute centerpiece, hanging in mid-air inside an empty warm Indian " +
      "luxury interior — ivory plaster wall behind, soft late afternoon " +
      "light. No furniture, no console table, no vase, no sideboard, no " +
      "tabletop, NO objects below the chandelier. Just an empty room with " +
      "a hanging porcelain lotus chandelier dominating the frame. " +
      SHARED,
    negative:
      NEGATIVE_BASE +
      ", vase, flower vase, console table, sideboard, table, tabletop, " +
      "tabletop arrangement, lotus on table, lotus in vase, bouquet, " +
      "flower arrangement, glass console, side table, missing fixture, " +
      "no chandelier, no fixture, ceiling without chandelier",
  },
];

// ─── Phase 2: DETAIL SHOTS (macro material studies) ─────────────────────

const DETAIL_TARGETS = [
  {
    slug: "medusa-bloom",
    label: "Medusa Bloom — silicate dome and silicone tendrils",
    prompt:
      "Macro detail photograph of the Medusa Bloom chandelier. " +
      "Extreme close-up on the underside of a hand-blown silicate-glass " +
      "dome where it meets silken white silicone tendrils cascading " +
      "downward. Translucent silicate catches warm golden light. The " +
      "tendrils have soft optical depth and gentle motion. Very shallow " +
      "depth of field, focus on the dome lip with the tendrils softly " +
      "blurred. Warm ivory background, falloff into shadow. " +
      "Editorial product photography. " +
      SHARED,
  },
  {
    slug: "void-arc",
    label: "Void Arc — brushed steel arc edge detail",
    prompt:
      "Macro detail photograph of the Void Arc lighting fixture. " +
      "Extreme close-up on the precision-machined edge of a brushed " +
      "stainless steel arc, where a thin warm-white LED line is concealed " +
      "inside the arc, throwing a soft indirect glow onto the ivory " +
      "plaster wall just behind. The brushed steel surface catches a " +
      "single highlight. Very shallow depth of field, the LED edge in " +
      "razor focus, the wall softly blurred. Warm late-afternoon light. " +
      "Editorial architectural detail. " +
      SHARED,
  },
  {
    slug: "monolith-thin",
    label: "Monolith Thin — edge-lit aluminum bar end",
    prompt:
      "Macro detail photograph of the Monolith Thin lighting fixture. " +
      "Extreme close-up on the bottom end of a 12 mm thick brushed " +
      "aluminum bar, where a thin warm-white edge-lit LED line emerges. " +
      "The aluminum surface has a very fine brushed grain. The end of the " +
      "bar is precision-machined. Shallow depth of field — the LED line " +
      "and machined edge in razor focus, the aluminum surface fading into " +
      "soft warm shadow. Warm ivory backdrop, restrained. " +
      "Editorial architectural product detail. " +
      SHARED,
  },
  {
    slug: "fjord-cascade",
    label: "Fjord Cascade — hand-cut crystal slab edges",
    prompt:
      "Macro detail photograph of the Fjord Cascade chandelier. " +
      "Extreme close-up on three hand-cut crystal slabs hanging from a " +
      "polished champagne-brass ribbon, each slab edge-lit with a thin " +
      "warm LED line. Light refracts through the crystal edges with cool " +
      "blue and warm gold tones interlacing. Brass catches a single warm " +
      "highlight. Very shallow depth of field, focus on the LED edge, " +
      "the rest of the cascade softly blurred. Editorial jewelry-grade " +
      "material study. " +
      SHARED,
  },
];

// ─── Phase 3: CONTEXT / IN-SITU SHOTS ───────────────────────────────────

const CONTEXT_TARGETS = [
  {
    slug: "medusa-bloom",
    label: "Medusa Bloom — wide editorial in private dining room",
    prompt:
      "Wide editorial photograph of a private Indian luxury dining room at " +
      "golden hour, with the Medusa Bloom chandelier — a large sculptural " +
      "hand-blown silicate dome with silken white silicone tendrils — " +
      "suspended above a long ivory marble dining table. Travertine floor, " +
      "ivory plaster walls, low-back linen chairs, a single tall window on " +
      "the left diffusing warm late-afternoon daylight. The chandelier is " +
      "the visual anchor, hanging central and dominant in the upper third. " +
      "No people, no clutter. Restrained, expensive, museum-grade. " +
      "Wide horizontal 3:2 composition. " +
      SHARED,
  },
  {
    slug: "void-arc",
    label: "Void Arc — minimal foyer with indirect light",
    prompt:
      "Wide editorial photograph of a minimal modern Indian luxury foyer " +
      "with the Void Arc lighting fixture — a precision brushed-steel arc — " +
      "suspended on the wall, throwing soft warm indirect light onto the " +
      "ivory plaster ceiling, erasing the wall behind it. Pale travertine " +
      "floor, single low walnut bench against the opposite wall, no other " +
      "furniture, an arched walnut doorway visible. Late-afternoon golden " +
      "hour. The arc is the architectural focal point. No people. " +
      "Wide horizontal 3:2 composition. " +
      SHARED,
  },
  {
    slug: "monolith-thin",
    label: "Monolith Thin — long dining table beneath three bars",
    prompt:
      "Wide editorial photograph of a long modern Indian luxury dining " +
      "room with three Monolith Thin lighting bars — slim 12 mm brushed " +
      "aluminum vertical bars, each edge-lit with a warm-white LED line — " +
      "suspended in a row above a long oak dining table. Linen chairs, " +
      "pale travertine floor, ivory plaster walls, golden-hour light from " +
      "tall windows on the left. The three bars run as a luminous line " +
      "across the upper third of the frame. No people. Restrained, " +
      "architectural. Wide horizontal 3:2 composition. " +
      SHARED,
  },
  {
    slug: "fjord-cascade",
    label: "Fjord Cascade — lounge with garden view",
    prompt:
      "Wide editorial photograph of a calm Indian luxury lounge at golden " +
      "hour, with the Fjord Cascade chandelier — hand-cut crystal slabs " +
      "hanging along a polished champagne-brass ribbon — suspended above a " +
      "low ivory linen sectional sofa and a walnut coffee table. Pale " +
      "travertine floor, ivory plaster walls, a tall arched window on the " +
      "right showing a soft garden view. The crystal cascade catches the " +
      "warm light, refracting cool blue tones. The chandelier is the " +
      "visual anchor in the upper third. No people. Wide horizontal 3:2 " +
      "composition. " +
      SHARED,
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

// ─── Runner ─────────────────────────────────────────────────────────────

async function runShot(target, kind, manifest) {
  const filename = `${target.slug}-${kind}.jpg`;
  const dest = path.join(OUT_DIR, filename);
  process.stdout.write(`  [${kind}] ${target.slug} ... `);
  // Hero retries: previous file already on disk but NOT in manifest; we want
  // to overwrite so we do NOT skip on file-exists alone. For detail/context
  // we DO skip if already in manifest.
  if (kind !== "hero" && manifest[target.slug]?.[kind]) {
    console.log("skip (already in manifest)");
    return;
  }
  const dim = kind === "context"
    ? { width: 1216, height: 832 }
    : { width: 832, height: 1216 };

  try {
    const url = await generate({
      prompt: target.prompt,
      negative: target.negative || NEGATIVE_BASE,
      ...dim,
    });
    await downloadTo(url, dest);
    manifest[target.slug] = {
      ...(manifest[target.slug] || {}),
      [kind]: `/assets/products/generated/${filename}`,
    };
    await writeManifest(manifest);
    console.log("ok");
  } catch (e) {
    console.log(`fail: ${e.message}`);
  }
  await sleep(800);
}

async function main() {
  const manifest = await loadManifest();

  console.log(`\n→ Phase 1: hero retries (${HERO_RETRIES.length})`);
  for (const t of HERO_RETRIES) await runShot(t, "hero", manifest);

  console.log(`\n→ Phase 2: detail shots (${DETAIL_TARGETS.length})`);
  for (const t of DETAIL_TARGETS) await runShot(t, "detail", manifest);

  console.log(`\n→ Phase 3: context shots (${CONTEXT_TARGETS.length})`);
  for (const t of CONTEXT_TARGETS) await runShot(t, "context", manifest);

  console.log(`\n— done —`);
}

main().catch((e) => {
  console.error("✗", e);
  process.exit(1);
});
