# CanPlus Immigration — Website Design Spec

**Date:** 2026-06-11
**Approach:** Hybrid — full premium re-skin + re-content of the existing dolopreneur Next.js site, plus one bespoke interactive centerpiece (eligibility / CRS estimator).

## Goal

Transform the existing "Dolopreneur / Solopreneur OS" marketing site into a modern, premium, luxury website for **CanPlus Immigration**, a Canadian immigration consultancy. Reuse the site's infrastructure — loading-screen logo reveal, Lenis smooth scroll, Motion animations, ornament/scribble system, and content-driven architecture — while replacing brand, content, imagery, and converting the business model from SaaS pricing to **consultation-led** (free assessment, no published prices).

## Stack (unchanged)

Next.js 16 · React 19 · Tailwind v4 · Motion (Framer) · Lenis · lucide-react · @number-flow/react. No framework or dependency changes. This is re-skin + re-content + one new client-side widget.

## 1. Brand tokens — `app/globals.css`

Replace the warm-beige/chartreuse theme with **Editorial Split**:

- `--color-bg`: `#FBFAF7` (warm ivory)
- `--color-ink`: `#02152E` (deep navy) / `--color-ink-soft`, `--color-ink-muted` cool greys
- `--color-accent`: `#D11314` (maple red) · `--color-accent-hover`: darker red · `--color-accent-ink`: `#FFFFFF`
- New `--color-gold`: `#9A7B34` (antique-gold, for italic display accents + underline)
- `--color-surface-dark`: navy variants for split panels / dark sections
- `--color-card`: `#FFFFFF` / off-white · `--color-line`: cool grey hairline
- Keep fonts: Fraunces (display serif) + Jakarta (sans).
- `.scribble-underline` → recolored to gold ink stroke. Ornaments (`Glyph`, `Scribble`) recolored navy/red/gold. `::selection` → red.

## 2. Identity

- `components/brand/Logo.tsx` → maple-leaf mark (navy leaf, red detail) replacing the existing mark. SVG, scalable.
- `components/sections/LoadingScreen.tsx` + `.module.css` → same timing engine; lockup becomes: maple-leaf mark draws/glints in → "CanPlus Immigration" letters stagger → tagline **"Your Canadian future, expertly guided."** Update `WORD` constant and tagline; recolor glow/glint to gold/red.

## 3. Pages (full multi-page)

| Route | Source | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Home flow (see §4) |
| `/services` | services overview | All 8 services as rich cards |
| `/services/[slug]` ×8 | service detail | Deep feature blocks, KPIs, FAQ, CTA |
| `/about` | about | Firm story, licensed-consultant (RCIC) credibility, values, team |
| `/how-it-works` | how-it-works | Assess → Plan → Apply → Land process |
| `/guides` + `/guides/[slug]` | playbooks → guides | Immigration guides/resources |
| `/contact` | contact | Lead form + free-assessment capture, reuses `/api/lead` |
| `/eligibility` | NEW | Full-page eligibility / CRS estimator |
| `/legal/{privacy,terms,disclaimer}` | legal | Adapted; immigration disclaimer (estimates ≠ legal advice) |

Update `Nav`, `Footer`, `sitemap.ts`, `robots.ts`, `manifest.ts`, `app/layout.tsx` metadata, OpenGraph images, and `lib/seo.ts` defaults to CanPlus branding.

### 8 Services (each a card + detail page)
1. Work Permits & Extensions (LMIA, IMP, open/closed)
2. Study Permits & Extensions
3. Visitor Visa & Super Visa
4. PR — Express Entry / PNP / Sponsorship
5. Refugee Claims & Political Asylum
6. TRP & Inadmissibility
7. PR Card Renewal & Citizenship
8. Complex & Refused Cases (appeals, judicial review)

## 4. Homepage flow

1. **Hero (split editorial)** — `HeroBento` re-dressed: headline "Your Canadian future, expertly guided.", subhead, Free-assessment + Services CTAs, consultant/Canadian imagery on the split panel.
2. **Eligibility / CRS estimator** (NEW signature widget) — teaser/inline.
3. **How it works** — `LoopDiagram` → 4-step Assess/Plan/Apply/Land.
4. **Services showcase** — `ServicesFeaturesScene` → 8 service cards, scroll scene.
5. **Guides & resources** — `Playbooks` → immigration guides.
6. **Client success stories** — `Testimonials` → approvals/landings with photos.
7. **Final CTA** — `FinalCTA` → "Book a free consultation."

Pricing section is **removed**; conversion is driven by the estimator (2) + consultation CTAs (7).

## 5. Content files — `content/*.ts` (all rewritten)

- `services.ts` → 8 immigration services: `slug`, `name`, `tagline`, `blurb`, `capabilities[]`, `blocks[]` (deep feature blocks), `kpis[]` (processing-time / approval / experience framing — clearly non-guarantee), per-service `faq[]`, `bestFor[]`. Update `Slug` union to the 8 service slugs.
- `playbooks.ts` → renamed/repurposed to `guides.ts` (immigration guides). Update imports in `app/(marketing)/playbooks/*` → `guides`.
- `testimonials.ts` → client approval/landing stories (realistic, clearly illustrative placeholder).
- `pricing.ts` → retired (delete usages; remove `Pricing`/`PricingCompare` from home and routes, or repoint to consultation packages — default: remove).

## 6. Product-mocks → immigration trust-instruments

Remap rather than delete (`components/product-mocks/`):
- `DashboardChart` → CRS score gauge / points breakdown
- `InboxList` → document checklist (per service)
- `CallTranscript` / `ChatThread` → consultation / eligibility Q&A
- `ReservationCard` → consultation booking card
- `PageBuilderCanvas` → retire if no fit

## 7. Signature widget — Eligibility / CRS estimator (`/eligibility` + homepage)

- Client-side only. Inputs: age band, education level, language (CLB/IELTS band), Canadian + foreign work experience, (optional) job offer / PNP.
- Computes an **estimated** Express Entry CRS band using a simplified, transparent point model.
- Output: estimated band + plain-language interpretation + prominent disclaimer: *"This is an estimate, not legal advice or a guarantee — book a consultation for an exact assessment."*
- CTA routes into the consultation/lead flow. No data persisted; no backend call required.
- New component(s) under `components/sections/` (e.g. `EligibilityEstimator.tsx`) + a small pure calc module in `lib/`.

## 8. Imagery

Generate palette-tuned AI imagery (navy/red/gold/ivory, cinematic, premium): hero (Canadian skyline / arrival), professional consultant portrait, family/landing moments, document/passport details, per-service and about/testimonial imagery. Place under `public/`. Provide descriptive `alt` text.

## 9. Error handling, accessibility, testing

- `/api/lead` keeps validation; contact form shows success/error states.
- Estimator guards empty/invalid input; disclaimer always visible.
- `prefers-reduced-motion` honored (loading screen + motion components already do this) — preserved.
- Keyboard focus states preserved (existing `:focus-visible`).
- Verification before done: `npm run typecheck` and `npm run build` pass; spot-check key routes render.

## Out of scope

- Real CMS / backend, payments, authentication, multilingual i18n, real client data. Copy and imagery are premium placeholders to be replaced with the client's real assets/credentials.

## Disclaimers / correctness notes

- CRS estimator is explicitly an estimate; not a guarantee or legal advice.
- KPIs/testimonials are illustrative placeholders, labeled as such where appropriate, not claims of guaranteed outcomes.
- Legal/disclaimer page reflects that nothing on the site constitutes legal advice and use of a licensed RCIC is the basis of any formal representation.
