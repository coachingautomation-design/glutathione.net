'use client';

import { Children, useState } from 'react';
import { ED_CTA } from './theme';

/**
 * The ranked provider list with a sitewide-style "show more" expander.
 *
 * Until 2026-08-17 the ED template ended its list with a link to another hub
 * ("Explore More Providers" → /ED-providers/). A reader who had scrolled the
 * whole list and wanted *more of the same list* was instead sent to a different
 * page, which is not what the label promises and is not how the rest of the
 * site behaves — `ProviderList` and `ProviderCardGrid` both expand in place.
 * This component brings the ED hubs in line: the button reveals the rest of the
 * roster without a navigation.
 *
 * Rows beyond `initialVisibleCount` are rendered and hidden with `display:none`
 * rather than sliced out of the tree. `ProviderList` slices, but these hubs are
 * the vertical's ranking pages: every row carries copy and an internal link to
 * a provider review, and dropping the tail out of the HTML would take that with
 * it. Hiding keeps the markup crawlers already see, keeps the ItemList schema
 * honest (it lists every provider), and makes expanding instant.
 */

type EdRankedListProps = {
  /** One element per provider, already ordered — rank N is `children[N - 1]`. */
  children: React.ReactNode;
  /** Rows shown before the reader expands. Matches the sitewide default. */
  initialVisibleCount?: number;
  moreLabel?: string;
  fewerLabel?: string;
};

export function EdRankedList({
  children,
  initialVisibleCount = 7,
  moreLabel = 'Explore More Providers',
  fewerLabel = 'Show Fewer Providers',
}: EdRankedListProps) {
  const [showAll, setShowAll] = useState(false);

  const rows = Children.toArray(children);
  const hasMore = rows.length > initialVisibleCount;

  return (
    <>
      <div className="space-y-4">
        {rows.map((row, index) => (
          // `space-y-4` on the wrapper as well as the container: a row that is
          // followed by the offer banner holds two elements, and they used to
          // get their gap from the container back when fragments put them there
          // directly. `hidden` is display:none, so a collapsed row is out of the
          // tab order and skipped by screen readers without needing aria-hidden.
          <div
            key={index}
            className={hasMore && !showAll && index >= initialVisibleCount ? 'hidden' : 'space-y-4'}
          >
            {row}
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            aria-expanded={showAll}
            className="inline-flex items-center justify-center gap-2 px-8 text-center transition-opacity hover:opacity-90"
            style={{
              backgroundColor: ED_CTA,
              color: '#fff',
              borderRadius: 4,
              minHeight: 48,
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            {showAll ? fewerLabel : moreLabel}
            {/* Chevron, not the old arrow: it points down to what is about to
                open rather than onward to another page. */}
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
