/* sample.js — the sticky header's measurement, and a form that is
   visible and inert.

   ---- The sticky header's scroll offset ----------------------------------
   sample.css pins .site-header and offsets fragment jumps by
   --sample-header-h. Nothing in CSS can read an element's height, and the six
   samples' headers run 61px to 137px depending on the build and the viewport,
   so the value is measured here and written to the root element.

   Re-measured after document.fonts.ready because a webfont swap changes the
   brand's width, and riverstone-landscape's header is two rows ONLY because
   its brand is wide enough to wrap the menu button -- exactly the kind of
   layout a font swap flips. And on resize, because the wrap point moves.

   It measures the CLOSED header on purpose. The open mobile panel is taller,
   but main.js closes it on link click before the jump resolves, so the
   closed height is the one a landing heading is actually measured against. */

(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var apply = function () {
    document.documentElement.style.setProperty('--sample-header-h', header.offsetHeight + 'px');
  };
  apply();
  addEventListener('resize', apply, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(apply).catch(function () {});
})();

/* ---- The contact form: visible and inert.

   The form is part of what we are showing, so hiding it would misrepresent the
   build; sending from it would be a lie in the other direction. main.js has its
   FORM_ENDPOINT emptied, which makes it hide the section, so this file takes
   the section back and states plainly what it is. */

(function () {
  var form = document.querySelector('[data-form]');
  if (!form) return;
  var section = form.closest('[data-form-section]') || form;
  section.hidden = false;
  form.setAttribute('action', '');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var status = form.querySelector('[data-form-status]');
    if (status) {
      status.textContent = 'This is a sample site, so the form is not connected. On a real build it goes straight to the owner.';
      status.setAttribute('data-state', 'ok');
    }
  });
})();

/* Back to top. Same 400px threshold and same corner as
   components/ui/BackToTop.tsx; the nudge and the fade are CSS. */
(function () {
  var btn = document.querySelector('[data-totop]');
  if (!btn) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function sync() { btn.hidden = window.scrollY <= 400; }
  window.addEventListener('scroll', sync, { passive: true });
  sync();

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
})();

/* The Sylentt band's anti-spam timing field. PreviewRequestForm sets this on
   mount too, so a JS-off submission sends it empty there as well and the
   endpoint already tolerates that. */
(function () {
  var f = document.querySelector('[data-started-at]');
  if (f) f.value = String(Date.now());
})();
