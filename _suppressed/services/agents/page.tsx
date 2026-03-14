"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  Code2,
  ShieldCheck,
  Rocket,
  Activity,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import "./agents.css";

const phases = [
  {
    number: 1,
    title: "Discovery",
    color: "blue",
    icon: Search,
    description:
      "We learn how your business works. Which apps you use, where the manual work is, and what data needs to flow between systems. We map everything before we write a single line of code.",
    youSee:
      "A clear summary of your current setup and a plain-language plan for what we are going to build.",
  },
  {
    number: 2,
    title: "Design",
    color: "cyan",
    icon: FileText,
    description:
      "We research the technical details of every system involved and write a detailed blueprint for the integration. Every edge case, error scenario, and data flow is documented before building starts.",
    youSee:
      "A blueprint you can review and approve. We do not start building until you sign off on the plan.",
  },
  {
    number: 3,
    title: "Build and Test",
    color: "purple",
    icon: Code2,
    description:
      "We write the code and then write automated tests to verify it works correctly, including unusual scenarios and error conditions. The code must pass every test before it moves forward.",
    youSee:
      "Nothing yet, and that is intentional. This phase is heads-down engineering with built-in quality checks. You are not reviewing code, but you can ask for a status update at any time.",
  },
  {
    number: 4,
    title: "Security and Quality Review",
    color: "green",
    icon: ShieldCheck,
    description:
      "An independent review checks for data privacy issues, unnecessary permissions, and compliance with our own quality standards. This is not the same person who wrote the code.",
    youSee:
      "Confidence that your customer data is handled properly and that the integration follows security best practices.",
  },
  {
    number: 5,
    title: "Deploy",
    color: "amber",
    icon: Rocket,
    description:
      "The integration is deployed to a staging environment first. We run live validation tests, confirm everything works as expected, and then ask for your approval before going live. Nothing reaches production without your explicit go-ahead.",
    youSee:
      'A working preview you can verify, followed by a clear "ready to go live" conversation. You press the button, not us.',
  },
  {
    number: 6,
    title: "Monitor",
    color: "red",
    icon: Activity,
    description:
      'Once live, every integration is monitored continuously. Failed events are captured and retried automatically. If something needs human attention, we get alerted immediately. This is not a "build it and walk away" process.',
    youSee:
      "Peace of mind. If something breaks, we know before you do. You get a dashboard showing what is running, what succeeded, and what needs attention.",
  },
];

const checkpoints = [
  "Blueprint reviewed and approved by you before any code is written",
  "Automated tests must pass with at least 80% coverage",
  "Independent security and quality audit before deployment",
  "Live validation in a staging environment before production",
  "Human approval required before anything goes live",
  "Continuous monitoring and alerting after launch",
];

export default function BuildProcessPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="build-page-wrap pt-32 md:pt-48">
      {/* HERO */}
      <div className="build-header fade-in">
        <div className="logo-tag">Our Process</div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          How We Build It
        </h1>
        <p className="subtitle">
          Every integration we deliver follows the same structured process. Six
          phases, multiple quality checkpoints, and nothing goes live without
          human approval. Here is what that looks like from your side.
        </p>
      </div>

      {/* PHASE TIMELINE */}
      <div className="timeline">
        {phases.map((phase, i) => {
          const Icon = phase.icon;
          return (
            <div key={phase.number} className="reveal">
              <div className="timeline-item">
                {/* Timeline connector */}
                <div className="timeline-rail">
                  <div className={`timeline-number ${phase.color}`}>
                    {phase.number}
                  </div>
                  {i < phases.length - 1 && (
                    <div className="timeline-connector">
                      <div className={`connector-particle ${phase.color}`} />
                    </div>
                  )}
                </div>

                {/* Phase content */}
                <div className={`phase-card ${phase.color}`}>
                  <div className="phase-header">
                    <div className={`phase-icon-wrap ${phase.color}`}>
                      <Icon className="phase-icon" />
                    </div>
                    <h2 className="phase-title">{phase.title}</h2>
                  </div>
                  <p className="phase-description">{phase.description}</p>
                  <div className="you-see">
                    <span className="you-see-label">What you see</span>
                    <p className="you-see-text">{phase.youSee}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* QUALITY CHECKPOINTS */}
      <div className="reveal">
        <div className="checkpoints-section">
          <div className="checkpoints-header">
            <div className="logo-tag">Quality</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Built-in quality checkpoints
            </h2>
            <p className="subtitle">
              Every integration passes through multiple independent checkpoints
              before it reaches your live systems. These are not optional. They
              are built into our process and cannot be skipped.
            </p>
          </div>
          <div className="checkpoints-grid">
            {checkpoints.map((item, i) => (
              <div key={i} className="checkpoint-item">
                <CheckCircle2 className="checkpoint-icon" />
                <span className="checkpoint-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHAT YOU GET */}
      <div className="reveal">
        <div className="ownership-section">
          <div className="logo-tag">Ownership</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            What you get at the end
          </h2>
          <p className="ownership-text">
            When the build is complete, you own everything: the code, the
            infrastructure, the documentation. You get a plain-language summary
            of what was built, how it works, and how to reach us if anything
            changes. There are no proprietary platforms to be locked into. No
            code held hostage. It is yours.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="reveal">
        <div className="cta-section">
          <Link href="/services#tell-us" className="cta-card group">
            <h3 className="cta-title">
              Ready to talk?
            </h3>
            <p className="cta-text">
              Tell us what is broken and we will show you what a structured build
              process looks like for your business.
            </p>
            <div className="cta-link">
              Tell us what&apos;s broken
              <ArrowRight className="cta-arrow" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
