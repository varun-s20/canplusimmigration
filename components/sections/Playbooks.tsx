import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { guides } from "@/content/guides";

/**
 * Guides as a horizontal scroll-snap rail — breadth the reader can flick
 * through rather than a vertical list. CSS scroll-snap only (no JS), so it
 * stays a server component. A distinct rhythm from the services grid above.
 */
export function Playbooks() {
  return (
    <section className="border-t border-line bg-bg">
      <div className="container-page py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <MaskReveal
            as="h2"
            className="max-w-[20ch] display-section pb-1"
          >
            Plain-English answers for every pathway.
          </MaskReveal>
          <Reveal delay={0.1} className="flex-shrink-0">
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong underline-offset-4 hover:underline"
            >
              All guides <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Full-bleed rail so cards can scroll past the page edge. Left padding
          matches the page gutter so the first card aligns with the heading. */}
      <div className="overflow-x-auto pb-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:pb-28">
        <Reveal
          className="flex gap-4 px-5 md:gap-5 md:px-8 xl:px-12"
          y={24}
        >
          {guides.map((g, i) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group relative flex w-[78vw] flex-shrink-0 snap-start flex-col justify-between gap-10 rounded-[4px] border border-line bg-card p-6 transition-colors duration-300 hover:border-accent-line hover:bg-bg sm:w-[20rem] md:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="index-num text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow text-ink-muted">{g.industry}</span>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-display text-[1.2rem] font-bold leading-[1.12] tracking-tight text-ink">
                  {g.outcome}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong">
                  Read the guide
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
