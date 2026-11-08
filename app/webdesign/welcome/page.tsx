import type { Metadata } from 'next';
import WelcomeClient from './WelcomeClient';

export const metadata: Metadata = {
  title: 'Welcome | Sylentt',
  description: 'Confirm your business and choose your design.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://sylentt.com/webdesign/welcome/' },
};

export default function Welcome() {
  return (
    <div className="pt-24 md:pt-36 pb-16 md:pb-24 px-6 max-w-4xl mx-auto">
      <WelcomeClient />
    </div>
  );
}
