"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle, HelpCircle, EyeOff } from "lucide-react";
import Image from "next/image";
import WizardForm from "@/components/WizardForm";
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
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
              Stop Running Your Business on Email, Spreadsheets, and "I Think So."
            </h1>
            <h2 className="text-xl md:text-3xl font-light mb-10 max-w-4xl mx-auto opacity-90 leading-relaxed">
              Chaos isn't a strategy. We architect the systems that replace operational noise with clarity, using the tools you probably already own.
            </h2>
            <Button
              size="xl"
              className="rounded-full shadow-2xl shadow-primary/50 animate-pulse-slow"
              onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Your Friction Score
            </Button>
            <p className="mt-6 text-white/60 text-sm md:text-base font-medium">
              Get your score to unlock a free 30-minute discovery call.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Invisible Drag Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">The Invisible Drag</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <ArrowRight className="w-8 h-8 rotate-45" />
              </div>
              <h3 className="text-2xl font-bold mb-3">The Thousand Front Doors</h3>
              <p className="text-gray-600">Requests coming from Slack, email, texts - no central list.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Zombie Projects</h3>
              <p className="text-gray-600">Initiatives that never die but never finish.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <HelpCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Decision Amnesia</h3>
              <p className="text-gray-600">Decisions lost in chat threads, not recorded.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <EyeOff className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">The Visibility Gap</h3>
              <p className="text-gray-600">No real-time view of roadmap vs. reality.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">We Turn "Chaos" into a "System of Work."</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md text-secondary mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Centralized Intake</h3>
              <p className="text-gray-600">One front door for all work. No ticket, no work.</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md text-secondary mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Single Source of Truth</h3>
              <p className="text-gray-600">Dashboards, not status meetings.</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md text-secondary mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Contextual Knowledge</h3>
              <p className="text-gray-600">Decisions and docs live with the work.</p>
            </div>
          </div>

          <div className="text-center">
            <a href="/services" className="text-primary hover:text-primary-hover font-bold text-lg inline-flex items-center group transition-all">
              See our 4-Phase Operational Roadmap
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials (Simplified Carousel/Grid) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {testimonials.map((text, i) => (
               <div key={i} className="bg-gray-50 p-8 rounded-xl shadow-sm italic text-gray-700 leading-relaxed border border-gray-100">
                 "{text}"
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="join" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Your Friction Score</h2>
          </div>
          <WizardForm />
        </div>
      </section>
    </>
  );
}
