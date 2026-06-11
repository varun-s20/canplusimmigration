import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "ghost" | "outline" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-[3px] font-medium select-none whitespace-nowrap " +
  "transition-[transform,background-color,box-shadow,color,border-color] duration-200 [transition-timing-function:var(--ease-out)] " +
  // Tactile press: lift on hover, scale down on press so the button feels heard.
  "motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97] motion-reduce:transform-none " +
  // Any icon in the label nudges forward on hover — one consistent micro-interaction.
  "[&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:[transition-timing-function:var(--ease-out)] motion-safe:hover:[&_svg]:translate-x-0.5";

const variants: Record<Variant, string> = {
  // Premium primary: burgundy field with a soft burgundy-tinted lift on hover.
  primary:
    "bg-accent text-accent-ink shadow-[var(--shadow-lift)] hover:bg-accent-hover hover:shadow-[0_22px_50px_-20px_rgba(68,17,26,0.55)]",
  dark: "bg-surface-dark text-bg shadow-[var(--shadow-card)] hover:bg-surface-dark-2",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  outline: "border border-ink/15 bg-transparent text-ink hover:border-ink/25 hover:bg-ink/[0.03]",
  // Text link with an underline that draws in on hover.
  link: "!rounded-none !px-0 !h-auto bg-transparent text-accent-strong [box-shadow:inset_0_-1px_0_color-mix(in_srgb,var(--color-accent-strong)_30%,transparent)] hover:[box-shadow:inset_0_-2px_0_var(--color-accent-strong)]",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-5 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-[3.25rem] px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a href={props.href} className={classes} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
