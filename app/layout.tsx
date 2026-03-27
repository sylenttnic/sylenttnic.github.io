import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sylentt.com"),
  title: "Sylentt | Business App Integration for Small Businesses",
  description:
    "Sylentt connects your business apps so your team stops being the copy-paste layer. Custom integrations you own. Based in Cache Valley, Utah.",
  keywords: [
    "business app integration",
    "connect QuickBooks to Jobber",
    "automate Shopify to ShipStation",
    "stop manually entering data",
    "small business automation",
    "Cache Valley Utah",
  ],
  authors: [{ name: "Sylentt" }],
  robots: { index: true, follow: true },
  icons: {
    icon: "/logo-symbol.png",
  },
  openGraph: {
    title: "Sylentt | Your business apps don't talk to each other. We fix that.",
    description:
      "Sylentt connects your business apps so your team stops being the copy-paste layer. Custom integrations you own. Based in Cache Valley, Utah.",
    type: "website",
    url: "https://sylentt.com",
    siteName: "Sylentt",
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sylentt | Your business apps don't talk to each other. We fix that.",
    description:
      "Sylentt connects your business apps so your team stops being the copy-paste layer. Custom integrations you own. Based in Cache Valley, Utah.",
    images: ["/logo_full.png"],
  },
  alternates: {
    canonical: "https://sylentt.com/",
  },
  other: {
    "ai-content-description":
      "Sylentt is a business app integration consultancy based in Cache Valley, Utah. We build custom connections between business tools like Shopify, QuickBooks, Stripe, and HubSpot. Clients own everything we build.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jakarta.variable} ${spaceMono.variable} font-sans antialiased bg-slate-950 text-slate-300 selection:bg-primary/30 selection:text-white`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
