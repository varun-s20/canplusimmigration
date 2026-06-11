import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { guides } from "@/content/guides";
import { buildMetadata } from "@/lib/seo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { IndexRow } from "@/components/ui/IndexRow";
import { Button } from "@/components/ui/Button";
import { KPIRow } from "@/components/content/KPIRow";
import { Quote } from "@/components/content/Quote";
import { StepList } from "@/components/content/StepList";
import { Prose } from "@/components/content/Prose";
import { BreadcrumbLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";

type Params = { slug: string };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) return buildMetadata();
  return buildMetadata({
    title: `${g.industry}, ${g.outcome}`,
    description: g.subhead,
    path: `/guides/${g.slug}`,
  });
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) notFound();

  const related = guides.filter((x) => x.slug !== g.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="container-page pt-12 pb-12 md:pt-20 md:pb-16">
        <Reveal>
          <SectionLabel>Guide · {g.industry}</SectionLabel>
        </Reveal>
        <Reveal
          as="h1"
          delay={0.05}
          className="mt-6 max-w-[20ch] display-hero break-words"
        >
          {g.outcome}
        </Reveal>
        <Reveal as="p" delay={0.12} className="mt-7 max-w-[58ch] lede text-ink-muted">
          {g.subhead}
        </Reveal>

        <Reveal delay={0.18} className="mt-8 inline-flex items-center gap-2 text-sm text-ink-muted">
          <Clock3 className="h-4 w-4 text-accent" />
          <span className="eyebrow">Typical timeline</span>
          <span className="font-display font-bold tracking-tight text-ink">{g.timeToShip}</span>
        </Reveal>
      </section>

      {/* KPI strip */}
      <section className="container-page pb-12 md:pb-16">
        <Reveal>
          <KPIRow items={g.results} tone="dark" />
        </Reveal>
      </section>

      {/* What this covers */}
      <section className="container-page pb-16 md:pb-24">
        <Reveal><SectionLabel>What this covers</SectionLabel></Reveal>
        <Reveal
          as="h2"
          delay={0.05}
          className="mt-6 max-w-[24ch] display-section break-words"
        >
          The parts that actually decide your case.
        </Reveal>
        <div className="mt-10 md:mt-12">
          {g.stack.map((s, i) => (
            <div
              key={s.name}
              className="grid gap-2 border-t border-line py-7 md:grid-cols-[6rem_1fr_1.4fr] md:gap-10 md:py-8"
            >
              <span className="index-num text-base">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-display text-xl font-bold leading-tight tracking-tight text-ink md:text-[24px]">
                {s.name}
              </p>
              <p className="text-[15px] leading-relaxed text-ink-muted">{s.role}</p>
            </div>
          ))}
          <div className="rule" aria-hidden />
        </div>
      </section>

      {/* Intro narrative */}
      <section className="container-page pb-16 md:pb-20">
        <Reveal>
          <Rule label="Who this is for" />
        </Reveal>
        <div className="grid gap-10 pt-12 md:grid-cols-[1fr_1.6fr] md:gap-16 md:pt-16">
          <div />
          <Reveal delay={0.05}>
            <Prose>
              <p className="text-[19px] leading-[1.6] text-ink/85 md:text-[20px]">{g.intro}</p>
            </Prose>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <Section space="md">
          <Reveal><SectionLabel>The steps</SectionLabel></Reveal>
          <Reveal
            as="h2"
            delay={0.05}
            className="mt-6 max-w-[22ch] display-section break-words"
          >
            What to get right, and in what order.
          </Reveal>
          <Reveal delay={0.1} className="mt-10 md:mt-12">
            <StepList steps={g.steps} />
          </Reveal>
      </Section>

      {/* Quote */}
      <section className="container-page py-16 md:py-24">
        <Reveal>
          <Quote {...g.testimonial} className="mx-auto max-w-3xl" />
        </Reveal>
      </section>

      {/* Long-form sections */}
      <section className="container-page pb-16 md:pb-24">
        <Reveal>
          <Rule label="In depth" />
        </Reveal>
        <div className="grid gap-10 pt-12 md:grid-cols-[1fr_1.6fr] md:gap-16 md:pt-16">
          <div />
          <Reveal delay={0.05}>
            <Prose>
              {g.sections.map((s) => (
                <div key={s.heading}>
                  <h2>{s.heading}</h2>
                  <p>{s.body}</p>
                </div>
              ))}
            </Prose>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <Section dark space="lg">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Reveal as="h2" className="display-section text-bg break-words">
              Talk through your own case.
            </Reveal>
            <Reveal as="p" delay={0.05} className="mt-5 max-w-[42ch] text-base text-bg/70 md:text-lg">
              Book a consultation and an RCIC will review your situation, explain your realistic options, and outline the next steps, with no promises about the outcome.
            </Reveal>
            <Reveal delay={0.12}>
              <Button href="/contact" variant="primary" size="lg" className="mt-8">
                Book a consultation <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
      </Section>

      {/* Related guides */}
      <Section space="md">
        <div className="flex items-end justify-between gap-6">
          <Reveal as="h2" className="max-w-[20ch] display-section break-words">
            Other guides.
          </Reveal>
          <Reveal>
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong underline-offset-4 hover:underline"
            >
              See all guides <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-10">
          {related.map((r, i) => (
            <IndexRow
              key={r.slug}
              index={i + 1}
              title={r.outcome}
              sub={r.industry}
              href={`/guides/${r.slug}`}
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
            "@type": "Article",
            headline: `${g.industry}, ${g.outcome}`,
            description: g.subhead,
            author: { "@type": "Organization", name: "CanPlus Immigration" },
          }),
        }}
      />
      <BreadcrumbLd
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: g.industry, href: `/guides/${g.slug}` },
        ]}
      />
    </>
  );
}
