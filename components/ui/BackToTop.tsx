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
  const distances = [-12, -8, -4];

  const getArrowVariants = (i: number) => {
    const totalCycle = 7;
    const nudgeDuration = 0.5;
    const stagger = 0.2;

    const startTime = i * stagger;
    const peakTime = startTime + (nudgeDuration * 0.7);
    const snapTime = startTime + nudgeDuration;

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

  // Using the site's accent colors
  const colors = [
    'text-[#8b5cf6]', // accent3 (purple)
    'text-[#3b82f6]', // accent (blue)
    'text-[#06b6d4]', // accent2 (cyan)
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-[9990] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
          aria-label="Back to top"
        >
          <div className="relative flex flex-col items-center justify-center -space-y-7">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                variants={getArrowVariants(i)}
                animate="animate"
                initial={{ y: 0 }}
                className="flex items-center justify-center"
              >
                <ChevronUp
                  className={`w-12 h-12 stroke-[3.5] transition-colors ${colors[i]} group-hover:text-white`}
                  style={{
                    filter: `drop-shadow(0 0 10px currentColor)`
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
