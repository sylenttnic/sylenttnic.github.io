import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sylentt',
  description: 'Privacy Policy for Sylentt Partners LLC Web Design.',
};

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 md:pt-36 pb-16 md:pb-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink mb-2">Privacy Policy</h1>
      <p className="text-sm text-ink/60 pb-6 mb-8 border-b border-border">
        Sylentt Partners LLC &middot; Effective 22 August 2026
      </p>

      <p className="text-lg text-ink/90 mb-8">
        This explains what information we hold, where it came from, and what we do with it. It is written to be read, not to be skipped.
      </p>

      <div className="prose prose-slate max-w-none text-ink/90 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">1. Information we collected before you were a customer</h2>
          <p>
            This is the unusual one, so it goes first. If we built a website preview for your business, we gathered information about that business <strong>before you had any contact with us</strong>. Specifically: your business name, address, phone number, published email address, opening hours, services, and publicly posted customer reviews.
          </p>
          <p className="mt-3">
            All of it came from sources your business controls or that are published openly &mdash; your own website, your business listings, and public review pages. <strong>We did not buy your data, and we did not use any private or restricted source.</strong> We hold it only to build and offer you the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">2. Information you give us</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>If you buy:</strong> your name, business name, email address and billing address, collected through Stripe.</li>
            <li><strong>If you contact us:</strong> whatever you put in a form or an email.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">3. Payment details</h2>
          <p>
            Payments are processed by <strong>Stripe</strong>. Your card number never reaches us and we never store it. Stripe&apos;s handling of your data is governed by their own privacy policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">4. Who else touches your information</h2>
          <p>We use a small number of service providers to run the business, and they see only what they need to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Stripe</strong> &mdash; payment processing</li>
            <li><strong>Cloudflare</strong> &mdash; hosting and delivery of website previews</li>
            <li><strong>Web3Forms</strong> &mdash; delivery of contact form submissions</li>
            <li><strong>Instantly</strong> and <strong>Google Workspace</strong> &mdash; sending and receiving email</li>
            <li><strong>HubSpot</strong> &mdash; keeping track of conversations</li>
          </ul>
          <p className="mt-3">
            <strong>We do not sell your information, and we do not share it for anyone else&apos;s advertising.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">5. Email from us</h2>
          <p>
            If we emailed you about a website we built, every message carries a working unsubscribe link and our mailing address. Unsubscribe and we stop &mdash; permanently, promptly, and without needing a reason. You can also simply reply and say so.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">6. How long we keep things</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Unsold previews:</strong> taken offline after about two weeks and deleted within six months.</li>
            <li><strong>Unsubscribe records:</strong> kept indefinitely &mdash; this is the only way we can be sure we never contact you again.</li>
            <li><strong>Purchase records:</strong> kept as long as tax and accounting law requires.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">7. Asking us to delete your information</h2>
          <p>
            Email <a href="mailto:support@sylentt.com" className="text-accent underline">support@sylentt.com</a> and ask. We&apos;ll delete what we hold about your business and confirm when it&apos;s done. The one thing we keep is your email address on our suppression list, precisely so you are never contacted again &mdash; if you&apos;d rather we didn&apos;t keep even that, say so and we&apos;ll remove it.
          </p>
          <p className="mt-3">
            Depending on where you live you may have additional rights over your data. Ask and we&apos;ll honour them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">8. Cookies</h2>
          <p>
            Our website previews do not use tracking or advertising cookies. Stripe&apos;s checkout page sets cookies necessary to process a payment securely.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">9. Children</h2>
          <p>
            This is a service for businesses. We do not knowingly collect information from anyone under 18.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">10. Changes</h2>
          <p>
            If we change this policy, the updated version appears here with a new effective date.
          </p>
        </section>
      </div>

      <footer className="mt-14 pt-6 border-t border-border text-sm text-ink/60">
        Questions, or want your information removed? Email <a href="mailto:support@sylentt.com" className="text-accent underline">support@sylentt.com</a>. A person reads it.<br />
        Sylentt Partners LLC &middot; 18121 E. Hampden Ave. Unit C - 751 Aurora, CO 80013 United States
      </footer>
    </div>
  );
}
