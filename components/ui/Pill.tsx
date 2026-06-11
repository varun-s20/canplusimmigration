import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  tone?: "light" | "dark" | "accent";
  className?: string;
};

export function Pill({ children, tone = "light", className }: Props) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-1.5 rounded-[3px] px-2.5 py-1.5",
        tone === "light" && "bg-card text-ink-muted hairline",
        tone === "dark" && "bg-surface-dark text-bg",
        tone === "accent" && "bg-accent text-accent-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
