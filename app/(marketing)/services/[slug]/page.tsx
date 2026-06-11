import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { Button } from "@/components/ui/Button";
import { IndexRow } from "@/components/ui/IndexRow";
import { KPIRow } from "@/components/content/KPIRow";
import { FAQ } from "@/components/content/FAQ";
import { BreadcrumbLd, FAQPageLd } from "@/components/seo/JsonLd";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { ServiceVisual } from "@/components/product-mocks/ServiceVisual";
import { SITE_NAME } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return buildMetadata();
  return buildMetadata({
    title: `${service.name}, ${service.tagline}`,
    description: service.blurb,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      {/* Hero */}
      <section className="container-page pb-12 pt-12 md:pb-16 md:pt-20">
        <Reveal>
          <SectionLabel>{service.name}</SectionLabel>
        </Reveal>
        <Reveal
          as="h1"
          delay={0.05}
          className="mt-6 max-w-[18ch] display-hero break-words"
        >
          {service.tagline}
        </Reveal>
        <Reveal as="p" delay={0.12} className="mt-6 max-w-[58ch] lede text-ink-muted">
          {service.blurb}
        </Reveal>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[1.2fr_1fr] md:gap-12">
          <Reveal delay={0.18}>
            <ServiceVisual name={service.name} />
          </Reveal>

          <Reveal delay={0.22} className="flex flex-col justify-center">
            <Rule label="What you get" />
            <ul className="mt-2">
              {service.capabilities.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 border-b border-line py-3.5 text-[15px] text-ink-soft"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" variant="primary">
                Book a free consultation <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/eligibility" variant="outline">
                Free assessment
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* KPI strip */}
      <section className="container-page pb-12 md:pb-16">
        <Reveal>
          <KPIRow items={service.kpis} />
        </Reveal>
      </section>

      {/* Deep feature blocks — ruled two-column rows */}
      <section className="container-page pb-16 md:pb-24">
        <Reveal>
          <Rule label="How it works" />
        </Reveal>
        <div>
          {service.blocks.map((b, i) => (
            <Reveal key={b.title}>
              <article className="grid gap-6 border-b border-line py-10 md:grid-cols-[1fr_1.6fr] md:gap-12 md:py-14">
                <div className="flex items-baseline gap-4">
                  <span className="index-num tabular text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[26px] font-bold leading-[1.0] tracking-tight md:text-[38px]">
                    {b.title}
                  </h3>
                </div>
                <div>
                  <p className="max-w-[52ch] text-[15px] text-ink-muted md:text-base">{b.body}</p>
                  <ul className="mt-6">
                    {b.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 border-t border-line py-3 text-[14.5px] text-ink-soft"
                      >
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Programs & pathways — ink section with squared mono pills */}
      <Section dark space="md">
          <Reveal>
            <Rule label="Programs & pathways" dark />
          </Reveal>
          <Reveal
            as="h2"
            delay={0.05}
            className="mt-8 max-w-[22ch] display-section text-bg break-words"
          >
            The streams and programs this service works across.
          </Reveal>
          <Stagger className="mt-10 flex flex-wrap gap-2 md:mt-12" step={0.03}>
            {service.integrations.map((name) => (
              <StaggerItem key={name}>
                <span className="inline-flex items-center rounded-[3px] border border-line-dark px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-bg/85">
                  {name}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
      </Section>

      {/* Best for */}
      <Section space="md">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div className="min-w-0">
            <Reveal>
              <SectionLabel>Best for</SectionLabel>
            </Reveal>
            <Reveal
              as="h2"
              delay={0.05}
              className="mt-6 display-section break-words"
            >
              Where {service.name} earns its keep.
            </Reveal>
          </div>
          <Stagger className="border-t border-line">
            {service.bestFor.map((b, i) => (
              <StaggerItem key={b}>
                <div className="flex items-baseline gap-5 border-b border-line py-5">
                  <span className="index-num tabular w-8 flex-shrink-0 text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-[18px] font-bold leading-tight tracking-tight text-ink md:text-[22px]">
                    {b}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* FAQ */}
      <Section space="md">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <div className="min-w-0">
            <Reveal>
              <SectionLabel>FAQ</SectionLabel>
            </Reveal>
            <Reveal
              as="h2"
              delay={0.05}
              className="mt-6 max-w-[18ch] display-section break-words"
            >
              The honest answers to the things people always ask.
            </Reveal>
            <Reveal as="p" delay={0.12} className="mt-4 text-[15px] text-ink-muted">
              Anything else? Drop a line at{" "}
              <Link
                href="/contact"
                className="font-medium text-accent-strong underline underline-offset-4 decoration-accent-strong/40 hover:decoration-accent-strong"
              >
                contact
              </Link>{" "}
              , a human reads them.
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <FAQ items={service.faq} />
          </Reveal>
        </div>
      </Section>

      {/* Related services */}
      <Section space="md">
          <div className="flex items-end justify-between gap-6">
            <Reveal
              as="h2"
              className="max-w-[20ch] display-section break-words"
            >
              Explore our other services.
            </Reveal>
            <Reveal>
              <Button href="/eligibility" variant="link">
                Free assessment
              </Button>
            </Reveal>
          </div>
          <div className="mt-10">
            {others.map((o, i) => (
              <IndexRow
                key={o.slug}
                index={i + 1}
                title={o.name}
                sub={o.tagline}
                href={`/services/${o.slug}`}
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
            "@type": "Product",
            name: service.name,
            description: service.blurb,
            brand: { "@type": "Brand", name: SITE_NAME },
          }),
        }}
      />
      <FAQPageLd items={service.faq} />
      <BreadcrumbLd
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/#services" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
      />
    </>
  );
}
