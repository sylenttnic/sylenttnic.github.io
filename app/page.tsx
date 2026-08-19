import { ArrowRight, RefreshCw, AlertTriangle, Plug, RotateCcw, ChevronDown } from "lucide-react";
import FitAssessment from "@/components/FitAssessment";
import HeroChatInput from "@/components/home/HeroChatInput";
import SectionFade from "@/components/ui/SectionFade";
import ClientLogos from "@/components/home/ClientLogos";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sylentt Partners | Business App Integration for Small Businesses",
  description:
    "Sylentt Partners connects your business apps so your team stops copying data between them. Custom integrations you own. Based in Cache Valley, Utah.",
  openGraph: {
    title: "Sylentt Partners | Run your business, not your software.",
    description:
      "Sylentt Partners connects your business apps so your team stops copying data between them. Custom integrations you own. Based in Cache Valley, Utah.",
    url: "https://sylentt.com/",
    images: [{ url: "/logo_full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sylentt Partners | Run your business, not your software.",
    description:
      "Sylentt Partners connects your business apps so your team stops copying data between them. Custom integrations you own. Based in Cache Valley, Utah.",
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
      "An order comes in, someone retypes it into the shipping app. A payment clears, someone updates the books. We make your tools talk to each other, so these updates happen automatically.",
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
      "Rented tools charge you more as you grow and can fail without ever alerting you that there's a problem. What we build, you own. It runs on your account, and it automatically resolves errors when they occur.",
  },
  {
    icon: Plug,
    title: "You added a new tool and now nothing connects.",
    description:
      "Every new app becomes another island your team bridges by hand. We connect it to all your other tools so it fits in from day one.",
  },
];

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": "https://sylentt.com/#organization",
  name: "Sylentt Partners",
  alternateName: ["Sylentt LLC", "Sylentt"],
  description:
    "Business app integration and workflow automation for small businesses. We build custom connections between your tools so your team stops being the copy-paste layer.",
  url: "https://sylentt.com",
  logo: "https://sylentt.com/logo-symbol.png",
  image: "https://sylentt.com/logo_full.png",
  email: "contact@sylentt.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "40 W Cache Valley Blvd",
    addressLocality: "Logan",
    addressRegion: "UT",
    postalCode: "84341",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.7583,
    longitude: -111.8341,
  },
  areaServed: [
    { "@type": "Place", name: "Cache Valley, Utah" },
    { "@type": "Country", name: "United States" },
  ],
  sameAs: [
    "https://www.google.com/maps?cid=10860538682886367500",
    "https://www.linkedin.com/company/sylentt-partners/",
    "https://www.instagram.com/sylenttpartners/",
    "https://www.facebook.com/sylenttpartners/"
  ],
  customer: [
    { "@type": "Organization", name: "By Light", url: "https://bylight.com/" },
    { "@type": "Organization", name: "edZOOcation", url: "https://edzoocation.com/" }
  ],
  knowsAbout: [
    "Software Integration",
    "API Development",
    "Workflow Automation",
    "Shopify Integration",
    "QuickBooks Automation",
    "Stripe Sync",
    "HubSpot Integration",
    "Zapier Alternatives"
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
        text: "Most automation tools are rentals. You pay monthly, the price goes up as volume grows, and if something breaks at midnight nobody knows until a customer complains. What we build, you own. It runs on your own account. You pay your cloud provider directly for usage with no platform markup, and failures trigger real-time alerts instead of sitting in a log nobody checks.",
      },
    },
    {
      "@type": "Question",
      name: "What apps can you connect?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your business runs on it and it has an API, we can connect it. Common systems include Shopify, QuickBooks, Stripe, Square, HubSpot, Xero, Salesforce, Jobber, ShipStation, and more. If your app is not on that list, just ask. We have probably connected something like it before.",
      },
    },
    {
      "@type": "Question",
      name: "Do I own everything you build?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The integrations run on your cloud account. The code is yours. If we part ways, everything keeps running. There is no lock-in and no proprietary platform you lose access to.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical integration take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most initial integrations are live in 2 to 4 weeks. We start with the single most painful manual process in your business so you see immediate relief while we build out the rest of your integration map.",
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

      {/* Hero + Diagram */}
      <header className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.02] mb-8 text-balance">
              Run your business, not your software.
            </h1>
            <p className="text-xl md:text-2xl text-ink/80 max-w-2xl mx-auto mb-12 font-sans leading-relaxed text-pretty">
              We connect the tools you already use, so your team stops copying and pasting data between them.
            </p>

            {/* Moved CTAs above hero graphic */}
            <div className="flex flex-col items-center justify-center gap-12 mb-16">
              <a
                href="https://calendly.com/nic-sylentt/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta px-10 py-5 text-xl group"
              >
                Book a free discovery call
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="w-full max-w-xl opacity-90 hover:opacity-100 transition-opacity">
                <p className="eyebrow text-center text-ink/60 mb-4">Or ask a quick question</p>
                <HeroChatInput />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Problem Statements */}
      <section className="py-24 md:py-32 bg-ink text-paper">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="mb-16">
              <h2 className="font-display text-4xl md:text-6xl mb-6 text-paper text-balance">
                Here is where your team&apos;s hours go.
              </h2>
              <p className="text-xl text-paper/70 max-w-2xl leading-relaxed text-pretty">
                Most small businesses use different software tools for scheduling, billing, and tracking customers, but those tools don&apos;t connect. This forces your staff to spend hours manually typing the same information into multiple systems.
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

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-surface text-ink overflow-hidden border-y border-ink/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <div>
                <h2 className="font-display text-4xl md:text-6xl mb-12 text-ink">
                  How it works
                </h2>
                <div className="space-y-16">
                  <div className="flex gap-8 group">
                    <span className="font-display text-5xl text-accent">01</span>
                    <div>
                      <h3 className="text-2xl font-serif mb-4 text-ink">Tell us what&apos;s broken</h3>
                      <p className="text-lg text-ink/90 leading-relaxed">
                        Which apps does your business use? Where is the manual work? This conversation is the basis for us to build a detailed blueprint for the integration.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-8 group">
                    <span className="font-display text-5xl text-accent">02</span>
                    <div>
                      <h3 className="text-2xl font-serif mb-4 text-ink">Sylentt Partners builds the connections</h3>
                      <p className="text-lg text-ink/90 leading-relaxed">
                        Sylentt Partners writes the code, puts it through a rigorous testing process, and then deploys it. Now when something happens in one app, the other tools update automatically.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-8 group">
                    <span className="font-display text-5xl text-accent">03</span>
                    <div>
                      <h3 className="text-2xl font-serif mb-4 text-ink">You own everything</h3>
                      <p className="text-lg text-ink/90 leading-relaxed">
                        Your integration is self-hosted and runs on your own cloud account. If we part ways, you keep all of it.
                      </p>
                    </div>
                  </div>
                </div>

                {/* New CTA button */}
                <div className="mt-16">
                  <Link
                    href="#tell-us"
                    className="btn-cta px-10 py-4 text-lg group"
                  >
                    Tell us what&apos;s broken
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="aspect-square bg-surface border border-ink/10 rounded-2xl flex items-center justify-center p-12 shadow-soft">
                   <p className="font-display text-4xl md:text-5xl text-center text-ink leading-[1.2] text-balance">
                     &ldquo;The goal is to stop thinking about data entry and start thinking about your business.&rdquo;
                   </p>
                </div>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Real Example */}
      <section className="py-12 md:py-20 bg-paper text-ink">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-4xl md:text-6xl mb-12 text-ink text-balance">
                What this looks like in practice
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="text-lg text-ink/90 space-y-8 leading-relaxed">
                  <div className="space-y-4">
                    <p className="eyebrow text-accent">Real Results</p>
                  </div>
                  <p>
                    An education company was manually creating customer subscriptions every time an order came in. A team member spent hours every week copying data between three different platforms.
                  </p>
                  <p>
                    We built an automated pipeline that handles the entire workflow: when an order comes in, the subscription is created, the fulfillment system is notified, and the accounting records update.
                  </p>
                </div>
                <div className="bg-surface p-10 md:p-12 rounded-2xl border border-ink/10 shadow-soft">
                  <p className="text-2xl font-sans font-bold text-accent mb-6">The result: Getting back nearly 8 hours per week</p>
                  <p className="font-display text-xl md:text-2xl text-ink leading-relaxed">
                    &ldquo;The team member who used to do that work now spends those hours on things that actually grow the business. Mistakes stopped happening, and I stopped worrying if orders were being missed.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Cost Calculator removed from homepage */}

      <ClientLogos />

      <section id="about" className="py-24 md:py-32 bg-surface border-y border-ink/5 scroll-mt-24">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[auto,1fr] gap-12 md:gap-16 items-center">
              <img
                src="/about/nic.jpg"
                alt="Nic Aslett, founder of Sylentt Partners"
                width={224}
                height={224}
                loading="lazy"
                decoding="async"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-xl mx-auto"
              />
              <div>
                <h2 className="font-display text-4xl md:text-6xl mb-6">Hi, I&apos;m Nic.</h2>
                <div className="space-y-5 text-lg text-ink/90 leading-relaxed">
                  <p>
                    For 15 years, I&apos;ve worked as an engineer building systems behind the scenes: automation scripts, resilient infrastructure, and the connections that keep everything talking. I didn&apos;t manage tools from a distance. I built them, so I know exactly what breaks and why.
                  </p>
                  <p>
                    Somewhere along the way I became the person who untangles messy processes and gets disconnected apps working together. I saw a need for this in the small business world, and that&apos;s why I decided to launch my own business, Sylentt Partners. We work behind the scenes to make things easier for your business (like a silent partner). When you work with us, you work directly with me: a real engineer who has done this for years.
                  </p>
                  <p>
                    I run Sylentt Partners from Cache Valley, Utah. If you are local, I&apos;d love to learn more about your business and how I can save your team time!
                  </p>
                </div>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-ink text-paper border-y border-paper/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="mb-16">
              <h2 className="font-display text-4xl md:text-6xl text-paper text-balance">
                What people I&apos;ve worked with say
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {testimonials.map((t, i) => (
                <div key={i} className="flex flex-col">
                  <p className="font-display text-xl md:text-2xl mb-8 leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-auto flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-12 rounded-full object-cover border border-paper/10"
                    />
                    <div className="leading-tight">
                      <p className="font-sans font-semibold text-paper">{t.name}</p>
                      <p className="text-sm font-sans text-paper/50">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 bg-paper text-ink border-t border-ink/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <h2 className="font-display text-4xl md:text-6xl mb-12 text-center text-ink">
              Common questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {faqItems.map((item, i) => (
                <details key={i} className="group border-b border-ink/10 pb-8 cursor-pointer">
                  <summary className="flex items-center justify-between list-none text-2xl font-serif text-ink">
                    <span>{item.question}</span>
                    <ChevronDown className="w-5 h-5 opacity-40 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-6 text-lg text-ink/90 leading-relaxed max-w-2xl">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* CTA Form */}
      <section id="tell-us" className="py-24 md:py-32 bg-ink text-paper scroll-mt-24">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-display text-4xl md:text-6xl mb-12 text-paper text-balance">
                Ready to stop the copy-paste?
              </h2>
              <div className="flex flex-col items-center gap-8 mb-16">
                <a
                  href="https://calendly.com/nic-sylentt/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta px-10 py-5 text-xl group"
                >
                  Book a free discovery call
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="w-full h-px bg-ink/5 mb-20" />

              <h3 className="font-display text-2xl md:text-3xl mb-6">
                Not ready to talk?
              </h3>
              <p className="text-xl text-paper/60 mb-12">
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
