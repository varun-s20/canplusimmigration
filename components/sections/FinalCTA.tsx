import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCTA() {
  return (
    <section className="bg-accent text-accent-ink" data-nav-theme="dark">
      <div className="container-page py-24 md:py-36">
        <div className="flex max-w-4xl flex-col items-start gap-8">
          <Reveal>
            <SectionLabel className="text-accent-ink/70">Get started</SectionLabel>
          </Reveal>

          <Reveal
            as="h2"
            delay={0.06}
            className="max-w-[16ch] font-display text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.96] tracking-tight"
          >
            Ready to start your Canadian{" "}
            <span className="underline decoration-accent-ink decoration-4 underline-offset-[6px]">
              journey?
            </span>
          </Reveal>

          <Reveal as="p" delay={0.12} className="max-w-[46ch] text-base text-accent-ink/80 md:text-lg">
            Book a free, no-obligation consultation with a licensed RCIC and get an honest read on your options.
          </Reveal>

          <Reveal delay={0.18}>
            <Button
              href="/contact"
              size="lg"
              className="mt-2 bg-bg text-ink hover:bg-accent-ink"
            >
              Book a free consultation
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
