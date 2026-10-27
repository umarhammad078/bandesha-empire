import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Your Bandesha Empire workspace. Plan projects, follow milestones and keep every conversation in one place.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/portal" },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
