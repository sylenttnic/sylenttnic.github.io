import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  CalendarCheck,
  KeyRound,
  Check,
  X,
} from "lucide-react";
import FitAssessment from "@/components/FitAssessment";
import SectionFade from "@/components/ui/SectionFade";
import type { Metadata } from "next";
import { CALENDLY_URL, EXTRA_HOUR_PRICE, plans, planById, planOfferJsonLd, assessmentDeliverables } from "@/lib/offer";

const pageTitle = "Fractional CIO Services in Cache Valley | Sylentt Partners";
const pageDescription =
  "A fixed-price IT and AI assessment, then a part-time IT director on a monthly plan. What's included, and what I don't do.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://sylentt.com/services/",
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/logo_full.png"],
  },
  alternates: {
    canonical: "https://sylentt.com/services/",
  },
};

const assessment = planById("assessment");
const advisor = planById("advisor");
const director = planById("director");

type OfferCard = {
  label: string;
  text?: string;
  items?: string[];
  extraLabel?: string;
  extraItems?: string[];
  link?: { href: string; label: string };
};

const offers: {
  icon: typeof ClipboardList;
  eyebrow?: string;
  title: string;
  detail: string;
  cards: OfferCard[];
}[] = [
  {
    icon: ClipboardList,
    eyebrow: `2 weeks · ${assessment.price}, one time`,
    title: "IT & AI Assessment",
    detail:
      "I inventory every system, subscription, vendor and risk; find where AI fits and where it doesn't; and deliver a 12-month roadmap, presented to you in person.",
    cards: [
      { label: "What's included", items: assessmentDeliverables },
      {
        label: "What it costs",
        text: `${assessment.price}, one time. Two weeks. Continue on a monthly plan and the ${assessment.price} comes off your first month. If you don't continue, the plan is still yours.`,
      },
    ],
  },
  {
    icon: CalendarCheck,
    eyebrow: "Advisor or Director",
    title: "Monthly retainer",
    detail:
      "I become your IT director for a set number of hours a month. I run the roadmap, manage your MSP and vendors, make the decisions, and answer the questions.",
    cards: [
      {
        label: "What's included",
        items: advisor.features,
        extraLabel: "Director adds",
        extraItems: director.features.slice(1),
      },
      {
        label: "Plans",
        text: `Advisor: ${advisor.price} a month, up to ${advisor.hours} hours. Director: ${director.price} a month, up to ${director.hours} hours. Month-to-month, 30 days' notice. Extra hours are ${EXTRA_HOUR_PRICE} each, only if you say yes first.`,
        link: { href: "/pricing/", label: "See pricing" },
      },
    ],
  },
  {
    icon: KeyRound,
    title: "You own everything",
    detail:
      "Documentation, roadmap, policies, vendor relationships: all yours, in your accounts, from day one.",
    cards: [
      {
        label: "What that means",
        text: "Nothing lives in my accounts. If you end the engagement, nothing needs to be handed back or untangled. You already have it.",
      },
      {
        label: "Why it matters",
        text: "When the person who knows the systems leaves, the knowledge stays. That includes me.",
      },
    ],
  },
];

const notDone = [
  "Helpdesk. Your IT company keeps handling tickets.",
  "Hardware repair.",
  "After-hours support.",
  "Building software. If you need something built, I'll choose who does it and manage them.",
];

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://sylentt.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://sylentt.com/services/",
    },
  ],
};

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://sylentt.com/services/#service",
  name: "Fractional CIO and IT leadership",
  serviceType: "Fractional CIO",
  provider: {
    "@type": "ProfessionalService",
    "@id": "https://sylentt.com/#organization",
    name: "Sylentt Partners",
    url: "https://sylentt.com",
    logo: "https://sylentt.com/logo-symbol.png",
  },
  areaServed: [
    { "@type": "Place", name: "Cache Valley, Utah" },
    { "@type": "Place", name: "Northern Utah" },
  ],
  description:
    "Part-time IT and AI leadership from Nic Aslett: a fixed-price, two-week IT and AI assessment, then a monthly retainer as the company's IT director. Month-to-month with 30 days' notice; the client keeps everything produced. Not included: helpdesk, hardware repair, after-hours support, or building software.",
  offers: plans.map(planOfferJsonLd),
};

export default function ServicesPage() {
  return (
    <div className="bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      {/* Hero */}
      <header className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden border-b border-ink/5">
        <div className="relative z-10 container mx-auto px-4 animate-fade-in-up text-center">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-8 text-balance">
            Two ways to work with me.
          </h1>
          <p className="text-xl md:text-2xl text-ink/80 max-w-3xl mx-auto font-sans leading-relaxed mb-12 text-pretty">
            Start with a two-week assessment. If it&apos;s useful, I stay on as your part-time IT director.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta w-full sm:w-auto px-10 py-4 text-lg group"
            >
              Book a 30-minute call
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <Link
              href="/pricing/"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-paper text-accent border border-accent/25 px-8 py-3 font-bold transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              See pricing
            </Link>
          </div>
        </div>
      </header>

      {/* Overview */}
      <section className="py-16 md:py-24 bg-surface border-b border-ink/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl md:text-5xl text-ink mb-6">
                What a fractional CIO does
              </h2>
              <p className="text-lg text-ink/90 leading-relaxed mb-6">
                A fractional CIO does the job of a full-time IT director for a few hours a month. I make the technology decisions, keep the plan, and manage the people who do the work. Your IT company keeps fixing things.
              </p>
              <div className="bg-paper p-8 rounded-2xl border border-ink/10 shadow-soft">
                <ul className="list-disc list-inside space-y-3 text-ink/90 text-lg">
                  <li><strong className="text-ink">Decisions:</strong> one person owns the technology and AI calls, so they stop defaulting to whoever is closest.</li>
                  <li><strong className="text-ink">Oversight:</strong> your IT company and vendors are managed and held to what you pay for.</li>
                  <li><strong className="text-ink">Ownership:</strong> every document, policy, and account stays yours.</li>
                </ul>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Offers */}
      {offers.map((offer, index) => {
        const Icon = offer.icon;
        const isDark = index === offers.length - 1;
        const isEven = index % 2 === 0;

        return (
          <section
            key={offer.title}
            className={`py-24 md:py-32 ${
              isDark ? "bg-ink text-paper" : (isEven ? "bg-paper" : "bg-surface border-y border-ink/5")
            }`}
          >
            <div className="container mx-auto px-4">
              <SectionFade>
                <div className="max-w-4xl mx-auto">
                  <div className="mb-12">
                    <div className={`mb-6 w-12 h-12 rounded-full flex items-center justify-center ${isDark ? "bg-paper/10" : "bg-ink/5 border border-ink/10"}`}>
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    {offer.eyebrow && (
                      <p className={`eyebrow mb-4 ${isDark ? "text-paper/70" : "text-accent"}`}>
                        {offer.eyebrow}
                      </p>
                    )}
                    <h2 className={`font-display text-3xl md:text-5xl mb-6 text-balance ${isDark ? "text-paper" : "text-ink"}`}>
                      {offer.title}
                    </h2>
                    <p className={`text-lg leading-relaxed max-w-3xl ${isDark ? "text-paper/80" : "text-ink/90"}`}>
                      {offer.detail}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {offer.cards.map((card) => (
                      <div
                        key={card.label}
                        className={`${isDark ? "bg-white/5 border-white/10" : "bg-paper border-ink/15 shadow-soft"} border p-8 rounded-2xl`}
                      >
                        <h3 className={`eyebrow mb-4 ${isDark ? "text-paper/80" : "text-accent"}`}>
                          {card.label}
                        </h3>
                        {card.text && (
                          <p className={isDark ? "text-paper/80 leading-relaxed" : "text-ink/90 leading-relaxed"}>
                            {card.text}
                          </p>
                        )}
                        {card.items && (
                          <ul className="space-y-3">
                            {card.items.map((item) => (
                              <li key={item} className="flex items-start">
                                <Check className="w-5 h-5 text-accent mr-3 shrink-0 mt-0.5" />
                                <span className="text-ink/90 leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {card.extraItems && (
                          <>
                            <p className="eyebrow text-ink/60 mt-6 mb-3">{card.extraLabel}</p>
                            <ul className="space-y-3">
                              {card.extraItems.map((item) => (
                                <li key={item} className="flex items-start">
                                  <Check className="w-5 h-5 text-accent mr-3 shrink-0 mt-0.5" />
                                  <span className="text-ink/90 leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                        {card.link && (
                          <Link
                            href={card.link.href}
                            className="mt-6 inline-flex items-center text-accent-link font-bold rounded-sm underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                          >
                            {card.link.label}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </SectionFade>
            </div>
          </section>
        );
      })}

      {/* What I don't do */}
      <section className="py-24 md:py-32 bg-paper border-b border-ink/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl md:text-5xl text-ink mb-6">
                What I don&apos;t do
              </h2>
              <p className="text-lg text-ink/90 leading-relaxed mb-8">
                I decide and manage. These stay with someone else:
              </p>
              <ul className="bg-surface p-8 rounded-2xl border border-ink/10 shadow-soft space-y-4">
                {notDone.map((item) => (
                  <li key={item} className="flex items-start text-lg">
                    <X className="w-5 h-5 text-ink/50 mr-4 shrink-0 mt-1" aria-hidden="true" />
                    <span className="text-ink/90 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Closing: book a call or take the IT check */}
      <section
        id="it-check"
        className="py-24 md:py-32 bg-paper scroll-mt-24"
      >
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="font-display text-4xl md:text-6xl mb-6 text-ink text-balance">
                Not sure where you stand?
              </h2>
              <p className="text-ink/90 text-xl mb-10">
                Take the 2-minute IT check, or book a 30-minute call.
              </p>
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
            <div className="max-w-2xl mx-auto">
              <FitAssessment />
            </div>
          </SectionFade>
        </div>
      </section>
    </div>
  );
}
