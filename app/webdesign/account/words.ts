// The account page's words (copywriter, rows 58 (d) and 118; decision-critic REJECT B1 to B4 replacements taken, 2026-11-11): runs/client-launch/copy/W296-account-words.md in sylentt-smb-site-generation. Edit through the copywriter, never inline. The billing section (W307, row 119): runs/client-launch/copy/W307-billing-words.md, decision-critic APPROVE 2026-11-12 with its two replacements taken. The chat panel (W311, row 118): runs/client-launch/copy/W311-chat-words.md, decision-critic APPROVE WITH FINDINGS 2026-11-12, B1 to B4 and F1 to F3 taken (runs/client-launch/checks/W311-chat-critic.md). The photo words (W318, row 118): runs/client-launch/copy/W318-photo-words.md. The not-taken line (W317, row 118): runs/client-launch/copy/W317-not-taken-words.md. The kind labels and kinds_changed (W401 (4)): runs/client-launch/copy/W401-kind-words.md, decision-critic APPROVE WITH CONDITIONS 2026-11-19 (runs/client-launch/checks/W401-kind-words-critic.md), condition 2's replacement taken verbatim, condition 1 in chat-logic.ts kindOf. The guard-refused item marks (W370 (3)): runs/client-launch/copy/W370-words-refused-draft.md Revision 5, after decision-critic APPROVE WITH CONDITIONS on Revision 4 (runs/client-launch/checks/W370-words-refused-critic.md). The sample notice (W417, owner-decisions row 129 (k)): studio/sample-menu-words-draft.md C5, approved as drafted, the sample-needed email's words less what a page has no use for (see sample._source).
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
  "signed_in": {
    "body": "You stay signed in on this tab for up to 24 hours, or until you close it."
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
      "stuck": "Not made yet.",
      "over-limit": "Not made, because the plan had a monthly limit when you sent it. We kept it. To have it made now, ask for it again.",
      "quoted": "Outside the plan, so not made. Email support@sylentt.com if you want a price."
    },
    "states_part": {
      "ready": "Made and checked, not live yet, apart from the photos marked not used below",
      "done": "Live, apart from the photos marked not used below"
    },
    "states_part_items": {
      "ready": "Made and checked, not live yet, apart from the parts marked not made below",
      "done": "Live, apart from the parts marked not made below"
    },
    "states_part_both": {
      "ready": "Made and checked, not live yet, apart from the parts marked not made and the photos marked not used below",
      "done": "Live, apart from the parts marked not made and the photos marked not used below"
    },
    "refused": {
      "mark": "Not made. {reason}",
      "ask": "If you would like to know more, email support@sylentt.com.",
      "join": {
        "one": "We do not add that to your site from a change request.",
        "many": "We do not add these to your site from a change request."
      },
      "reasons": {
        "licensed": {
          "saw": "It mentions a license or being licensed, which we do not add to your site from a change request.",
          "next": null,
          "saw_short": "It mentions a license or being licensed."
        },
        "certified": {
          "saw": "It mentions a certification or being certified, which we do not add to your site from a change request.",
          "next": null,
          "saw_short": "It mentions a certification or being certified."
        },
        "insured": {
          "saw": "It mentions insurance or being insured, which we do not add to your site from a change request.",
          "next": null,
          "saw_short": "It mentions insurance or being insured."
        },
        "bonded": {
          "saw": "It mentions being bonded, which we do not add to your site from a change request.",
          "next": null,
          "saw_short": "It mentions being bonded."
        },
        "accredited": {
          "saw": "It mentions an accreditation or being accredited, which we do not add to your site from a change request.",
          "next": null,
          "saw_short": "It mentions an accreditation or being accredited."
        },
        "award": {
          "saw": "It mentions an award, which we do not add to your site from a change request.",
          "next": null,
          "saw_short": "It mentions an award."
        },
        "rating": {
          "saw": "It mentions a rating or stars, which we do not add to your site from a change request.",
          "next": null,
          "saw_short": "It mentions a rating or stars."
        },
        "review_count": {
          "saw": "It mentions reviews on Google, Yelp or Facebook, or a number of reviews, which we do not add to your site from a change request.",
          "next": null,
          "saw_short": "It mentions reviews on Google, Yelp or Facebook, or a number of reviews."
        },
        "superlative": {
          "saw": "It uses a word such as best, number one or leading, which we do not add to your site from a change request.",
          "next": "Please send it again without that word.",
          "saw_short": "It uses a word such as best, number one or leading."
        },
        "guarantee": {
          "saw": "It mentions a guarantee or a warranty, which we do not add to your site from a change request.",
          "next": null,
          "saw_short": "It mentions a guarantee or a warranty."
        },
        "testimonial": {
          "saw": "It mentions a testimonial, a review or what customers say, or quotes someone. The only reviews we put on your site are real ones, posted publicly by the people who wrote them, in their own words.",
          "next": null
        },
        "other_business": {
          "saw": "Some of its words read as a mention of another business, or a comparison with one, which we do not add to your site from a change request.",
          "next": null,
          "saw_short": "Some of its words read as a mention of another business, or a comparison with one."
        },
        "instruction": {
          "saw": "Some of its words read as an instruction to our system, or as code, rather than as words for your site.",
          "next": null
        },
        "new_feature": {
          "saw": "It mentions a new page, or a feature such as booking, payments, a shop or a blog. A change request does not add those.",
          "next": null
        },
        "other": {
          "saw": "We could not make it from this request.",
          "next": null
        },
        "post_trial": {
          "saw": "It is a change to the colours, fonts or layout, or a switch to another of the designs we built for you. After the free 30 days, your plan covers changes to the wording, details and photos, not these, so we did not make it and nothing was charged for it. These are quoted separately.",
          "next": null
        },
        "fact_wall": {
          "saw": "We could not make it in a way that keeps your site to what you have told us or what your business's own listing or website shows, so we left it out rather than put something on your site that might not be true.",
          "next": null
        }
      }
    },
    "not_used": {
      "place": "Not used: {photo_ref}, for {place}. {reason}",
      "no_place": "Not used: {photo_ref}. {reason}",
      "photo_ref_one": "the photo you sent",
      "photo_ref_many": "photo {n} of the {count} you sent",
      "places": {
        "hero": "the main picture at the top",
        "gallery": "the gallery"
      },
      "reasons": {
        "person": "It has a person in it, and we can only use photos you send us that have no people in them. Please send one of your work or premises with nobody in it.",
        "other_business": "It shows another business's name or logo. Please send one where the only name or logo is your own, or none at all.",
        "stock_like": "It looks like a stock photo, so on your site it could pass for someone else's work. Please send a different photo of your own work or premises, such as one taken on the job.",
        "printed_text": "It has words, a price or a phone number showing in it. Please send one where none show.",
        "watermark": "It has a watermark on it. Please send one with no watermark.",
        "too_small": "It is too small for {place}: it needs at least {width} x {height} pixels. Please send a larger copy, such as the original from your phone or camera.",
        "too_small_no_numbers": "It is too small for {place}. Please send a larger copy, such as the original from your phone or camera.",
        "too_small_no_place": "It is too small to use on your site. Please send a larger copy, such as the original from your phone or camera.",
        "other": "We could not use it on your site. If you would like to know more, email support@sylentt.com."
      }
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
  "sample": {
    "_source": "W417 (owner-decisions row 129 (k)): the sample-needed notice, studio/sample-menu-words-draft.md C5 in sylentt-smb-site-generation, approved as drafted; the same words as the email (runs/clients/email-templates.json sample-needed), less its greeting, its thanks, its 'reply to this email' clause and its sign-off, which a page has no use for",
    "body": "The design you chose holds a section marked as a sample: {sample_words}. It holds placeholders, not your details, so the site waits for you before it goes public.",
    "next": "Send us your own on your account page, or tell us to take the section out. Most changes are live within 2 business days.",
    "words": {
      "menu": "your menu, with placeholder dishes and prices",
      "other": "placeholder words for your kind of business"
    }
  },
  "lag": "This page is not always up to date. Changes asked for by email are not listed here.",
  "chat": {
    "photos": {
      "heading": "Your photos",
      "intro": "Attach photos of your own work or premises and say what each one is for. No photo is uploaded until you press Send these changes.",
      "file_label": "Choose photos (JPEG, PNG or WebP, up to 25 MB each)",
      "place_label": "What this photo is for (we check it is large enough)",
      "place_hero": "The main picture at the top",
      "place_gallery": "The gallery",
      "remove_label": "Remove this photo",
      "mine_label": "These are my own photos of my business's work or premises, and there are no people in them.",
      "uploading": "Uploading your photos.",
      "row_mark": "Please check this photo.",
      "also": "Photos {list} in your list have the same problem.",
      "also_one": "Photo {list} in your list has the same problem.",
      "errors": {
        "mine_needed": "Please tick the box to confirm these are your own photos with no people in them, then press Send these changes again.",
        "photo_needed": "The list above includes a photo change, but no photo is attached. Please attach the photo, or write again below to take the photo change off the list.",
        "too_many": "You can attach up to 20 photos to one request. Please remove some, then press Send these changes again. You can send the rest in a new request.",
        "too_small": "Photo {n} in your list ({file}) is too small for where you chose ({place}): it needs at least {width} x {height} pixels. Your changes were not sent. Please attach a larger copy of it, or remove it.",
        "empty": "Photo {n} in your list ({file}) is an empty file, so your changes were not sent. Please check it has finished saving or downloading, then attach it again, or remove it.",
        "unreadable": "We could not read the size of photo {n} in your list ({file}), so your changes were not sent. Please save it again as a JPEG, PNG or WebP and attach it again, or email it to support@sylentt.com.",
        "wrong_type": "Photo {n} in your list ({file}) could not be read as a JPEG, PNG or WebP file, so your changes were not sent. Please save it in one of those formats and attach it again, or email it to support@sylentt.com.",
        "too_big": "Photo {n} in your list ({file}) is over 25 MB, so your changes were not sent. Please attach a smaller copy of it, or remove it.",
        "daily_limit": "Your site has reached today's limit of 30 photo uploads, so your changes were not sent. Please try again tomorrow, or email support@sylentt.com.",
        "failed": "Photo {n} in your list ({file}) did not go through, so your changes were not sent. Please press Send these changes again, or email support@sylentt.com."
      }
    },
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
    "design_swap_note": "Switching designs: the corrections we have recorded to your words and details, such as hours, services and descriptions, are applied to the new design, so nothing you corrected comes back. Any changes to your current design's colours or fonts do not carry over.",
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
    "kinds": {
      "words": "Words and details",
      "removal": "Taking words off",
      "photo": "Your photo",
      "colours": "Colours",
      "fonts": "Fonts",
      "layout": "Moving or hiding sections",
      "design-swap": "Switching designs"
    },
    "kinds_changed": "The list above is not the latest one our system holds, so your changes were not sent. Please write again below and we will show you the up-to-date list, or email support@sylentt.com.",
    "not_taken": "We did not take this request, so nothing will be changed from it: our records do not show your plan as in its free 30 days or paid. If that is wrong, or you have just paid, please email support@sylentt.com and say which business it is.",
    "failed": "That did not go through. Please try again, or email support@sylentt.com."
  }
} as const;
