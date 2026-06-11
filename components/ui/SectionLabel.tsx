import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Show a leading garnet dot before the label. */
  dot?: boolean;
};

/**
 * Mono eyebrow label — the signature editorial marker for section headers.
 * Replaces the old pill + scribble treatment.
 */
export function SectionLabel({ children, className, dot = true }: Props) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-2", className)}>
      {dot && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />}
      {children}
    </span>
  );
}
