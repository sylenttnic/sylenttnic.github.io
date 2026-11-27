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
// W370 (critic F4, P3): a refusal about one file names its row, and the other rows with the same fault; the panel marks each
const { WORDS } = await import(pathToFileURL(path.join(DIR, "words.ts")).href);
{
  const WW = WORDS.chat.photos;
  const empty = { size: 0, type: 'image/jpeg' };
  const two = L.photoPreflight(photoProp, [jpg, empty, jpg, empty], true);
  say(two.key === 'empty' && two.index === 1 && JSON.stringify(two.also) === '[3]', 'W370: two empty files: the refusal names the first (row 2) and keeps the other (row 4)');
  const names = ['a.jpg', 'IMG_2041.jpg', 'c.jpg', 'IMG_2041.jpg'];
  const shown = L.fillPhoto(WW.errors.empty, two, { hero: WW.place_hero, gallery: WW.place_gallery }, names, { also: WW.also, also_one: WW.also_one });
  say(shown === 'Photo 2 in your list (IMG_2041.jpg) is an empty file, so your changes were not sent. Please check it has finished saving or downloading, then attach it again, or remove it. Photo 4 in your list has the same problem.', 'W370: the words as the copy file reads them, with two bad files at rows 2 and 4');
  say(JSON.stringify(L.markedRows(two)) === '[1,3]', 'W370: rows 2 and 4 get "Please check this photo." (the right row of two)');
  const wrongRow = { ...two, index: 0 };
  say(L.fillPhoto(WW.errors.empty, wrongRow, { hero: '', gallery: '' }, names) !== shown.split(' Photo 4')[0], 'MUTANT: a refusal pointing at the wrong row reads differently (caught)');
  const many = L.photoPreflight(photoProp, [jpg, jpg, { size: 1, type: 'image/gif' }, jpg, { size: 1, type: 'image/gif' }, { size: 1, type: 'image/gif' }, { size: 1, type: 'image/gif' }], true);
  say(L.fillPhoto('X', many, { hero: '', gallery: '' }, [], { also: WW.also, also_one: WW.also_one }) === 'X Photos 5, 6 and 7 in your list have the same problem.', 'W370: three others read "5, 6 and 7", never the row the refusal names');
  say(L.markedRows({ key: 'mine_needed' }).length === 0 && L.markedRows(null).length === 0, 'W370: a refusal not about one file marks no row (NEG)');
  const fixed = WORDS.chat.photos.errors;
  say(['too_small', 'empty', 'unreadable', 'wrong_type', 'too_big', 'failed'].every((k) => /\{n\}/.test(fixed[k]) && /\(\{file\}\)/.test(fixed[k])) && !Object.values(fixed).some((v) => /One of your photos|one of your photos/.test(v)), 'W370: every per-file refusal names the row and file; none says "one of your photos"');
  const removeClears = (src) => /onClick=\{\(\) => \{ setPhotos\(\(cur\) => cur\.filter\(\(_, j\) => j !== k\)\); setPhotoErr\(null\); \}\}/.test(src);
  say(removeClears(panel), 'W370 F4: Remove clears the refusal (its row number would go stale)');
  const stale = panel.replace('setPhotos((cur) => cur.filter((_, j) => j !== k)); setPhotoErr(null);', 'setPhotos((cur) => cur.filter((_, j) => j !== k));');
  say(stale !== panel && !removeClears(stale), 'MUTANT: a Remove that keeps the stale refusal is caught');
  say(/setPhotoErr\(PER_FILE\.includes\(o\.error\.key\) \? \{ \.\.\.o\.error, index: k \} : o\.error\)/.test(panel) && /markedRows\(photoErr\)\.includes\(k\) && <span[^>]*>\{WP\.row_mark\}/.test(panel), 'W370 P3: an upload refusal carries its row, and the row shows the mark');
}
export function uploadOnPress(src) {
  const fn = /async function sendChanges\(\)[\s\S]*?\n  \}\n/.exec(src)?.[0] ?? '';
  return src.split('/change/photo').length - 1 === 1 && fn.includes('/change/photo') && fn.indexOf('/change/photo') < fn.indexOf('/change/confirm') && fn.indexOf('photoPreflight(') < fn.indexOf('/change/photo') && /'x-photo-mine': 'yes'/.test(fn) && !/useEffect/.test(src);
}
const hiddenSafe = (src) => /const attached = needsPhoto\(proposal\) \? photos : \[\];/.test(src) && /for \(let k = 0; k < attached\.length; k\+\+\) \{ const x = attached\[k\];/.test(src) && /photoPreflight\(proposal, attached\./.test(src);
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
for (const k of ['too_long', 'paused', 'daily_limit', 'not_available', 'not_understood', 'refused', 'failed', 'confirm_failed', 'nothing_to_send', 'not_taken', 'kinds_changed', 'undo_pending']) used.add(k);
const photoWords = words.slice(words.indexOf('"photos"'));
const pUsed = new Set([...panel.matchAll(/\bWP\.([a-z_]+)/g)].map((m) => m[1]));
const pErr = ['mine_needed', 'photo_needed', 'too_many', 'too_small', 'unreadable', 'wrong_type', 'too_big', 'daily_limit', 'failed'];
const pMissing = [...pUsed, ...pErr].filter((k) => !new RegExp(`"${k}":`).test(photoWords));
say(words.includes('"photos"') && pMissing.length === 0 && /\{width\}/.test(photoWords) && /\{height\}/.test(photoWords), `W318: every photo word the panel shows is in WORDS.chat.photos, and too_small carries {width} and {height}${pMissing.length ? ` (missing: ${pMissing.join(', ')})` : ''}`);
const missing = [...used].filter((k) => !new RegExp(`"${k}":`).test(words.slice(words.indexOf('"chat"'))));
say(words.includes('"chat"') && missing.length === 0, `every word the panel shows is in WORDS.chat${missing.length ? ` (missing: ${missing.join(', ')})` : ''}`);
say(!/[–—]/.test(panel + words) && /[—]/.test('a — b'), 'no em or en dash in the panel or its words (and the grep sees one when there is one)');
/* W401 (4): each item shows its kind in plain words, and the confirm sends the kinds shown; a mismatch reads kinds_changed */
{
  const K = WORDS.chat.kinds ?? {};
  const keys = ['words', 'removal', 'photo', 'colours', 'fonts', 'layout', 'design-swap'];
  say(keys.every((k) => typeof K[k] === 'string' && K[k].length > 0), 'W401 (4): WORDS.chat.kinds has a label for every kind and for a removal');
  const it = (kind, wanted) => ({ kind, target: 't', wanted });
  say(L.kindOf(it('words', 'Remove: "We are licensed."')) === 'removal' && L.kindOf(it('words', 'remove: \u201cOur team\u201d')) === 'removal' && L.kindOf(it('layout', 'Remove: "Our gallery"')) === 'layout' && L.kindOf(it('photo', 'Remove: "x"')) === 'photo' && L.kindOf(it('words', 'Saturday 8 to noon')) === 'words' && L.kindOf(it('layout', 'hide the gallery')) === 'layout' && L.kindOf(it('colours', 'Remove: "x"')) === 'colours', 'W401 (4): a quoted removal on a WORDS item shows as a removal (critic condition 1: a layout or photo removal keeps its own label)');
  say(JSON.stringify(L.kindsOf({ items: [it('words', 'a'), it('layout', 'b')], out_of_scope: [], questions: [] })) === '["words","layout"]', 'W401 (4): the kinds sent are the items\' kinds, in order');
  say(L.confirmOutcome(409, { ok: false, reason: 'kinds-changed' }).key === 'kinds_changed', 'W401 (4): the Worker\'s kinds-changed refusal reads kinds_changed');
  say(L.confirmOutcome(409, { ok: false, reason: 'undo-pending' }).key === 'undo_pending', 'W300: the Worker\'s undo-pending refusal reads undo_pending (never "press again")');
  const shows = (src) => /items=\{proposal\.items\.map\(\(i\) => `\$\{W\.kinds\[kindOf\(i\)\]\}: \$\{shownWanted\(i\)\}`\)\}/.test(src);
  say(L.shownWanted(it('words', 'Remove: "We are licensed."')) === '\u201cWe are licensed.\u201d' && L.shownWanted(it('layout', 'Remove: "Our gallery"')) === 'Remove: "Our gallery"', 'W401 (4) F3: a words removal shows its quoted words without the Remove: prefix; a layout removal keeps it');
  say(!/press Send these changes again/i.test(WORDS.chat.kinds_changed) && /write again below/.test(WORDS.chat.kinds_changed), 'W401 (4) critic condition 2: kinds_changed never tells the owner to press Send again (it would loop)');
  const sends = (src) => (src.match(/kinds: kindsOf\(proposal\)/g) ?? []).length === 2;
  say(shows(panel) && sends(panel), 'W401 (4): the list shows "<kind>: <owner\'s words>", and both confirm bodies carry the kinds shown');
  const m1 = panel.replace('`${W.kinds[kindOf(i)]}: ${shownWanted(i)}`', 'i.wanted'), m2 = panel.replace(/, kinds: kindsOf\(proposal\)/g, '');
  say(m1 !== panel && !shows(m1) && m2 !== panel && !sends(m2), 'MUTANT: a list without kinds, or a confirm without them, is caught');
}
console.log(bad ? `account-chat-test: ${bad} FAILED` : 'account-chat-test: every arm holds');
process.exit(bad ? 1 : 0);
