import { cn } from "@/lib/cn";

/**
 * A slug-independent visual used in place of bespoke photography. Renders a
 * solid garnet field (Maple Noir's structural device) with a mono eyebrow and
 * the service name set big in warm-white grotesk. Designed to fill a 4:3 slot.
 */
export function ServiceVisual({
  name,
  index = 0,
  className,
}: {
  name: string;
  index?: number;
  className?: string;
}) {
  // Alternate garnet / ink fields so a stack of them reads as an editorial set.
  const dark = index % 2 === 1;
  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden p-7 md:p-9",
        dark ? "bg-surface-dark" : "bg-accent",
        className,
      )}
    >
      {/* Recessed garnet leaf mark — subtle, tonal, no glow. */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -right-12 -bottom-12 h-60 w-60 opacity-[0.10]"
      >
        <path
          d="M100 36 l8 26 22-14-8 24 26-3-17 19 22 9-24 6 9 22-22-9-2 26-14-19-14 19-2-26-22 9 9-22-24-6 22-9-17-19 26 3-8-24 22 14z"
          fill={dark ? "var(--color-accent)" : "var(--color-accent-ink)"}
        />
      </svg>
      <span className="eyebrow text-accent-ink/80">CanPlus Immigration</span>
      <div>
        <p className="font-display text-2xl font-bold leading-[0.98] tracking-tight text-accent-ink md:text-[32px]">
          {name}
        </p>
        <p className="mt-3 text-sm text-accent-ink/60">Licensed RCIC-led representation</p>
      </div>
    </div>
  );
}
