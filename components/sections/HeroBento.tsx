"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { useIntroDone } from "@/components/motion/useIntroDone";

const EASE = [0.22, 1, 0.36, 1] as const;

// Each headline line wipes up from behind its own mask. No opacity fade — the
// words emerge from a moving edge, which reads far more deliberate than a blur.
const line: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.95, ease: EASE } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(5px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

/**
 * Full-bleed cinematic hero — the brand film fills the entire section as the
 * background, with the value proposition set over a bottom-weighted scrim. The
 * headline reveals line by line behind clip masks once the intro curtain clears;
 * the film drifts and scales gently on scroll for depth.
 */
export function HeroBento() {
  const reduced = useReducedMotion();
  const introDone = useIntroDone();
  const ready = reduced || introDone;

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const filmY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const filmScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const anim = ready ? "show" : "hidden";

  return (
    <section
      ref={sectionRef}
      data-hero
      data-nav-theme="dark"
      className="relative mt-[calc(-1*var(--nav-h))] flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-surface-dark text-accent-ink"
    >
      {/* Full-bleed brand film */}
      <motion.video
        className="absolute inset-0 h-full w-full object-cover"
        style={reduced ? undefined : { y: filmY, scale: filmScale }}
        src="/hero-film.mp4"
        poster="/images/toronto-skyline.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="CanPlus Immigration brand film"
      />
      {/* Legibility scrim — heavier at the bottom where the copy sits. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-accent-deep/92 via-ink/55 to-ink/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/45 to-transparent"
      />

      {/* Overlay copy, anchored bottom-left within the viewport */}
      <motion.div
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
        className="container-page relative z-10 pb-14 pt-28 md:pb-20"
      >
        <motion.div
          initial={reduced ? false : "hidden"}
          animate={anim}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
          className="flex max-w-[52rem] flex-col gap-7"
        >
          <motion.span variants={fade} className="eyebrow text-accent-ink/80">
            <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent-strong align-middle" />
            CanPlus Immigration · Licensed RCIC
          </motion.span>

          <h1 className="font-display font-extrabold tracking-tight text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.98] text-accent-ink">
            <span className="block overflow-hidden pb-[0.18em]">
              <motion.span variants={line} className="block will-change-transform">
                Your Canadian future,
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.18em]">
              <motion.span variants={line} className="block will-change-transform">
                <span className="scribble-underline">expertly</span> guided.
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fade}
            className="lede max-w-[44ch] text-accent-ink/85"
          >
            Licensed consultants for permits, permanent residence, citizenship,
            and refused cases. Honest advice, meticulous files, real representation.
          </motion.p>

          <motion.div variants={fade} className="flex flex-wrap items-center gap-3 pt-1">
            <Magnetic strength={0.4}>
              <Button href="/eligibility" variant="primary" size="lg">
                Free eligibility assessment <ArrowRight className="h-4 w-4" />
              </Button>
            </Magnetic>
            <Button
              href="/services"
              variant="outline"
              size="lg"
              className="border-accent-ink/35 text-accent-ink hover:border-accent-ink/60 hover:bg-accent-ink/10"
            >
              Explore our services
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Track-record chip, bottom-right — a caption on the film, not a copy element */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
        className="pointer-events-none absolute bottom-14 right-5 z-10 hidden items-baseline gap-2 md:bottom-20 md:right-8 lg:flex xl:right-12"
      >
        <span className="font-display text-2xl font-extrabold tracking-tight text-accent-ink tabular">
          8500<span className="text-accent-strong">+</span>
        </span>
        <span className="text-[13px] font-medium text-accent-ink/75">
          clients guided since 2013
        </span>
      </motion.div>
    </section>
  );
}
