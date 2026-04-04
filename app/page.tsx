import { ArrowRight, RefreshCw, AlertTriangle, Plug, RotateCcw, ChevronDown } from "lucide-react";
import FitAssessment from "@/components/FitAssessment";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import SectionFade from "@/components/ui/SectionFade";
import IntegratorDiagram from "@/components/home/IntegratorDiagram";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sylentt | Business App Integration for Small Businesses",
  description:
    "Sylentt connects your business apps so your team stops being the copy-paste layer. Custom integrations you own. Based in Cache Valley, Utah.",
  openGraph: {
    title: "Sylentt | Your business apps don't talk to each other. We fix that.",
    description:
      "Sylentt connects your business apps so your team stops being the copy-paste layer. Custom integrations you own. Based in Cache Valley, Utah.",
    url: "https://sylentt.com/",
  },
  alternates: {
    canonical: "https://sylentt.com/",
  },
};

const testimonials = [
  {
    text: "Sylentt Partners bring exceptional expertise and efficiency to every project. Their knowledge and skills are unmatched, making them an invaluable partner in fast-paced, high-tech environments. Truly an asset for any organization.",
    context: "Technology company, deployment pipeline",
  },
  {
    text: "Working with this team has been transformative. They quickly identified inefficiencies in our processes and implemented solutions that revolutionized how we deliver products.",
    context: "E-commerce company, subscription automation",
  },
  {
    text: "Their ability to standardize deployments, debug issues, and enhance support systems has been invaluable. Their focus on creating and maintaining detailed documentation has improved clarity and collaboration across the board.",
    context: "Professional services firm, process redesign",
  },
];

const problemCards = [
  {
    icon: RefreshCw,
    title: "Your team re-enters the same data into multiple systems.",
    description:
      "When an order comes in, someone types it into the shipping app. When a payment clears, someone updates the books. When a new customer signs up, someone adds them to three different places. We make that happen automatically.",
    color: "blue",
  },
  {
    icon: AlertTriangle,
    title: "You find out something broke days after it happened.",
    description:
      "A subscription never got created. An invoice never synced. A fulfillment was missed. Nobody knew until a customer complained. We build monitoring that catches failures in real time and alerts before anyone notices.",
    color: "amber",
  },
  {
    icon: RotateCcw,
    title: "You are paying for Zapier or Make and things still break.",
    description:
      "Those tools are rentals. They charge you more the busier you get. When a Zap fails at midnight, nobody knows. What we build, you own. It runs on your account. It retries automatically. It does not silently drop the ball.",
    color: "purple",
  },
  {
    icon: Plug,
    title: "You added a new tool and now nothing connects.",
    description:
      "Every new app creates a new island. We integrate it with everything else so it actually fits into your workflow instead of creating more manual work.",
    color: "cyan",
  },
];

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Sylentt",
  alternateName: ["Sylentt LLC", "Sylentt Partners"],
  description:
    "Business app integration and workflow automation for small businesses. We build custom connections between your tools so your team stops being the copy-paste layer.",
  url: "https://sylentt.com",
  email: "contact@sylentt.com",
  areaServed: [
    { "@type": "Place", name: "Cache Valley, Utah" },
    { "@type": "Country", name: "United States" },
  ],
  serviceType: [
    "Business Application Integration",
    "Workflow Automation",
    "API Integration",
    "SaaS Integration",
  ],
  knowsAbout: [
    "Shopify Integration",
    "QuickBooks Integration",
    "Stripe Integration",
    "HubSpot Integration",
    "Xero Integration",
    "Business Process Automation",
    "API Development",
    "Serverless Architecture",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cache Valley",
    addressRegion: "UT",
    addressCountry: "US",
  },
  sameAs: [],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Sylentt do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sylentt connects the business apps your team uses every day. When an order comes in, a payment clears, or a customer signs up, the other systems that need to know about it update automatically. No copying, no checking, no hoping it worked.",
      },
    },
    {
      "@type": "Question",
      name: "How is Sylentt different from Zapier or Make?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zapier and Make are rentals. You pay monthly, the price goes up as volume grows, and if a Zap breaks at midnight nobody knows until a customer complains. What Sylentt builds runs on your own account. You own the code, the infrastructure, and the data. There are no per-transaction fees, no monthly platform charges, and failures trigger real-time alerts instead of sitting in a log nobody checks.",
      },
    },
    {
      "@type": "Question",
      name: "What apps can Sylentt connect?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your business runs on it and it has an API, Sylentt can connect it. Common systems include Shopify, QuickBooks, Stripe, Square, HubSpot, Xero, Salesforce, Calendly, ServiceTitan, Jobber, ShipStation, Recharge, and FreshBooks.",
      },
    },
    {
      "@type": "Question",
      name: "Do I own everything Sylentt builds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The integrations run on your cloud account. The code is yours. If you part ways with Sylentt, everything keeps running. There is no lock-in and no proprietary platform you lose access to.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical Sylentt integration take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most single integrations take 2 to 4 weeks from the first conversation to production. Complex projects with multiple systems or unusual APIs may take longer. Sylentt scopes every project before starting so there are no surprises.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Sylentt cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every project is scoped individually because every business has different tools and different problems. Sylentt does not charge monthly platform fees or per-transaction costs. You pay for the build, you own the result.",
      },
    },
  ],
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sylentt",
  alternateName: ["Sylentt LLC", "Sylentt Partners"],
  url: "https://sylentt.com",
  speakable: {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "#faq summary", "#faq details p"],
  },
};

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Business Application Integration",
  provider: {
    "@type": "ProfessionalService",
    name: "Sylentt",
    url: "https://sylentt.com",
  },
  description:
    "Custom integrations between business applications. We connect tools like Shopify, QuickBooks, Stripe, HubSpot, Xero, and others so data flows automatically between them.",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

const faqItems = [
  {
    question: "What does Sylentt do?",
    answer:
      "Sylentt connects the business apps your team uses every day. When an order comes in, a payment clears, or a customer signs up, the other systems that need to know about it update automatically. No copying, no checking, no hoping it worked.",
  },
  {
    question: "How is this different from Zapier or Make?",
    answer:
      "Zapier and Make are rentals. You pay monthly, the price goes up as volume grows, and if a Zap breaks at midnight nobody knows until a customer complains. What Sylentt builds runs on your own account. You own the code, the infrastructure, and the data. There are no per-transaction fees, no monthly platform charges, and failures trigger real-time alerts instead of sitting in a log nobody checks.",
  },
  {
    question: "What apps can Sylentt connect?",
    answer:
      "If your business runs on it and it has an API, we can connect it. Common systems include Shopify, QuickBooks, Stripe, Square, HubSpot, Xero, Salesforce, Calendly, ServiceTitan, Jobber, ShipStation, Recharge, and FreshBooks. If your app is not on that list, ask. We have probably connected something like it before.",
  },
  {
    question: "Do I own everything Sylentt builds?",
    answer:
      "Yes. The integrations run on your cloud account. The code is yours. If we part ways tomorrow, everything keeps running. There is no lock-in and no proprietary platform you lose access to.",
  },
  {
    question: "How long does a typical integration take?",
    answer:
      "Most single integrations take 2 to 4 weeks from the first conversation to production. Complex projects with multiple systems or unusual APIs may take longer. We scope every project before starting so there are no surprises.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Every project is scoped individually because every business has different tools and different problems. We do not charge monthly platform fees or per-transaction costs. You pay for the build, you own the result. Reach out and tell us what is broken. We will tell you what it would take to fix it.",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* Section 1: Hero */}
      <header className="relative min-h-[100dvh] flex items-center justify-center text-center text-white overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 z-0">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="/assets/img/masthead-small.webp"
            />
            <source
              media="(max-width: 1024px)"
              srcSet="/assets/img/masthead-medium.webp"
            />
            <img
              src="/assets/img/masthead.webp"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              {...{ fetchpriority: "high" as const }}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-slate-950/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight max-w-4xl mx-auto">
            Your business apps don&apos;t talk to each other.{" "}
            <span className="text-gradient">We fix that.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Your team spends hours copying data between apps, checking that one
            system matches another, and finding out days later when something
            slipped through the cracks. We build the wiring between your tools
            so your team does not have to be.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-bold text-white transition-all hover:bg-indigo-400 animate-pulse-glow group shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:shadow-[0_0_30px_rgba(99,102,241,0.8)]"
            >
              See Pricing
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#tell-us"
              className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/20 group"
            >
              Tell us what&apos;s broken
            </a>
          </div>
        </div>

        <ScrollIndicator />
      </header>

      {/* Section 2: Problem Statements */}
      <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <SectionFade>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold neon-line-header blue">
                Sound familiar?
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                These are the problems we solve every day for small businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {problemCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className={`neon-card ${card.color} p-8 rounded-2xl group transition-all duration-300`}
                  >
                    <div
                      className={`mb-5 w-14 h-14 rounded-xl bg-${card.color}-500/10 flex items-center justify-center border border-${card.color}-500/20 group-hover:bg-${card.color}-500/20 transition-colors`}
                    >
                      <Icon className="w-7 h-7 text-slate-300 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {card.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section className="py-24 md:py-32 bg-slate-900/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold neon-line-header">
                How it works
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Three steps. No six-month discovery engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-y-8 md:gap-y-0 items-stretch max-w-5xl mx-auto">
              <div className="text-center p-8 rounded-2xl neon-card blue transition-all duration-300 group">
                <div className="text-5xl font-black text-primary/30 mb-4 group-hover:text-primary/50 transition-colors">
                  01
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  You tell us what&apos;s broken
                </h3>
                <p className="text-slate-400">
                  Which apps does your business use? Where is the manual work?
                  This is a conversation, not a requirements document.
                </p>
              </div>

              {/* Connector 1-2 */}
              <div className="hidden md:flex items-center justify-center px-2">
                <div className="relative w-10 h-[2px] bg-[var(--border)]">
                  <div className="absolute top-0 w-[12px] h-[2px] bg-white rounded-full animate-flow-right" style={{ boxShadow: '0 0 8px 2px var(--accent)' }} />
                </div>
              </div>

              <div className="text-center p-8 rounded-2xl neon-card cyan transition-all duration-300 group">
                <div className="text-5xl font-black text-cyan-500/30 mb-4 group-hover:text-cyan-500/50 transition-colors">
                  02
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  We build the connections
                </h3>
                <p className="text-slate-400">
                  When something happens in one app, the others update
                  automatically. No copying. No checking. No hoping it worked.
                </p>
              </div>

              {/* Connector 2-3 */}
              <div className="hidden md:flex items-center justify-center px-2">
                <div className="relative w-10 h-[2px] bg-[var(--border)]">
                  <div className="absolute top-0 w-[12px] h-[2px] bg-white rounded-full animate-flow-right" style={{ boxShadow: '0 0 8px 2px var(--accent2)', animationDelay: '0.6s' }} />
                </div>
              </div>

              <div className="text-center p-8 rounded-2xl neon-card purple transition-all duration-300 group">
                <div className="text-5xl font-black text-purple-500/30 mb-4 group-hover:text-purple-500/50 transition-colors">
                  03
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  You own everything
                </h3>
                <p className="text-slate-400">
                  It runs on your account. No monthly platform fees. No
                  per-transaction charges. If we part ways tomorrow, you keep it
                  all.
                </p>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Section 4: Systems We Work With */}
      <section className="py-24 md:py-32 bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold neon-line-header cyan">
                Systems we connect
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Your business runs on tools. We build the wiring that makes them work together.
              </p>
            </div>

            <IntegratorDiagram />
          </SectionFade>
        </div>
      </section>

      {/* Section 5: Real Example */}
      <section className="py-24 md:py-32 bg-slate-900/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center neon-line-header purple">
                What this looks like in practice
              </h2>

              <div className="neon-card purple p-8 md:p-10 rounded-2xl">
                <p className="text-slate-300 text-lg leading-relaxed mb-4">
                  An education company was manually creating customer
                  subscriptions every time a specific type of order came in. A
                  team member spent nearly a full day each week copying data between three
                  different platforms.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed mb-4">
                  We built an automated pipeline that handles the entire
                  workflow: when an order comes in, the subscription is created,
                  the fulfillment system is notified, and the accounting records
                  update. If anything fails, the system catches it and alerts
                  instead of silently losing the order.
                </p>
                <p className="text-slate-400 text-base">
                  The team member who used to do that work now spends those
                  hours on things that actually grow the business.
                </p>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Section 6: Testimonials */}
      <section className="py-24 md:py-32 bg-slate-950">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold neon-line-header blue">
                What clients say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="neon-card blue p-10 rounded-xl text-slate-300 leading-relaxed relative flex flex-col"
                >
                  <span className="absolute top-4 left-6 text-6xl text-primary/20 font-serif leading-none">
                    &quot;
                  </span>
                  <p className="relative z-10 pt-4 italic flex-grow">
                    {t.text}
                  </p>
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <span className="text-xs font-mono text-primary/70 uppercase tracking-wider">
                      {t.context}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Section 6.5: FAQ */}
      <section id="faq" className="py-24 md:py-32 bg-slate-950">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold neon-line-header blue">
                Common questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((item, i) => (
                <details key={i} className="group neon-card blue rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-white font-bold text-lg md:text-xl">
                    <span>{item.question}</span>
                    <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform duration-300" />
                  </summary>
                  <div className="px-6 pb-6 pt-0 text-slate-400 leading-relaxed">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Section 7: CTA + Form */}
      <section
        id="tell-us"
        className="py-24 md:py-32 bg-slate-900/50 scroll-mt-32 border-t border-white/5"
      >
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="text-center mb-16 relative pb-6">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Tell us what&apos;s broken
              </h2>
              <p className="text-slate-400 text-lg">
                Answer a few quick questions so we can see where your time is
                going.
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" style={{ boxShadow: '0 0 12px rgba(99,102,241,0.4)' }} />
            </div>
            <FitAssessment />
          </SectionFade>
        </div>
      </section>
    </>
  );
}
