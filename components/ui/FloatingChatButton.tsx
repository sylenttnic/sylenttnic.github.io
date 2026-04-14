"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@/lib/context/ChatContext";
import { usePathname } from "next/navigation";

export default function FloatingChatButton() {
  const { isOpen, setIsOpen, messages } = useChat();
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // On homepage, only show after scrolling past hero (approx 600px)
      if (pathname === "/") {
        if (window.scrollY > 600) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        // Always visible on other pages
        setIsVisible(true);
      }
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const hasMessages = messages.length > 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-6 z-[9995] w-14 h-14 rounded-full bg-primary text-white shadow-lg shadow-primary/25 hover:bg-indigo-400 transition-all flex items-center justify-center group"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <MessageCircle className="w-6 h-6" />
              {hasMessages && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-primary animate-pulse" />
              )}
            </div>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
