import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/content";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(255,90,0,0.25), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "#f5f5f3" }}>
          <span style={{ color: "#ff5a00" }}>A</span>
          <span>DHI</span>
          <span style={{ color: "#ff5a00" }}>V</span>
          <span>EX</span>
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#9a9a97", maxWidth: 900 }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
