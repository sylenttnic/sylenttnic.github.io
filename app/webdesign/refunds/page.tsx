import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | Sylentt',
  description: 'Refund Policy for Sylentt Partners LLC Web Design.',
};

export default function RefundPolicy() {
  return (
    <div className="pt-24 md:pt-36 pb-16 md:pb-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink mb-2">Refund Policy</h1>
      <p className="text-sm text-ink/60 pb-6 mb-8 border-b border-border">
        Sylentt Partners LLC &middot; Effective 22 August 2026
      </p>

      <div className="border-l-4 border-accent pl-4 py-2 my-6 bg-surface/50 text-ink/90 rounded-r">
        <p className="font-semibold mb-0">
          Full refund within 14 days of purchase, for any reason. Email us and we&apos;ll return the payment - no explanation needed.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-ink/90 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">Why we can offer this</h2>
          <p>
            We build each website <em>before</em> you buy it. You see the finished site - the real one, not a mockup - before any money changes hands. There is no gap between what you were shown and what you paid for, which is why we can afford to be relaxed about refunds.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">How to request one</h2>
          <p>
            Email <a href="mailto:support@sylentt.com" className="text-accent underline">support@sylentt.com</a> from any address, within 14 days of your payment. Say you want a refund. That&apos;s the whole process - you don&apos;t need to give a reason and we won&apos;t ask for one.
          </p>
          <p className="mt-3">
            We process refunds within two business days of receiving the request. The money returns to the card you paid with. Depending on your bank, it can take a further 5-10 business days to appear on your statement - that part is out of our hands.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">What happens to the site</h2>
          <p>
            During the fourteen days we host and run the site for you, so there is nothing for you to return - we simply take it offline and that&apos;s the end of it. No files to delete, no accounts to close, nothing to argue about.
          </p>
          <p className="mt-3">
            If you asked us to transfer the site to you early, the refund window closed at that point and this policy no longer applies. We tell you that clearly before we transfer anything, and we won&apos;t do it without you saying yes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">After 14 days</h2>
          <p>
            The window closes at 14 days. After that we&apos;re not able to offer a refund as a matter of course - but if something has genuinely gone wrong, write to us anyway. We would rather hear about it than not.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">Charges you don&apos;t recognise</h2>
          <p>
            Payments from us appear on card statements as <strong>SYLENTT PARTNERS</strong>. If you see that and can&apos;t place it, email <a href="mailto:support@sylentt.com" className="text-accent underline">support@sylentt.com</a> before contacting your bank - we&apos;ll identify the charge straight away and refund it immediately if it isn&apos;t yours.
          </p>
        </section>
      </div>

      <footer className="mt-14 pt-6 border-t border-border text-sm text-ink/60">
        Sylentt Partners LLC &middot; 18121 E. Hampden Ave. Unit C - 751 Aurora, CO 80013 United States &middot; <a href="mailto:support@sylentt.com" className="text-accent underline">support@sylentt.com</a>
      </footer>
    </div>
  );
}
