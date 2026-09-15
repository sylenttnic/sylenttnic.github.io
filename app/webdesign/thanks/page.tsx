import type { Metadata } from 'next';
import Link from 'next/link';
import PixelLead from './PixelLead';

export const metadata: Metadata = {
  title: 'Got it | Sylentt',
  description: 'Your preview request reached us.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://sylentt.com/webdesign/thanks/',
  },
  openGraph: {
    title: 'Got it | Sylentt',
    description: 'Your preview request reached us.',
    url: 'https://sylentt.com/webdesign/thanks/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Got it | Sylentt',
    description: 'Your preview request reached us.',
  },
};

export default function PreviewRequestThanks() {
  return (
    <div className="pt-24 md:pt-36 pb-16 md:pb-24 px-6 max-w-4xl mx-auto">
      <PixelLead />
      <div className="mb-6">
        <Link
          href="/webdesign/"
          className="text-sm font-sans text-accent hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          &larr; Back to Web Design
        </Link>
      </div>
      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink mb-6">Got it.</h1>
      <p className="text-lg text-ink/90 font-sans leading-relaxed max-w-2xl">
        We are looking up your business now. Research comes first, so this takes a while; the preview link goes to the email address you gave. If we cannot find enough about the business to build from, we will tell you that too.
      </p>
    </div>
  );
}
