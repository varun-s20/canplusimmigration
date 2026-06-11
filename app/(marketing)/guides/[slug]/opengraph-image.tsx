import { ImageResponse } from "next/og";
import { guides } from "@/content/guides";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default async function OG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  const industry = g?.industry ?? "Guide";
  const outcome = g?.outcome ?? "Clear answers for your immigration case.";
  const time = g?.timeToShip ?? "Varies";

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
          color: "#121110",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
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
              />
            </svg>
          </div>
          <div style={{ fontSize: 24, color: "#121110", fontWeight: 700, letterSpacing: "-0.01em" }}>
            CanPlus Immigration
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              color: "#b11226",
            }}
          >
            {`Guide · ${industry}`}
          </div>
          <div
            style={{
              fontSize: 78,
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              fontWeight: 800,
              maxWidth: 1000,
            }}
          >
            {outcome}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            fontFamily: "monospace",
            letterSpacing: "0.06em",
            color: "#6b6862",
          }}
        >
          <span>{`TIMELINE · ${time}`}</span>
          <span
            style={{
              background: "#b11226",
              color: "#ffffff",
              padding: "12px 20px",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Read the guide
          </span>
        </div>
      </div>
    ),
    size,
  );
}
