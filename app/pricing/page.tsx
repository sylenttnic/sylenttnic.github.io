"use client";

import { useState } from "react";
import { Check, ArrowRight, MousePointerClick, MessageSquare, Rocket, Loader2 } from "lucide-react";
import SectionFade from "@/components/ui/SectionFade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const packages = [
  {
    id: "discovery",
    name: "Discovery Call",
    price: "FREE",
    badge: "FREE!",
    description: "A free 30-minute strategy session to discuss your current workflows, audit your app stack, and identify the highest-impact integration opportunities.",
    features: [
      "Discovery call (30 min)",
      "App stack audit overview",
      "Workflow bottleneck identification",
      "No obligation to proceed",
    ],
    cta: "Select Discovery Call",
    footnote: "The perfect starting point for your automation journey.",
    color: "green",
  },
  {
    id: "assessment",
    name: "Integration Assessment",
    price: "$250",
    description: "We audit your current app stack, identify the highest-impact integration opportunity, and deliver a concrete implementation plan. You own the deliverable whether you move forward or not.",
    features: [
      "Discovery call (30 min)",
      "App stack audit and integration mapping",
      "Written implementation plan with scope, timeline, and cost estimate",
      "No obligation to proceed",
    ],
    cta: "Select Assessment",
    footnote: "Assessment fee is credited toward Implementation if you proceed.",
    color: "blue",
  },
  {
    id: "implementation",
    name: "Implementation",
    price: "Starting at $2,500",
    badge: "Most Popular",
    description: "We build the integration. Your apps start talking to each other, manual work goes away, and errors stop. Includes the assessment if you haven't done one yet.",
    features: [
      "Full integration assessment (included, not charged separately)",
      "Custom integration build, tested against your live systems",
      "Deployment to your own infrastructure (you own everything)",
      "30-day post-launch support window",
      "Documentation and runbook for your team",
    ],
    cta: "Select Implementation",
    footnote: "Final cost depends on complexity. We scope it during the assessment, no surprises.",
    color: "purple",
    emphasized: true,
  },
  {
    id: "retainer",
    name: "Operational Retainer",
    price: "Starting at $500/month",
    description: "Your integrations stay healthy without hiring a full-time engineer. We monitor, maintain, and evolve your automations as your business changes.",
    features: [
      "Proactive monitoring and alerting",
      "Incident response and resolution",
      "Monthly change request allowance",
      "Quarterly review and optimization recommendations",
    ],
    cta: "Select Retainer",
    footnote: "The coverage of a dedicated integration engineer at a fraction of the cost.",
    color: "cyan",
  },
];

const howItWorks = [
  {
    icon: MousePointerClick,
    title: "Pick a package",
    description: "Choose what fits. Not sure? Start with the Assessment.",
  },
  {
    icon: MessageSquare,
    title: "Tell us about your setup",
    description: "Fill out the short form below. We'll review and get back to you within one business day.",
  },
  {
    icon: Rocket,
    title: "We get to work",
    description: "No long sales cycles. Once we agree on scope, we start building.",
  },
];

export default function PricingPage() {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollToForm = (packageId: string) => {
    const packageMap: Record<string, string> = {
      discovery: "Discovery Call (FREE)",
      assessment: "Integration Assessment ($250)",
      implementation: "Implementation (starting at $2,500)",
      retainer: "Operational Retainer (starting at $500/mo)",
    };
    setSelectedPackage(packageMap[packageId] || "");
    const formElement = document.getElementById("tell-us");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      firstname: data.name,
      emailAddress: data.email,
      summary: `Pricing Inquiry: ${data.package}`,
    };

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEBSITE_API_KEY || "e5362baf-c777-4d57-a609-6eaf1f9e87f6";

      const response = await fetch("https://hnet.sylentt.com/webhook/submit-ticket", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "website-api-key": apiKey,
        },
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError("Something went wrong. Please try again, or email us directly at nic@sylentt.com.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again, or email us directly at nic@sylentt.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center mb-24">
        <SectionFade>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Simple pricing. <span className="text-gradient">Real results.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Every engagement starts with understanding your business. Pick the package that fits, tell us what you need, and we&apos;ll take it from there.
          </p>
        </SectionFade>
      </section>

      {/* Packages Section */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={cn(
                "neon-card p-8 md:p-10 rounded-2xl flex flex-col transition-all duration-500",
                pkg.color,
                pkg.emphasized ? "lg:scale-105 lg:z-10 bg-slate-900/50 border-primary/50 shadow-[0_0_40px_rgba(99,102,241,0.2)]" : "bg-slate-900/20"
              )}
            >
              {pkg.badge && (
                <div className="mb-4">
                  <span className="lane-badge purple">
                    <span className="badge-text font-bold">{pkg.badge}</span>
                  </span>
                </div>
              )}
              <h2 className="text-2xl font-bold mb-2 text-white">{pkg.name}</h2>
              <div className="text-3xl font-black mb-6 text-white">{pkg.price}</div>
              <p className="text-slate-400 mb-8 flex-grow leading-relaxed">
                {pkg.description}
              </p>

              <div className="space-y-4 mb-10">
                <div className="text-sm font-mono text-primary/70 uppercase tracking-widest mb-4">What&apos;s Included</div>
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Button
                  onClick={() => scrollToForm(pkg.id)}
                  variant={pkg.emphasized ? "primary" : "outline"}
                  className="w-full mb-4 group shadow-lg"
                  size="lg"
                >
                  {pkg.cta}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-xs text-slate-500 italic text-center leading-snug">
                  {pkg.footnote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-900/30 border-y border-white/5 mb-32">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold neon-line-header blue">
                How it works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {howItWorks.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="text-center group">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="tell-us" className="container mx-auto px-4 max-w-4xl scroll-mt-32">
        <SectionFade>
          <div className="lane-body p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Get Started</h2>

            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Request Sent</h3>
                <p className="text-slate-400 text-lg">
                  Thanks! We&apos;ll review your request and get back to you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-300">Name</label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      className="bg-slate-950 border-slate-700 text-white focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-300">Work Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      className="bg-slate-950 border-slate-700 text-white focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-slate-300">Company (Optional)</label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Company Name"
                      className="bg-slate-950 border-slate-700 text-white focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="package" className="text-sm font-medium text-slate-300">Package Interest</label>
                    <select
                      id="package"
                      name="package"
                      required
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      className="flex h-11 w-full rounded-full border-2 border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="" disabled>Select a package</option>
                      <option value="Discovery Call (FREE)">Discovery Call (FREE)</option>
                      <option value="Integration Assessment ($250)">Integration Assessment ($250)</option>
                      <option value="Implementation (starting at $2,500)">Implementation (starting at $2,500)</option>
                      <option value="Operational Retainer (starting at $500/mo)">Operational Retainer (starting at $500/mo)</option>
                      <option value="Not sure yet, help me decide">Not sure yet, help me decide</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="apps" className="text-sm font-medium text-slate-300">What apps do you need connected?</label>
                  <textarea
                    id="apps"
                    name="apps"
                    required
                    rows={3}
                    placeholder="e.g., Shopify and our subscription platform, our CRM and accounting software..."
                    className="w-full bg-slate-950 border-2 border-slate-700 rounded-2xl p-4 text-white text-sm focus:border-primary outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium text-slate-300">Anything else we should know? (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    className="w-full bg-slate-950 border-2 border-slate-700 rounded-2xl p-4 text-white text-sm focus:border-primary outline-none transition-colors"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm text-center">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full shadow-lg shadow-primary/25"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    "Send Request"
                  )}
                </Button>
              </form>
            )}
          </div>
        </SectionFade>
      </section>
    </div>
  );
}
