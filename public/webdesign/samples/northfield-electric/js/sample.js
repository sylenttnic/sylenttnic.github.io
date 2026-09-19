/* sample.js — keeps the contact form visible and inert.

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
