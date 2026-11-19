'use client';

import { useEffect, useState } from 'react';
import type { EdHubProvider } from '@/components/ed/types';
import { HubLink } from './HubLink';
import { scoreWording } from './theme';

const DISMISS_KEY = 'stickyOfferDismissed';

/**
 * Bottom sticky offer bar for the page's #1 pick: shown once the hero has
 * scrolled out of view, dismissible for the session.
 */
export function HubStickyCta({ provider, vertical }: { provider: EdHubProvider; vertical: string }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === 'true') {
        setDismissed(true);
        return;
      }
    } catch {
      /* storage unavailable */
    }
    const hero = document.getElementById('hero-section');
    if (!hero) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div
      role="region"
      aria-label="Top offer"
      className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.12)] md:rounded-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-content items-center gap-2 px-3 py-2 sm:gap-4 md:gap-6 md:px-6 md:py-3">
        <div className="min-w-0 flex-1 md:flex md:items-center md:gap-6">
          {provider.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={provider.logoUrl} alt={`${provider.name} logo`} className="h-[22px] w-20 object-contain object-left md:w-[120px]" loading="lazy" />
          ) : (
            <span className="text-[14px] font-bold text-ink">{provider.name}</span>
          )}
          <p className="line-clamp-2 text-[13px] font-bold leading-snug text-ink md:line-clamp-none md:truncate md:text-[16px]">
            {provider.tagline}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-0.5 md:flex-row md:gap-2">
          <div className="inline-flex items-center justify-center rounded-[5px] bg-copper-aa px-2 py-0.5 text-[16px] font-bold text-white md:bg-transparent md:px-0 md:py-0 md:text-[26px] md:font-extrabold md:text-ink">
            {provider.rating.toFixed(2)}
          </div>
          <span className="hidden text-[12px] font-semibold text-inkMuted md:block">{scoreWording(provider.rating)}</span>
        </div>
        <HubLink
          provider={provider}
          vertical={vertical}
          placement="sticky"
          className="shrink-0 whitespace-nowrap rounded-lg bg-copper-aa px-4 py-2 text-center text-[14px] font-bold text-white transition-colors hover:bg-copper-dark sm:min-w-[157px] sm:py-2.5 sm:text-[16px]"
          label={`Visit ${provider.name}`}
        >
          Visit Site
        </HubLink>
        <button
          type="button"
          aria-label="Dismiss offer banner"
          onClick={() => {
            try {
              sessionStorage.setItem(DISMISS_KEY, 'true');
            } catch {
              /* storage unavailable */
            }
            setDismissed(true);
          }}
          className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/5 text-[18px] leading-none text-inkMuted hover:bg-black/10 hover:text-ink"
        >
          ×
        </button>
      </div>
    </div>
  );
}
