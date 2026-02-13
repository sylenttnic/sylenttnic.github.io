"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AutomationMasthead() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight tracking-tight text-white drop-shadow-sm">
        Deploy Your Invisible Employee
      </h1>
      <h2 className="text-lg md:text-3xl font-light mb-6 md:mb-10 max-w-4xl mx-auto text-slate-300 leading-relaxed">
        The systems that work 24/7 so your human team doesn&apos;t have to. Scale your operations without increasing headcount.
      </h2>
      <Button
        size="xl"
        className="rounded-full bg-primary hover:bg-primary-hover text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] animate-pulse-slow border border-white/10 w-full md:w-auto h-auto whitespace-normal py-4"
        onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}
      >
        Calculate Your Operational Burn Rate
      </Button>
      <p className="mt-4 md:mt-6 text-slate-400 text-sm md:text-base font-medium px-4 md:px-0">
        Unlock a report on how much manual work is costing you.
      </p>
    </motion.div>
  );
}
