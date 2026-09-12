import OutboundLink from '@/components/OutboundLink';
import SmartLink from '@/components/SmartLink';
import { TOP_PICK_VIAL_IMAGE_URL } from './EdProviderRow';
import type { EdHubProvider } from './types';
import type { RelatedLink } from '@/lib/internal-links';

/**
 * Right rail for /best-ed-providers/, desktop only.
 *
 * The reference layout runs a visitor-count widget at the top of this rail
 * ("N people visited our top-rated companies this month"). We do not have that
 * number and will not invent one — fabricated visitor counts, purchase counts
 * and "people viewing now" badges are exactly the manufactured social proof
 * this site's own content rules prohibit. The slot is filled instead with the
 * editor's pick, which is a claim we can actually stand behind.
 *
 * Everything else in the rail is real: Articles pulls the ED guides that exist
 * in `data/guides`, Reviews pulls the standalone reviews that exist on-site.
 */

import { ED_HEADING as BRAND_DARK, ED_HEADING as ED_BLUE, ED_CTA, ED_BORDER } from './theme';
import { EdStars } from './EdStars';

/** Tracking vertical when a page does not pass its own. */
const DEFAULT_VERTICAL = 'best-ed-providers';

function Module({ title, children, relative = false }: { title: string; children: React.ReactNode; relative?: boolean }) {
  return (
    <section className={relative ? 'relative bg-white' : 'bg-white'} style={{ border: `1px solid ${ED_BORDER}`, borderRadius: 0, padding: 16 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#212529', margin: '0 0 12px' }}>{title}</h2>
      {children}
    </section>
  );
}

export function EdSidebar({
  topPick,
  articles,
  reviewedProviders,
  vertical = DEFAULT_VERTICAL,
  guidesHref = '/best-ed-providers/guides/',
  guidesHeading = 'ED Guides',
  guidesLinkLabel = 'See all ED guides →',
  showVial = true,
}: {
  topPick: EdHubProvider;
  articles: RelatedLink[];
  reviewedProviders: EdHubProvider[];
  /** Tracking vertical for this page — every hub reuses this rail. */
  vertical?: string;
  guidesHref?: string;
  /** Labels default to the ED wording; every other vertical passes its own. */
  guidesHeading?: string;
  guidesLinkLabel?: string;
  /** The top pick's product vial shot — off where the shot (an injection) doesn't match the page's format. */
  showVial?: boolean;
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-16 space-y-5">
        <Module title="Editor’s Top Pick" relative>
          {/* Whole-card affiliate link, beneath the Visit Site button. */}
          <OutboundLink
            href={topPick.affiliateUrl}
            ariaLabel={`Visit ${topPick.name}`}
            payload={{ vertical, provider: topPick.name, providerSlug: topPick.slug, placement: 'sidebar', rank: topPick.rank }}
            className="absolute inset-0 z-[1]"
            style={{ textDecoration: 'none' }}
          />

          <div className="flex flex-col items-center text-center">
            <div className="flex h-10 items-center justify-center">
              {topPick.logoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={topPick.logoUrl}
                  alt={`${topPick.name} logo`}
                  width={140}
                  height={36}
                  style={{ height: 36, maxWidth: 140, objectFit: 'contain' }}
                  loading="lazy"
                />
              ) : (
                <span className="text-base font-bold" style={{ color: BRAND_DARK }}>
                  {topPick.name}
                </span>
              )}
            </div>

            {showVial && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={TOP_PICK_VIAL_IMAGE_URL}
                alt={`${topPick.name} product`}
                className="mt-3"
                style={{ height: 90, maxWidth: '100%', objectFit: 'contain' }}
                loading="lazy"
              />
            )}

            <div className="mt-3 flex items-center gap-2">
              <span className="text-2xl font-black leading-none tabular-nums" style={{ color: '#000' }}>
                {topPick.rating.toFixed(2)}
              </span>
              <EdStars rating={topPick.rating} />
            </div>
            <span className="mt-1 text-xs" style={{ color: '#6b7280' }}>
              {topPick.userVotes.toLocaleString('en-US')} user votes
            </span>

            <p className="mt-3 text-sm leading-snug" style={{ color: '#374151' }}>
              {topPick.tagline}
            </p>
          </div>

          <OutboundLink
            href={topPick.affiliateUrl}
            payload={{
              vertical,
              provider: topPick.name,
              providerSlug: topPick.slug,
              placement: 'sidebar',
              rank: topPick.rank,
            }}
            className="relative z-[2] mt-3 flex w-full items-center justify-center px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: ED_CTA, borderRadius: 4, textDecoration: 'none' }}
          >
            Visit Site
          </OutboundLink>
        </Module>

        {articles.length > 0 && (
          <Module title={guidesHeading}>
            <ul className="space-y-3">
              {articles.slice(0, 5).map((article) => (
                <li key={article.href} className="border-b border-neutral-100 pb-3 last:border-b-0 last:pb-0">
                  <SmartLink
                    href={article.href}
                    className="block text-sm font-semibold leading-snug hover:underline"
                    style={{ color: BRAND_DARK }}
                  >
                    {article.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
            <SmartLink
              href={guidesHref}
              className="mt-3 inline-block text-xs font-bold underline underline-offset-2"
              style={{ color: ED_BLUE }}
            >
              {guidesLinkLabel}
            </SmartLink>
          </Module>
        )}

        {reviewedProviders.length > 0 && (
        <Module title="Provider Reviews">
          <ul className="space-y-3">
            {reviewedProviders.slice(0, 5).map((provider) => (
              <li
                key={provider.slug}
                className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-3 last:border-b-0 last:pb-0"
              >
                <span className="min-w-0 flex-1 truncate text-sm font-semibold" style={{ color: BRAND_DARK }}>
                  {provider.name}
                </span>
                <SmartLink
                  href={provider.reviewPath as string}
                  className="flex-none text-xs font-bold underline underline-offset-2"
                  style={{ color: ED_BLUE }}
                >
                  Learn more
                </SmartLink>
              </li>
            ))}
          </ul>
        </Module>
        )}

      </div>
    </aside>
  );
}

const HOW_WE_RANK_POINTS = [
  'Only figures a provider publishes on its own site.',
  'No clinical testing and no patient outcome data.',
  'Unverifiable numbers are shown as “not published”.',
  'Rankings are editorial, not paid placement.',
];

/**
 * "How We Rank" — used to live as a stacked module in `EdSidebar`, but on a
 * short page (few providers, no Articles/Provider Reviews modules to fill
 * the rail) that left the sidebar visibly taller than the ranked-list column
 * beside it. Rendered instead as a slim horizontal strip directly under the
 * ranked list, so it works the same on a 9-provider page and a 1-provider
 * spotlight page alike.
 */
export function EdHowWeRankStrip() {
  return (
    <div
      className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-1.5 bg-white px-4 py-3 text-xs leading-snug"
      style={{ border: `1px solid ${ED_BORDER}`, color: '#374151' }}
    >
      <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: BRAND_DARK }}>
        How We Rank
      </span>
      {HOW_WE_RANK_POINTS.map((point) => (
        <span key={point}>{point}</span>
      ))}
    </div>
  );
}
