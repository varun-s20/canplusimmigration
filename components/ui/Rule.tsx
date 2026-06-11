import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * A full-width hairline rule, optionally with a mono eyebrow sitting on it —
 * the editorial system's primary structural divider (replaces boxed labels).
 */
export function Rule({
  label,
  dark = false,
  className,
}: {
  label?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  if (!label) {
    return <div className={cn(dark ? "rule-dark" : "rule", className)} aria-hidden />;
  }
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <SectionLabel className={dark ? "text-bg/70" : undefined}>{label}</SectionLabel>
      <div className={cn("flex-1", dark ? "rule-dark" : "rule")} aria-hidden />
    </div>
  );
}
