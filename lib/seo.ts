import type { Metadata } from "next";

const SITE_NAME = "CanPlus Immigration";
const SITE_URL = "https://canplusimmigration.com";
const DEFAULT_DESCRIPTION =
  "Licensed Canadian immigration consultants for work permits, study permits, PR, citizenship, and complex or refused cases. Book a free eligibility assessment.";

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image,
}: SeoInput = {}): Metadata {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME}. Your Canadian future, expertly guided.`;
  const url = new URL(path, SITE_URL).toString();
  const ogImage = image ?? "/opengraph-image";

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: "/canplus-mark.png", type: "image/png" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: "/canplus-mark.png",
    },
  };
}

export { SITE_NAME, SITE_URL };
