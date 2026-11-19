import type { EdHubProvider } from '@/components/ed/types';
import { TOP_PICK_VIAL_IMAGE_URL } from '@/components/ed/EdProviderRow';
import { HubStars } from './HubStars';
import { HubCardOverlay, HubLink, type HubPlacement } from './HubLink';
import {
  HUB_HEADING,
  HUB_CARD_HEADER,
  HUB_CARD_HEADER_TOP,
  HUB_CTA,
  HUB_ACCENT,
  HUB_RANK_CHIP,
  HUB_TEXT,
  HUB_CARD_SHADOW,
  HUB_CARD_RADIUS,
  HUB_TINT,
  scoreWording,
} from './theme';

/**
 * Ranked provider row in the bestnadtreatments.com design: a light header bar
 * with a black rank chip, then logo / headline + bullets / score at 25 / 50 / 25
 * on desktop with a full-width CTA underneath, and a compact two-column body on
 * phones.
 */

function CheckMark() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke={HUB_CTA}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 5 }}
      aria-hidden="true"
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

/** Small teal check in a tinted circle, for the compact phone body. */
function CircleCheck() {
  return (
    <svg className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-teal" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.12" />
      <path d="m4.8 8.2 2.1 2.1 4.3-4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function HubLogo({ provider, height = 40, left = false }: { provider: EdHubProvider; height?: number; left?: boolean }) {
  if (!provider.logoUrl) {
    return <span style={{ color: HUB_ACCENT, fontSize: 18, fontWeight: 700 }}>{provider.logoText}</span>;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={provider.logoUrl}
      alt={`${provider.name} logo`}
      width={150}
      height={height}
      style={{ height, maxWidth: '100%', objectFit: 'contain', ...(left && { objectPosition: 'left center' }) }}
      loading={provider.rank <= 3 ? 'eager' : 'lazy'}
    />
  );
}

/**
 * The #1 pick's logo flips on hover to reveal the product vial, carried over
 * from the original EdProviderRow. Scoped to rank 1 (not a slug), so it always
 * follows whichever provider holds the top spot. Needs a `group` ancestor.
 */
function FlipLogo({ provider }: { provider: EdHubProvider }) {
  const boxSize = 100;
  return (
    <div className="[perspective:800px]" style={{ height: boxSize, width: boxSize, maxWidth: '100%' }}>
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]">
          <HubLogo provider={provider} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={TOP_PICK_VIAL_IMAGE_URL}
            alt={`${provider.name} product`}
            style={{ height: '100%', width: '100%', objectFit: 'contain' }}
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}

function RatingBlock({ provider }: { provider: EdHubProvider }) {
  return (
    <div className="flex flex-col items-center" style={{ rowGap: 2, marginBottom: 4 }}>
      <span className="text-[24px] md:text-[30px]" style={{ fontWeight: 700, color: '#000', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
        {provider.rating.toFixed(2)}
      </span>
      <p style={{ fontSize: 18, fontWeight: 600, color: HUB_ACCENT, margin: 0, lineHeight: 1.2 }}>{scoreWording(provider.rating)}</p>
      <HubStars rating={provider.rating} />
    </div>
  );
}

export function HubVisitButton({
  provider,
  vertical,
  placement,
}: {
  provider: EdHubProvider;
  vertical: string;
  placement: HubPlacement;
}) {
  return (
    <HubLink
      provider={provider}
      vertical={vertical}
      placement={placement}
      className="flex w-full items-center justify-center transition-opacity hover:opacity-90"
      style={{ borderRadius: 4, height: 36, fontSize: 15, fontWeight: 600, lineHeight: 1, backgroundColor: HUB_CTA, color: '#fff' }}
    >
      Visit Site
    </HubLink>
  );
}

/**
 * Phone body under the header bar: logo, headline and bullets on the left; the
 * score column behind a 1px rule on the right; a full-width CTA; and an
 * editor's-pick strip on #1.
 */
function CompactBody({ provider, vertical, placement }: { provider: EdHubProvider; vertical: string; placement: HubPlacement }) {
  const reviewed = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  return (
    <div className="md:hidden">
      <div className="flex gap-4 px-3 pt-3">
        <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2">
          <div className="flex h-11 w-full max-w-[144px] items-center">
            <HubLogo provider={provider} height={34} left />
          </div>
          <p className="text-[17px] font-bold leading-6 text-ink">{provider.tagline}</p>
          <ul className="flex flex-col gap-1">
            {provider.differentiators.slice(0, 2).map((point) => (
              <li key={point} className="flex text-[15px] leading-5 text-ink">
                <CircleCheck />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-[36%] shrink-0 flex-col items-center justify-center gap-1 border-l border-border pl-3">
          <span className="font-serif text-[30px] font-semibold leading-8 text-ink">{provider.rating.toFixed(2)}</span>
          <span className="text-[14px] font-bold leading-4 text-copper-dark">{scoreWording(provider.rating)}</span>
          <HubStars rating={provider.rating} />
          <span className="mt-1 text-[12px] leading-[14px] text-inkMuted">Editorial score</span>
        </div>
      </div>

      <div className="relative z-[2] px-3 pb-3 pt-3">
        <HubLink
          provider={provider}
          vertical={vertical}
          placement={placement}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-[10px] text-[15px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: HUB_CTA }}
        >
          Visit Site
          <ArrowIcon />
        </HubLink>
      </div>

      {provider.rank === 1 && (
        <div className="flex items-center justify-center gap-1.5 border-t border-border bg-sand p-2 text-center text-[13px] leading-4 text-ink">
          <svg className="h-4 w-4 shrink-0 text-teal" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 2.5l2.1 1.6 2.6-.3 1 2.4 2.4 1-.3 2.6 1.6 2.1-1.6 2.1.3 2.6-2.4 1-1 2.4-2.6-.3L12 21.5l-2.1-1.6-2.6.3-1-2.4-2.4-1 .3-2.6L2.6 12l1.6-2.1-.3-2.6 2.4-1 1-2.4 2.6.3z"
              fill="currentColor"
            />
            <path d="m8.5 12.2 2.3 2.3 4.7-4.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>
            <strong className="font-bold">Editor&apos;s pick</strong> · Reviewed {reviewed}
          </span>
        </div>
      )}
    </div>
  );
}

export function HubProviderRow({
  provider,
  vertical,
  /** A restatement of a row already on the page: drops the anchor id. */
  duplicate = false,
  /** The card as it repeats inside long-form copy: a plain "Featured Provider" bar. */
  guideCard = false,
  /** Badge on the #1 header bar. `null` hides it. */
  topBadge = 'Best Overall',
  /**
   * #1 logo flips to the product vial on hover. The shot is an injection vial,
   * so pages about another format (nasal spray, patch) turn it off.
   */
  vialFlip = true,
}: {
  provider: EdHubProvider;
  vertical: string;
  duplicate?: boolean;
  guideCard?: boolean;
  topBadge?: string | null;
  vialFlip?: boolean;
}) {
  const placement: HubPlacement = duplicate || guideCard ? 'list' : 'card';
  return (
    <div
      {...(duplicate || guideCard ? {} : { id: provider.slug })}
      className={`group relative z-[1] scroll-mt-24 bg-white transition-shadow duration-200 hover:shadow-[3px_3px_22px_rgba(0,0,0,0.55)] md:grid md:grid-cols-[3fr_1fr]${guideCard ? ' my-6' : ''}`}
      style={{ borderRadius: HUB_CARD_RADIUS, overflow: 'hidden', boxShadow: HUB_CARD_SHADOW }}
    >
      <HubCardOverlay provider={provider} vertical={vertical} placement={placement} />

      <div
        className={`flex items-center${guideCard ? ' justify-center' : ''} md:col-span-2`}
        style={{ backgroundColor: provider.rank === 1 || guideCard ? HUB_CARD_HEADER_TOP : HUB_CARD_HEADER, height: 32 }}
      >
        {guideCard ? (
          <p className="m-0" style={{ color: HUB_HEADING, fontSize: 14, fontWeight: 600, letterSpacing: '0.02em' }}>
            Featured Provider
          </p>
        ) : (
          <>
            <p className="m-0 tabular-nums" style={{ backgroundColor: HUB_RANK_CHIP, color: '#fff', fontSize: 16, padding: '4px 16px', lineHeight: 1.5 }}>
              {String(provider.rank).padStart(2, '0')}
            </p>
            <p className="m-0 truncate" style={{ color: HUB_HEADING, fontSize: 16, fontWeight: 600, padding: '0 16px' }}>
              {provider.name}
            </p>
            {provider.rank === 1 && topBadge && (
              <span
                className="ml-auto mr-4 hidden rounded-sm px-2 py-0.5 text-[12px] font-bold uppercase tracking-wide sm:inline"
                style={{ backgroundColor: HUB_CTA, color: '#fff' }}
              >
                {topBadge}
              </span>
            )}
          </>
        )}
      </div>

      <CompactBody provider={provider} vertical={vertical} placement={placement} />

      {/* Tablet and desktop: logo / headline + bullets / score at 25 / 50 / 25, CTA underneath. */}
      <div className="hidden md:contents">
        <div className="flex items-center justify-center md:col-start-1 md:row-start-2 md:w-1/3" style={{ padding: 16 }}>
          {vialFlip && provider.rank === 1 && provider.logoUrl ? <FlipLogo provider={provider} /> : <HubLogo provider={provider} />}
        </div>

        <div className="flex flex-col items-center justify-center md:col-start-2 md:row-start-2" style={{ padding: '0 16px' }}>
          <RatingBlock provider={provider} />
          <span style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
            {provider.userVotes.toLocaleString('en-US')} user votes
          </span>
        </div>

        <div className="md:col-start-1 md:row-start-2 md:ml-[33.333%]" style={{ padding: 16, minWidth: 0 }}>
          <p style={{ color: '#000', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{provider.tagline}</p>
          <ul className="m-0 list-none p-0">
            {provider.differentiators.slice(0, 3).map((point) => (
              <li key={point} className="flex items-start" style={{ fontSize: 16, color: HUB_TEXT, marginBottom: 8, gap: 16, lineHeight: 1.4 }}>
                <CheckMark />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-[2] px-4 pb-4 md:col-span-2 md:row-start-3">
          <HubVisitButton provider={provider} vertical={vertical} placement={placement} />
        </div>
      </div>
    </div>
  );
}

/** "Best Overall Pick": the #1 row restated below the list. */
export function HubBestOverallPick({
  provider,
  vertical,
  heading = 'Best Overall Pick',
  topBadge,
  vialFlip = true,
}: {
  provider: EdHubProvider;
  vertical: string;
  heading?: string;
  topBadge?: string | null;
  vialFlip?: boolean;
}) {
  return (
    <section aria-label={heading} className="mt-10">
      <h2 className="text-center" style={{ fontSize: 22, fontWeight: 600, color: HUB_HEADING, marginBottom: 12 }}>
        {heading}
      </h2>
      <HubProviderRow provider={provider} vertical={vertical} duplicate topBadge={topBadge} vialFlip={vialFlip} />
    </section>
  );
}

/** Interstitial banner between ranked rows, restating the #1 pick's own offer. */
export function HubOfferBanner({ provider, vertical }: { provider: EdHubProvider; vertical: string }) {
  return (
    <div
      className="relative flex flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:gap-5"
      // The tint is translucent, so it is layered over white to stay light on the dark band.
      style={{ boxShadow: HUB_CARD_SHADOW, borderRadius: HUB_CARD_RADIUS, background: `linear-gradient(${HUB_TINT}, ${HUB_TINT}), #fff` }}
    >
      <HubCardOverlay provider={provider} vertical={vertical} placement="list" />
      <div className="flex flex-none items-center" style={{ height: 32 }}>
        <HubLogo provider={provider} height={28} />
      </div>
      <div className="min-w-0 flex-1 text-center">
        <p className="text-[15px] leading-tight sm:text-[20px] sm:leading-[1.2]" style={{ fontWeight: 700, color: '#000', margin: 0 }}>
          {provider.tagline}
        </p>
        <p className="text-[13px] sm:text-[15px]" style={{ color: HUB_TEXT, margin: '2px 0 0' }}>
          Our #{provider.rank} pick · {provider.bestFor}
        </p>
      </div>
      <div className="relative z-[2] w-full flex-none sm:w-[197px]">
        <HubVisitButton provider={provider} vertical={vertical} placement="list" />
      </div>
    </div>
  );
}
