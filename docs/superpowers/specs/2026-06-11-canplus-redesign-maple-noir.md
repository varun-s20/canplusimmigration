# CanPlus Immigration — "Maple Noir" Redesign Spec

**Date:** 2026-06-11
**Goal:** Replace the current (ported-dolopreneur) visual language with a fresh, distinct, red-led editorial system at equal or higher premium, WITHOUT changing content, copy, routes, or the loading-reveal choreography. Execution uses the `high-end-visual-design` and `emil-design-eng` skills.

## What changes vs. what stays

**Changes (visual language only):**
- Color tokens (navy-led → red-led "Maple Noir")
- Typography (Fraunces serif + Jakarta → grotesk + mono-label, no serif)
- Layout system (bento cards / hairline tiles / notched corners → ruled editorial grid)
- Ornament (scribble underlines + hand-drawn Glyphs → mono labels, rules, red fields)
- Signature scroll set-pieces (morphing rectangle scene, floating device frames → calmer intentional reveals)
- Component shapes (pills → squared 2px controls; boxed KPI tiles → numerals on rules; service/guide cards → ruled index rows)

**Stays:**
- All content/copy and `content/*.ts`
- All routes/pages and the consultation-led IA
- Loading-screen choreography (re-tinted to new red/gold, same timing)
- CRS estimator logic (`lib/crs.ts`) and product-mock "trust-instrument" data (re-skinned visually only)
- Brand: CanPlus Immigration, RCIC/CICC-compliant, no outcome guarantees

## 1. Color tokens — `app/globals.css` `@theme`

| Token | Value | Role |
|---|---|---|
| `--color-accent` | `#8E1B2D` | Garnet — PRIMARY brand field (panels, red blocks, primary buttons) |
| `--color-accent-strong` | `#C8102E` | Maple — live accent (links, active, small marks) |
| `--color-accent-ink` | `#F6F1E9` | text/icon on red fields (warm white) |
| `--color-ink` | `#1A1411` | near-black warm body/headings |
| `--color-ink-soft` | `#3a322c` | secondary ink |
| `--color-ink-muted` | `#6E665C` | muted text |
| `--color-gold` | `#9A7B34` | refined second accent (rules, mono labels) |
| `--color-bg` | `#F6F1E9` | warm ivory base |
| `--color-card` | `#FCFAF5` | raised surface |
| `--color-surface-dark` | `#1A1411` | dark sections (ink, not navy) |
| `--color-surface-dark-2` | `#2a221d` | dark raised |
| `--color-line` | `#E4DDCF` | hairline border |
| `--color-line-dark` | `#3a322c` | hairline on dark |

- Radii reduced: `--radius-card: 4px; --radius-tile: 4px;` keep `--radius-pill` only where still needed (it largely isn't).
- `--shadow-*` softened/flattened (premium editorial relies on rules + fields, not drop shadows).
- `::selection` → garnet on ivory.
- Remove/repurpose `.scribble-underline`, `.notch-card` utilities (retire usage; a new `.rule` / mono-label utility set replaces them).

## 2. Typography — `app/layout.tsx`

- **Display:** `Inter Tight` (Google), weights 600/700/800, `--font-display`. Negative tracking on heroes (~-0.035em), line-height ~0.95, large scale.
- **Body/UI:** `Inter` (Google), 400/500/600, `--font-sans`, 16px base, line-height 1.6.
- **Mono labels:** `JetBrains Mono` (Google), 400/500, `--font-mono`, uppercase, letter-spacing ~0.18em — for eyebrows, stats, indices, nav meta.
- Remove Fraunces. Update `h1,h2,h3` base styles in `globals.css` to use the grotesk display with tight tracking.
- Type scale (px): 11 mono-label · 16 body · 20 sub · 28 section · 40 H2 · 56 H1 · 72–88 hero. Maintain ~5:1 hero:body.

## 3. Layout & component language

- **Editorial grid:** left-aligned, asymmetric two-column splits, generous whitespace, full-width hairline `rule` dividers between sections, mono index numbers (`01 / 02`) as section markers.
- **Section header pattern:** mono eyebrow (in gold or garnet) + hairline rule + large grotesk H2 — replaces the old pill `SectionLabel`.
- **Buttons** (`components/ui/Button.tsx`): squared (radius 2–4px). Variants: `primary` = solid garnet / warm-white text; `dark` = ink fill; `outline` = 1px ink border; plus a `link` style = maple text with an underline that draws on hover. Min touch target 44px. Keep existing variant prop names where possible; add `link`.
- **Cards → index rows:** services & guides render as a **ruled index** (one row per item: mono number, name in grotesk, short line, arrow; hairline divider; hover reveals a thin garnet fill / arrow slide) instead of tiled cards. A `ServiceVisual`-style red field remains for hero/detail accent.
- **KPIs:** large grotesk numerals sitting on a hairline baseline with mono labels — not boxed tiles.
- **Dark sections** use ink `#1A1411` (not navy); red fields punctuate.

## 4. Motion (via emil-design-eng + high-end-visual-design)

- Premium, restrained, meaning-bearing: scroll-triggered **text mask reveals**, a **garnet field wipe-in** for red panels, **number roll-ups** (keep `@number-flow/react`), **link underline draws**, subtle **image parallax**. Spring-based, 150–300ms, exit faster than enter, staggered list rows 30–50ms.
- Retire the morphing-rectangle `ServicesFeaturesScene` set-piece and the `FinalCTA` floating device-frames; replace with calmer reveals consistent with the system.
- Honor `prefers-reduced-motion` everywhere (already wired; preserve).

## 5. Loading reveal

- Keep `LoadingScreen` choreography/timing. Re-tint: glow/glint/underline to garnet/gold; wordmark in the new grotesk; tagline in mono caps. Maple-leaf mark unchanged (already on-brand red).

## 6. Components/pages to rebuild to the new system

`globals.css`, `app/layout.tsx`, `components/ui/Button.tsx`, `SectionLabel`, `Pill`, `Card`, `components/layout/Nav.tsx`, `Footer.tsx`, `components/sections/*` (HeroBento, LoopDiagram, ServicesFeaturesScene→new services index, Playbooks/guides, Testimonials, FinalCTA, EligibilityEstimator styling), `components/product-mocks/*` (re-skin visuals to new palette), `ornament/*` (Glyph/Scribble retired or replaced by `Rule`/mono-label primitives), all `app/(marketing)/*` + `app/legal/*` page layouts, OG image generators, `LoadingScreen.module.css`. Content files untouched.

## 7. Verification

- `npm run typecheck` + `npm run build` green; all 41 routes render.
- Visual spot-check each page on the new system; reduced-motion pass; contrast AA on red fields (warm-white on garnet ≥ 4.5:1 — verify, darken garnet if needed).
- Confirm zero remnants of old ornament classes (`scribble-underline`, `notch-card`, Glyph imports) on rendered pages.

## Out of scope
- Content/copy rewrites, new pages, backend, real AI photography (still pending image tooling/keys).

## Risk notes
- Warm-white `#F6F1E9` on garnet `#8E1B2D`: verify ≥4.5:1; if short, deepen garnet to ~`#7E1626`.
- Maple `#C8102E` as link text on ivory: verify contrast; use ink underline if borderline.
