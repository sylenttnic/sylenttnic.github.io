import type { Metadata } from 'next';
import Image from 'next/image';
import { ChevronDown, Check } from 'lucide-react';
import RequestFormChooser from '@/components/webdesign/RequestFormChooser';
import SampleGallery from '@/components/webdesign/SampleGallery';

const OFFER_SUMMARY =
  'A website designed and hand-built for one business: researched, written and coded from scratch. $9.99 a month, first 30 days free, and the site is yours after a year on the plan.';

export const metadata: Metadata = {
  title: 'Custom websites for local businesses | Sylentt',
  description: OFFER_SUMMARY,
  alternates: {
    canonical: 'https://sylentt.com/webdesign/',
  },
  openGraph: {
    title: 'Custom websites for local businesses | Sylentt',
    description: OFFER_SUMMARY,
    url: 'https://sylentt.com/webdesign/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom websites for local businesses | Sylentt',
    description: OFFER_SUMMARY,
  },
};

/* COPY LENGTH IS A DESIGN CONSTRAINT ON THIS PAGE, NOT AN ACCIDENT.
 *
 * This is a cold paid-traffic landing page. A reader arrives from a Facebook ad
 * promising a free look at a website, on a phone, with no prior relationship.
 * The job of the page is to let them decide whether they want one, fast.
 *
 * So: every claim is made ONCE. The plan terms live in the pricing card and
 * nowhere else. Methodology sits BELOW the form, because it answers a question
 * a buyer asks after they are interested, not before. If you are adding copy
 * here, first find what it replaces.
 *
 * What may not be cut, whatever the word count: the plan terms in the pricing
 * card (price, free trial, cancellation, the twelve-month transfer AND what
 * happens if you cancel before it), the statement descriptor, and the line
 * saying our artwork is illustrative. Those are the terms of the offer and an
 * honesty disclosure, not sales copy.
 */

const whatYouGetCards = [
  {
    title: 'A design made for you',
    text: 'Layout, type and colour chosen for your trade, your market and the impression you need to make in the first three seconds.',
  },
  {
    title: 'Every word written for you',
    text: 'Headlines, service descriptions, buttons, page titles, the text behind your images. Written from your own material and your own reviews.',
  },
  {
    title: 'Artwork made for your page',
    text: 'Not a stock photo three competitors are also using. It is illustrative and the site says so; we never pass artwork off as photographs of your crew or your work.',
  },
  {
    title: 'Set up to be found',
    text: 'Page titles, descriptions and structured data marked up for your trade and your service area, so search engines and map results read your business correctly.',
  },
  {
    title: 'Fast on a real phone',
    text: 'Built by hand from HTML and CSS. It loads in about a second on a phone, and the content and your phone number still work with JavaScript switched off.',
  },
  {
    title: 'We host it and keep it running',
    text: 'Hosting, SSL, backups and security patches handled for you, plus up to two small content changes a month. Nothing to log into, nothing to keep patched.',
  },
];

const howItIsMade = [
  {
    title: 'We read your market before we draw anything',
    text: 'The businesses ranking above you in your own city, your reviews and theirs, everything you already publish, and the language that already wins for your trade in your town. Every fact that reaches your page traces to that research document with a source beside it. Not a statistic, not a credential, not a service you do not offer.',
  },
  {
    title: 'Built by hand, which is why it is fast',
    text: 'HTML, CSS and a small amount of JavaScript, written for your site. No theme to conflict, no page builder to upgrade, no plugins and no database. That is where the speed comes from, and it is why there is nothing to keep patched and no admin login to break into.',
  },
  {
    title: 'Checked against every site we have built',
    text: 'Every site we build is logged: its typeface, its dominant colour, its layout structure, its aesthetic family. A new design is checked against that log before it is drawn, and two businesses in the same trade and the same city cannot share any of them. No two sites we have ever built repeat the same typeface, colour and layout combination. That is a file and a check that fails the build, not a promise in a sales page.',
  },
  {
    title: 'Checked by someone who did not build it',
    text: 'Every build is inspected against the research document and the standards below. Anything found gets fixed and re-checked. Nothing ships with an open finding.',
  },
];

const budgetRows = [
  { what: 'Lighthouse, mobile', bar: '95 or better in all four categories' },
  { what: 'Largest content paint', bar: 'Under 2 seconds on a throttled mobile connection' },
  { what: 'Whole page', bar: 'Under 900 KB, images included' },
  { what: 'JavaScript', bar: 'Under 20 KB' },
  { what: 'Contrast', bar: 'WCAG AA, 4.5:1 body text, 3:1 large text' },
  { what: 'Works without JavaScript', bar: 'Yes: navigation, content and contact' },
];

const faqItems = [
  {
    q: 'I already have a website. Is this for me?',
    a: 'Usually, yes. Most businesses we build for already have a site, it is just doing less for them than it should. Replacing a working-but-tired site is the normal case here, not the exception.',
  },
  {
    q: 'Do I have to get on a call?',
    a: 'No. The price is fixed and published for exactly that reason. You can talk it through if you want to, but nothing about the process requires it.',
  },
  {
    q: 'How long does it take?',
    a: 'Most of the work happens before you see anything, so what lands in front of you is a finished site to react to, not a project to manage. The first 30 days are free, so there is no rush to decide.',
  },
  {
    q: 'What happens if I cancel?',
    a: 'Cancel inside the first 30 days and you pay nothing. Cancel later and billing stops at the end of the month you have paid for, and the site comes down. Stay on the plan for twelve months and the code becomes yours to keep and host anywhere, whether you continue with us or not.',
  },
];

export default function WebDesignLandingPage() {
  return (
    <div className="bg-paper text-ink selection:bg-accent/20">
      {/* 1. Hero. Matched to the ad promise: see a website, free. */}
      <section className="pt-24 md:pt-36 pb-16 md:pb-24 px-4 container mx-auto text-center border-b border-ink/5">
        <div className="max-w-4xl mx-auto">
          <p className="eyebrow text-accent mb-4 font-semibold uppercase tracking-widest text-xs">
            Websites for local businesses
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink mb-6 text-balance">
            See your new website before you pay anything.
          </h1>
          <p className="text-lg md:text-xl text-ink/80 max-w-2xl mx-auto mb-8 font-sans leading-relaxed text-pretty">
            Tell us the business and the town. We research your trade and your city, design and build a real website for it, and email you the link. Look at the finished site first, then decide.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
            <a href="#tell-us" className="btn-cta px-8 py-4 text-lg inline-flex items-center gap-2 group w-full sm:w-auto justify-center">
              Build my free preview
              <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a href="#samples" className="px-8 py-4 text-lg rounded-xl font-bold text-ink bg-surface hover:bg-surface2 border border-ink/10 transition-colors inline-flex items-center gap-2 w-full sm:w-auto justify-center">
              See six we built
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xs md:text-sm text-ink/60 font-sans">
            $9.99 a month. First 30 days free. Cancel any time. Yours after a year.
          </p>
        </div>
      </section>

      {/* 2. The samples. Deliberately the first thing after the hero: the ads
          promise a look at a website, and everything below is an argument. */}
      <SampleGallery />

      {/* 3. What you get. One short card per item, because this is the scan. */}
      <section className="py-16 md:py-24 px-4 bg-surface border-y border-ink/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-12 text-center">
            What you get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {whatYouGetCards.map((card, i) => (
              <div
                key={i}
                className="bg-paper p-6 md:p-8 rounded-xl border border-ink/10 shadow-soft"
              >
                <h3 className="font-serif text-xl font-bold text-ink mb-3">{card.title}</h3>
                <p className="text-sm md:text-base text-ink/80 leading-relaxed font-sans">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pricing, directly after what you get.
          THE PLAN TERMS LIVE HERE AND ONLY HERE. Price, free trial, what is
          included, cancellation, the twelve-month transfer and what happens if
          you cancel before it. Anything that qualifies a benefit travels with
          the benefit; the terms page carries the long form. */}
      <section id="pricing" className="py-16 md:py-24 px-4 container mx-auto scroll-mt-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-paper p-8 md:p-10 rounded-2xl border-2 border-accent shadow-lift relative">
            <h2 className="font-display text-2xl font-bold text-ink mb-2">Your site, hosted and cared for</h2>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-display text-5xl font-bold text-ink">$9.99</span>
              <span className="text-sm font-sans text-ink/60">per month, plus tax</span>
            </div>
            <p className="text-sm font-sans text-accent font-semibold mb-4">First 30 days free</p>
            <p className="text-base text-ink/80 font-sans mb-6 leading-relaxed">
              Nothing to buy up front. We build the site, host it, and keep it running. Stay on the plan for twelve months and the code is yours to keep.
            </p>
            <ul className="space-y-3 mb-6 font-sans text-sm md:text-base text-ink/90">
              {[
                'Hosting, SSL, backups and uptime monitoring',
                'Security patches',
                'Up to two content changes a month: text, hours, contact details, an image swap, adding or removing a service',
                'A domain registered in your name after your first successful payment, or your existing one connected',
                'The code repository, transferred into your name after twelve months on the plan',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink/60 font-sans leading-relaxed mb-6">
              When the free period ends the plan renews automatically at $9.99 a month until you cancel. Content changes do not roll over month to month. Redesigns, new pages and new functionality are quoted separately. Cancel any time from your billing page, no phone call; billing stops at the end of the month you have paid for. If you cancel before twelve months, the site comes down and the code is not transferred. Payments appear on card statements as SYLENTT PARTNERS.{' '}
              <a href="/webdesign/terms/" className="underline hover:text-ink">
                Full terms
              </a>
              .
            </p>
            <a href="#tell-us" className="btn-cta w-full py-4 text-center text-lg inline-flex justify-center items-center gap-2 group">
              Build my free preview
              <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
          <p className="text-center text-xs md:text-sm text-ink/60 font-sans max-w-xl mx-auto mt-6">
            Already had a site from us in your inbox?{' '}
            <a
              href="https://buy.stripe.com/28EfZg20O772dZeaQs1Jm02"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-ink hover:text-accent"
            >
              Start the plan for it here
            </a>
            . Prefer to own the site outright instead of on the plan? Reply and ask; we will walk you through it.
          </p>
        </div>
      </section>

      {/* 5. The form, while they are still interested. The methodology below
          answers a question people ask AFTER they want one. */}
      <section id="tell-us" className="py-16 md:py-24 px-4 bg-surface border-y border-ink/5 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <p className="eyebrow text-accent mb-4 font-semibold uppercase tracking-widest text-xs">
              Free preview
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-6 text-balance">
              See yours before you decide
            </h2>
            <p className="text-lg text-ink/80 font-sans leading-relaxed">
              Tell us the business and the town. We do the research and build a preview of your site at no charge, then email you the link. If you like it, it is $9.99 a month with the first 30 days free. If not, nothing happens.
            </p>
          </div>
          <RequestFormChooser />
        </div>
      </section>

      {/* 6. How it is made. The whole methodology argument, compressed into one
          section below the form: research, build, uniqueness, QA. */}
      <section className="py-16 md:py-24 px-4 container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-4">
            How your site gets made
          </h2>
          <p className="text-lg text-ink/80 mb-12 font-sans leading-relaxed">
            &ldquo;Custom&rdquo; is a word anyone can type. This is the work behind it.
          </p>

          <div className="space-y-6 mb-12">
            {howItIsMade.map((row, i) => (
              <div key={i} className="flex gap-5 md:gap-6 p-6 rounded-xl bg-surface/50 border border-ink/5">
                <span className="font-display text-3xl font-bold text-accent shrink-0">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-xl font-bold text-ink mb-2">{row.title}</h3>
                  <p className="text-base text-ink/80 font-sans leading-relaxed">{row.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Collapsed by default: real pass-or-fail bars we are glad to
              publish, but they answer a question most owners never ask. */}
          <details className="group bg-paper p-6 md:p-8 rounded-xl border border-ink/10 shadow-soft">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-display text-xl md:text-2xl font-bold text-ink min-h-[44px]">
              <span>The numbers every build is held to</span>
              <ChevronDown className="w-5 h-5 text-ink/40 group-open:rotate-180 transition-transform shrink-0" />
            </summary>
            <p className="mt-4 mb-6 text-base text-ink/70 font-sans leading-relaxed">
              Open this if you want the engineering. These are pass-or-fail: a build that misses one does not ship until it does not.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-sm md:text-base border-collapse">
                <thead>
                  <tr className="border-b border-ink/10 text-ink/60 uppercase tracking-wider text-xs">
                    <th className="py-3 px-4">What</th>
                    <th className="py-3 px-4">The bar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10 text-ink/90">
                  {budgetRows.map((row, i) => (
                    <tr key={i} className="hover:bg-surface/50 transition-colors">
                      <td className="py-4 px-4 font-semibold">{row.what}</td>
                      <td className="py-4 px-4">{row.bar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          {/* Renders by default, deliberately. A disclosure inside a panel a
              reader opens for engineering numbers is not a disclosure. The
              scoping ("the site we build you") is the honesty fix from
              83382be and travels with the claim. */}
          <p className="mt-6 text-xs md:text-sm text-ink/70 font-sans leading-relaxed">
            The site we build you carries no analytics scripts, no advertising pixels and no third-party embeds, so there is nothing to disclose and no cookie banner over your homepage. This page you are reading is ours rather than a build, and it does run an advertising pixel;{' '}
            <a href="/webdesign/privacy/" className="underline hover:text-ink">
              our privacy policy
            </a>{' '}
            says so.
          </p>
        </div>
      </section>

      {/* 7. About. Trust is the binding constraint on a cold offer, and a name
          and a face carry more of it than another paragraph would. */}
      <section id="about" className="py-16 md:py-24 px-4 bg-surface border-y border-ink/5 scroll-mt-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[auto,1fr] gap-10 md:gap-14 items-center">
          <Image
            src="/about/nic.jpg"
            alt="Nic Aslett, founder of Sylentt Partners"
            width={224}
            height={224}
            loading="lazy"
            decoding="async"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-xl mx-auto"
          />
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-5">
              Hi, I&apos;m Nic.
            </h2>
            <div className="space-y-4 text-base md:text-lg text-ink/90 leading-relaxed font-sans">
              <p>
                Fifteen years an engineer, building infrastructure and software behind the scenes. When you work with Sylentt Partners on a web build, you work directly with me: your site is built by hand, from scratch.
              </p>
              <p>
                I run Sylentt Partners from Cache Valley, Utah, and build for businesses anywhere in the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ. Four objections, not six explanations. */}
      <section className="py-16 md:py-24 px-4 container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-12 text-center">
            Questions people actually ask
          </h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <details key={i} className="group border-b border-ink/10 pb-6 cursor-pointer">
                <summary className="flex items-center justify-between list-none font-serif text-xl md:text-2xl font-bold text-ink">
                  <span>{item.q}</span>
                  <ChevronDown className="w-5 h-5 text-ink/40 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="mt-4 text-base md:text-lg text-ink/80 font-sans leading-relaxed">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Closing call to action. */}
      <section className="py-20 md:py-32 px-4 bg-ink text-paper text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-paper text-balance">
            Ready to see what yours would look like?
          </h2>
          <p className="text-lg md:text-xl text-paper/80 mb-10 font-sans leading-relaxed">
            One site, built for your business, at $9.99 a month with the first 30 days free.
          </p>
          <div>
            <a href="#tell-us" className="btn-cta px-10 py-5 text-xl inline-flex items-center gap-2">
              Build my free preview
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
