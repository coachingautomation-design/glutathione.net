import { Fragment, type ReactNode } from 'react';
import SmartLink from '@/components/SmartLink';
import { PageEvent } from '@/components/tracking/PageEvent';
import type { EdHubProvider } from '@/components/ed/types';
import {
  generateMedicalWebPageSchema,
  generateItemListSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo-schema';
import { HubHero } from './HubHero';
import { HubTopThree } from './HubTopThree';
import { HubProviderRow, HubBestOverallPick, HubOfferBanner } from './HubProviderRow';
import { HubRankedList } from './HubRankedList';
import { HubFaqList } from './HubFaqList';
import { HubStickyCta } from './HubStickyCta';
import { HubHowWeRankStrip, HowWeRank, EditorialByline, Disclosure } from './HubSections';
import { HUB_HEADING } from './theme';

/**
 * The landing-page template in the bestnadtreatments.com design. Pages supply
 * copy and a roster, never layout. Section order is decision-first:
 *
 *   1. Navy hero band
 *   2. Top-3 flashcards pulled up over the hero, then the ranked rows with an
 *      interstitial offer banner, all on the navy band
 *   3. The #1 pick restated and the How We Rank strip, on white
 *   4. Optional "which option is right for me" cards
 *   5. The long-form guide in an 820px reading column on cream
 *   6. FAQs on a sand band
 *   7. Methodology, byline and medical disclaimer
 *   8. Closing "compare more" band
 *
 * The previous EdHubPage template is frozen under app/v1 for the -v1 URLs.
 */

export type HubPageProps = {
  /** Tracking vertical for every affiliate payload on the page. */
  vertical: string;
  /** Canonical path with leading and trailing slash, for schema URLs. */
  canonical: string;
  metaTitle: string;
  metaDescription: string;
  /** H1. Defaults to `metaTitle`. */
  heading?: string;
  intro?: string;
  trustPoints?: string[];

  /** Already ordered; rank is the position in this array. */
  providers: EdHubProvider[];
  /** Index after which the interstitial offer banner renders. `null` hides it. */
  offerBannerAfterIndex?: number | null;
  /** Heading for the restated #1 block. `null` hides it. */
  bestOverallHeading?: string | null;
  /** Badge on the #1 card and flashcard, e.g. "Lowest Price". */
  topBadge?: string;
  /** Rows shown before "Explore More Providers". `null` shows every row. */
  initialVisibleCount?: number | null;
  /** #1 card's hover flip to the injection-vial photo. Off for nasal spray and patch pages. */
  showTopPickVial?: boolean;
  /** Small line above the ranked list, e.g. "Sorted by lowest published entry price". */
  rankingNote?: string;

  /** "Which option is right for me?" cards. */
  options?: {
    heading: string;
    intro: string;
    items: { name: string; body: string; onPage?: string }[];
    callout?: { heading: string; body: string };
  } | null;

  /** Long-form guide; the body uses the primitives in HubGuide. */
  guide?: {
    heading: string;
    children: ReactNode;
    moreGuides?: { href: string; label: string }[];
  } | null;

  faqs: { q: string; a: string }[];
  faqHeading?: string;

  /** Closing band. */
  closing?: { heading: string; body: string; href: string; label: string };

  schema?: {
    medicalCondition?: string;
    breadcrumbName?: string;
    itemListName?: string;
    itemListDescription?: string;
  };
};

/** Every landing page, for the "more guides" grid and the footer. */
export const HUB_PAGES = [
  { href: '/', label: 'Best Glutathione Injections 2026' },
  { href: '/best-glutathione-injections/', label: 'Best Glutathione Injections' },
  { href: '/top-ranked-glutathione-injections/', label: 'Top Ranked Glutathione Injections' },
  { href: '/affordable-glutathione-injections/', label: 'Affordable Glutathione Injections' },
  { href: '/cheapest-glutathione-injections/', label: 'Cheapest Glutathione Injections' },
  { href: '/best-sites-to-get-glutathione-injections/', label: 'Best Sites to Get Glutathione Injections' },
  { href: '/best-glutathione-nasal-spray/', label: 'Best Glutathione Nasal Spray' },
  { href: '/best-glutathione-patch/', label: 'Best Glutathione Patch Providers' },
];

export function HubPage({
  vertical,
  canonical,
  metaTitle,
  metaDescription,
  heading,
  intro,
  trustPoints,
  providers,
  offerBannerAfterIndex = 1,
  bestOverallHeading = 'Best Overall Pick',
  topBadge = 'Best Overall',
  initialVisibleCount = 7,
  rankingNote,
  showTopPickVial = true,
  options,
  guide,
  faqs,
  faqHeading = 'Frequently Asked Questions',
  closing,
  schema,
}: HubPageProps) {
  const h1 = heading ?? metaTitle;
  const closingBand = closing ?? {
    heading: 'Not Sure Where to Start?',
    body: 'Compare every glutathione provider side by side on price, format, shipping and plan terms.',
    // The homepage is the full comparison, so it points on to the price view instead.
    href: canonical === '/' ? '/cheapest-glutathione-injections/' : '/',
    label: canonical === '/' ? 'Compare Prices' : 'Compare All Providers',
  };
  const topPick = providers[0];
  const url = `${SITE_CONFIG.domain}${canonical}`;

  const rows = providers.map((provider, index) => (
    <Fragment key={provider.slug}>
      <HubProviderRow provider={provider} vertical={vertical} topBadge={topBadge} vialFlip={showTopPickVial} />
      {index === offerBannerAfterIndex && providers.length > 3 && <HubOfferBanner provider={topPick} vertical={vertical} />}
    </Fragment>
  ));

  const schemas = [
    generateMedicalWebPageSchema({ name: metaTitle, description: metaDescription, url, medicalCondition: schema?.medicalCondition }),
    generateBreadcrumbSchema([
      { name: 'Home', url: SITE_CONFIG.domain },
      ...(canonical === '/' ? [] : [{ name: schema?.breadcrumbName ?? h1, url }]),
    ]),
    generateItemListSchema({
      name: schema?.itemListName ?? metaTitle,
      description: schema?.itemListDescription ?? metaDescription,
      items: providers.map((provider) => ({ name: provider.name, position: provider.rank })),
    }),
    generateFAQSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
  ];

  const moreGuides = (guide?.moreGuides ?? HUB_PAGES).filter((link) => link.href !== canonical);

  return (
    <>
      <PageEvent eventName="vertical_page_viewed" payload={{ vertical }} />

      {/* 1. Hero */}
      <HubHero title={h1} intro={intro} trustPoints={trustPoints} />

      {/* 2. Top picks and ranked rows on the navy band */}
      <div className="bg-band">
        {providers.length >= 3 && (
          <section id="top-picks" className="relative z-10 hidden scroll-mt-20 px-4 sm:block lg:px-0">
            <div className="mx-auto -mt-[26px] max-w-content">
              <HubTopThree providers={providers} vertical={vertical} topBadge={`#1 ${topBadge}`} />
            </div>
          </section>
        )}

        <div className="relative z-10 mx-auto max-w-content px-4 pb-10 sm:pt-8 lg:px-0">
          {rankingNote && (
            <p className="mb-3 hidden text-[13px] text-white/70 sm:block">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-teal-light align-middle" aria-hidden="true" />
              {rankingNote}
            </p>
          )}
          <section id="rankings" aria-label="Ranked providers" className="-mt-[14px] min-w-0 scroll-mt-16 sm:mt-0">
            {initialVisibleCount === null ? (
              <div className="space-y-4">{rows}</div>
            ) : (
              <HubRankedList initialVisibleCount={initialVisibleCount}>{rows}</HubRankedList>
            )}
          </section>
        </div>
      </div>

      {/* 3. Best overall and How We Rank */}
      <div className="bg-white">
        <div className="mx-auto max-w-content px-4 pb-10 pt-1 lg:px-0">
          {bestOverallHeading && providers.length > 1 && (
            <HubBestOverallPick provider={topPick} vertical={vertical} heading={bestOverallHeading} topBadge={topBadge} vialFlip={showTopPickVial} />
          )}
          <HubHowWeRankStrip />
        </div>
      </div>

      {/* 4. Which option is right for me? */}
      {options && (
        <section id="options" className="scroll-mt-20 border-t border-border bg-cream py-10 md:py-12">
          <div className="mx-auto max-w-content px-4 lg:px-0">
            <div className="max-w-[820px]">
              <h2 className="text-[22px] leading-8 md:text-[28px] md:leading-[38px]" style={{ color: HUB_HEADING }}>
                {options.heading}
              </h2>
              <p className="mt-2 text-[16px] leading-7 text-inkMuted md:text-[17px]">{options.intro}</p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {options.items.map((item) => (
                <div key={item.name} className="rounded-2xl border border-border bg-white p-5 shadow-[var(--card-shadow)]">
                  <h3 className="text-[18px] leading-6 text-ink">{item.name}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-ink">{item.body}</p>
                  {item.onPage && (
                    <p className="mt-3 border-t border-border pt-3 text-[14px] leading-6 text-inkMuted">
                      <span className="font-semibold text-copper-dark">On this page: </span>
                      {item.onPage}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {options.callout && (
              <div className="mt-6 max-w-[820px] rounded-2xl border border-amber-300/60 bg-amber-tint p-5">
                <h3 className="text-base text-amber-900">{options.callout.heading}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-amber-900/90">{options.callout.body}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. Guide */}
      {guide && (
        <section id="education" className="scroll-mt-20 bg-cream pb-6 pt-[30px]">
          <div className="mx-auto max-w-[820px] px-4 lg:px-0">
            <h2 className="mb-6 text-[22px] leading-8 text-ink md:text-[30px] md:leading-[40px]">{guide.heading}</h2>
            {guide.children}

            {moreGuides.length > 0 && (
              <div className="mt-10">
                <p className="text-[12px] font-bold uppercase tracking-widest text-inkMuted">More glutathione guides</p>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {moreGuides.map((link) => (
                    <li key={link.href}>
                      <SmartLink
                        href={link.href}
                        className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white p-4 text-[15px] font-semibold text-ink transition-colors hover:border-copper hover:text-copper-dark"
                      >
                        {link.label}
                        <span aria-hidden="true" className="text-copper">
                          &rarr;
                        </span>
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 6. FAQs */}
      <section id="faq" className="scroll-mt-20 bg-sand py-10">
        <div className="mx-auto max-w-[820px] px-4 lg:px-0">
          <h2 className="mb-6 text-[22px] leading-8 md:text-[26px] md:leading-9" style={{ color: HUB_HEADING }}>
            {faqHeading}
          </h2>
          <HubFaqList items={faqs} />
        </div>
      </section>

      {/* 7. Methodology, byline and disclaimers */}
      <section className="bg-cream py-8">
        <div className="mx-auto max-w-[820px] space-y-4 px-4 lg:px-0">
          <HowWeRank />
          <EditorialByline />
          <Disclosure variant="affiliate" />
          <Disclosure variant="medical" />
        </div>
      </section>

      {/* 8. Closing band */}
      <section className="bg-ink py-8 text-white md:py-12">
        <div className="mx-auto w-full max-w-[820px] px-4 text-center">
          <h2 className="text-[20px] leading-7 text-white md:text-[28px] md:leading-[38px]">{closingBand.heading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-6 text-white/80 md:text-[16px]">{closingBand.body}</p>
          <SmartLink
            href={closingBand.href}
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-copper-aa px-6 text-[16px] font-bold text-white transition-colors hover:bg-copper-dark"
          >
            {closingBand.label}
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </SmartLink>
        </div>
      </section>

      {topPick && <HubStickyCta provider={topPick} vertical={vertical} />}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
    </>
  );
}
