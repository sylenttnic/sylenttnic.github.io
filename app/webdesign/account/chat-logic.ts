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
export type ConfirmOutcome = { kind: 'signed-out' } | { kind: 'confirmed' } | { kind: 'error'; key: 'nothing_to_send' | 'confirm_failed' };

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
  if (status === 422) return { kind: 'error', key: 'not_understood', conversation };
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
  return { kind: 'error', key: 'confirm_failed' };
}

/* The send button may confirm only a list that has at least one change in it. */
export const canConfirm = (p: Proposal | null, conversation: string | null) => !!p && p.items.length > 0 && !!conversation && CONV.test(conversation);
