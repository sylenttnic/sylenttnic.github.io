#!/usr/bin/env node
/* account-start-paid-test (W34, row 58 (e), row 131): the "start paid now" section of the account page, in Chromium, with the
   Worker (clients.sylentt.com) answered by page.route. No real session, business or Stripe object is touched.
     npm run build && node scripts/account-start-paid-test.mjs              (serves out/ on a local port)
     node scripts/account-start-paid-test.mjs --base https://sylentt.com    (the served site; the Worker still mocked)
   Arms, each able to fail (C4: against a build without the section, arms 2 to 8 fail):
     1. the served words equal the checked words (runs/client-launch/copy/W34-start-paid-words.md, decision-critic APPROVE WITH
        CHANGES 2026-11-24, its rewordings applied);
     2. in the trial: the offer and the button; pressing it shows the confirm step and sends NOTHING;
     3. "Keep my free days" closes it and sends nothing;
     4. the confirm press sends one POST /owner/start-paid with the session, and a pending-sync answer shows the pending line;
     5. each recorded outcome shows its own line with the date (declined, no-card, refused), and the offer again;
     6. C3: an `ended` result shows the ended line and no button, on a trial or paying plan; a pending ask shows pending, no button;
     7. C3: not in the trial, or no trial end: no section at all (no {date} line ever renders blank);
     8. the Worker's refusals show their own lines (not-available with the date, not-in-trial, not-ready, a 500 as failed). */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argBase = (() => { const i = process.argv.indexOf('--base'); return i > 0 ? process.argv[i + 1] : null; })();
const { WORDS } = await import(pathToFileURL(path.join(ROOT, 'app/webdesign/account/words.ts')).href).catch(async () => {
  const src = fs.readFileSync(path.join(ROOT, 'app/webdesign/account/words.ts'), 'utf8');
  return { WORDS: JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1)) };
});
const SP = WORDS.start_paid;
const TRIAL_END = '2026-12-14T18:00:00Z';
const D = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Denver' }).format(new Date(TRIAL_END));
const ACCOUNT = { name: 'Start Paid Test Co', ready: true, plan: 'trial', trial_ends: TRIAL_END, design: 1, site_url: 'https://example.com/', requests: [], start_paid: null, start_paid_pending: false };
const withDate = (s) => s.replace('{date}', D);

let bad = 0; const say = (ok, what) => { if (!ok) bad++; console.log(`${ok ? '  ok  ' : '  FAIL'} ${what}`); };

{ // 1: the served words are the checked words
  const rec = fs.readFileSync(path.join(ROOT, '..', 'sylentt-smb-site-generation', 'runs/client-launch/copy/W34-start-paid-words.md'), 'utf8');
  const checked = JSON.parse('{' + /```ts\n([\s\S]*?)\n```/.exec(rec)[1] + '}').start_paid;
  say(JSON.stringify(checked) === JSON.stringify(SP), 'the words the section shows equal the checked words record');
  say(JSON.stringify({ ...checked, heading: 'x' }) !== JSON.stringify(SP), 'a record one word off reads as different (negative)');
}

function serve(dir) {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
  const srv = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const f = path.join(dir, p);
    if (!f.startsWith(dir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'content-type': types[path.extname(f)] ?? 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
  });
  return new Promise((ok) => srv.listen(0, '127.0.0.1', () => ok(srv)));
}
async function open(browser, base, { account = ACCOUNT, press = { status: 200, body: { ok: true, recorded: 'pending-sync', at: 1 } } } = {}) {
  const page = await browser.newPage();
  const calls = [];
  await page.addInitScript(() => { try { sessionStorage.setItem('sylentt-owner-session', 'sess-good'); } catch { /* none */ } });
  await page.route('https://clients.sylentt.com/**', async (route) => {
    const rq = route.request(); const u = new URL(rq.url());
    const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET, POST' };
    if (rq.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
    calls.push({ path: u.pathname, method: rq.method(), auth: rq.headers().authorization });
    const json = (status, body) => route.fulfill({ status, contentType: 'application/json', headers: cors, body: JSON.stringify(body) });
    if (rq.headers().authorization !== 'Bearer sess-good') return json(401, { error: 'not signed in' });
    if (u.pathname === '/owner/account') return json(200, account);
    if (u.pathname === '/owner/start-paid') return json(press.status, press.body);
    return json(404, {});
  });
  await page.goto(`${base}/webdesign/account/`);
  await page.waitForLoadState('networkidle').catch(() => {});
  return { page, calls, sec: page.locator('[data-start-paid]') };
}
const text = async (loc) => (await loc.count()) ? (await loc.innerText()) : '';
const presses = (calls) => calls.filter((c) => c.path === '/owner/start-paid').length;

const srv = argBase ? null : await serve(path.join(ROOT, 'out'));
const base = argBase ?? `http://127.0.0.1:${srv.address().port}`;
const browser = await chromium.launch();
try {
  { // 2, 3, 4
    const { page, calls, sec } = await open(browser, base);
    const t = await text(sec);
    say(t.includes(withDate(SP.offer)) && (await sec.getByRole('button', { name: SP.button_label }).count()) === 1, 'in the trial: the offer with its date, and the button');
    await sec.getByRole('button', { name: SP.button_label }).click();
    const c = await text(sec);
    const all = [SP.confirm.title, SP.confirm.charge, withDate(SP.confirm.ends), SP.confirm.tweaks, SP.confirm.not_through, SP.confirm.card, SP.confirm.cancel];
    say(all.every((w) => c.includes(w)) && presses(calls) === 0, 'the first press shows every confirm line and sends nothing');
    await sec.getByRole('button', { name: SP.confirm.back_button }).click();
    say(!(await text(sec)).includes(SP.confirm.title) && presses(calls) === 0, '"Keep my free days" closes the confirm step and sends nothing');
    await sec.getByRole('button', { name: SP.button_label }).click();
    await sec.getByRole('button', { name: SP.confirm.confirm_button }).click();
    await page.waitForLoadState('networkidle').catch(() => {});
    const sent = calls.filter((x) => x.path === '/owner/start-paid');
    say(sent.length === 1 && sent[0].method === 'POST' && sent[0].auth === 'Bearer sess-good', 'the confirm press sends one POST /owner/start-paid with the session');
    await page.getByText(SP.pending).waitFor({ timeout: 5000 }).catch(() => {});
    const after = await text(sec);
    say(after.includes(SP.pending) && (await sec.getByRole('button', { name: SP.button_label }).count()) === 0, 'a pending-sync answer shows the pending line and no button');
    await page.close();
  }
  for (const r of ['declined', 'no-card', 'refused', 'processing']) { // 5
    const { page, sec } = await open(browser, base, { account: { ...ACCOUNT, start_paid: { at: 5, result: r } } });
    const t = await text(sec);
    say(t.includes(withDate(SP.results[r])) && t.includes(withDate(SP.offer)) && !t.includes('{date}'), `a recorded ${r} shows its own line, dated, and the offer again`);
    await page.close();
  }
  for (const plan of ['trial', 'paying']) { // 6
    const { page, sec } = await open(browser, base, { account: { ...ACCOUNT, plan, trial_ends: plan === 'trial' ? TRIAL_END : null, start_paid: { at: 5, result: 'ended' } } });
    const t = await text(sec);
    say(t.includes(SP.results.ended) && (await sec.getByRole('button').count()) === 0 && !t.includes(SP.offer.slice(0, 20)), `C3: ended on a ${plan} plan shows the ended line and no button`);
    await page.close();
  }
  { const { page, sec } = await open(browser, base, { account: { ...ACCOUNT, start_paid_pending: true } });
    const t = await text(sec);
    say(t.includes(SP.pending) && (await sec.getByRole('button').count()) === 0, 'C3: an ask still waiting shows the pending line and no button');
    await page.close(); }
  for (const [what, acct] of [['paying, no start-paid', { ...ACCOUNT, plan: 'paying', trial_ends: null }], ['trial with no trial end', { ...ACCOUNT, trial_ends: null, start_paid: { at: 5, result: 'declined' } }], ['no plan', { ...ACCOUNT, plan: null }], ['not ready', { ...ACCOUNT, ready: false }], ['ended but the plan unknown', { ...ACCOUNT, plan: null, start_paid: { at: 5, result: 'ended' } }]]) { // 7
    const { page, sec } = await open(browser, base, { account: acct });
    say((await sec.count()) === 0, `C3: ${what}: no start-paid section (negative)`);
    await page.close();
  }
  for (const [status, body, line] of [[404, { ok: false, reason: 'not-available' }, withDate(SP.press.not_available)], [409, { ok: false, reason: 'not-in-trial' }, SP.results['not-in-trial']], [409, { ok: false, reason: 'not-ready' }, SP.press.not_ready], [500, {}, SP.press.failed]]) { // 8
    const { page, sec } = await open(browser, base, { press: { status, body } });
    await sec.getByRole('button', { name: SP.button_label }).click();
    await sec.getByRole('button', { name: SP.confirm.confirm_button }).click();
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.getByText(line).waitFor({ timeout: 5000 }).catch(() => {});
    say((await text(sec)).includes(line) && !(await text(sec)).includes(SP.confirm.title), `the Worker's ${status} ${body.reason ?? ''} shows its own line`);
    await page.close();
  }
} finally { await browser.close(); srv?.close(); }
console.log(bad ? `account-start-paid-test: ${bad} FAILED` : 'account-start-paid-test: all arms hold');
process.exitCode = bad ? 1 : 0;
