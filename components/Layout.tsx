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
  // The floating chat is OFF everywhere. Its replies come from the bot on
  // intake.sylentt.com/chat, whose script lives on that server, not in this
  // repo, and it was written to sell business-app integration. Leave this
  // false until that script describes the fractional CIO offer; then set it
  // to true. The /webdesign pages never show the chat either way: they have
  // their own request flow.
  const CHAT_ENABLED = false;
  const hideChat = !CHAT_ENABLED || (pathname?.startsWith('/webdesign') ?? false);

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
