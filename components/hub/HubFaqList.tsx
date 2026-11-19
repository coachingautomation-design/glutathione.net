'use client';

import { useState } from 'react';
import { HUB_TEXT, HUB_FAQ_BORDER, HUB_CTA } from './theme';

/** Flat bordered FAQ bars with a +/− in the CTA colour. All answers stay in the HTML. */
export function HubFaqList({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-2.5">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.q} style={{ border: `1px solid ${HUB_FAQ_BORDER}`, borderRadius: 4 }} className="bg-white">
            <h3 className="font-sans" style={{ fontFamily: 'inherit', fontWeight: 500, letterSpacing: 0 }}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 text-left"
                style={{ padding: '8px 16px', minHeight: 48, color: HUB_TEXT, fontSize: 16 }}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <span className="relative flex-none" style={{ width: 14, height: 14 }} aria-hidden="true">
                  <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded" style={{ backgroundColor: HUB_CTA }} />
                  <span
                    className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded transition-transform duration-200"
                    style={{ backgroundColor: HUB_CTA, transform: isOpen ? 'scaleY(0)' : 'scaleY(1)' }}
                  />
                </span>
              </button>
            </h3>
            <p className={isOpen ? 'leading-relaxed' : 'hidden'} style={{ padding: '0 16px 12px', color: HUB_TEXT, fontSize: 16 }}>
              {faq.a}
            </p>
          </div>
        );
      })}
    </div>
  );
}
