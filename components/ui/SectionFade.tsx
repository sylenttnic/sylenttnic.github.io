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

  // Reduced motion: render content immediately with no transform/opacity animation.
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
