import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Sylentt',
  description: 'Terms of Service for Sylentt Partners LLC Web Design.',
};

export default function TermsOfService() {
  return (
    <div className="pt-24 md:pt-36 pb-16 md:pb-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink mb-2">Terms of Service</h1>
      <p className="text-sm text-ink/60 pb-6 mb-8 border-b border-border">
        Sylentt Partners LLC, doing business as Sylentt &middot; Effective 22 August 2026
      </p>

      <p className="text-lg text-ink/90 mb-8">
        These terms apply when you buy a website from us. Please read them before you pay &mdash; completing a purchase means you accept them.
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
            We build websites for small businesses on speculation. That means we researched your business using publicly available information, designed and built a complete website for it, and then contacted you to ask whether you want it. <strong>You did not commission this work and you are under no obligation of any kind.</strong> If you are not interested, ignore us &mdash; the preview comes down on its own.
          </p>
          <p className="mt-3">
            Each preview is published at a temporary address, hidden from search engines, and stays online for approximately two weeks. If nobody buys it, we take it offline and delete it within six months. Nothing is billed unless you choose to buy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">3. What you get for the price</h2>
          <p>A one-time payment buys you the finished website shown in your preview:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>The site live and working straight away</strong>, at your own web address.
            </li>
            <li>
              <strong>Your own code repository</strong> containing everything the site is made of &mdash; not a file we email you. You own it outright, and you can hand it to any developer you like, at any time, without asking us.
            </li>
            <li>Reasonable help getting it live and pointed at your domain.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">4. The first two weeks, and when ownership transfers</h2>
          <p>
            We want to be completely straightforward about this, because it is the one part that isn&apos;t obvious.
          </p>
          <p className="mt-3">
            <strong>Your site goes live immediately.</strong> From the moment you pay, it is running, resolving at your address, and yours to use and show to customers. Nothing about it is held back or watermarked.
          </p>
          <p className="mt-3">
            For the <strong>first fourteen days we host and run it</strong> while you satisfy yourself that it&apos;s right. This is the same fourteen days in which you can ask for a full refund for any reason. <strong>On day fifteen, the repository transfers into your name</strong> and the whole thing is unambiguously yours.
          </p>
          <p className="mt-3">
            <strong>Would you rather have it sooner? Just ask.</strong> We&apos;ll transfer the repository to you on any day you like. The only condition is that taking ownership early ends the refund window &mdash; it wouldn&apos;t be fair to us for you to keep the site and take the money back, and it wouldn&apos;t be fair to you if we weren&apos;t clear about that up front. The choice is entirely yours, either way.
          </p>
          <p className="mt-3">
            Transferring a repository needs a free account with our code host, and we&apos;ll walk you through it. It takes a couple of minutes and you only ever do it once.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">5. What is not included</h2>
          <p>So there is no confusion later, the price does <strong>not</strong> include:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Ongoing hosting, domain registration, or email hosting.</li>
            <li>Ongoing maintenance, content updates, or redesigns after handover.</li>
            <li>Search engine optimisation services, advertising, or marketing work.</li>
            <li>Support beyond reasonable assistance with the initial handover.</li>
          </ul>
          <p className="mt-3">
            Most of the above is available separately under our care plan &mdash; see below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">6. Care plan (optional, sold separately)</h2>
          <p>
            After handover you can choose to put the site on our care plan. It is entirely optional, it is never added automatically, and the website is yours whether you take it or not.
          </p>
          <p className="mt-2">The plan covers:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Hosting, SSL certificate, backups, uptime monitoring and security updates.</li>
            <li>
              <strong>Up to two content changes per calendar month</strong> &mdash; editing text, updating your hours or contact details, swapping an image, adding or removing a service.
            </li>
          </ul>
          <p className="mt-3">
            It does not cover redesigns, new pages, or new functionality. Those are quoted separately, and we will always tell you the price before doing any of it. Unused changes do not carry over to the following month.
          </p>
          <p className="mt-3">
            The plan bills monthly and <strong>you can cancel at any time</strong>, yourself, from the billing portal &mdash; no notice period and no phone call. Cancellation takes effect at the end of the month you have already paid for. If you cancel, we will help you move the site to a host of your choosing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">7. Ownership</h2>
          <p>
            The website we built for you is yours. You own the design, layout, copy and code, and you may modify, host, sell or discard it as you see fit. We keep no claim over any of it. Section 4 sets out when the repository transfers into your name; that is a question of timing, not of who owns what. We may reference the work as an example of what we do, unless you ask us not to.
          </p>
          <p className="mt-3">
            Your business name, logo, trademarks, photographs and customer reviews remain yours and always were.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">8. Imagery &mdash; please read this one</h2>
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
            We assembled the details on your site &mdash; services, service area, hours, contact information &mdash; from sources your business controls or that are publicly published. We take care, but we are working from the outside. <strong>You are responsible for checking that everything on the site is accurate before you rely on it</strong>, and we will correct anything you tell us is wrong.
          </p>
          <p className="mt-3">
            Any customer reviews shown are real, were published publicly by the people who wrote them, and are quoted without alteration. If you would rather they were not displayed, tell us and we will remove them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">10. Refunds</h2>
          <p>
            See our <a href="/webdesign/refunds" className="text-accent underline">refund policy</a>. In short: full refund within 14 days of purchase, no explanation required.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">11. Payment</h2>
          <p>
            Payments are processed by Stripe. We never see or store your card details. Prices are in US dollars. You are responsible for any taxes that apply to you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink mt-8 mb-3">12. What we promise, and what we don&apos;t</h2>
          <p>
            We build the site with care and we stand behind the work. We do not promise that it will produce any particular result &mdash; we cannot promise you more customers, higher rankings, or more revenue, and you should be suspicious of anyone who does.
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
