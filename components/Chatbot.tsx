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

            /* Light Theme Overrides */
            --chat--color-slate-900: #FAF7F0;
            --chat--color-slate-800: #F3EEE4;
            --chat--color-slate-700: #E2DACB;
            --chat--color-slate-400: #9A9087;
            --chat--color-blue-500: #B5512F;
            --chat--color-white: #211C17;

            /* Window */
            --chat--window--border-radius: 0px;
            --chat--window--background: #FAF7F0;
            --chat--body--background: #FAF7F0;
            --chat--footer--background: #F3EEE4;

            /* Header */
            --chat--header--background: #F3EEE4;
            --chat--header--color: #211C17;

            /* Messages */
            --chat--message--bot--background: #ECE5D8;
            --chat--message--bot--color: #211C17;
            --chat--message--user--background: #B5512F;
            --chat--message--user--color: #ffffff;

            /* Input Area */
            --chat--input--background: #ffffff;
            --chat--input--text-color: #211C17;
            --chat--input--border: 1px solid #E2DACB;
            --chat--input--border-radius: 0px;
            --chat--input--container--background: transparent;
            --chat--input--container--border: none;
            --chat--footer--border-top: 1px solid #E2DACB;

            /* Font */
            --chat--font-family: var(--font-jakarta), sans-serif;
          }

          /* Window Container */
          .chat-window {
            background: #FAF7F0 !important;
            border: 1px solid #E2DACB !important;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1) !important;
          }

          #n8n-chat {
            background: transparent !important;
          }

          /* Header */
          .chat-header {
            border-bottom: 1px solid #E2DACB !important;
          }

          /* Header Text */
          .chat-header h1 {
            font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif !important;
            font-weight: 700;
            font-size: 1.25rem;
          }

          /* Close Button */
          .chat-close-button {
             color: #211C17 !important;
          }
          .chat-close-button:hover {
             color: #B5512F !important;
          }

          /* Input Field */
          .chat-inputs textarea {
             resize: none !important;
             overflow: hidden !important;
             border-radius: 0px !important;
          }

          /* Input Field Focus */
          .chat-inputs textarea:focus {
             border-color: #B5512F !important;
             outline: none !important;
          }

          /* Placeholder */
          .chat-inputs textarea::placeholder {
             color: #9A9087 !important;
          }

          /* Send Button */
          .chat-input-send-button {
             background-color: #B5512F !important;
             border-radius: 0px !important;
             margin-left: 12px !important;
             width: 48px !important;
             height: 48px !important;
             color: #ffffff !important;
          }
          .chat-input-send-button:hover {
             opacity: 0.9 !important;
          }

          /* Scrollbar */
          .chat-body::-webkit-scrollbar {
            width: 6px;
          }
          .chat-body::-webkit-scrollbar-track {
            background: #FAF7F0;
          }
          .chat-body::-webkit-scrollbar-thumb {
            background: #E2DACB;
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
              webhookUrl: "https://hnet.sylentt.com/webhook/fafb5729-49b2-4719-b227-a8db849677c4/chat",
              mode: "window",
              enableStreaming: true,
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
                  title: "Let's chat.",
                  subtitle: "",
                },
              },
              style: {
                primaryColor: "#B5512F",
                secondaryColor: "#F3EEE4",
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
        className={`fixed bottom-4 right-4 z-[10000] flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${!isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
        disabled={!isReady}
      >
        {isOpen ? <X className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
      </button>
    </>
  );
}
