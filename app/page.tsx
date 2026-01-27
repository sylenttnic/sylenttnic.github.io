import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import WizardForm from "@/components/WizardForm";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import SectionFade from "@/components/ui/SectionFade";
import MastheadContent from "@/components/home/MastheadContent";
import InvisibleDragCards from "@/components/home/InvisibleDragCards";

const testimonials = [
  "Sylentt Partners bring exceptional expertise and efficiency to every project. Their knowledge and skills are unmatched, making them an invaluable partner in fast-paced, high-tech environments. Truly an asset for any organization.",
  "Working with this team has been transformative. They quickly identified inefficiencies in our processes and implemented solutions that revolutionized how we deliver products.",
  "Their ability to standardize deployments, debug issues, and enhance support systems has been invaluable. Their focus on creating and maintaining detailed documentation has improved clarity and collaboration across the board.",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does Sylentt Partners improve team collaboration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We use proprietary AI audits to identify communication silos in your Atlassian ecosystem, then deploy unified workflows to bridge the gap between departments."
      }
    },
    {
      "@type": "Question",
      "name": "Do you only work with IT teams?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. While we are technical experts, our focus is on Organizational Unity. We help Operations, HR, and Sales teams align their processes with IT."
      }
    },
    {
      "@type": "Question",
      "name": "What is the 'Knowledge Refinery'?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is our proprietary process for turning static, messy documentation into active, intelligent agents that answer employee questions instantly."
      }
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Masthead */}
      <header className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          {/* Using picture element for manual responsive images since next/image optimization is disabled in next.config.mjs */}
          <picture>
            <source media="(max-width: 640px)" srcSet="/assets/img/masthead-small.webp" />
            <source media="(max-width: 1024px)" srcSet="/assets/img/masthead-medium.webp" />
            <img
              src="/assets/img/masthead.webp"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              {...{ fetchpriority: "high" }}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-slate-950/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <MastheadContent />
        </div>
        <ScrollIndicator />
      </header>

      {/* Invisible Drag Section */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <SectionFade>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">The Invisible Drag</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                The hidden forces slowing down your organization and draining your resources.
              </p>
            </div>

            <InvisibleDragCards />
          </SectionFade>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-32 bg-slate-900/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">We Turn &quot;Chaos&quot; into a &quot;System of Work.&quot;</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                We don&apos;t just implement Jira and Confluence. We use proprietary AI agents to clean, audit, and activate them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 shadow-xl shadow-black/20 text-primary mb-6 border border-white/5">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Centralized Intake</h3>
                <p className="text-slate-400">One front door for all work. No ticket, no work.</p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 shadow-xl shadow-black/20 text-primary mb-6 border border-white/5">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Single Source of Truth</h3>
                <p className="text-slate-400">Dashboards, not status meetings.</p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 shadow-xl shadow-black/20 text-primary mb-6 border border-white/5">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Automated Audits</h3>
                <p className="text-slate-400">We scan your documentation to find dead links, conflicting rules, and missing scopes.</p>
              </div>
            </div>

            <div className="text-center">
              <a href="/services" className="text-primary hover:text-indigo-400 font-bold text-lg inline-flex items-center group transition-all">
                See our 3-Phase Intelligent Roadmap
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-950">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((text, i) => (
                <div key={i} className="glass-card p-10 rounded-xl italic text-slate-300 leading-relaxed relative">
                  <span className="absolute top-4 left-6 text-6xl text-primary/20 font-serif leading-none">&quot;</span>
                  <p className="relative z-10 pt-4">{text}</p>
                </div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="join" className="py-32 bg-slate-900/50 scroll-mt-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Your Friction Score</h2>
              <p className="text-slate-400">Take the assessment to identify your operational bottlenecks.</p>
            </div>
            <WizardForm />
          </SectionFade>
        </div>
      </section>
    </>
  );
}
