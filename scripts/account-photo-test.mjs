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
     8. (W347) an empty file is refused before any upload with its own words, naming its row (W370);
     9. (W370) the account page names a photo that was not used, with its reason; an all-made request reads as today;
    10. (W370 (3)) a guard-refused item is marked "Not made." under its own item, with its reason, and the label says so;
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
async function open(browser, base, { signedIn = true, account = ACCOUNT, photoAnswer = { status: 200, body: { ok: true, photo: HASH } } } = {}) {
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
    if (u.pathname === '/owner/account') return json(200, account);
    if (u.pathname === '/change/chat') return json(200, { ok: true, conversation: CONV, proposal: PROPOSAL });
    if (u.pathname === '/change/photo') { const pa = typeof photoAnswer === 'function' ? photoAnswer(calls.filter((c) => c.path === '/change/photo').length) : photoAnswer; return json(pa.status, pa.body); }
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
    const want = WP.errors.too_small.replace('{n}', '1').replace('{file}', 'my-shop.jpg').replace('{place}', WP.place_hero).replace('{width}', '1440').replace('{height}', '480');
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
  { // 7 (W347 (2)): two photos, the second refused once: the retry sends only the one that failed, then confirms both
    const H2 = 'c'.repeat(64);
    const answers = { 1: { status: 200, body: { ok: true, photo: HASH } }, 2: { status: 422, body: { error: 'x', code: 'too-small', place: 'gallery', min: { width: 800, height: 600 }, got: { width: 48, height: 32 } } }, 3: { status: 200, body: { ok: true, photo: H2 } } };
    const { page, calls } = await open(browser, base, { photoAnswer: (n) => answers[n] ?? answers[3] });
    await toList(page);
    await page.locator('#chat-photos').setInputFiles([{ name: 'one.jpg', mimeType: 'image/jpeg', buffer: JPG }, { name: 'two.jpg', mimeType: 'image/jpeg', buffer: Buffer.concat([JPG, Buffer.from([0])]) }]);
    const sel = page.locator('[data-chat-photos] select');
    await sel.nth(0).selectOption('hero'); await sel.nth(1).selectOption('gallery');
    await page.locator('[data-chat-photos] input[type=checkbox]').check();
    await press(page);
    const first = calls.filter((c) => c.path === '/change/photo').length;
    await press(page);
    const ups = calls.filter((c) => c.path === '/change/photo'), conf = calls.filter((c) => c.path === '/change/confirm');
    const body = conf[0] ? JSON.parse(conf[0].body.toString()) : {};
    say(first === 2 && ups.length === 3 && ups[2].headers['x-photo-place'] === 'gallery', `W347: the retry re-sends only the photo that failed (${first} then ${ups.length - first})`);
    say(conf.length === 1 && JSON.stringify([...(body.photos ?? [])].sort()) === JSON.stringify([HASH, H2].sort()), 'W347: ...and the request is confirmed with both photos');
    await page.close();
  }
  { // 8 (W347 (3)): an empty file is refused on the page with the checked words; nothing is uploaded or confirmed
    const { page, calls } = await open(browser, base);
    await toList(page);
    await page.locator('#chat-photos').setInputFiles({ name: 'empty.jpg', mimeType: 'image/jpeg', buffer: Buffer.alloc(0) });
    await page.locator('[data-chat-photos] input[type=checkbox]').check();
    await press(page);
    say(await shows(page, (WP.errors.empty ?? '(no empty line)').replace('{n}', '1').replace('{file}', 'empty.jpg')) && await shows(page, WP.row_mark) && calls.filter((c) => c.path === '/change/photo' || c.path === '/change/confirm').length === 0, 'W347, W370: an empty file shows the checked words naming its row, the row is marked; nothing uploaded or confirmed');
    await page.close();
  }
  { // 9 (W370): the account page names a photo that was not used, with its reason; an all-made request reads as today
    const NU = WORDS.changes.not_used;
    const acct = { ...ACCOUNT, requests: [
      { n: 7, state: 'stuck', confirmed_at: '2026-11-14T23:13:54Z', trial: true, items: [{ kind: 'photo', target: 'main picture at the top of the page', wanted: 'use my photo as the main picture at the top of the page' }], not_used: [{ position: 1, count: 1, place: null, reason: 'stock_like' }], photo_items: 1 },
      { n: 8, state: 'done', confirmed_at: '2026-11-15T10:00:00Z', trial: true, items: [{ kind: 'photo', target: 'top', wanted: 'Use one at the top' }, { kind: 'photo', target: 'gallery', wanted: 'Add the others to the gallery' }], not_used: [{ position: 1, count: 3, place: 'hero', reason: 'other_business' }], photo_items: 2 },
      { n: 9, state: 'done', confirmed_at: '2026-11-15T11:00:00Z', trial: true, items: [{ kind: 'words', target: 'hours', wanted: 'Saturday 8 to noon' }] }] };
    const { page } = await open(browser, base, { account: acct });
    const lines = await page.locator('[data-not-used]').allInnerTexts();
    const r7 = NU.no_place.replace('{photo_ref}', NU.photo_ref_one).replace('{reason}', NU.reasons.stock_like);
    const r8 = NU.place.replace('{photo_ref}', 'photo 1 of the 3 you sent').replace('{place}', NU.places.hero).replace('{reason}', NU.reasons.other_business);
    say(lines.length === 2 && lines.includes(r7) && lines.includes(r8), `W370: request 7 reads "${r7.slice(0, 70)}...", and a two-item request names photo 1 of 3 and its place`);
    const item7 = page.locator('li', { hasText: 'use my photo as the main picture' }).last();
    say((await item7.locator('[data-not-used]').count()) === 1, 'W370: with one photo item the line sits under that item');
    say(await shows(page, WORDS.changes.states_part.done) && await shows(page, WORDS.changes.states.stuck), 'W370: a part-made done request says "Live, apart from...", a stuck one keeps its label');
    const live = await page.locator('li.border', { hasText: 'Saturday 8 to noon' }).first().innerText();
    say(/^Live/.test(live.trim()) && !/apart from|Not used/.test(live), 'W370: an all-made request reads exactly "Live", as today (NEG)');
    await page.close();
  }
  { // 10 (W370 (3)): a guard-refused item is marked "Not made." under its own item, with its reason; the labels say so
    const draft = fs.readFileSync(path.join(ROOT, '..', 'sylentt-smb-site-generation', 'runs/client-launch/copy/W370-words-refused-draft.md'), 'utf8');
    const two = (w) => [{ kind: 'words', target: 'hours', wanted: 'Saturday 8 to noon' }, { kind: 'words', target: 'about', wanted: w }];
    const acct = { ...ACCOUNT, requests: [
      { n: 11, state: 'done', confirmed_at: '2026-11-18T00:00:00Z', trial: true, items: two('add that we are fully insured and bonded'), refused: [{ item: 1, classes: ['insured', 'bonded'] }] },
      { n: 12, state: 'ready', confirmed_at: '2026-11-18T01:00:00Z', trial: true, items: [...two('say we are better than the other landscapers in town'), { kind: 'photo', target: 'gallery', wanted: 'Add these photos to the gallery' }], refused: [{ item: 1, classes: ['other_business'] }], not_used: [{ position: 2, count: 3, place: 'gallery', reason: 'person' }], photo_items: 1 }] };
    const { page } = await open(browser, base, { account: acct });
    const marks = await page.locator('[data-refused]').allInnerTexts();
    const m11 = 'Not made. It mentions insurance or being insured. It mentions being bonded. We do not add these to your site from a change request. If you would like to know more, email support@sylentt.com.';
    const m12 = 'Not made. Some of its words read as a mention of another business, or a comparison with one, which we do not add to your site from a change request. If you would like to know more, email support@sylentt.com.';
    say(draft.includes(m11) && draft.includes(m12) && marks.length === 2 && marks.includes(m11) && marks.includes(m12), 'W370 (3): each refused item reads the draft\'s own "Not made." line (insured and bonded; another business)');
    const it11 = page.locator('li', { hasText: 'add that we are fully insured and bonded' }).last();
    say((await it11.locator('[data-refused]').count()) === 1 && (await page.locator('li', { hasText: /^Saturday 8 to noon$/ }).locator('[data-refused]').count()) === 0, 'W370 (3): the mark sits under the refused item, never under the made one');
    say(await shows(page, WORDS.changes.states_part_items.done) && await shows(page, WORDS.changes.states_part_both.ready), 'W370 (3): done with a refused item says "Live, apart from the parts marked not made below"; both kinds name both');
    say((await page.locator('[data-not-used]').count()) === 1, 'W370 (3): the photo mark still shows beside the item marks');
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
