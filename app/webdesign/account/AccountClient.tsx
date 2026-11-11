'use client';

import { useEffect, useState } from 'react';
import { WORDS } from './words';
import { WORDS as WELCOME } from '../welcome/words';

// The account page (W296, rows 118 and 58). Signed in only: the session the welcome page stored in this tab's
// sessionStorage (the confirm link or a sign-in link). Its one read is the Worker's GET /owner/account, which answers
// only a valid session and only for that session's own business. No session, an expired one, or a refusal: nothing
// about any business is shown, only the way to sign in. With no account record yet (`ready: false`) it shows no site line.
const API = 'https://clients.sylentt.com';
const SKEY = 'sylentt-owner-session';
type Item = { kind: string | null; target: string | null; wanted: string | null };
type Req = { n: number; state: string | null; confirmed_at: string | null; trial: boolean; items: Item[] };
type Account = { name: string | null; ready: boolean; plan: 'trial' | 'paying' | null; trial_ends: string | null; design: number | null; site_url: string | null; requests: Req[] };
type View = 'loading' | 'signed-out' | 'error' | 'ok';

const DATE = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Denver' });
const date = (iso: string | null) => { const t = Date.parse(iso ?? ''); return Number.isFinite(t) ? DATE.format(new Date(t)) : ''; };
const fill = (s: string, k: string, v: string | number) => s.replace(`{${k}}`, String(v));
const STATE_LABELS = WORDS.changes.states as Record<string, string>;

export default function AccountClient() {
  const [view, setView] = useState<View>('loading');
  const [acct, setAcct] = useState<Account | null>(null);

  useEffect(() => {
    let s: string | null = null;
    try { s = sessionStorage.getItem(SKEY); } catch { /* no storage: signed out */ }
    if (!s) { setView('signed-out'); return; }
    (async () => {
      try {
        const r = await fetch(`${API}/owner/account`, { headers: { authorization: `Bearer ${s}` } });
        if (r.status === 401) { try { sessionStorage.removeItem(SKEY); } catch { /* ignore */ } setView('signed-out'); return; }
        if (!r.ok) { setView('error'); return; }
        setAcct((await r.json()) as Account); setView('ok');
      } catch { setView('error'); }
    })();
  }, []);

  const H = ({ children }: { children: React.ReactNode }) => <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink mb-6">{children}</h1>;
  const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => <h2 id={id} className="font-display text-2xl font-bold text-ink mb-3">{children}</h2>;
  const P = ({ children }: { children: React.ReactNode }) => <p className="text-lg text-ink/90 font-sans leading-relaxed max-w-2xl mb-4">{children}</p>;

  if (view === 'loading') return <div role="status"><H>{WORDS.loading.title}</H></div>;
  if (view === 'signed-out') return <div><H>{WORDS.signed_out.title}</H><P>{WORDS.signed_out.body}</P><p><a href="/webdesign/welcome/" className="text-lg text-accent-link hover:underline">{WORDS.signed_out.link_label}</a></p></div>;
  if (view === 'error' || !acct) return <div><H>{WELCOME.error_generic.title}</H><P>{WELCOME.error_generic.body}</P></div>;

  const requests = [...acct.requests].sort((a, b) => b.n - a.n);
  return (
    <div>
      <H>{acct.name ? fill(WORDS.header.title, 'name', acct.name) : WORDS.header.title_no_name}</H>
      {acct.ready && <section aria-labelledby="acct-site" className="mb-10">
        <H2 id="acct-site">{WORDS.site.heading}</H2>
        {acct.site_url ? (
          <P><a href={acct.site_url} target="_blank" rel="noopener noreferrer" className="text-accent-link hover:underline">{WORDS.site.link_label}</a>{acct.design != null && <> ({fill(WORDS.site.design_label, 'n', acct.design)})</>}</P>
        ) : <P>{WORDS.site.not_yet}</P>}
      </section>}
      <section aria-labelledby="acct-plan" className="mb-10">
        <H2 id="acct-plan">{WORDS.plan.heading}</H2>
        <P>{!acct.ready ? WORDS.plan.unknown : acct.plan === 'trial' && acct.trial_ends ? fill(WORDS.plan.trial, 'date', date(acct.trial_ends)) : acct.plan === 'paying' ? WORDS.plan.paying : WORDS.plan.unknown}</P>
      </section>
      <section aria-labelledby="acct-changes" className="mb-10">
        <H2 id="acct-changes">{WORDS.changes.heading}</H2>
        {requests.length === 0 ? <P>{WORDS.changes.empty}</P> : (
          <ul className="max-w-2xl space-y-4 mb-4">
            {requests.map((r) => (
              <li key={r.n} className="border border-ink/15 rounded-lg p-4 font-sans text-ink/90">
                <p className="text-sm mb-2"><span className="font-semibold text-ink">{(r.state && STATE_LABELS[r.state]) || r.state}</span>{r.confirmed_at && <> · {fill(WORDS.changes.asked_on, 'date', date(r.confirmed_at))}</>}</p>
                <ul className="list-disc pl-5 space-y-1">{r.items.map((i, k) => <li key={k}>{i.wanted}</li>)}</ul>
              </li>
            ))}
          </ul>
        )}
        <P>{WORDS.lag}</P>
      </section>
      <section aria-labelledby="acct-ask">
        <H2 id="acct-ask">{WORDS.ask.heading}</H2>
        <P>{WORDS.ask.body}</P>
      </section>
    </div>
  );
}
