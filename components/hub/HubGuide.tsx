import type { ReactNode } from 'react';
import SmartLink from '@/components/SmartLink';

/**
 * Building blocks for the long-form guide on a hub page, in the
 * bestdebtoptions.com editorial style: Merriweather headings, 16px body copy,
 * square bordered boxes and brown-red accents. Pages supply only the words.
 *
 * All server components.
 */

/** "What is on this page" jump list that opens the guide. */
export function GuideContents({ items }: { items: { href: string; label: string }[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Guide contents" className="mb-8 border border-rule bg-white p-4">
      <p className="font-merri text-base font-bold text-black">What is on this page</p>
      <ol className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-start gap-2 text-sm leading-snug">
            <span className="flex-none font-semibold text-gray-600">
              {i + 1}.
            </span>
            <a href={item.href} className="text-brick hover:underline">
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Section heading inside the guide. Pass `id` when it is a contents target. */
export function GuideHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3 {...(id ? { id } : {})} className="mb-2 mt-8 scroll-mt-24 text-lg leading-snug text-black">
      {children}
    </h3>
  );
}

/** Body paragraph. */
export function GuideText({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-base leading-relaxed text-[#1a1a1a]">{children}</p>;
}

/** Disc bulleted list. Items may be plain strings or `{ title, body }`. */
export function GuideList({ items }: { items: (string | { title: string; body: string })[] }) {
  return (
    <ul className="mb-3 list-disc space-y-1 pl-5">
      {items.map((item) => {
        const key = typeof item === 'string' ? item : item.title;
        return (
          <li key={key} className="text-base leading-relaxed text-[#1a1a1a]">
            {typeof item === 'string' ? (
              <span>{item}</span>
            ) : (
              <span>
                <strong className="font-semibold">{item.title}:</strong> {item.body}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Numbered steps, each in its own card. */
export function GuideSteps({ items }: { items: { label: string; body: string }[] }) {
  return (
    <div className="mb-6 space-y-3">
      {items.map((item) => (
        <div key={item.label} className="flex gap-4 border border-rule bg-white p-4">
          <div className="w-20 flex-shrink-0 text-center">
            <span className="inline-block bg-brick px-2 py-1 text-xs font-bold text-white">{item.label}</span>
          </div>
          <p className="text-base leading-relaxed text-[#1a1a1a]">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

/** Brown-red-topped tier cards, e.g. pricing bands. */
export function GuideTiers({ items }: { items: { title: string; figure: string; body: string }[] }) {
  return (
    <div className={`mb-6 grid grid-cols-1 gap-4 ${items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
      {items.map((t) => (
        <div key={t.title} className="border border-t-4 border-rule border-t-brick bg-white p-4">
          <h4 className="mb-1 text-base text-black">{t.title}</h4>
          <p className="mb-2 text-base font-semibold text-brick">{t.figure}</p>
          <p className="text-sm leading-relaxed text-[#1a1a1a]">{t.body}</p>
        </div>
      ))}
    </div>
  );
}

/** Two-column "good / watch out" panels. */
export function GuideProsCons({
  good,
  watch,
  goodTitle = 'What to look for',
  watchTitle = 'Red flags',
}: {
  good: string[];
  watch: string[];
  goodTitle?: string;
  watchTitle?: string;
}) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="border border-green-200 bg-green-50 p-4">
        <h4 className="mb-2 flex items-center gap-2 text-sm text-green-800">
          <span aria-hidden="true">&#10003;</span> {goodTitle}
        </h4>
        <ul className="space-y-2">
          {good.map((b) => (
            <li key={b} className="flex items-start gap-2 text-[15px] leading-6 text-ink">
              <span className="text-green-600" aria-hidden="true">
                &#10003;
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-red-200 bg-red-50 p-4">
        <h4 className="mb-2 flex items-center gap-2 text-sm text-red-800">
          <span aria-hidden="true">&#9888;&#65039;</span> {watchTitle}
        </h4>
        <ul className="space-y-2">
          {watch.map((r) => (
            <li key={r} className="flex items-start gap-2 text-[15px] leading-6 text-ink">
              <span className="text-red-500" aria-hidden="true">
                &#8226;
              </span>
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Comparison table. The first cell of each row renders as a row header, so the
 * table stays navigable when it scrolls sideways on a phone.
 */
export function GuideTable({ headers, rows, minWidth = '40rem' }: { headers: string[]; rows: string[][]; minWidth?: string }) {
  return (
    <div className="mb-6 overflow-x-auto border border-rule bg-white">
      <table className="w-full border-collapse text-left text-[13px]" style={{ minWidth }}>
        <thead>
          <tr className="bg-brick text-white">
            {headers.map((header) => (
              <th key={header} scope="col" className="px-2.5 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row[0]} className={`border-t border-rule align-top ${i % 2 ? 'bg-brick/[0.03]' : 'bg-white'}`}>
              <th scope="row" className="px-2.5 py-3 text-left font-semibold text-black">
                {row[0]}
              </th>
              {row.slice(1).map((cell, index) => (
                <td key={`${row[0]}-${index}`} className="px-2.5 py-3 leading-snug text-[#1a1a1a]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Brown-red-ruled callout, for a named provider or a key point. */
export function GuideNote({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-4 border-l-4 border-brick bg-gray-50 p-4">
      <span className="font-bold text-black">{title}</span>
      <p className="mt-1 text-base leading-relaxed text-[#1a1a1a]">{children}</p>
    </div>
  );
}

/** Safety / caveat box. */
export function GuideCallout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6 mt-6 border border-amber-300 bg-amber-50 p-4">
      <h4 className="text-sm text-amber-900">{title}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-amber-900/90">{children}</p>
    </div>
  );
}

/** Small uppercase label above a featured card. */
export function GuideCardLabel({ children }: { children: ReactNode }) {
  return <p className="-mb-6 mt-8 text-[11px] font-bold uppercase tracking-widest text-brick">{children}</p>;
}

/** Inline on-site link — SmartLink, so stored ad params survive the hop. */
export function GuideLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SmartLink href={href} className="font-medium text-brick hover:underline">
      {children}
    </SmartLink>
  );
}

/**
 * Outbound link to an authority source (FDA, NIH). A plain anchor: these are
 * citations, not affiliate links, and must never go through OutboundLink.
 */
export function AuthorityLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-brick hover:underline">
      {children}
    </a>
  );
}
