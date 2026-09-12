import { Fragment, type ReactNode } from 'react';
import SmartLink from '@/components/SmartLink';
import { ConsolidatedDisclaimer } from '@/components/content/ConsolidatedDisclaimer';
import { PageEvent } from '@/components/tracking/PageEvent';
import {
  generateMedicalWebPageSchema,
  generateItemListSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo-schema';
import type { RelatedLink } from '@/lib/internal-links';
import { EdFaqList } from './EdFaqList';
import { EdProviderRow, EdBestOverallPick, EdOfferBanner } from './EdProviderRow';
import { EdRankedList } from './EdRankedList';
import { EdHowWeRankStrip, EdSidebar } from './EdSidebar';
import { EdTopThreeFlashcard } from './EdTopThreeFlashcard';
import { ED_HEADING, ED_CTA, ED_HERO_BG, hubThemeVars, type HubTheme } from './theme';
import type { EdHubProvider } from './types';

/**
 * The vertical hub page template, carried over from exploretreatments.com's
 * `components/ed/EdHubPage` (`/best-ed-providers/` is the reference build —
 * see that repo's CLAUDE.md for the full design rationale). Pages supply copy
 * and a roster — never layout.
 *
 * Section order is decision-first on purpose: quick picks, then the ranked
 * cards, then the supporting sections, and only then the educational content.
 *
 * This copy drops the ED-specific Ro engagement slide-in (`RoEdSlideIn`) and
 * its `slideIn` prop — this site has no Ro affiliate relationship, and the
 * source page (`/glutathione/`) always rendered with `slideIn={false}` anyway.
 * Everything else — section order, card components, the `theme` palette
 * mechanism — is unchanged.
 */

export type EdHubLink = { href: string; label: string };

export type EdHubPageProps = {
  /** Tracking vertical for every affiliate payload on the page. */
  vertical: string;
  /** Page-view event. Defaults to the vertical-hub event the ED pages share. */
  pageEvent?: { name: string; payload?: Record<string, string> };

  /** Canonical path, leading and trailing slash — used for schema URLs. */
  canonical: string;
  /** Also the H1 unless `heading` overrides it. */
  metaTitle: string;
  metaDescription: string;
  heading?: string;
  /** Hero sub-line, shown from the `sm` breakpoint up. */
  intro: string;
  trustStrip?: string[];
  /** Cover photo behind the hero. Pass `null` for a flat, colour-only band. */
  heroImageUrl?: string | null;

  /** Palette. Omit for the ED colours — see `theme.ts`. */
  theme?: HubTheme;

  providers: EdHubProvider[];
  /** Defaults to the top three of `providers`. Pass `[]` to hide the strip. */
  quickPicks?: EdHubProvider[];
  /** Index after which the interstitial offer banner renders. `null` hides it. */
  offerBannerAfterIndex?: number | null;
  /** Heading for the restated #1 block. `null` hides the block. */
  bestOverallHeading?: string | null;
  /**
   * The "Explore More Providers" expander under the ranked list. It reveals the
   * rest of the roster in place — it never navigates. `null` renders the whole
   * list uncollapsed. Only shows when the roster is longer than the count.
   */
  showMore?: { initialVisibleCount?: number; moreLabel?: string; fewerLabel?: string } | null;

  /** Right rail. */
  sidebarArticles?: RelatedLink[];
  /** Wording and destination of the rail's guides module. Defaults to ED's. */
  sidebarGuides?: { heading?: string; href?: string; linkLabel?: string };

  /** "Which treatment is right for me?" — the category explainer cards. */
  treatmentTypes?: {
    heading: string;
    intro: string;
    items: { name: string; body: string; onPage?: string }[];
    callout?: { heading: string; body: string };
  } | null;

  /** "How we evaluate" — the dark methodology band. Defaults to the ED copy. */
  methodology?: {
    heading?: string;
    intro?: string;
    criteria?: { title: string; body: string }[];
    footnote?: string;
  } | null;

  /** Long-form guide. `children` is the body; the primitives live in EdGuide. */
  guide?: {
    heading: string;
    contents?: EdHubLink[];
    children: ReactNode;
    moreGuides?: RelatedLink[];
    moreGuidesHeading?: string;
  } | null;

  faqs: { q: string; a: string }[];
  faqHeading?: string;

  schema?: {
    medicalCondition?: string;
    breadcrumbName?: string;
    itemListName?: string;
    itemListDescription?: string;
  };
};

export const ED_TRUST_STRIP = [
  '100% Online Options',
  'Licensed Medical Providers',
  'Discreet Delivery Options',
  'Provider & Pricing Comparisons',
];

/**
 * Default methodology copy. It describes what we actually do — read what a
 * provider publishes — and every hub page makes the same promise, so pages
 * inherit it rather than each writing their own version of the same disclaimer.
 */
export const ED_EVALUATION_CRITERIA = [
  {
    title: 'Treatment options',
    body: 'Which formats a provider can actually prescribe, and whether both FDA-approved generics and compounded combinations are on the same formulary.',
  },
  {
    title: 'Pricing and transparency',
    body: 'Whether the entry price is published before intake, whether the per-dose maths holds up at every tier, and whether the consultation and shipping are inside the price or bolted on.',
  },
  {
    title: 'Consultation experience',
    body: 'How long the intake takes, who reviews it, whether you are charged before approval, and whether dosing can be revisited if the first cycle underperforms.',
  },
  {
    title: 'Medication format',
    body: 'Injection, oral, sublingual liquid or daily gummy — the single factor most likely to change whether a treatment fits the way you actually live.',
  },
  {
    title: 'Convenience and delivery',
    body: 'Dispatch and arrival times, shipping cost, packaging discretion, and whether refills need a fresh consultation each time.',
  },
  {
    title: 'Overall value',
    body: 'Total first-order cost against doses received, and how that changes at the tier you would realistically buy rather than the cheapest one advertised.',
  },
];

const METHODOLOGY_INTRO =
  'Our comparison is a documentary review of what each provider publishes, checked against its own site. We do not run clinical trials, we do not test medication, and we do not collect patient outcome data — so you will not find efficacy scores, success rates or survey results anywhere on this page.';

const METHODOLOGY_FOOTNOTE =
  'Editorial scores and reader vote counts shown on the cards reflect our own assessment. They are not clinical ratings, and they are not a measure of medical effectiveness. Provider details change frequently — always confirm current pricing and terms on the provider’s own site before you buy.';

const cardStyle = { border: '1px solid #e5e7eb', borderRadius: 2 } as const;

export function EdHubPage({
  vertical,
  pageEvent,
  canonical,
  metaTitle,
  metaDescription,
  heading,
  intro,
  trustStrip = ED_TRUST_STRIP,
  heroImageUrl = null,
  theme,
  providers,
  quickPicks,
  offerBannerAfterIndex = 1,
  bestOverallHeading = 'Best Overall Pick',
  showMore,
  sidebarArticles = [],
  sidebarGuides,
  treatmentTypes,
  methodology,
  guide,
  faqs,
  faqHeading = 'Treatment FAQs',
  schema,
}: EdHubPageProps) {
  const h1 = heading ?? metaTitle;
  const topPick = providers[0];
  const strip = quickPicks ?? providers.slice(0, 3);
  const reviewedProviders = providers.filter((provider) => provider.reviewPath);

  const methodologyConfig =
    methodology === null
      ? null
      : {
          heading: methodology?.heading ?? 'How We Evaluate Providers',
          intro: methodology?.intro ?? METHODOLOGY_INTRO,
          criteria: methodology?.criteria ?? ED_EVALUATION_CRITERIA,
          footnote: methodology?.footnote ?? METHODOLOGY_FOOTNOTE,
        };

  // One element per provider, so `EdRankedList` can count rows and collapse the
  // tail. The offer banner rides inside the row it follows rather than being a
  // sibling, which keeps that indexing one-to-one with `providers`.
  const rows = providers.map((provider, index) => (
    <Fragment key={provider.slug}>
      <EdProviderRow provider={provider} vertical={vertical} />
      {/* One interstitial, after the second row — far enough in to have earned
          attention, early enough to still be seen. */}
      {index === offerBannerAfterIndex && <EdOfferBanner provider={topPick} vertical={vertical} />}
    </Fragment>
  ));

  const rankedRows =
    showMore === null ? (
      <div className="space-y-4">{rows}</div>
    ) : (
      <EdRankedList
        initialVisibleCount={showMore?.initialVisibleCount}
        moreLabel={showMore?.moreLabel}
        fewerLabel={showMore?.fewerLabel}
      >
        {rows}
      </EdRankedList>
    );

  const url = `${SITE_CONFIG.domain}${canonical}`;

  const schemas = [
    generateMedicalWebPageSchema({
      name: metaTitle,
      description: metaDescription,
      url,
      medicalCondition: schema?.medicalCondition,
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: SITE_CONFIG.domain },
      { name: schema?.breadcrumbName ?? h1, url },
    ]),
    generateItemListSchema({
      name: schema?.itemListName ?? metaTitle,
      description: schema?.itemListDescription ?? metaDescription,
      items: providers.map((provider) => ({
        name: provider.name,
        // Only standalone reviews are live URLs; a provider without one is
        // listed by name so the ItemList never points at a redirect or a 404.
        ...(provider.reviewPath && { url: `${SITE_CONFIG.domain}${provider.reviewPath}` }),
        position: provider.rank,
      })),
    }),
    generateFAQSchema(faqs.map(({ q, a }) => ({ question: q, answer: a }))),
  ];

  // The hero's readability wash needs the same colour at four alphas, so the
  // theme carries bare `r, g, b` channels and the gradients are composed here.
  const overlay = 'var(--hub-hero-overlay-rgb, 236, 242, 254)';
  const overlayAt = (alpha: number) => `rgba(${overlay}, ${alpha})`;

  return (
    // Palette variables are declared here, so every card, rail and band inside
    // resolves against this vertical's colours rather than the ED defaults.
    <div className="min-h-screen bg-white" style={hubThemeVars(theme)}>
      <PageEvent
        eventName={pageEvent?.name ?? 'vertical_page_viewed'}
        payload={pageEvent?.payload ?? { vertical }}
      />

      {/* --------------------------------------------------------------- 1. Hero
          Cover photo as the band background, revealed on the right; a readability
          overlay keeps the heading, intro copy and trust strip legible on the
          left. Kept compact so the first provider row is within a screen of the
          fold on desktop. */}
      <header className="relative isolate overflow-hidden" style={{ backgroundColor: ED_HERO_BG }}>
        {heroImageUrl && (
          <>
            <div
              className="absolute inset-0 -z-10 bg-no-repeat bg-cover"
              style={{ backgroundImage: `url('${heroImageUrl}')`, backgroundPosition: 'right center' }}
              aria-hidden="true"
            />
            {/* Readability overlay — on mobile it fades left-to-right so the copy
                on the left stays legible while the right side of the photo shows
                through; desktop uses its own gradient below. Only drawn when
                there is a photo to wash out. */}
            <div
              className="absolute inset-0 -z-10 sm:hidden"
              style={{
                backgroundImage: `linear-gradient(to right, rgb(${overlay}) 0%, rgb(${overlay}) 45%, ${overlayAt(0.55)} 72%, ${overlayAt(0.1)} 100%)`,
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 -z-10 hidden sm:block"
              style={{
                backgroundImage: `linear-gradient(to right, rgb(${overlay}) 0%, rgb(${overlay}) 40%, ${overlayAt(0.55)} 56%, ${overlayAt(0)} 70%)`,
              }}
              aria-hidden="true"
            />
          </>
        )}

        {/* On mobile the band collapses to a short (~72px) hero showing only the
            H1 over the photo; the intro copy and trust strip appear from `sm` up. */}
        <div className="container-shell flex min-h-[72px] flex-col justify-center py-2 sm:block sm:min-h-0 sm:py-9">
          <div className="max-w-2xl">
            <h1 className="text-[21px] leading-[1.15] sm:text-[36px] sm:leading-[1.1]" style={{ fontWeight: 700, color: '#000' }}>
              {h1}
            </h1>
            <p className="mt-3 hidden text-[15px] leading-relaxed sm:block sm:text-base" style={{ color: '#374151' }}>
              {intro}
            </p>
          </div>

          <ul className="mt-4 hidden flex-wrap items-center gap-x-5 gap-y-2 sm:flex">
            {trustStrip.map((item, i) => (
              <li
                key={item}
                className={`items-center gap-1.5 text-xs font-semibold sm:text-sm ${i < 2 ? 'flex' : 'hidden sm:flex'}`}
                style={{ color: '#374151' }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-none"
                  style={{ color: ED_CTA }}
                  aria-hidden="true"
                >
                  <path d="m5 13 4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* --------------------------------------------- 2. Top 3 flashcard strip
          Desktop only, by request: on a phone the ranked rows already start
          within a screen of the hero, so the strip would push the actual list
          below a second fold instead of saving anyone a scroll. */}
      {/* A 3-up strip built from fewer than 3 providers renders one lonely
          card in an otherwise-empty row — not a "quick picks" strip, just a
          layout bug. Skip it entirely on short rosters. */}
      {providers.length >= 3 && strip.length > 0 && (
        <section id="top-picks" className="hidden scroll-mt-16 pt-6 pb-2 sm:block">
          <div className="container-shell">
            <EdTopThreeFlashcard providers={strip} vertical={vertical} />
          </div>
        </section>
      )}

      {/* ------------------- 3 + 4. Ranked rows, best pick and table, with rail */}
      <div className="container-shell pb-8 pt-4 sm:pb-10 sm:pt-5">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,915fr)_257fr]">
          <div className="min-w-0">
            <section id="rankings" className="scroll-mt-16">
              {/* The expander sits between the rows and the restated #1 block so
                  the button a reader reaches at the end of the list opens the
                  rest of that list, directly beneath it. */}
              {rankedRows}

              {bestOverallHeading && (
                <EdBestOverallPick provider={topPick} vertical={vertical} heading={bestOverallHeading} />
              )}

              <EdHowWeRankStrip />
            </section>
          </div>

          <EdSidebar
            topPick={topPick}
            articles={sidebarArticles}
            reviewedProviders={reviewedProviders}
            vertical={vertical}
            {...(sidebarGuides?.href && { guidesHref: sidebarGuides.href })}
            {...(sidebarGuides?.heading && { guidesHeading: sidebarGuides.heading })}
            {...(sidebarGuides?.linkLabel && { guidesLinkLabel: sidebarGuides.linkLabel })}
          />
        </div>
      </div>

      {/* ------------------------------------------------- 5. Which treatment is right? */}
      {treatmentTypes && (
        <section id="treatment-types" className="scroll-mt-16 py-10 sm:py-12">
          <div className="container-shell">
            <div className="max-w-3xl">
              <h2 style={{ fontSize: 20, fontWeight: 600, color: ED_HEADING }}>{treatmentTypes.heading}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 sm:text-base">{treatmentTypes.intro}</p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {treatmentTypes.items.map((type) => (
                <div key={type.name} className="bg-white p-5" style={cardStyle}>
                  <h3 className="text-lg font-bold text-neutral-900">{type.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{type.body}</p>
                  {type.onPage && (
                    <p className="mt-3 border-t border-neutral-100 pt-3 text-sm leading-relaxed text-neutral-700">
                      <span className="font-semibold">On this page: </span>
                      {type.onPage}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {treatmentTypes.callout && (
              <div className="mt-6 border border-amber-200 bg-amber-50 p-5" style={{ borderRadius: 2 }}>
                <h3 className="text-base font-bold text-amber-900">{treatmentTypes.callout.heading}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-amber-900/90">{treatmentTypes.callout.body}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- 6. How we evaluate */}
      {methodologyConfig && (
        <section id="methodology" className="scroll-mt-16 py-10 text-white sm:py-12" style={{ backgroundColor: ED_HEADING }}>
          <div className="container-shell">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold sm:text-3xl">{methodologyConfig.heading}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-300 sm:text-base">{methodologyConfig.intro}</p>
            </div>

            <div className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {methodologyConfig.criteria.map((criterion) => (
                <div key={criterion.title}>
                  <h3 className="text-base font-bold text-white">{criterion.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-400">{criterion.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-7 max-w-3xl border-t border-neutral-700 pt-5 text-sm leading-relaxed text-neutral-400">
              {methodologyConfig.footnote}
            </p>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------- 8. Educational content */}
      {guide && (
        <section id="education" className="scroll-mt-16 bg-neutral-50 py-10 sm:py-12">
          <div className="container-shell">
            <div className="mx-auto max-w-3xl">
              <h2 style={{ fontSize: 20, fontWeight: 600, color: ED_HEADING }}>{guide.heading}</h2>
              {guide.children}
            </div>

            {guide.moreGuides && guide.moreGuides.length > 0 && (
              <div className="mx-auto mt-8 max-w-3xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
                  {guide.moreGuidesHeading ?? 'More guides'}
                </h3>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {guide.moreGuides.map((link) => (
                    <li key={link.href}>
                      <SmartLink
                        href={link.href}
                        className="block bg-white p-4 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
                        style={cardStyle}
                      >
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------- 9. FAQs */}
      <section id="faq" className="scroll-mt-16 py-10 sm:py-12">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl">
            <h2 style={{ fontSize: 20, fontWeight: 600, color: ED_HEADING }}>{faqHeading}</h2>
            <div className="mt-6">
              <EdFaqList items={faqs} />
            </div>
          </div>
        </div>
      </section>

      <div className="container-shell pb-12">
        <div className="mx-auto max-w-3xl">
          <ConsolidatedDisclaimer />
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
    </div>
  );
}
