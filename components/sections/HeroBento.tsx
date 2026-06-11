import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

export function HeroBento() {
  return (
    <section className="flex flex-col">
      {/* Red-led split hero. */}
      <div className="grid md:grid-cols-2 md:items-stretch">
        {/* LEFT — ivory editorial panel */}
        <div className="flex items-center bg-bg px-5 py-14 md:py-20 lg:py-24 md:pl-10 md:pr-12 lg:pl-16 lg:pr-16">
          <div className="flex w-full max-w-[40rem] flex-col gap-8 md:ml-auto">
            <Reveal>
              <SectionLabel>CANPLUS IMMIGRATION</SectionLabel>
            </Reveal>

            <Reveal
              as="h1"
              delay={0.05}
              y={20}
              className="max-w-[14ch] font-display font-extrabold tracking-tight text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.98]"
            >
              Your Canadian future,{" "}
              <span className="scribble-underline">expertly</span> guided.
            </Reveal>

            <Reveal as="p" delay={0.12} className="max-w-[44ch] text-[15px] leading-relaxed text-ink-muted md:text-base">
              Licensed Canadian immigration consultants for work and study permits, permanent residence, citizenship, and complex or refused cases. Honest advice, meticulous files, real representation.
            </Reveal>

            <Reveal delay={0.18}>
              <div className="rule" />
            </Reveal>

            <Reveal delay={0.22} className="eyebrow text-ink-muted">
              Work permits · Study permits · Permanent residence · Citizenship · Refused cases
            </Reveal>

            <Reveal delay={0.28} className="flex flex-wrap items-center gap-3">
              <Button href="/eligibility" variant="primary" size="lg">
                Free eligibility assessment <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/services" variant="outline" size="lg">
                Our services
              </Button>
            </Reveal>

            <Reveal delay={0.34} className="eyebrow text-ink-muted">
              Licensed RCIC · Regulated by the CICC · Honest assessments
            </Reveal>
          </div>
        </div>

        {/* RIGHT — cinematic brand film under a crimson-to-dark scrim.
            The film is the main landing hero visual. */}
        <Reveal
          y={0}
          delay={0.15}
          className="relative min-h-[20rem] overflow-hidden bg-surface-dark text-accent-ink md:min-h-0"
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/hero-film.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="CanPlus Immigration brand film"
          />
          {/* Crimson-led legibility scrim — keeps the brand red field while the
              caption stays readable over moving footage. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-accent-deep/85 via-ink/45 to-ink/15"
          />
          <div className="relative flex h-full flex-col justify-end gap-3 px-8 py-12 md:px-12 md:py-14 lg:px-16">
            {/* <span className="eyebrow text-accent-ink/80">Licensed RCIC · Regulated by the CICC</span>
             */}
            <span className="block max-w-[18ch] font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-bold leading-[1.05] tracking-tight drop-shadow-[0_2px_14px_rgba(18,17,16,0.45)]">
              8500+ clients served successfully
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
