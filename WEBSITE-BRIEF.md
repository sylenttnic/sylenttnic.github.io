# Sylentt.com Brief: Fractional CIO for Cache Valley

This is the brief the main site was rewritten from on 2026-10-05. It replaces the earlier business-app integration brief. The approved copy lives in the site itself (`app/page.tsx`, `app/services/page.tsx`, `app/pricing/`, `components/FitAssessment.tsx`, `lib/offer.ts`). `npm run check:copy` enforces the "Do not include" list against the built site, and the deploy runs it too.

## Positioning

Fractional IT & AI leadership for Cache Valley companies with roughly 20 to 150 employees that have an MSP for helpdesk but no one steering IT. Nic Aslett (owner) was VP of IT at Fortidia, IT Manager at Charter Communications (leading a 40-person QA team), Release Train Engineer at Liqid, and is currently fractional CTO for edZOOcation. Sell the leader, not the engineer.

## Preserve

- All existing URLs. `/`, `/services/`, `/pricing/` stay. `/webdesign/` stays live and unchanged but is linked from the footer only. No redirects.
- Calendly link (calendly.com/nic-sylentt/30min), contact@sylentt.com, GTM container, headshot at /about/nic.jpg, LinkedIn/Instagram/Facebook footer links, logo assets.
- The quiz component and its mechanics.
- Site structure and component library. No restructuring, no new dependencies.
- The ai-content-description meta pattern, describing the current offer with a footer-level web design mention.

## Voice

First person ("I"), not "we". Sylentt Partners remains the business name; the site makes clear the client works with Nic directly and that this is the point. Plain English an owner of a 60-person manufacturer or dental group reads in 90 seconds on a phone. Confident, specific, no hype. Short sentences.

**No em dashes (—), ever, anywhere the site serves.** That covers page copy, meta tags, JSON-LD, llms files, sitemap comments, and the `/webdesign/` demo sites including their code comments. Use a comma, a colon, a period or parentheses. `npm run check:copy` fails the build on any em dash. Nic's rule.

## Hero

"An IT director, without the salary." / "Part-time IT and AI leadership for Cache Valley companies. From $1,500 a month." The hero answers why the visitor is here: this is what you get, and this is what it costs. Keep it that short.

## Offer

1. **Assessment** (2 weeks, one fixed price). Inventory every system, subscription, vendor and risk; find where AI fits and where it doesn't; deliver a 12-month plan and present it in person. Deliverables are listed in `lib/offer.ts` and include a one-page AI policy.
2. **Retainer.** Nic becomes the client's IT director for a set number of hours a month: runs the roadmap, manages the MSP and vendors, makes the decisions, answers the questions.
3. **You own everything.** Documentation, roadmap, policies, vendor relationships: all the client's, in their accounts, from day one.

What Nic doesn't do: helpdesk, hardware repair, after-hours support, building software (he chooses and manages who does).

## Pricing

Fixed and published, no "contact for quote". Source of truth: `lib/offer.ts`.

**Make it as plain as a drive-through menu.** A visitor should understand every option without contacting Nic. Few options, each one price and a short list of what you get, and every question about hours answered on the page. Do not add tiers, add-ons or conditions that need explaining.

How the prices were set (2026-10-05): from published averages for fractional CIO and MSP vCIO work (fractional CIO roughly $150 to $300 an hour; small-business retainers roughly $1,500 to $5,000 a month; small-business IT assessments roughly $2,000 to $5,000), weighted down for a small community and for clients that are not tech companies. The assessment is priced low on purpose, as the way in for a new client.

- IT & AI Assessment: $1,500, one time. 2 weeks. If the client continues, the $1,500 comes off the first month.
- Advisor: $1,500 a month. Up to 8 hours.
- Director: $2,500 a month. Up to 16 hours.
- "Month-to-month. 30 days' notice. Everything I produce is yours."
- Hours cover meetings, email, and work done for the client. Extra hours are $150 each, only if the client says yes first. Unused hours don't carry over.

## Proof

Shown under the label "Results from IT teams I've led", written as past results, with "Past results from teams I led, not a promise" underneath. Never word them as something a client will get.

- 100% on-time project delivery, as a rolling average, after introducing real project management to a 16-person IT department
- 80% faster ticket resolution: from 150 hours to 30
- SLA adherence doubled: from 40% to 80%

## Testimonials

Use exact words only, trimming with ellipses, never rewording. Current set: Ladan Rostami, Michael Kingsolver, Chris Gregoire, Randall Syfert (see `app/page.tsx`). Use initials as the avatar fallback where no image exists.

By Light was not a client. Do not present it as one. It appears only as Randall Syfert's employer.

## SEO

Title: "Sylentt Partners | Fractional CIO for Cache Valley Companies". Keywords: fractional CIO Cache Valley, fractional IT director Logan Utah, part-time IT director, AI consultant Logan Utah, IT leadership Utah. Keep `sitemap.xml`, `llms.txt` and `llms-full.txt` matching the site (see `AGENTS.md`).

## Do not include

- Serverless, integration, pipelines, APIs, Zapier, tool-name lists, "connect your apps", "copy-paste" framing
- "Engineer" as identity or any "I build systems" framing
- "We" as if there is a team
- Web design anywhere but the footer link
- Helpdesk, 24/7, or support promises; "unlimited" without "by email"
- AI hype: transform, revolutionize, AI-powered, cutting-edge
- Jargon: vCIO, stack, SaaS sprawl, digital transformation, synergy
- "Trusted by" logos; "custom quote"; annual commitments
- Certifications (SAFe) anywhere above the footer
- The anonymized "education company" case study (now named edZOOcation)

The check allows four exact phrases from the approved copy that contain a listed word: "Release Train Engineer", "thoughtfully integrate AI", "Shopify Plus education company" and "he transformed how we delivered". Do not add to that list without Nic's approval.

## Implementation decisions (2026-10-05, approved by Nic)

- `/services/agents/` (the integration build-process page) was moved to `_suppressed/` and removed from the sitemap. Its URL 404s.
- The floating chat is off everywhere (`CHAT_ENABLED` in `components/Layout.tsx`). Its replies come from the bot on intake.sylentt.com, whose script is outside this repo and must be rewritten for this offer before the chat is switched back on.
- The quiz has no lead form. Completion sends one anonymous GA4 event, `it_check_complete`, with the result pattern and answers.
- The `/pricing/` inquiry form was removed; every plan books a 30-minute call on Calendly.
- On `/webdesign/` pages, the nav link back to sylentt.com reads "Main site".

## Changes approved by Nic (2026-10-05, second round)

- Hero rewritten to "An IT director, without the salary."
- Proof numbers labeled and worded as past results; the 100% figure is a rolling average.
- Charter: "leading a 40-person QA team".
- Audience narrowed to about 20 to 150 people.
- Pricing simplified and lowered (see Pricing). Hours rules published under the plans.
- Em dashes removed from everything the site serves, and the check enforces it. The `/webdesign/` demo sites are generated in Nic's separate pipeline repo, which needs the same rule or the next sample update will fail this deploy check.
