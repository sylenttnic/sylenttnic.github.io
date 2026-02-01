"use client";

import { useEffect, useState, useRef } from "react";
import { MessageCircle, X } from "lucide-react";

export default function Chatbot() {
  const [isReady, setIsReady] = useState(false); // Script loaded and toggle ready
  const [isOpen, setIsOpen] = useState(false); // Chat window visible

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Generate or retrieve persistent session ID
    const sessionId =
      localStorage.getItem("n8nChatSessionId") ||
      (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15));
    localStorage.setItem("n8nChatSessionId", sessionId);

    const loadChat = async () => {
      try {
        // Inject CSS if not already present
        const cssUrl = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
        if (!document.querySelector(`link[href="${cssUrl}"]`)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = cssUrl;
          document.head.appendChild(link);
        }

        // Hide the native toggle button via CSS override
        const customStyle = document.createElement("style");
        customStyle.textContent = `
          .chat-window-toggle {
            visibility: hidden !important;
            position: absolute !important;
            pointer-events: none !important;
            opacity: 0 !important;
          }
          :root {
            --chat--window--bottom: 5.5rem;
            --chat--window--z-index: 9995;
          }
          @media (max-width: 640px) {
            :root {
              --chat--window--height: calc(100% - 6rem);
            }
          }
        `;
        document.head.appendChild(customStyle);

        // Inject script
        const script = document.createElement("script");
        script.type = "module";
        script.innerHTML = `
            import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
            createChat({
              webhookUrl: "https://hnet.sylentt.com/webhook/af00e28f-7b00-4b2a-9e12-123456789abc/chat",
              mode: "window",
              target: "#n8n-chat",
              chatInputKey: "chatInput",
              chatSessionKey: "sessionId",
              loadPreviousSession: true,
              metadata: {
                sessionId: "${sessionId}",
                sourceSite: "sylentt.com",
              },
              showWelcomeScreen: true,
              defaultLanguage: "en",
              initialMessages: ["Hi there! 👋", "How can I help you today?"],
              i18n: {
                en: {
                  title: "Assistant",
                  subtitle: "",
                },
              },
              style: {
                primaryColor: "#6366f1",
                secondaryColor: "#0f172a",
                fontFamily: "var(--font-jakarta), sans-serif",
              },
            });
          `;
        document.body.appendChild(script);

        // Poll for the native toggle button to confirm chat is ready
        const checkInterval = setInterval(() => {
          if (document.querySelector(".chat-window-toggle")) {
            setIsReady(true);
            clearInterval(checkInterval);
          }
        }, 500);

        // Stop checking after 30 seconds to avoid infinite loop
        setTimeout(() => clearInterval(checkInterval), 30000);

      } catch (error) {
        console.error("Failed to load chat:", error);
      }
    };

    loadChat();
  }, []);

  // Monitor chat state (Open/Close) using MutationObserver
  useEffect(() => {
    if (!isReady) return;

    const observer = new MutationObserver(() => {
      // Check if input is visible to determine if chat is open
      const input = document.querySelector(".n8n-chat-input") as HTMLElement | null ||
                    document.querySelector("textarea[data-test-id='chat-input']") as HTMLElement | null ||
                    document.querySelector("textarea[placeholder*='question']") as HTMLElement | null ||
                    document.querySelector("textarea[placeholder*='message']") as HTMLElement | null ||
                    document.querySelector("input[placeholder*='message']") as HTMLElement | null;

      const isInputVisible = input && input.offsetParent !== null;

      if (isInputVisible) {
        if (!isOpen) {
            setIsOpen(true);
            // Attempt to focus when it becomes visible
            input?.focus({ preventScroll: false });
        }
      } else {
        if (isOpen) {
            setIsOpen(false);
        }
      }
    });

    const target = document.getElementById('n8n-chat') || document.body;
    observer.observe(target, { childList: true, subtree: true, attributes: true });

    return () => observer.disconnect();
  }, [isReady, isOpen]);

  // Handle click outside to close chat on mobile
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Check if mobile (using 640px as breakpoint, same as CSS)
      if (window.innerWidth >= 640) return;

      const target = event.target as Node;

      const chatContainer = document.getElementById("n8n-chat");
      const toggleButton = document.querySelector("button[aria-label='Close Chat']");
      const chatWindow = document.querySelector(".chat-window");

      const isInsideChat =
        (chatContainer && chatContainer.contains(target)) ||
        (chatWindow && chatWindow.contains(target));

      const isToggleButton = toggleButton && toggleButton.contains(target);

      if (!isInsideChat && !isToggleButton) {
        handleToggleChat();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleToggleChat = () => {
    const toggle = document.querySelector(".chat-window-toggle") as HTMLElement;
    if (toggle) {
        toggle.click();

        // If we are opening the chat (it was closed), try to focus input
        if (!isOpen) {
          // Attempt to focus immediately (crucial for mobile keyboard)
          const focusLoop = setInterval(() => {
               const input = document.querySelector(".n8n-chat-input") as HTMLElement | null ||
                        document.querySelector("textarea[data-test-id='chat-input']") as HTMLElement | null ||
                        document.querySelector("textarea[placeholder*='question']") as HTMLElement | null ||
                        document.querySelector("textarea[placeholder*='message']") as HTMLElement | null ||
                        document.querySelector("input[placeholder*='message']") as HTMLElement | null;

               if (input && input.offsetParent !== null) {
                   input.focus({ preventScroll: false });
                   // If we successfully focused, we can stop
                   if (document.activeElement === input) {
                      clearInterval(focusLoop);
                   }
               }
          }, 50);

          // Stop trying after 1 second
          setTimeout(() => clearInterval(focusLoop), 1000);
        }
    }
  };

  return (
    <>
      <div id="n8n-chat"></div>

      {/* Custom Toggle Button */}
      <button
        onClick={handleToggleChat}
        className={`fixed bottom-4 right-4 z-[10000] flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${!isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
        disabled={!isReady}
      >
        {isOpen ? <X className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
      </button>
    </>
  );
}
