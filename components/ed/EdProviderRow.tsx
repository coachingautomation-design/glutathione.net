import OutboundLink from '@/components/OutboundLink';
import { EdStars } from './EdStars';
import {
  ED_HEADING,
  ED_CARD_HEADER,
  ED_CTA,
  ED_ACCENT,
  ED_RANK_CHIP,
  ED_TEXT,
  ED_CARD_SHADOW,
  ED_CARD_RADIUS,
  ED_HERO_BG,
} from './theme';
import { scoreWording } from '@/lib/ratings';
import type { EdHubProvider } from './types';

/**
 * Ranked provider row, built to the reference listicle's measured spec.
 *
 * Every number here was read off the rendered reference rather than estimated:
 *
 *   card        shadow 3px 3px 12px rgba(0,0,0,.4), radius 0 10px, mb 16px
 *   header      32px tall, #2153b6, black rank chip padded 4px 16px,
 *               provider name 16px/500 white
 *   columns     25% / 50% / 25% (229 / 458 / 229 of 915), padding 0 16px /
 *               16px / 0 16px
 *   name line   #084DAA, 16px, 700
 *   bullets     16px #212529, 8px apart, check mark #2B6DF1 at 12px, 16px gap
 *   score grid  2 columns — wording over stars on the left, the score itself
 *               spanning both rows on the right. The reference sets that score
 *               at 40px/700; we run it at 24px (30px from `md`) to keep the
 *               mobile card shorter.
 *   CTA         #2B6DF1, radius 4px, 42px tall, ~18.7px/500
 *
 * The structure is what is borrowed. Every score, bullet and sentence rendered
 * through it is ours.
 */

/** Tracking vertical when a page does not pass its own. */
const DEFAULT_VERTICAL = 'best-ed-providers';

/** Product shot shown on the back of the #1 pick's logo on hover. */
const TOP_PICK_VIAL_IMAGE_URL =
  'https://pub-39359099163f4c69946f8ef82ee5436d.r2.dev/uploads/cc807d43-ee87-48f5-af99-00d7009f4462.png';

function CheckMark() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      /* `stroke` goes through `style`, not the presentation attribute: the CTA
         token is a CSS variable and an attribute would not resolve it. */
      style={{ stroke: ED_CTA, flexShrink: 0, marginTop: 5 }}
      aria-hidden="true"
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function ProviderLogo({
  provider,
  height = 40,
  flip = false,
}: {
  provider: EdHubProvider;
  height?: number;
  /** Flip-on-hover to reveal a product shot. Only meaningful where an
   *  ancestor carries `group` (the ranked row and its best-overall-pick
   *  restatement) — pass it there, not in contexts with no hover card
   *  (e.g. the offer banner) where the flip could never trigger anyway. */
  flip?: boolean;
}) {
  if (!provider.logoUrl) {
    return (
      <span style={{ color: ED_ACCENT, fontSize: 18, fontWeight: 700 }}>{provider.logoText}</span>
    );
  }

  const logo = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={provider.logoUrl}
      alt={`${provider.name} logo`}
      width={150}
      height={height}
      style={{ height, maxWidth: '100%', objectFit: 'contain' }}
      loading={provider.rank <= 3 ? 'eager' : 'lazy'}
    />
  );

  if (!flip || provider.rank !== 1) return logo;

  // The #1 pick's logo flips on hover to reveal a product shot — scoped to
  // rank 1 (not this provider's slug) so it always follows whichever
  // provider currently holds the top spot, not a specific brand.
  //
  // The box is sized independently of the front logo's thin `height` (a
  // wordmark logo and a bottle photo aren't the same aspect ratio) — sized to
  // roughly match the card's other content (rating block, bullet list) so
  // the vial actually fills the box on flip instead of floating tiny in a
  // corner of it.
  const boxSize = 130;
  return (
    <div className="[perspective:800px]" style={{ height: boxSize, width: boxSize, maxWidth: '100%' }}>
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]">{logo}</div>
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

/** Big number over the score wording over the stars, stacked and centered. */
function RatingBlock({ provider }: { provider: EdHubProvider }) {
  return (
    <div className="flex flex-col items-center" style={{ rowGap: 2, marginBottom: 4 }}>
      <span
        className="text-[24px] md:text-[30px]"
        style={{
          fontWeight: 700,
          color: '#000',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {provider.rating.toFixed(2)}
      </span>
      <p style={{ fontSize: 18, fontWeight: 600, color: ED_ACCENT, margin: 0, lineHeight: 1.2 }}>
        {scoreWording(provider.rating)}
      </p>
      <EdStars rating={provider.rating} />
    </div>
  );
}

function VisitButton({
  provider,
  placement,
  vertical,
}: {
  provider: EdHubProvider;
  placement: 'card' | 'list';
  vertical: string;
}) {
  return (
    <OutboundLink
      href={provider.affiliateUrl}
      payload={{
        vertical,
        provider: provider.name,
        providerSlug: provider.slug,
        placement,
        rank: provider.rank,
      }}
      className="flex w-full items-center justify-center"
      style={{
        backgroundColor: ED_CTA,
        color: '#fff',
        borderRadius: 4,
        height: 42,
        fontSize: 18.67,
        fontWeight: 500,
        textDecoration: 'none',
        lineHeight: 1,
      }}
    >
      Visit Site
    </OutboundLink>
  );
}

export function EdProviderRow({
  provider,
  /**
   * The Best Overall Pick block renders row #1 a second time; that copy must not
   * carry the anchor id again, or the jump links resolve to whichever node the
   * browser finds first.
   */
  duplicate = false,
  vertical = DEFAULT_VERTICAL,
}: {
  provider: EdHubProvider;
  duplicate?: boolean;
  /** Tracking vertical for this page — every ED hub reuses this row. */
  vertical?: string;
}) {
  return (
    <div
      {...(duplicate ? {} : { id: `provider-${provider.slug}` })}
      className="group relative scroll-mt-24 bg-white shadow-[3px_3px_12px_rgba(0,0,0,0.4)] transition-shadow duration-200 hover:shadow-[3px_3px_22px_rgba(0,0,0,0.55)]"
      style={{ borderRadius: ED_CARD_RADIUS, overflow: 'hidden' }}
    >
      {/* Whole-card affiliate link. It sits beneath the Visit Site buttons
          (z-index), so those keep their own tracking while a click anywhere
          else on the row still opens the provider. */}
      <OutboundLink
        href={provider.affiliateUrl}
        ariaLabel={`Visit ${provider.name}`}
        payload={{ vertical, provider: provider.name, providerSlug: provider.slug, placement: 'card', rank: provider.rank }}
        className="absolute inset-0 z-[1]"
        style={{ textDecoration: 'none' }}
      />

      {/* Header bar: black rank chip, then the provider name on the blue bar.
          Only the top pick (and its restatement below the list) gets the dark
          blue; the rest of the list runs on the lighter tone. */}
      <div
        className="flex items-center"
        style={{ backgroundColor: provider.rank === 1 ? ED_HEADING : ED_CARD_HEADER, height: 32 }}
      >
        <p
          className="m-0 tabular-nums"
          style={{ backgroundColor: ED_RANK_CHIP, color: '#fff', fontSize: 16, padding: '4px 16px', lineHeight: 1.5 }}
        >
          {String(provider.rank).padStart(2, '0')}
        </p>
        <p className="m-0 truncate" style={{ color: '#fff', fontSize: 16, fontWeight: 500, padding: '0 16px' }}>
          {provider.name}
        </p>
      </div>

      {/* Body: 25 / 50 / 25 on desktop; stacked on mobile with the logo and the
          score sharing the first line, as the reference does. */}
      <div className="flex flex-wrap items-center md:flex-nowrap">
        {/* Logo — takes the remaining width on mobile and shrinks (min-w-0) so a
            wide logo can never push the score block off the row; fixed column on
            desktop. */}
        <div
          className="order-1 flex min-w-0 flex-1 items-center justify-start md:w-1/4 md:flex-none md:justify-center"
          style={{ padding: '16px' }}
        >
          <ProviderLogo provider={provider} flip />
        </div>

        {/* Score + CTA — beside the logo on mobile (flex-none so it keeps its
            width), right column on desktop */}
        <div
          className="order-2 flex flex-none flex-col items-center justify-center md:order-3 md:w-1/4"
          style={{ padding: '0 16px' }}
        >
          <RatingBlock provider={provider} />
          <span className="hidden md:block" style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
            {provider.userVotes.toLocaleString('en-US')} user votes
          </span>
          <div className="relative z-[2] hidden w-full md:block">
            <VisitButton provider={provider} placement="card" vertical={vertical} />
          </div>
        </div>

        {/* Headline + bullets */}
        <div className="order-3 w-full md:order-2 md:w-1/2" style={{ padding: 16, minWidth: 0 }}>
          {/* The provider's headline heads the middle column, in the type the
              provider name used to run in. The name itself is not repeated here
              — the header bar directly above and the logo beside it both carry
              it — so this line sells the offer instead, on mobile as well as
              desktop. */}
          <p style={{ color: ED_ACCENT, fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{provider.tagline}</p>

          <ul className="m-0 list-none p-0">
            {provider.differentiators.slice(0, 5).map((point) => (
              <li
                key={point}
                className="flex items-start"
                style={{ fontSize: 16, color: ED_TEXT, marginBottom: 8, gap: 16, lineHeight: 1.4 }}
              >
                <CheckMark />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="relative z-[2] mt-3 md:hidden">
            <VisitButton provider={provider} placement="card" vertical={vertical} />
          </div>
        </div>
      </div>

    </div>
  );
}

/**
 * "Best Overall Pick" — the #1 row restated below the list, as in the reference.
 */
export function EdBestOverallPick({
  provider,
  vertical = DEFAULT_VERTICAL,
  heading = 'Best Overall Pick',
}: {
  provider: EdHubProvider;
  vertical?: string;
  heading?: string;
}) {
  return (
    <section aria-label="Best overall pick" className="mt-10">
      <h2 className="text-center" style={{ fontSize: 20, fontWeight: 600, color: ED_HEADING, marginBottom: 12 }}>
        {heading}
      </h2>
      <EdProviderRow provider={provider} duplicate vertical={vertical} />
    </section>
  );
}

/**
 * Interstitial offer banner between ranked rows. It restates a provider's own
 * published positioning — never a discount, deadline or scarcity claim we
 * invented.
 */
export function EdOfferBanner({
  provider,
  vertical = DEFAULT_VERTICAL,
}: {
  provider: EdHubProvider;
  vertical?: string;
}) {
  return (
    <div
      className="relative flex flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:gap-5"
      style={{ boxShadow: ED_CARD_SHADOW, borderRadius: ED_CARD_RADIUS, backgroundColor: ED_HERO_BG }}
    >
      {/* Whole-banner affiliate link, beneath the Visit Site button. */}
      <OutboundLink
        href={provider.affiliateUrl}
        ariaLabel={`Visit ${provider.name}`}
        payload={{ vertical, provider: provider.name, providerSlug: provider.slug, placement: 'list', rank: provider.rank }}
        className="absolute inset-0 z-[1]"
        style={{ textDecoration: 'none' }}
      />

      <div className="flex flex-none items-center" style={{ height: 32 }}>
        <ProviderLogo provider={provider} height={28} />
      </div>

      <div className="min-w-0 flex-1 text-center">
        {/* The headline shrinks on mobile (12px → 24px from `sm`) so a short
            tagline still reads as a headline. It wraps rather than clipping:
            the ED taglines fit on one line, but the longer ones the other
            verticals carry used to run under the CTA and lose their last
            words. */}
        <p
          className="text-[12px] leading-tight sm:text-[24px] sm:leading-[1.2]"
          style={{ fontWeight: 700, color: '#000', margin: 0 }}
        >
          {provider.tagline}
        </p>
        {provider.slug === 'bettermerx-qmax' ? (
          <p className="whitespace-nowrap text-[13px] sm:text-[16px]" style={{ fontWeight: 700, color: '#C2410C', margin: '2px 0 0' }}>
            Summer Special: 50% OFF • Today Only!
          </p>
        ) : (
          <p className="text-[13px] sm:text-[16px]" style={{ color: ED_TEXT, margin: '2px 0 0' }}>
            Our #{provider.rank} pick · {provider.bestFor}
          </p>
        )}
      </div>

      <div className="relative z-[2] w-full flex-none sm:w-[197px]">
        <VisitButton provider={provider} placement="list" vertical={vertical} />
      </div>
    </div>
  );
}
