import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { testimonials } from "@/content/testimonials";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";

/**
 * Testimonials on the dark band — a featured quote carrying the weight, two
 * supporting quotes beneath it, and an atmospheric arrival still holding the
 * right rail. A composed layout rather than the former uniform quote stack.
 */
export function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="bg-surface-dark text-bg" data-nav-theme="dark">
      <div className="container-page py-20 md:py-28">
        <div className="flex flex-col items-start gap-5">
          <Reveal>
            <SectionLabel className="text-bg/70">Testimonials</SectionLabel>
          </Reveal>
          <MaskReveal as="h2" delay={0.06} className="max-w-[20ch] display-section pb-1 text-bg">
            Families and professionals we&apos;ve helped call Canada home.
          </MaskReveal>
        </div>

        <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* Quotes */}
          <div className="flex flex-col lg:col-span-8">
            <Reveal>
              <figure className="border-t border-line-dark py-8 md:py-10">
                <blockquote className="max-w-[28ch] font-display text-[clamp(1.375rem,2.6vw,2rem)] font-bold leading-[1.15] tracking-tight text-bg">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-base font-bold text-bg">
                    {featured.name}
                  </span>
                  <span className="text-sm text-bg/55">{featured.role}</span>
                </figcaption>
              </figure>
            </Reveal>

            <Stagger className="grid gap-px sm:grid-cols-2" step={0.1}>
              {rest.map((t) => (
                <StaggerItem key={t.name}>
                  <figure className="flex h-full flex-col justify-between gap-6 border-t border-line-dark py-8 sm:pr-8">
                    <blockquote className="text-[15px] leading-relaxed text-bg/85 md:text-base">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="flex flex-col">
                      <span className="font-display text-[15px] font-bold text-bg">
                        {t.name}
                      </span>
                      <span className="mt-0.5 text-sm text-bg/55">{t.role}</span>
                    </figcaption>
                  </figure>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Atmospheric arrival still */}
          <Reveal y={24} className="lg:col-span-4">
            <div className="relative h-56 overflow-hidden rounded-[4px] lg:h-full">
              <Image
                src="/images/airport-arrival.jpg"
                alt="A family arriving at a Canadian airport."
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-surface-dark/70 via-transparent to-transparent"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
