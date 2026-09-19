import Script from 'next/script';

// Meta Pixel, scoped to the /webdesign section only (not the whole site), so it
// covers just the Facebook ad funnel: the landing page fires PageView and the
// thanks page fires Lead (see thanks/PixelLead.tsx). Disclosed in the privacy
// policy, sections 4 and 8.
const META_PIXEL_ID = '1794193235178009';

/* THE ENTITY EDGE. This is what says the thing SOLD on this page is a service
 * Sylentt Partners provides.
 *
 * Be precise about the gap, because an earlier draft of this comment was not:
 * the root layout's WebSite node already carries `publisher` with this same
 * Organization @id, so a machine could always tell that this PAGE belongs to
 * Sylentt Partners. What it could not tell is that the websites sold here are
 * something that entity does. Every structured description it could reach named
 * one service line: integration. An AI asked about "Sylentt Partners web design"
 * answered, correctly from what we published, that Sylentt Partners does not do
 * web design. A cold recipient checking whether the sender is real got told the
 * sender's company does not do the thing the email is selling.
 *
 * `provider` is the load-bearing key: it resolves to the SAME @id as the
 * Organization node on the homepage, so this Service attaches to the existing
 * entity instead of floating as an unrelated page.
 *
 * Every figure below is published on the page itself and attested in the
 * pipeline repo's owner register (row 40). Do not put a number here that is not
 * already on /webdesign/ or /webdesign/terms/.
 *
 * This lives in the LAYOUT, not page.tsx, on purpose: page.tsx is maintained as
 * a whole-file copy by runs/webdesign-samples/ in the pipeline repo, and a
 * second patch set editing the same file produces two copies that drift.
 * The cost is that the node also ships on terms/, refunds/ and privacy/, which
 * are that service's own terms pages, and on the two noindex pages, which are
 * not indexed at all.
 */
const jsonLdWebDesignService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://sylentt.com/webdesign/#service',
  name: 'Web design for local businesses',
  serviceType: 'Web design',
  url: 'https://sylentt.com/webdesign/',
  description:
    'A website researched, designed, written and hand-coded for one local business, not assembled from a template. Sold as a managed monthly plan: $9.99 a month plus tax, first 30 days free, cancel any time. Hosting, SSL, backups, uptime monitoring, security patches and up to two content changes a calendar month are included. After 12 continuous paid months on the plan the site and the code behind it transfer to the customer; cancel before then and the site comes down and nothing transfers.',
  provider: {
    '@id': 'https://sylentt.com/#organization',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Local service and trade businesses',
  },
  offers: {
    '@type': 'Offer',
    url: 'https://sylentt.com/webdesign/',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '9.99',
      priceCurrency: 'USD',
      referenceQuantity: {
        '@type': 'QuantitativeValue',
        value: 1,
        unitCode: 'MON',
      },
      description:
        '$9.99 per month plus tax, with the first 30 days free. Cancel any time.',
    },
    termsOfService: 'https://sylentt.com/webdesign/terms/',
  },
};

export default function WebDesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebDesignService) }}
      />
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      {children}
    </>
  );
}
