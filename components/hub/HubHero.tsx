import { HubDisclosureToggle } from './HubDisclosureToggle';

/**
 * Compact white hero in the bestdebtoptions.com layout: serif H1, one-line
 * intro, updated date and the advertiser-disclosure toggle, then a jump link to
 * the rankings. `id="hero-section"` is what the sticky offer bar watches.
 */

const UPDATED_DATE = () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export function HubHero({ title, description }: { title: string; description?: string }) {
  return (
    <section id="hero-section" className="border-b border-rule bg-white">
      <div className="bdo-container pb-4 pt-4 sm:pb-6 sm:pt-6">
        <h1 className="text-xl leading-tight text-black sm:text-[1.75rem]">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-gray-600 sm:text-sm">{description}</p>}
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-800">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Updated <time suppressHydrationWarning>{UPDATED_DATE()}</time>
          </span>
          <HubDisclosureToggle />
        </div>
        <a
          href="#rankings"
          className="mt-4 inline-flex items-center gap-1.5 bg-brand px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          See Our Top Picks
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
