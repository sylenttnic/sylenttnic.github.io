import { Check, ArrowRight, CalendarCheck, ClipboardList, SlidersHorizontal } from "lucide-react";
import SectionFade from "@/components/ui/SectionFade";
import { CALENDLY_URL, PLAN_TERMS, HOURS_RULES, PRICING_SUMMARY, plans, planById, planOfferJsonLd } from "@/lib/offer";

const assessmentPrice = planById("assessment").price;

const howItWorks = [
  {
    icon: CalendarCheck,
    title: "Book a 30-minute call",
    description: "Tell me how IT works at your company today. I'll tell you honestly whether I can help.",
  },
  {
    icon: ClipboardList,
    title: "Start with the assessment",
    description: `Two weeks, ${assessmentPrice}. You get a 12-month plan whether or not you continue.`,
  },
  {
    icon: SlidersHorizontal,
    title: "Pick a plan, or don't",
    description: `Continue on Advisor or Director and the ${assessmentPrice} comes off your first month.`,
  },
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
      name: "Pricing",
      item: "https://sylentt.com/pricing/",
    },
  ],
};

const jsonLdPricing = {
  "@context": "https://schema.org",
  "@type": "ItemPage",
  "@id": "https://sylentt.com/pricing/#webpage",
  url: "https://sylentt.com/pricing/",
  name: "Fractional CIO Pricing | Sylentt Partners",
  description: PRICING_SUMMARY,
  mainEntity: {
    "@type": "OfferCatalog",
    name: "Sylentt Partners plans",
    itemListElement: plans.map(planOfferJsonLd),
  },
};

export default function PricingPage() {
  return (
    <div className="bg-paper text-ink selection:bg-accent/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPricing) }}
      />
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center pt-32 pb-16 md:pt-44">
        <SectionFade>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-8 text-balance">
            What it costs.
          </h1>
          <p className="text-xl md:text-2xl text-ink/80 max-w-3xl mx-auto leading-relaxed font-sans text-pretty">
            Three options, fixed and published. Most companies start with the assessment.
          </p>
        </SectionFade>
      </section>

      {/* Plans */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="sr-only">Plans</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {plans.map((plan) => {
            const emphasized = plan.id === "assessment";
            return (
              <div
                key={plan.id}
                className={`bg-surface border border-ink/10 p-8 md:p-12 rounded-2xl flex flex-col shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-lift ${
                  emphasized ? "border-accent/40 ring-1 ring-accent/15" : ""
                }`}
              >
                {emphasized && <p className="eyebrow text-accent mb-4">Start here</p>}
                <h3 className="font-display text-2xl md:text-3xl mb-2">{plan.name}</h3>
                <div className="font-display text-4xl mb-6 text-accent">
                  {plan.price}
                  <span className="text-xl text-ink/60 font-sans">
                    {plan.monthly ? plan.priceUnit : `, ${plan.priceUnit}`}
                  </span>
                </div>
                <p className="text-ink/90 mb-10 leading-relaxed text-lg">
                  {plan.term}
                </p>

                <div className="space-y-6 mb-12 flex-grow">
                  <div className="eyebrow text-ink/70">What&apos;s Included</div>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-accent mr-4 shrink-0 mt-0.5" />
                      <span className="text-ink text-base leading-relaxed font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${emphasized ? "btn-cta" : "btn-quiet"} w-full py-5 text-lg group`}
                  >
                    Book a 30-minute call
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  {plan.footnote && (
                    <p className="mt-6 text-sm text-ink/90 italic text-center leading-relaxed">
                      {plan.footnote}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-12 text-center font-display text-2xl md:text-3xl text-ink text-balance">
          {PLAN_TERMS}
        </p>
        <ul className="mt-6 max-w-2xl mx-auto space-y-2 text-center text-lg text-ink/80">
          {HOURS_RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-surface border-y border-ink/5 mb-16">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-5xl">
                How it works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
              {howItWorks.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="text-center group">
                    <div className="w-16 h-16 rounded-full bg-paper border border-ink/10 flex items-center justify-center mx-auto mb-8 transition-colors group-hover:border-accent/20">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-serif mb-4">{step.title}</h3>
                    <p className="text-ink/90 leading-relaxed text-lg">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Closing */}
      <section className="container mx-auto px-4 max-w-4xl pb-24">
        <SectionFade>
          <div className="bg-surface border border-ink/10 p-8 md:p-16 rounded-2xl shadow-soft text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-6">Questions first?</h2>
            <p className="text-lg text-ink/90 leading-relaxed mb-10">
              Email me at{" "}
              <a
                href="mailto:contact@sylentt.com"
                className="text-accent-link font-semibold underline underline-offset-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                contact@sylentt.com
              </a>
              , or book a 30-minute call.
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
        </SectionFade>
      </section>
    </div>
  );
}
