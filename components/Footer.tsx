import Image from "next/image";
import logo from "@/assets/img/logo.webp";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/5 py-4 text-slate-400">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="mb-2 relative w-[36rem] h-48 opacity-80 hover:opacity-100 transition-opacity">
          <Image
            src={logo}
            alt="Sylentt Partners Logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="text-center text-slate-500 text-sm">
          <p>&copy; {currentYear} Sylentt Partners. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
