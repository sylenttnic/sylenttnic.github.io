// The one place the offer's prices and inclusions live. The home page, /services/,
// /pricing/ and their JSON-LD all read from here so a price can't drift between
// pages. public/llms.txt and public/llms-full.txt are static files and can't
// import this: when a price or inclusion changes here, change them too.

export const CALENDLY_URL = "https://calendly.com/nic-sylentt/30min";

export const PLAN_TERMS = "Month-to-month. 30 days' notice. Everything I produce is yours.";

export type Plan = {
  id: "assessment" | "advisor" | "director";
  name: string;
  price: string;
  priceUnit: string;
  priceValue: string;
  monthly: boolean;
  term: string;
  features: string[];
  footnote?: string;
};

export const assessmentDeliverables = [
  "System and subscription inventory",
  "Vendor and contract review",
  "Security basics check",
  "AI opportunity-and-risk map",
  "12-month roadmap",
  "60-minute in-person readout",
];

export const plans: Plan[] = [
  {
    id: "assessment",
    name: "IT & AI Assessment",
    price: "$1,500",
    priceUnit: "fixed",
    priceValue: "1500",
    monthly: false,
    term: "2 weeks.",
    features: assessmentDeliverables,
    footnote: "Credited toward your first month if you continue.",
  },
  {
    id: "advisor",
    name: "Advisor",
    price: "$1,950",
    priceUnit: "/month",
    priceValue: "1950",
    monthly: true,
    term: "Up to 6 hours a month.",
    features: [
      "Monthly leadership meeting",
      "Roadmap kept current",
      "Vendor and MSP oversight",
      "AI policy and tool vetting",
      "Unlimited questions by email, next-business-day answers",
    ],
  },
  {
    id: "director",
    name: "Director",
    price: "$3,500",
    priceUnit: "/month",
    priceValue: "3500",
    monthly: true,
    term: "Up to 12 hours a month.",
    features: [
      "Everything in Advisor, plus:",
      "Weekly check-in",
      "A seat in your leadership meetings",
      "Ownership of IT budget and renewals",
      "Leading AI and technology projects end to end",
    ],
  },
];

// schema.org Offer for one plan. Monthly plans carry a per-month unit price,
// the same shape app/webdesign/layout.tsx uses for its plan.
export function planOfferJsonLd(plan: Plan) {
  return {
    "@type": "Offer",
    name: plan.name,
    description: `${plan.term} ${plan.features.reduce(
      (text, f) => text + (text === "" ? "" : text.endsWith(":") ? " " : "; ") + f,
      ""
    )}.`,
    url: "https://sylentt.com/pricing/",
    price: plan.priceValue,
    priceCurrency: "USD",
    ...(plan.monthly
      ? {
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: plan.priceValue,
            priceCurrency: "USD",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "MON",
            },
          },
        }
      : {}),
  };
}
