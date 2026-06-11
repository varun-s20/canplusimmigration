"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

/**
 * A flat ivory service tile with a burgundy spotlight that tracks the cursor.
 * The glow is positioned entirely with motion values + a soft spring (no React
 * state, so no per-frame re-render), and is hardware-accelerated via a single
 * translate3d string. An unseen detail that makes the flattest cards feel alive.
 * Disabled under reduced motion and on coarse pointers.
 */
export function SpotlightCard({
  href,
  title,
  tagline,
}: {
  href: string;
  title: string;
  tagline: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 220, damping: 28, mass: 0.4 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);
  // Glow is 320px; offset by half so it centres on the cursor.
  const transform = useTransform(
    [sx, sy],
    ([x, y]) => `translate3d(${(x as number) - 160}px, ${(y as number) - 160}px, 0)`,
  );

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={reduced ? undefined : onMove}
      className="group relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[4px] border border-line bg-card p-5 transition-colors duration-300 hover:border-accent-line md:p-6"
    >
      {!reduced && (
        <motion.span
          aria-hidden
          style={{ transform }}
          className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="block h-full w-full rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-accent-strong)_22%,transparent)_0%,transparent_68%)]" />
        </motion.span>
      )}
      <ArrowUpRight className="relative h-5 w-5 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      <div className="relative flex flex-col gap-1.5">
        <h3 className="font-display text-[1.15rem] font-bold leading-[1.1] tracking-tight text-ink">
          {title}
        </h3>
        <p className="text-[13px] leading-snug text-ink-muted">{tagline}</p>
      </div>
    </Link>
  );
}
