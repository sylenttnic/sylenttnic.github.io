"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Search, Map, Hammer, Handshake } from "lucide-react";
import WizardForm from "@/components/WizardForm";
import Image from "next/image";

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

export default function Services() {
  return (
    <>
      {/* Masthead */}
      <header className="relative min-h-[60vh] flex items-center justify-center text-center text-white overflow-hidden pt-20">
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

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              A Structured Path to Order.
            </h1>
            <h2 className="text-xl md:text-2xl font-light mb-0 max-w-4xl mx-auto opacity-90 leading-relaxed">
              We don't sell open-ended consulting hours that go nowhere. We deliver a specific operational transformation in four clear phases.
            </h2>
          </motion.div>
        </div>
      </header>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative border-l-4 border-gray-200 ml-4 md:ml-12 space-y-16">
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
                <div className="absolute -left-[1.35rem] top-0 bg-white border-4 border-primary rounded-full p-2 text-primary">
                  <phase.icon className="w-6 h-6" />
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-bold mb-4 text-secondary">{phase.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {phase.description}
                  </p>

                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-primary mb-3 text-sm uppercase tracking-wider">The Outcome:</h4>
                    <ul className="space-y-3">
                      {phase.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start text-gray-700">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
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
