"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Where the reveal originates from. */
  from?: "bottom-center" | "bottom" | "center";
  /** How long the clip-path animation takes (s). */
  duration?: number;
  /** Reveal once and stay, or replay each time it enters view. */
  once?: boolean;
  /** Border radius used at the closed pinhole (for the grow-from-pill effect). */
  pinRadius?: number;
};

/**
 * Reveals its child by growing a clip-path window from a chosen origin.
 * Matches the reference video's "stage grows from the bottom-center" pattern.
 *
 * The element is laid out normally; only its visibility region animates. Use
 * around the section's mock card / stage element so the surrounding text can
 * use its own Reveal staggers.
 */
export function StageReveal({
  children,
  className,
  from = "bottom-center",
  duration = 1.0,
  once = true,
  pinRadius = 999,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25, once });
  const reduced = useReducedMotion();

  const closed = (() => {
    switch (from) {
      case "center":
        return `inset(50% 50% 50% 50% round ${pinRadius}px)`;
      case "bottom":
        return `inset(100% 0% 0% 0% round ${pinRadius}px)`;
      case "bottom-center":
      default:
        return `inset(100% 50% 0% 50% round ${pinRadius}px)`;
    }
  })();

  const open = "inset(0% 0% 0% 0% round 16px)";

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{ clipPath: closed }}
      animate={{ clipPath: inView ? open : closed }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
