import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { Magnetic } from "@/components/motion/Magnetic";

export function FinalCTA() {
  return (
    <section className="bg-accent text-accent-ink" data-nav-theme="dark">
      <div className="container-page py-24 md:py-36">
        <div className="flex max-w-4xl flex-col items-start gap-8">
          <MaskReveal
            as="h2"
            delay={0.06}
            className="max-w-[16ch] pb-1 font-display text-[clamp(2.1rem,5vw,3.75rem)] font-extrabold leading-[1.0] tracking-tight"
          >
            Ready to start your Canadian{" "}
            <span className="underline decoration-accent-ink decoration-4 underline-offset-[6px]">
              journey?
            </span>
          </MaskReveal>

          <Reveal as="p" delay={0.12} className="max-w-[46ch] text-base text-accent-ink/80 md:text-lg">
            Book a free, no-obligation consultation with a licensed RCIC and get an honest read on your options.
          </Reveal>

          <Reveal delay={0.18}>
            <Magnetic strength={0.4}>
              <Button
                href="/contact"
                size="lg"
                className="mt-2 bg-bg text-ink hover:bg-accent-ink"
              >
                Book a free consultation <ArrowRight className="h-4 w-4" />
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
