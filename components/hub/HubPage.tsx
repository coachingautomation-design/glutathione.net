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
import { HubProviderRow, HubOfferBanner } from './HubProviderRow';
import { HubRankedList } from './HubRankedList';
import { HubFaqList } from './HubFaqList';
import { HubStickyCta } from './HubStickyCta';
import { HubFooterBands } from './HubSections';
import { HubComparisonTable, HubSidebar } from './HubSidebar';

/**
 * The landing-page template, laid out like the bestdebtoptions.com homepage in
 * glutathione.net's brown-red palette. Pages supply copy and a roster, never
 * layout:
 *
 *   1. Compact white hero (H1, intro, updated date, advertiser disclosure)
 *   2. Ranked cards with an interstitial featured-pick banner  |  sticky sidebar
 *   3. Side-by-side comparison table
 *   4. Optional "which option is right for me" section
 *   5. The long-form guide
 *   6. FAQs
 *   7. "How we rank" + "How we make money" + medical disclaimer bands
 *
 * The previous EdHubPage template is frozen under app/v1 for the -v1 URLs.
 * `bestOverallHeading` and `closing` are accepted for compatibility but this
 * layout has no restated #1 block or closing band.
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
  providers,
  offerBannerAfterIndex = 1,
  topBadge = 'Best Overall',
  initialVisibleCount = 7,
  options,
  guide,
  faqs,
  faqHeading = 'Frequently Asked Questions',
  schema,
}: HubPageProps) {
  const h1 = heading ?? metaTitle;
  const topPick = providers[0];
  const url = `${SITE_CONFIG.domain}${canonical}`;

  const rows = providers.map((provider, index) => (
    <Fragment key={provider.slug}>
      <HubProviderRow provider={provider} vertical={vertical} topBadge={topBadge} index={index} />
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
    <div className="bdo">
      <PageEvent eventName="vertical_page_viewed" payload={{ vertical }} />

      {/* 1. Hero */}
      <HubHero title={h1} description={metaDescription} />

      {/* 2-6. Main column + sidebar */}
      <div className="bdo-container pb-8 pt-5 sm:pb-10 sm:pt-6">
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="w-full min-w-0 flex-1">
            <section id="rankings" aria-label="Ranked providers" className="scroll-mt-20">
              {initialVisibleCount === null ? (
                <div className="space-y-3">{rows}</div>
              ) : (
                <HubRankedList initialVisibleCount={initialVisibleCount}>{rows}</HubRankedList>
              )}
            </section>

            <div className="mt-12 space-y-12">
              {providers.length > 1 && <HubComparisonTable providers={providers} vertical={vertical} />}

              {options && (
                <section id="options" className="scroll-mt-20">
                  <h2 className="section-heading">{options.heading}</h2>
                  <div className="prose-editorial">
                    <p>{options.intro}</p>
                    <div className="mt-4 space-y-5">
                      {options.items.map((item) => (
                        <div key={item.name}>
                          <h3 className="mb-1 text-base text-black">{item.name}</h3>
                          <p>{item.body}</p>
                          {item.onPage && (
                            <p className="text-sm text-gray-700">
                              <strong>On this page:</strong> {item.onPage}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    {options.callout && (
                      <div className="mt-6 border-l-4 border-brick bg-orange-50 p-4">
                        <h3 className="mb-1 text-base text-black">{options.callout.heading}</h3>
                        <p className="mb-0">{options.callout.body}</p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {guide && (
                <section id="education" className="scroll-mt-20">
                  <h2 className="section-heading">{guide.heading}</h2>
                  {guide.children}

                  {moreGuides.length > 0 && (
                    <div className="prose-editorial mt-8">
                      <h3 className="mb-2 text-base text-black">Keep Reading</h3>
                      <ul>
                        {moreGuides.map((link) => (
                          <li key={link.href}>
                            <SmartLink href={link.href}>{link.label}</SmartLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}

              {faqs.length > 0 && (
                <section id="faq" className="scroll-mt-20">
                  <h2 className="section-heading">{faqHeading}</h2>
                  <HubFaqList items={faqs} />
                </section>
              )}
            </div>
          </div>

          <HubSidebar providers={providers} vertical={vertical} guides={moreGuides} />
        </div>
      </div>

      {/* 7. Methodology and disclosures */}
      <HubFooterBands />

      {topPick && <HubStickyCta provider={topPick} vertical={vertical} />}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
    </div>
  );
}
