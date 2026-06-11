import { cn } from "@/lib/cn";

type Props = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  className?: string;
};

export function Quote({ quote, name, role, initials, className }: Props) {
  return (
    <figure className={cn("border-t-2 border-accent pt-7", className)}>
      <span className="eyebrow">In their words</span>
      <blockquote className="mt-5 font-display text-[24px] font-bold leading-[1.2] tracking-tight text-ink md:text-[30px]">
        {quote}
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
        <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-[3px] bg-accent text-[11px] font-semibold text-accent-ink">
          {initials}
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink">{name}</span>
          <span className="block text-xs text-ink-muted">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
