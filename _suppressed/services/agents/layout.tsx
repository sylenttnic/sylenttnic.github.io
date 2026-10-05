import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Build Custom App Integrations | Sylentt Partners",
  description:
    "Explore Sylentt Partners structured 6-phase engineering build process: discovery, design blueprinting, automated testing, independent security review, staging deployment, and monitoring.",
  openGraph: {
    title: "How We Build Custom App Integrations | Sylentt Partners",
    description:
      "Explore Sylentt Partners structured 6-phase engineering build process: discovery, design blueprinting, automated testing, independent security review, staging deployment, and monitoring.",
    url: "https://sylentt.com/services/agents/",
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How We Build Custom App Integrations | Sylentt Partners",
    description:
      "Explore Sylentt Partners structured 6-phase engineering build process: discovery, design blueprinting, automated testing, independent security review, staging deployment, and monitoring.",
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
