// The page's words (copywriter, row 58 (d); decision-critic checked): runs/client-launch/copy/W35-domain-words.md in
// sylentt-smb-site-generation. Edit through the copywriter, never inline.
export const WORDS = {
  "page": {
    "title": "Use the domain you already have",
    "intro": "Type your domain and we show you the two changes to make where it is registered. We check them for you and connect your site once both are set.",
    "free_note": "This costs nothing extra, and you can do it during your free 30 days."
  },
  "not_signed_in": {
    "title": "Sign in first",
    "body": "This page only works for the business owner, signed in. Open the confirmation link we emailed to your business again, then come back to this page in the same window. If that link no longer works, write to nic@sylentt.com and say which business it is."
  },
  "form": {
    "field_label": "Your domain",
    "placeholder": "yourbusiness.com",
    "hint": "With or without www is fine.",
    "button": "Show my two steps"
  },
  "errors": {
    "not-a-domain": "Type the domain on its own, such as yourbusiness.com. A part of one, such as shop.yourbusiness.com, cannot be connected here.",
    "not-connectable": "That is one of our own addresses, so it cannot be connected. Type the domain your business owns."
  },
  "registrar": {
    "found": "Your domain is registered with {registrar}. Make the two changes below there, or wherever your domain's settings are managed if that is somewhere else.",
    "not_found": "We could not find who your domain is registered with. Make the two changes below wherever you pay to renew it, or wherever your domain's settings are managed if that is somewhere else."
  },
  "dns_host": {
    "found": "Your domain's settings are managed at {dns_host}, so make the two changes below at {dns_host}."
  },
  "steps": {
    "waiting_for_site": "Your two steps will appear here shortly, once your site's address is ready.",
    "intro": "Set these two things at your registrar, or wherever your domain's settings are managed. Nothing else needs changing.",
    "step1": {
      "title": "Step 1: point www to your new site",
      "body": "Add a new record with these details. If a www record is already there, delete it and add this one. If the record has a proxy setting (Cloudflare calls it Proxy status), set it to DNS only.",
      "type_label": "Type",
      "type_value": "CNAME",
      "host_label": "Host or Name",
      "host_value": "www",
      "value_label": "Value or Points to",
      "value_value": "{target}",
      "copy_button": "Copy",
      "copied": "Copied"
    },
    "step2": {
      "title": "Step 2: forward {domain} to www",
      "body": "Find the setting your registrar calls forwarding or redirect, and send {domain} to the address below. If it asks what kind, choose permanent (301).",
      "from_label": "Forward",
      "from_value": "{domain}",
      "to_label": "To",
      "to_value": "https://www.{domain}",
      "copy_button": "Copy",
      "copied": "Copied"
    }
  },
  "never_touch": "We never touch your email settings (MX, SPF, DKIM, DMARC) or your nameservers, and you never need to give us your registrar login. Leave those as they are and your email keeps working.",
  "old_site": "Your old website or parked page at www.{domain} stops showing as soon as step 1 takes effect, and your new site appears in its place once we have connected it. Make both steps at the same sitting so the gap is as short as possible.",
  "status": {
    "title": "Where things stand",
    "checking_note": "We check your domain every 15 minutes or so. Changes at a registrar can take a while to show up, so a change you just made may not appear here at once.",
    "unchecked": "We have not checked your domain yet.",
    "wrong": "Neither change shows up yet. If you have just made them, give them a while to appear.",
    "half": {
      "intro": "One of the two is set. Still to do:",
      "www_wrong": "www points to {found}, not {target}.",
      "www_missing": "www does not point to {target} yet.",
      "forward_wrong": "{domain} goes to {found}, not https://www.{domain}.",
      "forward_missing": "{domain} does not forward to https://www.{domain} yet."
    },
    "right": "Both are set. We are now connecting www.{domain} to your site and setting up HTTPS (the padlock) for it. There is nothing more for you to do.",
    "connected": "Your site is connected. www.{domain} now shows your new site, with HTTPS (the padlock). {domain} on its own reaches your site only through the forward you set in step 2, so leave that forward in place.",
    "not_connected": "We tried to connect www.{domain} to your site, and it did not work. It may not fix itself, so write to nic@sylentt.com, say which business it is, and say that your domain did not connect."
  },
  "rather_not": "Would rather not do this yourself? Write to nic@sylentt.com and say which business it is."
} as const;
