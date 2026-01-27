"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Stethoscope, Map, Hammer, Users } from "lucide-react";

const phases = [
  {
    icon: Stethoscope,
    title: "Phase 1: The Diagnosis",
    description: "You can’t fix what you can’t see. We perform a 360-Degree Health Check of your current tools and processes, combining human insight with AI analysis to identify bottlenecks and 'dark data'.",
    outcomes: [
      "Friction Report identifying wasted time.",
      "Prioritized roadmap to fix the issues.",
    ],
  },
  {
    icon: Map,
    title: "Phase 2: The Blueprint",
    description: "Software fails when it doesn't match the way you work. We collaborate with your team to design workflows that map exactly how work flows from Idea to Done.",
    outcomes: [
      "Visual process maps clarifying ownership.",
      "Governance policies to prevent system chaos.",
    ],
  },
  {
    icon: Hammer,
    title: "Phase 3: The Build",
    description: "We turn the blueprint into reality. We configure your environment to enforce your business rules, using our custom RAG models to expedite data cleaning and migration.",
    outcomes: [
      "Automated workflows that chase approvals.",
      "Clean, structured data from legacy chaos.",
    ],
  },
  {
    icon: Users,
    title: "Phase 4: The Handoff",
    description: "We ensure your team is self-sufficient. We deliver comprehensive training and secure 'Expert Agents' that your team can chat with for instant support.",
    outcomes: [
      "Role-based training for your team.",
      "Custom AI assistants for ongoing support.",
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
