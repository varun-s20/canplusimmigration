"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MaskReveal } from "@/components/motion/MaskReveal";

/**
 * Full-bleed aspirational image band — an iconic Canadian landscape with a
 * dark scrim and a short editorial line. The image slowly zooms and drifts as
 * it passes through the viewport (zoom-parallax) for a cinematic, expensive feel.
 */
export function CanadaBand() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.28]);
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[26rem] items-end overflow-hidden bg-surface-dark md:min-h-[34rem]"
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { scale, y }}
      >
        <Image
          src="/images/canada-landscape.jpg"
          alt="Moraine Lake and the Rocky Mountains in Banff National Park, Canada."
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/10"
      />
      <div className="container-page relative py-12 text-bg md:py-16">
        <MaskReveal as="h2" className="max-w-[20ch] display-section pb-1 text-bg">
          From the first question to landing in Canada.
        </MaskReveal>
      </div>
    </section>
  );
}
