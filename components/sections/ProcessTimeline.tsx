import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";

const steps = [
  {
    label: "Assess",
    body: "An honest eligibility review. We tell you where you genuinely stand, including when a pathway is not realistic yet.",
  },
  {
    label: "Plan",
    body: "Your best route, mapped. We compare Express Entry, PNPs, sponsorship, and permits against your real profile and goals.",
  },
  {
    label: "Apply",
    body: "A meticulous file, filed right. Evidence assembled and submitted the way IRCC and the provinces expect to see it.",
  },
  {
    label: "Land",
    body: "Arrival and what comes next. Status maintenance, extensions, and the steps toward permanent residence and citizenship.",
  },
];

/**
 * The "how it works" process as a vertical timeline. The intro holds the left
 * rail sticky while the four steps scroll past on the right, each marked by a
 * mono index on a connecting hairline.
 */
export function ProcessTimeline() {
  return (
    <section id="how" className="border-t border-line bg-bg">
      <div className="container-page py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Sticky intro */}
          <div className="lg:sticky lg:top-28 lg:self-start lg:pb-10">
            <Reveal as="p" className="eyebrow text-accent-strong">
              How it works
            </Reveal>
            <MaskReveal
              as="h2"
              delay={0.05}
              className="mt-4 max-w-[14ch] display-section pb-1"
            >
              Four steps to landing in Canada.
            </MaskReveal>
            <Reveal as="p" delay={0.1} className="mt-4 max-w-[40ch] lede text-ink-muted">
              A clear, accountable process led by a licensed consultant, so you
              always know where you stand and what comes next.
            </Reveal>
          </div>

          {/* Steps */}
          <Stagger className="flex flex-col" step={0.08}>
            {steps.map((s, i) => (
              <StaggerItem
                key={s.label}
                className="group relative flex gap-5 border-t border-line py-7 md:gap-8 md:py-9"
              >
                <span className="index-num w-9 flex-shrink-0 pt-1.5 text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-[clamp(1.375rem,2vw,1.75rem)] font-bold leading-none tracking-tight text-ink">
                    {s.label}
                  </h3>
                  <p className="max-w-[50ch] text-[15px] leading-relaxed text-ink-muted">
                    {s.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
            <div className="border-t border-line" aria-hidden />
          </Stagger>
        </div>
      </div>
    </section>
  );
}
