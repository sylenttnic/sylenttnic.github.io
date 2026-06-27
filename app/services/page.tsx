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
import IntegratorDiagram from "@/components/home/IntegratorDiagram";
import CostCalculator from "@/components/CostCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Sylentt Partners — Custom Business App Integration",
  description:
    "Sylentt Partners builds automated connections between your business tools. Shopify, QuickBooks, Stripe, HubSpot, and more. You own everything we build.",
  openGraph: {
    title: "Services | Sylentt Partners — Custom Business App Integration",
    description:
      "Sylentt Partners builds automated connections between your business tools. Shopify, QuickBooks, Stripe, HubSpot, and more. You own everything we build.",
    url: "https://sylentt.com/services/",
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Sylentt Partners — Custom Business App Integration",
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

export default function ServicesPage() {
  return (
    <div className="bg-paper text-ink">
      {/* Hero */}
      <header className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-ink/5">
        <div className="relative z-10 container mx-auto px-4 animate-fade-in-up text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-8">
            App integrations for small businesses.
          </h1>
          <p className="text-xl md:text-2xl text-ink/90 max-w-3xl mx-auto font-sans leading-relaxed mb-12">
            We connect your business apps so data flows between them automatically, saving your team hours every week.
          </p>

          {/* integration-logos graphic relocated from homepage */}
          <div className="mb-16">
            <IntegratorDiagram />
          </div>

          <div className="flex flex-col items-center gap-8">
            <Link
              href="#tell-us"
              className="inline-flex items-center justify-center rounded-sm bg-accent px-10 py-4 text-lg font-bold text-white transition-all hover:opacity-90 group shadow-lg shadow-accent/20"
            >
              Find ways to save time
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#calculator"
              className="inline-flex items-center justify-center rounded-sm bg-white text-accent border border-accent/20 px-8 py-3 font-bold hover:bg-surface transition-all"
            >
              Calculate your time savings
            </Link>
          </div>
        </div>
      </header>

      {/* Service Sections */}
      {services.map((service, index) => {
        const Icon = service.icon;
        const isEven = index % 2 === 0;

        // Apply dark background to "Zapier/Make" section for rhythm
        const isDark = index === 2;

        return (
          <section
            key={service.pain}
            className={`py-12 md:py-16 ${
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
                    <h2 className={`text-3xl md:text-5xl font-serif mb-6 ${isDark ? "text-paper" : "text-ink"}`}>
                      {service.pain}
                    </h2>
                    <p className={`text-lg leading-relaxed max-w-3xl ${isDark ? "text-paper/80" : "text-ink/90"}`}>
                      {service.detail}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* The Outcome */}
                    <div className={`${isDark ? "bg-white/5 border-white/10" : "bg-paper border-ink/20"} border p-8 rounded-sm`}>
                      <h3 className={`text-sm font-sans uppercase tracking-widest font-bold mb-4 ${isDark ? "text-paper" : "text-ink"}`}>
                        What changes
                      </h3>
                      <p className={isDark ? "text-paper/80" : "text-ink/90 leading-relaxed"}>
                        {service.outcome}
                      </p>
                    </div>

                    {/* The Deliverable */}
                    <div className={`${isDark ? "bg-white/5 border-white/10" : "bg-paper border-ink/20"} border p-8 rounded-sm`}>
                      <h3 className={`text-sm font-sans uppercase tracking-widest font-bold mb-4 ${isDark ? "text-paper" : "text-ink"}`}>
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
                        className="inline-flex items-center justify-center rounded-sm bg-white text-accent px-8 py-3 font-bold hover:bg-opacity-90 transition-all shadow-sm"
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
      <section className="py-12 md:py-24 bg-ink">
        <div className="container mx-auto px-4">
          <SectionFade>
            <CostCalculator heading="What is the manual work costing you?" />
          </SectionFade>
        </div>
      </section>

      {/* Build Process Card */}
      <section className="py-12 md:py-16 bg-paper border-b border-ink/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-4xl mx-auto">
              <Link
                href="/services/agents"
                className="group block bg-surface border border-ink/10 p-10 md:p-16 rounded-sm hover:border-accent/30 transition-all"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-paper border border-ink/10 flex items-center justify-center group-hover:border-accent/20 transition-colors">
                    <Eye className="w-8 h-8 text-accent" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-ink">
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
        className="py-12 md:py-16 bg-paper scroll-mt-24"
      >
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-serif mb-6 text-ink">
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
