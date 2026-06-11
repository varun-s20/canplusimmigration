import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Tone = "card" | "dark" | "bg";

type Props = HTMLAttributes<HTMLDivElement> & {
  tone?: Tone;
  notched?: boolean;
};

const toneClasses: Record<Tone, string> = {
  card: "bg-card text-ink hairline",
  dark: "bg-surface-dark text-bg",
  bg: "bg-bg text-ink hairline",
};

// `notched` is retained for API compatibility but is a no-op in the flat
// editorial system.
export function Card({ tone = "card", notched: _notched = false, className, children, ...rest }: Props) {
  return (
    <div
      className={cn(
        "rounded-[4px]",
        toneClasses[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
