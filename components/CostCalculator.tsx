"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface CostCalculatorProps {
  heading?: string;
}

export default function CostCalculator({ heading = "What is the copy-paste layer costing you?" }: CostCalculatorProps) {
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [hourlyCost, setHourlyCost] = useState(30);

  const annualCost = hoursPerWeek * hourlyCost * 52;
  const annualHours = hoursPerWeek * 52;

  return (
    <div id="calculator" className="max-w-3xl mx-auto bg-surface border border-ink/10 rounded-2xl shadow-soft p-8 md:p-14 scroll-mt-24">
      <h3 className="font-display text-3xl md:text-4xl mb-3 text-ink">
        {heading}
      </h3>
      <p className="text-ink/90 font-sans mb-10 leading-relaxed">
        Set the sliders to match your team. This is the time you are spending today, before anything is automated.
      </p>

      <div className="space-y-8 mb-10">
        <div>
          <div className="flex justify-between items-baseline mb-3 font-sans">
            <label htmlFor="hours" className="text-ink/90">
              Hours a week your team spends moving data by hand
            </label>
            <span className="font-display text-2xl text-ink">{hoursPerWeek} hrs</span>
          </div>
          <input
            id="hours"
            type="range"
            min={1}
            max={40}
            step={1}
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="w-full accent-accent"
            aria-label="Hours per week your team spends moving data by hand"
          />
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-3 font-sans">
            <label htmlFor="rate" className="text-ink/90">
              Roughly what an hour of that time costs
            </label>
            <span className="font-display text-2xl text-ink">{currency.format(hourlyCost)}/hr</span>
          </div>
          <input
            id="rate"
            type="range"
            min={15}
            max={100}
            step={5}
            value={hourlyCost}
            onChange={(e) => setHourlyCost(Number(e.target.value))}
            className="w-full accent-accent"
            aria-label="Roughly what an hour of that time costs"
          />
        </div>
      </div>

      <div className="border-t border-ink/10 pt-10 text-center">
        <p className="eyebrow text-ink/60 mb-3">
          That is roughly
        </p>
        <p className="font-display text-6xl md:text-7xl text-accent mb-2" aria-live="polite">
          {currency.format(annualCost)}
        </p>
        <p className="text-ink/90 font-sans mb-10">
          a year, and {annualHours} hours, spent on work your software could be doing.
        </p>
        <a
          href="https://calendly.com/nic-sylentt/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta px-10 py-4 text-lg group"
        >
          Book a free discovery call
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
