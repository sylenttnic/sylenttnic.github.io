#!/usr/bin/env node
/* welcome-signin-test (W333): a sign-in lands on the account page. A page test in Chromium, with the Worker
   (clients.sylentt.com) answered by page.route, so no real token, session or business is touched.
     npm run build && node scripts/welcome-signin-test.mjs              (serves out/ on a local port)
     node scripts/welcome-signin-test.mjs --base https://sylentt.com    (the served site; the Worker still mocked)
   Arms, each able to fail (C4: run it against a build from before W333 and arm 1 fails, the page stays on
   "You are signed in"):
     1. a good #signin= lands on /webdesign/account/, signed in (the account page's own header for the business);
     2. a first-purchase arrival (#confirm=) still shows the welcome view and does not leave the page;
     3. a refused #signin= (401) shows the existing refusal and does not reach the account page;
     4. while the redirect runs the page carries one plain link to the account page, its label, and no "check your link"
        line (snapshotted by an init script as the link appears);
     5. if the browser refuses sessionStorage, the owner stays on the signed-in welcome view (decision-critic W333 F2). */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
// playwright is not a dependency of this site: it is the one installed on the machine (require resolves it, import does not)
const { chromium } = createRequire(import.meta.url)('playwright');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argBase = (() => { const i = process.argv.indexOf('--base'); return i > 0 ? process.argv[i + 1] : null; })();
const NAME = 'Welcome Test Co';
const ACCOUNT_JSON = { name: NAME, ready: true, plan: 'trial', trial_ends: '2026-12-14T00:00:00Z', design: 2, site_url: 'https://example.com/', requests: [] };
const INFO_JSON = { name: NAME, designs: [{ n: 1, url: 'https://example.com/v1/' }], picked: null };

let bad = 0; const say = (ok, what) => { if (!ok) bad++; console.log(`${ok ? '  ok  ' : '  FAIL'} ${what}`); };

function serve(dir) {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain' };
  const srv = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const f = path.join(dir, p);
    if (!f.startsWith(dir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'content-type': types[path.extname(f)] ?? 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
  });
  return new Promise((ok) => srv.listen(0, '127.0.0.1', () => ok(srv)));
}

/* the Worker, mocked: signin good/bad, confirm good, account and info for the session 'sess-good' */
async function mockWorker(page) {
  const calls = [];
  await page.route('https://clients.sylentt.com/**', async (route) => {
    const u = new URL(route.request().url()); const m = route.request().method(); calls.push(`${m} ${u.pathname}`);
    const json = (status, body) => route.fulfill({ status, contentType: 'application/json', headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' }, body: JSON.stringify(body) });
    if (m === 'OPTIONS') return route.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET, POST' } });
    const t = (() => { try { return JSON.parse(route.request().postData() ?? '{}').t; } catch { return null; } })();
    const authed = route.request().headers().authorization === 'Bearer sess-good';
    if (u.pathname === '/owner/signin') return t === 'good' ? json(200, { session: 'sess-good' }) : json(401, { error: 'bad link' });
    if (u.pathname === '/owner/confirm') return t === 'good' ? json(200, { session: 'sess-good' }) : json(401, { error: 'bad link' });
    if (u.pathname === '/owner/info') return authed ? json(200, INFO_JSON) : json(401, {});
    if (u.pathname === '/owner/account') return authed ? json(200, ACCOUNT_JSON) : json(401, {});
    return json(404, {});
  });
  return calls;
}

const srv = argBase ? null : await serve(path.join(ROOT, 'out'));
if (!argBase && !fs.existsSync(path.join(ROOT, 'out/webdesign/welcome/index.html'))) { console.error('welcome-signin-test: no out/ build; run npm run build first'); process.exit(2); }
const base = argBase ?? `http://127.0.0.1:${srv.address().port}`;
const welcome = `${base}/webdesign/welcome/`;
console.log(`welcome-signin-test against ${base}`);
const browser = await chromium.launch();
const settle = async (page, re) => { await page.waitForURL(re, { timeout: 15000 }).catch(() => {}); await page.waitForLoadState('networkidle').catch(() => {}); await page.waitForTimeout(800); };
try {
  { // 1
    const page = await browser.newPage(); const calls = await mockWorker(page);
    await page.goto(`${welcome}#signin=good`);
    await settle(page, /\/webdesign\/account\/$/);
    const h1 = await page.locator('h1').first().innerText().catch(() => '');
    const stored = await page.evaluate(() => sessionStorage.getItem('sylentt-owner-session')).catch(() => null);
    say(new URL(page.url()).pathname === '/webdesign/account/' && !new URL(page.url()).hash, `a good sign-in lands on /webdesign/account/ with no token in the address (at ${new URL(page.url()).pathname})`);
    say(h1 === `${NAME}: your account` && stored === 'sess-good' && calls.includes('GET /owner/account'), `...signed in: the account page read the session and shows the business ("${h1}")`);
    const body = await page.locator('main').innerText().catch(() => '');
    say(body.includes('You stay signed in on this tab for up to 24 hours, or until you close it.'), 'W344: the account page carries the 24-hour sign-in line');
    await page.close();
  }
  { // 2
    const page = await browser.newPage(); await mockWorker(page);
    await page.goto(`${welcome}#confirm=good`);
    await settle(page, /never/);
    const h1 = await page.locator('h1').first().innerText().catch(() => '');
    say(new URL(page.url()).pathname === '/webdesign/welcome/' && h1 === 'Thanks for confirming', `a first-purchase arrival keeps the welcome view ("${h1}")`);
    await page.close();
  }
  { // 3
    const page = await browser.newPage(); const calls = await mockWorker(page);
    await page.goto(`${welcome}#signin=expired`);
    await settle(page, /never/);
    const h1 = await page.locator('h1').first().innerText().catch(() => '');
    say(new URL(page.url()).pathname === '/webdesign/welcome/' && h1 === 'That sign-in link did not work' && !calls.includes('GET /owner/account'), `a refused sign-in shows the existing refusal, not the account page ("${h1}")`);
    await page.close();
  }
  { // 4: an init script snapshots the in-between view (into this tab's sessionStorage) the moment its link appears,
    //    because the redirect leaves it before a test can read it; the snapshot is read on the account page
    const page = await browser.newPage(); await mockWorker(page);
    await page.addInitScript(() => {
      if (location.pathname !== '/webdesign/welcome/') return;
      new MutationObserver((_, obs) => {
        const links = document.querySelectorAll('a[href="/webdesign/account/"]');
        if (!links.length) return;
        obs.disconnect();
        sessionStorage.setItem('w333-snap', JSON.stringify({ links: links.length, label: links[0].textContent.trim(), h1: document.querySelector('h1')?.textContent ?? '', body: document.body.textContent.includes('One moment while we check your link.') }));
      }).observe(document, { childList: true, subtree: true });
    });
    await page.goto(`${welcome}#signin=good`);
    await settle(page, /\/webdesign\/account\/$/);
    const snap = JSON.parse(await page.evaluate(() => sessionStorage.getItem('w333-snap')).catch(() => 'null') ?? 'null') ?? {};
    say(snap.links === 1 && snap.label === 'Go to your account' && snap.h1 === 'Signing you in' && snap.body === false, `while the redirect runs: "${snap.h1}" and one link to the account page ("${snap.label}"), no "check your link" line`);
    await page.close();
  }
  { // 5
    const page = await browser.newPage(); await mockWorker(page);
    await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new Error('refused'); }; });
    await page.goto(`${welcome}#signin=good`);
    await settle(page, /never/);
    const h1 = await page.locator('h1').first().innerText().catch(() => '');
    say(new URL(page.url()).pathname === '/webdesign/welcome/' && h1 === 'You are signed in', `storage refused: the owner stays on the signed-in welcome view, not sent on signed out ("${h1}")`);
    await page.close();
  }
} finally { await browser.close(); srv?.close(); }
console.log(bad ? `welcome-signin-test: ${bad} FAILED` : 'welcome-signin-test: all arms hold');
process.exit(bad ? 1 : 0);
