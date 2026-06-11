import { cn } from "@/lib/cn";

export type Step = {
  title: string;
  body: string;
};

type Props = {
  steps: Step[];
  className?: string;
};

export function StepList({ steps, className }: Props) {
  return (
    <ol className={cn("border-b border-line", className)}>
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="grid gap-4 border-t border-line py-6 md:grid-cols-[64px_1fr] md:gap-8 md:py-7"
        >
          <span className="index-num tabular text-sm md:text-base">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-display text-lg font-bold leading-tight tracking-tight text-ink md:text-xl">
              {s.title}
            </p>
            <p className="mt-2 max-w-[58ch] text-[15px] text-ink-muted">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
