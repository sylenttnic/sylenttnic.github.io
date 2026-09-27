// Shared Meta Pixel init, gated behind visitor consent (queue item W16, NIC-ACTIONS N7,
// Nic's option B: the pixel is not initialised until "OK"; "No thanks" is remembered).
// PixelConsent.tsx calls initPixel() once consent is granted (immediately on a return
// visit, or after a click); PixelLead.tsx listens for PIXEL_READY_EVENT so a Lead fired
// on the thanks page is never lost to ordering between the two components.

export const PIXEL_CONSENT_KEY = 'sylentt_pixel_consent';
export const PIXEL_READY_EVENT = 'sylentt:pixel-ready';

// Matches the `fbq` signature already declared globally by NoPresenceForm.tsx
// and PreviewRequestForm.tsx (both call `window.fbq && window.fbq('track', ...)`,
// which is why this stays a same-shape re-declaration rather than a new type:
// TypeScript requires every `declare global` augmentation of the same property
// to agree exactly).
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    __sylenttPixelConsent?: 'granted' | 'declined' | null;
  }
}

// In-memory fallback for the rare browser that blocks or throws on
// localStorage (some strict private-mode configurations, storage quota). The
// privacy page promises a decline is remembered and "you are not asked again
// there" with no qualifier; this makes that true for the rest of the tab's
// session even when the persistent write silently fails, not just when it
// succeeds. This has to live on `window` itself, not a module-scoped
// variable: Next's per-route code splitting can give a client-side
// navigation its own fresh copy of this module, but `window` is the one
// thing every route shares across the same navigation. A full reload or a
// new tab still needs localStorage itself to work for the choice to survive,
// same as before.
export function readStoredConsent(): 'granted' | 'declined' | null {
  if (window.__sylenttPixelConsent) return window.__sylenttPixelConsent;
  try {
    const v = window.localStorage.getItem(PIXEL_CONSENT_KEY);
    return v === 'granted' || v === 'declined' ? v : null;
  } catch {
    return null;
  }
}

export function writeStoredConsent(value: 'granted' | 'declined') {
  window.__sylenttPixelConsent = value;
  try {
    window.localStorage.setItem(PIXEL_CONSENT_KEY, value);
  } catch {
    /* private mode or storage blocked: window.__sylenttPixelConsent still
       keeps this tab from re-asking; only cross-session persistence is lost. */
  }
}

function loadFbevents() {
  if (window.fbq) return;
  // The standard Meta Pixel queueing shim (identical to Meta's own snippet):
  // fbq() queues calls made before fbevents.js finishes loading, so init and
  // track calls made immediately below are never lost to the race.
  const n = ((...args: unknown[]) => {
    const self = n as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[][] };
    if (self.callMethod) self.callMethod(...args);
    else self.queue.push(args);
  }) as ((...args: unknown[]) => void) & { queue: unknown[][]; loaded?: boolean; version?: string; push?: unknown };
  n.queue = [];
  n.loaded = true;
  n.version = '2.0';
  n.push = n;
  window.fbq = n;
  if (!window._fbq) window._fbq = n;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  const first = document.getElementsByTagName('script')[0];
  first.parentNode?.insertBefore(script, first);
}

// Never initialises twice: safe to call from every page's mount once consent is known.
export function initPixel(pixelId: string) {
  if (typeof window === 'undefined') return;
  const already = Boolean(window.fbq);
  loadFbevents();
  if (!already) {
    window.fbq?.('init', pixelId);
    window.fbq?.('track', 'PageView');
  }
  window.dispatchEvent(new Event(PIXEL_READY_EVENT));
}
