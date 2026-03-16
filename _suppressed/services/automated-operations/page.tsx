import FitAssessment from "@/components/FitAssessment";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import AutomationMasthead from "@/components/services/AutomationMasthead";
import AutomationTimeline from "@/components/services/AutomationTimeline";
import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";

export default function AutomatedOperations() {
  return (
    <>
      {/* Masthead */}
      <header className="relative min-h-[100dvh] flex items-center justify-center text-center text-white overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 z-0">
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

        <div className="relative z-10 container mx-auto px-4">
          <AutomationMasthead />
        </div>
        <ScrollIndicator />
      </header>

      {/* Timeline Section */}
      <section className="py-20 bg-slate-950 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <AutomationTimeline />

          {/* Agent Page Link */}
          <div className="mt-20 pt-16 border-t border-white/5 relative z-10">
            <div className="glass-card p-8 md:p-12 rounded-3xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Bot className="w-48 h-48 text-primary" />
              </div>

              <div className="relative z-10 max-w-2xl">
                <h3 className="text-3xl font-bold text-white mb-4">Want to see our AI agents in action?</h3>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  Take a look under the hood at our 12-step automated assembly line. See exactly how our AI team works together to build, test, and deploy software.
                </p>
                <Link
                  href="/services/automated-operations/agents"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                >
                  <Bot className="w-5 h-5" />
                  View the AI Team Workflow
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="join" className="py-20 bg-slate-900/50 scroll-mt-20 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Calculate Your Operational Burn Rate</h2>
            <p className="text-slate-400">See how much manual work is actually costing you.</p>
          </div>
          <FitAssessment />
        </div>
      </section>
    </>
  );
}
