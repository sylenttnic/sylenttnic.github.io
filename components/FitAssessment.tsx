"use client";

/**
 * FitAssessment Component
 *
 * Updated for Light Theme Migration:
 * - Replaced dark slate classes with paper/ink semantic tokens.
 * - Removed glows and glass effects.
 * - Standardized on accent color (#B5512F).
 */
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
  numericValue?: number;
  score?: number;
};

type Question = {
  id: string;
  question: string;
  type: "single" | "multi" | "text";
  options: Option[];
};

type QuizAnswers = Record<string, string | string[]>;
type QuizValues = Record<string, number>;

type LeadData = {
  leadName: string;
  leadEmail: string;
  leadJobTitle: string;
  leadCompany: string;
};

const questions: Question[] = [
  {
    id: "tools",
    question: "What tools does your business run on?",
    type: "multi",
    options: [
      { text: "Shopify", value: "SHOPIFY" },
      { text: "Recharge, Bold, or another subscription platform", value: "SUBSCRIPTION" },
      { text: "ShipStation, ShipBob, or another fulfillment tool", value: "FULFILLMENT" },
      { text: "QuickBooks, Xero, or FreshBooks", value: "ACCOUNTING" },
      { text: "Stripe or Square", value: "PAYMENTS" },
      { text: "HubSpot, Salesforce, or another CRM", value: "CRM" },
      { text: "ServiceTitan, Jobber, or another field service tool", value: "FIELD_SERVICE" },
      { text: "Other", value: "OTHER" },
    ],
  },
  {
    id: "automationHistory",
    question: "Have you tried automating this before?",
    type: "single",
    options: [
      { text: "Yes, with Zapier, Make, or a similar tool", value: "ZAPIER", score: 4 },
      { text: "Yes, we hired a developer but it didn't work out", value: "DEVELOPER", score: 3 },
      { text: "No, we've just been doing it manually", value: "MANUAL", score: 2 },
      { text: "We're not sure where to start", value: "UNSURE", score: 1 },
    ],
  },
  {
    id: "failureResponse",
    question: "What happens when something goes wrong between your systems?",
    type: "single",
    options: [
      { text: "We usually find out when a customer complains", value: "CUSTOMER_COMPLAINT", score: 4 },
      { text: "Someone on the team checks manually every day", value: "MANUAL_CHECK", score: 3 },
      { text: "We have alerts but still fix things by hand", value: "ALERTS_MANUAL_FIX", score: 2 },
      { text: "It doesn't go wrong often enough to worry about", value: "NOT_OFTEN", score: 0 },
    ],
  },
  {
    id: "manualTask",
    question: "In one sentence, what's the thing your team does manually that should be automatic?",
    type: "text",
    options: [],
  },
];

export default function FitAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [textInput, setTextInput] = useState("");

  const [leadData, setLeadData] = useState<LeadData>({
    leadName: "",
    leadEmail: "",
    leadJobTitle: "",
    leadCompany: "",
  });
  const [honeyPot, setHoneyPot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleOptionSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 150);
  };

  const toggleMultiSelect = (value: string) => {
    setSelectedOptions((prev) =>
      prev.includes(value) ? prev.filter((o) => o !== value) : [...prev, value]
    );
  };

  const handleNextStep = () => {
    const currentQuestion = questions[currentStep];
    if (currentQuestion.type === "multi") {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: selectedOptions }));
    } else if (currentQuestion.type === "text") {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: textInput }));
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleTextChange = (value: string) => {
    setTextInput(value);
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

    // Calculate Scoring
    let totalScore = 0;

    // Q1: Multi-select
    const q1Selections = (answers["tools"] as string[]) || [];
    const selectionCount = q1Selections.length;
    if (selectionCount >= 4) {
      totalScore += 6;
    } else if (selectionCount === 3) {
      totalScore += 4;
    } else if (selectionCount === 2) {
      totalScore += 2;
    } else if (selectionCount === 1) {
      totalScore += 1;
    }

    // Q2 & Q3: Single-select
    const q2Value = answers["automationHistory"] as string;
    const q2Score = questions.find(q => q.id === "automationHistory")?.options.find(o => o.value === q2Value)?.score || 0;
    totalScore += q2Score;

    const q3Value = answers["failureResponse"] as string;
    const q3Score = questions.find(q => q.id === "failureResponse")?.options.find(o => o.value === q3Value)?.score || 0;
    totalScore += q3Score;

    setCalculatedScore(totalScore);

    let resultTier = "";

    if (totalScore >= 10) {
      resultTier = "Strong fit";
    } else if (totalScore >= 6) {
      resultTier = "Good fit";
    } else if (totalScore >= 1) {
      resultTier = "Worth a conversation";
    } else {
      resultTier = "Might not be the right fit";
    }

    const payload = {
      ...answers,
      ...leadData,
      calculatedScore: totalScore,
      resultTier: resultTier,
      summary: `Fit Assessment: ${resultTier} (${totalScore} pts). Manual Task: ${answers["manualTask"]}`,
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

  if (isSuccess) {
    let resultTier = "";
    let summaryMessage = "";
    let colorClass = "";

    if (calculatedScore >= 10) {
      resultTier = "Strong fit";
      summaryMessage = "Your setup is exactly the kind of problem we built Sylentt Partners to solve.";
      colorClass = "text-accent";
    } else if (calculatedScore >= 6) {
      resultTier = "Good fit";
      summaryMessage = "Based on your answers, there's a good chance we can help. Let's talk through the details.";
      colorClass = "text-accent";
    } else if (calculatedScore >= 1) {
      resultTier = "Worth a conversation";
      summaryMessage = "We'd want to learn more about your setup before saying for sure, but it's worth a quick conversation.";
      colorClass = "text-accent";
    } else {
      resultTier = "Might not be the right fit";
      summaryMessage = "Based on your answers, Sylentt Partners might not be what you need right now, but if you think we're wrong, reach out anyway.";
      colorClass = "text-ink/40";
    }

    return (
      <div className="lane-body p-8 max-w-2xl mx-auto text-center border-ink/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xl text-ink/40 mb-2 uppercase tracking-widest font-mono">Fit Assessment Result</div>
          <div className={cn("text-5xl md:text-6xl font-serif font-bold mb-6", colorClass)}>
            {resultTier}
          </div>
          <p className="text-ink/80 mb-8 text-lg font-sans">
            {summaryMessage}
          </p>

          <div className="w-full h-px bg-ink/5 my-6" />

          <h4 className="text-xl font-serif font-bold mb-2 text-ink">Let&apos;s build your roadmap</h4>
          <p className="mb-6 text-ink/60 font-sans">Schedule a session to see how we can eliminate the friction in your workflows.</p>

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

        <h3 className="text-2xl md:text-3xl font-serif font-bold text-center mb-2 text-ink">Your Fit Assessment is ready</h3>
        <p className="text-center text-ink/60 mb-8 font-sans italic">Enter your details to reveal your score and get your customized report.</p>

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
              <label htmlFor="leadName" className="text-sm font-medium text-ink/70">Name <span className="text-accent">*</span></label>
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
              <label htmlFor="leadEmail" className="text-sm font-medium text-ink/70">Work Email <span className="text-accent">*</span></label>
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
              <label htmlFor="leadJobTitle" className="text-sm font-medium text-ink/70">Job Title <span className="text-accent">*</span></label>
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
              <label htmlFor="leadCompany" className="text-sm font-medium text-ink/70">Company Name <span className="text-accent">*</span></label>
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
            {currentQuestion.type === "text" ? (
              <div className="space-y-6">
                <textarea
                  autoFocus
                  className="w-full bg-paper border border-ink/10 rounded-sm p-6 text-ink text-lg focus:border-accent outline-none min-h-[120px] transition-colors font-sans placeholder:text-ink/20"
                  placeholder="e.g. We manually copy tracking numbers from ShipStation to a Google Sheet for our weekly report."
                  value={textInput}
                  onChange={(e) => handleTextChange(e.target.value)}
                />
                <div className="flex justify-center">
                  <Button
                    size="xl"
                    onClick={handleNextStep}
                    disabled={!textInput.trim()}
                    className="group bg-accent hover:opacity-90 text-white px-10 rounded-sm"
                  >
                    Next Question
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {currentQuestion.options.map((option, index) => {
                  const isSelected = currentQuestion.type === "multi"
                    ? selectedOptions.includes(option.value)
                    : answers[currentQuestion.id] === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={cn(
                        "w-full text-left rounded-sm transition-all border group",
                        isSelected
                          ? "border-accent bg-accent/5"
                          : "border-ink/10 bg-surface hover:border-ink/30"
                      )}
                      onClick={() =>
                        currentQuestion.type === "multi"
                          ? toggleMultiSelect(option.value)
                          : handleOptionSelect(currentQuestion.id, option.value)
                      }
                    >
                      <div className="p-4 md:p-6 flex items-center">
                        <div className={cn(
                          "flex-shrink-0 mr-4 w-8 h-8 rounded-full border flex items-center justify-center font-serif font-bold transition-all",
                          isSelected
                            ? "bg-accent border-accent text-white"
                            : "bg-surface2 border-ink/10 text-ink/40 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                        )}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div className={cn(
                          "flex-grow text-lg font-sans transition-colors",
                          isSelected ? "text-ink" : "text-ink/80 group-hover:text-ink"
                        )}>
                          {option.text}
                        </div>
                        <div className={cn(
                          "transition-all text-accent",
                          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </button>
                  );
                })}

                {currentQuestion.type === "multi" && (
                  <div className="flex justify-center mt-6">
                    <Button
                      size="xl"
                      onClick={handleNextStep}
                      disabled={selectedOptions.length === 0}
                      className="group bg-accent hover:opacity-90 text-white px-10 rounded-sm"
                    >
                      Next Question
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
