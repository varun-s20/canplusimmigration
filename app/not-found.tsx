import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { IndexRow } from "@/components/ui/IndexRow";

const quickLinks = [
  { href: "/services", title: "Services", sub: "Eight immigration streams we handle" },
  { href: "/how-it-works", title: "How it works", sub: "From first assessment to landing" },
  { href: "/guides", title: "Guides", sub: "Plain-English answers on each pathway" },
  { href: "/eligibility", title: "Free assessment", sub: "Estimate your Express Entry score" },
];

export const metadata = {
  title: "Page not found · CanPlus Immigration",
  description: "We can't find this page. The rest of the site still works.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-start py-20 md:py-32">
      <SectionLabel>Error 404</SectionLabel>

      <h1 className="mt-6 font-display text-[64px] font-extrabold leading-[0.9] tracking-tight text-accent sm:text-[80px] md:text-[140px]">
        404
      </h1>

      <h2 className="mt-4 max-w-[20ch] display-section break-words">
        This page is off the map.
      </h2>

      <p className="mt-5 max-w-[52ch] lede text-ink-muted">
        The link probably moved, or it never existed. Pick a destination below, the rest of the site is exactly where you left it.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/" variant="dark" size="lg">
          Back to home
        </Button>
        <Button href="/contact" variant="outline" size="lg">
          Talk to us instead
        </Button>
      </div>

      <div className="mt-16 w-full md:mt-24">
        <SectionLabel>Or jump to</SectionLabel>
        <div className="mt-6">
          {quickLinks.map((l, i) => (
            <IndexRow key={l.href} index={i + 1} title={l.title} sub={l.sub} href={l.href} />
          ))}
          <div className="rule" aria-hidden />
        </div>
      </div>
    </section>
  );
}
