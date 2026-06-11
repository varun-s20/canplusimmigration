import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { children: ReactNode; className?: string };

/**
 * Editorial-style typography container for long-form content.
 * Use inside pages that mostly read top-to-bottom (about, legal, playbook body).
 * Aligned to Maple Noir: grotesk headings, Inter body, garnet links, flat rules.
 */
export function Prose({ children, className }: Props) {
  return (
    <div
      className={cn(
        "max-w-[68ch] text-[17px] leading-[1.65] text-ink-soft",
        "[&_h2]:font-display [&_h2]:mt-12 [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:leading-[1.0] [&_h2]:tracking-tight [&_h2]:text-ink md:[&_h2]:text-[34px]",
        "[&_h3]:font-display [&_h3]:mt-9 [&_h3]:text-[22px] [&_h3]:font-bold [&_h3]:leading-[1.05] [&_h3]:tracking-tight [&_h3]:text-ink md:[&_h3]:text-[24px]",
        "[&_p]:mt-4",
        "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:marker:text-accent",
        "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_ol]:marker:text-ink-muted",
        "[&_a]:text-accent-strong [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-accent-strong/40 hover:[&_a]:decoration-accent-strong",
        "[&_strong]:font-semibold [&_strong]:text-ink",
        "[&_code]:font-mono [&_code]:rounded-[3px] [&_code]:bg-ink/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em]",
        "[&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_blockquote]:text-ink-soft",
        "[&_hr]:my-10 [&_hr]:border-line",
        className,
      )}
    >
      {children}
    </div>
  );
}
