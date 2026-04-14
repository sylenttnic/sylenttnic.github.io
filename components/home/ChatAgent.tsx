"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Loader2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "@/lib/context/ChatContext";

export default function ChatAgent() {
  const {
    isOpen,
    setIsOpen,
    messages,
    input,
    setInput,
    isLoading,
    leadInfo,
    error,
    handleSend,
    isLimitReached,
  } = useChat();

  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior, block: "end" });
    }
  };

  // Auto-scroll to bottom on content changes
  useEffect(() => {
    if (isOpen) {
      // Use a small timeout to ensure DOM has updated and layout has shifted
      const timer = setTimeout(() => scrollToBottom(), 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isLoading, leadInfo, isOpen]);

  // Handle mobile keyboard and viewport resizing
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      // When the keyboard appears, the visual viewport height changes
      // We want to ensure the latest message is still visible
      scrollToBottom("auto");
    };

    const viewport = window.visualViewport;
    if (viewport) {
      viewport.addEventListener("resize", handleResize);
      viewport.addEventListener("scroll", handleResize);
    }

    return () => {
      if (viewport) {
        viewport.removeEventListener("resize", handleResize);
        viewport.removeEventListener("scroll", handleResize);
      }
    };
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow animation to start
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom("auto");
      }, 150);
      document.body.style.overflow = "hidden"; // Prevent background scroll on mobile
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Refocus input when loading ends to ensure keyboard stays up
  useEffect(() => {
    if (!isLoading && isOpen && !isLimitReached) {
      inputRef.current?.focus();
      // On some mobile browsers, refocusing might trigger a viewport shift
      setTimeout(() => scrollToBottom(), 50);
    }
  }, [isLoading, isOpen, isLimitReached]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
      // Simple focus trap
      if (e.key === "Tab" && isOpen && chatWindowRef.current) {
        const focusableElements = chatWindowRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  const onSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    await handleSend();
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (chatWindowRef.current && !chatWindowRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={handleClickOutside}
        >
          <motion.div
            ref={chatWindowRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 w-full h-full sm:h-[600px] sm:max-w-[600px] sm:rounded-2xl border border-white/10 shadow-2xl flex flex-col relative overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
              <h3 id="chat-title" className="text-white font-bold">Sylentt Agent</h3>
              <button
                ref={closeButtonRef}
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 text-slate-400 hover:text-white transition-colors h-11 w-11 flex items-center justify-center"
                aria-label="Close chat"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-4 space-y-4"
              aria-live="polite"
            >
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-slate-500 text-center px-8">
                  Start the conversation by describing your workflow challenges.
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-2xl p-4 text-sm md:text-base leading-relaxed whitespace-pre-wrap",
                    msg.role === "user"
                      ? "ml-auto bg-primary/20 text-white border border-primary/20"
                      : "mr-auto bg-white/5 text-slate-200 border border-white/5"
                  )}
                >
                  {msg.content}
                </div>
              ))}

              {isLoading && (
                <div className="mr-auto bg-white/5 text-slate-400 border border-white/5 rounded-2xl p-4 flex gap-1 w-fit">
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    className="w-1.5 h-1.5 bg-current rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    className="w-1.5 h-1.5 bg-current rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    className="w-1.5 h-1.5 bg-current rounded-full"
                  />
                </div>
              )}

              {error && (
                <div className="mx-auto max-w-sm text-center p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {isLimitReached && (
                <div className="text-center p-4 text-slate-500 text-sm">
                  We&apos;ve covered a lot! Book a discovery call to continue the conversation: {leadInfo.link || "https://calendly.com/nic-sylentt/30min"}
                </div>
              )}

              <div ref={messagesEndRef} className="h-0 w-full" />
            </div>

            {/* Footer Area with Calendly and Input */}
            <div className="p-4 border-t border-white/5 bg-slate-900/50 space-y-4">
              {leadInfo.created && leadInfo.link && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full"
                >
                  <a
                    href={leadInfo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary text-white font-bold hover:bg-indigo-400 transition-all shadow-lg shadow-primary/25"
                  >
                    <Calendar className="w-5 h-5" />
                    Book your discovery call
                  </a>
                </motion.div>
              )}

              <form
                onSubmit={onSend}
                className="relative flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLimitReached}
                  placeholder={isLimitReached ? "Conversation limit reached" : "Type your message..."}
                  className="flex-grow bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-600 outline-none focus:border-primary transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading || isLimitReached}
                  className="bg-primary text-white p-3 rounded-xl hover:bg-indigo-400 disabled:opacity-30 transition-all flex items-center justify-center"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
