// The account page's words (copywriter, rows 58 (d) and 118; decision-critic REJECT B1 to B4 replacements taken, 2026-11-11): runs/client-launch/copy/W296-account-words.md in sylentt-smb-site-generation. Edit through the copywriter, never inline. The billing section (W307, row 119): runs/client-launch/copy/W307-billing-words.md, decision-critic APPROVE 2026-11-12 with its two replacements taken. The chat panel (W311, row 118): runs/client-launch/copy/W311-chat-words.md, decision-critic APPROVE WITH FINDINGS 2026-11-12, B1 to B4 and F1 to F3 taken (runs/client-launch/checks/W311-chat-critic.md).
export const WORDS = {
  "meta": {
    "title": "Your account | Sylentt",
    "description": "Your Sylentt account: your site, your plan and the changes you have asked for."
  },
  "signed_out": {
    "title": "Sign in to see your account",
    "body": "This page shows your site and your changes only on a tab where you are signed in. A sign-in lasts up to 24 hours, or until you close the tab. To sign in again, ask for a sign-in link on the welcome page.",
    "link_label": "Get a sign-in link"
  },
  "loading": {
    "title": "Loading your account"
  },
  "header": {
    "title": "{name}: your account",
    "title_no_name": "Your account"
  },
  "site": {
    "heading": "Your site",
    "design_label": "Design {n}",
    "link_label": "Open your site",
    "not_yet": "Your site is being set up. Its address will show here once it is ready."
  },
  "plan": {
    "heading": "Your plan",
    "trial": "Free trial. It ends on {date}.",
    "paying": "You are on the paid monthly plan.",
    "unknown": "Your plan details are not showing here yet."
  },
  "changes": {
    "heading": "Your changes",
    "empty": "No changes to show yet.",
    "asked_on": "Asked {date}",
    "states": {
      "confirmed": "Received, not made yet",
      "ready": "Made and checked, not live yet",
      "done": "Live",
      "undone": "Put back as it was",
      "stuck": "Not made yet. It does not use up a change.",
      "over-limit": "Over that month's two changes, so not made. We kept it, and it does not use up a change.",
      "quoted": "Outside the plan, so not made. Email support@sylentt.com if you want a price."
    }
  },
  "ask": {
    "heading": "Ask for a change",
    "body": "Email support@sylentt.com and say which business it is."
  },
  "billing": {
    "heading": "Your billing",
    "body": "Add or change your card, or cancel your plan, on your billing page. Stripe runs that page, and it has a link back here.",
    "button_label": "Open your billing page",
    "opening": "Opening your billing page.",
    "not_ready": "Your billing details are not showing here yet. Please try again later, or email support@sylentt.com.",
    "not_available": "This button is not switched on yet. You can still reach your billing page from {login_link} with the email address you started the plan with, or email support@sylentt.com.",
    "login_link_label": "Stripe's billing sign-in page",
    "failed": "Your billing page did not open. Please try again, or email support@sylentt.com."
  },
  "lag": "This page is not always up to date. Changes asked for by email are not listed here.",
  "chat": {
    "intro": "Tell us what you want changed on your site. Our system lists the changes it understood, and nothing is asked for until you press Send these changes. You can also email support@sylentt.com and say which business it is.",
    "input_label": "What do you want changed?",
    "placeholder": "Change our Saturday hours to 8 till noon, and add drain cleaning to our services.",
    "send_label": "Send message",
    "sending": "Reading your message.",
    "reply_label": "A reply to your message",
    "proposal_heading": "Changes we understood",
    "out_of_scope_heading": "We cannot do these here",
    "questions_heading": "Questions for you",
    "proposal_note": "Nothing is asked for until you press Send these changes. To change this list, write again below.",
    "confirm_label": "Send these changes",
    "confirming": "Sending your changes.",
    "confirmed": "Received. It shows under Your changes once our system has recorded it. If it does not, email support@sylentt.com.",
    "new_label": "Start a new request",
    "too_long": "That message is over 2,000 characters. Please make it shorter, or email support@sylentt.com.",
    "paused": "Asking here is paused for your site. Please email support@sylentt.com with what you want changed.",
    "daily_limit": "You have reached today's message limit for your site. Please try again tomorrow, or email support@sylentt.com.",
    "not_available": "We cannot answer right now. Please try again later, or email support@sylentt.com.",
    "not_understood": "We could not turn that message into a change. Please try saying it another way, or email support@sylentt.com.",
    "refused": "We will not act on that message. If it is a real change to your site, please email support@sylentt.com.",
    "confirm_failed": "That did not go through. Please press Send these changes again, or email support@sylentt.com.",
    "nothing_to_send": "There is nothing to send yet. Write what you want changed first.",
    "failed": "That did not go through. Please try again, or email support@sylentt.com."
  }
} as const;
