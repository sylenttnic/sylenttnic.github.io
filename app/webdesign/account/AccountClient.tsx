'use client';

import { useEffect, useState } from 'react';
import { WORDS } from './words';
import { WORDS as WELCOME } from '../welcome/words';
import ChatPanel from './ChatPanel';
import RegistrantSection from './RegistrantSection';

// The account page (W296, rows 118 and 58). Signed in only: the session the welcome page stored in this tab's
// sessionStorage (the confirm link or a sign-in link). Its one read is the Worker's GET /owner/account, which answers
// only a valid session and only for that session's own business. No session, an expired one, or a refusal: nothing
// about any business is shown, only the way to sign in. With no account record yet (`ready: false`) it shows no site line.
const API = 'https://clients.sylentt.com';
const SKEY = 'sylentt-owner-session';
type Item = { kind: string | null; target: string | null; wanted: string | null };
// W370 (critic F6, P4): a photo of the request that was not used, as the Worker passes it (a reason class, never the vetter's words)
type NotUsed = { position: number; count: number; place: 'hero' | 'gallery' | null; reason: string; min?: { width: number; height: number } };
// W370 (3): an item the change guard refused, as the Worker passes it (the item's index and reason classes, never the guard's words)
type Refused = { item: number; classes: string[] };
type Req = { n: number; state: string | null; confirmed_at: string | null; trial: boolean; items: Item[]; not_used?: NotUsed[]; photo_items?: number; refused?: Refused[] };
type Account = { name: string | null; ready: boolean; plan: 'trial' | 'paying' | null; trial_ends: string | null; design: number | null; site_url: string | null; requests: Req[]; sample_needed?: 'menu' | 'other' | null; start_paid?: { at: number; result: string } | null; start_paid_pending?: boolean };
type View = 'loading' | 'signed-out' | 'error' | 'ok';
type Bill = 'idle' | 'opening' | 'not_ready' | 'not_available' | 'failed';
// W34 "start paid now": the press's own states (the outcome itself is the account record's start_paid, written by client-sync)
type Sp = 'idle' | 'confirm' | 'sending' | 'pending' | 'not_ready' | 'not_available' | 'not_in_trial' | 'failed';
const SP = WORDS.start_paid;
const SP_RESULTS = SP.results as Record<string, string>;
/* decision-critic 2026-11-24 C3: which start-paid block shows. `ended` only while the plan reads trial or paying; every other
   result, the offer and the button only while the plan is trial with a trial end ({date} is never shown blank). */
export function startPaidView(a: Pick<Account, 'ready' | 'plan' | 'trial_ends' | 'start_paid' | 'start_paid_pending'>): { show: boolean; ended: boolean; pending: boolean; result: string | null; offer: boolean } {
  const none = { show: false, ended: false, pending: false, result: null, offer: false };
  if (!a.ready) return none;
  const r = a.start_paid?.result ?? null;
  if (r === 'ended') return (a.plan === 'trial' || a.plan === 'paying') ? { ...none, show: true, ended: true } : none;
  if (a.plan !== 'trial' || !a.trial_ends) return none;
  if (a.start_paid_pending) return { ...none, show: true, pending: true };
  return { show: true, ended: false, pending: false, result: r && SP_RESULTS[r] ? r : null, offer: true };
}
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
/* W370 (3): one refused item's reason (runs/client-launch/copy/W370-words-refused-draft.md section 3, Revision 5): one class is
   its saw and its next (or the ask); two or more are the short saws, the join, the full saws of testimonial, instruction and
   new_feature, then the ask once; any `other` is `other` alone. */
const RF = WORDS.changes.refused;
type RW = { saw: string; next: string | null; saw_short?: string };
const SHORT = ['licensed', 'certified', 'insured', 'bonded', 'accredited', 'award', 'rating', 'review_count', 'superlative', 'guarantee', 'other_business'];
const FULL = ['testimonial', 'instruction', 'new_feature'];
export function refusedReason(classes: string[]): string {
  const R = RF.reasons as Record<string, RW>;
  const cs = classes.length && classes.every((c) => R[c]) ? classes : ['other'];
  if (cs.length === 1 || cs.includes('other')) { const w = R[cs.includes('other') ? 'other' : cs[0]]; return `${w.saw} ${w.next ?? RF.ask}`; }
  const shorts = cs.filter((c) => SHORT.includes(c)).map((c) => R[c].saw_short as string);
  const parts = [...shorts];
  if (shorts.length) parts.push(shorts.length >= 2 ? RF.join.many : RF.join.one);
  for (const c of FULL) if (cs.includes(c)) parts.push(R[c].saw);
  parts.push(RF.ask);
  return parts.join(' ');
}
export const refusedMark = (classes: string[]) => RF.mark.replace('{reason}', () => refusedReason(classes));
const ITEMS_LABELS = WORDS.changes.states_part_items as Record<string, string>;
const BOTH_LABELS = WORDS.changes.states_part_both as Record<string, string>;
export const label = (r: Req) => {
  const items = Boolean(r.refused?.length), photos = Boolean(r.not_used?.length);
  return (r.state && ((items && photos && BOTH_LABELS[r.state]) || (items && ITEMS_LABELS[r.state]) || (photos && PART_LABELS[r.state]) || STATE_LABELS[r.state])) || r.state;
};

export default function AccountClient() {
  const [view, setView] = useState<View>('loading');
  const [acct, setAcct] = useState<Account | null>(null);
  const [bill, setBill] = useState<Bill>('idle');
  const [sp, setSp] = useState<Sp>('idle');

  // W34 (row 58 (e)): "start paid now", at the owner's click only, after the confirm step. The Worker reads nothing but the
  // session; it records the ask and client-sync answers it (end-trial; on a decline the open invoice is voided, row 131).
  async function startPaid() {
    let s: string | null = null;
    try { s = sessionStorage.getItem(SKEY); } catch { /* no storage */ }
    if (!s) { setView('signed-out'); return; }
    setSp('sending');
    try {
      const r = await fetch(`${API}/owner/start-paid`, { method: 'POST', headers: { authorization: `Bearer ${s}` } });
      if (r.status === 401) { try { sessionStorage.removeItem(SKEY); } catch { /* ignore */ } setView('signed-out'); return; }
      const j = (await r.json().catch(() => null)) as { ok?: unknown; reason?: unknown; recorded?: unknown } | null;
      if (r.ok && j?.recorded === 'pending-sync') { setSp('pending'); return; }
      if (r.status === 404 && j?.reason === 'not-available') { setSp('not_available'); return; }
      if (r.status === 409 && j?.reason === 'not-in-trial') { setSp('not_in_trial'); return; }
      if (r.status === 409) { setSp('not_ready'); return; }
      setSp('failed');
    } catch { setSp('failed'); }
  }

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
        {/* W417 (row 129 (k)): the chosen design holds a sample, so the launch waits on the owner; the sample-needed email's words */}
        {(acct.sample_needed === 'menu' || acct.sample_needed === 'other') && <div data-sample-needed>
          <P>{fill(WORDS.sample.body, 'sample_words', WORDS.sample.words[acct.sample_needed])}</P>
          <P>{WORDS.sample.next}</P>
        </div>}
      </section>}
      <section aria-labelledby="acct-plan" className="mb-10">
        <H2 id="acct-plan">{WORDS.plan.heading}</H2>
        <P>{!acct.ready ? WORDS.plan.unknown : acct.plan === 'trial' && acct.trial_ends ? fill(WORDS.plan.trial, 'date', date(acct.trial_ends)) : acct.plan === 'paying' ? WORDS.plan.paying : WORDS.plan.unknown}</P>
      </section>
      {(() => {
        const v = startPaidView(acct);
        if (!v.show) return null;
        const d = date(acct.trial_ends);
        const btn = 'rounded bg-accent px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60';
        return <section aria-labelledby="acct-start-paid" className="mb-10" data-start-paid>
          <H2 id="acct-start-paid">{SP.heading}</H2>
          {v.ended && <P>{SP.results.ended}</P>}
          {(v.pending || sp === 'pending') && !v.ended && <P>{SP.pending}</P>}
          {v.offer && sp !== 'pending' && <>
            {v.result && <P>{fill(SP_RESULTS[v.result], 'date', d)}</P>}
            <P>{fill(SP.offer, 'date', d)}</P>
            {sp !== 'confirm' && sp !== 'sending' && <p className="mb-4"><button type="button" onClick={() => setSp('confirm')} className={btn}>{SP.button_label}</button></p>}
            {(sp === 'confirm' || sp === 'sending') && <div role="group" aria-labelledby="acct-start-paid-confirm" className="border border-ink/15 rounded-lg p-4 max-w-2xl mb-4">
              <p id="acct-start-paid-confirm" className="font-display text-xl font-bold text-ink mb-3">{SP.confirm.title}</p>
              <P>{SP.confirm.charge}</P>
              <P>{fill(SP.confirm.ends, 'date', d)}</P>
              <P>{SP.confirm.tweaks}</P>
              <P>{SP.confirm.not_through}</P>
              <P>{SP.confirm.card}</P>
              <P>{SP.confirm.cancel}</P>
              <p className="flex flex-wrap gap-3"><button type="button" onClick={startPaid} disabled={sp === 'sending'} className={btn}>{SP.confirm.confirm_button}</button>
                <button type="button" onClick={() => setSp('idle')} disabled={sp === 'sending'} className="rounded border border-ink/30 px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60">{SP.confirm.back_button}</button></p>
            </div>}
            <div aria-live="polite">
              {sp === 'sending' && <P>{SP.sending}</P>}
              {sp === 'not_ready' && <P>{SP.press.not_ready}</P>}
              {sp === 'not_available' && <P>{fill(SP.press.not_available, 'date', d)}</P>}
              {sp === 'not_in_trial' && <P>{SP_RESULTS['not-in-trial']}</P>}
              {sp === 'failed' && <P>{SP.press.failed}</P>}
            </div>
          </>}
        </section>;
      })()}
      {/* W34 (row 58 (e)): the registrant details, shown only once a new domain is picked and until it is bought */}
      {acct.ready && <RegistrantSection onSignedOut={() => setView('signed-out')} />}
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
                    <ul className="list-disc pl-5 space-y-1">{r.items.map((i, k) => { const x = r.refused?.find((f) => f.item === k); return <li key={k}>{i.wanted}{x && <p className="text-sm mt-1" data-refused>{refusedMark(x.classes)}</p>}{k === under && lines}</li>; })}</ul>
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
