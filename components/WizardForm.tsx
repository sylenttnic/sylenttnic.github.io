"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

// Types
type Option = {
  text: string;
  value: string;
  score: number;
};

type Question = {
  id: string;
  question: string;
  options: Option[];
};

type QuizAnswers = Record<string, string>;

type LeadData = {
  leadName: string;
  leadEmail: string;
  leadJobTitle: string;
  leadCompany: string;
};

// Quiz Data from legacy scripts.js
const questions: Question[] = [
  {
    id: "intakeMethod",
    question: "How does new work typically enter your team’s workflow?",
    options: [
      { text: "Requests come from everywhere (Slack, Email, Hallway) - it's chaos.", value: "CHAOS", score: 0 },
      { text: "We have a form, but people often ignore it.", value: "IGNORED_FORM", score: 5 },
      { text: "Strict policy: No ticket, no work.", value: "STRICT_POLICY", score: 10 },
    ],
  },
  {
    id: "visibilityStatus",
    question: "If you needed to know the status of a critical project right now, how would you find it?",
    options: [
      { text: "I'd have to ask someone.", value: "ASK_SOMEONE", score: 0 },
      { text: "I'd check a spreadsheet (that might be outdated).", value: "SPREADSHEET", score: 5 },
      { text: "I'd check a real-time dashboard.", value: "DASHBOARD", score: 10 },
    ],
  },
  {
    id: "decisionRecording",
    question: "When a major decision is made, where is it recorded?",
    options: [
      { text: "Memory or Chat threads.", value: "MEMORY", score: 0 },
      { text: "Meeting Minutes.", value: "MINUTES", score: 5 },
      { text: "A System of Record (linked to the work).", value: "SYSTEM", score: 10 },
    ],
  },
  {
    id: "searchTimePerWeek",
    question: "How much time does your team spend looking for info vs. doing work?",
    options: [
      { text: "10+ hours/week", value: "HIGH", score: 0 },
      { text: "2-5 hours/week", value: "MEDIUM", score: 5 },
      { text: "Very little (info is contextual).", value: "LOW", score: 10 },
    ],
  },
  {
    id: "contextSwitchFreq",
    question: "How often do you manually copy-paste data between tools?",
    options: [
      { text: "Constantly", value: "HIGH", score: 0 },
      { text: "Monthly/Weekly reporting", value: "MEDIUM", score: 5 },
      { text: "Never (It's automated)", value: "NONE", score: 10 },
    ],
  },
  {
    id: "zombieProjectStatus",
    question: "Do you have projects that consume resources but never finish?",
    options: [
      { text: "Yes, too many.", value: "YES", score: 0 },
      { text: "Sometimes.", value: "SOMETIMES", score: 5 },
      { text: "No, we kill bad projects fast.", value: "NO", score: 10 },
    ],
  },
  {
    id: "onboardingSpeed",
    question: "How easy is it for a new hire to understand project history?",
    options: [
      { text: "Impossible (Oral history only).", value: "IMPOSSIBLE", score: 0 },
      { text: "Difficult (They need to read tons of docs).", value: "DIFFICULT", score: 5 },
      { text: "Easy (History lives with the work).", value: "EASY", score: 10 },
    ],
  },
  {
    id: "toolUnification",
    question: "Does every department use a different tool to track work?",
    options: [
      { text: "Yes, we are siloed.", value: "SILOED", score: 0 },
      { text: "Mixed usage.", value: "MIXED", score: 5 },
      { text: "No, we have a Unified System.", value: "UNIFIED", score: 10 },
    ],
  },
];

export default function WizardForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [totalScore, setTotalScore] = useState(0);
  const [leadData, setLeadData] = useState<LeadData>({
    leadName: "",
    leadEmail: "",
    leadJobTitle: "",
    leadCompany: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resultTier, setResultTier] = useState<string>("");
  const [finalScore, setFinalScore] = useState(0);

  const handleOptionSelect = (questionId: string, value: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setTotalScore((prev) => prev + score);

    // Add a small delay for better UX
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 300);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const normalizedScore = Math.round((totalScore / 80) * 100);
    setFinalScore(normalizedScore);

    let frictionTier = "";
    if (normalizedScore <= 40) {
      frictionTier = "HIGH_FRICTION";
    } else if (normalizedScore <= 70) {
      frictionTier = "DISCONNECTED";
    } else {
      frictionTier = "OPTIMIZED";
    }
    setResultTier(frictionTier);

    const payload = {
      ...answers,
      ...leadData,
      calculatedFrictionScore: normalizedScore,
      frictionTier: frictionTier,
      firstname: leadData.leadName,
      emailAddress: leadData.leadEmail,
      jobTitle: leadData.leadJobTitle,
      company: leadData.leadCompany,
      summary: `Friction Score Assessment: ${normalizedScore}/100 (${frictionTier})`,
    };

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEBSITE_API_KEY;
      if (!apiKey) {
        console.error("Missing website-api-key environment variable");
      }

      await fetch("https://hnet.sylentt.com/webhook/submit-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "website-api-key": apiKey || "",
        },
        body: JSON.stringify(payload),
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Submission failed:", error);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / questions.length) * 100;

  // Render Result
  if (isSuccess) {
    let headline = "";
    let subheadline = "";
    let colorClass = "";

    if (resultTier === "HIGH_FRICTION") {
      headline = "Your Organization is Running on Heroics.";
      subheadline = "You are relying on individual effort to overcome systemic chaos. This is not scalable.";
      colorClass = "text-red-500";
    } else if (resultTier === "DISCONNECTED") {
      headline = "You Have Tools, But Not Flow.";
      subheadline = "Your teams are working hard, but friction in handoffs and visibility is slowing you down.";
      colorClass = "text-amber-500";
    } else {
      headline = "You Are Architected for Speed.";
      subheadline = "Your operations are mature. You are ready for advanced automation and scale.";
      colorClass = "text-emerald-500";
    }

    return (
      <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto text-center glass">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={cn("text-6xl font-black mb-4", colorClass)}>
            {finalScore}/100
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">{headline}</h3>
          <p className="text-slate-300 mb-8 text-lg">{subheadline}</p>

          <div className="w-full h-px bg-white/10 my-6" />

          <h4 className="text-xl font-bold mb-2 text-white">Stop losing time to friction.</h4>
          <p className="mb-6 text-slate-400">Let&apos;s discuss a roadmap to fix this.</p>

          <p className="text-sm text-slate-500 mb-6">
            We&apos;ve sent you an email to confirm contact information, please check your spam folder if you don&apos;t see it.
          </p>

          <a
            href="https://calendly.com/nic-sylentt/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-bold text-white transition-all hover:bg-indigo-400 shadow-lg shadow-primary/25 hover:shadow-primary/40"
          >
            Book your free discovery call
          </a>
        </motion.div>
      </div>
    );
  }

  // Render Lead Form
  if (currentStep >= questions.length) {
    return (
      <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto glass">
        <div className="mb-6">
           <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-full transition-all duration-500" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-center mb-2 text-white">Your Friction Score is ready.</h3>
        <p className="text-center text-slate-400 mb-8">Enter your details to reveal your score and get your customized report.</p>

        <form onSubmit={handleLeadSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="leadName" className="text-sm font-medium text-slate-300">Name <span className="text-red-500">*</span></label>
              <Input
                id="leadName"
                required
                value={leadData.leadName}
                onChange={(e) => setLeadData({ ...leadData, leadName: e.target.value })}
                className="bg-slate-950 border-slate-700 text-white focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="leadEmail" className="text-sm font-medium text-slate-300">Work Email <span className="text-red-500">*</span></label>
              <Input
                id="leadEmail"
                type="email"
                required
                value={leadData.leadEmail}
                onChange={(e) => setLeadData({ ...leadData, leadEmail: e.target.value })}
                className="bg-slate-950 border-slate-700 text-white focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="leadJobTitle" className="text-sm font-medium text-slate-300">Job Title <span className="text-red-500">*</span></label>
              <Input
                id="leadJobTitle"
                required
                value={leadData.leadJobTitle}
                onChange={(e) => setLeadData({ ...leadData, leadJobTitle: e.target.value })}
                className="bg-slate-950 border-slate-700 text-white focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="leadCompany" className="text-sm font-medium text-slate-300">Company Name <span className="text-red-500">*</span></label>
              <Input
                id="leadCompany"
                required
                value={leadData.leadCompany}
                onChange={(e) => setLeadData({ ...leadData, leadCompany: e.target.value })}
                className="bg-slate-950 border-slate-700 text-white focus:border-primary"
              />
            </div>
          </div>

          <div className="text-xs text-slate-500 mt-2">
            We do not sell your information to third parties, and you are not signing up for spam.
          </div>

          <div className="pt-4 flex justify-center">
            <Button
              type="submit"
              size="xl"
              disabled={isSubmitting}
              className="w-full md:w-auto shadow-lg shadow-primary/25 bg-primary hover:bg-indigo-400 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...
                </>
              ) : (
                "Reveal My Score"
              )}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // Render Question
  const currentQuestion = questions[currentStep];

  return (
    <div className="bg-slate-900 border border-white/10 p-6 md:p-10 rounded-2xl shadow-2xl max-w-3xl mx-auto glass">
      <div className="mb-8">
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-right text-xs text-slate-400 mt-2">
          Question {currentStep + 1} of {questions.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white leading-tight">
            {currentQuestion.question}
          </h3>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, index) => (
              <Card
                key={option.value}
                className="cursor-pointer transition-all border-2 border-transparent bg-slate-800/50 hover:bg-slate-800 hover:border-primary/50 group"
                onClick={() => handleOptionSelect(currentQuestion.id, option.value, option.score)}
              >
                <div className="p-4 md:p-6 flex items-center">
                  <div className="flex-shrink-0 mr-4 w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300 font-bold group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="flex-grow text-lg font-medium text-slate-300 group-hover:text-white transition-colors">
                    {option.text}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
