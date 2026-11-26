'use client';

import { Children, useState } from 'react';

/**
 * Ranked list with an in-place "Explore More Providers" expander. Rows past the
 * initial count stay in the HTML (display:none) so crawlers and the ItemList
 * schema still see every provider.
 */
export function HubRankedList({
  children,
  initialVisibleCount = 7,
  moreLabel = 'Explore More Providers',
  fewerLabel = 'Show Fewer Providers',
}: {
  children: React.ReactNode;
  initialVisibleCount?: number;
  moreLabel?: string;
  fewerLabel?: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const rows = Children.toArray(children);
  const hasMore = rows.length > initialVisibleCount;

  return (
    <>
      <div className="space-y-3">
        {rows.map((row, index) => (
          <div key={index} className={hasMore && !showAll && index >= initialVisibleCount ? 'hidden' : 'space-y-3'}>
            {row}
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            aria-expanded={showAll}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-brand bg-white px-6 text-center text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            {showAll ? fewerLabel : moreLabel}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: showAll ? 'rotate(180deg)' : undefined }}
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
