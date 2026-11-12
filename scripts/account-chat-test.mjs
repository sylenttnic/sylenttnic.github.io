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
say(L.chatOutcome(503, { conversation: conv }).conversation === conv, 'a kept message keeps its conversation');
say(L.confirmOutcome(200, { ok: true, confirmed_at: 'x' }).kind === 'confirmed' && L.confirmOutcome(200, { ok: true, already: true }).kind === 'confirmed', 'a confirm, and a repeated one, read confirmed (one request)');
say(L.confirmOutcome(404, { error: 'nothing to send: ask in the chat first' }).key === 'nothing_to_send' && L.confirmOutcome(500, {}).key === 'confirm_failed' && L.confirmOutcome(401, {}).kind === 'signed-out', 'confirm refusals map');
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

const acct = fs.readFileSync(path.join(DIR, 'AccountClient.tsx'), 'utf8');
const at = acct.indexOf('<ChatPanel'), signedOutReturn = acct.indexOf("if (view === 'signed-out') return"), errReturn = acct.indexOf("if (view === 'error' || !acct) return");
say(at > 0 && signedOutReturn > 0 && errReturn > 0 && at > signedOutReturn && at > errReturn && (acct.match(/<ChatPanel/g) ?? []).length === 1, 'the panel renders only after the signed-out and error returns (signed in, with an account read)');

const words = fs.readFileSync(path.join(DIR, 'words.ts'), 'utf8');
const used = new Set([...panel.matchAll(/\bW\.([a-z_]+)/g)].map((m) => m[1]));
for (const k of ['too_long', 'paused', 'daily_limit', 'not_available', 'not_understood', 'refused', 'failed', 'confirm_failed', 'nothing_to_send']) used.add(k);
const missing = [...used].filter((k) => !new RegExp(`"${k}":`).test(words.slice(words.indexOf('"chat"'))));
say(words.includes('"chat"') && missing.length === 0, `every word the panel shows is in WORDS.chat${missing.length ? ` (missing: ${missing.join(', ')})` : ''}`);
say(!/[–—]/.test(panel + words) && /[—]/.test('a — b'), 'no em or en dash in the panel or its words (and the grep sees one when there is one)');
console.log(bad ? `account-chat-test: ${bad} FAILED` : 'account-chat-test: every arm holds');
process.exit(bad ? 1 : 0);
