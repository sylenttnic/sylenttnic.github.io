import Link from "next/link";
import {
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  RotateCcw,
  Plug,
  Eye,
} from "lucide-react";
import FitAssessment from "@/components/FitAssessment";
import SectionFade from "@/components/ui/SectionFade";
import IntegrationFlow from "@/components/IntegrationFlow";
import CostCalculator from "@/components/CostCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Business App Integration | Sylentt Partners",
  description:
    "Sylentt Partners builds automated connections between your business tools. Shopify, QuickBooks, Stripe, HubSpot, and more. You own everything we build.",
  openGraph: {
    title: "Custom Business App Integration | Sylentt Partners",
    description:
      "Sylentt Partners builds automated connections between your business tools. Shopify, QuickBooks, Stripe, HubSpot, and more. You own everything we build.",
    url: "https://sylentt.com/services/",
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Business App Integration | Sylentt Partners",
    description:
      "Sylentt Partners builds automated connections between your business tools. Shopify, QuickBooks, Stripe, HubSpot, and more. You own everything we build.",
    images: ["/logo_full.png"],
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
      "Every time an order comes in, a payment clears, or a customer signs up, someone on your team has to update two or three apps by hand. It takes hours every week, and mistakes pile up.",
    outcome:
      "After we build the connection, data moves between your apps instantly. No copying, no double-checking, no lag. Your team gets those hours back.",
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
      "Rented tools charge you more the busier you get. When a Zap fails at midnight, nobody finds out until Monday. And because you are renting, if you stop paying, everything disappears.",
    outcome:
      "What we build, you own. It runs on your own cloud account, it retries failed events automatically, and it does not silently lose data.",
    deliverable:
      "A self-hosted integration that replaces your current Zapier or Make setup, running on your own cloud account. Instead of renting a platform, you pay your cloud provider directly for the usage you consume, with no markup on top. The code is yours to keep.",
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

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://sylentt.com/services/#service",
  name: "Custom Business App Integration & Workflow Automation",
  provider: {
    "@type": "ProfessionalService",
    name: "Sylentt Partners",
    url: "https://sylentt.com",
    logo: "https://sylentt.com/logo-symbol.png",
  },
  serviceType: "Software Integration & API Development",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  description:
    "Automated connections between business software applications including Shopify, QuickBooks, Stripe, HubSpot, and Xero. Self-hosted custom integrations with real-time error alerts and zero platform lock-in.",
  offers: [
    {
      "@type": "Offer",
      name: "Discovery Call & Integration Audit",
      price: "0",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Custom Integration Implementation",
      price: "2500",
      priceCurrency: "USD",
      priceValidUntil: "2026-12-31",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Business Integration Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Automated Data Sync",
        description: "Eliminate manual copy-paste between CRM, ERP, accounting, and e-commerce apps.",
      },
      {
        "@type": "OfferCatalog",
        name: "Proactive Monitoring & Alerting",
        description: "Built-in error detection and automatic retries for critical business workflows.",
      },
      {
        "@type": "OfferCatalog",
        name: "Zapier & Make Migration",
        description: "Replace rented automation platforms with client-owned infrastructure.",
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      {/* Hero */}
      <header className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden border-b border-ink/5">
        <div className="relative z-10 container mx-auto px-4 animate-fade-in-up text-center">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-8 text-balance">
            Get your team&apos;s hours back.
          </h1>
          <p className="text-xl md:text-2xl text-ink/80 max-w-3xl mx-auto font-sans leading-relaxed mb-12 text-pretty">
            We connect your business apps so data flows between them automatically, saving your team hours every week.
          </p>

          {/* Live integration flow: an event in one app updates the others automatically */}
          <div className="mb-16">
            <IntegrationFlow />
          </div>

          <div className="flex flex-col items-center gap-8">
            <Link
              href="#tell-us"
              className="btn-cta px-10 py-4 text-lg group"
            >
              Find ways to save time
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#calculator"
              className="inline-flex items-center justify-center rounded-lg bg-paper text-accent border border-accent/25 px-8 py-3 font-bold transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Calculate your time savings
            </Link>
          </div>
        </div>
      </header>

      {/* Conversational AEO Overview Section */}
      <section className="py-16 md:py-24 bg-surface border-b border-ink/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-4xl mx-auto space-y-12">
              <div>
                <h2 className="font-display text-3xl md:text-5xl text-ink mb-6">
                  How Custom Business App Integration Works
                </h2>
                <p className="text-lg text-ink/90 leading-relaxed mb-6">
                  Custom business app integration connects separate software applications—such as your CRM, e-commerce platform, accounting tool, and inventory manager—via their Application Programming Interfaces (APIs). Instead of team members copying data manually, custom integration automates data flows in real time across systems.
                </p>
                <div className="bg-paper p-8 rounded-2xl border border-ink/10 shadow-soft">
                  <h3 className="font-serif text-xl font-bold text-ink mb-4">
                    Key Advantages of Custom Integration
                  </h3>
                  <ul className="list-disc list-inside space-y-3 text-ink/90 text-lg">
                    <li><strong className="text-ink">Zero Manual Data Entry:</strong> Orders, customer updates, and payments sync instantly without human intervention.</li>
                    <li><strong className="text-ink">Client Ownership:</strong> Integrations run on your cloud account; you own the code with no per-transaction fees or platform markup.</li>
                    <li><strong className="text-ink">Proactive Error Detection:</strong> Real-time monitoring and automatic retries prevent dropped orders or silent failures.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-paper p-8 rounded-2xl border border-ink/10 shadow-soft">
                  <h3 className="font-serif text-xl font-bold text-ink mb-4">
                    Platforms We Connect
                  </h3>
                  <p className="text-ink/90 leading-relaxed mb-4 text-base">
                    If a software tool has an accessible API, Sylentt can connect it. Commonly integrated business tools include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-ink/90 text-base">
                    <li>E-Commerce: Shopify, Square, Stripe</li>
                    <li>Accounting: QuickBooks Online, Xero, FreshBooks</li>
                    <li>CRM & Sales: HubSpot, Salesforce</li>
                    <li>Operations: Jobber, ServiceTitan, ShipStation</li>
                  </ul>
                </div>

                <div className="bg-paper p-8 rounded-2xl border border-ink/10 shadow-soft">
                  <h3 className="font-serif text-xl font-bold text-ink mb-4">
                    Difference from Zapier or Make
                  </h3>
                  <p className="text-ink/90 leading-relaxed mb-4 text-base">
                    While platforms like Zapier charge monthly subscriptions that increase with task volume and often fail silently, Sylentt builds custom, self-hosted integrations:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-ink/90 text-base">
                    <li>No recurring monthly task or platform fees</li>
                    <li>Immediate notification when a sync error occurs</li>
                    <li>Complete code ownership without vendor lock-in</li>
                  </ul>
                </div>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, index) => {
        const Icon = service.icon;
        const isEven = index % 2 === 0;

        // Apply dark background to "Zapier/Make" section for rhythm
        const isDark = index === 2;

        return (
          <section
            key={service.pain}
            className={`py-24 md:py-32 ${
              isDark ? "bg-ink text-paper" : (isEven ? "bg-paper" : "bg-surface border-y border-ink/5")
            }`}
          >
            <div className="container mx-auto px-4">
              <SectionFade>
                <div className="max-w-4xl mx-auto">
                  {/* The Pain */}
                  <div className="mb-12">
                    <div className={`mb-6 w-12 h-12 rounded-full flex items-center justify-center ${isDark ? "bg-paper/10" : "bg-ink/5 border border-ink/10"}`}>
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h2 className={`font-display text-3xl md:text-5xl mb-6 text-balance ${isDark ? "text-paper" : "text-ink"}`}>
                      {service.pain}
                    </h2>
                    <p className={`text-lg leading-relaxed max-w-3xl ${isDark ? "text-paper/80" : "text-ink/90"}`}>
                      {service.detail}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* The Outcome */}
                    <div className={`${isDark ? "bg-white/5 border-white/10" : "bg-paper border-ink/15 shadow-soft"} border p-8 rounded-2xl`}>
                      <h3 className={`eyebrow mb-4 ${isDark ? "text-paper/80" : "text-accent"}`}>
                        What changes
                      </h3>
                      <p className={isDark ? "text-paper/80" : "text-ink/90 leading-relaxed"}>
                        {service.outcome}
                      </p>
                    </div>

                    {/* The Deliverable */}
                    <div className={`${isDark ? "bg-white/5 border-white/10" : "bg-paper border-ink/15 shadow-soft"} border p-8 rounded-2xl`}>
                      <h3 className={`eyebrow mb-4 ${isDark ? "text-paper/80" : "text-accent"}`}>
                        What you own
                      </h3>
                      <p className={isDark ? "text-paper/80" : "text-ink/90 leading-relaxed"}>
                        {service.deliverable}
                      </p>
                    </div>
                  </div>

                  {isDark && (
                    <div className="mt-12 text-center">
                      <Link
                        href="#calculator"
                        className="inline-flex items-center justify-center rounded-lg bg-white text-accent px-8 py-3 font-bold shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                      >
                        Calculate your cost savings
                      </Link>
                    </div>
                  )}
                </div>
              </SectionFade>
            </div>
          </section>
        );
      })}

      {/* Relocated Savings Calculator */}
      <section className="py-24 md:py-32 bg-ink">
        <div className="container mx-auto px-4">
          <SectionFade>
            <CostCalculator heading="What is the manual work costing you?" />
          </SectionFade>
        </div>
      </section>

      {/* Build Process Card */}
      <section className="py-24 md:py-32 bg-paper border-b border-ink/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-4xl mx-auto">
              <Link
                href="/services/agents"
                className="group block bg-surface border border-ink/10 p-10 md:p-16 rounded-2xl shadow-soft transition-all hover:border-accent/30 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-paper border border-ink/10 flex items-center justify-center group-hover:border-accent/20 transition-colors">
                    <Eye className="w-8 h-8 text-accent" />
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl text-ink">
                    How we build it
                  </h2>
                </div>
                <p className="text-ink text-xl mb-8 leading-relaxed font-medium">
                  Every integration follows the same structured process. Six
                  phases, multiple quality checkpoints, and nothing goes live
                  without your approval.
                </p>
                <div className="flex items-center text-accent font-bold text-lg group-hover:translate-x-2 transition-transform">
                  See the build process{" "}
                  <ArrowRight className="ml-2 w-6 h-6" />
                </div>
              </Link>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Assessment Form */}
      <section
        id="tell-us"
        className="py-24 md:py-32 bg-paper scroll-mt-24"
      >
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="font-display text-4xl md:text-6xl mb-6 text-ink text-balance">
                Tell us what&apos;s broken
              </h2>
              <p className="text-ink/90 text-xl">
                Answer a few quick questions so we can see where your time is
                going.
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
