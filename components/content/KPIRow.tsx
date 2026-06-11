import { cn } from "@/lib/cn";

export type KPI = {
  value: string;
  label: string;
  caption?: string;
};

type Props = {
  items: KPI[];
  tone?: "light" | "dark";
  className?: string;
};

export function KPIRow({ items, tone = "light", className }: Props) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "grid border-t sm:grid-cols-3",
        dark ? "border-line-dark" : "border-line",
        className,
      )}
    >
      {items.map((k, i) => (
        <div
          key={k.label}
          className={cn(
            "py-7 sm:py-8",
            // Vertical hairlines between columns on wide screens.
            i > 0 && (dark ? "sm:border-l sm:border-line-dark" : "sm:border-l sm:border-line"),
            i > 0 ? "sm:pl-7 md:pl-8" : undefined,
            // Horizontal hairline between stacked rows on mobile.
            i > 0 && (dark ? "border-t border-line-dark sm:border-t-0" : "border-t border-line sm:border-t-0"),
          )}
        >
          <p
            className={cn(
              "font-display tabular text-[48px] font-extrabold leading-[0.92] tracking-tight md:text-[60px]",
              dark ? "text-bg" : "text-ink",
            )}
          >
            {k.value}
          </p>
          <p
            className={cn(
              "eyebrow mt-4",
              dark ? "text-bg/70" : undefined,
            )}
          >
            {k.label}
          </p>
          {k.caption && (
            <p className={cn("mt-2 text-sm", dark ? "text-bg/55" : "text-ink-muted")}>
              {k.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
