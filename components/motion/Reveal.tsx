"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import { type AriaAttributes, type HTMLAttributes, type ReactNode } from "react";

// Strong ease-out curve (matches --ease-out in globals.css). Carries the
// intentional settle that separates premium motion from default fades.
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type Props = HTMLAttributes<HTMLElement> & AriaAttributes & {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  as?: "div" | "span" | "section" | "h1" | "h2" | "h3" | "p" | "li" | "ul";
  once?: boolean;
  amount?: number;
  duration?: number;
  /** Subtle focus-pull: content resolves from a soft blur. On by default. */
  blur?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  y = 18,
  x = 0,
  className,
  as = "div",
  once = true,
  amount = 0.35,
  duration = 0.7,
  blur = true,
  ...rest
}: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as React.ElementType;

  if (reduced) {
    const Static = as as React.ElementType;
    return <Static className={className} {...rest}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x, filter: blur ? "blur(6px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  step?: number;
  initialDelay?: number;
  amount?: number;
};

export function Stagger({
  children,
  className,
  step = 0.08,
  initialDelay = 0,
  amount = 0.3,
}: StaggerProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: step, delayChildren: initialDelay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 16,
  blur = true,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  blur?: boolean;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  const show: Transition = { duration: 0.6, ease: EASE_OUT };
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: blur ? "blur(5px)" : "blur(0px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: show },
      }}
    >
      {children}
    </motion.div>
  );
}
