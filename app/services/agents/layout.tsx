import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Build Custom Integrations | Sylentt Partners",
  description:
    "Six phases of quality-controlled integration development. From discovery to continuous monitoring, see how we build reliable automation for your business.",
  openGraph: {
    title: "How We Build Custom Integrations | Sylentt Partners",
    description:
      "Six phases of quality-controlled integration development. From discovery to continuous monitoring, see how we build reliable automation for your business.",
    url: "https://sylentt.com/services/agents/",
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How We Build Custom Integrations | Sylentt Partners",
    description:
      "Six phases of quality-controlled integration development. From discovery to continuous monitoring, see how we build reliable automation for your business.",
    images: ["/logo_full.png"],
  },
  alternates: {
    canonical: "https://sylentt.com/services/agents/",
  },
};

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
