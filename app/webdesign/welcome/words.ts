// The page's words (copywriter, row 58 (d); decision-critic checked). Edit through the copywriter, never inline.
export const WORDS = {
  "arrived": {
    "title": "One click left, in your business's own inbox",
    "body": "We are sending a one-click confirmation to the email address your business lists publicly, on its own site or listing. We only put a site live for the business itself, so we ask the business first.",
    "preview_note": "Until that click, your site stays an unlisted preview, hidden from search engines.",
    "free_note": "Your first 30 days are free. If nobody confirms, nothing is charged.",
    "no_email_title": "No email yet?",
    "no_email": "Check the inbox of your business's public address, and its spam folder. Still nothing? Write to nic@sylentt.com and say which business it is."
  },
  "confirming": {
    "title": "Confirming",
    "body": "One moment while we check your link."
  },
  "confirm_failed": {
    "title": "That link did not work",
    "body": "It may have expired, been used already, or not be valid. If nobody has confirmed, a reminder goes to the business's public address on day 7. You can also write to nic@sylentt.com with the business name."
  },
  "verified_multi": {
    "title": "Thanks for confirming. Which design is your site?",
    "body": "Your preview has several designs. Pick the ONE that becomes your site. Once you pick, the other designs and the preview bar go, and the site goes public within minutes. A later design change is a change request.",
    "design_label": "Design {n}",
    "look_again": "Look again",
    "use_button": "Use this design",
    "picked": "You picked Design {n}. It becomes your site."
  },
  "verified_single": {
    "title": "Thanks for confirming",
    "body": "Your preview has one design, so there is nothing to pick. It becomes your site."
  },
  "next_steps": {
    "title": "What comes next",
    "intro": "Your site goes public after the pick. We will email you three short things to sort out, each with its own page:",
    "items": [
      {
        "label": "Your domain",
        "body": "Tell us if you already have one, or pick a new one. If you have one, we show you the two records to add at your registrar. If you need one, we register it in your business's name after your first successful payment, or today if you choose to start paying now (that ends the free days and charges $9.99 plus any applicable tax today)."
      },
      {
        "label": "Where form messages go",
        "body": "We send what visitors write on your site to the address you choose, after that address confirms with one click."
      },
      {
        "label": "First fixes and photos",
        "body": "Wording, hours, services, photos of your work or premises (no people in them), colours, fonts, layout, or another of your designs. Send as many as you like during your free 30 days; most are live within 2 business days. After that, the plan covers up to two changes a calendar month."
      }
    ],
    "outro": "Our follow-up email links to your account page, where you answer each one."
  },
  "notme_done": {
    "title": "Cancelled",
    "body": "The plan is cancelled at once. Nothing is charged, and your preview is exactly as it was."
  },
  "notme_failed": {
    "title": "We could not cancel from this link",
    "body": "The link may have expired or been used already. To cancel, write to nic@sylentt.com and say which business it is."
  },
  "no_preview": {
    "title": "Which business is this for?",
    "body": "We could not tell which business this plan is for. Tell us and we will find its preview.",
    "field_label": "Business name and city",
    "button": "Find my preview"
  },
  "error_generic": {
    "title": "Something went wrong on our side",
    "body": "Try again in a minute. If it keeps happening, write to nic@sylentt.com and say which business it is."
  }
} as const;
