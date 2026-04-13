import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Sylentt \u2014 Simple Pricing for Business Automation",
  description:
    "Explore our integration packages, from discovery calls to full implementation and operational retainers. Simple pricing with real results.",
  openGraph: {
    title: "Pricing | Sylentt \u2014 Simple Pricing for Business Automation",
    description:
      "Explore our integration packages, from discovery calls to full implementation and operational retainers. Simple pricing with real results.",
    url: "https://sylentt.com/pricing/",
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Sylentt \u2014 Simple Pricing for Business Automation",
    description:
      "Explore our integration packages, from discovery calls to full implementation and operational retainers. Simple pricing with real results.",
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
