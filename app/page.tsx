"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle, HelpCircle, EyeOff } from "lucide-react";
import Image from "next/image";
import WizardForm from "@/components/WizardForm";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { Button } from "@/components/ui/button";

const testimonials = [
  "Sylentt Partners bring exceptional expertise and efficiency to every project. Their knowledge and skills are unmatched, making them an invaluable partner in fast-paced, high-tech environments. Truly an asset for any organization.",
  "Working with this team has been transformative. They quickly identified inefficiencies in our processes and implemented solutions that revolutionized how we deliver products.",
  "Their ability to standardize deployments, debug issues, and enhance support systems has been invaluable. Their focus on creating and maintaining detailed documentation has improved clarity and collaboration across the board.",
];

export default function Home() {
  return (
    <>
      {/* Masthead */}
      <header className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/img/masthead.webp"
            alt="Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-slate-950/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-sm">
              Stop Running Your Business on Email, Spreadsheets, and "I Think So."
            </h1>
            <h2 className="text-xl md:text-3xl font-light mb-10 max-w-4xl mx-auto text-slate-300 leading-relaxed">
              Chaos isn't a strategy. We architect the systems that replace operational noise with clarity, using the tools you probably already own.
            </h2>
            <Button
              size="xl"
              className="rounded-full bg-primary hover:bg-primary-hover text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] animate-pulse-slow border border-white/10"
              onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Your Friction Score
            </Button>
            <p className="mt-6 text-slate-400 text-sm md:text-base font-medium">
              Get your score to unlock a free 30-minute discovery call.
            </p>
          </motion.div>
        </div>
        <ScrollIndicator />
      </header>

      {/* Invisible Drag Section */}
      <section id="about" className="py-32 bg-slate-950 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Invisible Drag</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              The hidden forces slowing down your organization and draining your resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl glass-card text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-primary mb-6 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                <ArrowRight className="w-8 h-8 rotate-45" />
              </div>
              <h3 className="text-2xl font-bold mb-3">The Thousand Front Doors</h3>
              <p className="text-slate-400">Requests coming from Slack, email, texts - no central list.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl glass-card text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-primary mb-6 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Zombie Projects</h3>
              <p className="text-slate-400">Initiatives that never die but never finish.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl glass-card text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-primary mb-6 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                <HelpCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Decision Amnesia</h3>
              <p className="text-slate-400">Decisions lost in chat threads, not recorded.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl glass-card text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-primary mb-6 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                <EyeOff className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">The Visibility Gap</h3>
              <p className="text-slate-400">No real-time view of roadmap vs. reality.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-32 bg-slate-900/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">We Turn "Chaos" into a "System of Work."</h2>
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
              <h3 className="text-2xl font-bold mb-3 text-white">Contextual Knowledge</h3>
              <p className="text-slate-400">Decisions and docs live with the work.</p>
            </div>
          </div>

          <div className="text-center">
            <a href="/services" className="text-primary hover:text-indigo-400 font-bold text-lg inline-flex items-center group transition-all">
              See our 4-Phase Operational Roadmap
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-950">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {testimonials.map((text, i) => (
               <div key={i} className="glass-card p-10 rounded-xl italic text-slate-300 leading-relaxed relative">
                 <span className="absolute top-4 left-6 text-6xl text-primary/20 font-serif leading-none">"</span>
                 <p className="relative z-10 pt-4">{text}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="join" className="py-32 bg-slate-900/50 scroll-mt-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Your Friction Score</h2>
            <p className="text-slate-400">Take the assessment to identify your operational bottlenecks.</p>
          </div>
          <WizardForm />
        </div>
      </section>
    </>
  );
}
