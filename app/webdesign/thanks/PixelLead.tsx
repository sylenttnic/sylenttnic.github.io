'use client';

import { useEffect, useRef } from 'react';
import { PIXEL_READY_EVENT } from '@/components/webdesign/pixel';

// Fires the Meta Pixel Lead event once, when someone lands on the thanks page.
// The thanks page is reached only after the preview-request form is submitted
// (the lead platform 303-redirects here), so a view here means a real lead.
//
// The pixel waits for consent (W16, NIC-ACTIONS N7, option B), so this cannot
// assume window.fbq exists yet: a visitor who has never consented sees the bar
// on THIS page too, and only grants it here. Firing on PIXEL_READY_EVENT as
// well as on mount covers both orders (already consented earlier vs. consents
// right here) without ever firing Lead twice.
export default function PixelLead() {
  const fired = useRef(false);
  useEffect(() => {
    const fireOnce = () => {
      if (fired.current) return;
      if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
      fired.current = true;
      window.fbq('track', 'Lead');
    };
    fireOnce();
    window.addEventListener(PIXEL_READY_EVENT, fireOnce);
    return () => window.removeEventListener(PIXEL_READY_EVENT, fireOnce);
  }, []);
  return null;
}
