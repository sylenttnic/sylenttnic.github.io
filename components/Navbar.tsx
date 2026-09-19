"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const isWebDesign = pathname?.startsWith("/webdesign");

  interface NavItem {
    name: string;
    href: string;
    isCta?: boolean;
    external?: boolean;
  }

  const mainNavLinks: NavItem[] = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    /* The reciprocal of "Integrations" in webDesignNavLinks below, in the same
       slot: last before the CTA, so each side of the business offers a door to
       the other instead of only one direction working. Internal Link, not
       `external` — /webdesign is the same origin, so it takes the normal
       in-tab navigation rather than the other entry's target="_blank". */
    { name: "Web Design", href: "/webdesign" },
    { name: "Connect", href: "#tell-us", isCta: true },
  ];

  const webDesignNavLinks: NavItem[] = [
    { name: "About", href: "/webdesign#about" },
    { name: "Pricing", href: "/webdesign#pricing" },
    { name: "Terms", href: "/webdesign/terms" },
    { name: "Privacy", href: "/webdesign/privacy" },
    { name: "Refunds", href: "/webdesign/refunds" },
    { name: "Integrations", href: "https://sylentt.com", external: true },
    { name: "Connect", href: "#tell-us", isCta: true },
  ];

  const navLinks: NavItem[] = isWebDesign ? webDesignNavLinks : mainNavLinks;

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-paper/90 backdrop-blur-md border-b border-ink/10 shadow-soft py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link
          href={isWebDesign ? "/webdesign" : "/"}
          className="rounded-md font-serif font-bold text-xl tracking-tight text-ink transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          Sylentt <span className="text-accent">Partners</span>
        </Link>

        {/* Desktop Nav */}
        <div className={cn("hidden md:flex items-center", isWebDesign ? "space-x-5 lg:space-x-8" : "space-x-10 lg:space-x-12")}>
          {navLinks.map((link) =>
            link.isCta ? (
              <Link
                key={link.name}
                href={link.href}
                className="btn-cta px-6 py-2.5 text-xs uppercase tracking-[0.18em]"
              >
                {link.name}
              </Link>
            ) : link.external ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-sm font-sans uppercase tracking-widest text-xs text-ink/90 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="group relative rounded-sm font-sans uppercase tracking-widest text-xs text-ink/90 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={mobileButtonRef}
          className={cn(
            "md:hidden p-2 rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
            isOpen
              ? "text-paper bg-ink shadow-lg"
              : (scrolled ? "text-ink hover:bg-ink/5" : "text-ink bg-paper/80 backdrop-blur-md shadow-sm hover:bg-paper")
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-ink overflow-hidden transition-all duration-500 ease-in-out shadow-2xl",
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col p-10 space-y-6">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper font-sans font-bold uppercase tracking-[0.2em] text-sm py-3 border-b border-paper/10 transition-colors hover:text-accent focus-visible:outline-none focus-visible:text-accent"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="text-paper font-sans font-bold uppercase tracking-[0.2em] text-sm py-3 border-b border-paper/10 transition-colors hover:text-accent focus-visible:outline-none focus-visible:text-accent"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
