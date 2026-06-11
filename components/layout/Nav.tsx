"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const links = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  // Over a full-bleed dark hero (the home video), the bar goes transparent with
  // light text so the footage reads edge to edge; once scrolled past it, the bar
  // returns to its solid ivory style. Default solid on every route except a page
  // that actually has a `[data-hero]`, so light pages never get white-on-white.
  const [solid, setSolid] = useState(pathname !== "/");

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Watch the hero: transparent while it sits under the bar, solid once it
  // scrolls above the bar line (rootMargin pulls the trigger to the nav height).
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) {
      setSolid(true);
      return;
    }
    const navH =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
        10,
      ) || 88;
    const io = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { rootMargin: `-${navH}px 0px 0px 0px`, threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  // Lock body scroll while open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-colors duration-300 [transition-timing-function:var(--ease-out)]",
          solid
            ? "border-line bg-bg/85 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
        style={{ height: "var(--nav-h)" }}
      >
        <div className="container-page flex h-full items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2.5 transition-colors",
              solid ? "text-ink" : "text-accent-ink",
            )}
            aria-label="CanPlus Immigration home"
          >
            <Logo className="h-9 w-auto md:h-10" />
            <span className="font-display text-[16px] font-bold tracking-[-0.02em] md:text-[17px]">
              CanPlus Immigration
            </span>
          </Link>

          {/* Desktop links */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {links.map((l) => {
                const isHashLink = l.href.includes("#");
                const isActive = !isHashLink && pathname.startsWith(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group/nav relative inline-flex items-center font-sans text-[14px] tracking-tight transition-colors",
                        solid
                          ? isActive
                            ? "text-ink"
                            : "text-ink-muted hover:text-ink"
                          : isActive
                            ? "text-accent-ink"
                            : "text-accent-ink/75 hover:text-accent-ink",
                      )}
                    >
                      {l.label}
                      {/* maple underbar: solid when active, draws in from the left on hover */}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -bottom-2 left-0 h-[2px] w-full origin-left bg-accent-strong transition-transform duration-300 [transition-timing-function:var(--ease-out)]",
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover/nav:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3 md:gap-5">
            <Link
              href="/contact"
              className={cn(
                "link-underline hidden font-sans text-[14px] transition-colors sm:inline-flex",
                solid
                  ? "text-ink-muted hover:text-ink"
                  : "text-accent-ink/80 hover:text-accent-ink",
              )}
            >
              Contact
            </Link>
            <Button href="/eligibility" variant="primary" size="sm" className="hidden md:inline-flex">
              Free assessment
            </Button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(true)}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-[3px] transition-colors md:hidden",
                solid
                  ? "text-ink hover:bg-ink/[0.06]"
                  : "text-accent-ink hover:bg-accent-ink/10",
              )}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer, radial wipe from the hamburger corner */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            initial={
              reduced ? { opacity: 0 } : { clipPath: "circle(0% at 100% 0%)" }
            }
            animate={
              reduced ? { opacity: 1 } : { clipPath: "circle(150% at 100% 0%)" }
            }
            exit={
              reduced ? { opacity: 0 } : { clipPath: "circle(0% at 100% 0%)" }
            }
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-surface-dark text-bg md:hidden"
          >
            <div
              className="container-page flex items-center justify-between"
              style={{ height: "var(--nav-h)" }}
            >
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 text-bg"
                aria-label="CanPlus Immigration home"
              >
                <Logo className="h-9 w-auto" />
                <span className="font-display text-[16px] font-bold tracking-[-0.02em]">
                  CanPlus Immigration
                </span>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-[3px] text-bg transition-colors hover:bg-bg/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <motion.div
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="container-page pt-6"
            >
              <ul className="space-y-1">
                {links.map((l) => {
                  const isActive = pathname.startsWith(l.href);
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className={cn(
                          "flex items-center justify-between border-b border-bg/10 py-5 font-display text-3xl font-bold tracking-[-0.03em]",
                          isActive ? "text-bg" : "text-bg/65",
                        )}
                      >
                        <span>{l.label}</span>
                        {isActive && (
                          <span aria-hidden className="h-6 w-[3px] bg-accent-strong" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-10 grid gap-3">
                <Button href="/eligibility" variant="primary" size="lg">
                  Free assessment
                </Button>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-[3px] border border-bg/20 px-5 py-3 text-sm font-medium text-bg/85 transition-colors hover:bg-bg/[0.06]"
                >
                  Contact us
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
