#!/usr/bin/env node
/* account-registrant-test (W34, row 58 (e)): the registrant section of the account page, in Chromium, with the Worker
   (clients.sylentt.com) answered by page.route. No real session, business, Registrar or Stripe object is touched.
     npm run build && node scripts/account-registrant-test.mjs              (serves out/ on a local port)
     node scripts/account-registrant-test.mjs --base https://sylentt.com    (the served site; the Worker still mocked)
   Arms, each able to fail (C4: against a build without the section, arms 3 to 8 fail; arm 1 has its own negative):
     1. the words the section shows equal the checked words record (runs/client-launch/copy/W34-registrant-words.md);
     2. no pick, or an unreadable new-domain read: no section at all (negative);
     3. a pick with no details on file: the heading, the why line with the picked name, all eight labels; nothing is sent on load;
     4. saving sends one POST /owner/new-domain with the session and exactly the eight fields plus country US, and a 200 shows
        the saved block with the name;
     5. the saved block's change button opens the form again and sends nothing;
     6. each Worker refusal code shows its own line (a 400 per field code, 409 no-pick, a 500 as failed, an unknown code as failed);
        409 already-registered shows the bought block and no form; a 401 signs the page out;
     7. bought: the bought block with the name, no form and no button;
     8. the privacy page carries the three checked lines (runs/client-launch/copy/W34-registrant-privacy-words.md, critic
        APPROVE WITH CHANGES, Revision 1), and no .us public-record line shows on any pick (held with .us, privacy critic change 6). */
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
const R = WORDS.registrant;
const NAME = 'regtestplumbing.com';
const withName = (s, n = NAME) => s.split('{name}').join(n);
const FIELDS = ['organization', 'name', 'email', 'phone', 'street', 'city', 'state', 'postal_code'];
const ACCOUNT = { name: 'Registrant Test Co', ready: true, plan: 'trial', trial_ends: null, design: 1, site_url: 'https://example.com/', requests: [], start_paid: null, start_paid_pending: false };
const ND = { ok: true, wanted: true, offer: [{ name: NAME, firstYearCents: 1044, renewalCents: 1044 }], offer_at: 1, pick: { name: NAME, firstYearCents: 1044, renewalCents: 1044 }, registrant_on_file: false, bought: false };
const ENTRY = { organization: 'Reg Test Plumbing LLC', name: 'Pat Owner', email: 'pat@regtest.example', phone: '(208) 555-0142', street: '12 Main St', city: 'Boise', state: 'ID', postal_code: '83702' };

let bad = 0; const say = (ok, what) => { if (!ok) bad++; console.log(`${ok ? '  ok  ' : '  FAIL'} ${what}`); };

{ // 1
  const rec = fs.readFileSync(path.join(ROOT, '..', 'sylentt-smb-site-generation', 'runs/client-launch/copy/W34-registrant-words.md'), 'utf8');
  const checked = JSON.parse(/```json\n([\s\S]*?)\n```/.exec(rec)[1]).registrant;
  say(JSON.stringify(checked) === JSON.stringify(R), 'the words the section shows equal the checked words record');
  say(JSON.stringify({ ...checked, heading: 'x' }) !== JSON.stringify(R), 'a record one word off reads as different (negative)');
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
async function open(browser, base, { nd = ND, ndStatus = 200, post = { status: 200, body: { ...ND, registrant_on_file: true } } } = {}) {
  const page = await browser.newPage();
  const calls = [];
  await page.addInitScript(() => { try { sessionStorage.setItem('sylentt-owner-session', 'sess-good'); } catch { /* none */ } });
  await page.route('https://clients.sylentt.com/**', async (route) => {
    const rq = route.request(); const u = new URL(rq.url());
    const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET, POST' };
    if (rq.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
    calls.push({ path: u.pathname, method: rq.method(), auth: rq.headers().authorization, body: rq.postData() });
    const json = (status, body) => route.fulfill({ status, contentType: 'application/json', headers: cors, body: JSON.stringify(body) });
    if (rq.headers().authorization !== 'Bearer sess-good') return json(401, { error: 'not signed in' });
    if (u.pathname === '/owner/account') return json(200, ACCOUNT);
    if (u.pathname === '/owner/new-domain' && rq.method() === 'GET') return json(ndStatus, nd);
    if (u.pathname === '/owner/new-domain' && rq.method() === 'POST') return json(post.status, post.body);
    return json(404, {});
  });
  await page.goto(`${base}/webdesign/account/`);
  await page.waitForLoadState('networkidle').catch(() => {});
  return { page, calls, sec: page.locator('section[aria-labelledby="acct-registrant"]') };
}
const text = async (loc) => (await loc.count()) ? (await loc.innerText()) : '';
const posts = (calls) => calls.filter((c) => c.path === '/owner/new-domain' && c.method === 'POST');
async function fillAll(sec) { for (const f of FIELDS) await sec.locator(`#reg-${f}`).fill(ENTRY[f]); }

const srv = argBase ? null : await serve(path.join(ROOT, 'out'));
const base = argBase ?? `http://127.0.0.1:${srv.address().port}`;
const browser = await chromium.launch();
try {
  for (const [what, opts] of [['no pick', { nd: { ...ND, pick: null } }], ['the new-domain read answers 500', { ndStatus: 500, nd: {} }]]) { // 2
    const { page, sec } = await open(browser, base, opts);
    const h = await page.locator('h1').count();
    say(h > 0 && (await sec.count()) === 0, `${what}: no registrant section (negative)`);
    await page.close();
  }
  { // 3, 4
    const { page, calls, sec } = await open(browser, base);
    const t = await text(sec);
    const labels = FIELDS.every((f) => t.includes(R.fields[f].label));
    say(t.includes(R.heading) && t.includes(withName(R.why)) && t.includes(R.where_it_goes) && labels && !t.includes('{name}'), 'a pick with nothing on file: the heading, the why line with the name (both places), where the details go, all eight labels');
    say(posts(calls).length === 0, 'nothing is sent on load');
    await fillAll(sec);
    await sec.getByRole('button', { name: R.save_button }).click();
    await page.getByText(R.saved.title).waitFor({ timeout: 5000 }).catch(() => {});
    const p = posts(calls);
    let body = null; try { body = JSON.parse(p[0]?.body ?? 'null'); } catch { /* bad body */ }
    const keys = Object.keys(body?.registrant ?? {}).sort().join(',');
    say(p.length === 1 && p[0].auth === 'Bearer sess-good' && keys === [...FIELDS, 'country_code'].sort().join(',') && body.registrant.country_code === 'US' && FIELDS.every((f) => body.registrant[f] === ENTRY[f]),
      'saving sends one POST with the session and exactly the eight fields plus country US');
    const after = await text(sec);
    say(after.includes(R.saved.title) && after.includes(withName(R.saved.body)) && (await sec.locator('form').count()) === 0, 'a 200 shows the saved block with the name, and no form');
    await sec.getByRole('button', { name: R.saved.change_button }).click(); // 5
    say((await sec.locator('form').count()) === 1 && posts(calls).length === 1, 'the change button opens the form again and sends nothing');
    await page.close();
  }
  { const US = 'regtestplumbing.us';
    const { page, sec } = await open(browser, base, { nd: { ...ND, pick: { ...ND.pick, name: US } } });
    const t = await text(sec);
    say(R.public_us === undefined && !/registry publishes/.test(t) && t.includes(withName(R.why, US)), 'a .us pick shows no public-record line (held with .us)');
    await page.close(); }
  { // 8: the privacy lines that ship in the same act
    const rec = fs.readFileSync(path.join(ROOT, '..', 'sylentt-smb-site-generation', 'runs/client-launch/copy/W34-registrant-privacy-words.md'), 'utf8');
    const plain = (h) => h.replace(/<[^>]+>/g, '').replace(/&apos;/g, "'").replace(/\s+/g, ' ').trim();
    const want = [...rec.matchAll(/```tsx\n([\s\S]*?)\n```/g)].map((m) => m[1]).filter((b) => /new domain|Cloudflare Registrar/.test(b)).map(plain);
    const page = await browser.newPage();
    await page.goto(`${base}/webdesign/privacy/`);
    const body = (await page.locator('body').innerText()).replace(/\s+/g, ' ');
    say(want.length === 3 && want.every((w) => body.includes(w)), 'the privacy page carries the three checked lines (what, who, how long)');
    say(!body.includes('hides your name, email, phone'), 'the privacy page never says the phone is hidden (negative; privacy critic change 1)');
    await page.close(); }
  { const { page, sec } = await open(browser, base, { nd: { ...ND, registrant_on_file: true } });
    say((await text(sec)).includes(R.saved.title) && (await sec.locator('form').count()) === 0, 'details already on file: the saved block, no form');
    await page.close(); }
  const cases = [
    ...['registrant-organization', 'registrant-name', 'registrant-email', 'registrant-phone', 'registrant-address', 'registrant-state', 'registrant-postal-code', 'registrant-country'].map((c) => [400, c, R.errors[c]]),
    [409, 'no-pick', R.errors['no-pick']], [500, null, R.errors.failed], [400, 'something-new', R.errors.failed],
  ];
  for (const [status, code, line] of cases) { // 6
    const { page, sec } = await open(browser, base, { post: { status, body: code ? { error: code } : {} } });
    await fillAll(sec);
    await sec.getByRole('button', { name: R.save_button }).click();
    await page.getByText(line).waitFor({ timeout: 5000 }).catch(() => {});
    const t = await text(sec);
    say(t.includes(line) && !t.includes(R.saved.title), `a ${status} ${code ?? '(no body)'} shows its own line, not the saved block`);
    await page.close();
  }
  { const { page, sec } = await open(browser, base, { post: { status: 409, body: { error: 'already-registered' } } });
    await fillAll(sec);
    await sec.getByRole('button', { name: R.save_button }).click();
    await page.getByText(withName(R.bought.title)).waitFor({ timeout: 5000 }).catch(() => {});
    say((await text(sec)).includes(withName(R.bought.title)) && (await sec.locator('form').count()) === 0, 'a 409 already-registered shows the bought block and no form');
    await page.close(); }
  { const { page, sec } = await open(browser, base, { post: { status: 401, body: { error: 'not signed in' } } });
    await fillAll(sec);
    await sec.getByRole('button', { name: R.save_button }).click();
    await page.getByText(WORDS.signed_out.title).waitFor({ timeout: 5000 }).catch(() => {});
    say((await page.getByText(WORDS.signed_out.title).count()) > 0, 'a 401 on save signs the page out');
    await page.close(); }
  { const { page, sec } = await open(browser, base, { nd: { ...ND, registrant_on_file: true, bought: true } }); // 7
    const t = await text(sec);
    say(t.includes(withName(R.bought.title)) && t.includes(R.bought.body) && (await sec.locator('form').count()) === 0 && (await sec.getByRole('button').count()) === 0, 'bought: the bought block with the name, no form, no button');
    await page.close(); }
} finally { await browser.close(); srv?.close(); }
console.log(bad ? `account-registrant-test: ${bad} FAILED` : 'account-registrant-test: all arms hold');
process.exitCode = bad ? 1 : 0;
