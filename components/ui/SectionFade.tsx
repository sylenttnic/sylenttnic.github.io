'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionFade({ children, className = "", delay = 0 }: SectionFadeProps) {
  const shouldReduceMotion = useReducedMotion();

  // Always render the same motion.div, on the server and in the browser.
  // Returning a plain <div> for reduced motion made the browser's first render
  // differ from the static HTML, React kept the HTML's inline opacity:0, and
  // every section stayed invisible for visitors with "reduce motion" turned on.
  // Reduced motion now makes the reveal instant instead.
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
