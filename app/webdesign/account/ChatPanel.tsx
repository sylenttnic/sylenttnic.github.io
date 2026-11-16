'use client';

import { useRef, useState } from 'react';
import { WORDS } from './words';
import { MAX_CHARS, canConfirm, chatOutcome, hasSwap, confirmOutcome, needsPhoto, photoPreflight, photoOutcome, fillPhoto, markedRows, PER_FILE, PHOTO_TYPES, type ChatErrorKey, type Proposal, type Place, type PhotoError } from './chat-logic';

// The chat panel (W311, rows 118 and 58; PLAN.md 9b steps 2 to 4). Rendered only inside the signed-in account page.
// A message goes to the Worker's POST /change/chat with this tab's session; the Worker answers a list of the changes it
// understood (or a question). NOTHING is asked for until the owner presses "Send these changes": the confirm is posted only
// from that button's handler, never from an effect or on its own (scripts/account-chat-test.mjs holds this). W318: the
// owner's photos are chosen here but uploaded only from that same handler, each with their "these are mine" (x-photo-mine).
const API = 'https://clients.sylentt.com';
const SKEY = 'sylentt-owner-session';
const W = WORDS.chat;
const WP = WORDS.chat.photos;
type ErrKey = ChatErrorKey | 'confirm_failed' | 'nothing_to_send' | 'not_taken';

export default function ChatPanel({ onSignedOut }: { onSignedOut: () => void }) {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<string | null>(null);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [reply, setReply] = useState<string | null>(null);
  const [busy, setBusy] = useState<'idle' | 'sending' | 'uploading' | 'confirming'>('idle');
  const [err, setErr] = useState<ErrKey | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [photos, setPhotos] = useState<{ file: File; place: Place }[]>([]);
  // W347 (2): a photo the Worker already took, by file and place, is not sent again on a retry (each upload counts toward the day's limit)
  const taken = useRef(new Map<File, { place: Place; photo: string }>());
  const [mine, setMine] = useState(false);
  const [photoErr, setPhotoErr] = useState<PhotoError | null>(null);

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

  // The ONLY place a request is made, and the only place a photo is uploaded: the owner's press of "Send these changes".
  async function sendChanges() {
    if (!canConfirm(proposal, conversation)) { setErr('nothing_to_send'); return; }
    // critic F4: photos count only while the list has a photo change (the picker is hidden otherwise, so are they)
    const attached = needsPhoto(proposal) ? photos : [];
    const pre = photoPreflight(proposal, attached.map((x) => x.file), mine);
    if (pre) { setPhotoErr(pre); return; }
    const s = session();
    if (!s) { onSignedOut(); return; }
    setErr(null); setPhotoErr(null);
    try {
      const ids: string[] = [];
      if (attached.length) setBusy('uploading');
      for (let k = 0; k < attached.length; k++) { const x = attached[k];
        const had = taken.current.get(x.file);
        if (had && had.place === x.place) { ids.push(had.photo); continue; }
        const up = await fetch(`${API}/change/photo`, { method: 'POST', headers: { authorization: `Bearer ${s}`, 'content-type': x.file.type, 'x-photo-mine': 'yes', 'x-photo-place': x.place }, body: x.file });
        const o = photoOutcome(up.status, await up.json().catch(() => null));
        if (o.kind === 'signed-out') { signedOut(); return; }
        // W370 (P3): a refusal about this upload carries its row (attached is the list as shown, in order)
        if (o.kind === 'error') { setPhotoErr(PER_FILE.includes(o.error.key) ? { ...o.error, index: k } : o.error); return; }
        taken.current.set(x.file, { place: x.place, photo: o.photo });
        ids.push(o.photo);
      }
      setBusy('confirming');
      const r = await fetch(`${API}/change/confirm`, { method: 'POST', headers: { authorization: `Bearer ${s}`, 'content-type': 'application/json' }, body: JSON.stringify(ids.length ? { conversation, photos: Array.from(new Set(ids)) } : { conversation }) });
      const o = confirmOutcome(r.status, await r.json().catch(() => null));
      if (o.kind === 'signed-out') { signedOut(); return; }
      if (o.kind === 'error') { setErr(o.key); return; }
      setConfirmed(true);
    } catch { setErr('confirm_failed'); } finally { setBusy('idle'); }
  }

  function startNew() { setConversation(null); setProposal(null); setReply(null); setErr(null); setConfirmed(false); setMessage(''); setPhotos([]); taken.current.clear(); setMine(false); setPhotoErr(null); }

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
            {hasSwap(proposal) && <p className="text-sm text-ink/90 font-sans font-semibold mb-3" data-swap-note>{W.design_swap_note}</p>}
            {needsPhoto(proposal) && (
              <fieldset className="mb-4 border border-ink/15 rounded-lg p-4" data-chat-photos>
                <legend className="font-semibold text-ink font-sans px-1">{WP.heading}</legend>
                <p className="text-sm text-ink/80 font-sans mb-3">{WP.intro}</p>
                <label htmlFor="chat-photos" className="block font-sans text-ink mb-1">{WP.file_label}</label>
                <input id="chat-photos" type="file" multiple accept={PHOTO_TYPES.join(',')} disabled={busy !== 'idle'} onChange={(e) => { const f = Array.from(e.target.files ?? []); setPhotos((cur) => [...cur, ...f.map((file) => ({ file, place: 'gallery' as Place }))]); setPhotoErr(null); e.target.value = ''; }} className="mb-3 font-sans text-ink" />
                {photos.length > 0 && <ul className="mb-3 space-y-2">{photos.map((x, k) => (
                  <li key={k} className="flex flex-wrap items-center gap-3 font-sans text-ink/90">
                    <span className="break-all">{x.file.name}</span>
                    {markedRows(photoErr).includes(k) && <span className="text-sm font-semibold text-ink" data-photo-mark>{WP.row_mark}</span>}
                    <label className="text-sm">{WP.place_label}{' '}
                      <select value={x.place} onChange={(e) => setPhotos((cur) => cur.map((y, j) => (j === k ? { ...y, place: e.target.value as Place } : y)))} className="rounded border border-ink/25 bg-transparent p-1">
                        <option value="hero">{WP.place_hero}</option>
                        <option value="gallery">{WP.place_gallery}</option>
                      </select>
                    </label>
                    <button type="button" onClick={() => { setPhotos((cur) => cur.filter((_, j) => j !== k)); setPhotoErr(null); }} className="text-sm text-accent-link hover:underline">{WP.remove_label}</button>
                  </li>))}</ul>}
                <label className="flex items-start gap-2 font-sans text-ink"><input type="checkbox" checked={mine} onChange={(e) => { setMine(e.target.checked); setPhotoErr(null); }} className="mt-1" /><span>{WP.mine_label}</span></label>
              </fieldset>
            )}
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
        {busy === 'uploading' && <P>{WP.uploading}</P>}
        {busy === 'confirming' && <P>{W.confirming}</P>}
        {photoErr && <P>{fillPhoto(WP.errors[photoErr.key], photoErr, { hero: WP.place_hero, gallery: WP.place_gallery }, photos.map((x) => x.file.name), { also: WP.also, also_one: WP.also_one })}</P>}
        {err && <P>{W[err]}</P>}
      </div>
    </div>
  );
}
