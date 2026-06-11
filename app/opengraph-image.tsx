import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CanPlus Immigration. Your Canadian future, expertly guided.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
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

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 88,
              lineHeight: 0.98,
              color: "#121110",
              letterSpacing: "-0.03em",
              fontWeight: 800,
              maxWidth: 1000,
            }}
          >
            Your Canadian future,{" "}
            <span style={{ color: "#c41429" }}>expertly</span> guided.
          </div>
          <div style={{ fontSize: 24, color: "#6b6862", maxWidth: 900, fontWeight: 500 }}>
            Licensed Canadian immigration consultants for work, study, PR, citizenship, and complex cases.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            color: "#6b6862",
          }}
        >
          <span>canplusimmigration.com</span>
          <span>RCIC-led · Regulated by the CICC</span>
        </div>
      </div>
    ),
    size,
  );
}
