import { ArrowRight, Compass, Receipt, Bot, UserMinus, ChevronDown } from "lucide-react";
import FitAssessment from "@/components/FitAssessment";
import SectionFade from "@/components/ui/SectionFade";
import Link from "next/link";
import type { Metadata } from "next";
import { CALENDLY_URL, AUDIENCE, EXTRA_HOUR_PRICE, plans, planById, planOfferJsonLd } from "@/lib/offer";

const pageTitle = "Sylentt Partners | Fractional CIO for Cache Valley Companies";
const advisor = planById("advisor");
const director = planById("director");

const heroHeadline = "An IT director, without the salary.";
// Non-breaking spaces keep "From $1,500 a month." on one line on phones.
const heroSubhead = `Part-time IT and AI leadership for Cache Valley companies. From\u00A0${advisor.price}\u00A0a\u00A0month.`;

const socialTitle = `${heroHeadline} | Sylentt Partners`;
const pageDescription =
  "Fractional CIO for Cache Valley companies. Work directly with Nic Aslett, a part-time IT director with a full-time track record. Fixed, published prices.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: socialTitle,
    description: pageDescription,
    url: "https://sylentt.com/",
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: pageDescription,
    images: ["/logo_full.png"],
  },
  alternates: {
    canonical: "https://sylentt.com/",
  },
};

// Past results, written as past results. Each one says what was measured and
// where it came from, and the line under them says plainly that they are not a
// promise. Do not reword these into anything that reads as a guarantee.
const proofPoints = [
  {
    figure: "100%",
    caption:
      "On-time project delivery, as a rolling average, after I brought real project management to a 16-person IT department.",
  },
  {
    figure: "80%",
    caption: "Faster ticket resolution: from 150 hours to 30.",
  },
  {
    figure: "2×",
    caption: "SLA adherence doubled: from 40% to 80%.",
  },
];

const problemCards = [
  {
    icon: Compass,
    title: "Your MSP fixes things but nobody decides things.",
    description:
      "Projects stall, renewals auto-renew, and the roadmap lives in someone's head.",
  },
  {
    icon: Receipt,
    title: "You're paying for software nobody uses and missing software you need.",
    description:
      "Nobody has the full list of what you pay for, who uses it, or when it renews.",
  },
  {
    icon: Bot,
    title: "Everyone says “use AI.”",
    description:
      "Nobody at your company owns figuring out where it actually helps and where it's a liability.",
  },
  {
    icon: UserMinus,
    title: "When the person who “knows the systems” leaves, so does the knowledge.",
    description:
      "The passwords, the vendor contacts, and the reasons things are set up the way they are walk out the door with them.",
  },
];

const steps = [
  {
    title: "Assessment",
    text: "2 weeks, fixed price. I inventory every system, subscription, vendor and risk; find where AI fits and where it doesn't; deliver a 12-month roadmap and present it to you in person.",
  },
  {
    title: "Retainer",
    text: "I become your IT director for a set number of hours a month: I run the roadmap, manage your MSP and vendors, make the decisions, and answer the questions.",
  },
  {
    title: "You own everything",
    text: "Documentation, roadmap, policies, vendor relationships: all yours, in your accounts, from day one.",
  },
];

// Quotes are the reviewers' exact words, trimmed only with ellipses. Never
// reword them. `avatar` is optional: without one, the card shows initials.
const testimonials: {
  text: string;
  name: string;
  role: string;
  avatar?: string;
}[] = [
  {
    text: "Nic is a visionary and deeply thoughtful leader with a rare combination of strategic perspective and servant leadership… He would be a strong asset to any technology organization seeking to modernize operations, improve and automate processes, thoughtfully integrate AI, and build a high-functioning IT organization.",
    name: "Ladan Rostami",
    role: "Senior Program/Project Manager, Fortidia (reported to Nic)",
    avatar: "/avatars/rostami.jpg",
  },
  {
    text: "Nic instantly impressed me with his ability to relate to senior level executives, owners of individual franchise locations, as well as his team… It is rare when an executive seems to genuinely care about all of his people.",
    name: "Michael Kingsolver",
    role: "IT Specialist, US Navy Veteran, Fortidia",
    avatar: "/avatars/kingsolver.jpg",
  },
  {
    text: "Nic is a visionary that can quickly identify shortcomings in processes, procedures, and functions in the technical space… he transformed how we delivered a product to a customer.",
    name: "Chris Gregoire",
    role: "Solutions Architect, Liqid",
    avatar: "/avatars/gregoire.png",
  },
  {
    text: "He has an indescribable ability to project an air of leadership and to motivate those around him.",
    name: "Randall Syfert",
    role: "Project Control Analyst, By Light Professional IT Services",
    avatar: "/avatars/syfert.png",
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const faqItems: {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}[] = [
  {
    question: "What does a fractional CIO actually do?",
    answer:
      "I do the job a full-time IT director would do, for a few hours a month. I make the technology decisions, plan the year, manage your IT company and other vendors, and own the roadmap and the IT budget. I don't run the helpdesk. Your IT company keeps fixing things; I make sure the right things get fixed.",
  },
  {
    question: "We already have an IT company. Why would we need you?",
    answer:
      "Your IT company fixes things. I decide things. They're paid to keep things running, not to decide where your technology should go. I manage them on your behalf and make sure you're getting what you pay for.",
  },
  {
    question: "How is this different from an AI consultant?",
    answer:
      "I'm an IT leader who also handles AI. AI gets evaluated like any other tool: where it saves money, where it creates risk, and what the rules are. You get that as a written policy your team can follow. No hype.",
  },
  {
    question: "How much of your time do I get?",
    answer:
      `Advisor includes up to ${advisor.hours} hours a month and Director up to ${director.hours}. Hours cover meetings, email, and work I do for you. If a month needs more, I ask first, and extra hours are ${EXTRA_HOUR_PRICE} each. If a month needs less, I don't invent work to fill it.`,
    link: { href: "/pricing/", label: "See the plans" },
  },
  {
    question: "What if it doesn't work out?",
    answer:
      "Every plan is month-to-month. Give 30 days' notice and it ends. You keep everything I produced: documentation, roadmap, policies, and vendor relationships, already in your accounts.",
  },
  {
    question: "Do you work outside Cache Valley?",
    answer:
      "I work in person across Cache Valley and Northern Utah. Remote work elsewhere is the exception, not the rule.",
  },
];

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://sylentt.com/#nic-aslett",
  name: "Nic Aslett",
  jobTitle: "Fractional CIO",
  worksFor: {
    "@type": "Organization",
    "@id": "https://sylentt.com/#organization"
  },
  image: "https://sylentt.com/about/nic.jpg",
  description:
    "Fractional CIO for Cache Valley companies. 15+ years in IT, including VP of IT at Fortidia, IT Manager at Charter Communications leading a 40-person QA team, and Release Train Engineer at Liqid.",
  sameAs: [
    "https://www.linkedin.com/in/nic-aslett/"
  ]
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": "https://sylentt.com/#organization",
  name: "Sylentt Partners",
  // "Sylentt LLC" was never the legal name. The entity is Sylentt Partners LLC
  // (Utah), as published in the /webdesign/ terms and policy pages.
  alternateName: ["Sylentt", "Sylentt Partners LLC"],
  // This node defines the entity, so it describes the main offer only. The
  // /webdesign/ plan still attaches to this entity: app/webdesign/layout.tsx
  // emits its own Service node whose provider is this @id.
  description:
    "Sylentt Partners is Nic Aslett's fractional CIO practice in Cache Valley, Utah: part-time IT and AI leadership for companies of about 20 to 150 employees that have an IT company for support but no one steering IT.",
  url: "https://sylentt.com",
  logo: "https://sylentt.com/logo-symbol.png",
  image: "https://sylentt.com/logo_full.png",
  email: "contact@sylentt.com",
  priceRange: "$$",
  founder: {
    "@type": "Person",
    "@id": "https://sylentt.com/#nic-aslett",
    name: "Nic Aslett",
    jobTitle: "Fractional CIO",
    sameAs: "https://www.linkedin.com/in/nic-aslett/"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.7583,
    longitude: -111.8341,
  },
  areaServed: [
    { "@type": "Place", name: "Cache Valley, Utah" },
    { "@type": "Place", name: "Northern Utah" },
  ],
  sameAs: [
    "https://www.google.com/maps?cid=10860538682886367500",
    "https://www.linkedin.com/company/sylentt-partners/",
    "https://www.instagram.com/sylenttpartners/",
    "https://www.facebook.com/sylenttpartners/"
  ],
  // edZOOcation only. By Light was an employer of people Nic worked with, never
  // a client, so it must not be listed here.
  customer: [
    { "@type": "Organization", name: "edZOOcation", url: "https://edzoocation.com/" }
  ],
  knowsAbout: [
    "IT leadership",
    "IT strategy",
    "IT budgeting",
    "Vendor management",
    "Managed service provider oversight",
    "AI policy",
    "Technology roadmaps",
    "Project management",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sylentt Partners plans",
    itemListElement: plans.map(planOfferJsonLd),
  },
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <div className="bg-paper text-ink selection:bg-accent/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* Hero */}
      <header className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.02] mb-8 text-balance">
              {heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-ink/80 max-w-2xl mx-auto mb-12 font-sans leading-relaxed text-pretty">
              {heroSubhead}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta w-full sm:w-auto px-10 py-5 text-xl group"
              >
                Book a 30-minute call
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="#it-check"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-paper text-accent border border-accent/25 px-8 py-4 text-lg font-bold transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Take the 2-minute IT check
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Proof */}
      <section className="pb-20 md:pb-28 bg-paper text-ink">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-6xl mx-auto border-t border-ink/10 pt-12 md:pt-16">
              <h2 className="eyebrow text-ink/60 mb-10 text-center md:text-left">
                Results from IT teams I&apos;ve led
              </h2>
              <dl className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                {proofPoints.map((point) => (
                  <div key={point.figure} className="text-center md:text-left">
                    <dt className="font-display text-6xl md:text-7xl text-accent mb-4">
                      {point.figure}
                    </dt>
                    <dd className="text-lg text-ink/80 leading-relaxed text-pretty">
                      {point.caption}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-10 text-sm text-ink/60 text-center md:text-left">
                Past results from teams I led, not a promise. Every company starts from a different place.
              </p>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Sound familiar? */}
      <section className="py-24 md:py-32 bg-ink text-paper">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="mb-16">
              <h2 className="font-display text-4xl md:text-6xl mb-6 text-paper text-balance">
                Sound familiar?
              </h2>
              <p className="text-xl text-paper/70 max-w-2xl leading-relaxed text-pretty">
                Most companies your size have an IT company for support and no one steering. Here&apos;s what that looks like.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {problemCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="group">
                    <div className="mb-6 w-12 h-12 rounded-full bg-paper/5 border border-paper/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-2xl font-serif mb-4 text-paper">
                      {card.title}
                    </h3>
                    <p className="text-lg text-paper/70 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-surface text-ink overflow-hidden border-y border-ink/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <div>
                <h2 className="font-display text-4xl md:text-6xl mb-12 text-ink">
                  How it works
                </h2>
                <div className="space-y-16">
                  {steps.map((step, i) => (
                    <div key={step.title} className="flex gap-8 group">
                      <span className="font-display text-5xl text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-2xl font-serif mb-4 text-ink">{step.title}</h3>
                        <p className="text-lg text-ink/90 leading-relaxed">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-16">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta px-10 py-4 text-lg group"
                  >
                    Book a 30-minute call
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="bg-paper border border-ink/10 rounded-2xl p-12 shadow-soft">
                  <p className="font-display text-4xl text-ink mb-10">Published prices.</p>
                  <dl className="space-y-6">
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        className="flex items-baseline justify-between gap-6 border-b border-ink/10 pb-6"
                      >
                        <dt className="text-xl font-serif text-ink">{plan.name}</dt>
                        <dd className="font-display text-3xl text-accent whitespace-nowrap">
                          {plan.price}
                          <span className="text-lg text-ink/60 font-sans">
                            {plan.monthly ? plan.priceUnit : `, ${plan.priceUnit}`}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <Link
                    href="/pricing/"
                    className="mt-10 inline-flex items-center text-accent font-bold text-lg group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    See pricing
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Currently */}
      <section className="py-20 md:py-28 bg-paper text-ink">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-6xl mx-auto">
              <p className="eyebrow text-accent mb-6">Currently</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="space-y-8">
                  <h2 className="font-display text-4xl md:text-5xl text-ink text-balance">
                    Fractional CTO for edZOOcation, a Shopify Plus education company.
                  </h2>
                  <p className="text-lg text-ink/90 leading-relaxed">
                    I designed and built their order-to-subscription automation. Then I handed the platform to their team and stepped into the leadership seat.
                  </p>
                </div>
                <div className="bg-surface p-10 md:p-12 rounded-2xl border border-ink/10 shadow-soft">
                  <p className="font-display text-5xl md:text-6xl text-accent mb-4">~8 hours/week</p>
                  <p className="text-xl md:text-2xl text-ink leading-relaxed">
                    of manual work eliminated. The team now runs its own systems.
                  </p>
                </div>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 md:py-20 bg-paper border-y border-ink/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="eyebrow text-ink/60 mb-6">Experience</h2>
              <p className="font-display text-2xl md:text-3xl text-ink leading-snug text-balance">
                15+ years in IT, including VP of IT at Fortidia, IT Manager at Charter Communications leading a 40-person QA team, and Release Train Engineer at Liqid.
              </p>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 md:py-32 bg-surface border-b border-ink/5 scroll-mt-24">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[auto,1fr] gap-12 md:gap-16 items-center">
              <img
                src="/about/nic.jpg"
                alt="Nic Aslett, founder of Sylentt Partners"
                width={224}
                height={224}
                loading="lazy"
                decoding="async"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-xl mx-auto"
              />
              <div>
                <h2 className="font-display text-4xl md:text-6xl mb-6">Hi, I&apos;m Nic.</h2>
                <div className="space-y-5 text-lg text-ink/90 leading-relaxed">
                  <p>
                    I&apos;ve spent 15 years in IT, the last 10 leading teams of up to 40 people. I&apos;ve taken over IT departments that weren&apos;t working and turned them around.
                  </p>
                  <p>
                    When I moved to Cache Valley, I chose to do this for local companies instead of one employer. When you hire Sylentt, you get me, and you get the same approach I used to turn around departments of 16 people, scaled to fit yours.
                  </p>
                  <p>
                    The name comes from &ldquo;silent partner&rdquo;: I work in the background so you can run your business.
                  </p>
                </div>
                <div className="mt-8 bg-paper p-6 rounded-xl border border-ink/10 shadow-soft">
                  <h3 className="font-serif text-lg font-bold text-ink mb-2">
                    What is Sylentt Partners?
                  </h3>
                  <p className="text-base text-ink/90 leading-relaxed font-sans">
                    Sylentt Partners is my fractional CIO practice in Cache Valley, Utah. I lead IT and AI decisions, part-time, for {AUDIENCE} that have an IT company for support but no one steering. You work with me directly. That&apos;s the point.
                  </p>
                </div>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-ink text-paper border-y border-paper/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="mb-16">
              <h2 className="font-display text-4xl md:text-6xl text-paper text-balance">
                What people I&apos;ve worked with say
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {testimonials.map((t) => (
                <figure key={t.name} className="flex flex-col">
                  <blockquote className="font-display text-xl md:text-2xl mb-8 leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-4">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        width={48}
                        height={48}
                        loading="lazy"
                        decoding="async"
                        className="w-12 h-12 rounded-full object-cover border border-paper/10"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="w-12 h-12 shrink-0 rounded-full border border-paper/10 bg-paper/10 flex items-center justify-center font-sans font-semibold text-paper"
                      >
                        {initials(t.name)}
                      </span>
                    )}
                    <div className="leading-tight">
                      <p className="font-sans font-semibold text-paper">{t.name}</p>
                      <p className="text-sm font-sans text-paper/50">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 bg-paper text-ink border-t border-ink/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <h2 className="font-display text-4xl md:text-6xl mb-12 text-center text-ink">
              Common questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {faqItems.map((item) => (
                <details key={item.question} className="group border-b border-ink/10 pb-8 cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 list-none text-2xl font-serif text-ink">
                    <h3 className="inline text-2xl font-serif text-ink">{item.question}</h3>
                    <ChevronDown className="w-5 h-5 shrink-0 opacity-40 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-6 text-lg text-ink/90 leading-relaxed max-w-2xl">
                    <p>{item.answer}</p>
                    {item.link && (
                      <Link
                        href={item.link.href}
                        className="mt-4 inline-flex items-center text-accent-link font-bold rounded-sm underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                      >
                        {item.link.label}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Book a call + IT check */}
      <section id="book" className="py-24 md:py-32 bg-ink text-paper scroll-mt-24">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-display text-4xl md:text-6xl mb-6 text-paper text-balance">
                Book a 30-minute call
              </h2>
              <p className="text-xl text-paper/70 mb-12 text-pretty">
                Tell me how IT works at your company today. I&apos;ll tell you honestly whether I can help.
              </p>
              <div className="flex flex-col items-center gap-8 mb-16">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta px-10 py-5 text-xl group"
                >
                  Book a 30-minute call
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="w-full h-px bg-paper/10 mb-20" />

              <h3 id="it-check" className="font-display text-2xl md:text-3xl mb-6 text-paper scroll-mt-28">
                Take the 2-minute IT check
              </h3>
              <p className="text-xl text-paper/60 mb-12">
                Four questions. No email required.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <FitAssessment />
            </div>
          </SectionFade>
        </div>
      </section>
    </div>
  );
}
