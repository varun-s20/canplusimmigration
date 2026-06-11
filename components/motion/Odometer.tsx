"use client";

import NumberFlow from "@number-flow/react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  format?: Intl.NumberFormatOptions;
  className?: string;
};

export function Odometer({ value, prefix, suffix, format, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (inView) setShown(value);
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <NumberFlow value={shown} format={format as React.ComponentProps<typeof NumberFlow>["format"]} />
      {suffix}
    </span>
  );
}
