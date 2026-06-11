import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { posts, livePosts, formatPostDate } from "@/content/blog";
import { buildMetadata } from "@/lib/seo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { IndexRow } from "@/components/ui/IndexRow";
import { Prose } from "@/components/content/Prose";
import { BreadcrumbLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) return buildMetadata();
  return buildMetadata({
    title: p.title,
    description: p.excerpt,
    path: `/blog/${p.slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();

  const related = livePosts().filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      {/* Hero — dynamic eyebrow, so not PageHero. */}
      <section className="container-page pt-16 pb-10 md:pt-28 md:pb-14">
        <Reveal>
          <SectionLabel>{`${p.category} · ${formatPostDate(p.date)}`}</SectionLabel>
        </Reveal>
        <Reveal as="h1" delay={0.05} className="display-hero mt-6 max-w-[22ch]">
          {p.title}
        </Reveal>
        <Reveal as="p" delay={0.12} className="lede mt-7 max-w-[60ch] text-ink-muted">
          {p.standfirst}
        </Reveal>
        <Reveal delay={0.18} className="mt-8 inline-flex items-center gap-2 text-sm text-ink-muted">
          <Clock3 className="h-4 w-4 text-accent" />
          <span className="eyebrow">{`${p.readingMinutes} min read`}</span>
          <span className="font-display font-bold tracking-tight text-ink">{p.author}</span>
        </Reveal>
      </section>

      {/* Hero image */}
      <div className="container-page pb-4">
        <Reveal y={0} className="relative aspect-[16/9] w-full overflow-hidden rounded-[4px] bg-surface-dark md:aspect-[16/7]">
          <Image
            src={p.image}
            alt={p.imageAlt}
            fill
            priority
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover"
          />
        </Reveal>
      </div>

      {/* Body */}
      <Section space="md">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <div className="hidden md:block" />
          <Reveal delay={0.05}>
            <Prose>
              {p.sections.map((s) => (
                <div key={s.heading}>
                  <h2>{s.heading}</h2>
                  {s.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ))}
            </Prose>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section dark space="lg">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal as="h2" className="display-section text-bg">
            Have a question about your own case?
          </Reveal>
          <Reveal as="p" delay={0.05} className="mt-5 max-w-[42ch] text-base text-bg/70 md:text-lg">
            Book a consultation and an RCIC will give you an honest read on your options and the next step — with no promises about the outcome.
          </Reveal>
          <Reveal delay={0.12}>
            <Button href="/contact" variant="primary" size="lg" className="mt-8">
              Book a consultation <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* Related */}
      <Section space="md">
        <div className="flex items-end justify-between gap-6">
          <Reveal as="h2" className="display-section max-w-[20ch]">
            More from the blog.
          </Reveal>
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong underline-offset-4 hover:underline"
            >
              All posts <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-10">
          {related.map((r, i) => (
            <IndexRow
              key={r.slug}
              index={i + 1}
              title={r.title}
              sub={`${r.category} · ${formatPostDate(r.date)}`}
              href={`/blog/${r.slug}`}
            />
          ))}
          <div className="rule" aria-hidden />
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.date,
            author: { "@type": "Organization", name: "CanPlus Immigration" },
          }),
        }}
      />
      <BreadcrumbLd
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: p.title, href: `/blog/${p.slug}` },
        ]}
      />
    </>
  );
}
