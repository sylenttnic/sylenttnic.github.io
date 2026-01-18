"use client";

import { motion } from "framer-motion";
import { Ghost, DoorOpen, HelpCircle, EyeOff } from "lucide-react";

export default function InvisibleDragCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl glass-card text-center group"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-primary mb-6 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
          <DoorOpen className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-3">The Thousand Front Doors</h3>
        <p className="text-slate-400">Requests coming from Slack, email, texts - no central list.</p>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl glass-card text-center group"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-primary mb-6 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
          <Ghost className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Zombie Projects</h3>
        <p className="text-slate-400">Initiatives that never die but never finish.</p>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl glass-card text-center group"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-primary mb-6 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Decision Amnesia</h3>
        <p className="text-slate-400">Decisions lost in chat threads, not recorded.</p>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl glass-card text-center group"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-primary mb-6 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
          <EyeOff className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-3">The Visibility Gap</h3>
        <p className="text-slate-400">No real-time view of roadmap vs. reality.</p>
      </motion.div>
    </div>
  );
}
