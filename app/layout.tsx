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

const siteTitle = "Sylentt Partners | Fractional CIO for Cache Valley Companies";
const socialTitle = "An IT director, without the salary. | Sylentt Partners";
const siteDescription =
  "A part-time IT director for Cache Valley companies. Independent advice from Nic Aslett: no commissions, nothing to sell. From $1,500 a month.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sylentt.com"),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "fractional CIO Cache Valley",
    "fractional IT director Logan Utah",
    "part-time IT director",
    "AI consultant Logan Utah",
    "IT leadership Utah",
  ],
  authors: [{ name: "Sylentt Partners" }],
  robots: { index: true, follow: true },
  icons: {
    icon: "/logo-symbol.png",
  },
  openGraph: {
    title: socialTitle,
    description: siteDescription,
    type: "website",
    url: "https://sylentt.com",
    siteName: "Sylentt Partners",
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: siteDescription,
    images: ["/logo_full.png"],
  },
  alternates: {
    canonical: "https://sylentt.com/",
  },
  other: {
    // NOTE: this tag ships on EVERY page, /webdesign/ included, so it names the
    // web design plan in one sentence, the same footer-level mention the main
    // site gives it. Dropping it entirely would make /webdesign/ serve
    // machine-readable text saying the company does not do web design.
    // OWNERSHIP IS NOT THE SAME FOR BOTH, AND THIS TAG MUST NOT SAY IT IS.
    // "The client keeps everything" is true of the fractional CIO work and is
    // scoped to it below. On the web design plan we host and look after the
    // site for as long as the customer stays; those terms belong to /webdesign/
    // and its terms page, which is why the sentence here points there instead
    // of summarising them.
    "ai-content-description":
      "Sylentt Partners is Nic Aslett's fractional CIO practice in Cache Valley, Utah. Nic is the part-time IT and AI leader for companies of about 20 to 150 employees that have an IT company for day-to-day support but no one steering IT. He is independent: he sells no hardware, software or support and takes no commissions or referral fees. Work starts with a free 30-minute call. An optional two-week IT and AI assessment costs $1,500 one time and comes off the first month if the client continues. Monthly plans are Advisor ($1,500 a month, up to 8 hours) or Director ($2,500 a month, up to 16 hours), month to month with 30 days' notice. Extra hours are $150 each and only with the client's approval, and the client keeps everything Nic produces. Separately, a web design plan for local service businesses is linked from the site footer at sylentt.com/webdesign/, under its own terms.",
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
  // Emitted by the ROOT layout, so it also ships on /webdesign/. It describes
  // the main offer only; the web design plan is described by the Service node
  // in app/webdesign/layout.tsx, whose provider is this publisher's @id.
  description:
    "Fractional CIO and IT leadership for Cache Valley companies, from Nic Aslett.",
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
