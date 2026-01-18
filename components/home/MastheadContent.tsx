"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function MastheadContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-sm">
        Stop Running Your Business on Email, Spreadsheets, and &quot;I Think So.&quot;
      </h1>
      <h2 className="text-xl md:text-3xl font-light mb-10 max-w-4xl mx-auto text-slate-300 leading-relaxed">
        Chaos isn&apos;t a strategy. We architect the systems that replace operational noise with clarity, using the tools you probably already own.
      </h2>
      <Button
        size="xl"
        className="rounded-full bg-primary hover:bg-primary-hover text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] animate-pulse-slow border border-white/10"
        onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}
      >
        Get Your Friction Score
      </Button>
      <p className="mt-6 text-slate-400 text-sm md:text-base font-medium">
        Get your score to unlock a free 30-minute discovery call.
      </p>
    </motion.div>
  );
}
