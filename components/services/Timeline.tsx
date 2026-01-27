"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ScanSearch, Sparkles, Bot } from "lucide-react";

const phases = [
  {
    icon: ScanSearch,
    title: "Step 1: The Intelligent Audit (Discovery)",
    description: "Instead of manual interviews, we start by scanning your public and private documentation.",
    outcomes: [
      "We instantly identify dead links, conflicting rules, and 'dark data' before we even start the project.",
    ],
  },
  {
    icon: Sparkles,
    title: "Step 2: The Refinery (Clean Up)",
    description: "We use automated agents to map legacy systems to modern standards.",
    outcomes: [
      "We fix the mess in your Jira/Confluence instance automatically, turning unstructured data into clean, usable knowledge.",
    ],
  },
  {
    icon: Bot,
    title: "Step 3: Implementation & Activation",
    description: "We deploy your customized Atlassian environment.",
    outcomes: [
      "We don't just leave you with static pages; we deliver secure, internal \"Expert Agents\" that your team can chat with to get answers instantly.",
    ],
  },
];

export default function Timeline() {
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
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{phase.title}</h3>
            <p className="text-slate-400 mb-6 leading-relaxed text-lg">
              {phase.description}
            </p>

            <div className="bg-slate-950/50 p-6 rounded-xl border border-white/5">
              <h4 className="font-bold text-primary mb-3 text-sm uppercase tracking-wider">The Outcome:</h4>
              <ul className="space-y-3">
                {phase.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
