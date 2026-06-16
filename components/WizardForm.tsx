"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
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
  const [honeyPot, setHoneyPot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resultTier, setResultTier] = useState<string>("");
  const [finalScore, setFinalScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleOptionSelect = (questionId: string, value: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setTotalScore((prev) => prev + score);

    // Add a small delay for better UX
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 150);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Honeypot check
    if (honeyPot) {
      console.warn("Honeypot triggered, blocking submission.");
      return;
    }

    // Basic security validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadData.leadEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (leadData.leadName.length < 2) {
      setError("Please enter a valid name.");
      return;
    }

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
      summary: `Friction Score Assessment: ${normalizedScore}/100 (${frictionTier})`,
    };

    try {
      const apiKey = process.env.NEXT_PUBLIC_INTAKE_API_KEY;

      if (!apiKey) {
        console.error("Form configuration error: NEXT_PUBLIC_INTAKE_API_KEY is missing.");
        setError("Form configuration error. Please try again later.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("https://intake.sylentt.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "website-api-key": apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(`Submission error: ${response.status} ${response.statusText}`);
        setError("Something went wrong. Please try again later.");
      } else {
        console.log("Submission successful");
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setError("Network error. Please try again later.");
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
      headline = "Your Organization is Running on Heroics";
      subheadline = "You are relying on individual effort to overcome systemic chaos. This is not scalable.";
      colorClass = "text-accent";
    } else if (resultTier === "DISCONNECTED") {
      headline = "You Have Tools, But Not Flow";
      subheadline = "Your teams are working hard, but friction in handoffs and visibility is slowing you down.";
      colorClass = "text-accent";
    } else {
      headline = "You Are Architected for Speed";
      subheadline = "Your operations are mature. You are ready for advanced automation and scale.";
      colorClass = "text-accent";
    }

    return (
      <div className="lane-body p-8 max-w-2xl mx-auto text-center border-ink/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={cn("text-6xl font-serif font-bold mb-4", colorClass)}>
            {finalScore}/100
          </div>
          <h3 className="text-2xl font-serif font-bold mb-4 text-ink">{headline}</h3>
          <p className="text-ink/90 mb-8 text-lg font-sans">{subheadline}</p>

          <div className="w-full h-px bg-ink/5 my-6" />

          <h4 className="text-xl font-serif font-bold mb-2 text-ink">Stop losing time to friction</h4>
          <p className="mb-6 text-ink/80 font-sans">Let&apos;s discuss a roadmap to fix this.</p>

          <p className="text-sm text-ink/40 mb-6 font-sans italic">
            We&apos;ve sent you an email to confirm contact information, please check your spam folder if you don&apos;t see it.
          </p>

          <a
            href="https://calendly.com/nic-sylentt/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm bg-accent px-8 py-4 text-lg font-bold text-white transition-all hover:opacity-90 shadow-sm"
          >
            Book your discovery call
          </a>
        </motion.div>
      </div>
    );
  }

  // Render Lead Form
  if (currentStep >= questions.length) {
    return (
      <div className="lane-body p-8 max-w-2xl mx-auto border-ink/10">
        <div className="mb-6">
          <div
            role="progressbar"
            aria-valuenow={100}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progress: Complete"
            className="h-2 w-full bg-surface2 rounded-full overflow-hidden"
          >
            <div className="h-full bg-accent w-full transition-all duration-500" />
          </div>
        </div>

        <h3 className="text-2xl font-serif font-bold text-center mb-2 text-ink">Your Friction Score is ready</h3>
        <p className="text-center text-ink/80 mb-8 font-sans italic">Enter your details to reveal your score and get your customized report.</p>

        <form onSubmit={handleLeadSubmit} className="space-y-4">
          <div className="hidden">
            <label htmlFor="hp_field">Verification</label>
            <input
              type="text"
              id="hp_field"
              name="hp_field"
              value={honeyPot}
              onChange={(e) => setHoneyPot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="leadName" className="text-sm font-medium text-ink/90">Name <span className="text-accent">*</span></label>
              <Input
                id="leadName"
                name="leadName"
                required
                value={leadData.leadName}
                onChange={(e) => setLeadData({ ...leadData, leadName: e.target.value })}
                className="bg-paper border-ink/10 text-ink focus:border-accent rounded-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="leadEmail" className="text-sm font-medium text-ink/90">Work Email <span className="text-accent">*</span></label>
              <Input
                id="leadEmail"
                name="leadEmail"
                type="email"
                required
                value={leadData.leadEmail}
                onChange={(e) => setLeadData({ ...leadData, leadEmail: e.target.value })}
                className="bg-paper border-ink/10 text-ink focus:border-accent rounded-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="leadJobTitle" className="text-sm font-medium text-ink/90">Job Title <span className="text-accent">*</span></label>
              <Input
                id="leadJobTitle"
                name="leadJobTitle"
                required
                value={leadData.leadJobTitle}
                onChange={(e) => setLeadData({ ...leadData, leadJobTitle: e.target.value })}
                className="bg-paper border-ink/10 text-ink focus:border-accent rounded-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="leadCompany" className="text-sm font-medium text-ink/90">Company Name <span className="text-accent">*</span></label>
              <Input
                id="leadCompany"
                name="leadCompany"
                required
                value={leadData.leadCompany}
                onChange={(e) => setLeadData({ ...leadData, leadCompany: e.target.value })}
                className="bg-paper border-ink/10 text-ink focus:border-accent rounded-sm"
              />
            </div>
          </div>

          <div className="text-xs text-ink/40 mt-2 font-sans italic">
            We do not sell your information to third parties, and you are not signing up for spam.
          </div>

          {error && (
            <div className="text-red-700 text-sm text-center font-medium bg-red-50 p-2 rounded-sm border border-red-100">
              {error}
            </div>
          )}

          <div className="pt-4 flex justify-center">
            <Button
              type="submit"
              size="xl"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-accent hover:opacity-90 text-white rounded-sm"
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
    <div className="lane-body p-6 md:p-10 max-w-3xl mx-auto border-ink/10">
      <div className="mb-8">
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Question ${currentStep + 1} of ${questions.length}`}
          className="h-2 w-full bg-surface2 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-right text-xs text-ink/40 mt-2 font-sans italic" aria-hidden="true">
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
          role="group"
          aria-labelledby="question-heading"
        >
          <h3
            id="question-heading"
            className="text-2xl md:text-3xl font-serif font-bold mb-8 text-center text-ink leading-tight"
          >
            {currentQuestion.question}
          </h3>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "w-full text-left rounded-sm transition-all border group",
                  "border-ink/10 bg-surface hover:border-ink/30",
                  "focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                )}
                onClick={() => handleOptionSelect(currentQuestion.id, option.value, option.score)}
              >
                <div className="p-4 md:p-6 flex items-center">
                  <div className="flex-shrink-0 mr-4 w-8 h-8 rounded-full bg-surface2 border border-ink/10 flex items-center justify-center text-ink/40 font-serif font-bold group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="flex-grow text-lg font-sans text-ink/90 group-hover:text-ink transition-colors">
                    {option.text}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-accent">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
