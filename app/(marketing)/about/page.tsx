import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { FAQ } from "@/components/content/FAQ";
import { BreadcrumbLd, FAQPageLd } from "@/components/seo/JsonLd";
import { Prose } from "@/components/content/Prose";
import { ArrowRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "About",
  description:
    "CanPlus Immigration is a Canadian consultancy led by a Regulated Canadian Immigration Consultant (RCIC), regulated by the CICC. Your Canadian future, expertly guided.",
  path: "/about",
});

const principles = [
  {
    title: "Honest assessments, always.",
    body: "We tell you what we genuinely see in your file, including when a pathway isn't realistic yet. A clear no today saves you money, time, and heartbreak tomorrow.",
  },
  {
    title: "Meticulous files win cases.",
    body: "Immigration is decided on the strength of the paperwork. We prepare every application as if an officer will scrutinise each page, because they will.",
  },
  {
    title: "Accountable and regulated.",
    body: "We are a Regulated Canadian Immigration Consultant practice, accountable to the College of Immigration and Citizenship Consultants. You always know who is representing you and to whom they answer.",
  },
];

const aboutFaq = [
  {
    q: "Are you licensed to represent me?",
    a: "Yes. Our practice is led by a Regulated Canadian Immigration Consultant (RCIC) in good standing with the College of Immigration and Citizenship Consultants (CICC), the federal regulator for the profession. Formal representation begins once you sign a retainer agreement with us.",
  },
  {
    q: "What is an RCIC?",
    a: "A Regulated Canadian Immigration Consultant is a licensed professional authorised to advise on and represent clients in Canadian immigration matters. RCICs are bound by a code of professional conduct, carry mandatory insurance, and are subject to oversight and discipline by the CICC.",
  },
  {
    q: "Can you guarantee my application will be approved?",
    a: "No one can, and you should be cautious of anyone who says otherwise. Final decisions rest entirely with Immigration, Refugees and Citizenship Canada (IRCC). What we can do is give you an honest read on your chances and prepare the strongest, most complete file possible to maximise them.",
  },
  {
    q: "What happens after I contact you?",
    a: "We start with a free consultation to understand your goals and circumstances. If there's a realistic pathway, we'll outline it, explain the process and timelines, and set out our fees in writing. There's no obligation, and we'll be straight with you about whether we're the right fit.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="A licensed Canadian immigration practice built on straight answers."
        lede="CanPlus Immigration is led by a Regulated Canadian Immigration Consultant (RCIC), regulated by the CICC. Your Canadian future, expertly guided."
      />

      <section className="container-page pb-16 md:pb-24">
        <Reveal>
          <Rule />
        </Reveal>
        <div className="grid gap-12 pt-12 md:grid-cols-[1fr_1fr] md:gap-16 md:pt-16">
          <Reveal>
            <Prose>
              <p>
                CanPlus Immigration is a Canadian consultancy that helps people study, work, settle, and reunite with family in Canada. Our practice is led by a Regulated Canadian Immigration Consultant (RCIC) in good standing with the College of Immigration and Citizenship Consultants, the federal regulator for the profession.
              </p>
              <p>
                We are not a visa mill or an offshore agent. We are a small, accountable team that handles every file with care, from a first work permit to a complex refused case. Over more than a decade of practice we have guided clients across eight immigration streams, and we treat each application as the life-changing decision it is.
              </p>
              <p>
                If you have been promised the world by someone who has never met you, we offer the opposite: an honest read on your situation, a clear plan, and a meticulously prepared file.
              </p>
            </Prose>
          </Reveal>

          <div className="space-y-10">
            <Reveal y={0}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-surface-dark">
                <Image
                  src="/images/toronto-skyline.jpg"
                  alt="Toronto skyline at sunset, with the CN Tower above Lake Ontario."
                  fill
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal>
              <div>
                <SectionLabel>Our thesis</SectionLabel>
                <p className="mt-5 font-display text-2xl font-bold leading-[1.1] tracking-tight text-ink md:text-[30px]">
                  A well-advised applicant with a meticulously prepared file always stands a better chance than a strong candidate going it alone.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Button href="/contact" variant="dark" size="lg">
                Talk to the team <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

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

      <Section space="md">
          <Reveal>
            <SectionLabel>Principles</SectionLabel>
          </Reveal>
          <Reveal
            as="h2"
            delay={0.05}
            className="mt-6 max-w-[24ch] display-section break-words"
          >
            The values behind every file we touch.
          </Reveal>
          <Stagger className="mt-12 md:mt-16" step={0.08}>
            {principles.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="grid gap-4 border-t border-line py-8 md:grid-cols-[6rem_1fr_1.4fr] md:gap-10 md:py-10">
                  <span className="index-num text-base">{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-display text-xl font-bold leading-tight tracking-tight text-ink md:text-[24px]">
                    {p.title}
                  </p>
                  <p className="text-[15px] leading-relaxed text-ink-muted">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
            <div className="rule" aria-hidden />
          </Stagger>
      </Section>

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
              The honest version of who we are.
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <FAQ items={aboutFaq} />
          </Reveal>
        </div>
      </Section>

      <FAQPageLd items={aboutFaq} />
      <BreadcrumbLd
        crumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
    </>
  );
}
