import Image from "next/image";
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

      <div className="container-page pb-4">
        <Reveal y={0} className="relative aspect-[16/9] w-full overflow-hidden rounded-[4px] bg-surface-dark md:aspect-[21/8]">
          <Image
            src="/images/consultation.jpg"
            alt="Two consultants discussing a case across a desk in a modern office."
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
        </Reveal>
      </div>

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
