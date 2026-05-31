"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useChat } from "@/lib/context/ChatContext";

export default function HeroChatInput() {
  const { input, setInput, handleSend, messages, setIsOpen } = useChat();

  const onSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    await handleSend();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto mt-12"
    >
      <form
        onSubmit={onSend}
        className="w-full relative group"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClick={() => messages.length > 0 && setIsOpen(true)}
          placeholder="Tell us what's broken..."
          className="w-full bg-surface/50 border border-ink/10 rounded-sm py-4 px-6 pr-14 text-ink placeholder:text-ink/40 outline-none focus:border-accent transition-all shadow-sm cursor-text"
          aria-label="Tell us what's broken"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-sm text-accent hover:bg-accent/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          aria-label="Send message"
        >
          <Send className="w-6 h-6" />
        </button>
      </form>
      <p className="text-ink/40 text-sm font-sans italic">
        or scroll down to use the assessment form
      </p>
    </motion.div>
  );
}
