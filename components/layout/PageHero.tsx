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
