# Agent Rules

- If any changes occur that impact the sitemap or AI crawling mappers, like new pages or removed pages, the appropriate files (`sitemap.xml`, `llms.txt`, `llms-full.txt`, etc.) must be modified to match the current site layout.
- The main site sells fractional CIO work (see `WEBSITE-BRIEF.md`). After any copy change, run `npm run build` then `npm run check:copy`; it scans the built `out/` folder and fails on retired integration-era terms, banned words, and "web design" anywhere but the footer. The deploy runs the same check. Do not widen its allowlist without Nic's approval.
