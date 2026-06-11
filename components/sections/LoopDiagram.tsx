import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const nodes = [
  { label: "Assess", sub: "Honest eligibility review" },
  { label: "Plan", sub: "Your best pathway, mapped" },
  { label: "Apply", sub: "Meticulous file, filed right" },
  { label: "Land", sub: "Arrival & next steps" },
];

export function LoopDiagram() {
  return (
    <section id="how" className="bg-bg">
      <div className="container-page py-20 md:py-28">
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <SectionLabel>How it works</SectionLabel>
          </Reveal>
          <Reveal delay={0.04} className="w-full">
            <Rule />
          </Reveal>
          <Reveal
            as="h2"
            delay={0.06}
            className="max-w-[20ch] font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.98] tracking-tight"
          >
            Four steps from first question to landing in Canada.
          </Reveal>
          <Reveal as="p" delay={0.12} className="max-w-[58ch] text-base text-ink-muted md:text-lg">
            A clear, accountable process led by a licensed consultant — so you always know where you stand and what comes next.
          </Reveal>
        </div>

        <Stagger className="mt-14 grid sm:grid-cols-2 md:mt-20 md:grid-cols-4" step={0.07}>
          {nodes.map((n, i) => (
            <StaggerItem
              key={n.label}
              className="flex flex-col gap-4 border-t border-line py-7 md:border-t-0 md:border-l md:py-0 md:pl-6 md:first:border-l-0 md:first:pl-0"
            >
              <span className="index-num text-sm">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[26px] font-bold leading-tight tracking-tight text-ink md:text-[30px]">
                {n.label}
              </span>
              <span className="text-sm text-ink-muted">{n.sub}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
