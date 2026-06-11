import { SITE_URL, SITE_NAME } from "@/lib/seo";

type BreadcrumbCrumb = { name: string; href: string };

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Output is server-rendered and not user-controlled, so HTML injection here is safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.svg`,
        sameAs: [],
      }}
    />
  );
}

export function WebSiteLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      }}
    />
  );
}

export function BreadcrumbLd({ crumbs }: { crumbs: BreadcrumbCrumb[] }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: new URL(c.href, SITE_URL).toString(),
        })),
      }}
    />
  );
}

export function FAQPageLd({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
      }}
    />
  );
}
