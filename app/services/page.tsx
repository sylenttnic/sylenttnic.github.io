import Link from "next/link";
import { ArrowRight, Layers, Zap } from "lucide-react";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function ServicesHub() {
  return (
    <>
      {/* Masthead */}
      <header className="relative min-h-[60dvh] flex items-center justify-center text-center text-white overflow-hidden pt-20 pb-20">
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

        <div className="relative z-10 container mx-auto px-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Two Pillars of Operational Excellence.
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light">
            We structure your chaos, then we automate your success. Choose your path.
          </p>
        </div>
      </header>

      {/* Services Selection */}
      <section className="py-20 bg-slate-950 relative -mt-20 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* Process Ecosystems Card */}
            <Link href="/services/process-ecosystems" className="group relative block h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full bg-slate-900/80 border border-white/10 p-10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col">
                <div className="mb-6 w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center border border-white/5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Layers className="w-8 h-8 text-indigo-400 group-hover:text-white" />
                </div>

                <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">Process Ecosystems</h2>
                <p className="text-slate-400 mb-8 text-lg flex-grow">
                  Build the foundation. Gain clarity, structure your knowledge, and align your teams with Atlassian ecosystems.
                </p>

                <div className="flex items-center text-primary font-bold mt-auto group-hover:translate-x-2 transition-transform">
                  Explore Ecosystems <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              </div>
            </Link>

            {/* Automated Operations Card */}
            <Link href="/services/automated-operations" className="group relative block h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full bg-slate-900/80 border border-white/10 p-10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col">
                <div className="mb-6 w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center border border-white/5 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Zap className="w-8 h-8 text-blue-400 group-hover:text-white" />
                </div>

                <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">Automated Operations</h2>
                <p className="text-slate-400 mb-8 text-lg flex-grow">
                  Scale without hiring. Eliminate manual error and increase velocity with n8n workflow automation.
                </p>

                <div className="flex items-center text-blue-400 font-bold mt-auto group-hover:translate-x-2 transition-transform">
                  Explore Automation <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </>
  );
}
