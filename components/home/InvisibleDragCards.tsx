"use client";

import { motion } from "framer-motion";
import { Ghost, DoorOpen, HelpCircle, EyeOff } from "lucide-react";

export default function InvisibleDragCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl neon-card orange text-center group"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-6 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] group-hover:scale-110 transition-all duration-300">
          <DoorOpen className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-3">The Thousand Front Doors</h3>
        <p className="text-slate-400">Requests coming from Slack, email, texts - no central list.</p>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl neon-card red text-center group"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 mb-6 group-hover:bg-red-500/20 group-hover:border-red-500/50 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] group-hover:scale-110 transition-all duration-300">
          <Ghost className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Zombie Projects</h3>
        <p className="text-slate-400">Initiatives that never die but never finish.</p>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl neon-card amber text-center group"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6 group-hover:bg-amber-500/20 group-hover:border-amber-500/50 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-all duration-300">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Decision Amnesia</h3>
        <p className="text-slate-400">Decisions lost in chat threads, not recorded.</p>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl neon-card cyan text-center group"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-all duration-300">
          <EyeOff className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-3">The Visibility Gap</h3>
        <p className="text-slate-400">No real-time view of roadmap vs. reality.</p>
      </motion.div>
    </div>
  );
}
