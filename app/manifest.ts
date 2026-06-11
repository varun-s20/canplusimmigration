import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CanPlus Immigration",
    short_name: "CanPlus",
    description:
      "Licensed Canadian immigration consultants for work, study, PR, citizenship, and complex cases. Book a free eligibility assessment.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfcfb",
    theme_color: "#b11226",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
