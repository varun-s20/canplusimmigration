import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Space = "sm" | "md" | "lg";

const spacing: Record<Space, string> = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-28",
};

/**
 * Standardized vertical-rhythm section.
 * - Light (default): `container-page` + chosen vertical padding.
 * - Dark: full-bleed dark band with its own inner `container-page`, and the
 *   `data-nav-theme="dark"` hook the nav uses for contrast.
 */
export function Section({
  children,
  space = "md",
  dark = false,
  id,
  className,
}: {
  children: ReactNode;
  space?: Space;
  dark?: boolean;
  id?: string;
  className?: string;
}) {
  if (dark) {
    return (
      <section id={id} className={cn("bg-surface-dark text-bg", className)} data-nav-theme="dark">
        <div className={cn("container-page", spacing[space])}>{children}</div>
      </section>
    );
  }
  return (
    <section id={id} className={cn("container-page", spacing[space], className)}>
      {children}
    </section>
  );
}
