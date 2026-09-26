"use client";

/**
 * NoPresenceForm
 *
 * The /webdesign request for a business with NO website and NO online
 * listing: there is nothing for us to research, so the owner answers the
 * questions and the preview is built from the answers (owner-decisions rows
 * 45-46 in sylenttnic/sylentt-smb-site-generation).
 *
 * Only rendered when the visitor says they are not online AND the build flag
 * NEXT_PUBLIC_NO_PRESENCE_ENABLED is "true" (see RequestFormChooser). It posts
 * JSON with `noPresence: true` — a real boolean, because the pipeline refuses
 * the string — and the answers in `intake`. The intake Lambda re-checks every
 * required answer, so the `required` attributes here are for the visitor's
 * benefit, not the guarantee.
 *
 * JavaScript only, by design: the research form (PreviewRequestForm) keeps its
 * no-script POST path untouched, and this questionnaire is long and
 * interactive. Ghost text is `placeholder`, never `value` (§2.6).
 */
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { SECTIONS, REQUIRED_BUSINESS, AUTHORITY_MAX, GHOST_BUSINESS, type Question } from "./intakeQuestions";

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

/* The 48 contiguous states plus DC — the same list PreviewRequestForm offers
   and the intake Lambda enforces. Copied rather than imported so the research
   form's file stays exactly as it was; a state missing here only means that
   business uses the research form, and one added here the Lambda refuses. */
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
const fieldClass = cn(
  "flex w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 text-base text-ink transition-colors",
  "placeholder:text-ink/40 focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
);
const selectClass = cn(fieldClass, "h-12 py-2");
const summaryClass =
  "cursor-pointer list-none inline-flex items-center min-h-[44px] font-sans text-base font-medium text-ink/90 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md";
const Req = () => <span className="text-accent" aria-hidden="true">*</span>;

const ERROR_TEXT = "That did not go through. Try again, or email support@sylentt.com.";

export default function NoPresenceForm() {
  const [formStartedAt, setFormStartedAt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [premises, setPremises] = useState("");
  const [picks, setPicks] = useState<Record<string, string[]>>({});
  const apiKey = process.env.NEXT_PUBLIC_INTAKE_API_KEY ?? "";

  useEffect(() => {
    setFormStartedAt(String(Date.now()));
  }, []);

  const togglePick = (q: Question, option: string, on: boolean) =>
    setPicks((p) => {
      const cur = p[q.key] ?? [];
      if (on && q.max_picks && cur.length >= q.max_picks) return p; // pick-2: ignore a third tick
      return { ...p, [q.key]: on ? [...cur, option] : cur.filter((o) => o !== option) };
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();

    /* A second number means nothing without the owner's own name for it, and
       the pipeline publishes it only with that label (dossier-schema §3.1). */
    const sec = field("intake_phone_secondary"), secLabel = field("intake_phone_secondary_label");
    if (Boolean(sec) !== Boolean(secLabel)) {
      setError("Give the second phone number and what you call it, or leave both blank.");
      return;
    }

    const intake: Record<string, string> = {};
    for (const s of SECTIONS) {
      for (const q of s.q) {
        /* Tick groups arrive joined: the pipeline records every answer as text
           and refuses any other shape. Free text keeps its own line breaks. */
        const v = q.control === "checks" ? (picks[q.key] ?? []).join(", ") : String(data.get(`intake_${q.key}`) ?? "").trim();
        if (v) intake[q.key] = v;
      }
    }
    if (data.get("intake_authority")) intake.authority = "Affirmed: I own this business or am authorised to request a site for it.";

    const payload = {
      noPresence: true,
      businessName: field("businessName"),
      city: field("city"),
      state: field("state"),
      phone: field("phone"),
      trade: field("trade"),
      email: field("email"),
      requesterName: field("requesterName"),
      formStartedAt: field("formStartedAt"),
      company_url: field("company_url"),
      intake,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(INTAKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "website-api-key": apiKey },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        setError(ERROR_TEXT);
      } else {
        const eventID = newEventID();
        window.fbq && window.fbq('track', 'Lead', {}, { eventID });
        setIsSuccess(true);
      }
    } catch {
      setError(ERROR_TEXT);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="lane-body p-8 md:p-10 max-w-2xl mx-auto border-ink/10" role="status" aria-live="polite">
        <h3 className="font-display text-3xl md:text-4xl font-bold text-ink mb-4">Got it.</h3>
        <p className="text-base md:text-lg text-ink/90 font-sans leading-relaxed">
          We will build your preview from your answers. It takes a little while; the link goes to the email address you gave, and if anything stops us we will tell you.
        </p>
      </div>
    );
  }

  const renderQuestion = (q: Question) => {
    const id = `intake_${q.key}`;
    if (q.showWhenPremisesNot && premises === q.showWhenPremisesNot) return null;

    if (q.control === "radio") {
      return (
        <fieldset key={q.key} className="md:col-span-2">
          <legend className={labelClass}>
            {q.label} {q.required && <Req />}
          </legend>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {(q.options ?? []).map((o, i) => {
              const [value, text] = Array.isArray(o) ? o : [o, o];
              return (
                <label key={value} className="inline-flex items-center gap-2 min-h-[44px] text-base text-ink/90">
                  <input
                    type="radio" name={id} value={value} required={q.required && i === 0}
                    onChange={q.key === "premises" ? (ev) => setPremises(ev.target.value) : undefined}
                    className="h-5 w-5 accent-accent"
                  />
                  {text}
                </label>
              );
            })}
          </div>
        </fieldset>
      );
    }

    if (q.control === "checks") {
      const cur = picks[q.key] ?? [];
      return (
        <fieldset key={q.key} className="md:col-span-2">
          <legend className={labelClass}>{q.label}</legend>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {(q.options ?? []).map((o) => {
              const opt = Array.isArray(o) ? o[1] : o;
              const on = cur.includes(opt);
              return (
                <label key={opt} className="inline-flex items-center gap-2 min-h-[44px] text-base text-ink/90">
                  <input
                    type="checkbox" checked={on}
                    disabled={!on && !!q.max_picks && cur.length >= q.max_picks}
                    onChange={(ev) => togglePick(q, opt, ev.target.checked)}
                    className="h-5 w-5 accent-accent"
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        </fieldset>
      );
    }

    const common = { id, name: id, maxLength: q.max, required: q.required, placeholder: q.ghost, className: fieldClass };
    return (
      <div key={q.key} className="md:col-span-2">
        <label htmlFor={id} className={labelClass}>
          {q.label} {q.required && <Req />}
        </label>
        {q.control === "textarea" ? (
          <textarea {...common} rows={q.rows ?? 3} />
        ) : (
          <Input
            {...common}
            type={q.control === "email" ? "email" : q.control === "tel" ? "tel" : q.control === "url" ? "url" : "text"}
            inputMode={q.inputMode}
          />
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="lane-body p-6 md:p-10 max-w-2xl mx-auto border-ink/10">
      <input type="hidden" name="formStartedAt" value={formStartedAt} readOnly />
      <div className="absolute left-[-10000px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="np_company_url">Leave this field empty</label>
        <input type="text" id="np_company_url" name="company_url" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <p className="text-base text-ink/80 font-sans mb-6">
        With nothing online for us to look up, we build from what you tell us. The starred questions are the ones we need; the rest help the site sound like you. The grey examples are from a made-up business, so write your own answers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label htmlFor="np_businessName" className={labelClass}>
            Business name, spelled the way you want it on the site <Req />
          </label>
          <Input id="np_businessName" name="businessName" required maxLength={120} autoComplete="organization" placeholder={GHOST_BUSINESS.name} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="np_trade" className={labelClass}>
            What kind of work do you do? <Req />
          </label>
          <Input id="np_trade" name="trade" required maxLength={REQUIRED_BUSINESS.trade} autoComplete="off" placeholder={GHOST_BUSINESS.trade} />
        </div>
        <div>
          <label htmlFor="np_city" className={labelClass}>
            City <Req />
          </label>
          <Input id="np_city" name="city" required maxLength={80} autoComplete="address-level2" />
        </div>
        <div>
          <label htmlFor="np_state" className={labelClass}>
            State <Req />
          </label>
          <select id="np_state" name="state" required defaultValue="" autoComplete="address-level1" className={selectClass}>
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
        <div>
          <label htmlFor="np_phone" className={labelClass}>
            Best number for customers <Req />
          </label>
          <Input id="np_phone" name="phone" type="tel" required maxLength={REQUIRED_BUSINESS.phone} autoComplete="tel" inputMode="tel" placeholder={GHOST_BUSINESS.phone} />
        </div>
        <div>
          <label htmlFor="np_email" className={labelClass}>
            Your email <Req />
          </label>
          <Input id="np_email" name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="np_requesterName" className={labelClass}>
            Your name
          </label>
          <Input id="np_requesterName" name="requesterName" maxLength={80} autoComplete="name" />
        </div>

        {SECTIONS[0].q.map(renderQuestion)}
      </div>

      {SECTIONS.slice(1).map((s) => (
        <details key={s.id} className="group mt-6 border-t border-ink/10 pt-4" open={s.open}>
          <summary className={summaryClass}>
            <span className="mr-2 transition-transform group-open:rotate-90" aria-hidden="true">&rsaquo;</span>
            {s.title} <span className="ml-2 text-sm text-ink/50">optional</span>
          </summary>
          {s.note && <p className="text-sm text-ink/60 font-sans mt-2">{s.note}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">{s.q.map(renderQuestion)}</div>
        </details>
      ))}

      <label className="mt-8 flex items-start gap-3 text-base text-ink/90">
        <input type="checkbox" name="intake_authority" value="yes" required className="mt-1 h-5 w-5 accent-accent" data-max={AUTHORITY_MAX} />
        <span>
          I own this business, or I am authorised to request a site for it. <Req />
        </span>
      </label>

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
          We use this only to build your preview and to email it to you. No calls, no newsletter.
        </p>
      </div>
    </form>
  );
}
