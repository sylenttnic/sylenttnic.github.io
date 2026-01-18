"use client";

import { motion } from "framer-motion";

export default function MastheadContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-white drop-shadow-sm">
        A Structured Path to Order.
      </h1>
      <h2 className="text-xl md:text-2xl font-light mb-0 max-w-4xl mx-auto text-slate-300 leading-relaxed">
        We don&apos;t sell open-ended consulting hours that go nowhere. We deliver a specific operational transformation in four clear phases.
      </h2>
    </motion.div>
  );
}
