#!/usr/bin/env node
/* account-photo-test (W318): the photo upload in the account page's change chat, in Chromium, with the Worker
   (clients.sylentt.com) answered by page.route. No real session, business or photo is touched.
     npm run build && node scripts/account-photo-test.mjs              (serves out/ on a local port)
     node scripts/account-photo-test.mjs --base https://sylentt.com    (the served site; the Worker still mocked)
   Arms, each able to fail (C4: against a build before W318 arms 2 to 5 fail, there is no picker):
     1. signed out: no upload control renders (the Worker refusing an unsigned upload is worker-clients/test/confirm.test.mjs);
     2. a list with a photo change shows the picker, and choosing a photo uploads nothing;
     3. pressing Send with the box unticked shows the checked words and uploads nothing;
     4. a photo the Worker refuses as too small shows the checked words with its numbers, and nothing is confirmed;
     5. a good photo is uploaded on the press with "these are mine" and its place, then the request is confirmed with its id;
     6. every shown line equals the checked words (runs/client-launch/copy/W318-photo-words.md, read from words.ts). */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
// playwright is not a dependency of this site: it is the one installed on the machine (require resolves it, import does not)
const { chromium } = createRequire(import.meta.url)('playwright');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argBase = (() => { const i = process.argv.indexOf('--base'); return i > 0 ? process.argv[i + 1] : null; })();
const { WORDS } = await import(pathToFileURL(path.join(ROOT, 'app/webdesign/account/words.ts')).href).catch(async () => {
  // Node without type stripping: read the object literal
  const src = fs.readFileSync(path.join(ROOT, 'app/webdesign/account/words.ts'), 'utf8');
  return { WORDS: JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1)) };
});
const WP = WORDS.chat.photos;
const HASH = 'b'.repeat(64);
const CONV = 'c0ffee00-1234-5678';
const ACCOUNT = { name: 'Photo Test Co', ready: true, plan: 'trial', trial_ends: '2026-12-14T00:00:00Z', design: 1, site_url: 'https://example.com/', requests: [] };
const PROPOSAL = { items: [{ kind: 'photo', target: 'main picture at the top', wanted: 'Use my photo as the main picture at the top', owner_statements: [] }], out_of_scope: [], questions: [] };
const JPG = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x04, 0, 0, 0xff, 0xc0, 0x00, 0x11, 0x08, 0x04, 0x38, 0x07, 0x80, 3, 1, 0x22, 0, 2, 0x11, 1, 3, 0x11, 1, 0xff, 0xd9]);

let bad = 0; const say = (ok, what) => { if (!ok) bad++; console.log(`${ok ? '  ok  ' : '  FAIL'} ${what}`); };
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
/* photoAnswer: what POST /change/photo answers */
async function open(browser, base, { signedIn = true, photoAnswer = { status: 200, body: { ok: true, photo: HASH } } } = {}) {
  const page = await browser.newPage();
  const calls = [];
  if (signedIn) await page.addInitScript(() => { try { sessionStorage.setItem('sylentt-owner-session', 'sess-good'); } catch { /* none */ } });
  await page.route('https://clients.sylentt.com/**', async (route) => {
    const rq = route.request(); const u = new URL(rq.url());
    const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET, POST' };
    if (rq.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
    calls.push({ path: u.pathname, headers: rq.headers(), body: rq.postDataBuffer() });
    const json = (status, body) => route.fulfill({ status, contentType: 'application/json', headers: cors, body: JSON.stringify(body) });
    const authed = rq.headers().authorization === 'Bearer sess-good';
    if (!authed) return json(401, { error: 'not signed in' });
    if (u.pathname === '/owner/account') return json(200, ACCOUNT);
    if (u.pathname === '/change/chat') return json(200, { ok: true, conversation: CONV, proposal: PROPOSAL });
    if (u.pathname === '/change/photo') return json(photoAnswer.status, photoAnswer.body);
    if (u.pathname === '/change/confirm') return json(200, { ok: true, confirmed_at: '2026-11-14T23:00:00Z' });
    return json(404, {});
  });
  await page.goto(`${base}/webdesign/account/`);
  await page.waitForLoadState('networkidle').catch(() => {});
  return { page, calls };
}
async function toList(page) {
  await page.locator('#chat-message').fill('Use my photo as the main picture at the top');
  await page.getByRole('button', { name: WORDS.chat.send_label }).click();
  await page.locator('[data-chat-photos]').waitFor({ timeout: 10000 }).catch(() => {});
}
const choose = (page) => page.locator('#chat-photos').setInputFiles({ name: 'my-shop.jpg', mimeType: 'image/jpeg', buffer: JPG });
const press = async (page) => { await page.getByRole('button', { name: WORDS.chat.confirm_label }).click(); await page.waitForTimeout(800); };
const shows = async (page, text) => (await page.getByText(text, { exact: true }).count()) > 0;

const srv = argBase ? null : await serve(path.join(ROOT, 'out'));
const base = argBase ?? `http://127.0.0.1:${srv.address().port}`;
console.log(`account-photo-test against ${base}`);
const browser = await chromium.launch();
try {
  { // 1
    const { page } = await open(browser, base, { signedIn: false });
    await page.waitForTimeout(800);
    say(await page.locator('input[type=file]').count() === 0 && await page.locator('#chat-message').count() === 0, 'signed out: no chat and no upload control render');
    await page.close();
  }
  { // 2, 3
    const { page, calls } = await open(browser, base);
    await toList(page);
    say(await page.locator('[data-chat-photos] input[type=file]').count() === 1 && await shows(page, WP.heading) && await shows(page, WP.mine_label), 'a list with a photo change shows the picker, its heading and the "these are mine" box');
    await choose(page); await page.waitForTimeout(500);
    say(await shows(page, 'my-shop.jpg') && calls.filter((c) => c.path === '/change/photo').length === 0, 'choosing a photo lists it and uploads nothing');
    await press(page);
    say(await shows(page, WP.errors.mine_needed) && calls.filter((c) => c.path === '/change/photo' || c.path === '/change/confirm').length === 0, 'Send with the box unticked shows the checked words; nothing uploaded or confirmed');
    await page.close();
  }
  { // 4
    const { page, calls } = await open(browser, base, { photoAnswer: { status: 422, body: { error: 'x', code: 'too-small', place: 'hero', min: { width: 1440, height: 480 }, got: { width: 48, height: 32 } } } });
    await toList(page); await choose(page);
    await page.locator('[data-chat-photos] select').selectOption('hero');
    await page.locator('[data-chat-photos] input[type=checkbox]').check();
    await press(page);
    const want = WP.errors.too_small.replace('{place}', WP.place_hero).replace('{width}', '1440').replace('{height}', '480');
    say(await shows(page, want) && calls.filter((c) => c.path === '/change/confirm').length === 0, `a too-small photo shows the checked words with its numbers, and nothing is confirmed ("${want.slice(0, 60)}...")`);
    say(!(await shows(page, 'too-small')), '...and never the raw code');
    await page.close();
  }
  { // 5
    const { page, calls } = await open(browser, base);
    await toList(page); await choose(page);
    await page.locator('[data-chat-photos] select').selectOption('hero');
    await page.locator('[data-chat-photos] input[type=checkbox]').check();
    await press(page);
    const up = calls.filter((c) => c.path === '/change/photo'), conf = calls.filter((c) => c.path === '/change/confirm');
    const body = conf[0] ? JSON.parse(conf[0].body.toString()) : {};
    say(up.length === 1 && up[0].headers['x-photo-mine'] === 'yes' && up[0].headers['x-photo-place'] === 'hero' && up[0].headers['content-type'] === 'image/jpeg' && Buffer.compare(up[0].body, JPG) === 0, 'on the press the photo is uploaded once, with "these are mine", its place and its bytes');
    say(conf.length === 1 && body.conversation === CONV && JSON.stringify(body.photos) === JSON.stringify([HASH]) && calls.indexOf(up[0]) < calls.indexOf(conf[0]), 'then the request is confirmed once, with the photo\'s id');
    say(await shows(page, WORDS.chat.confirmed), 'the owner sees the confirmed words');
    await page.close();
  }
  { // 6: the served words are the checked words
    const rec = fs.readFileSync(path.join(ROOT, '..', 'sylentt-smb-site-generation', 'runs/client-launch/copy/W318-photo-words.md'), 'utf8');
    const checked = JSON.parse(/```json\n([\s\S]*?)\n```/.exec(rec)[1]).photos;
    say(JSON.stringify(checked) === JSON.stringify(WP), 'the words the panel shows equal the checked words record');
  }
} finally { await browser.close(); srv?.close(); }
console.log(bad ? `account-photo-test: ${bad} FAILED` : 'account-photo-test: all arms hold');
process.exit(bad ? 1 : 0);
