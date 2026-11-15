#!/usr/bin/env node
/* account-chat-test (W311): the account page's chat panel. Offline; each arm can fail (C4).
     node --experimental-strip-types scripts/account-chat-test.mjs   (Node 22; exit 0 = every arm holds)
   - the Worker's answers map to the right panel state (chat-logic.ts);
   - a proposal is never sent without the owner's press: /change/confirm is posted only from sendChanges, which only the
     "Send these changes" button calls (a mutant that auto-sends from an effect is caught);
   - the panel renders only in the signed-in branch of the account page;
   - every word the panel shows is a key of WORDS.chat. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'app/webdesign/account');
const L = await import(pathToFileURL(path.join(DIR, 'chat-logic.ts')).href);
let bad = 0; const say = (ok, what) => { if (!ok) bad++; console.log(`${ok ? '  ok  ' : '  FAIL'} ${what}`); };
const conv = 'c0ffee00-1234';
const prop = { items: [{ kind: 'words', target: 'hours', wanted: 'Saturday 8 to noon', owner_statements: [] }], out_of_scope: [], questions: [] };

say(L.chatOutcome(401, { error: 'not signed in' }).kind === 'signed-out', 'unsigned: the Worker\'s 401 signs the panel out (nothing about the business is shown)');
say(L.chatOutcome(200, { ok: true, conversation: conv, proposal: prop }).kind === 'proposal', 'a proposal is shown');
say(L.chatOutcome(200, { ok: true, conversation: conv, reply: 'Which day?', proposal: null }).kind === 'reply', 'a question back is shown as a reply');
for (const [st, b, key] of [[400, { error: 'at most 2000 characters a message' }, 'too_long'], [423, { paused: true }, 'paused'], [429, {}, 'daily_limit'], [503, { conversation: conv, reason: 'not-available' }, 'not_available'], [422, { reason: 'not-understood' }, 'not_understood'], [200, { ok: false, reason: 'refused', conversation: conv }, 'refused'], [500, {}, 'failed'], [200, { ok: true, conversation: 'BAD ID', proposal: prop }, 'failed']]) {
  const o = L.chatOutcome(st, b); say(o.kind === 'error' && o.key === key, `HTTP ${st} ${JSON.stringify(b).slice(0, 40)} reads ${key}`);
}
say(L.chatOutcome(422, { reason: 'not-understood', paused: true }).key === 'paused', 'F4: the refusal that pauses the chat reads paused');
say(L.chatOutcome(503, { conversation: conv }).conversation === conv, 'a kept message keeps its conversation');
say(L.confirmOutcome(200, { ok: true, confirmed_at: 'x' }).kind === 'confirmed' && L.confirmOutcome(200, { ok: true, already: true }).kind === 'confirmed', 'a confirm, and a repeated one, read confirmed (one request)');
say(L.confirmOutcome(404, { error: 'nothing to send: ask in the chat first' }).key === 'nothing_to_send' && L.confirmOutcome(500, {}).key === 'confirm_failed' && L.confirmOutcome(401, {}).kind === 'signed-out', 'confirm refusals map');
say(L.confirmOutcome(409, { ok: false, reason: 'not-taken' }).key === 'not_taken' && L.confirmOutcome(409, {}).key === 'confirm_failed', 'W317: an inactive plan\'s refusal reads not_taken (not "press again"); any other 409 is confirm_failed');
say(L.canConfirm(prop, conv) && !L.canConfirm({ ...prop, items: [] }, conv) && !L.canConfirm(prop, null) && !L.canConfirm(null, conv), 'only a list with a change in it, in a conversation, can be sent');
say(L.asProposal({ items: [{ kind: 'words', wanted: 1 }], out_of_scope: [3, 'x'] })?.items.length === 0 && L.asProposal('x') === null, 'a malformed proposal shows nothing the Worker did not validate');

/* The press rule, read from the component. */
export function pressOnly(src) {
  const confirms = src.split('/change/confirm').length - 1;
  const fn = /async function sendChanges\(\)[\s\S]*?\n  \}\n/.exec(src)?.[0] ?? '';
  const calls = (src.match(/sendChanges/g) ?? []).length;
  return confirms === 1 && fn.includes('/change/confirm') && calls === 2 && /onClick=\{sendChanges\}/.test(src) && !/useEffect/.test(src);
}
const panel = fs.readFileSync(path.join(DIR, 'ChatPanel.tsx'), 'utf8');
say(pressOnly(panel), 'the confirm is posted only from sendChanges, called only by the button\'s onClick, and the panel has no effect');
const mutant = panel.replace("import { useState } from 'react';", "import { useEffect, useState } from 'react';").replace('  function startNew()', '  useEffect(() => { if (proposal) sendChanges(); }, [proposal]);\n  function startNew()');
say(mutant !== panel && !pressOnly(mutant), 'MUTANT: a panel that auto-sends a proposal from an effect is caught');

/* Critic F6 (PLAN.md 9c): a list that switches designs shows what carries over, above the button that sends it. */
const swapProp = { items: [{ kind: 'design-swap', target: 'v2', wanted: 'Switch to design 2' }], out_of_scope: [], questions: [] };
say(L.hasSwap(swapProp) && !L.hasSwap(prop) && !L.hasSwap(null), 'F6: a list with a design-swap item is recognised as a swap, a words list is not');
const swapShown = (src) => { const note = src.indexOf('{hasSwap(proposal) && <p'), button = src.indexOf('onClick={sendChanges}'); return note > 0 && button > note && /\{hasSwap\(proposal\) && <p[^>]*>\{W\.design_swap_note\}<\/p>\}/.test(src); };
say(swapShown(panel), 'F6: the swap note renders with the list, above Send these changes, whenever the list switches designs');
const noNote = panel.replace(/\s*\{hasSwap\(proposal\) && <p[^\n]*\n/, '\n');
say(noNote !== panel && !swapShown(noNote), 'MUTANT: a panel that offers a swap for sending without the note is caught');

/* W318: the owner's photos. */
const H = 'a'.repeat(64);
const photoProp = { items: [{ kind: 'photo', target: 'main picture', wanted: 'Use my photo at the top' }], out_of_scope: [], questions: [] };
say(L.photoOutcome(200, { ok: true, photo: H }).kind === 'stored' && L.photoOutcome(200, { ok: true, photo: 'x' }).error?.key === 'failed' && L.photoOutcome(401, {}).kind === 'signed-out', 'W318: a stored photo returns its id; a malformed id is a failure; 401 signs out');
const small = L.photoOutcome(422, { code: 'too-small', place: 'hero', min: { width: 1440, height: 480 }, got: { width: 48, height: 32 } });
say(small.error?.key === 'too_small' && small.error.place === 'hero' && small.error.min.width === 1440 && L.photoOutcome(422, { code: 'unreadable' }).error.key === 'unreadable' && L.photoOutcome(415, {}).error.key === 'wrong_type' && L.photoOutcome(413, {}).error.key === 'too_big' && L.photoOutcome(429, {}).error.key === 'daily_limit' && L.photoOutcome(500, {}).error.key === 'failed', 'W318: the Worker\'s refusals map (too-small with its place and minimum, unreadable, type, size, daily limit, other)');
say(L.fillPhoto('needs {width} x {height} for {place}', small.error, { hero: 'the top', gallery: 'the gallery' }) === 'needs 1440 x 480 for the top', 'W318: a too-small refusal\'s words carry its numbers and place');
const jpg = { size: 1000, type: 'image/jpeg' };
say(L.photoPreflight(photoProp, [], false).key === 'photo_needed' && L.photoPreflight(prop, [], false) === null && L.photoPreflight(photoProp, Array(21).fill(jpg), true).key === 'too_many' && L.photoPreflight(photoProp, [{ size: 1, type: 'image/gif' }], true).key === 'wrong_type' && L.photoPreflight(photoProp, [{ size: 26e6, type: 'image/png' }], true).key === 'too_big' && L.photoPreflight(photoProp, [jpg], false).key === 'mine_needed' && L.photoPreflight(photoProp, [jpg], true) === null, 'W318: before any upload: a photo list needs a photo, at most 20, JPEG/PNG/WebP, 25 MB, and the "these are mine" box');
export function uploadOnPress(src) {
  const fn = /async function sendChanges\(\)[\s\S]*?\n  \}\n/.exec(src)?.[0] ?? '';
  return src.split('/change/photo').length - 1 === 1 && fn.includes('/change/photo') && fn.indexOf('/change/photo') < fn.indexOf('/change/confirm') && fn.indexOf('photoPreflight(') < fn.indexOf('/change/photo') && /'x-photo-mine': 'yes'/.test(fn) && !/useEffect/.test(src);
}
const hiddenSafe = (src) => /const attached = needsPhoto\(proposal\) \? photos : \[\];/.test(src) && /for \(const x of attached\)/.test(src) && /photoPreflight\(proposal, attached\./.test(src);
say(hiddenSafe(panel), 'W318 critic F4: photos are checked and uploaded only while the list has a photo change (a hidden photo is never sent)');
const leaky = panel.replace('const attached = needsPhoto(proposal) ? photos : [];', 'const attached = photos;');
say(leaky !== panel && !hiddenSafe(leaky), 'MUTANT: a panel that uploads photos after the photo change left the list is caught');
say(uploadOnPress(panel), 'W318: a photo is uploaded only from sendChanges (after the checks, before the confirm, with the owner\'s "these are mine"), never on choosing it');
const autoUp = panel.replace("setPhotoErr(null); e.target.value = ''; }}", "setPhotoErr(null); e.target.value = ''; f.forEach((file) => fetch(`${API}/change/photo`, { method: 'POST', body: file })); }}");
say(autoUp !== panel && !uploadOnPress(autoUp), 'MUTANT: a panel that uploads a photo as soon as it is chosen is caught');
const wordsShown = (src) => /\{photoErr && <P>\{fillPhoto\(WP\.errors\[photoErr\.key\], photoErr,/.test(src) && !/\{photoErr\.key\}/.test(src);
say(wordsShown(panel), 'W318: a refused photo shows the checked words (WP.errors), never the Worker\'s code');
const rawCode = panel.replace(/\{photoErr && <P>\{fillPhoto\([^\n]*\n/, '        {photoErr && <P>{photoErr.key}</P>}\n');
say(rawCode !== panel && !wordsShown(rawCode), 'MUTANT: a panel that shows the raw refusal code is caught');
const photoAt = panel.indexOf('data-chat-photos');
say(photoAt > panel.indexOf('{proposal && (') && /\{needsPhoto\(proposal\) && \(/.test(panel), 'W318: the photo picker renders only inside a shown list that includes a photo change (so only signed in, below)');

const acct = fs.readFileSync(path.join(DIR, 'AccountClient.tsx'), 'utf8');
const at = acct.indexOf('<ChatPanel'), signedOutReturn = acct.indexOf("if (view === 'signed-out') return"), errReturn = acct.indexOf("if (view === 'error' || !acct) return");
say(at > 0 && signedOutReturn > 0 && errReturn > 0 && at > signedOutReturn && at > errReturn && (acct.match(/<ChatPanel/g) ?? []).length === 1, 'the panel renders only after the signed-out and error returns (signed in, with an account read)');

const words = fs.readFileSync(path.join(DIR, 'words.ts'), 'utf8');
const used = new Set([...panel.matchAll(/\bW\.([a-z_]+)/g)].map((m) => m[1]));
for (const k of ['too_long', 'paused', 'daily_limit', 'not_available', 'not_understood', 'refused', 'failed', 'confirm_failed', 'nothing_to_send', 'not_taken']) used.add(k);
const photoWords = words.slice(words.indexOf('"photos"'));
const pUsed = new Set([...panel.matchAll(/\bWP\.([a-z_]+)/g)].map((m) => m[1]));
const pErr = ['mine_needed', 'photo_needed', 'too_many', 'too_small', 'unreadable', 'wrong_type', 'too_big', 'daily_limit', 'failed'];
const pMissing = [...pUsed, ...pErr].filter((k) => !new RegExp(`"${k}":`).test(photoWords));
say(words.includes('"photos"') && pMissing.length === 0 && /\{width\}/.test(photoWords) && /\{height\}/.test(photoWords), `W318: every photo word the panel shows is in WORDS.chat.photos, and too_small carries {width} and {height}${pMissing.length ? ` (missing: ${pMissing.join(', ')})` : ''}`);
const missing = [...used].filter((k) => !new RegExp(`"${k}":`).test(words.slice(words.indexOf('"chat"'))));
say(words.includes('"chat"') && missing.length === 0, `every word the panel shows is in WORDS.chat${missing.length ? ` (missing: ${missing.join(', ')})` : ''}`);
say(!/[–—]/.test(panel + words) && /[—]/.test('a — b'), 'no em or en dash in the panel or its words (and the grep sees one when there is one)');
console.log(bad ? `account-chat-test: ${bad} FAILED` : 'account-chat-test: every arm holds');
process.exit(bad ? 1 : 0);
