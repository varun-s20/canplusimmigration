"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { type ReactNode } from "react";

/**
 * Magnetic hover — the wrapped element drifts toward the cursor with spring
 * physics, then settles back on leave. Decorative polish for primary CTAs.
 *
 * Tracked entirely with motion values (no React state, so no re-renders on
 * pointermove). Disabled under reduced-motion and on coarse pointers (touch),
 * where a magnetic pull has no meaning and would fight the tap.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  /** Fraction of the cursor offset the element follows (0.2–0.5 feels right). */
  strength?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);
  // Drive a single composited transform string for hardware acceleration.
  const transform = useTransform(
    [x, y],
    ([lx, ly]) => `translate3d(${lx}px, ${ly}px, 0)`,
  );

  if (reduced) return <span className={className}>{children}</span>;

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ transform, display: "inline-flex" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
