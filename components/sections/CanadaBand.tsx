import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Full-bleed aspirational image band — an iconic Canadian landscape with a
 * dark scrim and a short editorial line. Adds a photographic moment between
 * the content sections and the final CTA.
 */
export function CanadaBand() {
  return (
    <section className="relative flex min-h-[26rem] items-end overflow-hidden bg-surface-dark md:min-h-[34rem]">
      <Image
        src="/images/canada-landscape.jpg"
        alt="Moraine Lake and the Rocky Mountains in Banff National Park, Canada."
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/10"
      />
      <div className="container-page relative py-12 text-bg md:py-16">
        <Reveal as="p" className="eyebrow text-bg/80">
          Your Canadian future
        </Reveal>
        <Reveal as="h2" delay={0.05} className="mt-3 max-w-[20ch] display-section text-bg">
          From the first question to landing in Canada.
        </Reveal>
      </div>
    </section>
  );
}
