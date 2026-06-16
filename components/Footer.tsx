import Image from "next/image";
import logo from "@/assets/img/logo.webp";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-paper border-t border-ink/5 py-16 text-ink/60">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="mb-8 relative w-full max-w-[24rem] h-32 opacity-50 hover:opacity-70 transition-opacity">
          <Image
            src={logo}
            alt="Sylentt Partners Logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="text-center text-sm font-sans space-y-2">
          <p>&copy; {currentYear} Sylentt Partners. All Rights Reserved.</p>
          <p>
            Based in Cache Valley, Utah &middot;{" "}
            <a href="mailto:contact@sylentt.com" className="hover:text-ink transition-colors">
              contact@sylentt.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
