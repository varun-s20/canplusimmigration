import Image from "next/image";
import { cn } from "@/lib/cn";
import mark from "../../public/canplus-mark.png";

/**
 * CanPlus Immigration brand mark — the maple-leaf emblem with the two figures,
 * lifted directly from the official logo (white background removed so it sits
 * cleanly on light and dark fields alike).
 *
 * Size it by setting a height on `className` (width follows the natural
 * ~1.2:1 aspect ratio): e.g. `className="h-9 w-auto"`.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={mark}
      alt="CanPlus Immigration"
      priority
      sizes="48px"
      className={cn("w-auto select-none", className)}
    />
  );
}
