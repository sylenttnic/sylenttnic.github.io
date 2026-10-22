import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

/* The samples section.
 *
 * WHAT THESE ARE, AND WHY THE WORDING IS NOT NEGOTIABLE. Each card links a real
 * build from the pipeline, re-dressed under an invented business name with the
 * customer reviews removed. Nothing here may imply a customer: at the time of
 * writing not one site has been sold, so "our clients", "case studies" and
 * "trusted by" would all be false of the set even though every individual card
 * is true. "Sites we designed and built" is the claim the evidence supports.
 *
 * The businesses are fictional and the page says so, here and again in the
 * served bytes of every sample page, because a sample URL is landable and
 * shareable on its own and a label on this page does not travel with it.
 */

type Sample = {
  slug: string;
  business: string;
  trade: string;
  city: string;
  blurb: string;
};

export const SAMPLES: Sample[] = [
  {
    slug: 'sawgrass-drilling',
    business: 'Sawgrass Drilling',
    trade: 'Well drilling',
    city: 'Pompano Beach, FL',
    blurb: 'A landscape drawn in code, with the drill rig on the skyline, set like a park poster.',
  },
  {
    slug: 'bedrock-septic-tanks',
    business: 'Bedrock Septic Tanks',
    trade: 'Septic systems',
    city: 'New Braunfels, TX',
    blurb: 'Four words as big as the screen, because the whole job fits in four words.',
  },
  {
    slug: 'ks-pool-solutions',
    business: "K's Pool Solutions",
    trade: 'Pool and spa service',
    city: 'Orlando, FL',
    blurb: 'Pool blue from edge to edge, with the phone number as big as the headline.',
  },
  {
    slug: 'prairie-line-lawns',
    business: 'Prairie Line Lawns Inc.',
    trade: 'Lawn and tree care',
    city: 'Salina, KS',
    blurb: 'Fifty years of lawns said once, big, then the whole lawn year laid out season by season.',
  },
  {
    slug: 'anvil-and-arc-precision',
    business: 'Anvil & Arc Precision Mfg.',
    trade: 'Metal fabrication',
    city: 'Lodi, CA',
    blurb: 'Blueprint navy and a cut steel plate drawn in code, for a shop that sells precision.',
  },
  {
    slug: 'volta-appliance',
    business: 'Volta Appliance',
    trade: 'Appliance repair',
    city: 'Murfreesboro, TN',
    blurb: 'Dark and quiet, with a dial that names the four machines the shop fixes.',
  },
];

export default function SampleGallery() {
  return (
    <section
      id="samples"
      className="scroll-mt-24 bg-ink text-paper py-16 md:py-24 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-3xl mb-10 md:mb-14">
          <p className="eyebrow mb-4 font-semibold uppercase tracking-widest text-xs text-paper/60">
            The work
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-balance text-paper">
            Six real builds. Open any of them.
          </h2>
          <p className="text-lg md:text-xl text-paper/80 font-sans leading-relaxed text-pretty">
            Each of these is a finished site from this shop: one trade, one town,
            researched, written and coded from scratch. They are working pages,
            not pictures. Open one on your phone and scroll it.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 list-none p-0 m-0">
          {SAMPLES.map((s) => (
            <li key={s.slug}>
              <a
                href={`/webdesign/samples/${s.slug}/`}
                target="_blank"
                rel="noopener"
                className="group flex h-full flex-col rounded-xl overflow-hidden bg-paper text-ink shadow-lift focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/60"
              >
                <Image
                  src={`/webdesign/samples/thumbs/${s.slug}.jpg`}
                  alt={`The top of the ${s.business} website: a ${s.trade.toLowerCase()} site built for ${s.city}`}
                  width={1800}
                  height={1125}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block border-b border-ink/10"
                />
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <p className="font-serif text-lg font-bold mb-1">{s.business}</p>
                  <p className="text-xs uppercase tracking-widest text-ink/50 font-sans mb-3">
                    {s.trade} &middot; {s.city}
                  </p>
                  <p className="text-sm text-ink/80 font-sans leading-relaxed mb-4 flex-1">{s.blurb}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-accent mt-auto">
                    View the site
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 md:mt-14 max-w-3xl border-l-4 border-accent pl-5 md:pl-6">
          <p className="text-base md:text-lg text-paper/80 font-sans leading-relaxed text-pretty">
            <strong className="text-paper">The businesses are invented, and that is deliberate.</strong>{' '}
            Every one of these was built for a real local company, and none of them
            has agreed to be anyone&apos;s advertisement, so we show the work under
            made-up names and take the customer reviews out. The design, the
            writing and the speed are untouched. It is the same care you would get
            if you kept yours: we do not put your business on our sales page
            unless you tell us to.
          </p>
        </div>
      </div>
    </section>
  );
}
