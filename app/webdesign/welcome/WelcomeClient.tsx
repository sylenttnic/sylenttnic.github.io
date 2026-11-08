'use client';

import { useEffect, useState } from 'react';
import { WORDS } from './words';

// The welcome page (W32, row 58 (a)). The token rides in the URL FRAGMENT (#confirm= or #notme=), so it
// never reaches a server log or a Referer. A GET decides nothing: the click is a POST, made here, because
// mail scanners open links. The session the click returns lives in sessionStorage only and is the one thing
// that may pick a design; the Worker refuses a pick from anywhere else.
const API = 'https://clients.sylentt.com';
type Design = { n: number; url: string };
type Info = { name: string | null; designs: Design[]; picked: number | null };
type View = 'arrived' | 'confirming' | 'failed' | 'verified' | 'notme' | 'notme-failed' | 'error';
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

  useEffect(() => {
    const m = /^#(confirm|notme)=([\w.-]+)$/.exec(window.location.hash);
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
        } else if (m?.[1] === 'notme') {
          const r = await fetch(`${API}/owner/not-me`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ t: m[2] }) });
          setView(r.ok ? 'notme' : 'notme-failed');
        } else {
          const s = store.get();
          if (s) { const i = await readInfo(s); if (i) { setSession(s); setInfo(i); setPicked(i.picked); setView('verified'); } }
        }
      } catch { setView('error'); }
    })();
  }, []);

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
          <><H>{WORDS.verified_single.title}</H><P>{fill(WORDS.verified_multi.picked, picked as number)}</P></>
        ) : (
          <><H>{WORDS.verified_single.title}</H><P>{WORDS.verified_single.body}</P></>
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
    </div>
  );
}
