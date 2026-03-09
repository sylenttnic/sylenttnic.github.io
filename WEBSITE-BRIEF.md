# Sylentt Website Restructure Brief

## Purpose

This document is a creative brief and a direct implementation prompt for restructuring sylentt.com using Claude Code. It can be used as the primary instruction set for a Claude Code session operating on the site repo. Everything in this brief exists to answer one question a visitor should be able to answer within five seconds of landing on the site: **"What does this company do for me?"**

---

## Current Site Structure

The site currently has this page structure:

```
/ (homepage)
/services/ (standalone page with two service categories)
/services/process-ecosystems/ (Atlassian/Jira process improvement)
/services/automated-operations/ (n8n/AI automation, "Deploy your invisible employee" hook)
/services/automated-operations/agents/ (AI pipeline outline)
/about/ (company background)
```

---

## Page Disposition (What to Do With Each Page)

### REWRITE — These pages get new content

| Page | Action |
|---|---|
| `/` (homepage) | Full rewrite. Replace all existing content with new messaging per this brief. |
| `/services/` | Rewrite. Remove the two-category split. This page becomes a single focused page about connecting business apps. See "Page 2: Services" section below. |

### SUPPRESS — These pages get hidden but NOT deleted

| Page | Action |
|---|---|
| `/services/process-ecosystems/` | Hide from all navigation, menus, and internal links. Do not delete the files. The content stays in the repo but is inaccessible from the live site. No redirects needed since this is not indexed heavily. |
| `/services/automated-operations/` | Hide from all navigation. The new `/services/` page replaces this entirely. Do not delete the files. |
| `/services/automated-operations/agents/` | Hide from all navigation and remove all internal links pointing to it. Do not delete the files. This page describes internal methodology that should not be publicly visible going forward. |

### PRESERVE — These pages stay as-is for now

| Page | Action |
|---|---|
| `/about/` | No changes in this pass. Minor tone adjustments may come later. |

**How to suppress a page depends on the framework.** If the site uses a static generator, remove the page from the build output or set a `draft: true` flag if the framework supports it. If it is plain HTML with a shared nav component, remove the links from navigation and remove any internal links on other pages that point to suppressed pages. If it uses a router, remove the routes. Do not delete the source files regardless of framework. Commit the suppression as a distinct commit so it can be reversed cleanly.

---

## The Problem With the Current Site

The current sylentt.com positions Sylentt as a generalist consulting firm. The homepage and services page reference workplace transformation, employee evaluations, merger support, change management, KPI dashboards, cross-functional alignment workshops, and technical automation all at once. The language is broad ("innovative solutions," "fostering collaboration," "harnessing the power of smart automation") and does not tell a specific business owner what would actually change in their daily operations.

The automated-operations page leads with "Deploy your invisible employee," which sounds like every AI automation agency that launched in 2024 and 2025. It frames the offering around n8n and AI tooling rather than around the client's actual problem. That framing is being retired.

The testimonials are genuine and strong, but they reinforce a consulting/governance narrative rather than a concrete automation outcome.

A plumber, a Shopify store owner, or a dental office manager visiting this site today would not know whether Sylentt is going to help them connect QuickBooks to their scheduling app or run a six-week employee engagement workshop. That ambiguity costs every visitor who has a real, solvable problem.

---

## The New Positioning

Sylentt builds the connections between a business's software tools so their team stops being the manual bridge between systems.

Every small business runs on a handful of apps that do not talk to each other. Someone on the team (often the owner, often an office manager, often "whoever figured it out first") spends hours each week copying data between systems, double-checking that one app matches another, and discovering three days later that something fell through the cracks. Sylentt replaces that manual work with automated connections that are reliable, monitored, and owned by the client.

**Primary hook (above the fold):**
> Your business apps don't talk to each other. We fix that.

---

## Content to Remove Globally

Before writing any new content, search the entire site for the following and remove all instances:

- Any reference to **n8n** (the tool name, links to n8n, descriptions of n8n workflows)
- Any reference to "Deploy your invisible employee" or similar AI-agent-as-employee framing
- Any reference to the **agents/** page or AI pipeline outlines
- Any reference to **Atlassian, Jira, Confluence, or Bitbucket** on pages being rewritten (these references survive in the suppressed process-ecosystems page only)
- Any links in navigation, footers, CTAs, or body content that point to suppressed pages

---

## Site Structure After Restructure

```
/ (homepage — rewritten)
/services/ (rewritten as single focused page, renamed if framework allows: "what-we-build" or "how-we-help")
/about/ (preserved)

Hidden but still in repo:
/services/process-ecosystems/
/services/automated-operations/
/services/automated-operations/agents/
```

---

## Page 1: Homepage

**Section 1 — Hero (above the fold)**

The hook: "Your business apps don't talk to each other. We fix that."

One or two sentences of supporting context. Something like: "Your team spends hours copying data between apps, checking that one system matches another, and finding out days later when something slipped through the cracks. We build the wiring between your tools so that stops."

A single call to action. "Tell us what's broken" or "Let's talk about your apps" or similar. Not "Request a demo." Not "Schedule a consultation." Language that sounds like a conversation, not a sales funnel.

**Section 2 — Problem statements (not a services list)**

Three or four cards or blocks, each framed as a problem the visitor recognizes. These are not service descriptions. They are mirrors. The visitor should read one and think "that's me."

- "Your team re-enters the same data into multiple systems." When an order comes in, someone types it into the shipping app. When a payment clears, someone updates the books. When a new customer signs up, someone adds them to three different places. We make that happen automatically.

- "You find out something broke days after it happened." A subscription did not get created. An invoice did not sync. A fulfillment was missed. Nobody knew until a customer complained. We build monitoring that catches failures in real time and alerts before anyone notices.

- "You are paying for Zapier or Make and things still break." Those tools are rentals. They charge you more the busier you get. When a Zap fails at midnight, nobody knows. What we build, you own. It runs on your account. It retries automatically. It does not silently lose events.

- "You added a new tool and now nothing connects." Every new app creates a new island. We integrate it with everything else so it actually fits into your workflow instead of creating more manual work.

**Section 3 — How it works (three steps, disarmingly simple)**

Step 1: You tell us which apps your business uses and where the manual work lives. This is a conversation, not a six-month discovery engagement.

Step 2: We build the connections between those systems. When something happens in one app, the others update automatically. No copying. No checking. No hoping it worked.

Step 3: You own everything we build. It runs on your account. No monthly platform fees. No per-transaction charges. If we part ways tomorrow, you keep it all.

**Section 4 — Systems we work with**

A visual grid of app logos or names. The purpose is recognition. When a business owner sees the name of an app they use every day, the site becomes relevant to them personally.

Include: Shopify, QuickBooks, Stripe, Square, Recharge, HubSpot, ServiceTitan, Jobber, ShipStation, Xero, FreshBooks, Salesforce, Calendly, and others as appropriate. This is not a promise that every integration is pre-built. It is an honest statement that these are the types of systems you connect. If asked, you explain that some are ready to go and others get built as part of the engagement.

**Section 5 — One real example (anonymized)**

Tell the story of one engagement without naming the client. Keep it specific enough that a reader can see their own version of the problem.

Example direction: "An education company was manually creating customer subscriptions every time a specific type of order came in. A team member spent hours each week copying data between three different platforms. We built an automated pipeline that handles the entire workflow: when an order comes in, the subscription is created, the fulfillment system is notified, and the accounting records update. If anything fails, the system catches it and alerts instead of silently losing the order."

This paragraph will do more selling than any amount of abstract language about "innovative solutions."

**Section 6 — Testimonials (recontextualized)**

Keep the existing testimonials. They are real and they carry weight. But add a one-line context tag to each: "E-commerce company, subscription automation" or "Professional services firm, process redesign" or "Technology company, deployment pipeline." This grounds the quotes in something tangible so the reader can map them to their own industry.

**Section 7 — Call to action (bottom of page)**

Repeat the CTA from the hero. "Tell us what's broken." Keep it conversational.

---

## Page 2: Services (consider renaming to "What We Build" or "How We Help")

This page expands on the problem statements from the homepage. Each problem gets its own section with slightly more detail about what the solution looks like in practice. Still no technical jargon. Still framed from the client's perspective, not yours.

For each problem/solution:
- What the client is experiencing (the pain)
- What changes after Sylentt builds the connection (the outcome)
- What the client owns when it is done (the deliverable, in plain language)

End with a section on ongoing support: "After the initial build, we monitor the system, handle any changes from your software vendors, and add new connections as your business evolves. You are not locked in. You own everything. But most clients keep us around because the platform keeps saving them time."

---

## Writing Rules (Apply to All Pages)

**Voice:** Conversational, direct, warm, confident without being slick. Write like you are explaining what you do to a friend at a barbecue who just asked "so what does your company actually do?" Not like you are writing ad copy.

**Absolutely do not use any of these words or phrases:**
- Innovative solutions
- Cutting-edge
- Leverage / harness / utilize
- Revolutionize / transform (as marketing language)
- Seamless (unless you are being very specific about what is actually seamless)
- AI-powered (do not mention AI on the site at all)
- Smart automation (too vague)
- Empower
- Synergy / synergize
- Next-generation
- Disrupt / disruptive
- Unlock potential
- Best-in-class
- Robust
- Deploy your invisible employee (or any AI-as-worker framing)
- n8n (the tool name, anywhere on the live site)
- Intelligent automation
- Digital transformation

**Do not mention any of the following anywhere on the client-facing site:**
- AWS, Lambda, serverless, TypeScript, DynamoDB, SAM, CloudWatch, or any infrastructure term
- The Scaffold, the agent pipeline, or how the development process works internally
- The number of agents, how they are sequenced, or that they exist
- n8n, Make, or any specific tool used internally to deliver the work
- Anything about the underlying architecture

The client does not need to know how the work gets done. They need to know the work gets done, that it is reliable, and that they own the result.

**Formatting:**
- Short paragraphs. Two to three sentences max.
- No walls of text.
- Headers should be plain language, not clever. "How it works" not "Our methodology." "What you get" not "Deliverables."
- No em dashes. Use commas, semicolons, or separate sentences.

**Tone test:** Before publishing any section, read it out loud. If it sounds like it could appear on any of the hundreds of generic "automation agency" sites that popped up in 2024 and 2025, rewrite it. If it sounds like something a real person would say to another real person, keep it.

---

## What Makes Sylentt Different (Use This to Inform Copy, Not as Copy Itself)

These are the honest differentiators. Work them into the site naturally rather than listing them as bullet points.

1. **The client owns everything.** No proprietary platform lock-in. No monthly SaaS fee for the integration layer. The code runs on the client's account. If the relationship ends, they keep it all. This is the opposite of how most automation agencies work.

2. **Built-in reliability that Zapier and Make do not have.** Duplicate protection (the same event does not get processed twice). Automatic retries with backoff (a temporary API hiccup does not cause a permanent failure). Dead letter queues (failed events are captured, not lost). Real-time alerting (you know something broke before your customer does).

3. **The platform compounds.** Every integration built for one client makes the next client faster. This means faster delivery and lower cost without sacrificing quality. The business owner does not need to know this. But it explains why Sylentt can price competitively against agencies that start from scratch every time.

4. **Monitoring is included, not an upsell.** Every connection comes with alerting and failure detection. The client never has to wonder if their automations are still working. This is the single biggest complaint about Zapier/Make and the single biggest fear business owners have about "automation."

5. **You are hiring a person, not an agency.** For Cache Valley specifically, this matters. Small business owners want to talk to the person doing the work, not a sales rep who hands them off to a junior developer. Sylentt is a one-person operation backed by a platform that lets one person deliver like a team. Lean into the personal relationship without making it sound small.

---

## AI and Search Engine Crawlability

The current site returned 403 errors when accessed by AI tools (Claude, likely others). This is a problem for two reasons: AI assistants are increasingly how people discover and evaluate services, and search engines may penalize or deprioritize sites that block automated access.

**During this restructure, verify and fix the following:**

### robots.txt
Ensure `robots.txt` at the site root allows crawling by major bots. At minimum:

```
User-agent: *
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: https://sylentt.com/sitemap.xml
```

If you want to block AI training specifically while still allowing AI assistants to read and reference the site, you can add more granular rules. But the default should be open. A business site that wants to be discovered should not block the tools people use to discover businesses.

### Hosting/CDN Configuration
The 403 errors may not be from robots.txt. They could be from:
- Cloudflare or similar CDN bot protection rules that are too aggressive
- Server-side middleware that blocks non-browser user agents
- A WAF (web application firewall) rule that rejects requests without standard browser headers

Check the hosting platform's bot/security settings and ensure that known AI crawlers and search engine bots are not being blocked. If the site uses Cloudflare, check the Security settings and Bot Fight Mode. Bot Fight Mode is the most common cause of AI tools getting 403'd on small business sites. It can be set to allow verified bots while still protecting against malicious traffic.

### Meta Tags for AI
Add these meta tags to the `<head>` of every page to help AI tools understand and summarize the site correctly:

```html
<meta name="description" content="Sylentt connects your business apps so your team stops manually copying data between systems. Reliable automation you own, with built-in monitoring.">
<meta property="og:title" content="Sylentt - Your business apps don't talk to each other. We fix that.">
<meta property="og:description" content="We build the connections between your business tools so data flows automatically. No monthly platform fees. You own everything.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://sylentt.com">
```

Adjust per-page descriptions for `/services/` and `/about/`. Each page should have a unique, specific `description` meta tag.

### Structured Data (JSON-LD)
Add structured data to the homepage so search engines and AI tools can identify Sylentt as a local service business:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Sylentt",
  "url": "https://sylentt.com",
  "description": "Business app integration and automation for small companies. We connect your tools so your team stops manually copying data between systems.",
  "areaServed": {
    "@type": "Place",
    "name": "Cache Valley, Utah"
  },
  "serviceType": ["Business Automation", "Software Integration", "API Integration"]
}
```

Update the `areaServed` if you want to serve clients beyond Cache Valley. This structured data helps AI assistants give accurate answers when someone asks "who does business automation in Cache Valley" or similar.

### Sitemap
Ensure a `sitemap.xml` exists at the site root listing all live (non-suppressed) pages with `lastmod` dates. Suppressed pages should not appear in the sitemap.

---

## Target Audience for Cache Valley

When writing copy, imagine these specific people reading it:

- A Shopify store owner in Logan who has someone on the team manually entering orders into QuickBooks every afternoon
- A dental office manager in Smithfield who exports patient data from their scheduling app and re-enters it into their billing system
- A property management company in North Logan that uses one tool for maintenance requests, another for tenant communication, and a third for accounting, and none of them sync
- A contractor in Hyrum whose dispatcher uses Jobber for scheduling and then manually creates invoices in a completely separate system
- An ag supplier in Tremonton whose inventory app does not talk to their ordering system, so stock counts are always wrong

These people do not search for "serverless integration platform." They search for "connect QuickBooks to Jobber" or "automate Shopify to ShipStation" or "stop manually entering data." The site needs to speak their language.

---

## Existing Content to Preserve

- All testimonials (with added context tags)
- The About page (no changes in this pass)
- The Sylentt brand identity (dark theme, typography, color palette)
- All suppressed page files (in repo, just hidden from navigation and build output)

## Existing Content to Remove From Live Pages

- The generalist services list (change management, employee evaluations, merger support, KPI dashboards, workshops, onboarding, etc.) on any rewritten page
- Any language about "transforming workplaces" or "fostering collaboration" on the homepage
- The current hero/mission statement
- "Deploy your invisible employee" and all related framing
- All n8n references, links, and descriptions
- All links to suppressed pages (process-ecosystems, automated-operations, agents)
- The two-category split on the services page

---

## Implementation Sequence for Claude Code

When implementing this brief, follow this order:

1. **Read the entire repo first.** Understand the framework, file structure, routing, and how navigation is built before touching anything. Report back what you find.
2. **Suppress pages.** Remove navigation links and hide suppressed pages from the build. Commit this as a standalone commit with message: `chore: suppress process-ecosystems, automated-operations, and agents pages`
3. **Fix crawlability.** Add or update robots.txt, meta tags, structured data, and sitemap. Commit: `chore: improve AI and search engine crawlability`
4. **Rewrite the homepage.** Follow the section-by-section structure in this brief. Commit: `feat: rewrite homepage with automation-focused messaging`
5. **Rewrite the services page.** Commit: `feat: rewrite services page as single focused offering`
6. **Global cleanup.** Search the entire codebase for any remaining references to n8n, "invisible employee," agents pipeline, or links to suppressed pages. Remove them. Commit: `chore: remove legacy messaging and dead links`

Each step should be a separate commit so any step can be reviewed or reverted independently.

---

## Final Gut Check

A visitor should leave sylentt.com knowing exactly three things:

1. Sylentt connects business apps that do not talk to each other.
2. What they build is reliable and the client owns it.
3. There is a real person behind it who actually builds the thing.

If the site communicates those three things clearly, it is doing its job. Everything else is supporting detail.
