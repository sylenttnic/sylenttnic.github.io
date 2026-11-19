import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone, CalendarDays } from "lucide-react";
import SectionFade from "@/components/ui/SectionFade";
import {
  PHONE,
  SECOND_OPINION_BOOK_LABEL,
  SECOND_OPINION_CALENDLY_URL,
  SECOND_OPINION_EMAIL,
  SECOND_OPINION_MAILTO,
} from "@/lib/offer";

// The second opinion: Nic's community offer. One working session, no charge,
// no pitch. This page is deliberately NOT a sales page: it never shows prices
// or plans, and the only link to the paid work is the quiet line at the bottom.
// Keep it that way. The point is to be useful first.
//
// Seasonal: the "before the new year" lines run through January 2027. Set
// SEASONAL to null to drop them; nothing else on the page depends on them.
const SEASONAL: { eyebrow: string; note: string } | null = {
  eyebrow: "Before the new year",
  note: "The end of the year is when renewals come due and next year's budget gets set. It's a good time to ask the question you've been putting off.",
};

const pageTitle = "A Second Opinion on Your Technology | Sylentt Partners";
const pageDescription =
  "For Cache Valley business owners: sit down with Nic Aslett for 60 to 90 minutes, at no charge, and work through a technology question you've been sitting on. No sales pitch, no obligation.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://sylentt.com/second-opinion/",
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/logo_full.png"],
  },
  alternates: {
    canonical: "https://sylentt.com/second-opinion/",
  },
};

// Examples, not a menu. The last one matters most: people should ask even
// when they can't name the problem.
const examples = [
  "Software you pay for that nobody is sure about, or that renews every year without anyone deciding.",
  "An IT company relationship that isn't quite working, and you can't tell if you're getting what you pay for.",
  "A decision coming up: a new system, a new location, or replacing something old.",
  "Work your team does by hand that seems like it shouldn't need to be.",
  "Numbers you can't get without someone building a spreadsheet first.",
  "Where AI would actually help your business, and where it's a risk.",
  "Or simply: something isn't working right and you're not sure what.",
];

const steps = [
  {
    title: "Tell me a little about it",
    text: "A short email or call: what your business does and what's on your mind. If someone else would be better for it, I'll say so.",
  },
  {
    title: "We sit down for 60 to 90 minutes",
    text: "At your place of business, over coffee, or on a video call. You walk me through how things work today. I ask a lot of questions and give you an honest outside view and practical recommendations.",
  },
  {
    title: "You get a one-page summary",
    text: "If it's useful, within a few days I send a one-page summary: what we talked about, what I'd do, and what I'd do first. It's yours, whatever you decide.",
  },
];

const notIncluded = [
  "Fixing computers or ongoing support",
  "Building or setting anything up",
  "A full review of your systems or security",
  "Shopping for vendors on your behalf",
];

const jsonLdPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://sylentt.com/second-opinion/#webpage",
  url: "https://sylentt.com/second-opinion/",
  name: pageTitle,
  description: pageDescription,
  about: {
    "@type": "Offer",
    name: "A second opinion",
    description:
      "One working session of 60 to 90 minutes for a Cache Valley business, at no charge, on a technology question the owner chooses. Includes a one-page summary when useful. No implementation, support or audit.",
    price: "0",
    priceCurrency: "USD",
    areaServed: { "@type": "Place", name: "Cache Valley, Utah" },
    offeredBy: { "@id": "https://sylentt.com/#organization" },
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://sylentt.com/" },
    { "@type": "ListItem", position: 2, name: "A second opinion", item: "https://sylentt.com/second-opinion/" },
  ],
};

const linkClass =
  "text-accent-link font-semibold underline underline-offset-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

function ContactOptions() {
  return (
    <div className="flex flex-col items-center gap-4">
      <a href={SECOND_OPINION_MAILTO} className="btn-cta w-full sm:w-auto px-10 py-5 text-xl group">
        <Mail className="mr-3 w-5 h-5" aria-hidden="true" />
        Email me about it
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </a>
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-lg text-ink/80">
        {PHONE && (
          <a href={`tel:${PHONE.tel}`} className={`inline-flex items-center ${linkClass}`}>
            <Phone className="mr-2 w-4 h-4" aria-hidden="true" />
            Call {PHONE.display}
          </a>
        )}
        <a
          href={SECOND_OPINION_CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center ${linkClass}`}
        >
          <CalendarDays className="mr-2 w-4 h-4" aria-hidden="true" />
          {SECOND_OPINION_BOOK_LABEL}
        </a>
      </div>
      <p className="text-base text-ink/60">{SECOND_OPINION_EMAIL}</p>
    </div>
  );
}

export default function SecondOpinionPage() {
  return (
    <div className="bg-paper text-ink selection:bg-accent/20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      {/* Hero: the offer in Nic's words */}
      <header className="container mx-auto px-4 pt-32 pb-16 md:pt-44 md:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          {SEASONAL && <p className="eyebrow text-accent mb-6">{SEASONAL.eyebrow}</p>}
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-8 text-balance">
            A second opinion on your technology.
          </h1>
          <p className="text-xl md:text-2xl text-ink/80 leading-relaxed mb-6 text-pretty">
            If there&apos;s something technology-related you&apos;ve been wanting an outside view on, or something you think could be working better, I&apos;d be happy to sit down with you and help you work through it.
          </p>
          <p className="text-xl md:text-2xl text-ink font-semibold mb-6">No charge. No sales pitch. No obligation.</p>
          {SEASONAL && <p className="text-lg text-ink/70 leading-relaxed mb-12 text-pretty">{SEASONAL.note}</p>}
          <ContactOptions />
        </div>
      </header>

      {/* Why: community, not a funnel */}
      <section className="py-20 md:py-24 bg-surface border-y border-ink/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
              <Image
                src="/about/nic.jpg"
                alt="Nic Aslett"
                width={176}
                height={176}
                className="w-40 h-40 md:w-44 md:h-44 rounded-full object-cover shrink-0 shadow-soft"
              />
              <div className="space-y-5 text-lg text-ink/90 leading-relaxed">
                <h2 className="font-display text-3xl md:text-5xl text-ink">Why I&apos;m doing this</h2>
                <p>
                  I&apos;m Nic Aslett. I spent 15 years in IT, the last 10 leading teams of up to 40 people, including as VP of IT at Fortidia. I chose to build my work here in Cache Valley. I&apos;m a member of the Cache Valley Chamber of Commerce and part of the Chamber&apos;s current Leadership Institute class.
                </p>
                <p>
                  I want to be part of the local business community, not just market to it. The most useful thing I have to offer is experience, so I set aside time each month to sit down with a few local business owners and work through something with them.
                </p>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* What to bring */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-5xl mb-4">What you might bring</h2>
              <p className="text-lg text-ink/70 mb-10">Examples, not a menu.</p>
              <ul className="space-y-5">
                {examples.map((example) => (
                  <li key={example} className="flex items-start gap-4 text-lg md:text-xl text-ink/90 leading-relaxed">
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-lg text-ink/80 leading-relaxed">
                Not sure your question fits? Ask anyway. If I&apos;m not the right person for it, I&apos;ll tell you, and point you somewhere better if I can.
              </p>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-28 bg-ink text-paper">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-5xl mx-auto">
              <h2 className="font-display text-3xl md:text-5xl mb-14 text-paper">How it works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {steps.map((step, i) => (
                  <div key={step.title}>
                    <p className="font-display text-4xl text-accent mb-4">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="text-2xl font-serif mb-4 text-paper">{step.title}</h3>
                    <p className="text-lg text-paper/75 leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* What it isn't: the boundary, stated plainly */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-5xl mb-6">What it isn&apos;t</h2>
              <p className="text-lg md:text-xl text-ink/90 leading-relaxed mb-8">
                This is advice, not a project. To keep it that way, the session doesn&apos;t include:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {notIncluded.map((item) => (
                  <li key={item} className="bg-surface border border-ink/10 rounded-xl px-5 py-4 text-lg text-ink/90">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-lg md:text-xl text-ink/90 leading-relaxed">
                I don&apos;t sell hardware, software or support, and I take no commissions or referral fees, so nothing I recommend is tied to a sale. If you&apos;d like help doing what we talked about, I&apos;ll tell you what that would look like and what it would cost, but only if you ask. Plenty of people won&apos;t need to, and that&apos;s fine.
              </p>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Ask */}
      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionFade>
            <div className="bg-surface border border-ink/10 p-8 md:p-16 rounded-2xl shadow-soft text-center">
              <h2 className="font-display text-3xl md:text-5xl mb-6">Ask for a second opinion</h2>
              <p className="text-lg text-ink/80 leading-relaxed mb-10 text-pretty">
                Tell me a little about your business and what&apos;s on your mind. I&apos;ll get back to you within a business day.
              </p>
              <ContactOptions />
            </div>
            <p className="mt-10 text-center text-base text-ink/60">
              Looking for ongoing help rather than a one-time conversation?{" "}
              <Link href="/" className="underline underline-offset-4 hover:text-ink">
                Here&apos;s how I work with companies.
              </Link>
            </p>
          </SectionFade>
        </div>
      </section>
    </div>
  );
}
