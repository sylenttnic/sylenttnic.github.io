import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'That did not go through | Sylentt',
  description: 'Your preview request did not reach us.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://sylentt.com/webdesign/request-error/',
  },
  openGraph: {
    title: 'That did not go through | Sylentt',
    description: 'Your preview request did not reach us.',
    url: 'https://sylentt.com/webdesign/request-error/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'That did not go through | Sylentt',
    description: 'Your preview request did not reach us.',
  },
};

export default function PreviewRequestError() {
  return (
    <div className="pt-24 md:pt-36 pb-16 md:pb-24 px-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/webdesign/"
          className="text-sm font-sans text-accent hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          &larr; Back to Web Design
        </Link>
      </div>
      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink mb-6">That did not go through.</h1>
      <p className="text-lg text-ink/90 font-sans leading-relaxed max-w-2xl">
        Try again, or email{' '}
        <a href="mailto:support@sylentt.com" className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
          support@sylentt.com
        </a>
        .
      </p>
      <p className="mt-8">
        <Link
          href="/webdesign/#tell-us"
          className="btn-quiet px-6 py-3 text-base"
        >
          Back to the form
        </Link>
      </p>
    </div>
  );
}
