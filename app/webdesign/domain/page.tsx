import type { Metadata } from 'next';
import DomainClient from './DomainClient';

export const metadata: Metadata = {
  title: 'Your domain | Sylentt',
  description: 'Connect the domain your business already has.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://sylentt.com/webdesign/domain/' },
};

export default function Domain() {
  return (
    <div className="pt-24 md:pt-36 pb-16 md:pb-24 px-6 max-w-3xl mx-auto">
      <DomainClient />
    </div>
  );
}
