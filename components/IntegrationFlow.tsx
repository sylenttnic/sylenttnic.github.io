"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import logo from "@/assets/img/logo.webp";

type App = { name: string; logo: string };
type Scenario = {
  source: App;
  event: string;
  destinations: { app: App; result: string }[];
};

const L = "/assets/img/logos";

// Illustrative scenarios: an event in one system, and the systems that update
// automatically because of it. Short functional labels only.
const scenarios: Scenario[] = [
  {
    source: { name: "Shopify", logo: `${L}/shopify.svg` },
    event: "New order",
    destinations: [
      { app: { name: "ShipStation", logo: `${L}/shipstation.svg` }, result: "Fulfillment queued" },
      { app: { name: "QuickBooks", logo: `${L}/quickbooks.svg` }, result: "Invoice created" },
    ],
  },
  {
    source: { name: "Stripe", logo: `${L}/stripe.svg` },
    event: "Payment received",
    destinations: [
      { app: { name: "QuickBooks", logo: `${L}/quickbooks.svg` }, result: "Books updated" },
      { app: { name: "HubSpot", logo: `${L}/hubspot.svg` }, result: "Deal updated" },
    ],
  },
  {
    source: { name: "Jobber", logo: `${L}/jobber.svg` },
    event: "Job completed",
    destinations: [
      { app: { name: "QuickBooks", logo: `${L}/quickbooks.svg` }, result: "Invoice sent" },
      { app: { name: "HubSpot", logo: `${L}/hubspot.svg` }, result: "Client updated" },
    ],
  },
];

const SWAP_MS = 5000;

function AppLogo({ app }: { app: App }) {
  return (
    <span className="relative w-8 h-8 md:w-9 md:h-9 shrink-0">
      <Image src={app.logo} alt={app.name} fill className="object-contain" />
    </span>
  );
}

/* Straight connector (source -> hub). Vertical when stacked, inline on desktop.
   CSS keyframe utilities, so the global reduced-motion guard stops them. */
function Connector() {
  return (
    <div className="flex items-center justify-center shrink-0" aria-hidden="true">
      {/* stacked (mobile) */}
      <div className="relative md:hidden h-7 w-1.5">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-ink/10 via-ink/20 to-ink/10" />
        <span className="absolute left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-accent animate-flow-down" />
      </div>
      {/* inline (desktop) */}
      <div className="relative hidden md:block h-2 w-14 lg:w-16">
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-ink/10 via-ink/20 to-ink/10" />
        <span className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent animate-flow-right" />
      </div>
    </div>
  );
}

/* Desktop Y-fork: hub trunk splits into two curved branches, one per system,
   each with an accent flow travelling toward its destination. */
function ForkConnector() {
  return (
    <div className="hidden md:block w-14 lg:w-16 self-stretch shrink-0" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        {/* hairline fork */}
        <path d="M0,50 H34" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="text-ink/15" />
        <path d="M34,50 C60,50 74,22 100,22" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="text-ink/15" />
        <path d="M34,50 C60,50 74,78 100,78" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="text-ink/15" />
        {/* accent flow toward each system */}
        <path d="M0,50 H34 C60,50 74,22 100,22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 7" vectorEffect="non-scaling-stroke" className="text-accent animate-dash-flow" />
        <path d="M0,50 H34 C60,50 74,78 100,78" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 7" vectorEffect="non-scaling-stroke" className="text-accent animate-dash-flow" />
      </svg>
    </div>
  );
}

export default function IntegrationFlow() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % scenarios.length), SWAP_MS);
    return () => clearInterval(id);
  }, [reduce]);

  const s = scenarios[index];

  return (
    <div
      role="img"
      aria-label="How Sylentt Partners connects your apps: when something happens in one system, your other systems update automatically."
      className="relative mx-auto w-full max-w-4xl rounded-2xl border border-ink/10 bg-surface/50 shadow-soft p-6 md:p-10"
    >
      <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center" aria-hidden="true">
        {/* Source */}
        <div className="flex w-full justify-center md:w-56 md:justify-end shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`src-${index}`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.55, ease: "easeInOut" }}
              className="w-full max-w-[15rem] rounded-xl border border-ink/10 bg-paper p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <AppLogo app={s.source} />
                <span className="font-sans text-sm md:text-base font-semibold text-ink truncate">
                  {s.source.name}
                </span>
              </div>
              <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-ink/5 px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-ink/40" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink/70">
                  {s.event}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* source -> hub */}
        <Connector />

        {/* Sylentt hub */}
        <div className="flex justify-center shrink-0">
          <div className="relative flex h-20 w-32 items-center justify-center rounded-2xl border border-ink/10 bg-paper p-3 shadow-soft ring-1 ring-accent/10 md:h-24 md:w-40">
            <span className="relative block h-full w-full">
              <Image src={logo} alt="Sylentt Partners" fill className="object-contain" priority />
            </span>
          </div>
        </div>

        {/* hub -> both destinations (fork) */}
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-stretch md:gap-0 shrink-0">
          {/* mobile trunk */}
          <div className="relative md:hidden h-7 w-1.5" aria-hidden="true">
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-ink/10 via-ink/20 to-ink/10" />
            <span className="absolute left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-accent animate-flow-down" />
          </div>
          {/* desktop Y fork */}
          <ForkConnector />
          {/* Destinations */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`dst-${index}`}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3 md:items-start"
            >
              {s.destinations.map((d, k) => (
                <motion.div
                  key={k}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut", delay: reduce ? 0 : 0.18 + k * 0.16 }}
                  className="w-full max-w-[15rem] md:w-56 rounded-xl border border-accent/25 bg-paper p-4 shadow-sm ring-1 ring-accent/5"
                >
                  <div className="flex items-center gap-3">
                    <AppLogo app={d.app} />
                    <span className="font-sans text-sm md:text-base font-semibold text-ink truncate">
                      {d.app.name}
                    </span>
                    <span className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                  </div>
                  <div className="mt-3 font-mono text-[11px] uppercase tracking-wider text-accent">
                    {d.result}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
