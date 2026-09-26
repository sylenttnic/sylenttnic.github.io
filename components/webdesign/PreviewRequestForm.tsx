"use client";

/**
 * PreviewRequestForm
 *
 * The one form on /webdesign. It is a real HTML form first: with JavaScript
 * off the browser POSTs it form-encoded to intake.sylentt.com/webdesign and
 * the server answers with a redirect to /webdesign/thanks/ (or
 * /webdesign/request-error/). With JavaScript on, submit is intercepted, the
 * same fields go as JSON with the website-api-key header (the way
 * FitAssessment.tsx already posts), and the form swaps for the success
 * message in place. No library, no new dependency, native validation only.
 */
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const INTAKE_URL = "https://intake.sylentt.com/webdesign";

/* A per-submission id so a future server-side Conversions API event can
   dedupe against this browser pixel event (Meta requires the same eventID
   on both sides). */
const newEventID = () =>
  typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

/* The 48 contiguous states plus DC. Alaska, Hawaii and the territories are
   not offered. */
const STATES: Array<[string, string]> = [
  ["AL", "Alabama"], ["AZ", "Arizona"], ["AR", "Arkansas"], ["CA", "California"], ["CO", "Colorado"],
  ["CT", "Connecticut"], ["DE", "Delaware"], ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"],
  ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"], ["KY", "Kentucky"],
  ["LA", "Louisiana"], ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"],
  ["MN", "Minnesota"], ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
  ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"],
  ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"], ["OR", "Oregon"],
  ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"], ["SD", "South Dakota"],
  ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"],
  ["WA", "Washington"], ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
];

const labelClass = "block text-sm font-medium text-ink/90 mb-2";
const selectClass = cn(
  "flex h-12 w-full rounded-lg border border-ink/15 bg-paper px-4 py-2 text-base text-ink transition-colors",
  "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30",
  "disabled:cursor-not-allowed disabled:opacity-50"
);

export default function PreviewRequestForm() {
  const [formStartedAt, setFormStartedAt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_INTAKE_API_KEY ?? "";

  useEffect(() => {
    setFormStartedAt(String(Date.now()));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    /* Only intercept when a fetch can actually be made; otherwise let the
       browser POST the form as it would with JavaScript off. */
    if (typeof fetch !== "function" || !apiKey) return;
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const payload = {
      businessName: field("businessName"),
      city: field("city"),
      state: field("state"),
      email: field("email"),
      website: field("website"),
      requesterName: field("requesterName"),
      trade: field("trade"),
      phone: field("phone"),
      formStartedAt: field("formStartedAt"),
      company_url: field("company_url"),
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(INTAKE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "website-api-key": apiKey,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        setError("That did not go through. Try again, or email support@sylentt.com.");
      } else {
        const eventID = newEventID();
        window.fbq && window.fbq('track', 'Lead', {}, { eventID });
        setIsSuccess(true);
      }
    } catch {
      setError("That did not go through. Try again, or email support@sylentt.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="lane-body p-8 md:p-10 max-w-2xl mx-auto border-ink/10" role="status" aria-live="polite">
        <h3 className="font-display text-3xl md:text-4xl font-bold text-ink mb-4">Got it.</h3>
        <p className="text-base md:text-lg text-ink/90 font-sans leading-relaxed">
          We are looking up your business now. Research comes first, so this takes a while; the preview link goes to the email address you gave. If we cannot find enough about the business to build from, we will tell you that too.
        </p>
      </div>
    );
  }

  return (
    <form
      method="post"
      action={INTAKE_URL}
      onSubmit={handleSubmit}
      className="lane-body p-6 md:p-10 max-w-2xl mx-auto border-ink/10"
    >
      <input type="hidden" name="website_api_key" value={apiKey} />
      <input type="hidden" name="formStartedAt" value={formStartedAt} readOnly />

      {/* Honeypot: visually hidden, never focusable, never announced. A
          person cannot see it; a script fills it. */}
      <div className="absolute left-[-10000px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company_url">Leave this field empty</label>
        <input type="text" id="company_url" name="company_url" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label htmlFor="businessName" className={labelClass}>
            Business name <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <Input id="businessName" name="businessName" required maxLength={120} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="city" className={labelClass}>
            City <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <Input id="city" name="city" required maxLength={80} autoComplete="address-level2" />
        </div>
        <div>
          <label htmlFor="state" className={labelClass}>
            State <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <select id="state" name="state" required defaultValue="" autoComplete="address-level1" className={selectClass}>
            <option value="" disabled>
              Choose a state
            </option>
            {STATES.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <Input id="email" name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" />
        </div>
      </div>

      <details className="group mt-6 border-t border-ink/10 pt-4">
        <summary className="cursor-pointer list-none inline-flex items-center min-h-[44px] font-sans text-base font-medium text-ink/90 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md">
          <span className="mr-2 transition-transform group-open:rotate-90" aria-hidden="true">&rsaquo;</span>
          Optional
        </summary>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          <div className="md:col-span-2">
            <label htmlFor="website" className={labelClass}>
              Website
            </label>
            <Input id="website" name="website" type="url" maxLength={200} autoComplete="url" inputMode="url" placeholder="https://" />
          </div>
          <div>
            <label htmlFor="requesterName" className={labelClass}>
              Your name
            </label>
            <Input id="requesterName" name="requesterName" maxLength={80} autoComplete="name" />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <Input id="phone" name="phone" type="tel" maxLength={40} autoComplete="tel" inputMode="tel" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="trade" className={labelClass}>
              What the business does
            </label>
            <Input id="trade" name="trade" maxLength={120} autoComplete="off" />
          </div>
        </div>
      </details>

      {error && (
        <div role="alert" className="mt-6 text-red-700 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <div className="mt-8 flex flex-col items-center gap-4">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden="true" /> Sending
            </>
          ) : (
            "Build my preview"
          )}
        </Button>
        <p className="text-xs md:text-sm text-ink/60 font-sans text-center">
          We use this only to research and build your preview and to email it to you. No calls, no newsletter.
        </p>
      </div>
    </form>
  );
}
