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
  title: "Sylentt | Your business apps don't talk to each other. We fix that.",
  description:
    "Sylentt connects your business apps so your team stops manually copying data between systems. Reliable automation you own, with built-in monitoring.",
  keywords: [
    "business app integration",
    "connect QuickBooks to Jobber",
    "automate Shopify to ShipStation",
    "stop manually entering data",
    "small business automation",
    "Cache Valley Utah",
  ],
  authors: [{ name: "Sylentt" }],
  icons: {
    icon: "/logo-symbol.png",
  },
  openGraph: {
    title: "Sylentt - Your business apps don't talk to each other. We fix that.",
    description:
      "We build the connections between your business tools so data flows automatically. No monthly platform fees. You own everything.",
    type: "website",
    url: "https://sylentt.com",
    siteName: "Sylentt",
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
