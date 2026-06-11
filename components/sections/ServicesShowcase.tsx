import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { services } from "@/content/services";

type Treatment = "feature" | "tall" | "image" | "accent" | "plain";

const tiles: Record<
  string,
  { treatment: Treatment; image?: string; alt?: string; span: string }
> = {
  "permanent-residence": {
    treatment: "feature",
    image: "/images/diverse-people.jpg",
    alt: "A diverse group of new permanent residents in Canada.",
    span: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  },
  "work-permits": {
    treatment: "tall",
    image: "/images/documents-desk.jpg",
    alt: "Immigration documents and a work permit file on a desk.",
    span: "lg:row-span-2",
  },
  "study-permits": { treatment: "plain", span: "" },
  "visitor-super-visa": { treatment: "plain", span: "" },
  "refugee-asylum": { treatment: "plain", span: "" },
  "trp-inadmissibility": { treatment: "plain", span: "" },
  "pr-card-citizenship": {
    treatment: "image",
    image: "/images/toronto-skyline.jpg",
    alt: "The Toronto skyline at dusk.",
    span: "",
  },
  "complex-refused": { treatment: "accent", span: "" },
};

// DOM order chosen so the dense grid packs cleanly: a 2x2 feature + a 1x2 tall
// tile, then a row of four. Eight services, eight cells, no empty tiles.
const order = [
  "permanent-residence",
  "work-permits",
  "study-permits",
  "visitor-super-visa",
  "refugee-asylum",
  "trp-inadmissibility",
  "pr-card-citizenship",
  "complex-refused",
];

function shortName(name: string) {
  // Trim the long PR label for tile display.
  return name.split(":")[0].replace(" & Extensions", "");
}

export function ServicesShowcase() {
  const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

  return (
    <section className="bg-bg">
      <div className="container-page py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <MaskReveal
            as="h2"
            className="max-w-[18ch] display-section pb-1"
          >
            Every Canadian pathway, handled with care.
          </MaskReveal>
          <Reveal delay={0.12} className="flex-shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong underline-offset-4 hover:underline"
            >
              View all services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Stagger
          className="mt-12 grid auto-rows-[13rem] grid-cols-1 gap-3 sm:grid-cols-2 md:mt-16 lg:grid-cols-4"
          step={0.05}
        >
          {order.map((slug) => {
            const s = bySlug[slug];
            const t = tiles[slug];
            if (!s) return null;
            const name = shortName(s.name);
            const href = `/services/${s.slug}`;

            if (t.treatment === "feature" || t.treatment === "tall" || t.treatment === "image") {
              const isFeature = t.treatment === "feature";
              return (
                <StaggerItem key={slug} className={t.span}>
                  <Link
                    href={href}
                    className="group relative flex h-full flex-col justify-end overflow-hidden rounded-[4px] bg-surface-dark text-accent-ink"
                  >
                    <Image
                      src={t.image!}
                      alt={t.alt!}
                      fill
                      sizes={isFeature ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"}
                      className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.05]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-accent-deep/90 via-ink/45 to-ink/10"
                    />
                    <div className="relative flex flex-col gap-2 p-5 md:p-6">
                      <ArrowUpRight className="absolute right-5 top-0 h-5 w-5 -translate-y-full text-accent-ink/70 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:right-6" />
                      <h3
                        className={
                          "font-display font-bold leading-[1.05] tracking-tight text-accent-ink " +
                          (isFeature
                            ? "max-w-[16ch] text-[clamp(1.3rem,1.8vw,1.7rem)]"
                            : "text-[1.15rem]")
                        }
                      >
                        {name}
                      </h3>
                      {isFeature && (
                        <p className="max-w-[34ch] text-[14px] leading-relaxed text-accent-ink/80">
                          {s.tagline}
                        </p>
                      )}
                    </div>
                  </Link>
                </StaggerItem>
              );
            }

            if (t.treatment === "accent") {
              return (
                <StaggerItem key={slug} className={t.span}>
                  <Link
                    href={href}
                    className="group relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[4px] bg-accent p-5 text-accent-ink transition-colors duration-300 hover:bg-accent-hover md:p-6"
                  >
                    <ArrowUpRight className="h-5 w-5 text-accent-ink/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-display text-[1.15rem] font-bold leading-[1.1] tracking-tight">
                        {name}
                      </h3>
                      <p className="text-[13px] leading-snug text-accent-ink/75">
                        {s.tagline}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              );
            }

            // plain ivory card with a cursor-tracking spotlight
            return (
              <StaggerItem key={slug} className={t.span}>
                <SpotlightCard href={href} title={name} tagline={s.tagline} />
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
