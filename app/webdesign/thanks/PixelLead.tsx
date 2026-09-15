'use client';

import { useEffect } from 'react';

// Fires the Meta Pixel Lead event once, when someone lands on the thanks page.
// The thanks page is reached only after the preview-request form is submitted
// (the lead platform 303-redirects here), so a view here means a real lead.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function PixelLead() {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead');
    }
  }, []);
  return null;
}
