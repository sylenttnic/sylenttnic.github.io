/* ==========================================================================
   main.js — house behaviour. Vanilla ES module, zero dependencies.

   Scope is fixed by house-tech-spec §9: mobile nav toggle, scroll reveals,
   form enhancement, and (per brief) one signature interaction. Anything
   fancier comes from snippets/ or gets nominated for it.

   PROGRESSIVE ENHANCEMENT IS THE CONTRACT (spec §1). With JavaScript off:
   navigation works (the toggle ships [hidden]; the link list is plain and
   visible), nothing is hidden behind a reveal, and the form is a plain HTML
   POST. This file only ever *adds*.

   NO WORDS LIVE IN THIS FILE. Every user-visible string is read from a data-
   attribute in the HTML, because all words belong to the Copywriter.
   ========================================================================== */

/* --------------------------------------------------------------------------
   CONFIGURATION — the Builder sets these two lines and nothing else.
   -------------------------------------------------------------------------- */

/**
 * Where the contact form POSTs. Single source of truth (spec §6).
 *
 * The <form action> in the HTML MUST carry this same URL — that is the JS-off
 * path, and scripts/qa/form-audit.mjs fails the build if the two disagree.
 *
 * EMPTY STRING = no endpoint configured. The form section then auto-hides and
 * the tel:/mailto: CTAs carry the page. When it is empty, the form section
 * must ALSO ship with the `hidden` attribute in the HTML — a visible dead
 * form is a QA BLOCKER, and JS-off users would otherwise see one.
 */
const FORM_ENDPOINT = ''; // SAMPLE: no endpoint, ever. js/sample.js keeps the form visible and inert.

/** Where a successful submission lands (spec §6). */
const SUCCESS_PAGE = '/thanks.html';

/** Minimum time on page before a submission is believable, in ms. */
const MIN_FILL_MS = 2500;

/* -------------------------------------------------------------------------- */

const root = document.documentElement;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* --- Navigation -----------------------------------------------------------
   The toggle ships [hidden] so a JS-off visitor never sees a dead control.
   We reveal it, wire it, and put the nav into its collapsed state.         */

function initNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!toggle || !nav) return;

  root.setAttribute('data-nav-ready', '');
  toggle.hidden = false;

  const setOpen = (open) => {
    nav.setAttribute('data-nav-open', String(open));
    toggle.setAttribute('aria-expanded', String(open));
    const label = open ? toggle.dataset.labelOpen : toggle.dataset.labelClosed;
    const slot = toggle.querySelector('[data-nav-toggle-label]');
    if (label && slot) slot.textContent = label;
  };

  setOpen(false);

  toggle.addEventListener('click', () => {
    setOpen(nav.getAttribute('data-nav-open') !== 'true');
  });

  // Following an in-page link should close the panel behind you.
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (nav.getAttribute('data-nav-open') !== 'true') return;
    setOpen(false);
    toggle.focus();
  });
}

/* --- Scroll reveals -------------------------------------------------------
   Below-the-fold only. The hero is the LCP element and is never reveal-gated
   (spec §7). Under prefers-reduced-motion we arm nothing at all — the CSS
   never hides anything, so there is nothing to un-hide (spec §8).          */

function initReveals() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) return;

  // Stagger index within each group, so a list reveals in sequence.
  document.querySelectorAll('[data-reveal-group]').forEach((group) => {
    group.querySelectorAll('[data-reveal]').forEach((item, index) => {
      item.style.setProperty('--reveal-index', String(index));
    });
  });

  root.setAttribute('data-reveal-ready', '');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-revealed', '');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
  );

  targets.forEach((target) => observer.observe(target));

  // If the visitor turns reduced-motion on mid-visit, show everything now.
  prefersReducedMotion.addEventListener('change', (event) => {
    if (!event.matches) return;
    observer.disconnect();
    targets.forEach((target) => target.setAttribute('data-revealed', ''));
  });
}

/* --- Contact form ---------------------------------------------------------
   Enhancement only: the same form submits fine as a plain HTML POST.       */

function initForm() {
  const form = document.querySelector('[data-form]');
  if (!form) return;

  const section = form.closest('[data-form-section]') || form;

  // No endpoint configured → hide the form rather than show a dead one.
  if (!FORM_ENDPOINT) {
    section.hidden = true;
    return;
  }

  form.setAttribute('action', FORM_ENDPOINT);

  const status = form.querySelector('[data-form-status]');
  const trap = form.querySelector('[data-form-trap]');
  const submit = form.querySelector('[type="submit"]');
  const loadedAt = Date.now();

  const say = (message, state) => {
    if (!status || !message) return;
    status.textContent = message;
    if (state) status.setAttribute('data-state', state);
    else status.removeAttribute('data-state');
  };

  form.addEventListener('submit', (event) => {
    // Honeypot filled: a bot. Take the submission nowhere, quietly.
    if (trap && trap.value.trim() !== '') {
      event.preventDefault();
      window.location.assign(SUCCESS_PAGE);
      return;
    }

    // Submitted implausibly fast. Don't send, and don't lose the visitor —
    // they can press send again a moment later and it goes through.
    if (Date.now() - loadedAt < MIN_FILL_MS) {
      event.preventDefault();
      say(form.dataset.msgTooFast, 'error');
      return;
    }

    event.preventDefault();
    if (submit) submit.disabled = true;
    say(form.dataset.msgSending);

    const data = new FormData(form);
    if (trap) data.delete(trap.name);

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    })
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        window.location.assign(SUCCESS_PAGE);
      })
      .catch(() => {
        // Enhancement failed; hand the visitor back the native path.
        if (submit) submit.disabled = false;
        say(form.dataset.msgError, 'error');
      });
  });
}

/* --- Current year in the footer ------------------------------------------
   A date is not a claim about the business, so it is not the Copywriter's.
   With JS off the HTML's own year stands.                                  */

function initYear() {
  const slot = document.querySelector('[data-current-year]');
  if (slot) slot.textContent = String(new Date().getFullYear());
}

/* --- Preview expiry bar ---------------------------------------------------
   PREVIEW ONLY. Delete this function and its call at purchase, along with
   css/preview.css, buy.html and the @preview:expiry block in every page.

   The DATE comes from the HTML (data-live-until, filled from the same slot as
   README front-matter live_until); the COUNT is derived here; the WORDS are the
   copy doc's, read from data- attributes exactly like every other string in
   this file. If the result is not a whole number of days in the future we
   change nothing, and the HTML's own sentence — which states the date — stands.
   There is deliberately no "0 days" and no "expired" state.

   initYear() above is the precedent: a date is not a claim about the business,
   so it is not the Copywriter's, and with JS off the HTML's own value stands. */

function initExpiry() {
  const slot = document.querySelector('[data-live-until]');
  if (!slot) return;

  // Local midnight both ends, so a DST boundary cannot shift the count.
  const end = new Date(slot.dataset.liveUntil + 'T00:00:00');
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((end - today) / 86400000);
  if (!Number.isFinite(days) || days < 1) return;

  const tpl = days === 1 ? slot.dataset.expirySingular : slot.dataset.expiryPlural;
  if (tpl) slot.textContent = tpl.replace('{n}', String(days));
}

/* --- Tweaks bar -----------------------------------------------------------
   Dev-only token panel, gated behind ?tweaks (spec §9). Loaded dynamically so
   it costs the shipped page nothing and never counts against the JS budget.
   AT PURCHASE: delete js/tweaks.js and delete this function and its call.  */

function initTweaks() {
  if (!new URLSearchParams(window.location.search).has('tweaks')) return;
  import('./tweaks.js').catch(() => {
    /* Panel is a convenience; its absence must never break the site. */
  });
}

/* -------------------------------------------------------------------------- */

initNav();
initReveals();
initForm();
initYear();
/* initExpiry() removed: a sample has no expiry. */
/* initTweaks() removed with js/tweaks.js. */
