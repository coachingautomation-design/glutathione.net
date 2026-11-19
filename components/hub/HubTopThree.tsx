import type { EdHubProvider } from '@/components/ed/types';
import { HubStars } from './HubStars';
import { HubCardOverlay, HubLink } from './HubLink';
import { HUB_CTA, HUB_ACCENT } from './theme';

/** Visual column per position from `sm` up: first centre, second left, third right. */
const COLUMN_ORDER = ['sm:order-2', 'sm:order-1', 'sm:order-3'];

/**
 * Top 3 flashcard strip, pulled up over the hero. Logo and price hook on the
 * left, score and CTA on the right. The first pick sits in the centre column via
 * CSS order (DOM order stays 1, 2, 3), bordered in the CTA colour and lifted so
 * the row reads as a podium.
 */
export function HubTopThree({
  providers,
  vertical,
  topBadge = '#1 Best Overall',
}: {
  providers: EdHubProvider[];
  vertical: string;
  topBadge?: string | null;
}) {
  return (
    <div className="grid items-stretch gap-3 sm:grid-cols-3 sm:gap-4">
      {providers.slice(0, 3).map((provider, index) => {
        const isTop = index === 0;
        return (
          <div
            key={provider.slug}
            className={`relative flex flex-col rounded-2xl bg-white transition-shadow duration-200 ${COLUMN_ORDER[index]} ${
              isTop
                ? 'p-5 shadow-[0_12px_30px_rgba(176,84,42,0.22)] hover:shadow-[0_18px_40px_rgba(176,84,42,0.34)] sm:-translate-y-1.5'
                : 'p-4 shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_26px_rgba(0,0,0,0.2)]'
            }`}
            style={{ border: isTop ? `2px solid ${HUB_CTA}` : '1px solid #e5e7eb' }}
          >
            <HubCardOverlay provider={provider} vertical={vertical} placement="hero" className="rounded-2xl" />

            {isTop && topBadge && (
              <span
                className="absolute -top-3 left-4 z-[2] rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white"
                style={{ backgroundColor: HUB_CTA }}
              >
                {topBadge}
              </span>
            )}

            <div className="flex flex-1 items-start justify-between gap-4">
              <div className="flex min-w-0 flex-1 flex-col">
                <div className={`flex items-center ${isTop ? 'h-9' : 'h-7'}`}>
                  {provider.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={provider.logoUrl}
                      alt={`${provider.name} logo`}
                      width={150}
                      height={isTop ? 36 : 28}
                      style={{ height: isTop ? 36 : 28, maxWidth: '100%', objectFit: 'contain', objectPosition: 'left center' }}
                      loading="eager"
                    />
                  ) : (
                    <span className="truncate text-base font-bold" style={{ color: HUB_ACCENT }}>
                      {provider.name}
                    </span>
                  )}
                </div>
                <p className="mt-2 line-clamp-2 text-[15px] font-bold leading-snug" style={{ color: '#000' }} title={provider.tagline}>
                  {provider.bestFor}
                </p>
              </div>

              <div className="flex flex-none flex-col items-end gap-2">
                <div className="flex items-center gap-1.5">
                  <HubStars rating={provider.rating} size={13} />
                  <span className="tabular-nums leading-none" style={{ fontSize: isTop ? 22 : 20, fontWeight: 700, color: '#000' }}>
                    {provider.rating.toFixed(2)}
                  </span>
                </div>
                <HubLink
                  provider={provider}
                  vertical={vertical}
                  placement="hero"
                  className="relative z-[2] inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: HUB_CTA }}
                >
                  Visit Site
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </HubLink>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
