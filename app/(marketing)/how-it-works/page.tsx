import Link from "next/link";
import {
  ClipboardCheck,
  Route,
  FileText,
  Send,
  Clock,
  PlaneLanding,
  ArrowRight,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { StepList } from "@/components/content/StepList";
import { Prose } from "@/components/content/Prose";
import { BreadcrumbLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "How it works",
  description:
    "From a free eligibility assessment to landing in Canada, here is exactly how we guide your immigration journey, step by step.",
  path: "/how-it-works",
});

const loopNodes = [
  { icon: ClipboardCheck, label: "Free assessment", body: "We review your profile and confirm whether a realistic pathway exists." },
  { icon: Route, label: "Strategy & pathway", body: "We map the right stream and a clear plan, with timelines and costs in writing." },
  { icon: FileText, label: "Document preparation", body: "We build a meticulous, complete file and review every form and supporting document." },
  { icon: Send, label: "Filed with IRCC", body: "Your application is submitted to Immigration, Refugees and Citizenship Canada." },
  { icon: Clock, label: "IRCC processing", body: "We track your file, respond to requests, and keep you updated throughout." },
  { icon: PlaneLanding, label: "Decision & landing", body: "On a positive decision, we guide you through next steps and your arrival in Canada." },
];

const steps = [
  {
    title: "Start with a free, honest assessment.",
    body: "We learn your goals and circumstances, then give you a straight answer on whether there is a realistic pathway. If there isn't one yet, we'll tell you, and explain what would change that.",
  },
  {
    title: "We agree on a strategy and a retainer.",
    body: "If you decide to proceed, we set out the recommended stream, the process, expected timelines, and our fees in a written retainer. Formal representation begins once it's signed.",
  },
  {
    title: "We prepare your file with care.",
    body: "We complete the forms, build your document checklist, and review everything against current IRCC requirements. Nothing is filed until it is as strong and complete as we can make it.",
  },
  {
    title: "We file and manage your application.",
    body: "Your application is submitted to IRCC under our representation. We monitor its progress, handle correspondence, and respond promptly to any requests for further information.",
  },
  {
    title: "We see you through the decision.",
    body: "IRCC makes the final decision on every application. Whatever the outcome, we explain what it means and your options, and on approval we guide you through landing in Canada.",
  },
];

const kpis = [
  { value: "12 yrs", label: "Combined experience", caption: "Guiding clients through Canadian immigration" },
  { value: "8 streams", label: "Pathways handled", caption: "From work and study permits to complex cases" },
  { value: "100%", label: "Honest assessments", caption: "We never sell a pathway that isn't realistic" },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        label="How it works"
        title="From first assessment to landing in Canada."
        lede="Your immigration journey is one path with six clear stages. You always know where your file stands, what comes next, and who is representing you. Outcomes are decided by IRCC, but the strength of your file is decided here."
      />

      {/* KPI ribbon — grotesk numerals on rules. */}
      <Section space="sm">
        <Reveal>
          <ul className="border-t border-line">
            {kpis.map((k) => (
              <li
                key={k.label}
                className="grid items-baseline gap-x-6 gap-y-1 border-b border-line py-6 md:grid-cols-[14rem_1fr] md:py-7"
              >
                <span className="font-display text-[44px] font-extrabold leading-none tracking-tight text-ink tabular md:text-[60px]">
                  {k.value}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-display text-base font-bold tracking-tight text-ink">{k.label}</span>
                  {k.caption && <span className="text-sm text-ink-muted">{k.caption}</span>}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section space="md" id="loop">
        <Reveal>
          <SectionLabel>The journey</SectionLabel>
        </Reveal>
        <Reveal
          as="h2"
          delay={0.05}
          className="mt-6 max-w-[22ch] display-section break-words"
        >
          Every stage, from first contact to Canada.
        </Reveal>

        <Stagger className="mt-12 md:mt-16" step={0.06}>
          {loopNodes.map((n, i) => {
            const Icon = n.icon;
            return (
              <StaggerItem key={n.label}>
                <div className="grid grid-cols-[2.5rem_1fr] items-start gap-4 border-t border-line py-7 md:grid-cols-[3.5rem_2rem_1fr] md:gap-8 md:py-8">
                  <span className="index-num text-sm">{String(i + 1).padStart(2, "0")}</span>
                  <Icon className="hidden h-5 w-5 text-accent md:block" aria-hidden />
                  <div>
                    <p className="font-display text-xl font-bold leading-tight tracking-tight text-ink md:text-[24px]">
                      {n.label}
                    </p>
                    <p className="mt-1.5 max-w-[60ch] text-[15px] leading-relaxed text-ink-muted">{n.body}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
          <div className="rule" aria-hidden />
        </Stagger>
      </Section>

      <Section space="md">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <Reveal>
              <SectionLabel>Step by step</SectionLabel>
            </Reveal>
            <div className="min-w-0">
              <Reveal
                as="h2"
                className="display-section break-words"
              >
                What actually happens, in order.
              </Reveal>
              <Reveal delay={0.08} className="mt-8">
                <StepList steps={steps} />
              </Reveal>
            </div>
          </div>
      </Section>

      <Section space="md">
        <Reveal>
          <Rule label="Behind the scenes" />
        </Reveal>
        <div className="grid gap-12 pt-12 md:grid-cols-[1fr_1.6fr] md:gap-16 md:pt-16">
          <div />
          <Reveal delay={0.05}>
            <Prose>
              <p>
                Behind every clean step on this page is detailed work you don&apos;t have to manage. We keep current with IRCC program rules, instruction guides, and processing requirements, and we apply them to the specifics of your case rather than a generic template.
              </p>
              <p>
                What that means in practice: your forms are cross-checked for consistency, your supporting documents are organised the way an officer expects to read them, and weak points in your profile are addressed before filing rather than after a refusal. If IRCC asks for more information, we draft a considered response on your behalf.
              </p>
              <p>
                You always have a single point of contact: a dedicated consultant who knows your file. The diligence is ours; the future is yours. We cannot guarantee an outcome, but we can make sure your application is the strongest it can be.
              </p>
            </Prose>
          </Reveal>
        </div>
      </Section>

      <Section dark space="lg">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Reveal as="h2" className="display-section text-bg break-words">
              See where you stand.
            </Reveal>
            <Reveal as="p" delay={0.05} className="mt-5 max-w-[42ch] text-base text-bg/70 md:text-lg">
              Tell us about your goals and we&apos;ll give you an honest read on your options. No pressure, no false promises, just a clear next step.
            </Reveal>
            <Reveal delay={0.12}>
              <Button href="/contact" variant="primary" size="lg" className="mt-8">
                Book a free consultation <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
            <Link
              href="/eligibility"
              className="mt-6 text-sm text-bg/70 underline-offset-4 hover:underline"
            >
              Or take a free eligibility assessment →
            </Link>
          </div>
      </Section>

      <BreadcrumbLd
        crumbs={[
          { name: "Home", href: "/" },
          { name: "How it works", href: "/how-it-works" },
        ]}
      />
    </>
  );
}
