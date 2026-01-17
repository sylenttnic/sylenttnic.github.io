import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sylentt Partners | Smart Automation & Workplace Optimization",
  description:
    "Transform your business with Sylentt Partners. Experts in smart automation, workflow optimization, digital transformation, and technology integration.",
  keywords: [
    "smart automation",
    "workflow optimization",
    "digital transformation",
    "workplace efficiency",
    "business process automation",
  ],
  authors: [{ name: "Sylentt Partners" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jakarta.variable} font-sans antialiased bg-slate-950 text-slate-300 selection:bg-primary/30 selection:text-white`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
