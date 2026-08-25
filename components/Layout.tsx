'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './ui/BackToTop';
import FloatingChatButton from './ui/FloatingChatButton';
import ChatAgent from './home/ChatAgent';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
      <FloatingChatButton />
      <ChatAgent />
    </div>
  );
}
