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
