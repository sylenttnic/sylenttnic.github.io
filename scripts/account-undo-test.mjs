#!/usr/bin/env node
/* account-undo-test (W300): the account page's Undo. Offline; each arm can fail (C4).
     node --experimental-strip-types scripts/account-undo-test.mjs   (Node 22; exit 0 = every arm holds)
   - offered on the newest request only, and only while it is live (done);
   - the Worker's answers map to the right words (undo-logic.ts), and every key has its words in WORDS.undo;
   - /change/undo is posted only from sendUndo, which only the confirm button calls. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'app/webdesign/account');
const L = await import(pathToFileURL(path.join(DIR, 'undo-logic.ts')).href);
const { WORDS } = await import(pathToFileURL(path.join(DIR, 'words.ts')).href);
let bad = 0; const say = (ok, what) => { if (!ok) bad++; console.log(`${ok ? '  ok  ' : '  FAIL'} ${what}`); };
const R = (n, state) => ({ n, state });

say(L.undoOffered([R(1, 'done'), R(2, 'done')], 2) && !L.undoOffered([R(1, 'done'), R(2, 'done')], 1), 'offered on the newest request only');
say(!L.undoOffered([R(1, 'done'), R(2, 'ready')], 2) && !L.undoOffered([R(1, 'done'), R(2, 'ready')], 1), 'not while the newest is not live, and never on an earlier one');
say(!L.undoOffered([R(1, 'undone')], 1) && !L.undoOffered([], 1), 'not on an undone change; nothing with no request');
for (const [st, b, key] of [[200, { ok: true, asked_at: 'x' }, 'asked'], [200, { ok: true, already: true }, 'asked'], [409, { ok: false, reason: 'not-latest' }, 'not_latest'], [409, { ok: false, reason: 'not-live' }, 'not_live'], [409, { ok: false, reason: 'ended' }, 'ended'], [404, { ok: false, reason: 'no-change' }, 'nothing'], [400, { ok: false, reason: 'which-change' }, 'nothing'], [500, {}, 'failed'], [200, { ok: false }, 'failed']]) {
  const o = L.undoOutcome(st, b); say(o.kind === 'done' && o.key === key, `HTTP ${st} ${JSON.stringify(b).slice(0, 36)} reads ${key}`);
}
say(L.undoOutcome(401, {}).kind === 'signed-out', 'unsigned: signed out');
for (const k of ['button', 'confirm_question', 'confirm_yes', 'confirm_no', 'asked', 'not_latest', 'not_live', 'ended', 'nothing', 'failed']) say(typeof WORDS.undo?.[k] === 'string' && WORDS.undo[k].trim() && !/[–—]/.test(WORDS.undo[k]), `WORDS.undo.${k} present, no long dash`);
const src = fs.readFileSync(path.join(DIR, 'AccountClient.tsx'), 'utf8');
const posts = src.match(/\/change\/undo/g) ?? [];
say(posts.length === 1 && /async function sendUndo\(n: number\) \{[\s\S]{0,600}\/change\/undo/.test(src), '/change/undo is posted from sendUndo only');
const calls = src.match(/sendUndo\(/g) ?? [];
say(calls.length === 2 && /onClick=\{\(\) => sendUndo\(r\.n\)\}[^>]*>\{WORDS\.undo\.confirm_yes\}/.test(src), 'sendUndo is called only by the confirm button');
say(!/useEffect\([\s\S]{0,400}sendUndo/.test(src), 'never sent from an effect');
console.log(bad ? `account-undo-test: ${bad} FAILED` : 'account-undo-test: every arm holds');
process.exit(bad ? 1 : 0);
