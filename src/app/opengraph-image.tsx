import { ImageResponse } from "next/og";

export const alt = "OTHER/FORM — Digital experiences with a pulse";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#171a13", color: "#f0f2e9", padding: "64px", fontFamily: "sans-serif", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: "340px", height: "340px", border: "4px solid #d2ff3f", borderRadius: "50%", right: "70px", top: "70px" }} />
      <div style={{ position: "absolute", width: "230px", height: "230px", border: "2px solid #58634a", borderRadius: "50%", right: "125px", top: "125px" }} />
      <div style={{ position: "absolute", width: "52px", height: "52px", background: "#d2ff3f", borderRadius: "50%", right: "214px", top: "214px" }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", color: "#d2ff3f", fontSize: "24px", fontFamily: "monospace" }}>OTHER/FORM®</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: "108px", fontWeight: 800, letterSpacing: "-7px", lineHeight: 0.95 }}>
          <span>DIGITAL</span>
          <span>WITH A PULSE.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", color: "#d2ff3f", fontSize: "38px", fontStyle: "italic" }}>Strategy, design & creative technology</div>
          <div style={{ display: "flex", color: "#a7ac9e", fontSize: "18px", fontFamily: "monospace" }}>INDEPENDENT CREATIVE STUDIO / PARIS + WORLDWIDE</div>
        </div>
      </div>
    </div>,
    size,
  );
}
