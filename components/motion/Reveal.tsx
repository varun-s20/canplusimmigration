"use client";

import { motion, useReducedMotion } from "motion/react";
import { type AriaAttributes, type HTMLAttributes, type ReactNode } from "react";

type Props = HTMLAttributes<HTMLElement> & AriaAttributes & {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  as?: "div" | "span" | "section" | "h1" | "h2" | "h3" | "p" | "li" | "ul";
  once?: boolean;
  amount?: number;
  duration?: number;
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
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
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
};

export function Stagger({ children, className, step = 0.08, initialDelay = 0 }: StaggerProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
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
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
