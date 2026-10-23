import { ImageResponse } from "next/og";

export const alt = "Bandesha Empire pricing — Starter $500, Growth $1,000, Custom projects.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function PricingOpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "46px 60px", background: "linear-gradient(120deg, #ffffff, #edf5e6)", color: "#142018" }}>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #d5e2cd", paddingBottom: 22 }}><span style={{ fontSize: 24, fontWeight: 700, letterSpacing: -1 }}>Bandesha Empire</span><span style={{ color: "#298731", fontSize: 15, letterSpacing: 3 }}>PROJECT PRICING / USD</span></div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.02, fontWeight: 700, letterSpacing: -5 }}><span>Big ambitions.</span><span style={{ color: "#298731" }}>Clear investments.</span></div>
        <div style={{ display: "flex", gap: 16 }}>
          {[{ name: "STARTER", price: "$500" }, { name: "GROWTH", price: "$1,000" }, { name: "CUSTOM", price: "Let's talk" }].map((plan, index) => <div key={plan.name} style={{ display: "flex", flexDirection: "column", gap: 12, width: 350, border: "1px solid #cdddc2", borderRadius: 14, padding: "24px 28px", background: index === 1 ? "#0b2115" : "#ffffff", color: index === 1 ? "#d8edc8" : "#142018" }}><span style={{ fontSize: 13, letterSpacing: 2 }}>{plan.name}</span><span style={{ fontSize: 38, letterSpacing: -2 }}>{plan.price}</span></div>)}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#626c63", fontSize: 15 }}><span>Clear scope. Considered work. Yours to build on.</span><span>bandeshaempire.com/pricing</span></div>
      </div>
    ),
    size,
  );
}
