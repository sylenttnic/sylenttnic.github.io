import type { Metadata } from 'next';
import AccountClient from './AccountClient';
import { WORDS } from './words';

export const metadata: Metadata = {
  title: WORDS.meta.title,
  description: WORDS.meta.description,
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://sylentt.com/webdesign/account/' },
};

export default function Account() {
  return (
    <div className="pt-24 md:pt-36 pb-16 md:pb-24 px-6 max-w-4xl mx-auto">
      <AccountClient />
    </div>
  );
}
