import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { services } from "@/content/services";
import { guides } from "@/content/guides";
import { posts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "/",
    "/services",
    "/how-it-works",
    "/eligibility",
    "/guides",
    "/blog",
    "/team",
    "/about",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
    "/legal/disclaimer",
  ];
  return [
    ...routes.map((path) => ({
      url: new URL(path, SITE_URL).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...services.map((s) => ({
      url: new URL(`/services/${s.slug}`, SITE_URL).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...guides.map((g) => ({
      url: new URL(`/guides/${g.slug}`, SITE_URL).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: new URL(`/blog/${p.slug}`, SITE_URL).toString(),
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
