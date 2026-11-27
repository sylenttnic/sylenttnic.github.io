// W300 (rows 118, 58 (d); runs/client-launch/PLAN.md 9b step 7 in sylentt-smb-site-generation): Undo on the owner's latest
// live change. The Worker (POST /change/undo, worker-clients/src/undo.js) decides; this file only says which row offers it
// and what each answer reads as. Offline-tested by scripts/account-undo-test.mjs.
export type UndoKey = 'asked' | 'not_latest' | 'not_live' | 'ended' | 'nothing' | 'failed';
export type UndoOutcome = { kind: 'signed-out' } | { kind: 'done'; key: UndoKey };

/* only the newest request, and only while it is live (`done`) */
export function undoOffered(requests: { n: number; state: string | null }[], n: number): boolean {
  if (!requests.length) return false;
  const newest = requests.reduce((a, b) => (b.n > a.n ? b : a));
  return newest.n === n && newest.state === 'done';
}

export function undoOutcome(status: number, body: unknown): UndoOutcome {
  const b = (body ?? {}) as { ok?: unknown; reason?: unknown };
  if (status === 401) return { kind: 'signed-out' };
  if (status === 200 && b.ok === true) return { kind: 'done', key: 'asked' };
  if (b.reason === 'not-latest') return { kind: 'done', key: 'not_latest' };
  if (b.reason === 'not-live') return { kind: 'done', key: 'not_live' };
  if (b.reason === 'ended') return { kind: 'done', key: 'ended' };
  if (b.reason === 'no-change' || b.reason === 'which-change') return { kind: 'done', key: 'nothing' };
  return { kind: 'done', key: 'failed' };
}
