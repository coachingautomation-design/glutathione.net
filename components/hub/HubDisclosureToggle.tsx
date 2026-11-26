'use client';

import { useState } from 'react';
import { AFFILIATE_DISCLOSURE } from './HubSections';

/** Compact "Advertiser Disclosure" toggle in the hero (bestdebtoptions.com style). */
export function HubDisclosureToggle() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="advertiser-disclosure"
        className="inline-flex items-center gap-1 text-xs text-gray-800 underline decoration-dotted underline-offset-2 hover:text-black"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        Advertiser Disclosure
      </button>
      {open && (
        <div
          id="advertiser-disclosure"
          role="region"
          aria-label="Advertiser disclosure"
          className="absolute left-0 top-full z-30 mt-2 w-[min(28rem,calc(100vw-2rem))] border border-rule bg-white p-4 text-xs leading-relaxed text-gray-700 shadow-lg"
        >
          <div className="mb-1 flex items-start justify-between gap-3">
            <p className="text-sm font-bold text-black">How we make money</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close disclosure" className="text-gray-600 hover:text-black">
              ×
            </button>
          </div>
          <p>{AFFILIATE_DISCLOSURE}</p>
        </div>
      )}
    </div>
  );
}
