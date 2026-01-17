import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary py-12 text-white">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="mb-6 relative w-48 h-16">
          <Image
            src="/assets/img/logo.svg"
            alt="Sylentt Partners Logo"
            fill
            className="object-contain filter invert brightness-0"
          />
        </div>
        <div className="text-center text-white/70 text-sm">
          <p>&copy; {currentYear} Sylentt Partners. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
