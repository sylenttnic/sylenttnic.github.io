import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sylentt',
  description: 'Privacy Policy for Sylentt Partners LLC Web Design.',
  alternates: {
    canonical: 'https://sylentt.com/webdesign/privacy/',
  },
  openGraph: {
    title: 'Privacy Policy | Sylentt',
    description: 'Privacy Policy for Sylentt Partners LLC Web Design.',
    url: 'https://sylentt.com/webdesign/privacy/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Sylentt',
    description: 'Privacy Policy for Sylentt Partners LLC Web Design.',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 md:pt-36 pb-16 md:pb-24 px-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/webdesign"
          className="text-sm font-sans text-accent-link hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          &larr; Back to Web Design
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink mb-2">Privacy Policy</h1>
      <p className="text-sm text-ink/60 pb-6 mb-8 border-b border-border">
        Sylentt Partners LLC &middot; Effective 15 November 2026
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
            All of it came from sources your business controls or that are published openly - your own website, your business listings, and public review pages. <strong>We did not buy your data, and we did not use any private or restricted source.</strong> We hold it only to build and offer you the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">2. Information you give us</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>If you start the plan:</strong> your name, business name, email address and billing address, collected through Stripe.</li>
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
            <li><strong>Stripe</strong>: payment processing</li>
            <li><strong>Cloudflare</strong>: hosting and delivery of website previews and of the sites we look after, and holding what you write in the change chat on your account page, and the changes you send from it, for up to 30 days, and photos you upload</li>
            <li><strong>Anthropic</strong> (maker of the Claude AI models): our build and change work runs on Claude. It reads the information in section 1 to build your site, the change requests you send and any photos you send with them, and what you write in the change chat on your account page, so our system can turn it into a list of changes for you to check. Each chat message is sent with your earlier messages in the same conversation, the chat&apos;s replies, and a short summary of your account (your business name, your design and your plan).</li>
            <li><strong>GitHub</strong>: storing our own records, including the information in section 1, your site&apos;s files, and the change requests and photos you send us</li>
            <li><strong>Resend</strong>: sending our emails about your account and site (sign-in links, the email that confirms you control your business&apos;s address, and account notices), our replies to a business that asked for a preview on our page, and forwarding messages sent through your site&apos;s contact form to you</li>
            <li><strong>Web3Forms</strong>: delivery of contact form submissions</li>
            <li><strong>Instantly</strong> and <strong>Google Workspace</strong>: sending and receiving email</li>
            <li><strong>HubSpot</strong>: keeping track of conversations</li>
            <li><strong>Meta</strong> (Facebook): measuring and improving our own ads on our web design pages, only once you click OK on the notice described in section 8</li>
          </ul>
          <p className="mt-3">
            <strong>We do not sell your information.</strong> On our web design pages at sylentt.com/webdesign we use the Meta Pixel (see section 8): once you click OK on the notice shown there, it reports activity such as page views and preview requests to Meta so we can measure our own ads and reach similar people. Click No thanks instead and the Pixel never loads on that browser. That is the only advertising sharing we do, and you can limit it through the controls in section 8, whichever way you choose.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">5. Email from us</h2>
          <p>
            If we emailed you about a website we built, every message carries a working unsubscribe link and our mailing address. Unsubscribe and we stop - permanently, promptly, and without needing a reason. You can also simply reply and say so.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">6. How long we keep things</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Unsold previews:</strong> a preview we email you about stays online for about two weeks after that email. If nobody keeps it, we take it offline within a day or so after, and its address then sends visitors to our offer page; we release the address six months later. A preview we have not emailed anyone about is not taken offline on that schedule. Either way, we keep the site&apos;s files in our records.</li>
            <li><strong>Change chat conversations</strong>, including the lists of changes the chat suggested: deleted automatically 30 days after the last message in them.</li>
            <li><strong>Change requests you send:</strong> once you press Send these changes and our system records the request, what you asked for is kept in your site&apos;s records, with no set end date, and listed under Your changes on your account page. That includes a request we cannot make because it is outside the plan. A request our system does not record is not kept there, and is deleted automatically within 30 days of your pressing Send, apart from the change chat it came from (above).</li>
            <li><strong>Photos you upload from your account page:</strong> the photo as you uploaded it is held in our account system at Cloudflare for up to 30 days, whether or not you send it, and is then deleted automatically. If you send it with a change request and our system records that request, we keep a copy of it in your site&apos;s records, with no set end date. That copy has the photo&apos;s location and its other hidden photo data removed.</li>
            <li><strong>Unsubscribe records:</strong> kept indefinitely - this is the only way we can be sure we never contact you again.</li>
            <li><strong>Purchase records:</strong> kept as long as tax and accounting law requires.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">7. Asking us to delete your information</h2>
          <p>
            Email <a href="mailto:support@sylentt.com" className="text-accent-link underline">support@sylentt.com</a> and ask. We&apos;ll delete what we hold about your business and confirm when it&apos;s done. The one thing we keep is your email address on our suppression list, precisely so you are never contacted again - if you&apos;d rather we didn&apos;t keep even that, say so and we&apos;ll remove it.
          </p>
          <p className="mt-3">
            Depending on where you live you may have additional rights over your data. Ask and we&apos;ll honour them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">8. Cookies</h2>
          <p>
            The website previews we build do not use tracking or advertising cookies. Our own web design pages at sylentt.com/webdesign show a notice before the Meta Pixel runs anywhere on them. Nothing loads until you choose: click <strong>OK</strong> and the Meta Pixel sets an advertising cookie (_fbp) and reports activity such as page views and preview requests to Meta, so we can measure how our ads perform. Click <strong>No thanks</strong> instead and the Pixel never loads in that browser: your browser remembers the choice, so you are not asked again there. Either choice leaves your preview request untouched; declining the Pixel does not change how we handle it. You can also set your preferences directly with Meta at <a href="https://www.aboutads.info/choices" className="text-accent-link underline">aboutads.info/choices</a> and <a href="https://www.youronlinechoices.eu" className="text-accent-link underline">youronlinechoices.eu</a>. Stripe&apos;s checkout page sets cookies necessary to process a payment securely.
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
        Questions, or want your information removed? Email <a href="mailto:support@sylentt.com" className="text-accent-link underline">support@sylentt.com</a>. A person reads it.<br />
        Sylentt Partners LLC &middot; 145 E 550 N Unit 75 Richmond, UT 84333 United States
      </footer>
    </div>
  );
}
