"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Pins each child as a `sticky top-0 h-screen` slot on md+ viewports. Children
 * share the same parent stacking context, so the next slot slides up over the
 * previous one as the user scrolls. Each slot subtly recedes (scale, opacity,
 * lift) as it gets pushed under.
 *
 * On viewports below md, slots render in natural flow.
 *
 * Children are rendered exactly once, stateful components are not duplicated.
 */
export function ScrollStack({ children, className }: Props) {
  const items = Children.toArray(children);
  const total = items.length;

  return (
    <div className={cn("relative w-full", className)}>
      {items.map((child, i) => (
        <StackSlot key={i} index={i} total={total}>
          {child}
        </StackSlot>
      ))}
    </div>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

function StackSlot({
  children,
  index,
  total,
}: {
  children: ReactNode;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const isLast = index === total - 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, isLast ? 1 : 0.55]);
  const y = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : -28]);

  const applyMotion = isDesktop && !reduced;

  return (
    <div
      ref={ref}
      className="relative w-full md:sticky md:overflow-hidden md:h-[calc(100dvh_-_var(--nav-h))] md:top-[var(--nav-h)]"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={applyMotion ? { scale, opacity, y } : undefined}
        className="md:h-full md:w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
