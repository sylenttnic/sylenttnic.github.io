import Link from "next/link";
import {
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  RotateCcw,
  Plug,
} from "lucide-react";
import CostCalculator from "@/components/CostCalculator";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import SectionFade from "@/components/ui/SectionFade";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Sylentt \u2014 Custom Business App Integration",
  description:
    "Sylentt builds automated connections between your business tools. Shopify, QuickBooks, Stripe, HubSpot, and more. You own everything we build.",
  openGraph: {
    title: "Services | Sylentt \u2014 Custom Business App Integration",
    description:
      "Sylentt builds automated connections between your business tools. Shopify, QuickBooks, Stripe, HubSpot, and more. You own everything we build.",
    url: "https://sylentt.com/services/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Sylentt \u2014 Custom Business App Integration",
    description:
      "Sylentt builds automated connections between your business tools. Shopify, QuickBooks, Stripe, HubSpot, and more. You own everything we build.",
  },
  alternates: {
    canonical: "https://sylentt.com/services/",
  },
};

const services = [
  {
    icon: RefreshCw,
    color: "blue",
    pain: "Your team copies the same data into multiple systems.",
    detail:
      "Every time an order comes in, a payment clears, or a customer signs up, someone on your team has to update two or three apps by hand. It takes hours every week, and mistakes pile up quietly.",
    outcome:
      "After we build the connection, data moves between your apps the moment it is created. No copying, no double-checking, no lag. Your team gets those hours back.",
    deliverable:
      "An automated connection between your systems that runs on your account. You get full documentation of how it works and what it does. If we part ways, it keeps running.",
  },
  {
    icon: AlertTriangle,
    color: "amber",
    pain: "You find out something broke days after it happened.",
    detail:
      "A subscription did not get created. An invoice did not sync. A fulfillment was missed. Nobody knew until a customer emailed asking what happened.",
    outcome:
      "Every connection we build includes monitoring. When something fails, the system catches it immediately and sends an alert. Failed events are captured and retried automatically, not lost.",
    deliverable:
      "Built-in alerting and retry logic for every connection. A dashboard showing what ran, what succeeded, and what needs attention.",
  },
  {
    icon: RotateCcw,
    color: "purple",
    pain: "You are paying for Zapier or Make and things still break.",
    detail:
      "Those tools charge you more the busier you get. When a Zap fails at midnight, nobody finds out until Monday. And you are renting the whole thing; if you stop paying, it disappears.",
    outcome:
      "What we build, you own. It runs on your account. It retries failed events automatically. It does not charge per transaction. And it does not silently lose data.",
    deliverable:
      "A self-hosted integration that replaces your current Zapier or Make setup. No monthly platform fees. No per-event pricing. Lower cost, higher reliability.",
  },
  {
    icon: Plug,
    color: "cyan",
    pain: "You added a new tool and now nothing connects.",
    detail:
      "Every new app your team adopts creates a new island. It does not talk to anything else. So someone becomes the human bridge, manually moving data between the old systems and the new one.",
    outcome:
      "We connect the new tool with everything it needs to talk to. Instead of creating more manual work, the new app fits into your existing workflow from day one.",
    deliverable:
      "A documented integration between your new tool and your existing systems, with monitoring and alerting included.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            What we build
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light">
            We connect your business apps so data flows automatically. Here is
            exactly what that looks like.
          </p>
        </div>

        <ScrollIndicator />
      </header>

      {/* Service Sections */}
      {services.map((service, index) => {
        const Icon = service.icon;
        const isEven = index % 2 === 0;

        return (
          <section
            key={service.pain}
            className={`py-20 md:py-28 ${
              isEven ? "bg-slate-950" : "bg-slate-900/30 border-y border-white/5"
            }`}
          >
            <div className="container mx-auto px-4">
              <SectionFade>
                <div className="max-w-4xl mx-auto">
                  {/* The Pain */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-${service.color}-500/10 flex items-center justify-center border border-${service.color}-500/20`}
                    >
                      <Icon className="w-5 h-5 md:w-7 md:h-7 text-slate-300" />
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white">
                      {service.pain}
                    </h2>
                  </div>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    {service.detail}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* The Outcome */}
                    <div className="glass-card p-6 rounded-xl">
                      <h3 className="text-sm font-mono uppercase tracking-wider text-primary/70 mb-3">
                        What changes
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        {service.outcome}
                      </p>
                    </div>

                    {/* The Deliverable */}
                    <div className="glass-card p-6 rounded-xl">
                      <h3 className="text-sm font-mono uppercase tracking-wider text-primary/70 mb-3">
                        What you own
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        {service.deliverable}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionFade>
            </div>
          </section>
        );
      })}

      {/* Ongoing Support */}
      <section className="py-20 md:py-28 bg-slate-900/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                After the build
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                After the initial build, we monitor your connections, handle any
                changes from your software vendors, and add new integrations as
                your business grows.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                You are not locked in. You own everything. But most clients keep
                us around because the system keeps saving them time, and new
                connections keep paying for themselves.
              </p>
              <p className="text-slate-400 text-base">
                Think of it like having a mechanic on retainer for the wiring
                between your apps. When something changes or when you add a new
                tool, we handle it.
              </p>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* CTA + Form */}
      <section
        id="tell-us"
        className="py-24 md:py-32 bg-slate-950 scroll-mt-20 border-t border-white/5"
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
