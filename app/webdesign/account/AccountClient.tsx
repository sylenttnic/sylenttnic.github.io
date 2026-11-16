'use client';

import { useEffect, useState } from 'react';
import { WORDS } from './words';
import { WORDS as WELCOME } from '../welcome/words';
import ChatPanel from './ChatPanel';

// The account page (W296, rows 118 and 58). Signed in only: the session the welcome page stored in this tab's
// sessionStorage (the confirm link or a sign-in link). Its one read is the Worker's GET /owner/account, which answers
// only a valid session and only for that session's own business. No session, an expired one, or a refusal: nothing
// about any business is shown, only the way to sign in. With no account record yet (`ready: false`) it shows no site line.
const API = 'https://clients.sylentt.com';
const SKEY = 'sylentt-owner-session';
type Item = { kind: string | null; target: string | null; wanted: string | null };
// W370 (critic F6, P4): a photo of the request that was not used, as the Worker passes it (a reason class, never the vetter's words)
type NotUsed = { position: number; count: number; place: 'hero' | 'gallery' | null; reason: string; min?: { width: number; height: number } };
type Req = { n: number; state: string | null; confirmed_at: string | null; trial: boolean; items: Item[]; not_used?: NotUsed[]; photo_items?: number };
type Account = { name: string | null; ready: boolean; plan: 'trial' | 'paying' | null; trial_ends: string | null; design: number | null; site_url: string | null; requests: Req[] };
type View = 'loading' | 'signed-out' | 'error' | 'ok';
type Bill = 'idle' | 'opening' | 'not_ready' | 'not_available' | 'failed';
const LOGIN_LINK = 'https://billing.stripe.com/p/login/aFaeVcbBo1MIdZe8Ik1Jm00'; // the billing page link the terms carry (sections 4, 6)

const DATE = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Denver' });
const date = (iso: string | null) => { const t = Date.parse(iso ?? ''); return Number.isFinite(t) ? DATE.format(new Date(t)) : ''; };
const fill = (s: string, k: string, v: string | number) => s.replace(`{${k}}`, String(v));
const STATE_LABELS = WORDS.changes.states as Record<string, string>;
const PART_LABELS = WORDS.changes.states_part as Record<string, string>;
const NU = WORDS.changes.not_used;
/* W370: one "Not used:" line (runs/client-launch/copy/W370-not-made-words.md section 3, Revision 3, critic APPROVE). */
export function notUsedLine(m: NotUsed): string {
  const place = m.place ? NU.places[m.place] : null;
  const ref = m.count === 1 ? NU.photo_ref_one : NU.photo_ref_many.replace('{n}', String(m.position)).replace('{count}', String(m.count));
  const R = NU.reasons as Record<string, string>;
  const reason = m.reason === 'too_small'
    ? (!place ? R.too_small_no_place : m.min ? R.too_small.replace('{width}', String(m.min.width)).replace('{height}', String(m.min.height)) : R.too_small_no_numbers)
    : (R[m.reason] ?? R.other);
  return (place ? NU.place : NU.no_place).replace('{photo_ref}', () => ref).replace('{place}', () => place ?? '').replace('{reason}', () => reason.replace('{place}', () => place ?? ''));
}
const label = (r: Req) => (r.not_used?.length && r.state && PART_LABELS[r.state]) || (r.state && STATE_LABELS[r.state]) || r.state;

export default function AccountClient() {
  const [view, setView] = useState<View>('loading');
  const [acct, setAcct] = useState<Account | null>(null);
  const [bill, setBill] = useState<Bill>('idle');

  // W307 (row 119): open a Stripe billing page for this session's own business. The Worker reads nothing from the request
  // but the session; it answers a billing.stripe.com URL, and only that is followed.
  async function openBilling() {
    let s: string | null = null;
    try { s = sessionStorage.getItem(SKEY); } catch { /* no storage */ }
    if (!s) { setView('signed-out'); return; }
    setBill('opening');
    try {
      const r = await fetch(`${API}/owner/billing`, { method: 'POST', headers: { authorization: `Bearer ${s}` } });
      if (r.status === 401) { try { sessionStorage.removeItem(SKEY); } catch { /* ignore */ } setView('signed-out'); return; }
      if (r.status === 409) { setBill('not_ready'); return; }
      if (r.status === 503) { setBill('not_available'); return; }
      const j = (await r.json().catch(() => null)) as { url?: unknown } | null;
      if (r.ok && typeof j?.url === 'string' && /^https:\/\/billing\.stripe\.com\//.test(j.url)) { window.location.assign(j.url); return; }
      setBill('failed');
    } catch { setBill('failed'); }
  }

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
      <P>{WORDS.signed_in.body}</P>
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
      {acct.ready && <section aria-labelledby="acct-billing" className="mb-10">
        <H2 id="acct-billing">{WORDS.billing.heading}</H2>
        <P>{WORDS.billing.body}</P>
        <p className="mb-4"><button type="button" onClick={openBilling} disabled={bill === 'opening'} className="rounded bg-accent px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60">{WORDS.billing.button_label}</button></p>
        <div aria-live="polite">
          {bill === 'opening' && <P>{WORDS.billing.opening}</P>}
          {bill === 'not_ready' && <P>{WORDS.billing.not_ready}</P>}
          {bill === 'not_available' && (() => { const [a, b] = WORDS.billing.not_available.split('{login_link}'); return <P>{a}<a href={LOGIN_LINK} className="text-accent-link hover:underline">{WORDS.billing.login_link_label}</a>{b}</P>; })()}
          {bill === 'failed' && <P>{WORDS.billing.failed}</P>}
        </div>
      </section>}
      <section aria-labelledby="acct-changes" className="mb-10">
        <H2 id="acct-changes">{WORDS.changes.heading}</H2>
        {requests.length === 0 ? <P>{WORDS.changes.empty}</P> : (
          <ul className="max-w-2xl space-y-4 mb-4">
            {requests.map((r) => (
              <li key={r.n} className="border border-ink/15 rounded-lg p-4 font-sans text-ink/90">
                <p className="text-sm mb-2"><span className="font-semibold text-ink">{label(r)}</span>{r.confirmed_at && <> · {fill(WORDS.changes.asked_on, 'date', date(r.confirmed_at))}</>}</p>
                {(() => {
                  // with exactly one photo item the lines sit under it; otherwise after the items (no record says which item a photo is for)
                  const nu = r.not_used ?? [];
                  const under = r.photo_items === 1 ? r.items.findIndex((i) => i.kind === 'photo') : -1;
                  const lines = nu.map((m, j) => <p key={j} className="text-sm mt-1" data-not-used>{notUsedLine(m)}</p>);
                  return <>
                    <ul className="list-disc pl-5 space-y-1">{r.items.map((i, k) => <li key={k}>{i.wanted}{k === under && lines}</li>)}</ul>
                    {under < 0 && lines}
                  </>;
                })()}
              </li>
            ))}
          </ul>
        )}
        <P>{WORDS.lag}</P>
      </section>
      <section aria-labelledby="acct-ask">
        <H2 id="acct-ask">{WORDS.ask.heading}</H2>
        <P>{WORDS.chat.intro}</P>
        {/* W311: the chat panel, signed in only (this branch renders only with an account read by a valid session) */}
        <ChatPanel onSignedOut={() => setView('signed-out')} />
      </section>
    </div>
  );
}
