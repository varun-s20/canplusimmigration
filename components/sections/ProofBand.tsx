import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const stats = [
  { figure: "10+", label: "Years RCIC-led", sub: "Practising since 2013" },
  { figure: "8", label: "Immigration pathways", sub: "Permits to citizenship" },
  { figure: "4 of 5", label: "Return or refer us", sub: "For their next file" },
  { figure: "CICC", label: "Licensed & regulated", sub: "Accountable representation" },
];

/**
 * A quiet horizontal proof strip directly under the hero — the credentials and
 * track-record signals that don't belong cluttering the hero stack. Mono
 * figures on the ivory canvas, divided by hairlines. Its own layout family
 * (no eyebrow, no headline) so it reads as a band, not another section.
 */
export function ProofBand() {
  return (
    <section className="border-b border-line bg-bg">
      <div className="container-page py-8 md:py-10">
        <Stagger
          className="grid grid-cols-2 gap-y-8 md:grid-cols-4"
          step={0.06}
        >
          {stats.map((s, i) => (
            <StaggerItem
              key={s.label}
              className={
                "flex flex-col gap-1 px-1 md:px-6" +
                (i === 0 ? "" : " md:border-l md:border-line")
              }
            >
              <span className="font-display text-[clamp(1.5rem,2.4vw,1.9rem)] font-extrabold leading-none tracking-tight text-ink tabular">
                {s.figure}
              </span>
              <span className="mt-1 text-[14px] font-semibold text-ink">
                {s.label}
              </span>
              <span className="text-[13px] text-ink-muted">{s.sub}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
