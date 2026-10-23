import { ImageResponse } from "next/og";

export const alt = "Bandesha Empire services — Your ambition. Our expertise.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ServicesOpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "48px 60px", background: "linear-gradient(120deg, #ffffff, #edf5e6)", color: "#142018" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d5e2cd", paddingBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ display: "flex", width: 48, height: 48, alignItems: "center", justifyContent: "center", borderRadius: 10, background: "#0b2115", color: "#b1e38a", fontSize: 22, fontWeight: 700 }}>BE</span>
            <span style={{ fontSize: 23, fontWeight: 700, letterSpacing: -1 }}>Bandesha Empire</span>
          </div>
          <span style={{ color: "#298731", fontSize: 15, letterSpacing: 3 }}>OUR SERVICES</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 42 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 66, lineHeight: 1.04, fontWeight: 700, letterSpacing: -4 }}>
            <span>Your ambition.</span>
            <span style={{ color: "#298731" }}>Our expertise.</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 300, padding: "28px 26px", borderRadius: 16, background: "#0b2115", color: "#ecf7e6", transform: "rotate(-4deg)" }}>
            <span style={{ fontSize: 12, letterSpacing: 2, color: "#a1ce89", marginBottom: 12 }}>CONNECTED BY DESIGN</span>
            {["Website & Experience", "Web Applications", "AI & Automation", "Shopify & Commerce", "Mobile Applications", "Connected Systems"].map((service) => (
              <div key={service} style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #2c4530", paddingBottom: 10, fontSize: 17 }}>
                <span style={{ width: 6, height: 6, borderRadius: 3, background: "#8bc866" }} />
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #d5e2cd", paddingTop: 20, fontSize: 16, color: "#626c63" }}>
          <span>Pakistan based. Working worldwide.</span>
          <span>bandeshaempire.com/services</span>
        </div>
      </div>
    ),
    size,
  );
}
