import { ArrowRight, RefreshCw, AlertTriangle, Plug, RotateCcw } from "lucide-react";
import CostCalculator from "@/components/CostCalculator";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import SectionFade from "@/components/ui/SectionFade";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sylentt | Your business apps don't talk to each other. We fix that.",
  description:
    "Sylentt connects your business apps so your team stops manually copying data between systems. Reliable automation you own, with built-in monitoring.",
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
      "A subscription did not get created. An invoice did not sync. A fulfillment was missed. Nobody knew until a customer complained. We build monitoring that catches failures in real time and alerts before anyone notices.",
    color: "amber",
  },
  {
    icon: RotateCcw,
    title: "You are paying for Zapier or Make and things still break.",
    description:
      "Those tools are rentals. They charge you more the busier you get. When a Zap fails at midnight, nobody knows. What we build, you own. It runs on your account. It retries automatically. It does not silently lose events.",
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

const apps = [
  { name: "Shopify", logo: "/assets/img/logos/shopify.svg" },
  { name: "QuickBooks", logo: "/assets/img/logos/quickbooks.svg" },
  { name: "Stripe", logo: "/assets/img/logos/stripe.svg" },
  { name: "Square", logo: "/assets/img/logos/square.svg" },
  { name: "HubSpot", logo: "/assets/img/logos/hubspot.svg" },
  { name: "Xero", logo: "/assets/img/logos/xero.svg" },
  { name: "Calendly", logo: "/assets/img/logos/calendly.svg" },
  { name: "Salesforce", logo: null },
  { name: "ServiceTitan", logo: null },
  { name: "Jobber", logo: null },
  { name: "ShipStation", logo: null },
  { name: "Recharge", logo: null },
  { name: "FreshBooks", logo: null },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Sylentt",
  url: "https://sylentt.com",
  description:
    "Business app integration and automation for small companies. We connect your tools so your team stops manually copying data between systems.",
  areaServed: {
    "@type": "Place",
    name: "Cache Valley, Utah",
  },
  serviceType: [
    "Business Automation",
    "Software Integration",
    "API Integration",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            so that stops.
          </p>
          <a
            href="#tell-us"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-bold text-white transition-all hover:bg-indigo-400 shadow-lg shadow-primary/25 hover:shadow-primary/40 group"
          >
            Tell us what&apos;s broken
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <ScrollIndicator />
      </header>

      {/* Section 2: Problem Statements */}
      <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <SectionFade>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
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
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                How it works
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Three steps. No six-month discovery engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
      <section className="py-24 md:py-32 bg-slate-950">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Systems we connect
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                If your business runs on it, we can probably connect it.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
              {apps.map((app) => (
                <div
                  key={app.name}
                  className="glass-card px-6 py-4 rounded-xl flex items-center gap-3 hover:border-white/20 transition-colors"
                >
                  {app.logo ? (
                    <Image
                      src={app.logo}
                      alt={app.name}
                      width={24}
                      height={24}
                      className="opacity-70 invert"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                      {app.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-slate-300 font-medium text-sm">
                    {app.name}
                  </span>
                </div>
              ))}
              <div className="glass-card px-6 py-4 rounded-xl flex items-center gap-3 border-dashed hover:border-white/20 transition-colors">
                <span className="text-slate-400 font-medium text-sm">
                  + many more
                </span>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Section 5: Real Example */}
      <section className="py-24 md:py-32 bg-slate-900/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                What this looks like in practice
              </h2>

              <div className="glass-card p-8 md:p-10 rounded-2xl">
                <p className="text-slate-300 text-lg leading-relaxed mb-4">
                  An education company was manually creating customer
                  subscriptions every time a specific type of order came in. A
                  team member spent hours each week copying data between three
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
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                What clients say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="glass-card p-10 rounded-xl text-slate-300 leading-relaxed relative flex flex-col"
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

      {/* Section 7: CTA + Form */}
      <section
        id="tell-us"
        className="py-24 md:py-32 bg-slate-900/50 scroll-mt-20 border-t border-white/5"
      >
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Tell us what&apos;s broken
              </h2>
              <p className="text-slate-400 text-lg">
                Answer a few quick questions so we can see where your time is
                going.
              </p>
            </div>
            <CostCalculator />
          </SectionFade>
        </div>
      </section>
    </>
  );
}
