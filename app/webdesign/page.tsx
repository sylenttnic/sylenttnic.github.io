import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Design | Sylentt',
  description: 'Sylentt Web Design',
};

export default function WebDesignPage() {
  return (
    <div className="pt-24 md:pt-36 pb-16 md:pb-24 px-6 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-ink mb-6">Hello World</h1>
      <p className="text-lg text-ink/70">Welcome to webdesign.sylentt.com</p>
    </div>
  );
}
