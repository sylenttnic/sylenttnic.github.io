"use client";

/**
 * RequestFormChooser
 *
 * WITH THE FLAG OFF THIS IS EXACTLY THE OLD FORM. It returns
 * <PreviewRequestForm /> with no wrapper, no extra element and no extra state,
 * so /webdesign renders what it rendered before this file existed. That is the
 * default, and it is how the page ships until Nic opens the path.
 *
 * WITH NEXT_PUBLIC_NO_PRESENCE_ENABLED="true" (a repository variable read at
 * build time, exactly as NEXT_PUBLIC_INTAKE_API_KEY is) the visitor is asked one
 * question first — are you online? — and a business that is not gets the
 * questionnaire instead of the research form.
 *
 * THE CLASS IS DECLARED BY THE VISITOR, never inferred (standards/
 * intake-questionnaire.md §2.0 in sylenttnic/sylentt-smb-site-generation). The
 * default answer is "online", so a visitor who does nothing gets the research
 * form they would have got before — Nic, 2026-09-22: "If they have an online
 * presence and just add the few answers, we do the research - that method
 * cannot break."
 *
 * Going live needs BOTH switches: this variable, and the intake Lambda's SSM
 * `webdesign-no-presence-enabled`. With only this one on, a no-presence
 * submission is refused by the Lambda and the visitor sees the error text.
 */
import { useState } from "react";
import PreviewRequestForm from "./PreviewRequestForm";
import NoPresenceForm from "./NoPresenceForm";

const ENABLED = process.env.NEXT_PUBLIC_NO_PRESENCE_ENABLED === "true";

const optionClass =
  "flex-1 flex items-center gap-3 min-h-[56px] rounded-lg border px-4 py-3 cursor-pointer text-base font-medium transition-colors " +
  "has-[:checked]:border-accent has-[:checked]:bg-accent/5 border-ink/15 text-ink/90 hover:border-ink/30 " +
  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/40";

export default function RequestFormChooser() {
  const [online, setOnline] = useState(true);
  if (!ENABLED) return <PreviewRequestForm />;

  return (
    <div>
      <fieldset className="max-w-2xl mx-auto mb-6 px-1">
        <legend className="font-sans text-base md:text-lg font-medium text-ink mb-3">
          Can people find your business online today, on a website or a Google, Facebook or Yelp listing?
        </legend>
        <div className="flex flex-col sm:flex-row gap-3">
          <label className={optionClass}>
            <input type="radio" name="presence" value="online" checked={online} onChange={() => setOnline(true)} className="h-5 w-5 accent-accent" />
            Yes, we are online
          </label>
          <label className={optionClass}>
            <input type="radio" name="presence" value="none" checked={!online} onChange={() => setOnline(false)} className="h-5 w-5 accent-accent" />
            No, not yet
          </label>
        </div>
      </fieldset>
      {online ? <PreviewRequestForm /> : <NoPresenceForm />}
    </div>
  );
}
