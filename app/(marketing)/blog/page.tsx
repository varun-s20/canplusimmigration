import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { BreadcrumbLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { livePosts, formatPostDate } from "@/content/blog";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Plain-English commentary on Canadian immigration: Express Entry draws, study permits, provincial nominee programs, family sponsorship, and policy changes that affect your case.",
  path: "/blog",
});

export default function BlogPage() {
  const all = livePosts();

  return (
    <>
      <PageHero
        label="Blog"
        title="Notes on Canadian immigration, written by the people who do the files."
        lede="Policy changes, pathway breakdowns, and the practical details that decide cases — explained without the jargon and without the false promises."
      />

      <Section space="md">
        <Stagger className="grid gap-x-8 gap-y-12 md:grid-cols-2" step={0.06}>
          {all.map((p) => (
            <StaggerItem key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group flex flex-col gap-5">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[4px] bg-surface-dark">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(min-width: 768px) 600px, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                </div>
                <div className="min-w-0">
                  <span className="eyebrow text-ink-muted">
                    {`${p.category} · ${formatPostDate(p.date)} · ${p.readingMinutes} min read`}
                  </span>
                  <h2 className="mt-3 font-display text-[24px] font-bold leading-tight tracking-tight text-ink transition-colors group-hover:text-accent md:text-[28px]">
                    {p.title}
                  </h2>
                  <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-ink-muted">
                    {p.excerpt}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong">
                    Read post
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <BreadcrumbLd
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />
    </>
  );
}
