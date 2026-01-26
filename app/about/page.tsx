import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Sylentt Partners",
  description: "Learn more about us.",
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
