# CanPlus Immigration Implementation Plan

> **For agentic workers:** Steps use checkbox (`- [ ]`) syntax for tracking. This is a frontend re-skin + re-content of an existing Next.js site, so verification is by `npm run typecheck` + `npm run build` + visual spot-check rather than unit tests — EXCEPT the CRS estimator calc module, which gets real unit tests (TDD). This repo is NOT a git repo; "commit" steps are replaced by verification checkpoints.

**Goal:** Transform the existing Dolopreneur Next.js marketing site into a premium, consultation-led website for CanPlus Immigration (Canadian immigration consultancy), reusing the loading-screen reveal, smooth scroll, and Motion system.

**Architecture:** Tailwind v4 `@theme` tokens drive all utility classes, so the visual rebrand is primarily a token swap in `globals.css` plus per-component copy/asset swaps. Content lives in `content/*.ts` and is rewritten wholesale. One new client-side interactive widget (CRS/eligibility estimator) with a pure, unit-tested calc module.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, Motion, Lenis, lucide-react, @number-flow/react.

---

## Phase 1 — Brand foundation (tokens, identity)

### Task 1: Recolor design tokens
**Files:** Modify `app/globals.css`
- [ ] Replace `@theme` color block with Editorial Split palette: `--color-accent:#D11314; --color-accent-hover:#b8100f; --color-accent-ink:#ffffff; --color-ink:#02152e; --color-ink-soft:#27364d; --color-ink-muted:#6b7280; --color-surface-dark:#02152e; --color-surface-dark-2:#0c2347; --color-bg:#fbfaf7; --color-card:#ffffff; --color-line:#e6e1d6; --color-line-dark:#16304f;` and add `--color-gold:#9a7b34;`
- [ ] Recolor `.scribble-underline` SVG stroke from `%23E8E54B` to `%239A7B34` (gold).
- [ ] Verify: `npm run typecheck` passes (no TS impact); run `npm run dev` and confirm site renders in navy/red/ivory.

### Task 2: Maple-leaf logo mark
**Files:** Modify `components/brand/Logo.tsx`
- [ ] Replace the circle/bar SVG with a maple-leaf glyph on a rounded navy square: `rect` fill `var(--color-surface-dark)`, maple-leaf `path` filled `var(--color-accent)` (red), `aria-label="CanPlus Immigration"`. Keep `viewBox="0 0 200 200"` and the `className`/props passthrough.
- [ ] Verify: leaf renders in nav, footer, loading screen.

### Task 3: Loading-screen lockup
**Files:** Modify `components/sections/LoadingScreen.tsx`, `components/sections/LoadingScreen.module.css`
- [ ] Change `const WORD = "Dolopreneur"` → `"CanPlus Immigration"` (note: space — render space as a non-animated spacer span so letter stagger still works).
- [ ] Change tagline text to `Your Canadian future, expertly guided.`
- [ ] In `.module.css`, recolor `glow`, `glint`, `underlineFill` to gold/red.
- [ ] Verify: reload shows leaf draw → wordmark stagger → tagline, then fade.

### Task 4: Global metadata & SEO defaults
**Files:** Modify `lib/seo.ts`, `app/layout.tsx`, `app/manifest.ts`, `components/seo/JsonLd.tsx`
- [ ] `lib/seo.ts`: `SITE_NAME="CanPlus Immigration"`, `SITE_URL="https://canplusimmigration.com"`, `DEFAULT_DESCRIPTION="Licensed Canadian immigration consultants for work permits, study permits, PR, citizenship and complex cases. Book a free eligibility assessment."`, default title suffix → `CanPlus Immigration. Your Canadian future, expertly guided.`
- [ ] `app/layout.tsx`: `viewport.themeColor` → `#FBFAF7`.
- [ ] `app/manifest.ts`: name/short_name/theme/background to CanPlus values.
- [ ] `components/seo/JsonLd.tsx`: Organization → immigration consultancy (name, url, description); WebSite likewise. Read the file first and adapt fields.
- [ ] Verify: `npm run build` produces correct `<title>`/meta.

---

## Phase 2 — Navigation, footer, content model

### Task 5: Nav & Footer
**Files:** Modify `components/layout/Nav.tsx`, `components/layout/Footer.tsx`
- [ ] Nav `links` → `[{/services,Services},{/how-it-works,How it works},{/guides,Guides},{/about,About}]`. Brand label "Dolopreneur" → "CanPlus Immigration" (both desktop and mobile drawer), `aria-label` → "CanPlus Immigration home". Primary button "Book a demo" → "Free assessment" linking `/eligibility`; "Sign in" → remove or change to "Contact" → `/contact`.
- [ ] Footer: brand label + blurb → CanPlus; columns → Product→Services (8 service links), Company (About, Guides, Contact), Resources (Guides, Contact, Free assessment), Legal (Privacy, Terms, Disclaimer). Copyright name → CanPlus. Tagline line → "Licensed consultants. Real outcomes." Replace "All systems operational" with "RCIC-led representation" (or remove status dot).
- [ ] Verify: nav/footer links resolve (some target pages built later — OK to 404 until then).

### Task 6: Services content model
**Files:** Modify `content/services.ts`
- [ ] Change `Slug` union to the 8 slugs: `"work-permits" | "study-permits" | "visitor-super-visa" | "permanent-residence" | "refugee-asylum" | "trp-inadmissibility" | "pr-card-citizenship" | "complex-refused"`.
- [ ] Keep the `Service`/`FeatureBlock` types. Rewrite the `services` array with all 8 entries fully populated: `name`, `tagline`, `blurb`, `capabilities[]` (4), `blocks[]` (2-3 deep blocks with `title`/`body`/`bullets`), `integrations[]` → repurpose as `documents[]`-style supporting items OR keep as `integrations` listing relevant programs (rename in type to `programs`), `kpis[]` (illustrative, non-guarantee framing e.g. "150+ approvals", "12 yrs experience"), `faq[]` (3-4), `bestFor[]` (3). Premium, accurate immigration copy.
- [ ] Verify: `npm run typecheck` passes; any consumer referencing old slugs/fields updated.

### Task 7: Guides content (rename playbooks)
**Files:** Create `content/guides.ts` (port from `content/playbooks.ts`), update consumers
- [ ] Read `content/playbooks.ts` for shape. Create `content/guides.ts` with the same exported type shape but immigration guide entries (e.g. "Express Entry, explained", "The Super Visa playbook", "Recovering from a refusal", "Study permit to PR"). Keep slugs.
- [ ] Update `app/(marketing)/playbooks/page.tsx`, `app/(marketing)/playbooks/[slug]/page.tsx`, `[slug]/opengraph-image.tsx`, `components/sections/Playbooks.tsx` to import from `content/guides`. (Routes stay under `/playbooks` OR rename folder to `guides` — default: rename folder `app/(marketing)/playbooks` → `app/(marketing)/guides` and update internal links.)
- [ ] Verify: `/guides` and a guide detail render.

### Task 8: Testimonials content
**Files:** Modify `content/testimonials.ts`
- [ ] Read shape, rewrite with immigration client stories (name, role/origin→destination, quote, rating/outcome) — illustrative placeholders.
- [ ] Verify: `npm run typecheck`.

### Task 9: Retire pricing
**Files:** Modify `app/page.tsx`, `app/(marketing)/pricing/page.tsx`, `components/sections/*`, `content/pricing.ts`, `Nav`/`Footer`
- [ ] Remove `Pricing` from `app/page.tsx` homepage composition.
- [ ] Replace `/pricing` route content with a consultation/assessment page ("Free eligibility assessment" → CTA to `/eligibility` and `/contact`), OR delete the route and remove links. Default: convert `/pricing` → redirect/链 to `/eligibility` is overkill; instead make `/pricing` a simple "How we work / fees" page stating consultation-led, transparent quotes after assessment.
- [ ] Remove unused `content/pricing.ts`, `components/sections/Pricing.tsx`, `PricingCompare.tsx` references if fully unused (keep files if still imported anywhere; otherwise delete).
- [ ] Verify: `npm run build` — no broken imports.

---

## Phase 3 — Homepage & marketing sections (copy/visual swap)

### Task 10: Hero
**Files:** Modify `components/sections/HeroBento.tsx`
- [ ] Read the file. Replace all SaaS copy with CanPlus hero: eyebrow "Licensed Canadian immigration consultants", H1 "Your Canadian future, expertly guided.", subhead, primary CTA "Free eligibility assessment"→`/eligibility`, secondary "Explore services"→`/services`. Swap any product-mock bento tiles for immigration imagery (Task 18 assets) / trust stats. Recolor accents (tokens already handle most).
- [ ] Verify: homepage hero renders on-brand.

### Task 11: Process / LoopDiagram
**Files:** Modify `components/sections/LoopDiagram.tsx`
- [ ] Read file. Re-label the loop to 4 steps: Assess → Plan → Apply → Land (with short descriptions). Keep the animation.
- [ ] Verify: renders.

### Task 12: Services showcase scene
**Files:** Modify `components/sections/ServicesFeaturesScene.tsx`, `components/sections/ServicesStack.tsx`
- [ ] Read files. Point them at the new `content/services.ts` (8 services). Update any hardcoded product names/copy. Ensure cards link to `/services/[slug]`.
- [ ] Verify: 8 services display and scroll-animate.

### Task 13: Final CTA + remaining sections
**Files:** Modify `components/sections/FinalCTA.tsx`, `components/sections/StatsScribble.tsx` (if used), `components/sections/FeatureTabs.tsx` (if used)
- [ ] FinalCTA copy → "Talk to a licensed consultant" + "Book a free consultation" → `/contact`.
- [ ] Update any other section components still containing SaaS copy that appear on built pages.
- [ ] Verify: homepage end-to-end on-brand.

---

## Phase 4 — Pages

### Task 14: Services overview + detail
**Files:** Modify `app/(marketing)/services/page.tsx`, `app/(marketing)/services/[slug]/page.tsx`, `[slug]/opengraph-image.tsx`
- [ ] Read files. Ensure overview lists all 8 services from content; detail page renders blocks/kpis/faq/bestFor for each slug; `generateStaticParams` covers the 8 slugs; OG image uses service name. Update copy/CTAs to consultation-led.
- [ ] Verify: all 8 `/services/[slug]` build via `npm run build`.

### Task 15: About, How-it-works, Contact
**Files:** Modify `app/(marketing)/about/page.tsx`, `app/(marketing)/how-it-works/page.tsx`, `app/(marketing)/contact/page.tsx`, `app/api/lead/route.ts`
- [ ] About: firm story, licensed RCIC credibility, values, (optional) team. Premium copy + imagery.
- [ ] How-it-works: the Assess/Plan/Apply/Land process in depth.
- [ ] Contact: lead form + free-assessment framing; keep `/api/lead` validation, update any product-specific field labels/copy.
- [ ] Verify: forms submit (success/error states), pages build.

### Task 16: Legal pages
**Files:** Modify `app/legal/privacy/page.tsx`, `app/legal/terms/page.tsx`, rename `app/legal/dpa` → `app/legal/disclaimer`
- [ ] Privacy/Terms: rebrand to CanPlus. Replace DPA with an immigration Disclaimer page (estimates ≠ legal advice; representation via licensed RCIC). Update Footer link label DPA→Disclaimer.
- [ ] Verify: pages build; footer links resolve.

---

## Phase 5 — Signature widget: Eligibility / CRS estimator

### Task 17a: CRS calc module (TDD)
**Files:** Create `lib/crs.ts`, `lib/crs.test.ts` (or `__tests__`)
- [ ] **Write failing test** `lib/crs.test.ts`: define inputs type and assert known cases, e.g.:
```ts
import { estimateCRS } from "./crs";
test("young, masters, high language, some experience scores in a strong band", () => {
  const r = estimateCRS({ age: 29, education: "masters", language: "clb9", canExp: 1, foreignExp: 3 });
  expect(r.score).toBeGreaterThan(400);
  expect(r.band).toBe("strong");
});
test("older, diploma, low language scores lower", () => {
  const r = estimateCRS({ age: 48, education: "diploma", language: "clb5", canExp: 0, foreignExp: 1 });
  expect(r.score).toBeLessThan(r.maxScore);
  expect(["limited","moderate"]).toContain(r.band);
});
```
- [ ] **Run** (needs a test runner). If none configured, add a minimal `node --test` compatible test OR a `vitest` dev dep. Default: write `estimateCRS` as a pure function and validate via a tiny `node --test` file using `tsx`. If adding tooling is undesirable, replace with an assertion script run via `npx tsx lib/crs.check.ts` that throws on mismatch. Expected: FAIL (no module).
- [ ] **Implement** `lib/crs.ts`: pure `estimateCRS(input): { score, maxScore, band, breakdown }` using a simplified, clearly-approximate Express Entry point model (age, education, language CLB, Canadian/foreign experience; optional jobOffer/pnp). Document that it is an estimate.
- [ ] **Run** → PASS.
- [ ] Verify: `npm run typecheck`.

### Task 17b: Estimator UI
**Files:** Create `components/sections/EligibilityEstimator.tsx`; Create `app/(marketing)/eligibility/page.tsx`; Modify `app/page.tsx`
- [ ] Build a client component: friendly stepped/segmented inputs (age band, education, language band, Canadian exp, foreign exp, optional job offer/PNP) wired to `estimateCRS`. Animated result with `@number-flow/react` showing estimated score + band + plain-language interpretation. Prominent disclaimer: "This is an estimate, not legal advice or a guarantee — book a consultation for an exact assessment." CTA → `/contact`.
- [ ] Add `/eligibility` page wrapping the estimator with hero copy + SEO metadata via `buildMetadata`.
- [ ] Insert the estimator (or a teaser linking to `/eligibility`) into the homepage after the hero in `app/page.tsx`.
- [ ] Verify: input changes update score; reduced-motion respected; build passes.

---

## Phase 6 — Imagery & product-mocks

### Task 18: Generate AI imagery
**Files:** Create assets under `public/img/` (hero, consultant, family, services, about, testimonials); reference from components
- [ ] Generate palette-tuned (navy/red/gold/ivory, cinematic, premium) images for hero, about, services, testimonials using image-gen skills. Save to `public/img/` with descriptive names. Wire into Hero/About/Services/Testimonials with descriptive `alt`.
- [ ] Verify: images load, no layout shift (set width/height or aspect classes).

### Task 19: Product-mocks → trust-instruments
**Files:** Modify `components/product-mocks/DashboardChart.tsx`, `InboxList.tsx`, `CallTranscript.tsx`, `ChatThread.tsx`, `ReservationCard.tsx`; retire `PageBuilderCanvas.tsx` if unused
- [ ] Where these appear on built pages, re-skin/re-content: DashboardChart→CRS gauge, InboxList→document checklist, CallTranscript/ChatThread→consultation Q&A, ReservationCard→consultation booking. Remove any that no longer appear.
- [ ] Verify: no SaaS demo content remains on any built page.

---

## Phase 7 — Final verification

### Task 20: Full verification sweep
- [ ] Grep for residual SaaS terms: `Dolopreneur|Solopreneur|ConverseOS|SiteForge|VoxAgent|playbook` across `app/`, `components/`, `content/`, `lib/`. Replace stragglers.
- [ ] `npm run typecheck` → clean.
- [ ] `npm run build` → succeeds, all routes (home, /services + 8 slugs, /about, /how-it-works, /guides + slugs, /contact, /eligibility, /legal/*) compile.
- [ ] `npm run dev` + visual spot-check each page renders on-brand with imagery; loading reveal correct; estimator works; reduced-motion honored.
- [ ] Update `sitemap.ts`/`robots.ts` to reflect new routes.

## Self-review notes
- Spec §1–9 all map to tasks above (tokens→T1, identity→T2/3, SEO→T4, pages→T14-16, content→T6-9, mocks→T19, estimator→T17, imagery→T18).
- CRS estimator is the only genuinely unit-testable unit and uses TDD (T17a). All else is verify-by-build/visual, appropriate for a re-skin.
- Naming consistency: estimator function `estimateCRS`, returns `{score,maxScore,band,breakdown}` — used identically in T17a and T17b.
