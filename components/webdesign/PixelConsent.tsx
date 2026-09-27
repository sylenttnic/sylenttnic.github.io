'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { initPixel, readStoredConsent, writeStoredConsent } from './pixel';

// The consent bar (queue item W16, NIC-ACTIONS N7, Nic's option B): the Meta Pixel
// never initializes until this bar's "OK" is clicked. "No thanks" is remembered per
// browser and the Pixel never loads again there. Either choice leaves the preview
// request untouched. Words are copywriter's, `runs/conversion-program/copy/pixel-notice.md`
// (`sylentt-smb-site-generation`), verbatim.
export default function PixelConsent({ pixelId }: { pixelId: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored === 'granted') {
      initPixel(pixelId);
    } else if (stored === null) {
      setVisible(true);
    }
  }, [pixelId]);

  if (!visible) return null;

  const grant = () => {
    writeStoredConsent('granted');
    setVisible(false);
    initPixel(pixelId);
  };
  const decline = () => {
    writeStoredConsent('declined');
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie and pixel notice"
      data-testid="pixel-consent-bar"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-paper/98 backdrop-blur px-4 py-4 shadow-lift md:px-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="font-sans text-sm text-ink/90">
          This page uses Meta pixels and cookies. If you click OK, they start collecting
          information about your visit to measure and target Meta ads.{' '}
          <Link href="/webdesign/privacy/" className="text-accent underline">
            Privacy Policy
          </Link>{' '}
          &middot;{' '}
          <a
            href="https://www.aboutads.info/choices"
            className="text-accent underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ad choices
          </a>{' '}
          &middot;{' '}
          <a
            href="https://www.youronlinechoices.eu"
            className="text-accent underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            EU choices
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="outline" size="sm" onClick={decline}>
            No thanks
          </Button>
          <Button variant="primary" size="sm" onClick={grant}>
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
