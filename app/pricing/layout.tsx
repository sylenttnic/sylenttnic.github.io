import type { Metadata } from "next";
import { PRICING_SUMMARY } from "@/lib/offer";

const pageTitle = "Fractional CIO Pricing | Sylentt Partners";
const pageDescription = PRICING_SUMMARY;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://sylentt.com/pricing/",
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
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
