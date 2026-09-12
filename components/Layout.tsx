'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './ui/BackToTop';
import FloatingChatButton from './ui/FloatingChatButton';
import ChatAgent from './home/ChatAgent';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  // The floating chat bubble is Sylentt's integration-sales assistant. The
  // /webdesign preview pages have their own request flow and should not offer
  // it, so suppress it there only — it stays on every other page of the site.
  const hideChat = pathname?.startsWith('/webdesign') ?? false;

  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-paper focus:font-bold focus:rounded focus:outline-none focus:ring-2 focus:ring-ink"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
      <BackToTop />
      {!hideChat && <FloatingChatButton />}
      {!hideChat && <ChatAgent />}
    </div>
  );
}
