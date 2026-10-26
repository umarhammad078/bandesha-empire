import { ImageResponse } from "next/og";

export const alt = "Bandesha Empire portfolio — Good ideas. Built to work.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function PortfolioOpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "48px 60px", background: "linear-gradient(115deg, #f9fbf6, #e4f2da)", color: "#142018" }}>
      <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 22, borderBottom: "1px solid #c6d8bb", fontSize: 23 }}><span style={{ fontWeight: 700 }}>Bandesha Empire</span><span style={{ color: "#298731", fontSize: 18 }}>SELECTED WORK / PORTFOLIO</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 100, fontWeight: 700, lineHeight: .98, letterSpacing: -7 }}><span>Good ideas.</span><span style={{ color: "#298731" }}>Built to work.</span></div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>{["AI & Automation", "Websites", "Shopify", "Client Portals", "Workflows", "Integrations"].map((label) => <span key={label} style={{ display: "flex", padding: "13px 18px", border: "1px solid #bfd3b3", borderRadius: 8, background: "#ffffff", fontSize: 18 }}>{label}</span>)}</div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#566d4c", fontSize: 16 }}><span>Six concept builds. One connected approach.</span><span>bandeshaempire.com/portfolio</span></div>
    </div>, size,
  );
}
