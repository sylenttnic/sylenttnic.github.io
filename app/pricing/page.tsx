"use client";

import { useState } from "react";
import { Check, ArrowRight, MousePointerClick, MessageSquare, Rocket, Loader2 } from "lucide-react";
import SectionFade from "@/components/ui/SectionFade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const packages = [
  {
    id: "discovery",
    name: "Discovery Call",
    price: "$0",
    description: "A 30-minute strategy session to discuss your current workflows, audit your app stack, and identify the highest-impact integration opportunities.",
    features: [
      "Discovery call (30 min)",
      "App stack audit and integration mapping",
      "Workflow bottleneck identification",
      "No obligation to proceed",
    ],
    cta: "Select Discovery Call",
    footnote: "The perfect starting point for your automation journey.",
  },
  {
    id: "implementation",
    name: "Implementation",
    price: "Starting at $2,500",
    description: "We build the integration. Your apps start talking to each other, manual work goes away, and errors stop.",
    features: [
      "Full integration assessment and implementation plan",
      "Custom integration build, tested against your live systems",
      "Deployment to your own infrastructure (you own everything)",
      "30-day post-launch support window",
      "Documentation and runbook for your team",
    ],
    cta: "Select Implementation",
    footnote: "Final cost depends on complexity. We scope it during the assessment, no surprises.",
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
  },
];

const howItWorks = [
  {
    icon: MousePointerClick,
    title: "Pick a package",
    description: "Choose what fits. Not sure? Start with the Discovery Call.",
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
      discovery: "Discovery Call",
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
      summary: `Pricing Inquiry: ${data.package}`,
    };

    try {
      const apiKey = process.env.NEXT_PUBLIC_INTAKE_API_KEY;

      if (!apiKey) {
        console.error("Form configuration error: NEXT_PUBLIC_INTAKE_API_KEY is missing.");
        setError("Form configuration error. Please try again later.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("https://intake.sylentt.com/", {
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
      console.error("Submission failed:", err);
      setError("Something went wrong. Please try again, or email us directly at nic@sylentt.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-paper text-ink selection:bg-accent/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center pt-32 pb-24">
        <SectionFade>
          <h1 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
            Simple pricing. Real results.
          </h1>
          <p className="text-xl md:text-2xl text-ink/60 max-w-3xl mx-auto leading-relaxed font-sans">
            Every engagement starts with understanding your business. Pick the package that fits, tell us what you need, and we&apos;ll take it from there.
          </p>
        </SectionFade>
      </section>

      {/* Packages Section */}
      <section className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-surface border border-ink/10 p-8 md:p-12 rounded-sm flex flex-col transition-all duration-300 hover:border-ink/20 ${
                pkg.emphasized ? "border-accent/30 shadow-sm" : ""
              }`}
            >
              <h2 className="text-2xl font-serif mb-2">{pkg.name}</h2>
              <div className="text-3xl font-serif mb-8 text-accent">{pkg.price}</div>
              <p className="text-ink/70 mb-12 flex-grow leading-relaxed text-lg">
                {pkg.description}
              </p>

              <div className="space-y-6 mb-12">
                <div className="text-xs font-sans uppercase tracking-[0.2em] text-ink/40">What&apos;s Included</div>
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-accent mr-4 shrink-0 mt-0.5" />
                    <span className="text-ink/80 text-base leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Button
                  onClick={() => scrollToForm(pkg.id)}
                  variant={pkg.emphasized ? "primary" : "outline"}
                  className={`w-full py-6 text-lg group ${pkg.emphasized ? 'bg-accent hover:opacity-90' : 'border-ink/20 hover:bg-ink/5'}`}
                >
                  {pkg.cta}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="mt-6 text-sm text-ink/50 italic text-center leading-relaxed">
                  {pkg.footnote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-surface border-y border-ink/5 mb-32">
        <div className="container mx-auto px-4">
          <SectionFade>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif">
                How it works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
              {howItWorks.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="text-center group">
                    <div className="w-16 h-16 rounded-full bg-paper border border-ink/10 flex items-center justify-center mx-auto mb-8 transition-colors group-hover:border-accent/20">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-serif mb-4">{step.title}</h3>
                    <p className="text-ink/60 leading-relaxed text-lg">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="tell-us" className="container mx-auto px-4 max-w-4xl pb-32 scroll-mt-32">
        <SectionFade>
          <div className="bg-surface border border-ink/10 p-8 md:p-16 rounded-sm">
            <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">Get Started</h2>

            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Check className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-serif mb-4">Request Sent</h3>
                <p className="text-ink/60 text-lg">
                  Thanks! We&apos;ll review your request and get back to you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="name" className="text-sm font-sans uppercase tracking-widest text-ink/60">Name</label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      className="bg-paper border-ink/10 text-ink focus:border-accent h-12"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="email" className="text-sm font-sans uppercase tracking-widest text-ink/60">Work Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      className="bg-paper border-ink/10 text-ink focus:border-accent h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="company" className="text-sm font-sans uppercase tracking-widest text-ink/60">Company (Optional)</label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Company Name"
                      className="bg-paper border-ink/10 text-ink focus:border-accent h-12"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="package" className="text-sm font-sans uppercase tracking-widest text-ink/60">Package Interest</label>
                    <select
                      id="package"
                      name="package"
                      required
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      className="flex h-12 w-full rounded-sm border border-ink/10 bg-paper px-4 py-2 text-base text-ink focus:border-accent focus:outline-none transition-colors"
                    >
                      <option value="" disabled>Select a package</option>
                      <option value="Discovery Call">Discovery Call</option>
                      <option value="Implementation (starting at $2,500)">Implementation (starting at $2,500)</option>
                      <option value="Operational Retainer (starting at $500/mo)">Operational Retainer (starting at $500/mo)</option>
                      <option value="Not sure yet, help me decide">Not sure yet, help me decide</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="apps" className="text-sm font-sans uppercase tracking-widest text-ink/60">What apps do you need connected?</label>
                  <textarea
                    id="apps"
                    name="apps"
                    required
                    rows={4}
                    placeholder="e.g., Shopify and our subscription platform, our CRM and accounting software..."
                    className="w-full bg-paper border border-ink/10 rounded-sm p-4 text-ink text-base focus:border-accent outline-none transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="notes" className="text-sm font-sans uppercase tracking-widest text-ink/60">Anything else we should know? (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    className="w-full bg-paper border border-ink/10 rounded-sm p-4 text-ink text-base focus:border-accent outline-none transition-colors"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-sm text-sm border border-red-100">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg bg-accent hover:opacity-90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
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
