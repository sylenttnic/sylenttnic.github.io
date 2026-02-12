"use client";

import { motion } from "framer-motion";
import { Stethoscope, Hammer, Users } from "lucide-react";

const phases = [
  {
    icon: Stethoscope,
    title: "Step 1: The Silo Detective (Audit)",
    problem: "Departments (HR, Sales, Tech) are working in disconnected bubbles. Information is trapped in private chats or lost files.",
    solution: "We scan your entire ecosystem (Jira, Confluence, Slack) to map how your teams actually communicate versus how they should communicate. We identify the bottlenecks blocking collaboration.",
  },
  {
    icon: Hammer,
    title: "Step 2: Workflow Harmonization (Refinery)",
    problem: "\"Why is this process so hard?\" Friction creates burnout. Inconsistent processes confuse employees and slow down delivery.",
    solution: "We use AI to standardize your workflows. We turn messy, ad-hoc procedures into streamlined, automated pathways that guide your teams effortlessly from \"To-Do\" to \"Done.\"",
  },
  {
    icon: Users,
    title: "Step 3: The Unified Knowledge Base (Activation)",
    problem: "\"I didn't know we had a policy for that.\"",
    solution: "We create a single source of truth. We deploy intelligent agents that bridge the gap between teams, allowing a Salesperson to get an answer from Engineering instantly, without chasing people down.",
  },
];

export default function ProcessTimeline() {
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
