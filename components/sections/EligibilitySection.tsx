import { EligibilityEstimator } from "@/components/sections/EligibilityEstimator";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";

/**
 * The interactive CRS estimator framed as the page's centrepiece, on a faint
 * burgundy-tint band so it reads as a distinct, hands-on moment between the
 * editorial sections. Header here; the estimator brings its own container.
 */
export function EligibilitySection() {
  return (
    <section className="border-t border-accent-line bg-accent-tint">
      <div className="container-page pt-20 pb-10 md:pt-28 md:pb-14">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <MaskReveal as="h2" className="max-w-[16ch] display-section pb-1">
            See where you stand in two minutes.
          </MaskReveal>
          <Reveal as="p" delay={0.08} className="lede max-w-[46ch] text-ink-muted">
            Estimate your Comprehensive Ranking System score, then book a
            licensed RCIC to confirm exactly where you truly stand.
          </Reveal>
        </div>
      </div>

      <div className="pb-20 md:pb-28">
        <EligibilityEstimator />
      </div>
    </section>
  );
}
