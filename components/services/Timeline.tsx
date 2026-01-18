"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Search, Map, Hammer, Handshake } from "lucide-react";

const phases = [
  {
    icon: Search,
    title: "Phase 1: The Diagnosis",
    description: "You can’t fix what you can’t see. We perform a 360-Degree Health Check of your current tools and processes. We look for the Shadow IT and hidden bottlenecks that are slowing you down.",
    outcomes: [
      "A clear Red/Yellow/Green scorecard of your operational health.",
      "A Friction Report identifying where your team is wasting time.",
      "A prioritized roadmap to fix the issues.",
    ],
  },
  {
    icon: Map,
    title: "Phase 2: The Blueprint",
    description: "Software fails when it doesn't match the way you work. Before we touch a single configuration, we design your workflow. We map exactly how work should flow from Idea to Done, defining who approves what and where decisions are logged.",
    outcomes: [
      "Visual process maps that clarify ownership and responsibility.",
      "A Service Catalog design that organizes how departments request work from each other.",
      "Governance policies to prevent your systems from becoming a Wild West again.",
    ],
  },
  {
    icon: Hammer,
    title: "Phase 3: The Build",
    description: "This is where we turn the blueprint into reality. Specializing in Jira, Confluence, and Jira Service Management, we configure your environment to enforce your business rules. We ensure the tools work for you, not against you.",
    outcomes: [
      "Automated Workflows: The system chases the approvals and sends the reminders so you don't have to.",
      "Clean Data: Custom forms that ensure you get the right information every time.",
      "Connected Tools: We integrate your ecosystem so data flows automatically between teams without copy-pasting.",
    ],
  },
  {
    icon: Handshake,
    title: "Phase 4: The Handoff",
    description: "The best system in the world fails if your team doesn't use it. We don't just hand over the keys and leave; we ensure your team is trained, comfortable, and self-sufficient.",
    outcomes: [
      "Role-based training for everyday users and internal admins.",
      "Custom How-To video libraries and guides tailored to your specific workflows.",
      "A Champions plan to keep the system healthy long after we are gone.",
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
