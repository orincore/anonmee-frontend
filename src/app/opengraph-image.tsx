import { ImageResponse } from "next/og";

export const alt = "Anonmee: Anonymous Dating, Friendship & Stranger Chat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated dynamically on request. Matches the sticker poster theme and highlights all core verticals.
export default async function OpengraphImage() {
  "use cache";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#3b4bff",
          color: "#f6f7ff",
          padding: 68,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 60, fontWeight: 900 }}>
            anon
            <span
              style={{
                marginLeft: 12,
                background: "#ffa07e",
                color: "#14111c",
                padding: "2px 20px",
                borderRadius: 16,
                border: "4px solid #14111c",
                transform: "rotate(-3deg)",
              }}
            >
              mee
            </span>
          </div>
          <div
            style={{
              background: "#14111c",
              color: "#f6f7ff",
              padding: "8px 24px",
              borderRadius: 999,
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Adults 18+ Only
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 1.05, fontWeight: 900 }}>
          <span>Dating. Friendship.</span>
          <span style={{ color: "#ffa07e" }}>Talk to strangers.</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 28, color: "#f6f7ff" }}>
          <span>Zero photo bias • Pure intent matching • 100% Free text chat</span>
          <span style={{ background: "#ffa07e", color: "#14111c", padding: "6px 20px", borderRadius: 12, fontWeight: 800 }}>
            anonmee.in
          </span>
        </div>
      </div>
    ),
    size,
  );
}
