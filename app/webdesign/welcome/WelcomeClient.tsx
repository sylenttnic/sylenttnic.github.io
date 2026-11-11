'use client';

import { useEffect, useState } from 'react';
import { WORDS } from './words';

// The welcome page (W32, row 58 (a)). The token rides in the URL FRAGMENT (#confirm=, #notme= or #signin=), so it
// never reaches a server log or a Referer. A GET decides nothing: the click is a POST, made here, because
// mail scanners open links. The session the click returns lives in sessionStorage only and is the one thing
// that may pick a design; the Worker refuses a pick from anywhere else. W296: #signin= (a single-use link the
// sign-in email carries) signs a verified owner back in the same way; the ask for one (POST /owner/signin-ask) is
// answered identically for every address, and only the business's own confirmed address is ever mailed.
const API = 'https://clients.sylentt.com';
type Design = { n: number; url: string };
type Info = { name: string | null; designs: Design[]; picked: number | null };
type View = 'arrived' | 'confirming' | 'failed' | 'verified' | 'notme' | 'notme-failed' | 'error' | 'signing-in' | 'signin-failed';
type Ask = 'idle' | 'busy' | 'sent' | 'invalid';
const ADDRESS = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SKEY = 'sylentt-owner-session';
const fill = (s: string, n: number) => s.replace('{n}', String(n));

const store = {
  get: () => { try { return sessionStorage.getItem(SKEY); } catch { return null; } },
  set: (v: string) => { try { sessionStorage.setItem(SKEY, v); } catch { /* the session then lasts this page view only */ } },
};

async function readInfo(session: string): Promise<Info | null> {
  const r = await fetch(`${API}/owner/info`, { headers: { authorization: `Bearer ${session}` } });
  return r.ok ? ((await r.json()) as Info) : null;
}

export default function WelcomeClient() {
  const [view, setView] = useState<View>('arrived');
  const [info, setInfo] = useState<Info | null>(null);
  const [session, setSession] = useState<string | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [ask, setAsk] = useState<Ask>('idle');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const m = /^#(confirm|notme|signin)=([\w.-]+)$/.exec(window.location.hash);
    // take the token out of the address bar at once, so it is not copied, bookmarked or shared by accident
    if (m) history.replaceState(null, '', window.location.pathname);
    (async () => {
      try {
        if (m?.[1] === 'confirm') {
          setView('confirming');
          const r = await fetch(`${API}/owner/confirm`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ t: m[2] }) });
          if (!r.ok) { setView('failed'); return; }
          const j = await r.json();
          store.set(j.session); setSession(j.session);
          const i = await readInfo(j.session); setInfo(i); setPicked(i?.picked ?? null); setView('verified');
        } else if (m?.[1] === 'signin') {
          setView('signing-in');
          const r = await fetch(`${API}/owner/signin`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ t: m[2] }) });
          if (!r.ok) { setView('signin-failed'); return; }
          const j = await r.json();
          store.set(j.session); setSession(j.session); setSignedIn(true);
          const i = await readInfo(j.session); setInfo(i); setPicked(i?.picked ?? null); setView('verified');
        } else if (m?.[1] === 'notme') {
          const r = await fetch(`${API}/owner/not-me`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ t: m[2] }) });
          setView(r.ok ? 'notme' : 'notme-failed');
        } else {
          const s = store.get();
          if (s) { const i = await readInfo(s); if (i) { setSession(s); setSignedIn(true); setInfo(i); setPicked(i.picked); setView('verified'); } }
        }
      } catch { setView('error'); }
    })();
  }, []);

  async function askSignIn(e: React.FormEvent) {
    e.preventDefault();
    const a = address.trim();
    if (!ADDRESS.test(a)) { setAsk('invalid'); return; }
    setAsk('busy');
    try {
      const r = await fetch(`${API}/owner/signin-ask`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ address: a }) });
      if (r.status === 400) setAsk('invalid'); else if (r.ok) setAsk('sent'); else setView('error');
    } catch { setView('error'); }
  }

  async function pick(n: number) {
    if (!session || busy) return;
    setBusy(true);
    try {
      const r = await fetch(`${API}/owner/design`, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${session}` }, body: JSON.stringify({ design: n }) });
      if (r.ok) setPicked(n); else setView('error');
    } catch { setView('error'); } finally { setBusy(false); }
  }

  const H = ({ children }: { children: React.ReactNode }) => <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink mb-6">{children}</h1>;
  const P = ({ children }: { children: React.ReactNode }) => <p className="text-lg text-ink/90 font-sans leading-relaxed max-w-2xl mb-4">{children}</p>;

  const askForm = (
    <section aria-labelledby="signin-ask" className="mt-10">
      <h2 id="signin-ask" className="font-display text-xl font-bold text-ink mb-2">{WORDS.signin_ask.title}</h2>
      <P>{WORDS.signin_ask.body}</P>
      {ask === 'sent' ? (
        <p role="status" className="text-lg text-ink/90 font-sans leading-relaxed max-w-2xl mb-4">{WORDS.signin_ask.sent}</p>
      ) : (
        <form onSubmit={askSignIn} noValidate className="max-w-md">
          <label htmlFor="signin-address" className="block font-sans font-semibold text-ink mb-1">{WORDS.signin_ask.field_label}</label>
          <input id="signin-address" type="email" autoComplete="email" value={address} onChange={(e) => { setAddress(e.target.value); if (ask === 'invalid') setAsk('idle'); }} aria-invalid={ask === 'invalid'} aria-describedby={ask === 'invalid' ? 'signin-invalid' : undefined} className="w-full rounded border border-ink/30 px-3 py-2 font-sans text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
          {ask === 'invalid' && <p id="signin-invalid" role="alert" className="mt-2 text-sm font-sans text-ink">{WORDS.signin_ask.invalid_email}</p>}
          <button type="submit" disabled={ask === 'busy'} className="mt-4 rounded bg-accent px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60">{WORDS.signin_ask.button}</button>
        </form>
      )}
    </section>
  );

  if (view === 'signing-in') return <div role="status"><H>{WORDS.signing_in.title}</H><P>{WORDS.signing_in.body}</P></div>;
  if (view === 'signin-failed') return <div><H>{WORDS.signin_failed.title}</H><P>{WORDS.signin_failed.body}</P>{askForm}</div>;
  if (view === 'confirming') return <div role="status"><H>{WORDS.confirming.title}</H><P>{WORDS.confirming.body}</P></div>;
  if (view === 'failed') return <div><H>{WORDS.confirm_failed.title}</H><P>{WORDS.confirm_failed.body}</P></div>;
  if (view === 'notme') return <div><H>{WORDS.notme_done.title}</H><P>{WORDS.notme_done.body}</P></div>;
  if (view === 'notme-failed') return <div><H>{WORDS.notme_failed.title}</H><P>{WORDS.notme_failed.body}</P></div>;
  if (view === 'error') return <div><H>{WORDS.error_generic.title}</H><P>{WORDS.error_generic.body}</P></div>;

  if (view === 'verified') {
    const designs = info?.designs ?? [];
    const multi = designs.length > 1;
    return (
      <div>
        {multi && picked == null ? (
          <>
            <H>{WORDS.verified_multi.title}</H>
            <P>{WORDS.verified_multi.body}</P>
            <ul className="grid gap-4 md:grid-cols-3 mb-8">
              {designs.map((d) => (
                <li key={d.n} className="border border-ink/15 rounded-lg p-4">
                  <p className="font-display font-bold text-ink mb-2">{fill(WORDS.verified_multi.design_label, d.n)}</p>
                  <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent-link hover:underline">{WORDS.verified_multi.look_again}</a>
                  <button type="button" disabled={busy} onClick={() => pick(d.n)} className="mt-4 block w-full rounded bg-accent px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60">{WORDS.verified_multi.use_button}</button>
                </li>
              ))}
            </ul>
          </>
        ) : multi ? (
          <><H>{signedIn ? WORDS.signed_in.title : WORDS.verified_single.title}</H><P>{fill(WORDS.verified_multi.picked, picked as number)}</P>{signedIn && <P>{WORDS.signed_in.body}</P>}</>
        ) : (
          <><H>{signedIn ? WORDS.signed_in.title : WORDS.verified_single.title}</H><P>{WORDS.verified_single.body}</P>{signedIn && <P>{WORDS.signed_in.body}</P>}</>
        )}
        {(picked != null || !multi) && (
          <section aria-labelledby="next-steps">
            <h2 id="next-steps" className="font-display text-2xl font-bold text-ink mb-3">{WORDS.next_steps.title}</h2>
            <P>{WORDS.next_steps.intro}</P>
            <ol className="list-decimal pl-6 max-w-2xl mb-4 space-y-3 text-ink/90 font-sans">
              {WORDS.next_steps.items.map((it) => <li key={it.label}><strong>{it.label}.</strong> {it.body}</li>)}
            </ol>
            <P>{WORDS.next_steps.outro}</P>
          </section>
        )}
      </div>
    );
  }

  return (
    <div>
      <H>{WORDS.arrived.title}</H>
      <P>{WORDS.arrived.body}</P>
      <P>{WORDS.arrived.preview_note}</P>
      <P>{WORDS.arrived.free_note}</P>
      <h2 className="font-display text-xl font-bold text-ink mt-8 mb-2">{WORDS.arrived.no_email_title}</h2>
      <P>{WORDS.arrived.no_email}</P>
      {askForm}
    </div>
  );
}
