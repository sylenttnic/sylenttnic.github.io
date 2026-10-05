import type { Metadata } from "next";

const pageTitle = "Fractional CIO Pricing | Sylentt Partners";
const pageDescription =
  "Published, fixed prices: a $1,500 IT and AI assessment, then Advisor at $1,950/month or Director at $3,500/month. Month-to-month, 30 days' notice.";

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
