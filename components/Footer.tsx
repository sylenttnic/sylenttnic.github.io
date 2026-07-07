import Image from "next/image";
import logo from "@/assets/img/logo.webp";
import { Linkedin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-paper border-t border-ink/10 py-20 text-ink/60">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="mb-10 relative w-full max-w-[22rem] h-28 opacity-60 hover:opacity-80 transition-opacity duration-500">
          <Image
            src={logo}
            alt="Sylentt Partners Logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex items-center justify-center gap-2 mb-10">
          {[
            { href: "https://www.linkedin.com/in/nic-aslett/", label: "LinkedIn", Icon: Linkedin },
            { href: "https://www.instagram.com/sylenttpartners/", label: "Instagram", Icon: Instagram },
            { href: "https://www.facebook.com/sylenttpartners/", label: "Facebook", Icon: Facebook },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full text-ink/60 transition-all hover:text-accent hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
        <div className="text-center text-sm font-sans space-y-2">
          <p>&copy; {currentYear} Sylentt Partners. All Rights Reserved.</p>
          <p>
            Based in Cache Valley, Utah &middot;{" "}
            <a
              href="mailto:contact@sylentt.com"
              className="rounded-sm underline-offset-4 transition-colors hover:text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              contact@sylentt.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
