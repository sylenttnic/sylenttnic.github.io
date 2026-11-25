'use client';

import { useEffect, useState } from 'react';
import { WORDS } from './words';

// W34 (row 58 (e); PLAN.md section 5 "Registrant = the business"): the details a picked new domain is registered under. Signed in
// only, like the rest of the account page. Its read is the Worker's GET /owner/new-domain (this session's own business only), and
// it renders nothing unless that read holds a picked name: before a pick there is nothing to register, and the pick itself is
// T10's page. The Worker refuses with codes, never words; each code shows its own checked line. Nothing is bought here: the
// purchase runs on a runner after the first paid invoice above zero.
const API = 'https://clients.sylentt.com';
const SKEY = 'sylentt-owner-session';
const R = WORDS.registrant;
const ERRORS = R.errors as Record<string, string>;
export const FIELDS = ['organization', 'name', 'email', 'phone', 'street', 'city', 'state', 'postal_code'] as const;
type Field = (typeof FIELDS)[number];
type NewDomain = { pick: { name: string } | null; registrant_on_file: boolean; bought: boolean };
type St = 'idle' | 'sending' | 'error';
const fill = (s: string, name: string) => s.split('{name}').join(name);

/* which block shows, from the Worker's read alone: none (no pick), bought, saved (a valid record on file), or the form */
export function registrantView(d: NewDomain | null, editing: boolean): 'none' | 'bought' | 'saved' | 'form' {
  if (!d?.pick?.name) return 'none';
  if (d.bought) return 'bought';
  if (d.registrant_on_file && !editing) return 'saved';
  return 'form';
}

export default function RegistrantSection({ onSignedOut }: { onSignedOut: () => void }) {
  const [d, setD] = useState<NewDomain | null>(null);
  const [editing, setEditing] = useState(false);
  const [st, setSt] = useState<St>('idle');
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState<Record<Field, string>>(() => Object.fromEntries(FIELDS.map((f) => [f, ''])) as Record<Field, string>);

  const session = () => { try { return sessionStorage.getItem(SKEY); } catch { return null; } };
  const signedOut = () => { try { sessionStorage.removeItem(SKEY); } catch { /* ignore */ } onSignedOut(); };

  useEffect(() => {
    const s = session();
    if (!s) return;
    (async () => {
      try {
        const r = await fetch(`${API}/owner/new-domain`, { headers: { authorization: `Bearer ${s}` } });
        if (r.status === 401) { signedOut(); return; }
        if (!r.ok) return;   // an unreadable offer shows no section: nothing about a domain is guessed
        setD((await r.json()) as NewDomain);
      } catch { /* no section */ }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const s = session();
    if (!s) { signedOut(); return; }
    setSt('sending'); setErr(null);
    try {
      const r = await fetch(`${API}/owner/new-domain`, { method: 'POST', headers: { authorization: `Bearer ${s}`, 'content-type': 'application/json' }, body: JSON.stringify({ registrant: { ...form, country_code: 'US' } }) });
      if (r.status === 401) { setSt('error'); setErr(ERRORS['signed-out']); signedOut(); return; }
      const j = (await r.json().catch(() => null)) as (NewDomain & { error?: unknown }) | null;
      if (r.ok && j && typeof j === 'object' && 'registrant_on_file' in j) { setD(j); setEditing(false); setSt('idle'); return; }
      const code = typeof j?.error === 'string' ? j.error : '';
      setSt('error'); setErr(ERRORS[code] ?? ERRORS.failed);
      if (code === 'already-registered') { setD((x) => (x ? { ...x, bought: true } : x)); setEditing(false); }
    } catch { setSt('error'); setErr(ERRORS.failed); }
  }

  const v = registrantView(d, editing);
  if (v === 'none' || !d?.pick) return null;
  const name = d.pick.name;
  const H2 = ({ children }: { children: React.ReactNode }) => <h2 id="acct-registrant" className="font-display text-2xl font-bold text-ink mb-3">{children}</h2>;
  const P = ({ children }: { children: React.ReactNode }) => <p className="text-lg text-ink/90 font-sans leading-relaxed max-w-2xl mb-4">{children}</p>;
  const btn = 'rounded bg-accent px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60';
  const F = R.fields as Record<Field, { label: string; hint?: string }>;

  return (
    <section aria-labelledby="acct-registrant" className="mb-10" data-registrant={v}>
      {v === 'bought' && <><H2>{fill(R.bought.title, name)}</H2><P>{R.bought.body}</P></>}
      {v === 'saved' && <><H2>{R.saved.title}</H2><P>{fill(R.saved.body, name)}</P>
        <p className="mb-4"><button type="button" onClick={() => { setEditing(true); setErr(null); setSt('idle'); }} className={btn}>{R.saved.change_button}</button></p></>}
      {v === 'form' && <>
        <H2>{R.heading}</H2>
        <P>{fill(R.why, name)}</P>
        <P>{R.where_it_goes}</P>
        <form onSubmit={save} noValidate className="max-w-2xl space-y-4 mb-4">
          {FIELDS.map((f) => (
            <div key={f}>
              <label htmlFor={`reg-${f}`} className="block font-sans font-semibold text-ink mb-1">{F[f].label}</label>
              {F[f].hint && <p id={`reg-${f}-hint`} className="text-sm text-ink/70 font-sans mb-1">{F[f].hint}</p>}
              <input id={`reg-${f}`} name={f} value={form[f]} onChange={(e) => setForm((x) => ({ ...x, [f]: e.target.value }))}
                aria-describedby={F[f].hint ? `reg-${f}-hint` : undefined}
                type={f === 'email' ? 'email' : f === 'phone' ? 'tel' : 'text'}
                autoComplete={({ organization: 'organization', name: 'name', email: 'email', phone: 'tel-national', street: 'street-address', city: 'address-level2', state: 'address-level1', postal_code: 'postal-code' } as Record<Field, string>)[f]}
                maxLength={f === 'street' ? 200 : f === 'email' ? 254 : 100}
                className="w-full rounded border border-ink/30 px-3 py-2 font-sans text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
            </div>
          ))}
          <p><button type="submit" disabled={st === 'sending'} className={btn}>{R.save_button}</button></p>
        </form>
      </>}
      <div aria-live="polite">
        {st === 'sending' && <P>{R.sending}</P>}
        {st === 'error' && err && <P>{err}</P>}
      </div>
    </section>
  );
}
