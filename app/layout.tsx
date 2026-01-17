import type { Metadata } from "next";
import { Catamaran } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Layout from "@/components/Layout";

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-catamaran",
});

const circular = localFont({
  src: [
    {
      path: "../public/assets/fonts/CircularStd-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/CircularStd-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/CircularStd-BookItalic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-circular",
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
        className={`${circular.variable} ${catamaran.variable} font-sans antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
