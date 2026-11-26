'use client';

import { useState } from 'react';
import type { EdHubProvider } from '@/components/ed/types';
import SmartLink from '@/components/SmartLink';
import { HubStars } from './HubStars';
import { HubCardOverlay, HubLink, type HubPlacement } from './HubLink';
import { HUB_BANNER_GRADIENT, HUB_CTA, HUB_SCORE, scoreWording } from './theme';

/**
 * Ranked provider card in the bestdebtoptions.com layout: badge chip, rank and
 * logo | name and check-mark highlights | boxed score, CTA and "On X's Website",
 * then a key-facts strip with an editorial-summary toggle. Blue-and-red palette.
 * The whole card is one affiliate link (an overlay), with the CTA and toggle
 * above it.
 */

function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Check({ className = 'mt-0.5 h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={`${className} flex-shrink-0 text-green-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function HubLogo({ provider, height = 40, left = false }: { provider: EdHubProvider; height?: number; left?: boolean }) {
  if (!provider.logoUrl) {
    return <span className="text-center text-sm font-bold leading-tight text-gray-800">{provider.logoText}</span>;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={provider.logoUrl}
      alt={`${provider.name} logo`}
      width={150}
      height={height}
      className="max-h-full max-w-full object-contain"
      style={left ? { objectPosition: 'left center' } : undefined}
      loading={provider.rank <= 3 ? 'eager' : 'lazy'}
    />
  );
}

/** Boxed score: blue-and-red number tile, then the wording and stars in one bordered box. */
export function HubRating({ rating }: { rating: number }) {
  return (
    <div className="flex w-full items-stretch border border-gray-200 bg-white">
      <span
        className="flex items-center justify-center px-2.5 py-1.5 text-xl font-bold leading-none text-white"
        style={{ background: HUB_SCORE }}
      >
        {rating.toFixed(1)}
      </span>
      <div className="flex flex-col justify-center gap-0.5 px-2 py-1">
        <span className="text-[10px] font-bold uppercase leading-none tracking-wider text-gray-800">{scoreWording(rating)}</span>
        <HubStars rating={rating} size={12} />
      </div>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap bg-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
      ✓ {label}
    </span>
  );
}

export function HubVisitButton({
  provider,
  vertical,
  placement,
  className = '',
}: {
  provider: EdHubProvider;
  vertical: string;
  placement: HubPlacement;
  className?: string;
}) {
  return (
    <HubLink
      provider={provider}
      vertical={vertical}
      placement={placement}
      className={`relative z-[2] flex w-full items-center justify-center gap-1.5 px-4 py-2 text-sm font-bold text-white transition-all duration-150 hover:brightness-110 active:scale-[0.98] ${className}`}
      style={{ backgroundColor: HUB_CTA }}
    >
      <span className="whitespace-nowrap">Visit Site</span>
      <ArrowIcon />
    </HubLink>
  );
}

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((h) => (
        <li key={h} className="flex items-start gap-1.5 text-[13px] leading-snug text-gray-800">
          <Check />
          <span>{h}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Featured top-pick banner (bestdebtoptions.com's TopPickBanner) — used for the
 * card as it repeats inside long-form copy and as the interstitial between
 * ranked rows. Labeled as a featured partner.
 */
export function HubTopPickBanner({
  provider,
  vertical,
  headline,
  className = 'my-8',
}: {
  provider: EdHubProvider;
  vertical: string;
  headline?: string;
  className?: string;
}) {
  const text = headline ?? provider.tagline;
  return (
    <aside aria-label={`Featured partner: ${provider.name}`} className={className}>
      <HubLink
        provider={provider}
        vertical={vertical}
        placement="list"
        label={`${text}: visit ${provider.name}`}
        className="group flex flex-col items-stretch overflow-hidden text-white no-underline transition-shadow hover:shadow-lg active:scale-[0.995] sm:flex-row"
        style={{ background: HUB_BANNER_GRADIENT }}
      >
        <span className="flex h-20 flex-shrink-0 items-center justify-center bg-white/95 px-5 py-4 sm:h-auto sm:w-40">
          <HubLogo provider={provider} height={48} />
        </span>
        <span className="block min-w-0 flex-1 px-5 py-4">
          <span className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white/75">
            Our #{provider.rank} pick · {provider.name}
          </span>
          <span className="mb-2 block font-merri text-lg font-bold leading-snug text-white sm:text-xl">{text}</span>
          <span className="flex items-center gap-1.5 text-sm">
            <HubStars rating={provider.rating} size={16} />
            <span className="ml-1 font-semibold">{provider.rating.toFixed(1)}/10</span>
            <span className="text-white/70">· {scoreWording(provider.rating).toLowerCase()}</span>
          </span>
        </span>
        <span className="flex flex-shrink-0 flex-col justify-center gap-1.5 bg-white/10 px-5 py-4 sm:w-56">
          <span
            className="flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white transition-all duration-150 group-hover:brightness-110"
            style={{ background: HUB_CTA }}
          >
            <span className="whitespace-nowrap">Visit Site</span>
            <ArrowIcon />
          </span>
          <span className="block text-center text-[11px] leading-tight text-white/75">On {provider.name}&apos;s Website</span>
        </span>
      </HubLink>
      <p className="mt-1 text-[11px] text-gray-600">
        Featured partner. We may be paid if you sign up, which doesn&apos;t affect our ratings.{' '}
        <SmartLink href="/advertising-disclosure/" className="underline hover:text-black">
          How we rate
        </SmartLink>
      </p>
    </aside>
  );
}

export function HubProviderRow({
  provider,
  vertical,
  /** A restatement of a row already on the page: drops the anchor id. */
  duplicate = false,
  /** The card as it repeats inside long-form copy: renders as the featured-pick banner. */
  guideCard = false,
  /** Badge on the #1 card. `null` hides it. */
  topBadge = 'Best Overall',
  // Kept for API compatibility with existing pages; the flip is not part of this layout.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  vialFlip = true,
  index = provider.rank - 1,
}: {
  provider: EdHubProvider;
  vertical: string;
  duplicate?: boolean;
  guideCard?: boolean;
  topBadge?: string | null;
  vialFlip?: boolean;
  index?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  if (guideCard) return <HubTopPickBanner provider={provider} vertical={vertical} />;

  const placement: HubPlacement = duplicate ? 'list' : 'card';
  const summaryId = `summary-${provider.slug}${duplicate ? '-dup' : ''}`;
  const badge = provider.rank === 1 ? topBadge : null;
  const highlights = provider.differentiators.slice(0, 3);

  return (
    <div
      {...(duplicate ? {} : { id: provider.slug })}
      className={`provider-card fade-in-up stagger-${Math.min(index + 1, 5)} relative scroll-mt-24 overflow-hidden`}
    >
      {badge && (
        <div className="leading-none">
          <Badge label={badge} />
        </div>
      )}

      <div className="relative">
        <HubCardOverlay provider={provider} vertical={vertical} placement={placement} />

        {/* Desktop (sm+): rank+logo | name+bullets | score+CTA */}
        <div className="pointer-events-none hidden items-center gap-5 px-4 py-3.5 sm:flex">
          <div className="flex flex-shrink-0 items-center gap-3">
            <span className="w-5 text-center text-2xl font-bold leading-none text-black">{provider.rank}</span>
            <div className="flex h-11 w-24 items-center justify-center">
              <HubLogo provider={provider} height={44} />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="mb-1.5 text-base font-bold leading-snug text-black">{provider.name}</h3>
            <Highlights items={highlights} />
          </div>

          <div className="pointer-events-auto flex w-44 flex-shrink-0 flex-col items-stretch gap-1.5">
            <HubRating rating={provider.rating} />
            <HubVisitButton provider={provider} vertical={vertical} placement={placement} />
            <p className="text-center text-[10px] leading-tight text-gray-500">On {provider.name}&apos;s Website</p>
          </div>
        </div>

        {/* Mobile (<sm) */}
        <div className="pointer-events-none px-4 pb-3 pt-3 sm:hidden">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold leading-none text-black">{provider.rank}</span>
            <div className="flex h-9 w-20 flex-shrink-0 items-center justify-center">
              <HubLogo provider={provider} height={36} />
            </div>
            <div className="ml-auto flex-shrink-0">
              <HubRating rating={provider.rating} />
            </div>
          </div>
          <h3 className="sr-only">{provider.name}</h3>
          <div className="mt-2.5">
            <Highlights items={highlights} />
          </div>
          <div className="pointer-events-auto">
            <HubVisitButton provider={provider} vertical={vertical} placement={placement} className="mt-3 py-2.5" />
          </div>
        </div>
      </div>

      {/* Footer strip: key facts + summary toggle */}
      <div className="relative z-[2] flex flex-col justify-between gap-1.5 border-t border-gray-100 bg-gray-50/60 px-4 py-2 sm:flex-row sm:items-center">
        <dl className="flex flex-wrap items-center gap-x-4 gap-y-0.5 text-xs">
          <div className="flex min-w-0 gap-1">
            <dt className="flex-shrink-0 text-gray-500">Best for:</dt>
            <dd className="font-semibold text-gray-900">{provider.bestFor}</dd>
          </div>
          <div className="flex gap-1">
            <dt className="text-gray-500">User votes:</dt>
            <dd className="font-semibold text-gray-900">{provider.userVotes.toLocaleString('en-US')}</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1 self-start whitespace-nowrap text-xs font-semibold text-brand hover:underline sm:self-auto"
          aria-expanded={expanded}
          aria-controls={summaryId}
        >
          {expanded ? 'Hide' : 'Editorial'} summary
          <svg className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div id={summaryId} className="relative z-[2] grid gap-4 border-t border-gray-100 bg-gray-50 px-4 pb-4 pt-3 sm:grid-cols-2">
          <div>
            <p className="text-sm leading-relaxed text-gray-700">{provider.tagline}</p>
            {provider.reviewPath && (
              <SmartLink href={provider.reviewPath} className="mt-2 inline-block text-xs font-semibold text-brand hover:underline">
                Read our full {provider.name} review →
              </SmartLink>
            )}
          </div>
          <div>
            <h4 className="mb-1.5 font-sans text-xs font-bold uppercase tracking-wide text-green-700">Why we picked it</h4>
            <ul className="space-y-1">
              {provider.differentiators.map((d) => (
                <li key={d} className="flex items-start gap-1.5 text-[13px] text-gray-800">
                  <Check />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

/** Interstitial between ranked rows: the featured top-pick banner. */
export function HubOfferBanner({ provider, vertical }: { provider: EdHubProvider; vertical: string }) {
  return <HubTopPickBanner provider={provider} vertical={vertical} headline={provider.bestFor} className="" />;
}
