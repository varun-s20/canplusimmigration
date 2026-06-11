import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { testimonials } from "@/content/testimonials";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function Testimonials() {
  return (
    <section className="bg-surface-dark text-bg" data-nav-theme="dark">
      <div className="container-page py-20 md:py-28">
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <SectionLabel className="text-bg/70">Testimonials</SectionLabel>
          </Reveal>
          <Reveal delay={0.04} className="w-full">
            <Rule dark />
          </Reveal>
          <Reveal
            as="h2"
            delay={0.06}
            className="max-w-[20ch] font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.98] tracking-tight text-bg"
          >
            Families and professionals we&apos;ve helped call Canada home.
          </Reveal>
        </div>

        <Stagger className="mt-14 flex flex-col md:mt-20" step={0.1}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="flex flex-col gap-6 border-t border-line-dark py-10 md:flex-row md:gap-12 md:py-14">
                <blockquote className="flex-1 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.05] tracking-tight text-bg">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="eyebrow flex-shrink-0 text-bg/60 md:w-52 md:text-right">
                  <span className="block text-bg">{t.name}</span>
                  <span className="mt-1 block normal-case tracking-normal">{t.role}</span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
          <div className="rule-dark" aria-hidden />
        </Stagger>
      </div>
    </section>
  );
}
