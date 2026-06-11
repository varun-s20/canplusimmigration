# CanPlus — Pages, Formatting, Blog & Crimson Palette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deepen the brand red to a cooler "Deep Maple Crimson", make spacing/typography/responsive behaviour systematic across every page, add a static Blog and a Team page, and enrich the site's trust/credential content.

**Architecture:** The site is Next.js 16 (App Router) + Tailwind v4 (`@theme` tokens in `app/globals.css`) + Motion, with content held in plain TypeScript modules under `content/` and rendered by editorial components in `components/`. We extend that exact pattern: introduce two layout primitives (`Section`, `PageHero`) and three fluid type utilities so spacing/typography stop being hand-tuned per page; migrate the palette tokens (and the four files with hard-coded hex) to crimson; and add `content/blog.ts` + `content/team.ts` driving new routes that mirror the existing `guides` system.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Motion (`motion/react`), TypeScript, `lucide-react`, `@number-flow/react`, `lenis`.

**Verification model (no test runner exists; do NOT add one — YAGNI):** Each task's gate is:
```bash
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
npm run build       # next build (must succeed; note any new routes appear)
```
Plus visual verification: run `npm run dev` and check the affected route(s) at desktop (1280px) and mobile (390px) widths. The `webapp-testing` skill (Playwright) is the tool for screenshots when a step says "verify visually".

**Git note:** This directory is **not** a git repository. Commit steps below are written as optional checkpoints (`# checkpoint`). If you want commit history, run `git init` once before Task 1; otherwise treat each checkpoint as "verification gate passed, move on".

**Content/competitor note:** Where the plan adds copy "informed by competitors", that means matching the *information architecture and topic coverage* typical of licensed Canadian immigration consultancies (credentials/CICC regulation, transparent process, pathway breadth, fresh policy commentary) — written in **original wording**. Do not copy competitor text verbatim. All numbers/bios are clearly-marked placeholders the client can edit.

---

## File Structure

**New files:**
- `components/layout/Section.tsx` — vertical-rhythm section wrapper (light + dark variants, 3 spacing sizes).
- `components/layout/PageHero.tsx` — standardized page-top hero (eyebrow + h1 + lede).
- `content/blog.ts` — blog post data model + 4 static posts.
- `content/team.ts` — team member data model + placeholder bios.
- `app/(marketing)/blog/page.tsx` — blog index.
- `app/(marketing)/blog/[slug]/page.tsx` — blog post detail.
- `app/(marketing)/blog/[slug]/opengraph-image.tsx` — per-post OG image.
- `app/(marketing)/team/page.tsx` — team page.

**Modified files:**
- `app/globals.css` — crimson palette tokens + 3 new fluid type utilities.
- `app/manifest.ts`, `app/opengraph-image.tsx`, `app/(marketing)/services/[slug]/opengraph-image.tsx`, `app/(marketing)/guides/[slug]/opengraph-image.tsx` — replace hard-coded `#d81e2c`.
- `components/layout/Nav.tsx`, `components/layout/Footer.tsx` — add Blog + Team links.
- `app/sitemap.ts` — add `/blog`, `/blog/[slug]`, `/team`.
- All marketing pages — adopt `PageHero`/`Section`/type utilities (Task 4).
- `app/page.tsx` / home section components + `app/(marketing)/about/page.tsx` — trust/credential enrichment (Task 12).

---

## Phase A — Design Foundation

### Task 1: Migrate palette to Deep Maple Crimson

The chosen palette: `--color-accent: #b11226`, hover `#8f0e1f`, strong/live `#c41429`, deep `#7c0a12` (unchanged), ink `#ffffff` (unchanged). Four non-CSS files also hard-code the old `#d81e2c` and must change. **Leave `public/favicon.svg` alone** — it is the literal brand mark.

**Files:**
- Modify: `app/globals.css:14-18`
- Modify: `app/manifest.ts`
- Modify: `app/opengraph-image.tsx`
- Modify: `app/(marketing)/services/[slug]/opengraph-image.tsx`
- Modify: `app/(marketing)/guides/[slug]/opengraph-image.tsx`

- [ ] **Step 1: Update the `@theme` accent tokens in `app/globals.css`**

Replace lines 14–18 exactly:
```css
  --color-accent: #d81e2c;          /* maple red — primary brand field */
  --color-accent-hover: #b3121e;    /* deeper red on hover */
  --color-accent-strong: #e11d2a;   /* bright maple — live accent (links, marks) */
  --color-accent-deep: #7c0a12;     /* garnet shadow tone from the leaf, for depth */
  --color-accent-ink: #ffffff;      /* pure white on red fields */
```
with:
```css
  --color-accent: #b11226;          /* deep maple crimson — primary brand field */
  --color-accent-hover: #8f0e1f;    /* darker crimson on hover */
  --color-accent-strong: #c41429;   /* live crimson — links, marks, active bars */
  --color-accent-deep: #7c0a12;     /* garnet shadow tone from the leaf, for depth */
  --color-accent-ink: #ffffff;      /* pure white on crimson fields */
```

- [ ] **Step 2: Find every remaining hard-coded old hex**

Run (PowerShell):
```powershell
Select-String -Path app\manifest.ts,app\opengraph-image.tsx,"app\(marketing)\services\[slug]\opengraph-image.tsx","app\(marketing)\guides\[slug]\opengraph-image.tsx" -Pattern "#d81e2c|#b3121e|#e11d2a"
```
Expected: matches in all four files (the `48x48` mark background and the "Read"/"View" pill background use `#d81e2c`; the eyebrow text uses `#d81e2c`).

- [ ] **Step 3: Replace the hex in those four files**

In each of the four files, replace `#d81e2c` → `#b11226`. (There is no `#b3121e`/`#e11d2a` in the OG files, but if Step 2 surfaced any, map `#b3121e`→`#8f0e1f` and `#e11d2a`→`#c41429`.) Use editor find-replace per file; confirm `app/manifest.ts` `theme_color`/`background_color` (if red) and each OG image's mark + pill now read `#b11226`.

- [ ] **Step 4: Verify nothing old remains (outside build cache + favicon)**

```powershell
Select-String -Path app\*.ts,app\*.tsx,"app\(marketing)\**\*.tsx" -Pattern "#d81e2c|#b3121e|#e11d2a"
```
Expected: **no matches**.

- [ ] **Step 5: Build gate**

```bash
npm run typecheck && npm run build
```
Expected: PASS. Then `npm run dev`, open `/`, confirm buttons, the active-nav underline, section dots, and `::selection` are now the deeper crimson (not bright orange-red).

- [ ] **Step 6: Checkpoint**
```bash
# git add -A && git commit -m "feat: migrate brand red to deep maple crimson (#b11226)"
```

---

### Task 2: Add fluid type + spacing utilities to `app/globals.css`

Today each page hand-codes heading sizes (`md:text-[80px]`, `md:text-[76px]`, `md:text-[72px]`) and ledes (`text-lg md:text-xl`). We replace these with three fluid (`clamp`) utilities so type scales smoothly between mobile and desktop — directly fixing the "typography hierarchy" and part of the "responsive" complaints.

**Files:**
- Modify: `app/globals.css` (inside the existing `@layer utilities { … }` block, after `.scribble-underline`, before the closing `}` at line 131)

- [ ] **Step 1: Add the utilities**

Insert before the closing `}` of `@layer utilities`:
```css
  /* Fluid display type — one scale used by every page hero / section head,
     so headings stay consistent and scale smoothly across breakpoints. */
  .display-hero {
    font-family: var(--font-display);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 0.98;
    font-size: clamp(2.5rem, 1.45rem + 5.2vw, 5rem);   /* 40px → 80px */
  }
  .display-section {
    font-family: var(--font-display);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.0;
    font-size: clamp(1.875rem, 1.2rem + 3.4vw, 3.5rem); /* 30px → 56px */
  }
  .lede {
    font-size: clamp(1.0625rem, 1rem + 0.4vw, 1.25rem); /* 17px → 20px */
    line-height: 1.6;
  }
```

- [ ] **Step 2: Build gate**
```bash
npm run build
```
Expected: PASS (utilities are unused so far; this only confirms valid CSS).

- [ ] **Step 3: Checkpoint** — `# commit "feat: add fluid display/lede type utilities"`

---

### Task 3: Create `Section` and `PageHero` layout primitives

These standardize the two structural patterns repeated (inconsistently) across every page: the page-top hero and the spaced content section.

**Files:**
- Create: `components/layout/Section.tsx`
- Create: `components/layout/PageHero.tsx`

- [ ] **Step 1: Write `components/layout/Section.tsx`**

```tsx
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Space = "sm" | "md" | "lg";

const spacing: Record<Space, string> = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-28",
};

/**
 * Standardized vertical-rhythm section.
 * - Light (default): `container-page` + chosen vertical padding.
 * - Dark: full-bleed dark band with its own inner `container-page`, and the
 *   `data-nav-theme="dark"` hook the nav uses for contrast.
 */
export function Section({
  children,
  space = "md",
  dark = false,
  id,
  className,
}: {
  children: ReactNode;
  space?: Space;
  dark?: boolean;
  id?: string;
  className?: string;
}) {
  if (dark) {
    return (
      <section id={id} className={cn("bg-surface-dark text-bg", className)} data-nav-theme="dark">
        <div className={cn("container-page", spacing[space])}>{children}</div>
      </section>
    );
  }
  return (
    <section id={id} className={cn("container-page", spacing[space], className)}>
      {children}
    </section>
  );
}
```

- [ ] **Step 2: Write `components/layout/PageHero.tsx`**

```tsx
import { type ReactNode } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The standardized top-of-page hero used by every marketing page:
 * mono eyebrow, fluid display h1, optional lede. One rhythm everywhere.
 */
export function PageHero({
  label,
  title,
  lede,
}: {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <section className="container-page pt-16 pb-10 md:pt-28 md:pb-14">
      <Reveal>
        <SectionLabel>{label}</SectionLabel>
      </Reveal>
      <Reveal as="h1" delay={0.05} className="display-hero mt-6 max-w-[20ch]">
        {title}
      </Reveal>
      {lede && (
        <Reveal as="p" delay={0.12} className="lede mt-7 max-w-[60ch] text-ink-muted">
          {lede}
        </Reveal>
      )}
    </section>
  );
}
```

- [ ] **Step 3: Build gate**
```bash
npm run typecheck && npm run build
```
Expected: PASS (components compile, not yet used).

- [ ] **Step 4: Checkpoint** — `# commit "feat: add Section + PageHero layout primitives"`

---

### Task 4: Adopt `PageHero` / `Section` / type utilities across pages + responsive fixes

Convert each marketing page so heroes use `PageHero`, in-page section headings use `.display-section`, ledes use `.lede`, and section wrappers use `Section`. This removes the per-page spacing drift (`pb-4 pt-16` vs `py-16 md:py-24` vs `pt-12 pb-12 md:pt-20`) and the divergent heading sizes.

**Transformation rules (apply to every page):**
1. **Hero** — any opening section of the form
   `<section className="container-page pb-4 pt-16 md:pt-24"> … SectionLabel + h1(display) + p(lede) … </section>`
   (or the `py-16 md:py-24` hero variant on About/Contact) → replace the whole block with a `<PageHero label=… title=… lede=… />`.
2. **In-page heads** — replace inline hero/section heading classes:
   - `font-display text-[44px] font-extrabold leading-[0.98] tracking-tight md:text-[80px]` (and `md:text-[76px]`, `md:text-[72px]`) → `display-hero` (hero only — handled by PageHero).
   - `font-display text-[32px] font-extrabold leading-[1.0] tracking-tight md:text-[48px]` (and `md:text-[56px]`) → `display-section`.
3. **Ledes** — `text-lg text-ink-muted md:text-xl` → `lede text-ink-muted`.
4. **Section wrappers** — `<section className="container-page py-12 md:py-16">` → `<Section space="sm">`; `py-16 md:py-24` → `<Section space="md">`; `py-20 md:py-28` → `<Section space="lg">`. Dark bands `<section className="bg-surface-dark text-bg" data-nav-theme="dark"><div className="container-page py-20 md:py-28">…</div></section>` → `<Section dark space="lg">…</Section>`.
5. **Mobile guardrails** — on every converted page add `min-w-0` to flex/grid children that hold long headings, and confirm no element uses a fixed `md:grid-cols-[…]` without a single-column mobile default (they already do; verify). Ensure `overflow-x` is clean at 390px.

#### Worked example A — `app/(marketing)/services/page.tsx`

- [ ] **Step 1: Replace the hero (lines 19–34)**

Replace:
```tsx
      <section className="container-page pb-4 pt-16 md:pt-24">
        <Reveal>
          <SectionLabel>Services</SectionLabel>
        </Reveal>
        <Reveal
          as="h1"
          delay={0.05}
          className="mt-6 max-w-[20ch] font-display text-[44px] font-extrabold leading-[0.98] tracking-tight md:text-[76px]"
        >
          Every Canadian pathway, handled with care.
        </Reveal>
        <Reveal as="p" delay={0.12} className="mt-6 max-w-[58ch] text-lg text-ink-muted md:text-xl">
          From a first work permit to a complex refused case, our licensed consultants prepare, file, and represent your application — so nothing is left to chance and every detail is in order.
        </Reveal>
      </section>
```
with:
```tsx
      <PageHero
        label="Services"
        title="Every Canadian pathway, handled with care."
        lede="From a first work permit to a complex refused case, our licensed consultants prepare, file, and represent your application — so nothing is left to chance and every detail is in order."
      />
```

- [ ] **Step 2: Convert the section wrappers**

- `<section className="container-page py-12 md:py-20">` (line 36) → `<Section space="md">` … `</Section>` (close at the matching `</section>`).
- The dark band (lines 55–93) `<section className="bg-surface-dark text-bg" data-nav-theme="dark"><div className="container-page py-20 md:py-28">…</div></section>` → `<Section dark space="lg">…</Section>` (drop the inner `<div>`).
- The final CTA `<section className="container-page py-20 md:py-28">` (line 95) → `<Section space="lg">`.
- Replace the dark-band h2 class `font-display text-[36px] font-extrabold leading-[0.98] tracking-tight text-bg md:text-[56px]` → `display-section text-bg`, and the CTA h2 `font-display text-[36px] font-extrabold leading-[0.98] tracking-tight md:text-[56px]` → `display-section`.

- [ ] **Step 3: Update imports**

Add at the top: `import { Section } from "@/components/layout/Section";` and `import { PageHero } from "@/components/layout/PageHero";`. Remove the now-unused `SectionLabel` import **only if** no other usage remains (the `Rule label=…` calls still use it internally, but the page itself imports `SectionLabel` directly — after hero removal check for remaining `<SectionLabel>` in this file; `Rule` is used here so keep `Rule`). Run typecheck to catch unused imports.

#### Worked example B — `app/(marketing)/how-it-works/page.tsx`

- [ ] **Step 4: Replace the hero (lines 68–82)** with:
```tsx
      <PageHero
        label="How it works"
        title="From first assessment to landing in Canada."
        lede="Your immigration journey is one path with six clear stages. You always know where your file stands, what comes next, and who is representing you. Outcomes are decided by IRCC, but the strength of your file is decided here."
      />
```

- [ ] **Step 5: Convert wrappers + heads on this page**
- `<section className="container-page py-12 md:py-16">` (KPI ribbon, line 85) → `<Section space="sm">`.
- `<section id="loop" className="container-page py-12 md:py-20">` (line 106) → `<Section space="md" id="loop">`.
- `<section className="bg-bg"><div className="container-page py-16 md:py-24">…</div></section>` (line 140) → keep as a light `<Section space="md">…</Section>` (drop the redundant `bg-bg` wrapper + inner div).
- `<section className="container-page py-16 md:py-24">` (line 161, "Behind the scenes") → `<Section space="md">`.
- Dark CTA (lines 183–205) → `<Section dark space="lg">…</Section>`.
- Heads: line 112 h2 `…md:text-[56px]` → `display-section`; line 148 h2 `…md:text-[48px]` → `display-section`; line 186 CTA h2 `…md:text-[56px] text-bg` → `display-section text-bg`.
- Add the two imports (Step 3).

#### Remaining pages — apply the same rules

- [ ] **Step 6: Convert each remaining page using rules 1–5 above.** Read each file first, then transform. Known hero strings to replace with `<PageHero>`:
  - `app/(marketing)/guides/page.tsx` — hero lines 20–34 (`pb-4 pt-16 md:pt-24`). Also `display-section` for any h2; wrappers `pb-10 pt-12 md:pb-14 md:pt-16` → `<Section space="sm">` and `pb-20 pt-12 md:pb-28 md:pt-16` → `<Section space="lg">`.
  - `app/(marketing)/about/page.tsx` — hero lines 55–69 (`py-16 md:py-24`); `display-section` on lines 117, 147 h2s; wrappers at 71, 109, 138 per rule 4.
  - `app/(marketing)/contact/page.tsx` — this page is an `<article className="container-page py-16 md:py-24">`, not a `<section>`. Convert the heading block: h1 `…md:text-[80px]` → `display-hero`, lede `text-lg text-ink-muted md:text-xl` → `lede text-ink-muted`. Leave the form grid as-is (it is already responsive); just verify at 390px the two-column `md:grid-cols-[1.2fr_1fr]` collapses to one (it does).
  - `app/(marketing)/services/[slug]/page.tsx`, `app/(marketing)/guides/[slug]/page.tsx` — these detail pages use a `pt-12 pb-12 md:pt-20 md:pb-16` hero with dynamic `{content}`. Do **not** use `PageHero` here (the eyebrow text is dynamic, e.g. `Guide · {industry}`, and there is an extra timeline row). Instead: replace the h1 class `font-display text-[44px] font-extrabold leading-[0.98] tracking-tight md:text-[72px]` → `display-hero`, the lede → `lede text-ink-muted`, each section h2 (`…md:text-[48px]`) → `display-section`, and wrap content sections with `<Section>` per rule 4 where they currently use `container-page py-*`.
  - `app/(marketing)/eligibility/page.tsx`, `app/legal/privacy|terms|disclaimer/page.tsx`, `app/not-found.tsx` — read each, apply rules 1–4 (hero → `PageHero` when it matches the standard eyebrow+h1+lede shape; otherwise just swap heading/lede classes and section wrappers).
  - Home `app/page.tsx` composes section components (`HeroBento`, `LoopDiagram`, etc.). Do **not** restructure the home hero (it is bespoke). Instead, in each home section component under `components/sections/`, replace any `md:text-[48px]`/`md:text-[56px]` section h2 with `display-section` and any `text-lg md:text-xl` intro with `lede`, for visual consistency. Leave bespoke display sizes in `HeroBento` alone.

- [ ] **Step 7: Responsive sweep (the "mobile/responsive" complaint)**

Run `npm run dev`. Using the `webapp-testing` skill, load each route at viewport **390×844** and **1280×900** and check for: horizontal overflow, headings clipping, cramped padding, and tap targets ≥44px. Fix by: adding `break-words`/`min-w-0` to any clipping heading container; ensuring images/mocks use `max-w-full h-auto`; confirming every `md:grid-cols-[…]` has an implicit single-column mobile fallback. Record any page that overflowed and the fix applied.

- [ ] **Step 8: Gate**
```bash
npm run typecheck && npm run lint && npm run build
```
Expected: PASS, no unused-import lint errors. Visually confirm spacing rhythm now matches across `/services`, `/how-it-works`, `/guides`, `/about`, `/contact`.

- [ ] **Step 9: Checkpoint** — `# commit "refactor: standardize spacing, fluid type, and responsive behaviour sitewide"`

---

## Phase B — Navigation & IA

### Task 5: Add Blog + Team to nav, footer, and sitemap

**Files:**
- Modify: `components/layout/Nav.tsx:12-17`
- Modify: `components/layout/Footer.tsx:14-29`
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Add nav links**

In `components/layout/Nav.tsx`, replace the `links` array (lines 12–17):
```tsx
const links = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];
```
with:
```tsx
const links = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];
```
(Five links fit the desktop bar; if it feels tight at ~1024px, the existing `gap-8` can drop to `gap-6` — verify visually.)

- [ ] **Step 2: Add footer links**

In `components/layout/Footer.tsx`, in the **Company** column (lines 14–21) add Team and Blog:
```tsx
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/team", label: "Our consultants" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/guides", label: "Guides" },
      { href: "/blog", label: "Blog" },
    ],
  },
```

- [ ] **Step 3: Sitemap routes**

In `app/sitemap.ts`, add `"/blog"` and `"/team"` to the static `routes` array, and after the `guides.map(...)` spread add a blog spread (the import is added in Task 9). For now add only the two static routes; the `/blog/[slug]` spread is added in Task 9, Step 4.

- [ ] **Step 4: Gate** — `npm run build`. Expected: PASS. (Note: `/blog` and `/team` 404 until Phases C/D land — that is expected at this checkpoint; do not click them yet.)

- [ ] **Step 5: Checkpoint** — `# commit "feat: add Blog + Team to nav, footer, sitemap"`

---

## Phase C — Blog

### Task 6: Blog content model + four static posts

Mirror the `guides.ts` shape but for dated articles. Posts are plain data; the client edits them later.

**Files:**
- Create: `content/blog.ts`

- [ ] **Step 1: Write the model + posts**

```tsx
export type BlogCategory = "Policy & News" | "Pathways" | "Tips" | "Family";

export type BlogSection = { heading: string; body: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  /** Card + meta description. */
  excerpt: string;
  category: BlogCategory;
  /** ISO date, e.g. "2026-05-28". Drives sort order and display. */
  date: string;
  /** Whole minutes, displayed as "6 min read". */
  readingMinutes: number;
  author: string;
  /** One-line standfirst shown under the title on the detail page. */
  standfirst: string;
  /** Body, rendered as sections of heading + paragraphs. */
  sections: BlogSection[];
  status: "live" | "draft";
};

/** Newest first. Keep `date` accurate — it sorts the index and feeds the sitemap. */
export const posts: BlogPost[] = [
  {
    slug: "category-based-express-entry-2026",
    title: "Category-based Express Entry draws: what they change for you",
    excerpt:
      "IRCC keeps running category-based rounds alongside general draws. Here is what that actually means for your odds, in plain English.",
    category: "Policy & News",
    date: "2026-05-28",
    readingMinutes: 6,
    author: "CanPlus Immigration",
    standfirst:
      "Category-based selection lets IRCC invite candidates by occupation or language rather than score alone. Understanding which categories exist — and whether you fall in one — can matter more than a few CRS points.",
    sections: [
      {
        heading: "General draws versus category-based draws",
        body: [
          "In a general Express Entry round, IRCC invites the highest-ranked profiles in the pool regardless of occupation. In a category-based round, it invites candidates who meet a published category — for example strong French-language ability, or experience in a targeted occupation group — often at a lower cut-off score than the general draw.",
          "That second mechanism is the one most applicants overlook. A profile that would wait a long time for a general invitation can be reachable in a category round, provided it genuinely fits the category being drawn.",
        ],
      },
      {
        heading: "How to tell whether a category applies to you",
        body: [
          "Categories are defined by IRCC and can change between years, so the only reliable source is the current official list at the time you enter the pool. The common threads are language (notably French) and work experience in specified National Occupational Classification groups such as healthcare, trades, or STEM.",
          "Fit has to be real and documented. Claiming a category your experience does not support is not a shortcut; it is a refusal risk. The honest question is whether your verifiable history places you inside a drawn category — not whether you can be made to look like it does.",
        ],
      },
      {
        heading: "What we are not telling you",
        body: [
          "No one can tell you a category round will reach your score, or that a given category will run again. Draw patterns shift with policy and labour-market priorities. What an RCIC review can do is confirm which categories your profile honestly qualifies for, and make sure your language results and work-experience documentation are strong enough to be invited when a relevant round comes.",
        ],
      },
    ],
    status: "live",
  },
  {
    slug: "study-permit-documents-people-forget",
    title: "Five documents people forget in a study permit application",
    excerpt:
      "Most study permit refusals come down to evidence, not eligibility. These are the five items applicants most often leave thin.",
    category: "Tips",
    date: "2026-05-12",
    readingMinutes: 5,
    author: "CanPlus Immigration",
    standfirst:
      "A study permit officer is assessing whether you are a genuine student who will respect the terms of your stay. These five evidence gaps are the ones we see sink otherwise-eligible applications.",
    sections: [
      {
        heading: "1. A clear, specific proof-of-funds trail",
        body: [
          "Showing a large balance is not the same as showing where it came from. Officers look for funds that are genuinely available and reasonably explained — tuition plus living costs, with a source that makes sense for your circumstances. A sudden unexplained deposit can do more harm than a smaller, well-documented amount.",
        ],
      },
      {
        heading: "2. A statement of purpose that connects the dots",
        body: [
          "Your study plan should explain why this program, why Canada, and how it fits your path — including your ties and intentions. A generic letter that could belong to anyone is a missed chance to answer the officer's real question about genuineness.",
        ],
      },
      {
        heading: "3. Evidence of ties beyond a single sentence",
        body: [
          "Family, employment prospects, or other commitments that give context to your plans are worth documenting rather than asserting. The aim is a coherent picture, not a thick file.",
        ],
      },
      {
        heading: "4. A complete, consistent academic record",
        body: [
          "Gaps in study or work, or a program that seems a step backward, are not automatically fatal — but unexplained, they invite doubt. Address them directly and consistently across your documents.",
        ],
      },
      {
        heading: "5. Proof your letter of acceptance is current and valid",
        body: [
          "Acceptance from a designated learning institution must be genuine and current, and program details should match everything else you submit. Mismatched dates or programs across documents are an avoidable red flag.",
        ],
      },
    ],
    status: "live",
  },
  {
    slug: "pnp-versus-express-entry",
    title: "When a Provincial Nominee Program beats Express Entry",
    excerpt:
      "A provincial nomination can add 600 CRS points — but a PNP is not always the right move. Here is how to think about the trade-off.",
    category: "Pathways",
    date: "2026-04-22",
    readingMinutes: 7,
    author: "CanPlus Immigration",
    standfirst:
      "Provincial Nominee Programs let a province nominate you for permanent residence based on its own labour needs. For some applicants they are the difference-maker; for others they add cost and tie you to a province. The right call depends on your profile.",
    sections: [
      {
        heading: "What a nomination actually does",
        body: [
          "An enhanced provincial nomination tied to Express Entry adds 600 points to your CRS score, which in practice means a near-certain invitation in a subsequent draw. A base (non-Express-Entry) nomination runs on the province's own timeline instead.",
          "That 600-point boost is why a nomination is so powerful for candidates whose standalone score is unlikely to be invited in a general round.",
        ],
      },
      {
        heading: "The trade-offs people underestimate",
        body: [
          "A PNP usually requires a genuine connection to, and intention to settle in, the nominating province — sometimes a job offer, sometimes prior study or work there. It can add an application stage, fees, and processing time. And it commits you to a province, which matters if your life plans are flexible.",
          "For a candidate with a high CRS score and no geographic preference, going straight through Express Entry can be simpler. For a candidate with a moderate score and a real tie to one province, a PNP can be the only realistic route.",
        ],
      },
      {
        heading: "How we'd frame the decision",
        body: [
          "We start from your honest standalone CRS score and your real ties. If your score is competitive in recent draws, a PNP may be unnecessary complexity. If it is not, we look at which provincial streams your profile genuinely fits, and whether the settlement commitment is one you can make in good faith. We will not steer you into a province you have no intention of living in.",
        ],
      },
    ],
    status: "live",
  },
  {
    slug: "genuine-relationship-spousal-sponsorship",
    title: "What a “genuine relationship” really means in spousal sponsorship",
    excerpt:
      "Almost every spousal refusal turns on one question. Here is what officers are actually looking for — and what they are not.",
    category: "Family",
    date: "2026-04-03",
    readingMinutes: 6,
    author: "CanPlus Immigration",
    standfirst:
      "Spousal sponsorship rests on whether your relationship is genuine and not entered into primarily for immigration. The legal test is simple to state and surprisingly easy to under-evidence.",
    sections: [
      {
        heading: "Coherence beats volume",
        body: [
          "Officers look for a consistent story across the life of your relationship: how you met, how it developed, and how you share a life now. A coherent file where photos, finances, communication, and statements all point the same way is stronger than a thick binder of unconnected documents.",
        ],
      },
      {
        heading: "The gaps that read as doubt",
        body: [
          "Long unexplained periods apart, finances that never mingle, or timelines that do not line up across documents are the things that invite questions. None is automatically fatal — but each needs to be explained honestly rather than hidden.",
        ],
      },
      {
        heading: "What we will and won't claim",
        body: [
          "We cannot manufacture a relationship, and we would not try. What we do is help genuine couples present their relationship accurately and completely, choose between inland and outland for the right reasons, and anticipate the officer's questions so a real relationship is not refused over avoidable documentation gaps.",
        ],
      },
    ],
    status: "live",
  },
];

/** Stable, dependency-free ISO-date formatter for display, e.g. "28 May 2026". */
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}

/** Newest-first list of live posts. */
export function livePosts(): BlogPost[] {
  return posts
    .filter((p) => p.status === "live")
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
```

- [ ] **Step 2: Gate** — `npm run typecheck`. Expected: PASS (pure data module).

- [ ] **Step 3: Checkpoint** — `# commit "feat: add blog content model + 4 starter posts"`

---

### Task 7: Blog index page `/blog`

Model on `guides/page.tsx` + `IndexRow`, but show date + category meta.

**Files:**
- Create: `app/(marketing)/blog/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import { IndexRow } from "@/components/ui/IndexRow";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { BreadcrumbLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { livePosts, formatPostDate } from "@/content/blog";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Plain-English commentary on Canadian immigration: Express Entry draws, study permits, provincial nominee programs, family sponsorship, and policy changes that affect your case.",
  path: "/blog",
});

export default function BlogPage() {
  const all = livePosts();

  return (
    <>
      <PageHero
        label="Blog"
        title="Notes on Canadian immigration, written by the people who do the files."
        lede="Policy changes, pathway breakdowns, and the practical details that decide cases — explained without the jargon and without the false promises."
      />

      <Section space="md">
        <Stagger step={0.06}>
          {all.map((p, i) => (
            <StaggerItem key={p.slug}>
              <IndexRow
                index={i + 1}
                title={p.title}
                sub={`${p.category} · ${formatPostDate(p.date)} · ${p.readingMinutes} min read`}
                href={`/blog/${p.slug}`}
              />
            </StaggerItem>
          ))}
          <div className="rule" aria-hidden />
        </Stagger>
      </Section>

      <BreadcrumbLd
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />
    </>
  );
}
```

- [ ] **Step 2: Gate** — `npm run build`, then `npm run dev` and open `/blog`. Expected: hero + four ruled rows with date/category/reading-time, hover crimson bar. Confirm at 390px the rows wrap cleanly.

- [ ] **Step 3: Checkpoint** — `# commit "feat: add blog index page"`

---

### Task 8: Blog post detail `/blog/[slug]`

Model on `guides/[slug]/page.tsx`: dynamic params, `generateStaticParams`, `generateMetadata`, narrative body via `Prose`, dark CTA, related posts, Article + Breadcrumb JSON-LD.

**Files:**
- Create: `app/(marketing)/blog/[slug]/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { posts, livePosts, formatPostDate } from "@/content/blog";
import { buildMetadata } from "@/lib/seo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { IndexRow } from "@/components/ui/IndexRow";
import { Prose } from "@/components/content/Prose";
import { BreadcrumbLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) return buildMetadata();
  return buildMetadata({
    title: p.title,
    description: p.excerpt,
    path: `/blog/${p.slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();

  const related = livePosts().filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      {/* Hero — dynamic eyebrow, so not PageHero. */}
      <section className="container-page pt-16 pb-10 md:pt-28 md:pb-14">
        <Reveal>
          <SectionLabel>{`${p.category} · ${formatPostDate(p.date)}`}</SectionLabel>
        </Reveal>
        <Reveal as="h1" delay={0.05} className="display-hero mt-6 max-w-[22ch]">
          {p.title}
        </Reveal>
        <Reveal as="p" delay={0.12} className="lede mt-7 max-w-[60ch] text-ink-muted">
          {p.standfirst}
        </Reveal>
        <Reveal delay={0.18} className="mt-8 inline-flex items-center gap-2 text-sm text-ink-muted">
          <Clock3 className="h-4 w-4 text-accent" />
          <span className="eyebrow">{`${p.readingMinutes} min read`}</span>
          <span className="font-display font-bold tracking-tight text-ink">{p.author}</span>
        </Reveal>
      </section>

      {/* Body */}
      <Section space="md">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <div className="hidden md:block" />
          <Reveal delay={0.05}>
            <Prose>
              {p.sections.map((s) => (
                <div key={s.heading}>
                  <h2>{s.heading}</h2>
                  {s.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ))}
            </Prose>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section dark space="lg">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal as="h2" className="display-section text-bg">
            Have a question about your own case?
          </Reveal>
          <Reveal as="p" delay={0.05} className="mt-5 max-w-[42ch] text-base text-bg/70 md:text-lg">
            Book a consultation and an RCIC will give you an honest read on your options and the next step — with no promises about the outcome.
          </Reveal>
          <Reveal delay={0.12}>
            <Button href="/contact" variant="primary" size="lg" className="mt-8">
              Book a consultation <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* Related */}
      <Section space="md">
        <div className="flex items-end justify-between gap-6">
          <Reveal as="h2" className="display-section max-w-[20ch]">
            More from the blog.
          </Reveal>
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong underline-offset-4 hover:underline"
            >
              All posts <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-10">
          {related.map((r, i) => (
            <IndexRow
              key={r.slug}
              index={i + 1}
              title={r.title}
              sub={`${r.category} · ${formatPostDate(r.date)}`}
              href={`/blog/${r.slug}`}
            />
          ))}
          <div className="rule" aria-hidden />
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.date,
            author: { "@type": "Organization", name: "CanPlus Immigration" },
          }),
        }}
      />
      <BreadcrumbLd
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: p.title, href: `/blog/${p.slug}` },
        ]}
      />
    </>
  );
}
```

- [ ] **Step 2: Gate** — `npm run typecheck && npm run build`. Expected: build lists `/blog/[slug]` as SSG with 4 paths. Open each post in `npm run dev`; confirm body renders multi-paragraph sections, related rows exclude the current post, dark CTA uses crimson button.

- [ ] **Step 3: Checkpoint** — `# commit "feat: add blog post detail page"`

---

### Task 9: Blog OG image + sitemap wiring

**Files:**
- Create: `app/(marketing)/blog/[slug]/opengraph-image.tsx`
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Write the OG image** (adapted from the guides OG image, crimson `#b11226`, blog meta)

```tsx
import { ImageResponse } from "next/og";
import { posts, formatPostDate } from "@/content/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  const category = p?.category ?? "Blog";
  const title = p?.title ?? "Notes on Canadian immigration.";
  const date = p ? formatPostDate(p.date) : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fcfcfb",
          padding: "72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
          color: "#121110",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: "#b11226",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 200 200">
              <path
                d="M100 36 l8 26 22-14-8 24 26-3-17 19 22 9-24 6 9 22-22-9-2 26-14-19-14 19-2-26-22 9 9-22-24-6 22-9-17-19 26 3-8-24 22 14z"
                fill="#ffffff"
              />
            </svg>
          </div>
          <div style={{ fontSize: 24, color: "#121110", fontWeight: 700, letterSpacing: "-0.01em" }}>
            CanPlus Immigration
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              color: "#b11226",
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize: 66,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              fontWeight: 800,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            fontFamily: "monospace",
            letterSpacing: "0.06em",
            color: "#6b6862",
          }}
        >
          <span>{date}</span>
          <span
            style={{
              background: "#b11226",
              color: "#ffffff",
              padding: "12px 20px",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Read the post
          </span>
        </div>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 2: Add the blog spread to `app/sitemap.ts`**

Add the import near the others: `import { posts } from "@/content/blog";`. After the `guides.map(...)` spread, add:
```tsx
    ...posts.map((p) => ({
      url: new URL(`/blog/${p.slug}`, SITE_URL).toString(),
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
```

- [ ] **Step 3: Gate** — `npm run build`. Expected: PASS; build shows `/blog/[slug]/opengraph-image` SSG paths. Open `http://localhost:3000/blog/category-based-express-entry-2026/opengraph-image` in dev and confirm a crimson-marked 1200×630 card renders.

- [ ] **Step 4: Checkpoint** — `# commit "feat: blog OG images + sitemap entries"`

---

## Phase D — Team

### Task 10: Team content + `/team` page

**Files:**
- Create: `content/team.ts`
- Create: `app/(marketing)/team/page.tsx`
- Modify: `app/sitemap.ts` (already added `/team` in Task 5)

- [ ] **Step 1: Write `content/team.ts`** (clearly-marked placeholder bios)

```tsx
export type TeamMember = {
  name: string;
  /** e.g. "Regulated Canadian Immigration Consultant (RCIC)". */
  title: string;
  /** Public RCIC registration number, or "" until provided. PLACEHOLDER. */
  licenseNo: string;
  /** Two short paragraphs. PLACEHOLDER copy — client to replace. */
  bio: string[];
  /** Initials for the avatar tile. */
  initials: string;
  /** Areas of focus shown as small tags. */
  focus: string[];
};

/** PLACEHOLDER team — names, numbers, and bios are illustrative; client to edit. */
export const team: TeamMember[] = [
  {
    name: "A. Consultant",
    title: "Regulated Canadian Immigration Consultant (RCIC)",
    licenseNo: "RXXXXXXX",
    initials: "AC",
    focus: ["Express Entry", "Provincial Nominee", "Work permits"],
    bio: [
      "Lead consultant at CanPlus Immigration and a Regulated Canadian Immigration Consultant in good standing with the College of Immigration and Citizenship Consultants. Over a decade advising clients across economic and family streams.",
      "Known for honest, plain-English assessments and meticulously prepared files — the belief that a well-advised applicant with a complete file always stands a better chance than a strong candidate going it alone.",
    ],
  },
  {
    name: "B. Consultant",
    title: "Regulated Canadian Immigration Consultant (RCIC)",
    licenseNo: "RXXXXXXX",
    initials: "BC",
    focus: ["Spousal sponsorship", "Study permits", "Super Visa"],
    bio: [
      "Family-class and temporary-residence specialist. Works closely with couples and students to build coherent, well-evidenced applications that answer the officer's real questions.",
      "Committed to clients understanding every step of their own case, with no false promises about outcomes that rest with IRCC.",
    ],
  },
  {
    name: "C. Consultant",
    title: "Case Manager & Document Specialist",
    licenseNo: "",
    initials: "CC",
    focus: ["Document review", "Refusals", "TRP & inadmissibility"],
    bio: [
      "Manages complex and previously-refused files, with a focus on diagnosing the real reason behind a refusal before choosing the next step.",
      "Keeps every file inspection-ready: forms cross-checked for consistency and supporting documents organised the way an officer expects to read them.",
    ],
  },
];
```

- [ ] **Step 2: Write `app/(marketing)/team/page.tsx`**

```tsx
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { BreadcrumbLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { team } from "@/content/team";
import { ArrowRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "Our consultants",
  description:
    "Meet the licensed team behind CanPlus Immigration — Regulated Canadian Immigration Consultants (RCIC) accountable to the CICC.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        label="Our consultants"
        title="The licensed people behind your file."
        lede="CanPlus Immigration is led by Regulated Canadian Immigration Consultants in good standing with the College of Immigration and Citizenship Consultants. You always know who is representing you, and to whom they answer."
      />

      <Section space="md">
        <Stagger step={0.08}>
          {team.map((m) => (
            <StaggerItem key={m.name}>
              <article className="grid gap-6 border-t border-line py-10 md:grid-cols-[7rem_1fr] md:gap-10 md:py-12">
                <div
                  aria-hidden
                  className="grid h-20 w-20 place-items-center rounded-[4px] bg-surface-dark font-display text-2xl font-bold text-bg"
                >
                  {m.initials}
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-[26px] font-bold leading-tight tracking-tight text-ink md:text-[32px]">
                    {m.name}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    {m.title}
                    {m.licenseNo ? ` · ${m.licenseNo}` : ""}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {m.focus.map((f) => (
                      <span key={f} className="eyebrow rounded-full border border-line px-3 py-1">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 max-w-[64ch] space-y-3 text-[15px] leading-relaxed text-ink-soft">
                    {m.bio.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
          <div className="rule" aria-hidden />
        </Stagger>
      </Section>

      <Section dark space="lg">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal as="h2" className="display-section text-bg">
            Talk to a licensed consultant.
          </Reveal>
          <Reveal as="p" delay={0.05} className="mt-5 max-w-[42ch] text-base text-bg/70 md:text-lg">
            Book a free consultation and we&apos;ll give you an honest read on your options — no pressure, no false promises.
          </Reveal>
          <Reveal delay={0.12}>
            <Button href="/contact" variant="primary" size="lg" className="mt-8">
              Book a consultation <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </Section>

      <BreadcrumbLd
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Our consultants", href: "/team" },
        ]}
      />
    </>
  );
}
```

- [ ] **Step 3: Gate** — `npm run typecheck && npm run build`, then `npm run dev` → `/team`. Confirm three member rows render, focus tags wrap on mobile, avatar tiles align. Confirm the footer "Our consultants" link now resolves.

- [ ] **Step 4: Checkpoint** — `# commit "feat: add team page + placeholder consultant bios"`

---

## Phase E — Content Enrichment & Final Verification

### Task 11: Trust/credential enrichment (competitor-informed, original copy)

Competitor consultancy sites lead with regulatory credibility and a transparent "what you get" promise. The site already states RCIC/CICC regulation in places; this task makes it a consistent, prominent trust layer. **Original wording only.**

**Files:**
- Modify: `app/(marketing)/about/page.tsx` (add a credentials strip)
- Modify: `components/layout/Footer.tsx` (already shows "Regulated by the CICC" — verify, no change unless missing)

- [ ] **Step 1: Add a credentials strip to About**

In `app/(marketing)/about/page.tsx`, immediately after the intro `<section>` (closes at line 107, the one ending `</section>` after the two-column grid) and before the `bg-bg` Principles section, insert a new `Section` (import `Section` at top if converting per Task 4, else use a `container-page` section):
```tsx
      <Section space="sm">
        <Stagger className="grid gap-px overflow-hidden rounded-[4px] bg-line md:grid-cols-3" step={0.06}>
          {[
            { k: "Regulated", v: "Led by an RCIC accountable to the College of Immigration and Citizenship Consultants (CICC)." },
            { k: "On the record", v: "Formal representation under a signed retainer — you always know who acts for you." },
            { k: "Insured", v: "RCICs carry mandatory professional insurance and follow a binding code of conduct." },
          ].map((c) => (
            <StaggerItem key={c.k} className="bg-card p-6 md:p-8">
              <p className="eyebrow eyebrow-accent">{c.k}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{c.v}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
```
(`Stagger`/`StaggerItem` are already imported on this page; `StaggerItem` accepts a `className` per `components/motion/Reveal.tsx`.)

- [ ] **Step 2: Gate** — `npm run typecheck && npm run build`. Visually confirm the three-up credentials strip on `/about` collapses to a single column on mobile and uses crimson eyebrows.

- [ ] **Step 3: Checkpoint** — `# commit "feat: add credentials/trust strip to About"`

---

### Task 12: Full verification pass

- [ ] **Step 1: Static gates**
```bash
npm run typecheck && npm run lint && npm run build
```
Expected: all PASS. In the build route table confirm these new routes exist: `/blog`, `/blog/[slug]` (4 paths), `/blog/[slug]/opengraph-image`, `/team`. Confirm `/sitemap.xml` includes `/blog`, the 4 posts, and `/team`.

- [ ] **Step 2: Crimson audit**
```powershell
Select-String -Path app\*.ts,app\*.tsx,"app\(marketing)\**\*.tsx" -Pattern "#d81e2c|#e11d2a|#b3121e"
```
Expected: **no matches** (favicon.svg is intentionally untouched and not in this glob).

- [ ] **Step 3: Visual + responsive sweep (webapp-testing)**

Run `npm run dev`. For each route — `/`, `/services`, `/services/work-permits`, `/how-it-works`, `/guides`, `/guides/express-entry`, `/blog`, `/blog/category-based-express-entry-2026`, `/team`, `/about`, `/contact`, `/eligibility` — capture screenshots at **390px** and **1280px**. Confirm:
  - Consistent hero rhythm and section spacing across pages.
  - No horizontal overflow; no clipped headings; tap targets ≥44px.
  - Nav shows Services · How it works · Guides · Blog · About and fits without wrapping at ≥1024px.
  - All buttons/active markers/eyebrow dots render in deep crimson, not bright red.

Record any defect + the fix applied; re-run the relevant gate after fixing.

- [ ] **Step 4: Final checkpoint** — `# commit "chore: verify pages, formatting, blog, team, crimson palette"`

---

## Self-Review

**Spec coverage:**
- "design revamp / shade of red darker, like the logo's deep section with cooler tone" → Task 1 (Deep Maple Crimson `#b11226`, the user-selected option) + all hard-coded hex.
- "proper pages that might be in this website" + "blog page (static)" + selected **Team** page → Tasks 6–10.
- "formatting of the whole website needs to be fixed" (spacing & rhythm, mobile/responsive, typography hierarchy — the three selected) → Tasks 2–4 (+ responsive sweep in 4/12).
- "proper better website information using competitor info (changeable later)" → Task 11 (trust/credentials) + the four authoritative blog posts + placeholder Team bios, all original and editable.

**Placeholder scan:** New files contain complete code and complete copy. Team bios/licence numbers are intentionally labelled `PLACEHOLDER` per the user's "changeable later" instruction — this is data the client must own, not a plan gap.

**Type consistency:** `Section` prop `space: "sm"|"md"|"lg"` and `dark` are used identically everywhere. `PageHero` props `label/title/lede` are consistent. Blog helpers `livePosts()`, `formatPostDate(iso)`, and the `BlogPost` fields (`slug,title,excerpt,category,date,readingMinutes,author,standfirst,sections,status`) match across index, detail, OG image, and sitemap. `StaggerItem` `className` prop is confirmed present in `components/motion/Reveal.tsx`.

**Known follow-ups (out of scope, flagged):** the ~5.2s `LoadingScreen` intro was **not** selected as a formatting concern, so it is left unchanged; the existing brand memory's go-live caveat still applies if the client later reports it feels long.
