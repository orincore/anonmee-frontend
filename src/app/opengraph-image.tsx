import { ImageResponse } from "next/og";

export const alt = "Anonmee: talk to strangers, stay anonymous";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated on request, so no image file is ever stored. Same colours as the site.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#3b4bff", color: "#f6f7ff", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 56, fontWeight: 800 }}>
          anon
          <span style={{ marginLeft: 10, background: "#ffa07e", color: "#14111c", padding: "0 16px", borderRadius: 14, border: "4px solid #14111c" }}>mee</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 120, lineHeight: 1, fontWeight: 800 }}>
          <span>Talk to strangers.</span>
          <span>Stay anonymous.</span>
        </div>
        <div style={{ fontSize: 34 }}>Only gender and age are ever shown. Adults 18+.</div>
      </div>
    ),
    size,
  );
}
