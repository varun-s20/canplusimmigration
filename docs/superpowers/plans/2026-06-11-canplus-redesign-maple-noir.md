# CanPlus "Maple Noir" Redesign Implementation Plan

> **For agentic workers:** Steps use checkbox (`- [ ]`) syntax. This is a visual-language overhaul of an existing, working Next.js site — verification is `npm run typecheck` + `npm run build` + visual spot-check (no unit tests; the only logic unit, `lib/crs.ts`, is unchanged). Not a git repo; "commit" → verification checkpoints. Execution applies `high-end-visual-design` and `emil-design-eng` principles (premium spacing/shadows/type, purposeful spring motion, invisible-detail polish).

**Goal:** Replace the navy-led bento/serif/scribble visual language with the red-led "Maple Noir" editorial system (grotesk + mono labels, ruled grid, red fields, retired ornaments), keeping all content, routes, and the loading-reveal choreography.

**Architecture:** Token names are preserved so recoloring propagates through Tailwind v4 `@theme` utilities; the real work is swapping fonts, rewriting `h*`/utility base styles, and rebuilding section/page components from cards→ruled editorial grid with mono-label section headers. Content (`content/*.ts`) and `lib/crs.ts` untouched.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, Motion, Lenis, @number-flow/react, Inter Tight + Inter + JetBrains Mono (next/font/google).

---

## Phase 1 — Foundation (tokens, fonts, base styles, primitives)

### Task 1: Recolor tokens + flatten radii/shadows
**Files:** Modify `app/globals.css`
- [ ] Replace `@theme` color values (KEEP names) per spec: `--color-accent:#8E1B2D; --color-accent-strong:#C8102E; --color-accent-ink:#F6F1E9; --color-ink:#1A1411; --color-ink-soft:#3a322c; --color-ink-muted:#6E665C; --color-gold:#9A7B34; --color-gold-soft:#b8965a; --color-bg:#F6F1E9; --color-card:#FCFAF5; --color-surface-dark:#1A1411; --color-surface-dark-2:#2a221d; --color-line:#E4DDCF; --color-line-dark:#3a322c;`
- [ ] Radii: `--radius-card:4px; --radius-tile:4px;` (keep `--radius-pill` token but stop using it).
- [ ] Soften shadows to near-flat (premium relies on rules, not drop shadows): reduce `--shadow-card`/`--shadow-tile` opacity/spread.
- [ ] `::selection` → garnet bg / warm-white text.
- [ ] Add fonts: `--font-display: var(--font-inter-tight); --font-sans: var(--font-inter); --font-mono: var(--font-jetbrains);`
- [ ] Verify: `npm run dev` — colors flip to Maple Noir site-wide.

### Task 2: Base type + new utilities, retire old ornament utilities
**Files:** Modify `app/globals.css`
- [ ] `h1,h2,h3` → `font-family: var(--font-display); font-weight:700; letter-spacing:-0.03em; line-height:0.98;` ink color.
- [ ] Add utilities: `.eyebrow` (mono, uppercase, 11px, tracking .18em, gold) ; `.rule` (1px full-width `var(--color-line)`); `.rule-ink`; `.index-num` (mono, muted). 
- [ ] Replace `.scribble-underline` body with a plain maple text-underline (or remove and update consumers in Task 7). Remove `.notch-card` usage (leave class harmlessly or delete + update consumers).
- [ ] Verify: typecheck clean.

### Task 3: Fonts in layout
**Files:** Modify `app/layout.tsx`
- [ ] Replace Fraunces/Plus_Jakarta_Sans imports with `Inter_Tight` (var `--font-inter-tight`, wght 600/700/800), `Inter` (var `--font-inter`, 400/500/600), `JetBrains_Mono` (var `--font-jetbrains`, 400/500). Apply all three `.variable` to `<html className>`.
- [ ] `viewport.themeColor` → `#F6F1E9` (already) — confirm.
- [ ] Verify: build; hero renders in grotesk.

### Task 4: Button + section primitives
**Files:** Modify `components/ui/Button.tsx`, `components/ui/SectionLabel.tsx`, `components/ui/Pill.tsx`, `components/ui/Card.tsx`
- [ ] `Button`: radius `rounded-[3px]`; variants `primary`(bg-accent text-accent-ink), `dark`(bg-surface-dark text-bg), `outline`(border border-ink text-ink), add `link`(text-accent-strong with animated underline). Min-h 44px. Read file first; keep prop API, adjust classes.
- [ ] `SectionLabel` → render as `.eyebrow` mono label (no pill bg) with optional leading garnet dot.
- [ ] `Pill` → restyle to squared mono tag (or mark deprecated; keep export).
- [ ] `Card` → flat: `bg-card`, `border border-line`, `rounded-[4px]`, no heavy shadow.
- [ ] Verify: typecheck; buttons/labels render in new system.

### Task 5: New layout primitives
**Files:** Create `components/ui/Rule.tsx` (full-width hairline + optional mono index/eyebrow), `components/ui/IndexRow.tsx` (ruled editorial row: mono number, grotesk title, sub line, arrow, hover garnet wipe)
- [ ] Implement both as small presentational components matching the system (use tokens/utilities). `IndexRow` props: `index:number, title:string, sub?:string, href:string`.
- [ ] Verify: typecheck.

---

## Phase 2 — Identity & chrome

### Task 6: Loading screen re-tint
**Files:** Modify `components/sections/LoadingScreen.module.css`, `LoadingScreen.tsx`
- [ ] Recolor glow/glint/underlineFill to garnet/gold (currently gold underline — keep; glint to garnet). Wordmark uses `--font-display` (grotesk) automatically via `var(--font-sans)`? It uses `var(--font-sans)` — change wordmark `font-family` to `var(--font-display)`, weight 800. Tagline → mono caps (`var(--font-mono)`, wider tracking) — adjust `.tagline` font-family/letter-spacing.
- [ ] Verify: reveal plays in new type/colors.

### Task 7: Nav + Footer
**Files:** Modify `components/layout/Nav.tsx`, `components/layout/Footer.tsx`
- [ ] Nav: brand wordmark in grotesk; links in `--font-sans` with mono active-state meta; replace pill button with squared `Button`; remove any scribble/pill ornament; hairline bottom border `border-line`. Mobile drawer uses ink surface (`bg-surface-dark`).
- [ ] Footer: ink (`bg-surface-dark`) section; columns with mono headings; brand wordmark grotesk; keep links. Replace accent dot color (now garnet).
- [ ] Verify: chrome matches system; links resolve.

---

## Phase 3 — Homepage sections (rebuild to editorial grid)

### Task 8: Hero
**Files:** Modify `components/sections/HeroBento.tsx`
- [ ] Rebuild as the red-field split hero: left ivory panel (mono eyebrow + leaf dot, giant grotesk H1 "Your Canadian future, guided.", hairline rule, mono service list) + right **garnet field** panel (FREE ASSESSMENT eyebrow, grotesk "Estimate your CRS →", sub) linking `/eligibility`. Keep the brand-film video as an optional band BELOW or remove from hero (decide: keep a slim full-width video strip under hero). Squared buttons. No bento tiles.
- [ ] Verify: hero renders, on system.

### Task 9: Process (LoopDiagram → ruled steps)
**Files:** Modify `components/sections/LoopDiagram.tsx`
- [ ] Keep 4 steps (Assess/Plan/Apply/Land). Render as a ruled 4-column row set with mono index, grotesk label, sub — hairline dividers, not cards. Section header = eyebrow + rule + H2.
- [ ] Verify.

### Task 10: Services showcase → editorial index
**Files:** Modify `components/sections/ServicesFeaturesScene.tsx` (retire morphing scene)
- [ ] Replace the scroll-morph scene with a calm **services index**: section header (eyebrow + rule), then 8 `IndexRow`s (one per service, linking `/services/[slug]`), plus a right-rail garnet field with a rotating service blurb or a single CRS CTA. Mobile: stacked rows. Remove `useScroll` morph, device mocks. Keep a tasteful scroll stagger on rows.
- [ ] Verify: 8 services list, links work.

### Task 11: Guides, Testimonials, FinalCTA, Estimator styling
**Files:** Modify `components/sections/Playbooks.tsx`, `Testimonials.tsx`, `FinalCTA.tsx`, `EligibilityEstimator.tsx`
- [ ] `Playbooks` (guides): ruled index of guides (IndexRow), eyebrow+rule header.
- [ ] `Testimonials`: ink (`bg-surface-dark`) section, large grotesk pull-quotes on rules with mono attribution; remove Glyph ornaments. (3 items.)
- [ ] `FinalCTA`: retire floating device-frames + scribbles; rebuild as a full-bleed **garnet field** CTA — giant grotesk "Ready to start your Canadian journey?", mono sub, squared warm-white button → `/contact`. Subtle reveal only.
- [ ] `EligibilityEstimator`: restyle to system (ivory card on rule, mono labels, garnet result field, squared controls); logic untouched.
- [ ] Verify: homepage end-to-end on system.

---

## Phase 4 — Pages & product-mocks

### Task 12: Services pages
**Files:** Modify `app/(marketing)/services/page.tsx`, `app/(marketing)/services/[slug]/page.tsx`, `components/product-mocks/ServiceVisual.tsx`
- [ ] Overview: eyebrow+rule header, services as `IndexRow`s (replace card articles). `ServiceVisual`: garnet field with mono label + grotesk name (re-skin to system, remove navy gradient → garnet/ink).
- [ ] Detail: hero with grotesk tagline + garnet accent; "What you get" as ruled list; KPIs as numerals-on-rule (not boxed `KPIRow` tiles — restyle `KPIRow`); programs as mono tags; FAQ kept (restyle); related as IndexRows. Squared CTAs → `/contact` /`/eligibility`.
- [ ] Verify: all 8 detail pages build.

### Task 13: KPIRow, FAQ, content components restyle
**Files:** Modify `components/content/KPIRow.tsx`, `FAQ.tsx`, `StepList.tsx`, `Prose.tsx`, `Quote.tsx`
- [ ] `KPIRow`: numerals in grotesk on a hairline baseline grid, mono labels — drop boxed tiles/shadows.
- [ ] `FAQ`: flat rows on rules, squared +/- ; ink/gold accents.
- [ ] `StepList`/`Prose`/`Quote`: align type to grotesk headings + Inter body + mono labels; remove serif assumptions.
- [ ] Verify: typecheck.

### Task 14: About / How-it-works / Contact / Legal / Eligibility pages
**Files:** Modify `app/(marketing)/about/page.tsx`, `how-it-works/page.tsx`, `contact/page.tsx`, `app/(marketing)/eligibility/page.tsx`, `app/legal/{privacy,terms,disclaimer}/page.tsx`, `app/not-found.tsx`
- [ ] Apply system: eyebrow+rule section headers, grotesk headings, ruled layouts, squared inputs/buttons, garnet accents, remove Glyph/scribble ornaments and pill labels. Contact form inputs → squared, mono labels, 44px min height. Content unchanged.
- [ ] Verify: pages build and render on system.

### Task 15: Product-mock trust-instruments re-skin
**Files:** Modify `components/product-mocks/DashboardChart.tsx`, `InboxList.tsx`, `CallTranscript.tsx`, `ChatThread.tsx`, `ReservationCard.tsx`, `PageBuilderCanvas.tsx`
- [ ] Re-skin visuals to Maple Noir (ink/ivory surfaces, garnet/gold accents, mono labels, flat rules, squared) — keep their content/data. Remove navy.
- [ ] Verify: wherever rendered, on system.

### Task 16: Ornaments + OG images + favicon
**Files:** Modify `components/ornament/Glyph.tsx`, `Scribble.tsx`, `components/motion/ScribbleDraw.tsx` (retire/neutralize), `app/opengraph-image.tsx`, `app/(marketing)/services/[slug]/opengraph-image.tsx`, `app/(marketing)/guides/[slug]/opengraph-image.tsx`
- [ ] Remove remaining Glyph/Scribble usages from any rendered component (Phases 2-4 should have); if `ornament/*` is now unused, delete the files and their imports. Otherwise neutralize.
- [ ] OG images: ivory bg, ink text, garnet block + grotesk; mono footer meta. (favicon already maple leaf — confirm fine on ivory.)
- [ ] Verify: build regenerates OG.

---

## Phase 5 — Verification
### Task 17: Full sweep
- [ ] Grep for retired classes/usages in rendered code: `scribble-underline`, `notch-card`, `Glyph`, `Scribble`, `Fraunces`, `Jakarta`, `rounded-pill` (should be gone from components/pages).
- [ ] `npm run typecheck` clean; `rm -rf .next && npm run build` green (41 routes).
- [ ] `next start -p 3100`; spot-check every page on the new system; reduced-motion pass; verify warm-white-on-garnet and maple-link contrast in-browser.
- [ ] Confirm content/copy unchanged and loading reveal plays in new type/colors.

## Self-review
- Spec §1 tokens→T1; §2 type→T2/T3; §3 layout/components→T4/T5/T8-14; §4 motion→applied across T8-11 (spring reveals, number roll-ups) ; §5 loading→T6; §6 rebuild list→T6-16; §7 verify→T17. All covered.
- Naming consistency: utilities `.eyebrow`/`.rule`/`.index-num`, components `Rule`/`IndexRow`, token `--color-accent-strong` — used identically across tasks.
- Content/`lib/crs.ts` explicitly untouched.
