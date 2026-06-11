import Image from "next/image";
import { Rule } from "@/components/ui/Rule";
import { Button } from "@/components/ui/Button";
import { IndexRow } from "@/components/ui/IndexRow";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { services } from "@/content/services";
import { BreadcrumbLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Licensed Canadian immigration services: work and study permits, visitor and Super Visa, permanent residence, citizenship, and complex or refused cases.",
  path: "/services",
});

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Every Canadian pathway, handled with care."
        lede="From a first work permit to a complex refused case, our licensed consultants prepare, file, and represent your application — so nothing is left to chance and every detail is in order."
      />

      <div className="container-page pb-4">
        <Reveal y={0} className="relative aspect-[16/9] w-full overflow-hidden rounded-[4px] bg-surface-dark md:aspect-[21/8]">
          <Image
            src="/images/airport-arrival.jpg"
            alt="A bright, modern airport arrivals terminal with travellers."
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        </Reveal>
      </div>

      <Section space="md">
        <Reveal>
          <Rule label="All services" />
        </Reveal>
        <div className="mt-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i * 0.04, 0.2)}>
              <IndexRow
                index={i + 1}
                title={s.name}
                sub={s.tagline}
                href={`/services/${s.slug}`}
              />
            </Reveal>
          ))}
          <div className="rule" aria-hidden />
        </div>
      </Section>

      <Section dark space="lg">
          <Reveal>
            <Rule label="Why CanPlus" dark />
          </Reveal>
          <Reveal
            as="h2"
            delay={0.05}
            className="mt-8 max-w-[22ch] display-section text-bg break-words"
          >
            Licensed representation, end to end.
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-6 max-w-[58ch] text-base text-bg/70 md:text-lg">
            Immigration is won on preparation. We assess your eligibility honestly, build the strongest possible file, manage every IRCC deadline, and represent you through to a decision — with one accountable consultant from start to finish.
          </Reveal>

          <Stagger className="mt-12 border-t border-line-dark md:mt-16" step={0.07}>
            {[
              { k: "Licensed", v: "RCIC-led files, regulated by the CICC. Your representative is accountable, on record." },
              { k: "Honest", v: "We tell you where you stand before you commit — no false promises, ever." },
              { k: "End to end", v: "From eligibility to landing, one team handles forms, evidence, and deadlines." },
            ].map((item, i) => (
              <StaggerItem key={item.k}>
                <div className="grid gap-4 border-b border-line-dark py-8 md:grid-cols-[1fr_2fr] md:gap-12">
                  <div className="flex items-baseline gap-4">
                    <span className="index-num tabular text-sm text-bg/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-display text-[28px] font-bold leading-tight tracking-tight text-bg md:text-[34px]">
                      {item.k}
                    </p>
                  </div>
                  <p className="max-w-[48ch] text-[15px] text-bg/65 md:text-base">{item.v}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
      </Section>

      <Section space="lg">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal
            as="h2"
            className="display-section break-words"
          >
            Not sure which pathway is yours?
          </Reveal>
          <Reveal as="p" delay={0.05} className="mt-5 max-w-[42ch] text-base text-ink-muted md:text-lg">
            Start with a free eligibility assessment, or book a consultation and we&apos;ll map your best route to Canada in 30 minutes.
          </Reveal>
          <Reveal delay={0.12} className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="primary" size="lg">
              Book a consultation
            </Button>
            <Button href="/eligibility" variant="outline" size="lg">
              Free assessment
            </Button>
          </Reveal>
        </div>
      </Section>

      <BreadcrumbLd
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />
    </>
  );
}
