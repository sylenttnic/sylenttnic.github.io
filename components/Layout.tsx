'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
// import Chatbot from './Chatbot';
import BackToTop from './ui/BackToTop';
import FloatingChatButton from './ui/FloatingChatButton';
import ChatAgent from './home/ChatAgent';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BackToTop />
      <FloatingChatButton />
      <ChatAgent />
      {/* <Chatbot /> */}
    </div>
  );
}
