import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { IndexRow } from "@/components/ui/IndexRow";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { guides } from "@/content/guides";

export function Playbooks() {
  return (
    <section className="bg-bg">
      <div className="container-page py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex w-full flex-col items-start gap-6">
            <Reveal>
              <SectionLabel>Guides</SectionLabel>
            </Reveal>
            <Reveal delay={0.04} className="w-full">
              <Rule />
            </Reveal>
            <Reveal
              as="h2"
              delay={0.06}
              className="max-w-[22ch] font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.98] tracking-tight"
            >
              Plain-English answers for every pathway.
            </Reveal>
          </div>
          <Reveal delay={0.12} className="flex-shrink-0">
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong underline-offset-4 hover:underline"
            >
              See all guides <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-12 flex flex-col md:mt-16" step={0.05}>
          {guides.map((g, i) => (
            <StaggerItem key={g.slug}>
              <IndexRow
                index={i + 1}
                title={g.outcome}
                sub={g.industry}
                href={`/guides/${g.slug}`}
              />
            </StaggerItem>
          ))}
          <div className="border-t border-line" aria-hidden />
        </Stagger>
      </div>
    </section>
  );
}
