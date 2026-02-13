"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ProcessMasthead() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight tracking-tight text-white drop-shadow-sm">
        Bridge the Gap Between Strategy and Execution
      </h1>
      <h2 className="text-lg md:text-3xl font-light mb-6 md:mb-10 max-w-4xl mx-auto text-slate-300 leading-relaxed">
        Your teams are doing great work, but they are doing it in the dark. We use intelligent agents to align your entire organization around a single source of truth.
      </h2>
      <Button
        size="xl"
        className="rounded-full bg-primary hover:bg-primary-hover text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] animate-pulse-slow border border-white/10 w-full md:w-auto"
        onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}
      >
        Get Your Friction Score
      </Button>
      <p className="mt-4 md:mt-6 text-slate-400 text-sm md:text-base font-medium px-4 md:px-0">
        Includes a free 30-min Discovery Call and Documentation Audit Session
      </p>
    </motion.div>
  );
}
