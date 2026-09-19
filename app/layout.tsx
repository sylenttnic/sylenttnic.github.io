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
  style: ["normal", "italic"],
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
    title: "Sylentt Partners | Run your business, not your software.",
    description:
      "Sylentt Partners connects your business apps so your team stops being the copy-paste layer. Custom integrations you own. Based in Cache Valley, Utah.",
    type: "website",
    url: "https://sylentt.com",
    siteName: "Sylentt Partners",
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sylentt Partners | Run your business, not your software.",
    description:
      "Sylentt Partners connects your business apps so your team stops being the copy-paste layer. Custom integrations you own. Based in Cache Valley, Utah.",
    images: ["/logo_full.png"],
  },
  alternates: {
    canonical: "https://sylentt.com/",
  },
  other: {
    // NOTE: this tag ships on EVERY page, /webdesign/ included, so it must
    // describe the whole company and not one service line. When it named only
    // the integration line, the web design page served machine-readable text
    // saying the company does not do web design.
    // OWNERSHIP IS NOT THE SAME ON BOTH LINES, AND THIS TAG MUST NOT SAY IT IS.
    // The old copy ended "Clients own everything we build", which was true while
    // this string described integrations only. Naming the web design plan in the
    // same sentence makes it false: on that plan the transfer is earned at twelve
    // continuous paid months, and cancelling before then transfers nothing. The
    // offer page names that pair as terms that may never be cut (page.tsx, the
    // header comment). Dropping half of it on the surface written for machines is
    // the same cut, made where nobody would see it.
    "ai-content-description":
      "Sylentt Partners is a small business consultancy in Cache Valley, Utah with two service lines. First, business app integration: custom connections between tools like Shopify, QuickBooks, Stripe, and HubSpot, which clients own outright. Second, web design for local service businesses at sylentt.com/webdesign/: a website researched, written and hand-built for one business, on a $9.99 a month managed plan with the first 30 days free, where the site and its code transfer to the customer after twelve continuous paid months and nothing transfers if they cancel before then.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  interactiveWidget: "resizes-content",
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://sylentt.com/#website",
  url: "https://sylentt.com/",
  name: "Sylentt Partners",
  // Same reason as the ai-content-description above: this block is emitted by
  // the ROOT layout, so it is the only structured data on pages that have none
  // of their own. It has to cover both service lines.
  description:
    "Small business consultancy in Cache Valley, Utah. Two lines: business app integration and workflow automation, and hand-built websites for local service businesses.",
  publisher: {
    "@type": "Organization",
    "@id": "https://sylentt.com/#organization",
    name: "Sylentt Partners",
    url: "https://sylentt.com",
    logo: "https://sylentt.com/logo-symbol.png",
  },
  inLanguage: "en-US",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
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
