import type { ReactNode } from 'react';
import SmartLink from '@/components/SmartLink';

/**
 * Building blocks for the long-form guide on a hub page, in the
 * bestnadtreatments.com editorial style: serif headings, 16–17px body copy on
 * cream, copper and teal accents. Pages supply only the words.
 *
 * All server components.
 */

/** "What is on this page" jump list that opens the guide. */
export function GuideContents({ items }: { items: { href: string; label: string }[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Guide contents" className="mb-8 rounded-2xl border border-border bg-white p-5 shadow-[var(--card-shadow)]">
      <p className="text-[12px] font-bold uppercase tracking-widest text-copper-dark">What is on this page</p>
      <ol className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-start gap-2.5 text-[15px] leading-6">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-sand text-[11px] font-bold text-ink">
              {i + 1}
            </span>
            <a href={item.href} className="font-medium text-teal underline-offset-2 hover:underline">
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
    <h3 {...(id ? { id } : {})} className="mb-4 mt-10 scroll-mt-24 text-[20px] leading-7 text-ink md:text-[24px] md:leading-[34px]">
      {children}
    </h3>
  );
}

/** Body paragraph. */
export function GuideText({ children }: { children: ReactNode }) {
  return <p className="mb-5 text-[16px] leading-7 text-ink md:text-[17px] md:leading-[30px]">{children}</p>;
}

/** Bulleted list with copper chevrons. Items may be plain strings or `{ title, body }`. */
export function GuideList({ items }: { items: (string | { title: string; body: string })[] }) {
  return (
    <ul className="mb-8 space-y-3">
      {items.map((item) => {
        const key = typeof item === 'string' ? item : item.title;
        return (
          <li key={key} className="flex items-start gap-3 text-[16px] leading-7 text-ink md:text-[17px]">
            <span className="mt-0.5 flex-shrink-0 text-lg font-bold text-copper" aria-hidden="true">
              &#8250;
            </span>
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
    <div className="mb-8 space-y-3">
      {items.map((item) => (
        <div key={item.label} className="flex gap-4 rounded-2xl border border-border bg-white p-4">
          <div className="w-20 flex-shrink-0 text-center">
            <span className="inline-block rounded bg-teal px-2 py-1 text-xs font-bold text-white">{item.label}</span>
          </div>
          <p className="text-[16px] leading-relaxed text-ink">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

/** Copper-topped tier cards, e.g. pricing bands. */
export function GuideTiers({ items }: { items: { title: string; figure: string; body: string }[] }) {
  return (
    <div className={`mb-8 grid grid-cols-1 gap-5 ${items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
      {items.map((t) => (
        <div key={t.title} className="rounded-2xl border border-t-4 border-border border-t-copper bg-white p-5 shadow-[var(--card-shadow)]">
          <h4 className="mb-1 text-lg text-ink">{t.title}</h4>
          <p className="mb-2 text-base font-semibold text-copper-dark">{t.figure}</p>
          <p className="text-[15px] leading-relaxed text-ink">{t.body}</p>
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
    <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-[rgba(15,92,92,0.2)] bg-teal-tint p-6">
        <h4 className="mb-4 flex items-center gap-2 text-teal">
          <span aria-hidden="true">&#10003;</span> {goodTitle}
        </h4>
        <ul className="space-y-2">
          {good.map((b) => (
            <li key={b} className="flex items-start gap-2 text-[15px] leading-6 text-ink">
              <span className="text-teal" aria-hidden="true">
                &#10003;
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-amber-300/60 bg-amber-tint p-6">
        <h4 className="mb-4 flex items-center gap-2 text-amber-900">
          <span aria-hidden="true">&#9888;&#65039;</span> {watchTitle}
        </h4>
        <ul className="space-y-2">
          {watch.map((r) => (
            <li key={r} className="flex items-start gap-2 text-[15px] leading-6 text-ink">
              <span className="text-amber-700" aria-hidden="true">
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
    <div className="mb-8 overflow-x-auto rounded-2xl border border-border bg-white shadow-[var(--card-shadow)]">
      <table className="w-full border-collapse text-left" style={{ minWidth }}>
        <thead>
          <tr className="bg-sand">
            {headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3 text-[12px] font-bold uppercase tracking-wider text-ink">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-t border-border align-top">
              <th scope="row" className="px-4 py-3 text-left text-[14px] font-bold text-ink">
                {row[0]}
              </th>
              {row.slice(1).map((cell, index) => (
                <td key={`${row[0]}-${index}`} className="px-4 py-3 text-[14px] leading-6 text-ink">
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

/** Copper-ruled callout on sand, for a named provider or a key point. */
export function GuideNote({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-4 rounded-r-2xl border-l-4 border-copper bg-sand p-5">
      <span className="font-bold text-ink">{title}</span>
      <p className="mt-1 text-[16px] leading-7 text-ink">{children}</p>
    </div>
  );
}

/** Safety / caveat box. */
export function GuideCallout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-8 mt-8 rounded-2xl border border-amber-300/60 bg-amber-tint p-5">
      <h4 className="text-base text-amber-900">{title}</h4>
      <p className="mt-1.5 text-[15px] leading-relaxed text-amber-900/90">{children}</p>
    </div>
  );
}

/** Small uppercase label above a featured card. */
export function GuideCardLabel({ children }: { children: ReactNode }) {
  return <p className="mb-1 mt-8 text-[14px] font-semibold uppercase tracking-wide text-copper-dark">{children}</p>;
}

/** Inline on-site link — SmartLink, so stored ad params survive the hop. */
export function GuideLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SmartLink href={href} className="font-semibold text-teal underline underline-offset-2">
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
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal underline underline-offset-2">
      {children}
    </a>
  );
}
