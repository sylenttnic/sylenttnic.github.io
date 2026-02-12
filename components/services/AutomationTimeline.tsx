"use client";

import { motion } from "framer-motion";
import { Search, Map, Network, BookOpen } from "lucide-react";

const phases = [
  {
    icon: Search,
    title: "Phase 1: The Audit (Discovery)",
    problem: "Data is trapped in silos. Humans are acting as \"copy-paste robots,\" moving information from one app to another manually.",
    solution: "We identify every manual touchpoint in your operations. We find the hidden inefficiencies where your team is losing hours to repetitive tasks.",
  },
  {
    icon: Map,
    title: "Phase 2: The Blueprint (Logic Design)",
    problem: "Automating a bad process just makes bad results faster. Jumping into code without a plan leads to fragile systems.",
    solution: "We map the perfect flow before writing a single line of logic. We design a visual architecture that ensures scalability and error handling.",
  },
  {
    icon: Network,
    title: "Phase 3: The Build (Integration)",
    problem: "Your apps (CRM, Email, PM tools) don't talk to each other. Information is lost in translation or requires manual updates.",
    solution: "We connect your disparate apps into a unified nervous system. We build robust integrations using n8n that handle errors and edge cases automatically.",
  },
  {
    icon: BookOpen,
    title: "Phase 4: The Handoff (Independence)",
    problem: "You don't want to be dependent on an external agency forever. \"Black box\" solutions leave you helpless when things change.",
    solution: "We hand over a documented, visual system that you own. We provide training and documentation so your team can manage and evolve the automation.",
  },
];

export default function AutomationTimeline() {
  return (
    <div className="relative border-l-4 border-white/10 ml-4 md:ml-12 space-y-16">
      {phases.map((phase, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative pl-12 md:pl-16"
        >
          {/* Icon */}
          <div className="absolute -left-[1.35rem] top-0 bg-slate-900 border-4 border-primary rounded-full p-2 text-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <phase.icon className="w-6 h-6" />
          </div>

          <div className="glass-card p-8 rounded-2xl group hover:bg-slate-900/80 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-primary transition-colors">{phase.title}</h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-300 mb-2 text-sm uppercase tracking-wider">The Problem:</h4>
                <p className="text-slate-400 leading-relaxed text-lg">
                  {phase.problem}
                </p>
              </div>

              <div className="bg-slate-950/50 p-6 rounded-xl border border-white/5">
                <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-wider">Our Solution:</h4>
                <p className="text-slate-300 leading-relaxed">
                  {phase.solution}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
