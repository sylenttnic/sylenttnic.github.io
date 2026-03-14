import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Sylentt - Business Automation Consultancy",
  description:
    "Sylentt is a business automation consultancy based in Cache Valley, Utah. We build custom integrations that connect your business apps.",
  openGraph: {
    title: "About | Sylentt - Business Automation Consultancy",
    description:
      "Sylentt is a business automation consultancy based in Cache Valley, Utah. We build custom integrations that connect your business apps.",
    url: "https://sylentt.com/about/",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Sylentt - Business Automation Consultancy",
    description:
      "Sylentt is a business automation consultancy based in Cache Valley, Utah. We build custom integrations that connect your business apps.",
  },
  alternates: {
    canonical: "https://sylentt.com/about/",
  },
};

export default function AboutPage() {
  return (
    <div className="w-full h-screen pt-20 bg-slate-950">
       <iframe
         src="https://nicaslett.info"
         className="w-full h-full border-none"
         title="About Nic Aslett"
       />
    </div>
  );
}
