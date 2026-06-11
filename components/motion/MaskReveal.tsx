"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";

// Strong ease-out (matches --ease-out). The reveal is a clip-path wipe with a
// small rise, no opacity fade — the type emerges from behind a moving edge
// rather than dissolving in. Crisper and less generic than a blur-fade.
const EASE = [0.22, 1, 0.36, 1] as const;

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

/**
 * Clip-path mask reveal for display headings. The content wipes up from behind
 * a horizontal edge (no fade), which reads as deliberate, premium motion. Pair
 * with `pb-*` on descender-heavy headings so the open clip never trims a tail.
 */
export function MaskReveal({
  children,
  as = "div",
  delay = 0,
  duration = 0.9,
  className,
  once = true,
  amount = 0.5,
}: {
  children: ReactNode;
  as?: Tag;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as React.ElementType;

  if (reduced) {
    const Static = as as React.ElementType;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ clipPath: "inset(0 0 102% 0)", y: 12 }}
      whileInView={{ clipPath: "inset(0 0 -2% 0)", y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
