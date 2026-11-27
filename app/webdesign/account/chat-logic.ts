// The chat panel's logic (W311, rows 118 and 58), kept pure so scripts/account-chat-test.mjs can prove it without a browser.
// The Worker's answers (sylentt-smb-site-generation worker-clients/src/change.js and confirm.js) map to one panel state each.
// Nothing here sends anything: the confirm is posted only from the "Send these changes" button (ChatPanel.tsx).

export type Item = { kind: string; target: string; wanted: string; owner_statements?: string[] };
export type Proposal = { items: Item[]; out_of_scope: string[]; questions: string[] };
export type ChatErrorKey = 'too_long' | 'paused' | 'daily_limit' | 'not_available' | 'not_understood' | 'refused' | 'failed';
export type ChatOutcome =
  | { kind: 'signed-out' }
  | { kind: 'proposal'; conversation: string; proposal: Proposal }
  | { kind: 'reply'; conversation: string; text: string }
  | { kind: 'error'; key: ChatErrorKey; conversation: string | null };
export type ConfirmOutcome = { kind: 'signed-out' } | { kind: 'confirmed' } | { kind: 'error'; key: 'nothing_to_send' | 'confirm_failed' | 'not_taken' | 'kinds_changed' | 'undo_pending' };

export const MAX_CHARS = 2000;
const CONV = /^[a-z0-9-]{8,64}$/;
const strs = (x: unknown): string[] => (Array.isArray(x) ? x.filter((s): s is string => typeof s === 'string') : []);

/* A proposal is shown only when it has the shape the Worker validated: a list of items with the owner's words. */
export function asProposal(x: unknown): Proposal | null {
  const p = x as { items?: unknown; out_of_scope?: unknown; questions?: unknown } | null;
  if (!p || !Array.isArray(p.items)) return null;
  const items = p.items.filter((i): i is Item => !!i && typeof (i as Item).wanted === 'string' && typeof (i as Item).kind === 'string');
  return { items, out_of_scope: strs(p.out_of_scope), questions: strs(p.questions) };
}

/* POST /change/chat's answer -> what the panel shows. */
export function chatOutcome(status: number, body: unknown): ChatOutcome {
  const b = (body ?? {}) as { ok?: unknown; conversation?: unknown; proposal?: unknown; reply?: unknown; reason?: unknown; error?: unknown };
  const conversation = typeof b.conversation === 'string' && CONV.test(b.conversation) ? b.conversation : null;
  if (status === 401) return { kind: 'signed-out' };
  if (status === 400) return { kind: 'error', key: /characters/.test(String(b.error ?? '')) ? 'too_long' : 'failed', conversation };
  if (status === 423) return { kind: 'error', key: 'paused', conversation };
  if (status === 429) return { kind: 'error', key: 'daily_limit', conversation };
  if (status === 503) return { kind: 'error', key: 'not_available', conversation };
  // decision-critic F4: the third refusal in a day pauses the chat (422 with paused: true): say so, not "try another way"
  if (status === 422) return { kind: 'error', key: (b as { paused?: unknown }).paused === true ? 'paused' : 'not_understood', conversation };
  if (status === 200 && b.ok === false && b.reason === 'refused') return { kind: 'error', key: 'refused', conversation };
  if (status === 200 && b.ok === true && conversation) {
    const p = b.proposal == null ? null : asProposal(b.proposal);
    if (p && p.items.length) return { kind: 'proposal', conversation, proposal: p };
    if (p && (p.questions.length || p.out_of_scope.length)) return { kind: 'proposal', conversation, proposal: p };
    if (typeof b.reply === 'string' && b.reply.trim()) return { kind: 'reply', conversation, text: b.reply };
  }
  return { kind: 'error', key: 'failed', conversation };
}

/* POST /change/confirm's answer -> what the panel shows. A repeated press answers ok (already) and is the same request. */
export function confirmOutcome(status: number, body: unknown): ConfirmOutcome {
  const b = (body ?? {}) as { ok?: unknown; error?: unknown };
  if (status === 401) return { kind: 'signed-out' };
  if (status === 200 && b.ok === true) return { kind: 'confirmed' };
  if ((status === 404 || status === 422) && /nothing to send/.test(String(b.error ?? ''))) return { kind: 'error', key: 'nothing_to_send' };
  // W317: the plan is neither in its trial nor paying, so the Worker took no request (it is not worth pressing again)
  if (status === 409 && (b as { reason?: unknown }).reason === 'not-taken') return { kind: 'error', key: 'not_taken' };
  // W401 (4): the kinds the owner was shown are not the stored proposal's, so nothing was recorded
  if (status === 409 && (b as { reason?: unknown }).reason === 'kinds-changed') return { kind: 'error', key: 'kinds_changed' };
  // W300 (decision-critic F1): the owner's undo of their latest change is still on its way, so no new request is taken
  if (status === 409 && (b as { reason?: unknown }).reason === 'undo-pending') return { kind: 'error', key: 'undo_pending' };
  return { kind: 'error', key: 'confirm_failed' };
}

/* Critic F6 (PLAN.md 9c): a list that switches designs says what carries over before it can be sent. */
export const hasSwap = (p: Proposal | null) => !!p && p.items.some((i) => i.kind === 'design-swap');

/* The send button may confirm only a list that has at least one change in it. */
export const canConfirm = (p: Proposal | null, conversation: string | null) => !!p && p.items.length > 0 && !!conversation && CONV.test(conversation);

/* W318 (rows 118 (a), 58): the owner's own photos, attached to a list that includes a photo change. Nothing is uploaded
   until "Send these changes": ChatPanel's sendChanges uploads each photo (POST /change/photo) and only then confirms with
   their ids. The Worker's limits, mirrored here so the owner hears them before anything leaves the page. */
export const MAX_PHOTOS = 20;           // confirm.js: at most 20 photo ids a request
export const MAX_PHOTO_BYTES = 25 * 1000 * 1000; // confirm.js MAX_PHOTO_BYTES
export const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export type Place = 'hero' | 'gallery';
export type PhotoErrorKey = 'mine_needed' | 'photo_needed' | 'too_many' | 'empty' | 'too_small' | 'unreadable' | 'wrong_type' | 'too_big' | 'daily_limit' | 'failed';
// W370 (critic F4, P3): a refusal about one file carries that file's row (0-based, the list as shown) and, from the pre-send
// checks, the other rows with the same fault, so the words can name the row and the panel can mark each one.
export type PhotoError = { key: PhotoErrorKey; place?: Place; min?: { width: number; height: number }; index?: number; also?: number[] };
export const PER_FILE: PhotoErrorKey[] = ['too_small', 'empty', 'unreadable', 'wrong_type', 'too_big', 'failed'];
export type PhotoOutcome = { kind: 'signed-out' } | { kind: 'stored'; photo: string } | { kind: 'error'; error: PhotoError };

export const needsPhoto = (p: Proposal | null) => !!p && p.items.some((i) => i.kind === 'photo');

/* Before anything uploads: the owner's choices against the Worker's rules. null = go. */
export function photoPreflight(p: Proposal | null, photos: { size: number; type: string }[], mine: boolean): PhotoError | null {
  if (!photos.length) return needsPhoto(p) ? { key: 'photo_needed' } : null;
  if (photos.length > MAX_PHOTOS) return { key: 'too_many' };
  // W347 (3): an empty (zero-byte) file is refused here, before any upload; pressing again would only send it again
  const rows = (bad: (f: { size: number; type: string }) => boolean) => photos.map((f, i) => (bad(f) ? i : -1)).filter((i) => i >= 0);
  for (const [key, bad] of [['empty', (f) => f.size === 0], ['wrong_type', (f) => !PHOTO_TYPES.includes(f.type)], ['too_big', (f) => f.size > MAX_PHOTO_BYTES]] as [PhotoErrorKey, (f: { size: number; type: string }) => boolean][]) {
    const r = rows(bad);
    if (r.length) return { key, index: r[0], also: r.slice(1) };
  }
  if (!mine) return { key: 'mine_needed' };
  return null;
}

/* POST /change/photo's answer -> what the panel shows (confirm.js handlePhoto; W313's 422 too-small carries place and min). */
export function photoOutcome(status: number, body: unknown): PhotoOutcome {
  const b = (body ?? {}) as { ok?: unknown; photo?: unknown; code?: unknown; place?: unknown; min?: unknown };
  if (status === 401) return { kind: 'signed-out' };
  if (status === 200 && b.ok === true && typeof b.photo === 'string' && /^[0-9a-f]{64}$/.test(b.photo)) return { kind: 'stored', photo: b.photo };
  if (status === 422 && b.code === 'too-small') {
    const m = b.min as { width?: unknown; height?: unknown } | undefined;
    const place: Place = b.place === 'hero' ? 'hero' : 'gallery';
    if (m && Number.isInteger(m.width) && Number.isInteger(m.height)) return { kind: 'error', error: { key: 'too_small', place, min: { width: m.width as number, height: m.height as number } } };
    return { kind: 'error', error: { key: 'unreadable' } };
  }
  if (status === 422) return { kind: 'error', error: { key: 'unreadable' } };
  if (status === 415) return { kind: 'error', error: { key: 'wrong_type' } };
  if (status === 413) return { kind: 'error', error: { key: 'too_big' } };
  if (status === 429) return { kind: 'error', error: { key: 'daily_limit' } };
  if (status === 400 && /no photo/.test(String((b as { error?: unknown }).error ?? ''))) return { kind: 'error', error: { key: 'empty' } }; // confirm.js: a zero-byte upload
  if (status === 400 && /yours/.test(String((b as { error?: unknown }).error ?? ''))) return { kind: 'error', error: { key: 'mine_needed' } };
  return { kind: 'error', error: { key: 'failed' } };
}

/* A refusal's words with its numbers filled in: {place}, {width}, {height}, and (W370) the row: {n} (1 is the top row) and
   {file} (the name the row shows). With other rows at the same fault, the `also` sentence follows, naming the others only. */
export function fillPhoto(s: string, e: PhotoError, places: Record<Place, string>, names: string[] = [], also: { also: string; also_one: string } | null = null): string {
  const n = e.index === undefined ? '' : String(e.index + 1);
  const file = e.index === undefined ? '' : (names[e.index] ?? '');
  const out = s.replace('{n}', () => n).replace('{file}', () => file).replace('{place}', () => (e.place ? places[e.place] : '')).replace('{width}', String(e.min?.width ?? '')).replace('{height}', String(e.min?.height ?? ''));
  const others = (e.also ?? []).map((i) => String(i + 1));
  if (!others.length || !also) return out;
  const list = others.length === 1 ? others[0] : `${others.slice(0, -1).join(', ')} and ${others[others.length - 1]}`;
  return `${out} ${(others.length === 1 ? also.also_one : also.also).replace('{list}', () => list)}`;
}

/* The rows a refusal is about (each gets the "Please check this photo." mark). */
export const markedRows = (e: PhotoError | null): number[] => (e && e.index !== undefined && PER_FILE.includes(e.key) ? [e.index, ...(e.also ?? [])] : []);

/* W401 (4) (triage 2026-11-19 T5): each item is shown with its kind in plain words, and the confirm sends the kinds shown, in
   order; the Worker records nothing whose kinds differ. A removal (wanted begins Remove: "...", the change guard's
   QUOTED_REMOVAL shape) is shown as one whatever its kind field, so the owner sees it is taking words off. */
export type KindKey = 'words' | 'removal' | 'photo' | 'colours' | 'fonts' | 'layout' | 'design-swap';
/* decision-critic condition 1 (W401-kind-words-critic): the removal label only for a WORDS item; a layout or photo item keeps its
   own kind's label (its wanted still begins Remove:), and the kinds the page sends are always the items' real kinds */
const REMOVAL_SHAPE = /^\s*(?:please\s+)?(?:remove|delete|take\s+(?:down|off|out)|get\s+rid\s+of)\b\s*(?:the\s+(?:words?|line|sentence|text)\s*)?:?\s*["\u201c]/i;
export function kindOf(i: Item): KindKey {
  if (i.kind === 'words' && REMOVAL_SHAPE.test(i.wanted)) return 'removal';
  const own: readonly string[] = ['words', 'photo', 'colours', 'fonts', 'layout', 'design-swap'];
  return own.includes(i.kind) ? (i.kind as KindKey) : 'words';
}
export const kindsOf = (p: Proposal | null) => (p ? p.items.map((i) => i.kind) : []);
/* critic follow-up F3: a words removal reads "<label>: <the quoted words>", its Remove: prefix dropped; any other item as written */
export const shownWanted = (i: Item) => (kindOf(i) === 'removal' ? i.wanted.replace(REMOVAL_SHAPE, '\u201c').replace(/["\u201d]\s*[.!]?\s*$/, '\u201d') : i.wanted);
