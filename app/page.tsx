import CostCalculator from "@/components/CostCalculator";
import { ArrowRight, RefreshCw, AlertTriangle, Plug, RotateCcw, ChevronDown } from "lucide-react";
import FitAssessment from "@/components/FitAssessment";
import HeroChatInput from "@/components/home/HeroChatInput";
import SectionFade from "@/components/ui/SectionFade";
import IntegratorDiagram from "@/components/home/IntegratorDiagram";
import ClientLogos from "@/components/home/ClientLogos";
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
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sylentt | Your business apps don't talk to each other. We fix that.",
    description:
      "Sylentt connects your business apps so your team stops being the copy-paste layer. Custom integrations you own. Based in Cache Valley, Utah.",
    images: ["/logo_full.png"],
  },
  alternates: {
    canonical: "https://sylentt.com/",
  },
};

const testimonials = [
  {
    text: "I worked with Nic on highly complex configurations... and found him to be logical, clear thinking, hard working, and pleasant.",
    name: "J. Scott Cannata",
    role: "Co-Founder, Liqid",
    avatar: "/avatars/cannata.png",
  },
  {
    text: "Nic is a dedicated and hard-working system integration specialist. Time and time again I saw him do whatever it took to get our products loaded, integrated, tested and working.",
    name: "Scott Hopkins",
    role: "Senior Systems Engineer & Program Manager (ret.)",
    avatar: "/avatars/hopkins.png",
  },
  {
    text: "Nic is a visionary that can quickly identify shortcomings in processes, procedures, and functions in the technical space.",
    name: "Chris Gregoire",
    role: "Solutions Architect, Liqid",
    avatar: "/avatars/gregoire.png",
  },
  {
    text: "Nic's unique blend of technical talent, optimism, charisma and no-nonsense approach to problem solving will benefit any team, department, organization or company he joins.",
    name: "Randall Syfert",
    role: "Project Control Analyst, By Light Professional IT Services",
    avatar: "/avatars/syfert.png",
  },
];

const problemCards = [
  {
    icon: RefreshCw,
    title: "Your team re-enters the same data into multiple systems.",
    description:
      "An order comes in, someone retypes it into the shipping app. A payment clears, someone updates the books. We make those updates happen automatically.",
  },
  {
    icon: AlertTriangle,
    title: "You find out something broke days after it happened.",
    description:
      "A subscription fails, an invoice never syncs, and nobody notices until a customer complains. We build monitoring that catches it in real time and alerts you first.",
  },
  {
    icon: RotateCcw,
    title: "You are paying for automation tools and things still break.",
    description:
      "Rented tools charge you more as you grow and fail silently at midnight. What we build, you own, it runs on your account, and it retries on its own.",
  },
  {
    icon: Plug,
    title: "You added a new tool and now nothing connects.",
    description:
      "Every new app becomes another island your team bridges by hand. We connect it to everything else so it fits in from day one.",
  },
];

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Sylentt Partners",
  alternateName: ["Sylentt LLC", "Sylentt"],
  description:
    "Business app integration and workflow automation for small businesses. We build custom connections between your tools so your team stops being the copy-paste layer.",
  url: "https://sylentt.com",
  logo: "https://sylentt.com/logo-symbol.png",
  image: "https://sylentt.com/logo_full.png",
  email: "contact@sylentt.com",
  areaServed: [
    { "@type": "Place", name: "Cache Valley, Utah" },
    { "@type": "Country", name: "United States" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "40 W Cache Valley Blvd",
    addressLocality: "Logan",
    addressRegion: "UT",
    postalCode: "84341",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.google.com/maps?cid=10860538682886367500",
    "https://www.linkedin.com/company/sylentt-partners/"
  ],
  "customer": [
    { "@type": "Organization", "name": "By Light", "url": "https://bylight.com/" },
    { "@type": "Organization", "name": "edZOOcation", "url": "https://edzoocation.com/" }
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What exactly do you do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We connect the software tools your business already uses. This includes your CRM, accounting software, and project management tools. We make them talk to each other automatically. This means your team stops copying and pasting data between apps. It eliminates manual errors and saves hours of work every week.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from tools like Zapier?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most automation tools are rentals. You pay monthly, the price goes up as volume grows, and if something breaks at midnight nobody knows until a customer complains. What we build, you own. It runs on your own account. You pay your cloud provider directly for usage with no platform markup, and failures trigger real-time alerts.",
      },
    },
    {
      "@type": "Question",
      name: "What apps can you connect?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your business runs on it and it has an API, we can connect it. Common systems include Shopify, QuickBooks, Stripe, Square, HubSpot, Xero, Salesforce, Jobber, ShipStation, and more.",
      },
    },
  ],
};

const faqItems = [
  {
    question: "What exactly do you do?",
    answer:
      "We connect the software tools your business already uses. This includes your CRM, accounting software, and project management tools. We make them talk to each other automatically. This means your team stops copying and pasting data between apps. It eliminates manual errors and saves hours of work every week.",
  },
  {
    question: "How is this different from tools like Zapier?",
    answer:
      "Most automation tools are rentals. You pay monthly, the price goes up as volume grows, and if something breaks at midnight nobody knows until a customer complains. What we build, you own. It runs on your own account. You pay your cloud provider directly for usage with no platform markup, and failures trigger real-time alerts instead of sitting in a log nobody checks.",
  },
  {
    question: "What apps can you connect?",
    answer:
      "If your business runs on it and it has an API, we can connect it. Common systems include Shopify, QuickBooks, Stripe, Square, HubSpot, Xero, Salesforce, Jobber, ShipStation, and more. If your app is not on that list, just ask. We have probably connected something like it before.",
  },
  {
    question: "Do I own everything you build?",
    answer:
      "Yes. The integrations run on your cloud account. The code is yours. If we part ways, everything keeps running. There is no lock-in and no proprietary platform you lose access to.",
  },
  {
    question: "How long does a typical integration take?",
    answer:
      "Most initial integrations are live in 2 to 4 weeks. We start with the single most painful manual process in your business so you see immediate relief while we build out the rest of your integration map.",
  },
];

export default function Home() {
  return (
    <div className="bg-paper text-ink selection:bg-accent/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* Section 1: Hero + Diagram */}
      <header className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-8xl font-serif font-medium mb-8 leading-tight tracking-tight">
              Your business apps don&apos;t talk to each other. We fix that.
            </h1>
            <p className="text-xl md:text-2xl text-ink/70 max-w-2xl mx-auto mb-12 font-sans leading-relaxed">
              We connect the tools you already run, so your team stops being the copy-paste layer between them.
            </p>
          </div>

          <div className="mb-20">
            <IntegratorDiagram />
          </div>

          <div className="flex flex-col items-center justify-center gap-12">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-sm bg-accent px-12 py-5 text-xl font-bold text-white transition-all hover:opacity-90 group shadow-lg shadow-accent/20"
            >
              Book a discovery call
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="w-full max-w-xl opacity-60 hover:opacity-100 transition-opacity">
              <p className="text-center text-sm font-sans uppercase tracking-[0.2em] mb-4 text-ink/40">Or ask a quick question</p>
              <HeroChatInput />
            </div>
          </div>
        </div>
      </header>

      {/* Section 2: Problem Statements */}
      <section className="py-24 md:py-32 bg-ink text-paper">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="mb-20">
              <h2 className="text-4xl md:text-6xl font-serif mb-6 text-paper">
                Here is where your team&apos;s hours go.
              </h2>
              <p className="text-xl text-paper/60 max-w-2xl leading-relaxed">
                Every time an order comes in, a payment clears, or a customer signs up, someone on your team has to update two or three apps by hand. It takes hours every week, and mistakes pile up quietly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {problemCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div key={i} className="group">
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

      {/* Section 3: How It Works - Asymmetric Layout */}
      <section className="py-24 md:py-32 bg-paper text-ink overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <div>
                <h2 className="text-4xl md:text-6xl font-serif mb-12">
                  How it works
                </h2>
                <div className="space-y-16">
                  <div className="flex gap-8 group">
                    <span className="text-4xl font-serif text-accent/30 group-hover:text-accent transition-colors duration-500">01</span>
                    <div>
                      <h3 className="text-2xl font-serif mb-4">Tell us what is broken</h3>
                      <p className="text-lg text-ink/70 leading-relaxed">
                        Which apps does your business use? Where is the manual work? This is a conversation, not a requirements document.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-8 group">
                    <span className="text-4xl font-serif text-accent/30 group-hover:text-accent transition-colors duration-500">02</span>
                    <div>
                      <h3 className="text-2xl font-serif mb-4">We build the connections</h3>
                      <p className="text-lg text-ink/70 leading-relaxed">
                        When something happens in one app, the others update automatically. No copying. No checking. No hoping it worked.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-8 group">
                    <span className="text-4xl font-serif text-accent/30 group-hover:text-accent transition-colors duration-500">03</span>
                    <div>
                      <h3 className="text-2xl font-serif mb-4">You own everything</h3>
                      <p className="text-lg text-ink/70 leading-relaxed">
                        It runs on your own cloud account, and the code is yours. You pay your provider directly for usage, with no platform markup on top. If we part ways, you keep all of it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block relative pt-20">
                <div className="aspect-[4/5] bg-ink/5 border border-ink/10 rounded-sm flex items-center justify-center p-12">
                   <p className="text-5xl font-serif italic text-center text-ink leading-tight">
                     &ldquo;The goal is to stop thinking about data entry and start thinking about your business.&rdquo;
                   </p>
                </div>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Section 4: Real Example */}
      <section className="py-24 md:py-48 bg-ink text-paper">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-4xl">
              <h2 className="text-4xl md:text-6xl font-serif mb-12 text-paper">
                What this looks like in practice
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="text-lg text-paper/70 space-y-8 leading-relaxed">
                  <div className="space-y-4">
                    <span className="text-6xl md:text-8xl font-serif text-accent block">Nearly a full day a week, back.</span>
                    <p className="text-xl font-serif italic text-paper/40 uppercase tracking-widest">Real Results</p>
                  </div>
                  <p>
                    An education company was manually creating customer subscriptions every time an order came in. A team member spent hours every week copying data between three different platforms.
                  </p>
                  <p>
                    We built an automated pipeline that handles the entire workflow: when an order comes in, the subscription is created, the fulfillment system is notified, and the accounting records update.
                  </p>
                </div>
                <div className="bg-paper/5 p-12 rounded-sm border border-paper/20 shadow-xl shadow-paper/5">
                  <p className="text-2xl font-serif italic text-accent mb-6">The result</p>
                  <p className="text-xl text-paper leading-relaxed font-serif">
                    &ldquo;The team member who used to do that work now spends those hours on things that actually grow the business. Mistakes stopped happening, and I stopped worrying if orders were being missed.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Section: Cost Calculator */}
      <section className="py-24 md:py-32 bg-paper border-b border-ink/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <CostCalculator />
          </SectionFade>
        </div>
      </section>

      <ClientLogos />

      {/* Section 5: Testimonials */}
      <section className="py-24 md:py-32 bg-paper border-y border-ink/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="mb-20">
              <h2 className="text-4xl md:text-5xl font-serif text-ink/40 italic">
                What people I&apos;ve worked with say
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {testimonials.map((t, i) => (
                <div key={i} className="flex flex-col">
                  <p className="text-xl font-serif italic mb-8 leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-auto flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border border-ink/10"
                    />
                    <div className="leading-tight">
                      <p className="font-sans font-semibold text-ink">{t.name}</p>
                      <p className="text-sm font-sans text-ink/50">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 bg-ink text-paper">
        <div className="container mx-auto px-4">
          <SectionFade>
            <h2 className="text-4xl md:text-6xl font-serif mb-16 text-center text-paper">
              Common questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {faqItems.map((item, i) => (
                <details key={i} className="group border-b border-paper/10 pb-8 cursor-pointer">
                  <summary className="flex items-center justify-between list-none text-2xl font-serif text-paper">
                    <span>{item.question}</span>
                    <ChevronDown className="w-5 h-5 opacity-40 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-6 text-lg text-paper/70 leading-relaxed max-w-2xl">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* CTA Form */}
      <section id="tell-us" className="py-24 md:py-32 border-t border-ink/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-serif mb-12">
                Ready to stop the copy-paste?
              </h2>
              <div className="flex flex-col items-center gap-8 mb-20">
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-sm bg-accent px-12 py-5 text-xl font-bold text-white transition-all hover:opacity-90 group shadow-lg shadow-accent/20"
                >
                  Book a discovery call
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="w-full h-px bg-ink/5 mb-20" />

              <h3 className="text-2xl md:text-3xl font-serif mb-6">
                Not ready to talk?
              </h3>
              <p className="text-xl text-ink/60 mb-12">
                Answer 4 questions to see where your time is going.
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
