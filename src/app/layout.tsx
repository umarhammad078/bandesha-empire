import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://bandeshaempire.com";
const TITLE = "Bandesha Empire — Websites, Automation & Connected Systems";
const DESCRIPTION =
  "Bandesha Empire designs high-performance websites, intelligent automations and custom digital systems that make ambitious businesses easier to run, scale and improve.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Bandesha Empire",
  },
  description: DESCRIPTION,
  applicationName: "Bandesha Empire",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Bandesha Empire",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/bandesha-empire-mark.png",
        width: 518,
        height: 502,
        alt: "Bandesha Empire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/bandesha-empire-mark.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Bandesha Empire",
  url: SITE_URL,
  description: DESCRIPTION,
  areaServed: "Worldwide",
  serviceType: [
    "AI Automation",
    "Website Development",
    "Web Application Development",
    "Custom Integrations",
    "Digital Products",
    "Ongoing Support",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <script
          type="application/ld+json"
          // Truthful ProfessionalService data only — no address, phone,
          // founders, ratings or social profiles are asserted.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
