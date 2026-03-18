"use client";

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after 400px of scrolling
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Nudge distances: Top moves most, then middle, then bottom
  const distances = [-10, -6, -3];

  const getArrowVariants = (i: number) => {
    const totalCycle = 7;
    const nudgeDuration = 0.4;
    const stagger = 0.2;

    const startTime = i * stagger;
    const peakTime = startTime + nudgeDuration;
    const snapTime = peakTime + 0.1;

    return {
      animate: {
        y: [0, 0, distances[i], 0, 0],
        transition: {
          duration: totalCycle,
          times: [0, startTime / totalCycle, peakTime / totalCycle, snapTime / totalCycle, 1],
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    };
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 z-[9990] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:scale-110 active:scale-95 group"
          aria-label="Back to top"
        >
          {/* Neon Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl group-hover:bg-indigo-500/40 transition-colors" />

          <div className="relative flex flex-col items-center justify-center -space-y-4 pt-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                variants={getArrowVariants(i)}
                animate="animate"
                initial={{ y: 0 }}
              >
                <ChevronUp className="w-8 h-8 stroke-[3]" />
              </motion.div>
            ))}
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
