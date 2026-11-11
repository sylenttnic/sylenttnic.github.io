'use client';

import { useEffect, useState } from 'react';
import { WORDS } from './words';

// The existing-domain page (W35, row 58 (f)). Signed in only: the session the welcome page's click returned, kept in
// sessionStorage under the same key. The Worker accepts the domain only from that session and answers codes, never words;
// every word shown here is WORDS (the copywriter's). We write nothing to the owner's DNS: the page shows the two settings,
// and the Worker's cron reads them and connects the site when both read right.
const API = 'https://clients.sylentt.com';
const SKEY = 'sylentt-owner-session';
type Rec = { kind: 'record'; type: string; host: string; value: string } | { kind: 'forward'; from: string; to: string };
type State = 'waiting-for-site' | 'unchecked' | 'wrong' | 'half' | 'right';
type Domain = { domain: string | null; registrar?: { name: string } | null; records?: Rec[] | null; state?: State; www?: boolean | null; apex?: boolean | null; found?: { www: string | null; apex: string | null } | null };

const fill = (s: string, v: Record<string, string>) => s.replace(/\{(\w+)\}/g, (m, k) => v[k] ?? m);
const readSession = () => { try { return sessionStorage.getItem(SKEY); } catch { return null; } };

export default function DomainClient() {
  const [session, setSession] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [d, setD] = useState<Domain | null>(null);
  const [input, setInput] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  async function load(s: string) {
    const r = await fetch(`${API}/owner/domain`, { headers: { authorization: `Bearer ${s}` } });
    if (r.status === 401) { setSession(null); return; }
    if (r.ok) setD((await r.json()) as Domain);
  }
  useEffect(() => {
    const s = readSession();
    setSession(s); setReady(true);
    if (s) load(s).catch(() => {});
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!session || busy) return;
    setBusy(true); setErr(null);
    try {
      const r = await fetch(`${API}/owner/domain`, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${session}` }, body: JSON.stringify({ domain: input }) });
      const j = await r.json().catch(() => ({}));
      if (r.status === 401) setSession(null);
      else if (!r.ok) setErr(j.error === 'not-connectable' ? WORDS.errors['not-connectable'] : WORDS.errors['not-a-domain']);
      else setD(j as Domain);
    } catch { setErr(WORDS.errors['not-a-domain']); } finally { setBusy(false); }
  }

  async function copy(text: string) {
    try { await navigator.clipboard.writeText(text); setCopied(text); setTimeout(() => setCopied(null), 2000); } catch { /* the value stays on screen to copy by hand */ }
  }

  const H = ({ children }: { children: React.ReactNode }) => <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink mb-6">{children}</h1>;
  const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="font-display text-xl font-bold text-ink mt-8 mb-2">{children}</h2>;
  const P = ({ children }: { children: React.ReactNode }) => <p className="text-lg text-ink/90 font-sans leading-relaxed max-w-2xl mb-4">{children}</p>;
  const Field = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-wrap items-center gap-3 py-2 border-b border-ink/10">
      <span className="w-40 text-sm text-ink/70">{label}</span>
      <code className="font-mono text-base text-ink break-all">{value}</code>
      <button type="button" onClick={() => copy(value)} className="ml-auto rounded border border-ink/20 px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{copied === value ? WORDS.steps.step1.copied : WORDS.steps.step1.copy_button}</button>
    </div>
  );

  if (!ready) return null;
  if (!session) return <div><H>{WORDS.not_signed_in.title}</H><P>{WORDS.not_signed_in.body}</P></div>;

  const domain = d?.domain ?? null;
  const v = { domain: domain ?? '', registrar: d?.registrar?.name ?? '', target: (d?.records?.find((r) => r.kind === 'record') as { value?: string } | undefined)?.value ?? '' };
  const half = WORDS.status.half;

  return (
    <div>
      <H>{WORDS.page.title}</H>
      <P>{WORDS.page.intro}</P>
      <P>{WORDS.page.free_note}</P>

      <form onSubmit={submit} className="max-w-xl mb-6">
        <label htmlFor="domain" className="block font-semibold text-ink mb-1">{WORDS.form.field_label}</label>
        <p className="text-sm text-ink/70 mb-2">{WORDS.form.hint}</p>
        <div className="flex gap-3">
          <input id="domain" name="domain" inputMode="url" autoComplete="url" value={input} onChange={(e) => setInput(e.target.value)} placeholder={WORDS.form.placeholder} className="flex-1 rounded border border-ink/25 px-3 py-2 text-base" />
          <button type="submit" disabled={busy || !input.trim()} className="rounded bg-accent px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60">{WORDS.form.button}</button>
        </div>
        {err && <p role="alert" className="mt-2 text-sm text-ink">{err}</p>}
      </form>

      {domain && (
        <section aria-live="polite">
          <P>{d?.registrar?.name ? fill(WORDS.registrar.found, v) : WORDS.registrar.not_found}</P>
          {!d?.records ? <P>{WORDS.steps.waiting_for_site}</P> : (
            <>
              <P>{WORDS.steps.intro}</P>
              <H2>{WORDS.steps.step1.title}</H2>
              <P>{WORDS.steps.step1.body}</P>
              <Field label={WORDS.steps.step1.type_label} value={WORDS.steps.step1.type_value} />
              <Field label={WORDS.steps.step1.host_label} value={WORDS.steps.step1.host_value} />
              <Field label={WORDS.steps.step1.value_label} value={fill(WORDS.steps.step1.value_value, v)} />
              <H2>{fill(WORDS.steps.step2.title, v)}</H2>
              <P>{fill(WORDS.steps.step2.body, v)}</P>
              <Field label={WORDS.steps.step2.from_label} value={fill(WORDS.steps.step2.from_value, v)} />
              <Field label={WORDS.steps.step2.to_label} value={fill(WORDS.steps.step2.to_value, v)} />
            </>
          )}
          <div className="mt-8"><P>{WORDS.never_touch}</P><P>{fill(WORDS.old_site, v)}</P></div>

          {d?.records && (
            <>
              <H2>{WORDS.status.title}</H2>
              <P>{WORDS.status.checking_note}</P>
              {d.state === 'half' ? (
                <>
                  <P>{half.intro}</P>
                  <ul className="list-disc pl-6 max-w-2xl mb-4 text-ink/90">
                    {!d.www && <li>{d.found?.www ? fill(half.www_wrong, { ...v, found: d.found.www }) : fill(half.www_missing, v)}</li>}
                    {!d.apex && <li>{d.found?.apex ? fill(half.forward_wrong, { ...v, found: d.found.apex }) : fill(half.forward_missing, v)}</li>}
                  </ul>
                </>
              ) : <P>{d.state === 'right' ? WORDS.status.right : d.state === 'wrong' ? WORDS.status.wrong : WORDS.status.unchecked}</P>}
            </>
          )}
        </section>
      )}
      <P>{WORDS.rather_not}</P>
    </div>
  );
}
