'use client';

import { useEffect, useState } from 'react';
import type { EdHubProvider } from '@/components/ed/types';
import { HubLink } from './HubLink';
import { HUB_CTA, HUB_SCORE, scoreWording } from './theme';

const DISMISS_KEY = 'stickyOfferDismissed';

/**
 * Bottom sticky offer bar in the bestdebtoptions.com style for the page's #1 pick: shown once the hero has
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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="bdo-container flex items-center gap-3 py-2.5 sm:gap-5">
        <HubLink
          provider={provider}
          vertical={vertical}
          placement="sticky"
          label={`Visit ${provider.name}`}
          className="group flex min-w-0 flex-1 items-center gap-3 text-inherit sm:gap-5"
        >
          {provider.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={provider.logoUrl} alt="" className="hidden h-9 w-24 flex-shrink-0 object-contain sm:block" loading="lazy" />
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold text-black">{provider.name}</span>
            <span className="hidden truncate text-xs text-gray-700 md:block">{provider.tagline}</span>
          </span>
          <span className="hidden flex-shrink-0 items-center gap-1.5 sm:flex">
            <span className="px-2 py-1 text-sm font-bold text-white" style={{ background: HUB_SCORE }}>
              {provider.rating.toFixed(1)}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">{scoreWording(provider.rating)}</span>
          </span>
          <span
            className="flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap px-4 py-2.5 text-sm font-bold text-white group-hover:brightness-110"
            style={{ background: HUB_CTA }}
          >
            Visit Site
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
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
          className="flex-shrink-0 p-1 text-[18px] leading-none text-gray-600 hover:text-black"
        >
          ×
        </button>
      </div>
    </div>
  );
}
