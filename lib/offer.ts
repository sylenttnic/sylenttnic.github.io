// The one place the offer's prices, hours and inclusions live. The home page,
// /services/, /pricing/ and their JSON-LD all read from here so a price can't
// drift between pages. app/layout.tsx (ai-content-description),
// public/llms.txt and public/llms-full.txt are written out by hand: when a
// price, an hour count or an inclusion changes here, change them too.
//
// Keep it as plain as a drive-through menu. Three options, each one line of
// what it costs and a short list of what you get. If a visitor would have to
// email to understand a plan, the plan is written wrong.

export const CALENDLY_URL = "https://calendly.com/nic-sylentt/30min";

// Who this is for, in one phrase, used wherever the site names the audience.
export const AUDIENCE = "companies of about 20 to 150 people";

export const EXTRA_HOUR_PRICE = "$150";

export const PLAN_TERMS = "Month-to-month. 30 days' notice. Everything I produce is yours.";

// The rules for hours, stated once and shown under the plans. These answer the
// questions a visitor would otherwise have to ask.
export const HOURS_RULES = [
  "Hours cover meetings, email, and work I do for you.",
  `Need more in a month? Extra hours are ${EXTRA_HOUR_PRICE} each, and only if you say yes first.`,
  "Unused hours don't carry over.",
];

export type Plan = {
  id: "assessment" | "advisor" | "director";
  name: string;
  price: string;
  priceUnit: string;
  priceValue: string;
  monthly: boolean;
  hours?: number;
  term: string;
  features: string[];
  footnote?: string;
};

export const assessmentDeliverables = [
  "Every system, subscription and vendor you pay for, listed with its cost",
  "Contract and renewal dates in one place",
  "A security basics check",
  "Where AI can help, and where it's a risk",
  "A one-page AI policy for your team",
  "A 12-month plan",
  "A 1-hour walkthrough, in person",
];

export const plans: Plan[] = [
  {
    id: "assessment",
    name: "IT & AI Assessment",
    price: "$1,500",
    priceUnit: "one time",
    priceValue: "1500",
    monthly: false,
    term: "2 weeks.",
    features: assessmentDeliverables,
    footnote: "Continue on a monthly plan and the $1,500 comes off your first month.",
  },
  {
    id: "advisor",
    name: "Advisor",
    price: "$1,500",
    priceUnit: "/month",
    priceValue: "1500",
    monthly: true,
    hours: 8,
    term: "Up to 8 hours a month.",
    features: [
      "A leadership meeting every month",
      "I manage your IT company and vendors",
      "Your 12-month plan, kept current",
      "New software and AI tools checked before you buy",
      "Email answers by the next business day",
    ],
  },
  {
    id: "director",
    name: "Director",
    price: "$2,500",
    priceUnit: "/month",
    priceValue: "2500",
    monthly: true,
    hours: 16,
    term: "Up to 16 hours a month.",
    features: [
      "Everything in Advisor, plus:",
      "A check-in every week",
      "I own your IT budget and renewals",
      "I run one technology or AI project at a time",
    ],
  },
];

export const planById = (id: Plan["id"]) => plans.find((p) => p.id === id)!;

// One sentence for meta descriptions and JSON-LD on /pricing/.
export const PRICING_SUMMARY = `Published prices: a ${planById("assessment").price} IT and AI assessment, then Advisor at ${planById("advisor").price} a month or Director at ${planById("director").price} a month. Month-to-month, 30 days' notice.`;

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
