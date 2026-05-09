# Arvex

Hand-built luxury chandeliers, made in our Jaipur atelier. Bespoke architectural lighting for private residences, hospitality projects, and luxury commercial interiors across India.

Stack: Next.js 14, Three.js / R3F, Framer Motion, Lenis.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** with a custom "High-Key Future" design system
- **@react-three/fiber + drei** for procedural 3D (hero chandelier + animated shader background)
- **Framer Motion** for cinematic reveals and pseudo-3D parallax cards
- **Lenis** for inertia-based smooth scroll
- File-based lead store (swap for Resend / SendGrid / Supabase in production)

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Generating chandelier imagery (Leonardo AI)

1. **Rotate** any Leonardo key that has been pasted into chat or a document.
2. `copy .env.example .env.local` (Windows) or `cp .env.example .env.local`.
3. Set `LEONARDO_API_KEY` and (optionally) `LEONARDO_MAX_CREDITS` (hard credit cap, default 200).
4. Choose a generation mode:

```bash
# Curated: 7 priority shots only (~60 credits). Recommended first run.
#   - Aurora Veil: hero, detail, context, ortho
#   - Axis Mundi, Halo Mercury, Monolith Thin: hero each
npm run generate:assets:curated

# Full: every shot for every piece (up to 80 generations, ~600+ credits).
npm run generate:assets
```

What happens automatically:

- Photographs land in `public/assets/products/generated/` as `{slug}-{kind}.jpg`.
- The script writes `src/data/product-images.json` after each successful download — Next.js sees the manifest and the corresponding component swaps from gradient placeholder to real photography on the next build.
- Already-generated shots are skipped on re-run; the script is fully resumable.
- A credit summary is printed at the end (estimated and actual).

After generation: run `npm run build` to bake the new imagery into the static pages.

The site renders fully without any AI image — gradient layers and the procedural R3F chandelier carry the visual weight until photography arrives. Real images are an enhancement, not a dependency.

### Image art-direction (already baked into the prompts)

Every prompt ships with shared art direction: *"Photographed for Architectural Digest. Editorial interior photography, golden hour, soft indirect daylight, warm ivory and champagne palette, hand-cut crystal sparkle, brushed champagne brass highlights, calm wealthy atmosphere, no people, no signage, no text, restrained, timeless, photorealistic."*

A negative prompt strips out the failure modes: *"futuristic, sci-fi, neon, plasma, cyberpunk, gaming, fantasy, AI render, glow effect, lens flare, oversaturated, HDR look, distorted geometry, busy background, watermark, signage, text, people, hands, faces."*

## Project map

```
src/
  app/                     # App Router pages
    api/lead/              # Lead inquiry endpoint (file-based JSON)
    api/concierge/         # Stubbed concierge agent (pattern-matched)
    product/[slug]/        # Per-piece detail page (statically rendered)
    sitemap.ts             # /sitemap.xml
    robots.ts              # /robots.txt
  components/
    three/                 # R3F scenes + shader background
    Hero.tsx               # Cinematic slider with depth parallax
    Gallery.tsx            # Filterable grid
    ProductCard.tsx        # Pseudo-3D tilt card with sheen sweep
    LeadForm.tsx           # Multi-step glassmorphism form
    ConciergeAgent.tsx     # Floating concierge orb + chat
    Nav.tsx / Footer.tsx
    seo/JsonLd.tsx         # Organization + Product + Breadcrumb schema
  data/products.ts         # 20 seed pieces, 4 categories
scripts/generate-leonardo.mjs
```

## Production hardening checklist

- [ ] Move lead storage from `data/leads.json` to Supabase or Postgres.
- [ ] Wire Resend / SendGrid in `src/app/api/lead/route.ts`.
- [ ] Replace stubbed concierge in `src/app/api/concierge/route.ts` with Anthropic Messages (`claude-opus-4-7`), passing the seed product list as system context.
- [ ] Generate real Leonardo imagery and reference it from `Product.images`.
- [ ] Add `next/image` references in `ProductCard` and `ProductHero` once images exist.
- [ ] Add Spline-exported `.splinecode` URLs for hero pieces.
- [ ] Set `SITE_URL` to the production domain so metadata, sitemap, and JSON-LD are absolute.
