'use client';

import { useState } from 'react';
import { WORDS } from './words';
import { MAX_CHARS, canConfirm, chatOutcome, confirmOutcome, type ChatErrorKey, type Proposal } from './chat-logic';

// The chat panel (W311, rows 118 and 58; PLAN.md 9b steps 2 to 4). Rendered only inside the signed-in account page.
// A message goes to the Worker's POST /change/chat with this tab's session; the Worker answers a list of the changes it
// understood (or a question). NOTHING is asked for until the owner presses "Send these changes": the confirm is posted only
// from that button's handler, never from an effect or on its own (scripts/account-chat-test.mjs holds this).
const API = 'https://clients.sylentt.com';
const SKEY = 'sylentt-owner-session';
const W = WORDS.chat;
type ErrKey = ChatErrorKey | 'confirm_failed' | 'nothing_to_send';

export default function ChatPanel({ onSignedOut }: { onSignedOut: () => void }) {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<string | null>(null);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [reply, setReply] = useState<string | null>(null);
  const [busy, setBusy] = useState<'idle' | 'sending' | 'confirming'>('idle');
  const [err, setErr] = useState<ErrKey | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const session = () => { try { return sessionStorage.getItem(SKEY); } catch { return null; } };
  const signedOut = () => { try { sessionStorage.removeItem(SKEY); } catch { /* ignore */ } onSignedOut(); };

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    if (text.length > MAX_CHARS) { setErr('too_long'); return; }
    const s = session();
    if (!s) { onSignedOut(); return; }
    setBusy('sending'); setErr(null);
    try {
      const r = await fetch(`${API}/change/chat`, { method: 'POST', headers: { authorization: `Bearer ${s}`, 'content-type': 'application/json' }, body: JSON.stringify(conversation ? { message: text, conversation } : { message: text }) });
      const o = chatOutcome(r.status, await r.json().catch(() => null));
      if (o.kind === 'signed-out') { signedOut(); return; }
      if (o.kind === 'error') { setErr(o.key); if (o.conversation) setConversation(o.conversation); return; }
      setConversation(o.conversation); setMessage('');
      if (o.kind === 'proposal') { setProposal(o.proposal); setReply(null); } else { setReply(o.text); }
    } catch { setErr('failed'); } finally { setBusy('idle'); }
  }

  // The ONLY place a request is made: the owner's press of "Send these changes".
  async function sendChanges() {
    if (!canConfirm(proposal, conversation)) { setErr('nothing_to_send'); return; }
    const s = session();
    if (!s) { onSignedOut(); return; }
    setBusy('confirming'); setErr(null);
    try {
      const r = await fetch(`${API}/change/confirm`, { method: 'POST', headers: { authorization: `Bearer ${s}`, 'content-type': 'application/json' }, body: JSON.stringify({ conversation }) });
      const o = confirmOutcome(r.status, await r.json().catch(() => null));
      if (o.kind === 'signed-out') { signedOut(); return; }
      if (o.kind === 'error') { setErr(o.key); return; }
      setConfirmed(true);
    } catch { setErr('confirm_failed'); } finally { setBusy('idle'); }
  }

  function startNew() { setConversation(null); setProposal(null); setReply(null); setErr(null); setConfirmed(false); setMessage(''); }

  const P = ({ children }: { children: React.ReactNode }) => <p className="text-lg text-ink/90 font-sans leading-relaxed max-w-2xl mb-4">{children}</p>;
  const List = ({ heading, items }: { heading: string; items: string[] }) => items.length ? (
    <div className="mb-3"><p className="font-semibold text-ink font-sans mb-1">{heading}</p><ul className="list-disc pl-5 space-y-1 font-sans text-ink/90">{items.map((t, k) => <li key={k}>{t}</li>)}</ul></div>
  ) : null;
  const btn = 'rounded bg-accent px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60';

  if (confirmed) return (
    <div aria-live="polite">
      <P>{W.confirmed}</P>
      <p><button type="button" onClick={startNew} className={btn}>{W.new_label}</button></p>
    </div>
  );

  return (
    <div className="max-w-2xl">
      {reply && <div className="mb-4 border border-ink/15 rounded-lg p-4"><p className="font-semibold text-ink font-sans mb-1">{W.reply_label}</p><p className="font-sans text-ink/90 whitespace-pre-line">{reply}</p></div>}
      {proposal && (
        <div className="mb-4 border border-ink/15 rounded-lg p-4" data-chat-proposal>
          <List heading={W.proposal_heading} items={proposal.items.map((i) => i.wanted)} />
          <List heading={W.out_of_scope_heading} items={proposal.out_of_scope} />
          <List heading={W.questions_heading} items={proposal.questions} />
          {proposal.items.length > 0 && <>
            <p className="text-sm text-ink/80 font-sans mb-3">{W.proposal_note}</p>
            <p><button type="button" onClick={sendChanges} disabled={busy !== 'idle'} className={btn}>{W.confirm_label}</button></p>
          </>}
        </div>
      )}
      <form onSubmit={sendMessage} className="mb-3">
        <label htmlFor="chat-message" className="block font-semibold text-ink font-sans mb-1">{W.input_label}</label>
        <textarea id="chat-message" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={MAX_CHARS + 500} rows={4} placeholder={W.placeholder} className="w-full rounded border border-ink/25 p-3 font-sans text-ink bg-transparent mb-2" />
        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={busy !== 'idle' || !message.trim()} className={btn}>{W.send_label}</button>
          {(proposal || reply) && <button type="button" onClick={startNew} disabled={busy !== 'idle'} className="text-sm text-accent-link hover:underline">{W.new_label}</button>}
        </div>
      </form>
      <div aria-live="polite">
        {busy === 'sending' && <P>{W.sending}</P>}
        {busy === 'confirming' && <P>{W.confirming}</P>}
        {err && <P>{W[err]}</P>}
      </div>
    </div>
  );
}
