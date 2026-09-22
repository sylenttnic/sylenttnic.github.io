/* GENERATED — do not hand-edit the numbers or the example text.

   The no-presence questionnaire for /webdesign (owner-decisions rows 45-46 in
   sylenttnic/sylentt-smb-site-generation). Labels and control types are the
   standard's (standards/intake-questionnaire.md §2), written for the page.

   EVERY `max` AND EVERY `ghost` IS READ from the canonical files at generation
   time — the pipeline's scripts/lib/inbound.mjs FIELD_CAPS and
   runs/no-presence-intake/ghost-text.json — so this page, the intake Lambda and
   the pipeline's `record` cannot disagree by a typo. `required` is
   FIELD_CAPS' `required_no_presence`. If the pipeline adds a question this
   page does not know, it is simply never asked (a Gap, the safe direction);
   if this page sends a key the Lambda does not know, the Lambda refuses it.

   GHOST TEXT IS A `placeholder`, NEVER A `value` (§2.6). It is one example
   business throughout — a mobile dog groomer, deliberately not a trade the
   pipeline builds for, so it teaches the shape of an answer rather than
   offering itself as one. */

export type Control = 'text' | 'textarea' | 'email' | 'tel' | 'url' | 'radio' | 'checks';
export type Question = {
  key: string; label: string; control: Control; max: number; required: boolean;
  ghost?: string; rows?: number; inputMode?: 'numeric';
  options?: Array<string | [string, string]>; max_picks?: number;
  showWhenPremisesNot?: string; pair?: string;
};
export type Section = { id: string; title: string; open: boolean; note: string; q: Question[] };

export const SECTIONS: Section[] = [
  {
    "id": "business",
    "title": "Your business",
    "open": true,
    "note": "",
    "q": [
      {
        "key": "services_primary",
        "label": "What are the main things you do? One per line.",
        "control": "textarea",
        "max": 600,
        "required": true,
        "ghost": "Full groom (bath, haircut, nails, ears)\nBath and tidy\nNail trim only\nDe-shedding treatment",
        "rows": 4
      },
      {
        "key": "service_area",
        "label": "Which towns, neighbourhoods or areas do you cover?",
        "control": "text",
        "max": 400,
        "required": true,
        "ghost": "Logan, North Logan, Hyde Park, Smithfield, Providence"
      },
      {
        "key": "premises",
        "label": "Do customers come to you, or do you travel to them?",
        "control": "radio",
        "max": 20,
        "required": true,
        "options": [
          [
            "customers-come",
            "Customers come to me"
          ],
          [
            "i-travel",
            "I travel to them"
          ],
          [
            "both",
            "Both"
          ]
        ]
      }
    ]
  },
  {
    "id": "facts",
    "title": "What goes on your site",
    "open": false,
    "note": "Leave anything blank that you would rather not publish.",
    "q": [
      {
        "key": "services_secondary",
        "label": "Anything else you offer worth listing?",
        "control": "text",
        "max": 600,
        "required": false,
        "ghost": "Puppy first-groom sessions, teeth brushing, flea and tick baths"
      },
      {
        "key": "services_not",
        "label": "Anything people often ask for that you do NOT do?",
        "control": "text",
        "max": 600,
        "required": false,
        "ghost": "No cat grooming, no dogs over 90 lbs, no sedation or vet work"
      },
      {
        "key": "hours",
        "label": "Your hours, per day. Leave a day out if you are closed.",
        "control": "text",
        "max": 300,
        "required": false,
        "ghost": "Mon-Fri 8:00-17:00, Sat 9:00-14:00, Sun closed"
      },
      {
        "key": "established_year",
        "label": "What year did you start?",
        "control": "text",
        "max": 20,
        "required": false,
        "ghost": "2019",
        "inputMode": "numeric"
      },
      {
        "key": "address",
        "label": "The address to publish, if customers come to you.",
        "control": "text",
        "max": 200,
        "required": false,
        "ghost": "Leave blank if you travel to customers",
        "showWhenPremisesNot": "i-travel"
      },
      {
        "key": "service_radius",
        "label": "How far will you travel?",
        "control": "text",
        "max": 200,
        "required": false,
        "ghost": "About 25 miles from Logan; a little further for regulars"
      },
      {
        "key": "email_public",
        "label": "An email address to show on the site, if you want one shown.",
        "control": "email",
        "max": 254,
        "required": false,
        "ghost": "hello@example.com"
      },
      {
        "key": "phone_secondary",
        "label": "A second phone number",
        "control": "tel",
        "max": 40,
        "required": false,
        "ghost": "(435) 555-0188",
        "pair": "phone_secondary_label"
      },
      {
        "key": "phone_secondary_label",
        "label": "What you call that second number",
        "control": "text",
        "max": 60,
        "required": false,
        "ghost": "Text line for booking",
        "pair": "phone_secondary"
      },
      {
        "key": "booking_url",
        "label": "A booking or quote link you already use.",
        "control": "url",
        "max": 200,
        "required": false,
        "ghost": "https://example.com/book"
      },
      {
        "key": "pricing",
        "label": "Anything about price you are happy to publish.",
        "control": "textarea",
        "max": 600,
        "required": false,
        "ghost": "Full groom from $75 depending on size and coat. Free quote over text. $20 first-visit discount.",
        "rows": 2
      },
      {
        "key": "payment",
        "label": "How can customers pay you?",
        "control": "text",
        "max": 200,
        "required": false,
        "ghost": "Cash, card, Venmo, Apple Pay"
      },
      {
        "key": "domain_owned",
        "label": "Do you already own a domain name?",
        "control": "text",
        "max": 200,
        "required": false,
        "ghost": "brightwatergrooming.com (bought it, never used it)"
      }
    ]
  },
  {
    "id": "guidance",
    "title": "Help us build it around you",
    "open": false,
    "note": "None of this is quoted on your site. It tells us how the site should feel.",
    "q": [
      {
        "key": "job_typical",
        "label": "Describe a typical job, start to finish: what you turn up with, how long, what the customer gets.",
        "control": "textarea",
        "max": 900,
        "required": false,
        "ghost": "I park the van outside, run water and power off the van, and groom one dog at a time. A full groom takes about 90 minutes. The dog comes back brushed out, nails done, smelling clean, and nobody has to drive anywhere.",
        "rows": 3
      },
      {
        "key": "occasions",
        "label": "Who calls you, and for what?",
        "control": "checks",
        "max": 300,
        "required": false,
        "options": [
          "Private parties",
          "Birthdays",
          "Schools",
          "Corporate",
          "Festivals and fairs",
          "Charity",
          "Weddings",
          "Other"
        ]
      },
      {
        "key": "voice_sample",
        "label": "Someone at a barbecue asks what you do. Write what you'd actually say.",
        "control": "textarea",
        "max": 600,
        "required": false,
        "ghost": "I groom dogs in a van that comes to your driveway. It's quieter than a salon, your dog is never in a cage, and you don't have to drop off and pick up.",
        "rows": 2
      },
      {
        "key": "character",
        "label": "Pick the two that best fit how you want to come across.",
        "control": "checks",
        "max": 100,
        "required": false,
        "options": [
          "Playful",
          "Professional",
          "Artistic",
          "Warm",
          "Energetic",
          "Calm",
          "Premium",
          "Down-to-earth",
          "Meticulous"
        ],
        "max_picks": 2
      },
      {
        "key": "positioning",
        "label": "In your area, are you the budget option, mid-range, or the premium one?",
        "control": "radio",
        "max": 40,
        "required": false,
        "options": [
          [
            "budget",
            "Budget"
          ],
          [
            "mid-range",
            "Mid-range"
          ],
          [
            "premium",
            "Premium"
          ]
        ]
      },
      {
        "key": "differentiator",
        "label": "What do you do that others doing this locally don't?",
        "control": "textarea",
        "max": 600,
        "required": false,
        "ghost": "One dog at a time, no cages, no kennel noise. Most salons run four or five dogs at once and the anxious ones have a bad day.",
        "rows": 2
      },
      {
        "key": "one_thing",
        "label": "If a customer remembers one thing about you, what should it be?",
        "control": "text",
        "max": 300,
        "required": false,
        "ghost": "Their dog was calm afterwards instead of wound up."
      },
      {
        "key": "proof_available",
        "label": "What can we point to that shows you're established?",
        "control": "checks",
        "max": 300,
        "required": false,
        "options": [
          "Years in business",
          "A licence or certificate",
          "An insurance certificate",
          "A trade association",
          "Regular venues",
          "Repeat clients",
          "None yet"
        ]
      },
      {
        "key": "work_setting",
        "label": "Where does the work happen?",
        "control": "checks",
        "max": 200,
        "required": false,
        "options": [
          "Indoors at venues",
          "Outdoors",
          "The customer's home",
          "My own space"
        ]
      },
      {
        "key": "setup_look",
        "label": "What does a customer see when you arrive or walk in? The table, the kit, the chair, a banner.",
        "control": "textarea",
        "max": 900,
        "required": false,
        "ghost": "A white van with the side door open, a stainless table and tub, a folded towel stack, clippers on a magnetic strip, and a rubber mat on the driveway.",
        "rows": 3
      },
      {
        "key": "work_colors",
        "label": "What colours show up most in your work or your kit?",
        "control": "text",
        "max": 200,
        "required": false,
        "ghost": "Teal and warm grey on the van, lots of stainless and white towels"
      },
      {
        "key": "brand_color",
        "label": "Do you already use a particular colour?",
        "control": "text",
        "max": 200,
        "required": false,
        "ghost": "Teal, roughly the colour of the van wrap"
      },
      {
        "key": "brand_color_where",
        "label": "Where does that colour appear?",
        "control": "text",
        "max": 200,
        "required": false,
        "ghost": "Van wrap and my polo shirts"
      },
      {
        "key": "logo",
        "label": "Do you have a logo? If so, describe it.",
        "control": "text",
        "max": 400,
        "required": false,
        "ghost": "Yes, a dog silhouette inside a water drop, done by a friend"
      },
      {
        "key": "local_character",
        "label": "What's the area you work in like?",
        "control": "text",
        "max": 400,
        "required": false,
        "ghost": "Small valley town, mountains on both sides, lots of families with yards and big dogs"
      },
      {
        "key": "seasonality",
        "label": "Busier at particular times of year?",
        "control": "text",
        "max": 400,
        "required": false,
        "ghost": "Busiest in spring shedding season and the two weeks before Christmas; quiet in January"
      },
      {
        "key": "contact_pref",
        "label": "How do you most want customers to reach you?",
        "control": "radio",
        "max": 40,
        "required": false,
        "options": [
          [
            "call",
            "Call"
          ],
          [
            "text",
            "Text"
          ],
          [
            "email",
            "Email"
          ],
          [
            "booking form",
            "Booking form"
          ]
        ]
      },
      {
        "key": "competitors",
        "label": "Who else near you does this? Names are fine.",
        "control": "text",
        "max": 400,
        "required": false,
        "ghost": "Cache Valley Pet Salon, Bark & Bubbles on Main, a couple of people working out of their homes"
      }
    ]
  },
  {
    "id": "credentials",
    "title": "Licences and insurance",
    "open": false,
    "note": "We check these before we say anything about them. If we cannot check it, your site will not claim it.",
    "q": [
      {
        "key": "credentials",
        "label": "Do you hold a licence, certification or registration for this work? Give the issuing body and the number.",
        "control": "text",
        "max": 400,
        "required": false,
        "ghost": "e.g. 'National Dog Groomers Association certified, #NDG-12345'. Leave blank if none."
      },
      {
        "key": "insured",
        "label": "Do you carry public liability insurance?",
        "control": "text",
        "max": 400,
        "required": false,
        "ghost": "e.g. 'Yes, general liability through State Farm'. Leave blank if none."
      }
    ]
  }
];

/* The three EXISTING fields a no-presence request must also answer. */
export const REQUIRED_BUSINESS = { phone: 40, trade: 120 } as const;
export const AUTHORITY_MAX = 200;
export const GHOST_BUSINESS = { name: "Brightwater Mobile Dog Grooming", trade: "Mobile dog grooming", phone: "(435) 555-0142" } as const;
