# Agent Rules

- If any changes occur that impact the sitemap or AI crawling mappers, like new pages or removed pages, the appropriate files (`sitemap.xml`, `llms.txt`, `llms-full.txt`, etc.) must be modified to match the current site layout.
- The main site sells fractional CIO work (see `WEBSITE-BRIEF.md`). After any copy change, run `npm run build` then `npm run check:copy`; it scans the built `out/` folder and fails on retired integration-era terms, banned words, and "web design" anywhere but the footer. The deploy runs the same check. Do not widen its allowlist without Nic's approval.
- Never use an em dash (—) in anything the site serves: page copy, meta tags, JSON-LD, llms files, sitemap comments, and the `/webdesign/` demo sites including their code comments. Use a comma, a colon, a period or parentheses instead. `npm run check:copy` fails on any em dash anywhere in `out/`.
- Prices, hours and plan inclusions live in `lib/offer.ts`. Keep pricing as plain as a drive-through menu (see `WEBSITE-BRIEF.md`); if a change would make a visitor need to ask what a plan includes, don't make it.
