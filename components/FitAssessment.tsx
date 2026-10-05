"use client";

/**
 * FitAssessment Component: the "2-minute IT check".
 *
 * Four single-choice questions, then a result. There is no lead form and no
 * submission to the intake server: the result is worked out in the browser and
 * shown straight away, followed by the Calendly link. Completing the check sends
 * one anonymous GA4 event (it_check_complete) with the result and the answers,
 * nothing that identifies the visitor.
 *
 * Light theme: paper/ink semantic tokens, accent color (#B5512F).
 */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CALENDLY_URL } from "@/lib/offer";

// Each answer adds points toward one or more result patterns. The pattern with
// the most points is the result. Ties go to the earlier pattern in PATTERN_ORDER,
// which runs from the most urgent situation to the least.
type PatternId = "noOwner" | "itCompany" | "owner" | "spend" | "inControl";

const PATTERN_ORDER: PatternId[] = ["noOwner", "itCompany", "owner", "spend", "inControl"];

const patterns: Record<PatternId, { heading: string; paragraph: string }> = {
  noOwner: {
    heading: "Nobody owns IT.",
    paragraph:
      "Right now, technology decisions get made by whoever is closest, or by nobody. That holds until a system goes down, a contract renews itself, or someone asks what your AI policy is. You don't need a full-time hire to fix it. You need one person who owns the decisions, a few hours a month.",
  },
  itCompany: {
    heading: "Your IT company is making your decisions.",
    paragraph:
      "Your IT company is probably good at fixing things. But it is also making calls that should be yours: what you buy, when you upgrade, who decides in an outage. You need someone on your side of the table who manages them for you.",
  },
  owner: {
    heading: "You're the IT director, on top of your real job.",
    paragraph:
      "You're making the technology calls, and probably the AI calls too. That's normal at your size, and it costs you hours you should spend running the company. I can take that off your plate for a few hours a month. You keep the final say.",
  },
  spend: {
    heading: "You don't know what IT really costs.",
    paragraph:
      "Most companies your size pay for software nobody uses and miss tools they need, and nobody has the full list. The assessment starts there: every system, subscription, and contract in one place, with what to keep, cut, or add.",
  },
  inControl: {
    heading: "You're ahead of most companies your size.",
    paragraph:
      "Someone owns the decisions and you know what you spend. The open question is whether you have a written 12-month plan and a clear position on AI. If not, the two-week assessment gives you both.",
  },
};

// Types
type Option = {
  text: string;
  value: string;
  points?: Partial<Record<PatternId, number>>;
};

type Question = {
  id: string;
  question: string;
  type: "single" | "multi" | "text";
  options: Option[];
};

type QuizAnswers = Record<string, string | string[]>;

const questions: Question[] = [
  {
    id: "whoDecides",
    question: "Who makes technology decisions at your company?",
    type: "single",
    options: [
      { text: "Owner", value: "OWNER", points: { owner: 2 } },
      { text: "Office manager", value: "OFFICE_MANAGER", points: { noOwner: 2 } },
      { text: "Our IT company", value: "IT_COMPANY", points: { itCompany: 2 } },
      { text: "Nobody, really", value: "NOBODY", points: { noOwner: 3 } },
    ],
  },
  {
    id: "spendKnown",
    question: "Do you know what you spend on software and IT each month?",
    type: "single",
    options: [
      { text: "To the dollar", value: "TO_THE_DOLLAR", points: { inControl: 2 } },
      { text: "Roughly", value: "ROUGHLY", points: { spend: 1 } },
      { text: "No idea", value: "NO_IDEA", points: { spend: 3 } },
    ],
  },
  {
    id: "outageOwner",
    question: "If your main system went down tomorrow, who decides what happens next?",
    type: "single",
    options: [
      { text: "Our IT company", value: "IT_COMPANY", points: { itCompany: 2 } },
      { text: "Someone on staff", value: "STAFF", points: { inControl: 1 } },
      { text: "Not sure", value: "NOT_SURE", points: { noOwner: 2 } },
    ],
  },
  {
    id: "aiOwner",
    question: "Has anyone been put in charge of figuring out AI?",
    type: "single",
    options: [
      { text: "Yes, me", value: "ME", points: { owner: 2 } },
      { text: "Yes, someone else", value: "SOMEONE_ELSE", points: { inControl: 1 } },
      { text: "No one", value: "NO_ONE", points: { noOwner: 1 } },
      { text: "We've decided not to use it", value: "DECIDED_NOT", points: { inControl: 1 } },
    ],
  },
];

function dominantPattern(answers: QuizAnswers): PatternId {
  const totals: Record<PatternId, number> = {
    noOwner: 0,
    itCompany: 0,
    owner: 0,
    spend: 0,
    inControl: 0,
  };
  for (const q of questions) {
    const chosen = answers[q.id];
    const values = Array.isArray(chosen) ? chosen : [chosen];
    for (const option of q.options) {
      if (!values.includes(option.value) || !option.points) continue;
      for (const [id, n] of Object.entries(option.points) as [PatternId, number][]) {
        totals[id] += n;
      }
    }
  }
  return PATTERN_ORDER.reduce((best, id) => (totals[id] > totals[best] ? id : best));
}

export default function FitAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [textInput, setTextInput] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const reportedRef = useRef(false);

  const isComplete = currentStep >= questions.length;
  const result = isComplete ? dominantPattern(answers) : null;

  // One anonymous analytics event per completed check, through the gtag already
  // loaded by the root layout. No name, email or other identifying data.
  useEffect(() => {
    if (!result || reportedRef.current) return;
    reportedRef.current = true;
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.("event", "it_check_complete", { result, ...answers });
  }, [result, answers]);

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

  const handleRestart = () => {
    setAnswers({});
    setSelectedOptions([]);
    setTextInput("");
    setCurrentStep(0);
    reportedRef.current = false;
  };

  const progress = (currentStep / questions.length) * 100;

  if (result) {
    const { heading, paragraph } = patterns[result];

    return (
      <div className="lane-body p-8 md:p-10 max-w-2xl mx-auto text-center border-ink/10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          aria-live="polite"
        >
          <div className="eyebrow text-ink/60 mb-3">Your result</div>
          <h3 className="font-display text-3xl md:text-4xl mb-6 text-accent text-balance">
            {heading}
          </h3>
          <p className="text-ink/90 mb-10 text-lg font-sans leading-relaxed text-left md:text-center">
            {paragraph}
          </p>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta px-8 py-4 text-lg group"
          >
            Book a 30-minute call
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleRestart}
              className="text-sm font-sans text-ink/60 underline-offset-4 rounded-sm transition-colors hover:text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              Start over
            </button>
          </div>
        </motion.div>
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
          initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          role="group"
          aria-labelledby="question-heading"
        >
          <h3
            id="question-heading"
            className="font-display text-2xl md:text-3xl mb-8 text-center text-ink leading-tight"
          >
            {currentQuestion.question}
          </h3>

          <div className="grid gap-4">
            {currentQuestion.type === "text" ? (
              <div className="space-y-6">
                <textarea
                  autoFocus
                  className="w-full bg-paper border border-ink/15 rounded-lg p-6 text-ink text-lg transition-colors font-sans placeholder:text-ink/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 min-h-[120px]"
                  placeholder="Type your answer here."
                  value={textInput}
                  onChange={(e) => handleTextChange(e.target.value)}
                />
                <div className="flex justify-center">
                  <Button
                    size="xl"
                    onClick={handleNextStep}
                    disabled={!textInput.trim()}
                    className="group px-10 rounded-lg"
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
                        "w-full text-left rounded-xl transition-all border group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                        isSelected
                          ? "border-accent bg-accent/5"
                          : "border-ink/10 bg-surface hover:border-ink/30 hover:bg-surface2"
                      )}
                      onClick={() =>
                        currentQuestion.type === "multi"
                          ? toggleMultiSelect(option.value)
                          : handleOptionSelect(currentQuestion.id, option.value)
                      }
                    >
                      <div className="p-4 md:p-6 flex items-center">
                        <div className={cn(
                          "flex-shrink-0 mr-4 w-8 h-8 rounded-full border flex items-center justify-center font-display transition-all",
                          isSelected
                            ? "bg-accent border-accent text-white"
                            : "bg-surface2 border-ink/10 text-ink/40 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                        )}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div className={cn(
                          "flex-grow text-lg font-sans transition-colors",
                          isSelected ? "text-ink" : "text-ink/90 group-hover:text-ink"
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
                      className="group px-10 rounded-lg"
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
