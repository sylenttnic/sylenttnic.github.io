import type { Metadata } from 'next';
import Image from 'next/image';
import { ChevronDown, Check, ArrowUpRight } from 'lucide-react';
import PreviewRequestForm from '@/components/webdesign/PreviewRequestForm';

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

const whatYouGetCards = [
  {
    title: 'A design made for you',
    text: 'Not a theme, not a starter kit. Layout, type and colour chosen for your trade, your market and the impression you need to make in the first three seconds.',
  },
  {
    title: 'Every word written',
    text: 'Headlines, service descriptions, buttons, page titles, the text behind your images. You do not get a site with placeholder text where your story should be.',
  },
  {
    title: 'Custom imagery',
    text: "Artwork made for your page, not a stock photo three of your competitors are also using. It's illustrative, and the site says so. We don't photograph your crew or your yard and pass it off as documentation.",
  },
  {
    title: 'Set up to be found',
    text: 'Page titles, descriptions, and structured data marked up for your trade and your service area, so search engines and map results read your business correctly.',
  },
  {
    title: 'A contact path that works',
    text: 'Phone, form, or both, reachable at every scroll depth, tested on a real phone before you see it.',
  },
  {
    title: 'We host it and keep it running',
    text: 'Hosting, SSL, backups and security patches are handled for you, plus up to two small content changes a month. Nothing to log into, nothing to keep patched.',
  },
];

const researchRows = [
  {
    title: 'Your competition, specifically',
    text: "The businesses ranking above you in your own city. What sections their sites run, what they promise, what they all charge for, and, more usefully, what every one of them looks like, because that's where the room to stand out is.",
  },
  {
    title: 'What your customers already say',
    text: 'Your reviews and theirs, read for the words real people use about this job. The phrase a customer uses is almost never the phrase the industry uses, and the site should speak the first one.',
  },
  {
    title: 'Everything you already publish',
    text: 'Your services, your service area, your hours, your contact details, your existing site if you have one. Facts about your business come from you, not from a directory that guessed.',
  },
  {
    title: 'What the search results reward here',
    text: 'The structure and language that already wins for the phrases someone types when they need your trade in your town.',
  },
];

const technicalPoints = [
  {
    title: 'No platform in the middle',
    text: 'HTML, CSS and a small amount of JavaScript, written for your site. There is no theme to conflict, no builder to upgrade, and no database to go down.',
  },
  {
    title: 'Nothing to keep patched',
    text: "Static files can't be exploited through a plugin you forgot to update. There's no admin login to brute-force, because there isn't an admin login.",
  },
  {
    title: 'It works when things go wrong',
    text: 'Turn JavaScript off and the navigation still opens, the content still reads, and your phone number is still a tap away. The polish is optional; the site isn\'t.',
  },
  {
    title: 'Accessible on purpose',
    text: "Contrast tested against WCAG AA, keyboard navigation, visible focus, touch targets sized for a thumb, and motion that switches itself off for anyone who's asked their device to reduce it.",
  },
  {
    title: 'No cookies, no trackers',
    text: 'No analytics scripts, no pixels, no third-party embeds. Nothing to disclose, so no cookie banner covering your homepage.',
  },
  {
    title: 'Checked before you see it',
    text: "Every build is inspected against the research document and the standards below by someone who didn't build it. Anything found gets fixed and re-checked. Nothing ships with an open finding.",
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

const ownershipBlocks = [
  {
    title: 'The first 30 days are free',
    text: 'Look at the finished site, use it, sit with it. If it is not for you, cancel inside the first month and you are charged nothing.',
  },
  {
    title: 'Then it is $9.99 a month',
    text: 'That covers hosting, security, backups and up to two small content changes a month. Cancel any time from your billing page, no phone call. Billing stops at the end of the month you have paid for.',
  },
  {
    title: 'Stay a year and the code is yours',
    text: 'After twelve months on the plan we transfer the site\'s code repository into your name, to keep and host anywhere. If you cancel before then, the site simply comes down and nothing transfers.',
  },
  {
    title: 'A domain we buy for you is yours',
    text: "Registered in your name, not ours, after your first month. Already have a domain? We point it at your site. Either way it stays yours.",
  },
];

const faqItems = [
  {
    q: 'I already have a website. Is this for me?',
    a: "Usually, yes. Most businesses we build for already have a site, it's just doing less for them than it should. Replacing a working-but-tired site is the normal case here, not the exception.",
  },
  {
    q: 'Do I have to get on a call?',
    a: "No. The price is fixed and published for exactly that reason. If you'd rather talk it through, you can, but nothing about the process requires it.",
  },
  {
    q: 'How long does it take?',
    a: "Most of the work, the research, the design, the writing, happens before you see anything, so what lands in front of you is a finished site to react to, not a project to manage. And the first 30 days on the plan are free, so there is no rush to decide.",
  },
  {
    q: 'What happens if I cancel?',
    a: 'Cancel inside the first 30 days and you pay nothing. Cancel later and billing stops at the end of the month you have paid for, and the site comes down. Stay on the plan for twelve months and the code becomes yours to keep and host anywhere, whether you continue with us or not.',
  },
  {
    q: 'What if I need changes later?',
    a: "Two small content changes a month are included. Bigger work, new pages, new features, a redesign, is quoted separately.",
  },
  {
    q: 'Who writes the words?',
    a: 'We do, from your own material and your own reviews. You read it and can change anything before it goes live.',
  },
];

export default function WebDesignLandingPage() {
  return (
    <div className="bg-paper text-ink selection:bg-accent/20">
      {/* Section 1: Hero */}
      <section className="pt-24 md:pt-36 pb-16 md:pb-24 px-4 container mx-auto text-center border-b border-ink/5">
        <div className="max-w-4xl mx-auto">
          <p className="eyebrow text-accent mb-4 font-semibold uppercase tracking-widest text-xs">
            Websites for local businesses
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink mb-6 text-balance">
            A website built for your business, not a template with your logo dropped in the corner.
          </h1>
          <p className="text-lg md:text-xl text-ink/80 max-w-2xl mx-auto mb-8 font-sans leading-relaxed text-pretty">
            We research your trade and your city, design one site that exists only for you, write every word of it from your own material, then host it and keep it running for you.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <a href="#tell-us" className="btn-cta px-8 py-4 text-lg inline-flex items-center gap-2 group">
              Start a build
              <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
          <p className="text-xs md:text-sm text-ink/60 font-sans">
            $9.99 a month. First 30 days free. Cancel any time. Yours after a year. No calls, no page builders.
          </p>
        </div>
      </section>

      {/* Section 2: Why we're here */}
      <section className="py-16 md:py-24 px-4 container mx-auto">
        <div className="max-w-2xl mx-auto text-ink/90 space-y-6 leading-relaxed text-lg">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-6 text-balance">
            Most local businesses end up with one of two websites
          </h2>

          <p>
            The first is a template. Same layout as forty other businesses in the same trade, same hero photo, your name typed into it. The second is a page-builder site that looked fine on the day it was made and now loads slowly, breaks on a phone, and costs a couple of hundred a month to keep its plugins from arguing with each other.
          </p>

          <p>
            We build the third thing. One site, designed for one business, built by hand from the ground up, and small enough to still be fast in five years. Below is how that actually gets done, because &ldquo;custom&rdquo; is a word anyone can type, and the difference is in the work behind it.
          </p>
        </div>
      </section>

      {/* Section 3: What you get */}
      <section className="py-16 md:py-24 px-4 bg-surface border-y border-ink/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-12 text-center">
            What you get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatYouGetCards.map((card, i) => (
              <div
                key={i}
                className="bg-paper p-8 rounded-xl border border-ink/10 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif text-xl font-bold text-ink mb-3">{card.title}</h3>
                  <p className="text-sm md:text-base text-ink/80 leading-relaxed font-sans">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: The research */}
      <section className="py-16 md:py-24 px-4 container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-4">
            We read your market before we draw anything
          </h2>
          <p className="text-lg text-ink/80 mb-12 font-sans leading-relaxed">
            Design decisions made from taste alone are guesses. These are the four things we study first, and every one of them ends up as a line in a research document with a source next to it.
          </p>

          <div className="space-y-8 mb-12">
            {researchRows.map((row, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-xl bg-surface/50 border border-ink/5">
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

          <div className="p-6 rounded-xl bg-paper border-l-4 border-accent shadow-soft text-ink font-sans text-base leading-relaxed">
            Nothing reaches your page that isn&apos;t in that document with a source beside it. Not a statistic, not a credential, not a service you don&apos;t offer.
          </div>
        </div>
      </section>

      {/* Section 5: How it's built */}
      <section className="py-16 md:py-24 px-4 bg-surface border-y border-ink/5">
        <div className="container mx-auto max-w-5xl">
          <div className="max-w-3xl mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-4">
              Built by hand, which is why it&apos;s fast
            </h2>
            <p className="text-lg text-ink/80 font-sans leading-relaxed">
              Speed isn&apos;t a setting we switch on at the end. It&apos;s what&apos;s left when a site has no theme, no page builder and no plugins underneath it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {technicalPoints.map((point, i) => (
              <div key={i} className="bg-paper p-6 rounded-xl border border-ink/10 shadow-soft">
                <h3 className="font-serif text-lg font-bold text-ink mb-2">{point.title}</h3>
                <p className="text-sm md:text-base text-ink/80 font-sans leading-relaxed">{point.text}</p>
              </div>
            ))}
          </div>

          {/* Budget Table */}
          <div className="bg-paper p-8 rounded-xl border border-ink/10 shadow-soft">
            <h3 className="font-display text-2xl font-bold text-ink mb-6">
              The numbers every build is held to
            </h3>
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
            <p className="mt-6 text-xs md:text-sm text-ink/70 font-sans italic border-t border-ink/10 pt-4">
              These are pass-or-fail. A build that misses one doesn&apos;t ship until it doesn&apos;t.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Uniqueness */}
      <section className="py-16 md:py-24 px-4 container mx-auto">
        <div className="max-w-2xl mx-auto text-ink/90 space-y-6 leading-relaxed text-lg">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-6 text-balance">
            Your site can&apos;t quietly become someone else&apos;s
          </h2>

          <p>
            Every site we build is logged: its typeface, its dominant colour, its layout structure, its whole aesthetic family. Before a new design is drawn it&apos;s checked against that log. Two businesses in the same trade and the same city cannot share any of those four. No two sites we have ever built repeat the same typeface, colour and layout combination.
          </p>

          <p>
            That&apos;s a rule with a file behind it and a check that fails the build, not a promise in a sales page.
          </p>
        </div>
      </section>

      {/* Section 7: Pricing */}
      <section id="pricing" className="py-16 md:py-24 px-4 bg-surface border-y border-ink/5 scroll-mt-24">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-paper p-8 md:p-10 rounded-2xl border-2 border-accent shadow-lift flex flex-col justify-between relative">
            <div>
              <h3 className="font-display text-2xl font-bold text-ink mb-2">Your site, hosted and cared for</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display text-5xl font-bold text-ink">$9.99</span>
                <span className="text-sm font-sans text-ink/60">per month, plus tax</span>
              </div>
              <p className="text-sm font-sans text-accent font-semibold mb-4">First 30 days free</p>
              <p className="text-base text-ink/80 font-sans mb-6 leading-relaxed">
                Nothing to buy up front. We build the site, host it, and keep it running. Stay on the plan for a year and the code is yours to keep.
              </p>
              <ul className="space-y-3 mb-6 font-sans text-sm md:text-base text-ink/90">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>Hosting, SSL, backups and uptime monitoring</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>Security patches</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>
                    Up to two content changes a month: text, hours, contact details, an image swap, adding or removing a service
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>The code repository, transferred into your name after twelve months on the plan</span>
                </li>
              </ul>
              <p className="text-xs text-ink/60 font-sans leading-relaxed mb-6">
                Content changes don&apos;t roll over month to month. Redesigns, new pages and new functionality aren&apos;t included; those are quoted separately. Cancel any time from your billing page. If you cancel before twelve months, the site comes down and the code is not transferred.
              </p>
            </div>
            <div className="space-y-3">
              <a href="#tell-us" className="btn-cta w-full py-4 text-center text-lg inline-flex justify-center items-center gap-2 group">
                Start a build
                <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://buy.stripe.com/dRmdR834S62Y08o9Mo1Jm01"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl font-bold text-ink bg-surface hover:bg-surface2 transition-colors text-center text-base inline-flex justify-center items-center gap-2 border border-ink/10"
              >
                Start the plan for a site we sent you
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <p className="text-center text-xs md:text-sm text-ink/60 font-sans max-w-xl mx-auto mt-6">
            One price, everything included. Prefer to own the site outright instead of on the plan? Reply to us and ask; we&apos;ll walk you through it.
          </p>
        </div>
      </section>

      {/* Section 8: How the plan works */}
      <section className="py-16 md:py-24 px-4 container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-12">
            Free to start, and yours in the end
          </h2>
          <div className="space-y-8 mb-8">
            {ownershipBlocks.map((block, i) => (
              <div key={i} className="p-6 rounded-xl bg-surface/40 border border-ink/10">
                <h3 className="font-serif text-xl font-bold text-ink mb-2">{block.title}</h3>
                <p className="text-base text-ink/80 font-sans leading-relaxed">{block.text}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink/60 font-sans">
            Payments appear on card statements as SYLENTT PARTNERS.
          </p>
        </div>
      </section>

      {/* Section 9: FAQ */}
      <section className="py-16 md:py-24 px-4 bg-surface border-y border-ink/5">
        <div className="container mx-auto max-w-3xl">
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

      {/* About Section (Founder Nic Aslett) */}
      <section id="about" className="py-16 md:py-24 px-4 container mx-auto scroll-mt-24 border-b border-ink/5">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[auto,1fr] gap-10 md:gap-14 items-center">
          <Image
            src="/about/nic.jpg"
            alt="Nic Aslett, founder of Sylentt Partners"
            width={224}
            height={224}
            loading="lazy"
            decoding="async"
            className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-xl mx-auto"
          />
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-6">
              Hi, I&apos;m Nic.
            </h2>
            <div className="space-y-4 text-base md:text-lg text-ink/90 leading-relaxed font-sans">
              <p>
                For 15 years, I&apos;ve worked as an engineer building systems behind the scenes: resilient infrastructure, clean software, and custom web builds.
              </p>
              <p>
                When you work with Sylentt Partners on a web build, you work directly with me: a real engineer who builds your site by hand, from scratch, ensuring it is fast, accessible, and uniquely yours.
              </p>
              <p>
                I run Sylentt Partners from Cache Valley, Utah. If you are local or across the country, I&apos;d love to build a site that truly represents your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tell us: the preview request */}
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
              Tell us the business and the town. We do the research and build a preview of your site at no charge, then email you the link. If you like it, it is $9.99 a month with the first 30 days free, and the site is yours after a year. If not, nothing happens.
            </p>
          </div>
          <PreviewRequestForm />
        </div>
      </section>

      {/* Section 10: Closing call to action */}
      <section className="py-20 md:py-32 px-4 bg-ink text-paper text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-paper text-balance">
            Ready to see what yours would look like?
          </h2>
          <p className="text-lg md:text-xl text-paper/80 mb-10 font-sans leading-relaxed">
            One site built for you, hosted and cared for at $9.99 a month. First 30 days free, and the code is yours after a year.
          </p>
          <div>
            <a href="#tell-us" className="btn-cta px-10 py-5 text-xl inline-flex items-center gap-2">
              Start a build
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
