// The page's words (copywriter, row 58 (d); decision-critic checked): runs/client-launch/copy/W35-domain-words.md in
// sylentt-smb-site-generation. Edit through the copywriter, never inline.
export const WORDS = {
  "page": {
    "title": "Use the domain you already have",
    "intro": "Type your domain and we show you the two changes to make in your domain's settings. We check them for you and connect your site once both are set.",
    "free_note": "This costs nothing extra, and you can do it during your free 30 days."
  },
  "not_signed_in": {
    "title": "Sign in first",
    "body": "This page only works for the business owner, signed in. Open the confirmation link we emailed to your business again, or ask for a sign-in link at sylentt.com/webdesign/welcome/, then come back to this page in the tab that link opens. If neither works, write to support@sylentt.com and say which business it is."
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
    "found_with_dns_host": "Your domain is registered with {registrar}.",
    "not_found": "We could not find who your domain is registered with. Make the two changes below wherever you pay to renew it, or wherever your domain's settings are managed if that is somewhere else."
  },
  "dns_host": {
    "found": "Your domain's settings are managed at {dns_host}, so make the two changes below at {dns_host}."
  },
  "steps": {
    "waiting_for_site": "Your two steps will appear here shortly, once your site's address is ready.",
    "intro": "Set these two things wherever your domain's settings are managed. Nothing else needs changing.",
    "step1": {
      "title": "Step 1: forward {domain} to www",
      "body": "Find the setting called forwarding or redirect, and send {domain} to the address below. If it asks what kind, choose permanent (301). If you cannot find a setting like that, write to support@sylentt.com and say which business it is.",
      "from_label": "Forward",
      "from_value": "{domain}",
      "to_label": "To",
      "to_value": "https://www.{domain}",
      "copy_button": "Copy",
      "copied": "Copied"
    },
    "step2": {
      "title": "Step 2: point www to your new site",
      "body": "Add a new record with these details. If a www record is already there, delete it and add this one. If the record has a proxy setting (Cloudflare calls it Proxy status), set it to DNS only.",
      "type_label": "Type",
      "type_value": "CNAME",
      "host_label": "Host or Name",
      "host_value": "www",
      "value_label": "Value or Points to",
      "value_value": "{target}",
      "copy_button": "Copy",
      "copied": "Copied"
    }
  },
  "never_touch": "We never change your email settings (MX, SPF, DKIM, DMARC) or your nameservers, and you never need to give us your registrar login.",
  "mail": {
    "forwarding_caution": "Your domain's mail records point to {forwarding}. The forward in step 1 is a different setting, for your web address only, so leave your email settings at {forwarding} as they are; we do not change your mail records. Afterwards, send an email to your address at {domain} and check that it still reaches you. If it does not, check your email settings at {forwarding}.",
    "changed": "We noticed your domain's mail records (MX) changed after you entered your domain on this page. We do not change mail records, and Nic has been told. If you did not mean to change them, check with whoever manages your domain's settings."
  },
  "old_site": "Your old website or parked page at www.{domain} stops showing as soon as step 2 takes effect, and your new site appears in its place once we have connected it. Make both steps at the same sitting so the gap is as short as possible.",
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
    "connected": "Your site is connected. www.{domain} now shows your new site, with HTTPS (the padlock). {domain} on its own reaches your site only through the forward you set in step 1, so leave that forward in place.",
    "not_connected": "We tried to connect www.{domain} to your site, and it did not work. It may not fix itself, so write to support@sylentt.com, say which business it is, and say that your domain did not connect."
  },
  "rather_not": "Would rather not do this yourself? Write to support@sylentt.com and say which business it is."
} as const;
