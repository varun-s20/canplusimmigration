"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export type FAQItem = {
  q: string;
  a: string;
};

type Props = {
  items: FAQItem[];
  className?: string;
};

export function FAQ({ items, className }: Props) {
  return (
    <div className={cn("border-b border-line", className)}>
      {items.map((item, i) => (
        <Row key={item.q} item={item} initiallyOpen={i === 0} />
      ))}
    </div>
  );
}

function Row({ item, initiallyOpen }: { item: FAQItem; initiallyOpen?: boolean }) {
  const [open, setOpen] = useState(!!initiallyOpen);
  const reduced = useReducedMotion();
  return (
    <div className="border-t border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-start justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-[18px] font-bold leading-tight tracking-tight text-ink md:text-[20px]">
          {item.q}
        </span>
        <span
          className={cn(
            "mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-[3px] border transition-colors",
            open
              ? "border-accent bg-accent text-accent-ink"
              : "border-line text-ink group-hover:border-ink/40",
          )}
        >
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="max-w-[60ch] pb-7 text-[15px] leading-relaxed text-ink-muted">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
