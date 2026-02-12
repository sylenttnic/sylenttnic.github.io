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
  numericValue: number;
};

type Question = {
  id: string;
  question: string;
  options: Option[];
};

type QuizAnswers = Record<string, string>;
type QuizValues = Record<string, number>;

type LeadData = {
  leadName: string;
  leadEmail: string;
  leadJobTitle: string;
  leadCompany: string;
};

const questions: Question[] = [
  {
    id: "manualEntryHours",
    question: "How many hours per week does your team spend on manual data entry?",
    options: [
      { text: "0-5 hours", value: "0-5", numericValue: 2.5 },
      { text: "5-10 hours", value: "5-10", numericValue: 7.5 },
      { text: "10-20 hours", value: "10-20", numericValue: 15 },
      { text: "20+ hours", value: "20+", numericValue: 25 },
    ],
  },
  {
    id: "emailFollowupHours",
    question: "How many hours per week are lost to chasing status updates via email/Slack?",
    options: [
      { text: "0-5 hours", value: "0-5", numericValue: 2.5 },
      { text: "5-10 hours", value: "5-10", numericValue: 7.5 },
      { text: "10-20 hours", value: "10-20", numericValue: 15 },
      { text: "20+ hours", value: "20+", numericValue: 25 },
    ],
  },
  {
    id: "searchHours",
    question: "How many hours per week do you spend searching for information across different apps?",
    options: [
      { text: "0-2 hours", value: "0-2", numericValue: 1 },
      { text: "2-5 hours", value: "2-5", numericValue: 3.5 },
      { text: "5-10 hours", value: "5-10", numericValue: 7.5 },
      { text: "10+ hours", value: "10+", numericValue: 12 },
    ],
  },
  {
    id: "hourlyCost",
    question: "What is the average hourly cost of your operations staff (fully loaded)?",
    options: [
      { text: "$20 - $40 / hr", value: "20-40", numericValue: 30 },
      { text: "$40 - $60 / hr", value: "40-60", numericValue: 50 },
      { text: "$60 - $100 / hr", value: "60-100", numericValue: 80 },
      { text: "$100+ / hr", value: "100+", numericValue: 120 },
    ],
  },
  {
    id: "errorFrequency",
    question: "How often do manual errors cause operational issues or rework?",
    options: [
      { text: "Rarely", value: "RARELY", numericValue: 0 },
      { text: "Monthly", value: "MONTHLY", numericValue: 0 },
      { text: "Weekly", value: "WEEKLY", numericValue: 0 },
      { text: "Daily", value: "DAILY", numericValue: 0 },
    ],
  },
  {
    id: "toolCount",
    question: "How many different software tools does your team use daily?",
    options: [
      { text: "1-3", value: "1-3", numericValue: 0 },
      { text: "4-7", value: "4-7", numericValue: 0 },
      { text: "8-12", value: "8-12", numericValue: 0 },
      { text: "13+", value: "13+", numericValue: 0 },
    ],
  }
];

export default function CostCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [values, setValues] = useState<QuizValues>({});

  const [leadData, setLeadData] = useState<LeadData>({
    leadName: "",
    leadEmail: "",
    leadJobTitle: "",
    leadCompany: "",
  });
  const [honeyPot, setHoneyPot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [calculatedBurnRate, setCalculatedBurnRate] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleOptionSelect = (questionId: string, value: string, numericValue: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setValues((prev) => ({ ...prev, [questionId]: numericValue }));

    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 150);
  };

  const calculateBurnRate = () => {
    const hours = (values["manualEntryHours"] || 0) + (values["emailFollowupHours"] || 0) + (values["searchHours"] || 0);
    const cost = values["hourlyCost"] || 0;
    // Annual cost = Weekly hours * 52 weeks * Hourly cost
    return hours * 52 * cost;
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (honeyPot) {
      console.warn("Honeypot triggered, blocking submission.");
      return;
    }

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

    const burnRate = calculateBurnRate();
    setCalculatedBurnRate(burnRate);

    const payload = {
      ...answers,
      ...leadData,
      calculatedBurnRate: burnRate,
      firstname: leadData.leadName,
      emailAddress: leadData.leadEmail,
      jobTitle: leadData.leadJobTitle,
      company: leadData.leadCompany,
      summary: `Hidden Cost Assessment: Estimated Annual Burn Rate $${burnRate.toLocaleString()}`,
    };

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEBSITE_API_KEY || "e5362baf-c777-4d57-a609-6eaf1f9e87f6";

      if (!process.env.NEXT_PUBLIC_WEBSITE_API_KEY) {
        console.log("Using fallback website-api-key.");
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

  if (isSuccess) {
    return (
      <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto text-center glass">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xl text-slate-400 mb-2">Estimated Annual Hidden Cost</div>
          <div className="text-5xl md:text-6xl font-black mb-6 text-red-500">
            ${calculatedBurnRate.toLocaleString()}
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">This is the cost of the &quot;Invisible Drag.&quot;</h3>
          <p className="text-slate-300 mb-8 text-lg">
            Imagine what you could do if you reinvested that capital into growth instead of maintenance.
          </p>

          <div className="w-full h-px bg-white/10 my-6" />

          <p className="text-sm text-slate-500 mb-6">
            We&apos;ve sent your full report to your email.
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

  if (currentStep >= questions.length) {
    return (
      <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto glass">
        <div className="mb-6">
          <div
            role="progressbar"
            aria-valuenow={100}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progress: Complete"
            className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"
          >
            <div className="h-full bg-primary w-full transition-all duration-500" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-center mb-2 text-white">Your Hidden Cost Report is ready.</h3>
        <p className="text-center text-slate-400 mb-8">Enter your details to reveal your estimated operational burn rate.</p>

        <form onSubmit={handleLeadSubmit} className="space-y-4">
          {/* Honeypot field - hidden from users */}
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
              <label htmlFor="leadName" className="text-sm font-medium text-slate-300">Name <span className="text-red-500">*</span></label>
              <Input
                id="leadName"
                name="leadName"
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
                name="leadEmail"
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
                name="leadJobTitle"
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
                name="leadCompany"
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

          {error && (
            <div className="text-red-500 text-sm text-center font-medium bg-red-500/10 p-2 rounded">
              {error}
            </div>
          )}

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
                "Reveal My Burn Rate"
              )}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="bg-slate-900 border border-white/10 p-6 md:p-10 rounded-2xl shadow-2xl max-w-3xl mx-auto glass">
      <div className="mb-8">
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Question ${currentStep + 1} of ${questions.length}`}
          className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-right text-xs text-slate-400 mt-2" aria-hidden="true">
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
            className="text-2xl md:text-3xl font-bold mb-8 text-center text-white leading-tight"
          >
            {currentQuestion.question}
          </h3>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "w-full text-left rounded-xl shadow-sm",
                  "cursor-pointer transition-all border-2 border-transparent bg-slate-800/50 hover:bg-slate-800 hover:border-primary/50 group",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                )}
                onClick={() => handleOptionSelect(currentQuestion.id, option.value, option.numericValue)}
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
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
