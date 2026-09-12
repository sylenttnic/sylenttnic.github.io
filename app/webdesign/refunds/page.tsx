import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Billing & Cancellation | Sylentt',
  description: 'Billing, free trial and cancellation policy for Sylentt Partners LLC Web Design.',
  alternates: {
    canonical: 'https://sylentt.com/webdesign/refunds/',
  },
  openGraph: {
    title: 'Billing & Cancellation | Sylentt',
    description: 'Billing, free trial and cancellation policy for Sylentt Partners LLC Web Design.',
    url: 'https://sylentt.com/webdesign/refunds/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Billing & Cancellation | Sylentt',
    description: 'Billing, free trial and cancellation policy for Sylentt Partners LLC Web Design.',
  },
};

export default function BillingAndCancellation() {
  return (
    <div className="pt-24 md:pt-36 pb-16 md:pb-24 px-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/webdesign"
          className="text-sm font-sans text-accent hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          &larr; Back to Web Design
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink mb-2">Billing &amp; Cancellation</h1>
      <p className="text-sm text-ink/60 pb-6 mb-8 border-b border-border">
        Sylentt Partners LLC &middot; Effective 12 September 2026
      </p>

      <div className="border-l-4 border-accent pl-4 py-2 my-6 bg-surface/50 text-ink/90 rounded-r">
        <p className="font-semibold mb-0">
          There is nothing to buy up front, so there is nothing to refund. Your first 30 days are free. After that it is $9.99 a month plus tax, and you can cancel any time from your billing page.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-ink/90 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">How the plan works</h2>
          <p>
            We build your website before you pay anything and put it on our monthly plan. The <strong>first 30 days are free</strong>. When the free period ends the plan renews automatically at <strong>$9.99 per month plus any applicable tax</strong>, and it keeps renewing each month until you cancel. You can cancel at any time, and you will not be charged again after you do.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">The free trial</h2>
          <p>
            If you cancel within the first 30 days, you are charged nothing at all. That is the whole point of the free month: you get to use the finished site, on your own address, before any money changes hands.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">How to cancel</h2>
          <p>
            Cancel yourself, any time, from your billing page. No notice period, no phone call, no reason needed. You can also email <a href="mailto:support@sylentt.com" className="text-accent underline">support@sylentt.com</a> and we will do it for you. Cancellation takes effect at the end of the month you have already paid for, and you keep the site until then.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">Monthly payments are not refunded</h2>
          <p>
            Because you get a full free month to decide, monthly payments after the trial are not refunded as a matter of course. If something has genuinely gone wrong, write to us anyway. We would rather hear about it than not.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">What happens to the site when you cancel</h2>
          <p>
            If you cancel, we take the site offline at the end of your paid period. There is nothing for you to return and no account to close. If you have been on the plan for <strong>twelve months</strong>, the site&apos;s code repository has been transferred into your name and is yours to keep and host anywhere, whether or not you continue with us. If you cancel before twelve months, the code is not transferred.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">Charges you don&apos;t recognise</h2>
          <p>
            Payments from us appear on card statements as <strong>SYLENTT PARTNERS</strong>. If you see that and can&apos;t place it, email <a href="mailto:support@sylentt.com" className="text-accent underline">support@sylentt.com</a> before contacting your bank. We&apos;ll identify the charge straight away and refund it immediately if it isn&apos;t yours.
          </p>
        </section>
      </div>

      <footer className="mt-14 pt-6 border-t border-border text-sm text-ink/60">
        Sylentt Partners LLC &middot; 18121 E. Hampden Ave. Unit C - 751 Aurora, CO 80013 United States &middot; <a href="mailto:support@sylentt.com" className="text-accent underline">support@sylentt.com</a>
      </footer>
    </div>
  );
}
