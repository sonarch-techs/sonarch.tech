import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SONARCHTECH | Web Apps, Systems Design & AEO Architecture";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#040404",
          padding: "64px",
          fontFamily: "monospace",
          border: "2px solid #1f1f1f",
          position: "relative",
        }}
      >
        {/* Ambient Mint Radial Bloom */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "500px",
            height: "500px",
            backgroundColor: "rgba(0, 200, 150, 0.12)",
            filter: "blur(120px)",
            borderRadius: "50%",
          }}
        />

        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "#1f1f1f",
                border: "1px solid rgba(0, 200, 150, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00c896",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              ▲
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: "bold", color: "#ffffff", letterSpacing: "2px" }}>
                SONARCH<span style={{ color: "#00c896" }}>TECH</span>
              </span>
              <span style={{ fontSize: "12px", color: "#888888", letterSpacing: "3px" }}>
                SYSTEMS & AEO ARCHITECTURE
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "8px 18px",
              borderRadius: "20px",
              border: "1px solid #1f1f1f",
              backgroundColor: "rgba(31, 31, 31, 0.6)",
              color: "#00c896",
              fontSize: "13px",
              letterSpacing: "1px",
            }}
          >
            ● ALL SYSTEMS NOMINAL
          </div>
        </div>

        {/* Center Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "900px" }}>
          <h1
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Engineering High-Performance Digital Products & AI Search Dominance.
          </h1>
          <p style={{ fontSize: "20px", color: "#a3a3a3", marginTop: "20px", lineHeight: 1.4 }}>
            Next.js App Router • Autonomous Pipelines • Semantic Knowledge Graphs
          </p>
        </div>

        {/* Bottom Telemetry Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #1f1f1f",
            paddingTop: "24px",
            fontSize: "14px",
            color: "#737373",
          }}
        >
          <div style={{ display: "flex", gap: "28px" }}>
            <span>LCP: &lt;400ms</span>
            <span>Uptime: 99.99%</span>
            <span>AEO Citation: Top 1%</span>
          </div>
          <span style={{ color: "#00c896" }}>sonarch.tech // 2026</span>
        </div>
      </div>
    ),
    { ...size }
  );
}