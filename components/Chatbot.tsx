"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export default function Chatbot() {
  const [isChatLoaded, setIsChatLoaded] = useState(false);

  useEffect(() => {
    // We only want to run this in the browser
    if (typeof window === "undefined") return;

    // Generate or retrieve persistent session ID
    const sessionId =
      localStorage.getItem("n8nChatSessionId") ||
      (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15));
    localStorage.setItem("n8nChatSessionId", sessionId);

    // If chat is triggered, load the script
    if (isChatLoaded) {
      const loadChat = async () => {
        try {
          // Dynamic import of the n8n chat bundle
          // Using script tag injection to bypass Next.js webpack issues with external URL imports

          // Inject CSS if not already present
          const cssUrl = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
          if (!document.querySelector(`link[href="${cssUrl}"]`)) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = cssUrl;
            document.head.appendChild(link);
          }

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
              },
              showWelcomeScreen: true,
              defaultLanguage: "en",
              initialMessages: ["Hi there! 👋", "How can I help you today?"],
              i18n: {
                en: {
                  title: "Sylentt Partners Assistant",
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

          // Auto-open logic once loaded
          const checkInterval = setInterval(() => {
            const toggleBtn = document.querySelector(".chat-window-toggle");
            if (toggleBtn) {
              (toggleBtn as HTMLElement).click();
              clearInterval(checkInterval);
            }
          }, 100);
        } catch (error) {
          console.error("Failed to load chat:", error);
        }
      };

      loadChat();
    }
  }, [isChatLoaded]);

  // Focus logic when chat is opened
  useEffect(() => {
    if (!isChatLoaded) return;

    // Monitor for chat window visibility changes or toggle clicks
    const focusInput = () => {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (attempts > 20) clearInterval(interval); // Stop after 2 seconds

        const input = document.querySelector(".n8n-chat-input") as HTMLElement | null ||
                      document.querySelector("textarea[placeholder*='message']") as HTMLElement | null ||
                      document.querySelector("input[placeholder*='message']") as HTMLElement | null;

        if (input && document.activeElement !== input) {
            // Check if the chat window is actually visible
            const isVisible = input.offsetParent !== null;
            if (isVisible) {
                input.focus({ preventScroll: false });
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                clearInterval(interval);
            }
        }
      }, 100);
    };

    // Attach listener to the toggle button if it exists
    const attachListener = () => {
        const toggleBtn = document.querySelector(".chat-window-toggle");
        if (toggleBtn) {
            toggleBtn.addEventListener("click", () => {
                // Give it a moment to expand
                setTimeout(focusInput, 100);
            });
            // Also run focus once immediately in case it was auto-opened
            focusInput();
            return true;
        }
        return false;
    };

    const attachInterval = setInterval(() => {
        if (attachListener()) {
            clearInterval(attachInterval);
        }
    }, 500);

    return () => clearInterval(attachInterval);

  }, [isChatLoaded]);

  if (isChatLoaded) {
    return <div id="n8n-chat"></div>;
  }

  return (
    <button
      onClick={() => setIsChatLoaded(true)}
      className="fixed bottom-4 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="Open Chat"
    >
      <MessageCircle className="h-8 w-8" />
    </button>
  );
}
