import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "ghost" | "outline" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-[3px] font-medium transition-colors duration-200 select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent-hover",
  dark: "bg-surface-dark text-bg hover:bg-surface-dark-2",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  outline: "border border-ink/20 bg-transparent text-ink hover:bg-ink/[0.04]",
  // Text link with an underline that draws in on hover.
  link: "!rounded-none !px-0 !h-auto bg-transparent text-accent-strong [box-shadow:inset_0_-1px_0_color-mix(in_srgb,var(--color-accent-strong)_30%,transparent)] hover:[box-shadow:inset_0_-2px_0_var(--color-accent-strong)]",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
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
