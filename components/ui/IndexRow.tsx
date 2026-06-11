import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * A ruled editorial index row — the system's replacement for content cards.
 * Mono index number, grotesk title, supporting line, and an arrow that slides
 * on hover while a thin garnet bar wipes in from the left.
 */
export function IndexRow({
  index,
  title,
  sub,
  href,
  className,
}: {
  index: number;
  title: string;
  sub?: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-5 border-t border-line py-6 transition-colors hover:bg-card md:gap-8 md:py-7",
        className,
      )}
    >
      {/* garnet wipe bar */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
      />
      <span className="index-num w-8 flex-shrink-0 text-sm md:w-10">
        {String(index).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[22px] font-bold leading-tight tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1 md:text-[28px]">
          {title}
        </span>
        {sub && <span className="mt-1 block text-sm text-ink-muted">{sub}</span>}
      </span>
      <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
    </Link>
  );
}
