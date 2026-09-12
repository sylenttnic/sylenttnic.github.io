import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Sylentt',
  description: 'Terms of Service for Sylentt Partners LLC Web Design.',
  alternates: {
    canonical: 'https://sylentt.com/webdesign/terms/',
  },
  openGraph: {
    title: 'Terms of Service | Sylentt',
    description: 'Terms of Service for Sylentt Partners LLC Web Design.',
    url: 'https://sylentt.com/webdesign/terms/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Sylentt',
    description: 'Terms of Service for Sylentt Partners LLC Web Design.',
  },
};

export default function TermsOfService() {
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
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink mb-2">Terms of Service</h1>
      <p className="text-sm text-ink/60 pb-6 mb-8 border-b border-border">
        Sylentt Partners LLC, doing business as Sylentt &middot; Effective 12 September 2026
      </p>

      <p className="text-lg text-ink/90 mb-8">
        These terms apply when you put a website we built on our monthly plan. Please read them before you start - starting the plan means you accept them.
      </p>

      <div className="prose prose-slate max-w-none text-ink/90 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">1. Who we are</h2>
          <p>
            Sylentt is operated by <strong>Sylentt Partners LLC</strong>, a Colorado limited liability company, mailing address 18121 E. Hampden Ave. Unit C - 751 Aurora, CO 80013 United States. You can reach us at <a href="mailto:support@sylentt.com" className="text-accent underline">support@sylentt.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">2. How this works, and why you&apos;re seeing a site you didn&apos;t ask for</h2>
          <p>
            We build websites for small businesses on speculation. That means we researched your business using publicly available information, designed and built a complete website for it, and then contacted you to ask whether you want it. <strong>You did not commission this work and you are under no obligation of any kind.</strong> If you are not interested, ignore us - the preview comes down on its own.
          </p>
          <p className="mt-3">
            Each preview is published at a temporary address, hidden from search engines, and stays online for approximately two weeks. If nobody keeps it, we take it offline and delete it within six months. Nothing is billed unless you start the plan, and the first 30 days of the plan are free.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">3. What the plan gives you</h2>
          <p>The monthly plan gives you the finished website shown in your preview, live and looked after:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>The site live and working straight away</strong>, at your own web address, hosted and run by us.
            </li>
            <li>
              Hosting, SSL, backups, uptime monitoring and security patches, plus <strong>up to two small content changes a calendar month</strong>.
            </li>
            <li>
              <strong>Your own code repository</strong> containing everything the site is made of, transferred into your name after twelve months on the plan (see section 4). You can then hand it to any developer you like, at any time, without asking us.
            </li>
            <li>Reasonable help getting it live and pointed at your domain.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">4. The free month, the monthly plan, and when the code becomes yours</h2>
          <p>
            We want to be completely straightforward about this, because it is the part that matters most.
          </p>
          <p className="mt-3">
            <strong>Your site goes live immediately, and the first 30 days are free.</strong> From the moment you start, it is running, resolving at your address, and yours to use and show to customers. Nothing about it is held back or watermarked. If you cancel within those 30 days, you are charged nothing.
          </p>
          <p className="mt-3">
            After the free month, the plan renews automatically at <strong>$9.99 per month plus any applicable tax</strong>, and it keeps renewing each month until you cancel. <strong>You can cancel any time</strong>, yourself, from your billing page, with no notice period and no phone call. Cancellation takes effect at the end of the month you have already paid for, and the site is taken offline at that point.
          </p>
          <p className="mt-3">
            <strong>Stay on the plan for twelve months and the code becomes yours.</strong> At that point we transfer the site&apos;s code repository into your name, to keep and host anywhere, whether or not you continue with us afterwards. <strong>If you cancel before twelve months, the site comes down and the code is not transferred</strong> - the plan is what keeps the site live, and the twelve months is what earns the handover. We say this plainly here so it is never a surprise.
          </p>
          <p className="mt-3">
            Transferring a repository needs a free account with our code host, and we&apos;ll walk you through it. It takes a couple of minutes and you only ever do it once.
          </p>
          <p className="mt-3">
            While you are on the plan we host the site for you and the code can stay private. If you take the code after the twelve months and want to host it yourself, our code host offers free hosting for public repositories; keeping it private then needs a paid plan with them. Either way, that only affects who can read the code behind the site, never the website your customers see.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">5. What is not included</h2>
          <p>So there is no confusion later, the plan does <strong>not</strong> include:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Redesigns, new pages, or new functionality. These are quoted separately.</li>
            <li>Email hosting.</li>
            <li>Search engine optimisation services, advertising, or marketing work.</li>
            <li>More than two content changes in a calendar month. Unused changes do not carry over.</li>
          </ul>
          <p className="mt-3">
            Hosting, SSL, backups, uptime monitoring, security patches and up to two content changes a month are included; see section 3. A domain, if you need one, is registered in your name after your first month, or we point one you already own.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">6. The monthly plan</h2>
          <p>
            The monthly plan is how your site stays live and looked after. After the free first month it bills at <strong>$9.99 per month plus any applicable tax</strong> and renews automatically each month until you cancel.
          </p>
          <p className="mt-2">It covers:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Hosting, SSL certificate, backups, uptime monitoring and security updates.</li>
            <li>
              <strong>Up to two content changes per calendar month</strong>: editing text, updating your hours or contact details, swapping an image, adding or removing a service.
            </li>
          </ul>
          <p className="mt-3">
            It does not cover redesigns, new pages, or new functionality. Those are quoted separately, and we will always tell you the price before doing any of it. Unused changes do not carry over to the following month.
          </p>
          <p className="mt-3">
            <strong>You can cancel at any time</strong>, yourself, from your billing page, with no notice period and no phone call. Cancellation takes effect at the end of the month you have already paid for, and the site is taken offline then. If you have completed twelve months on the plan, the code repository is already yours to keep (section 4).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">7. Ownership</h2>
          <p>
            While you are on the plan, the website is yours to use, show to customers and rely on as your own. The design, layout and copy were made for you and for no one else. The code itself transfers into your name after twelve months on the plan (section 4); until then we host and maintain it for you. Once transferred, you may modify, host, sell or discard it as you see fit, and we keep no claim over it. We may reference the work as an example of what we do, unless you ask us not to.
          </p>
          <p className="mt-3">
            Your business name, logo, trademarks, photographs and customer reviews remain yours and always were.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">8. Imagery - please read this one</h2>
          <p>
            <strong>Illustrative imagery on these sites is generated by AI.</strong> It is not photography of your premises, your staff, your equipment or your completed work, and it is never presented as such. It is licensed to you for use on the site you purchase.
          </p>
          <p className="mt-3">
            If you want photographs of your actual business on the site, send them to us and we will put them in. We think you should.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">9. Your business information, and reviews</h2>
          <p>
            We assembled the details on your site - services, service area, hours, contact information - from sources your business controls or that are publicly published. We take care, but we are working from the outside. <strong>You are responsible for checking that everything on the site is accurate before you rely on it</strong>, and we will correct anything you tell us is wrong.
          </p>
          <p className="mt-3">
            Any customer reviews shown are real, were published publicly by the people who wrote them, and are quoted without alteration. If you would rather they were not displayed, tell us and we will remove them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">10. Billing and cancellation</h2>
          <p>
            See our <Link href="/webdesign/refunds" className="text-accent underline">billing and cancellation policy</Link>. In short: the first 30 days are free, it is then $9.99 a month plus tax, and you can cancel any time from your billing page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">11. Payment</h2>
          <p>
            Payments are processed by Stripe. We never see or store your card details. Prices are in US dollars, and the plan is a recurring monthly subscription: after the free first month it renews automatically at $9.99 per month plus any applicable tax until you cancel. You can cancel any time from your billing page, and you are responsible for any taxes that apply to you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">12. What we promise, and what we don&apos;t</h2>
          <p>
            We build the site with care and we stand behind the work. We do not promise that it will produce any particular result - we cannot promise you more customers, higher rankings, or more revenue, and you should be suspicious of anyone who does.
          </p>
          <p className="mt-3">
            To the fullest extent the law allows, our total liability to you for anything arising out of this purchase is limited to the amount you paid us. We are not liable for indirect or consequential losses such as lost profits or lost business.
          </p>
          <p className="mt-3">
            Nothing here limits any liability that cannot lawfully be limited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">13. Email from us</h2>
          <p>
            If we contacted you by email, every message includes a working unsubscribe link and our mailing address. Use it and we will stop, permanently and promptly. You can also just reply and tell us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">14. Changes to these terms</h2>
          <p>
            We may update these terms. The version in force for your purchase is the one published on this page at the moment you paid, and changes are not retroactive.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">15. Governing law</h2>
          <p>
            These terms are governed by the laws of the State of Colorado, USA, and any dispute will be handled in the courts of that state.
          </p>
        </section>
      </div>

      <footer className="mt-14 pt-6 border-t border-border text-sm text-ink/60">
        Questions about any of this? Email <a href="mailto:support@sylentt.com" className="text-accent underline">support@sylentt.com</a> and a person will answer.
      </footer>
    </div>
  );
}
