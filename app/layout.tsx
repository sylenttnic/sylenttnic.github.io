import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif, Instrument_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { ChatProvider } from "@/lib/context/ChatContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
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
  title: "Sylentt Partners | Business App Integration for Small Businesses",
  description:
    "Sylentt Partners connects your business apps so your team stops being the copy-paste layer. Custom integrations you own. Based in Cache Valley, Utah.",
  keywords: [
    "business app integration",
    "connect QuickBooks to Jobber",
    "automate Shopify to ShipStation",
    "stop manually entering data",
    "small business automation",
    "Cache Valley Utah",
  ],
  authors: [{ name: "Sylentt Partners" }],
  robots: { index: true, follow: true },
  icons: {
    icon: "/logo-symbol.png",
  },
  openGraph: {
    title: "Sylentt Partners | Your business apps don't talk to each other. We fix that.",
    description:
      "Sylentt Partners connects your business apps so your team stops being the copy-paste layer. Custom integrations you own. Based in Cache Valley, Utah.",
    type: "website",
    url: "https://sylentt.com",
    siteName: "Sylentt Partners",
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sylentt Partners | Your business apps don't talk to each other. We fix that.",
    description:
      "Sylentt Partners connects your business apps so your team stops being the copy-paste layer. Custom integrations you own. Based in Cache Valley, Utah.",
    images: ["/logo_full.png"],
  },
  alternates: {
    canonical: "https://sylentt.com/",
  },
  other: {
    "ai-content-description":
      "Sylentt Partners is a business app integration consultancy based in Cache Valley, Utah. We build custom connections between business tools like Shopify, QuickBooks, Stripe, and HubSpot. Clients own everything we build.",
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
        className={`${plusJakartaSans.variable} ${instrumentSerif.variable} ${instrumentSans.variable} ${spaceMono.variable} font-sans antialiased bg-paper text-[#3A332B] selection:bg-primary/30 selection:text-[#211C17]`}
      >
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VEJHL7CN64"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VEJHL7CN64');
            `,
          }}
        />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W9N6FDH6');`,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W9N6FDH6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ChatProvider>
          <Layout>{children}</Layout>
        </ChatProvider>
      </body>
    </html>
  );
}
