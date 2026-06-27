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
          className="fixed inset-0 z-[10000] flex items-center justify-center p-0 sm:p-4 bg-paper/80 backdrop-blur-sm"
          onClick={handleClickOutside}
        >
          <motion.div
            ref={chatWindowRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-paper w-full h-full sm:h-[600px] sm:max-w-[600px] sm:rounded-sm border border-ink/10 shadow-2xl flex flex-col relative overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-ink/5 flex items-center justify-between bg-surface/50">
              <h3 id="chat-title" className="text-ink font-serif font-bold text-lg">Sylentt Partners Agent</h3>
              <button
                ref={closeButtonRef}
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 text-ink/60 hover:text-ink transition-colors h-11 w-11 flex items-center justify-center"
                aria-label="Close chat"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-6"
              aria-live="polite"
            >
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-ink/60 text-center px-12 font-sans italic">
                  Start the conversation by describing your workflow challenges.
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] p-4 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-sans",
                    msg.role === "user"
                      ? "ml-auto bg-accent text-white rounded-l-2xl rounded-tr-2xl"
                      : "mr-auto bg-surface text-ink/90 border border-ink/5 rounded-r-2xl rounded-tl-2xl"
                  )}
                >
                  {msg.content}
                </div>
              ))}

              {isLoading && (
                <div className="mr-auto bg-surface text-ink/30 border border-ink/5 rounded-r-2xl rounded-tl-2xl p-4 flex gap-1 w-fit">
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
                <div className="mx-auto max-w-sm text-center p-4 rounded-sm bg-red-50 border border-red-100 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {isLimitReached && (
                <div className="text-center p-6 text-ink/60 text-sm italic">
                  We&apos;ve covered a lot! Book a free discovery call to continue the conversation: {leadInfo.link || "https://calendly.com/nic-sylentt/30min"}
                </div>
              )}

              <div ref={messagesEndRef} className="h-0 w-full" />
            </div>

            {/* Footer Area with Calendly and Input */}
            <div className="p-6 border-t border-ink/5 bg-surface/50 space-y-4">
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
                    className="flex items-center justify-center gap-3 p-4 rounded-sm bg-accent text-white font-bold hover:opacity-90 transition-all shadow-sm"
                  >
                    <Calendar className="w-5 h-5" />
                    Book your free discovery call
                  </a>
                </motion.div>
              )}

              <form
                onSubmit={onSend}
                className="relative flex gap-3"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLimitReached}
                  placeholder={isLimitReached ? "Conversation limit reached" : "Type your message..."}
                  className="flex-grow bg-paper border border-ink/10 rounded-sm py-4 px-5 text-ink placeholder:text-ink/50 outline-none focus:border-accent transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading || isLimitReached}
                  className="bg-accent text-white px-5 rounded-sm hover:opacity-90 disabled:opacity-30 transition-all flex items-center justify-center shadow-sm"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Send className="w-6 h-6" />
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
