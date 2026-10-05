#!/usr/bin/env node
// Fails the build if retired copy is back on the main site.
//
// sylentt.com was repositioned (2026-10-05) from business-app integration and a
// web design plan to fractional CIO work. This scans the BUILT site in out/ (run
// it after `next build`) for the integration-era terms and the words the
// repositioning brief bans, so they cannot drift back in through a component,
// a meta tag, JSON-LD, llms.txt or a client-side string.
//
// Scope: every built file except /webdesign/ and everything under it, and except
// JS chunks that only /webdesign/ pages load. /webdesign/ is a separate offer
// that keeps its own copy.
//
// Usage: node scripts/check-copy.mjs [outDir]    (default: out)
// Exit code 1 on any hit, or if the build output looks incomplete.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = process.argv[2] ?? "out";

// The brief's banned list. Checked against the raw text of every file in scope,
// JS included.
const BANNED = [
  /serverless/i,
  /integrat\w*/i,
  /pipelines?/i,
  /\bAPIs?\b/, // case-sensitive: "api" appears in lowercase identifiers
  /zapier/i,
  /shopify/i,
  /quickbooks/i,
  /stripe/i,
  /hubspot/i,
  /copy-paste/i,
  /copy(ing)? and past(e|ing)/i,
  /copying data/i,
  /engineer\w*/i,
  /\bwe build\b/i,
  /\bwe connect\b/i,
];

// The brief's "do not include" list. Checked against visible text, meta tags,
// JSON-LD and prose strings only, because words like "transform" and "stack"
// are also CSS and JS identifiers.
const DO_NOT_INCLUDE = [
  /trusted by/i,
  /custom quote/i,
  /24\/7/,
  /\bvCIO\b/i,
  /\bstack\b/i,
  /saas sprawl/i,
  /digital transformation/i,
  /synerg\w*/i,
  /(?<![-\w])transform\w*/i,
  /revolutioni[sz]\w*/i,
  /ai-powered/i,
  /cutting-edge/i,
  /annual commitment/i,
];

// Web design may appear on the main site in the footer only. The exceptions:
// the footer itself, the ai-content-description meta tag (it ships on every
// page, /webdesign/ included), and the "Elsewhere on this site" section that
// closes llms.txt and llms-full.txt.
const WEB_DESIGN = /web[ -]design/gi;
const FOOTER_LABEL = '"Web design"'; // the footer link's text, as it sits in JS

// Exact phrases from the brief's own approved copy that contain a listed term.
// Nothing else is exempt. Keep this list short and exact.
const ALLOWED_PHRASES = [
  "Release Train Engineer", // Experience line: a job title, not an identity
  "thoughtfully integrate AI", // Ladan Rostami's testimonial, verbatim
  "Shopify Plus education company", // Currently: edZOOcation
  "he transformed how we delivered", // Chris Gregoire's testimonial, verbatim
];

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files.push(...walk(p));
    else files.push(p);
  }
  return files;
}

const rel = (p) => relative(OUT, p).split(sep).join("/");
const isWebDesign = (r) => r === "webdesign" || r.startsWith("webdesign/");
const stripAllowed = (text) =>
  ALLOWED_PHRASES.reduce((t, phrase) => t.split(phrase).join(" "), text);
const chunkRefs = (text) =>
  new Set([...text.matchAll(/static\/chunks\/[^"'\s\\]+?\.js/g)].map((m) => `_next/${m[0]}`));

function context(text, index, length) {
  const start = Math.max(0, index - 50);
  return text.slice(start, index + length + 50).replace(/\s+/g, " ").trim();
}

function visibleText(html) {
  const jsonLd = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => m[1]);
  const attrs = [...html.matchAll(/\s(?:content|alt|aria-label|title|placeholder)="([^"]*)"/g)]
    .map((m) => m[1]);
  const body = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
  return [body, ...attrs, ...jsonLd].join("\n").replace(/&#x27;|&apos;/g, "'").replace(/&amp;/g, "&");
}

// Minified JS keeps copy in double-quoted literals. Prose looks like a
// sentence: starts with a capital and ends with sentence punctuation.
const proseLiterals = (js) =>
  [...js.matchAll(/"((?:[^"\\\n]|\\.){12,})"/g)]
    .map((m) => m[1])
    .filter((s) => /^[A-Z“]/.test(s) && /[.?!”]$/.test(s) && s.includes(" "))
    .join("\n");

// ---------------------------------------------------------------------------

if (!existsSync(OUT)) {
  console.error(`check-copy: ${OUT}/ does not exist. Run \`next build\` first.`);
  process.exit(1);
}

const all = walk(OUT);
const textFiles = all.filter((p) => /\.(html|txt|xml|json)$/.test(p));
const mainPages = textFiles.filter((p) => !isWebDesign(rel(p)));
const webDesignPages = textFiles.filter((p) => isWebDesign(rel(p)) && /\.(html|txt)$/.test(p));

// A chunk is out of scope only if /webdesign/ pages load it and no main-site
// page does. Every other chunk (including any no page names) is scanned.
const mainRefs = new Set();
for (const p of mainPages) for (const r of chunkRefs(readFileSync(p, "utf8"))) mainRefs.add(r);
const webDesignRefs = new Set();
for (const p of webDesignPages) for (const r of chunkRefs(readFileSync(p, "utf8"))) webDesignRefs.add(r);
const jsFiles = all
  .filter((p) => p.endsWith(".js") && !isWebDesign(rel(p)))
  .filter((p) => mainRefs.has(rel(p)) || !webDesignRefs.has(rel(p)));

// Absence is not a pass: the pages this check exists for must be there.
const required = ["index.html", "services/index.html", "pricing/index.html", "llms.txt", "llms-full.txt", "sitemap.xml"];
const missing = required.filter((r) => !existsSync(join(OUT, r)));
if (missing.length || jsFiles.length === 0) {
  console.error(`check-copy: build output looks incomplete. Missing: ${missing.join(", ") || "JS chunks"}`);
  process.exit(1);
}

const hits = [];
const report = (file, rule, text, match) =>
  hits.push(`${file}  [${rule}]  "${match[0]}"  …${context(text, match.index, match[0].length)}…`);

function checkPatterns(file, rule, patterns, text) {
  for (const re of patterns) {
    const g = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
    for (const m of text.matchAll(g)) report(file, rule, text, m);
  }
}

for (const p of mainPages) {
  const file = rel(p);
  const raw = readFileSync(p, "utf8");
  const text = stripAllowed(raw);
  checkPatterns(file, "banned", BANNED, text);

  let prose;
  if (p.endsWith(".html")) prose = stripAllowed(visibleText(raw));
  else if (/(^|\/)llms(-full)?\.txt$/.test(file) || p.endsWith(".xml")) prose = text;
  if (prose) checkPatterns(file, "do-not-include", DO_NOT_INCLUDE, prose);

  // Web design: remove the places it is allowed, then nothing may remain.
  let wd = text;
  if (p.endsWith(".html")) {
    wd = wd
      .replace(/<script(?![^>]*application\/ld\+json)[\s\S]*?<\/script>/g, " ")
      .replace(/<footer[\s\S]*?<\/footer>/g, " ")
      .replace(/<meta name="ai-content-description"[^>]*>/g, " ");
  } else if (/(^|\/)llms(-full)?\.txt$/.test(file)) {
    const i = wd.indexOf("\n## Elsewhere on this site");
    if (i === -1) hits.push(`${file}  [web-design]  missing the "## Elsewhere on this site" section`);
    else wd = wd.slice(0, i);
  } else if (p.endsWith(".txt")) {
    wd = wd.replace(/"name":"ai-content-description","content":"(?:[^"\\]|\\.)*"/g, " ");
  }
  checkPatterns(file, "web-design outside footer", [WEB_DESIGN], wd);
}

for (const p of jsFiles) {
  const file = rel(p);
  const text = stripAllowed(readFileSync(p, "utf8"));
  checkPatterns(file, "banned", BANNED, text);
  checkPatterns(file, "do-not-include", DO_NOT_INCLUDE, proseLiterals(text));
  checkPatterns(file, "web-design outside footer", [WEB_DESIGN], text.split(FOOTER_LABEL).join(" "));
}

console.log(
  `check-copy: scanned ${mainPages.length} page/data files and ${jsFiles.length} JS chunks in ${OUT}/ ` +
    `(skipped /webdesign/ and ${[...webDesignRefs].filter((r) => !mainRefs.has(r)).length} chunks only it loads).`
);
if (hits.length) {
  console.error(`check-copy: ${hits.length} retired or banned term(s) found:\n`);
  for (const h of hits) console.error(`  ${h}`);
  process.exit(1);
}
console.log("check-copy: clean.");
