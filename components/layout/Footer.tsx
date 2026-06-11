import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const cols = [
  {
    heading: "Services",
    links: [
      { href: "/services/permanent-residence", label: "Permanent Residence" },
      { href: "/services/work-permits", label: "Work Permits" },
      { href: "/services/study-permits", label: "Study Permits" },
      { href: "/services/complex-refused", label: "Complex & Refused" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/team", label: "Our consultants" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/guides", label: "Guides" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "Get started",
    links: [
      { href: "/eligibility", label: "Free assessment" },
      { href: "/contact", label: "Book a consultation" },
      { href: "/services", label: "All services" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/disclaimer", label: "Disclaimer" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-surface-dark text-bg" data-nav-theme="dark">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="h-10 w-auto" />
              <span className="font-display text-[17px] font-bold tracking-[-0.02em]">CanPlus Immigration</span>
            </Link>
            <p className="max-w-xs text-sm text-bg/65">
              Your Canadian future, expertly guided. Licensed immigration consultants for work, study, PR, citizenship, and complex cases.
            </p>
            <div className="flex items-center gap-2 text-xs text-bg/55">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
              RCIC-led representation
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.heading}>
              <h3 className="eyebrow mb-4">{col.heading}</h3>
              <ul className="space-y-2.5 text-sm text-bg/80">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="transition-colors hover:text-bg">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule-dark mt-14" />
        <div className="flex flex-col items-start justify-between gap-4 pt-6 text-xs text-bg/55 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} CanPlus Immigration. All rights reserved.</p>
          <p>Regulated by the CICC · RCIC-led representation</p>
        </div>
      </div>
    </footer>
  );
}
