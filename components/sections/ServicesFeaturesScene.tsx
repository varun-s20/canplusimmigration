import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { IndexRow } from "@/components/ui/IndexRow";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { services } from "@/content/services";

/**
 * Calm "Services" editorial index. A section header (SectionLabel + Rule + H2),
 * a ruled IndexRow per service, and a garnet field with a single CRS CTA on the
 * right rail. Replaces the former scroll-morph scene and product mocks.
 */
export function ServicesFeaturesScene() {
  return (
    <section className="bg-bg">
      <div className="container-page py-20 md:py-28">
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <SectionLabel>Services</SectionLabel>
          </Reveal>
          <Reveal delay={0.04} className="w-full">
            <Rule />
          </Reveal>
          <Reveal
            as="h2"
            delay={0.06}
            className="max-w-[22ch] font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.98] tracking-tight"
          >
            Every Canadian pathway, handled with care.
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[1.55fr_0.9fr] lg:gap-16">
          {/* Services index */}
          <Stagger className="flex flex-col" step={0.05}>
            {services.map((s, i) => (
              <StaggerItem key={s.slug}>
                <IndexRow
                  index={i + 1}
                  title={s.name}
                  sub={s.tagline}
                  href={`/services/${s.slug}`}
                />
              </StaggerItem>
            ))}
            <div className="border-t border-line" aria-hidden />
          </Stagger>

          {/* Right rail — garnet CRS field */}
          <Reveal y={20} className="lg:sticky lg:top-28 lg:self-start">
            <a
              href="/eligibility"
              className="group flex flex-col justify-between gap-12 bg-accent px-8 py-12 text-accent-ink transition-colors hover:bg-accent-hover md:px-10"
            >
              <span className="eyebrow text-accent-ink/70">Free assessment</span>
              <span className="block max-w-[16ch] font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[0.98] tracking-tight">
                Estimate your CRS score{" "}
                <ArrowRight className="inline h-[0.8em] w-[0.8em] transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
              <span className="eyebrow text-accent-ink/70">2-minute eligibility check</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
