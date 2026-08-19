import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simple Pricing for Business Automation | Sylentt Partners",
  description:
    "Explore Sylentt Partners integration packages, from discovery strategy sessions to custom implementation and operational retainers. Clear pricing, client code ownership.",
  openGraph: {
    title: "Simple Pricing for Business Automation | Sylentt Partners",
    description:
      "Explore Sylentt Partners integration packages, from discovery strategy sessions to custom implementation and operational retainers. Clear pricing, client code ownership.",
    url: "https://sylentt.com/pricing/",
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple Pricing for Business Automation | Sylentt Partners",
    description:
      "Explore Sylentt Partners integration packages, from discovery strategy sessions to custom implementation and operational retainers. Clear pricing, client code ownership.",
    images: ["/logo_full.png"],
  },
  alternates: {
    canonical: "https://sylentt.com/pricing/",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
