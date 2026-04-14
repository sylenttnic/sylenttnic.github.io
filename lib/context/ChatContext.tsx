"use client";

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";

type Message = {
  role: "user" | "model";
  content: string;
};

type LeadInfo = {
  created: boolean;
  link?: string;
};

type ChatContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  isLoading: boolean;
  leadInfo: LeadInfo;
  error: string | null;
  handleSend: (message?: string) => Promise<void>;
  isLimitReached: boolean;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({ created: false });
  const [error, setError] = useState<string | null>(null);

  const MAX_MESSAGES = 40;
  const isLimitReached = messages.length >= MAX_MESSAGES;

  const handleSend = useCallback(async (customMessage?: string) => {
    const messageToSend = customMessage || input;
    if (!messageToSend.trim() || isLoading || isLimitReached) return;

    const userMessage = messageToSend.trim();
    if (!customMessage) setInput("");
    setError(null);

    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    if (!isOpen) {
      setIsOpen(true);
    }

    setIsLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_INTAKE_API_KEY;
      if (!apiKey) {
        throw new Error("API key missing");
      }

      const response = await fetch("https://intake.sylentt.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();

      setMessages((prev) => [...prev, { role: "model", content: data.message }]);

      if (data.leadCreated) {
        setLeadInfo({ created: true, link: data.calendlyLink });
      }
    } catch (err) {
      console.error("Chat error:", err);
      setError("Something went wrong. You can book a call directly at the link below.");
      if (!leadInfo.link) {
        setLeadInfo({ created: true, link: "https://calendly.com/nic-sylentt/30min" });
      }
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, isLimitReached, messages, isOpen, leadInfo.link]);

  return (
    <ChatContext.Provider
      value={{
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
