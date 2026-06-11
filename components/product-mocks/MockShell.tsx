import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Kind = "browser" | "app" | "phone" | "call";

type Props = {
  kind: Kind;
  title?: string;
  subtitle?: string;
  trailing?: ReactNode;
  footer?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
};

/**
 * Adds a complete window/app/phone chrome around a product mock so it reads
 * as a full screenshot rather than a cropped strip.
 */
export function MockShell({
  kind,
  title,
  subtitle,
  trailing,
  footer,
  tone = "light",
  className,
  children,
}: Props) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden",
        dark ? "bg-surface-dark text-bg" : "bg-card text-ink",
        className,
      )}
    >
      <Chrome
        kind={kind}
        title={title}
        subtitle={subtitle}
        trailing={trailing}
        tone={tone}
      />
      <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
      {footer && (
        <div
          className={cn(
            "border-t px-4 py-2.5 text-[11px]",
            dark
              ? "border-bg/10 text-bg/55"
              : "border-line text-ink/55",
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

function Chrome({
  kind,
  title,
  subtitle,
  trailing,
  tone,
}: {
  kind: Kind;
  title?: string;
  subtitle?: string;
  trailing?: ReactNode;
  tone: "light" | "dark";
}) {
  const dark = tone === "dark";
  const borderCls = dark ? "border-bg/10" : "border-line";
  const subCls = dark ? "text-bg/55" : "text-ink/55";

  if (kind === "browser") {
    return (
      <div className={cn("flex items-center gap-3 border-b px-3 py-2.5", borderCls)}>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/85" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/85" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/85" />
        </div>
        <div
          className={cn(
            "ml-1 flex h-6 flex-1 items-center gap-1.5 rounded-md px-2.5 text-[11px]",
            dark ? "bg-bg/10 text-bg/75" : "bg-ink/[0.05] text-ink/65",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {title || "launch.example.com"}
        </div>
        {trailing}
      </div>
    );
  }

  if (kind === "phone") {
    // Mobile messaging app header: avatar + name + status
    return (
      <div className={cn("flex items-center justify-between border-b px-4 py-3", borderCls)}>
        <div className="flex items-center gap-2.5">
          {trailing}
          <div className="leading-tight">
            <p className={cn("text-[13px] font-semibold", dark ? "text-bg" : "text-ink")}>
              {title}
            </p>
            {subtitle && <p className={cn("text-[10.5px]", subCls)}>{subtitle}</p>}
          </div>
        </div>
        <span className={cn("text-[10.5px] uppercase tracking-wider", subCls)}>
          {kind === "phone" ? "WhatsApp" : ""}
        </span>
      </div>
    );
  }

  if (kind === "call") {
    return (
      <div className={cn("flex items-center justify-between border-b px-4 py-3", borderCls)}>
        <div className="flex items-center gap-2">
          <span className="grid h-3 w-3 place-items-center">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          </span>
          <span className={cn("text-[11px] font-medium uppercase tracking-wider", dark ? "text-bg/80" : "text-ink/75")}>
            On call · {subtitle ?? "01:42"}
          </span>
        </div>
        {trailing}
      </div>
    );
  }

  // Default: "app"
  return (
    <div className={cn("flex items-center justify-between border-b px-4 py-3", borderCls)}>
      <div className="flex items-center gap-2.5">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-surface-dark text-bg">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        <div className="leading-tight">
          {title && <p className={cn("text-[12.5px] font-semibold", dark ? "text-bg" : "text-ink")}>{title}</p>}
          {subtitle && <p className={cn("text-[10.5px]", subCls)}>{subtitle}</p>}
        </div>
      </div>
      {trailing}
    </div>
  );
}
