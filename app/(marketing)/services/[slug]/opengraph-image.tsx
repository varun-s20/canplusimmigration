import { ImageResponse } from "next/og";
import { services } from "@/content/services";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function OG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const name = service?.name ?? "CanPlus Immigration";
  const tagline = service?.tagline ?? "Your Canadian future, expertly guided.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fcfcfb",
          padding: "72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 4,
              background: "#b11226",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 200 200">
              <path
                d="M100 36 l8 26 22-14-8 24 26-3-17 19 22 9-24 6 9 22-22-9-2 26-14-19-14 19-2-26-22 9 9-22-24-6 22-9-17-19 26 3-8-24 22 14z"
                fill="#ffffff"
                stroke="#c41429"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div style={{ fontSize: 24, color: "#121110", fontWeight: 700, letterSpacing: "-0.01em" }}>
            CanPlus Immigration
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6b6862",
            }}
          >
            <span style={{ width: 28, height: 4, background: "#b11226" }} />
            <span>{`Service · ${name}`}</span>
          </div>
          <div
            style={{
              fontSize: 84,
              lineHeight: 0.98,
              color: "#121110",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              maxWidth: 1000,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #e9e8e4",
            paddingTop: 28,
            fontSize: 18,
            letterSpacing: 1,
            color: "#6b6862",
          }}
        >
          <span>{`canplusimmigration.com/services/${slug}`}</span>
          <span
            style={{
              background: "#b11226",
              color: "#ffffff",
              padding: "12px 20px",
              borderRadius: 4,
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: 0,
            }}
          >
            Book a consultation
          </span>
        </div>
      </div>
    ),
    size,
  );
}
