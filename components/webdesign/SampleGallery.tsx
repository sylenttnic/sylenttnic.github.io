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
    slug: 'northfield-electric',
    business: 'Northfield Electric',
    trade: 'Electrician',
    city: 'Rockford, IL',
    blurb: 'Dark, warm and calm, for a trade people call when something has gone wrong.',
  },
  {
    slug: 'cedar-and-stone-lawn-and-landscape',
    business: 'Cedar & Stone Lawn and Landscape',
    trade: 'Lawn care and landscaping',
    city: 'Shreveport, LA',
    blurb: 'Nine services on one crew list, laid out so a homeowner finds theirs in one scan.',
  },
  {
    slug: 'redbrick-auto-care',
    business: 'Redbrick Auto Care',
    trade: 'Auto repair',
    city: 'Abilene, TX',
    blurb: 'Built around the one thing drivers actually want: knowing the price before the work.',
  },
  {
    slug: 'tall-timber-tree-care',
    business: 'Tall Timber Tree Care',
    trade: 'Tree service',
    city: 'Eugene, OR',
    blurb: 'Heavy display type and a wide cut, for work that is physically big.',
  },
  {
    slug: 'rainhouse-gutter-co',
    business: 'Rainhouse Gutter Co.',
    trade: 'Gutters',
    city: 'Lynden, WA',
    blurb: 'A single seasonal problem, answered in the first sentence on the page.',
  },
  {
    slug: 'riverstone-landscape',
    business: 'Riverstone Landscape and Supply',
    trade: 'Landscaping and yard supply',
    city: 'Mankato, MN',
    blurb: 'Two businesses under one roof, kept separate so neither buries the other.',
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
