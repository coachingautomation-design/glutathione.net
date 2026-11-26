import type { EdHubProvider } from '@/components/ed/types';
import SmartLink from '@/components/SmartLink';
import { HubLink } from './HubLink';
import { HUB_CTA } from './theme';

/**
 * Sticky sidebar and side-by-side table, as on the bestdebtoptions.com
 * homepage, in the blue-and-red palette.
 */

function Chevron() {
  return (
    <svg className="mt-1 h-3 w-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function HubSidebar({
  providers,
  vertical,
  guides,
}: {
  providers: EdHubProvider[];
  vertical: string;
  guides: { href: string; label: string }[];
}) {
  const reviews = providers.filter((p) => p.reviewPath);
  return (
    <aside className="w-full flex-shrink-0 space-y-5 lg:sticky lg:top-20 lg:w-64 xl:w-72">
      <div className="border border-brand/20 bg-brand/5 p-4">
        <div className="mb-2 flex items-center gap-2">
          <svg className="h-5 w-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span className="text-base font-bold text-brand">Find Your Best Glutathione Provider</span>
        </div>
        <p className="mb-3 text-sm leading-relaxed text-gray-800">
          Every provider we list is clinician-prescribed and researched by the Glutathione.net editorial team.
        </p>
        <a
          href="#rankings"
          className="block w-full bg-brand py-2 text-center text-base font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          See Our Rankings
        </a>
      </div>

      {guides.length > 0 && (
        <div className="border border-rule bg-white p-4">
          <h3 className="mb-3 text-base text-black">Our Guides</h3>
          <ul className="space-y-2.5">
            {guides.map((g) => (
              <li key={g.href}>
                <SmartLink href={g.href} className="flex items-start gap-1.5 text-sm leading-snug text-brand hover:underline">
                  <Chevron />
                  {g.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="border border-rule bg-white p-4">
          <h3 className="mb-3 text-base text-black">Reviews</h3>
          <ul className="space-y-2.5">
            {reviews.map((p) => (
              <li key={p.slug}>
                <SmartLink href={p.reviewPath!} className="flex items-start gap-1.5 text-sm leading-snug text-brand hover:underline">
                  <Chevron />
                  {p.name} Review
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border border-rule bg-white p-4">
        <h3 className="mb-3 text-base text-black">Our Top-Rated Picks</h3>
        <ul className="space-y-2">
          {providers.map((p) => (
            <li key={p.slug}>
              <HubLink
                provider={p}
                vertical={vertical}
                placement="sidebar"
                className="group flex items-center justify-between text-sm text-gray-800 transition-colors hover:text-black"
              >
                <span className="transition-colors group-hover:text-brand">{p.name}</span>
                <span className="font-semibold text-black">{p.rating.toFixed(1)}</span>
              </HubLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function HubComparisonTable({ providers, vertical }: { providers: EdHubProvider[]; vertical: string }) {
  return (
    <section id="compare" aria-labelledby="h-compare" className="scroll-mt-20">
      <h2 id="h-compare" className="section-heading">
        Compare Our Top Picks Side by Side
      </h2>

      {/* Phones: one compact card per provider */}
      <ol className="space-y-3 sm:hidden">
        {providers.map((p) => (
          <li key={p.slug}>
            <HubLink
              provider={p}
              vertical={vertical}
              placement="list"
              label={`Visit ${p.name}`}
              className="block border border-rule bg-white text-inherit transition-shadow hover:shadow-md active:scale-[0.99]"
            >
              <span className="flex items-center justify-between gap-3 bg-brand px-3 py-2 text-white">
                <span className="text-sm font-semibold">
                  {p.rank}. {p.name}
                </span>
                <span className="whitespace-nowrap text-sm font-bold">{p.rating.toFixed(1)}</span>
              </span>
              <span className="grid grid-cols-2 gap-x-3 gap-y-2 px-3 py-2.5 text-[13px]">
                <span>
                  <span className="block text-xs text-gray-500">Best for</span>
                  <span className="font-semibold text-gray-900">{p.bestFor}</span>
                </span>
                <span>
                  <span className="block text-xs text-gray-500">User votes</span>
                  <span className="font-semibold text-gray-900">{p.userVotes.toLocaleString('en-US')}</span>
                </span>
                <span className="col-span-2">
                  <span className="block text-xs text-gray-500">Highlight</span>
                  <span className="font-semibold text-gray-900">{p.tagline}</span>
                </span>
              </span>
              <span className="block px-3 pb-3">
                <span className="block px-3 py-2 text-center text-[13px] font-bold text-white" style={{ background: HUB_CTA }}>
                  Visit Site
                </span>
              </span>
            </HubLink>
          </li>
        ))}
      </ol>

      {/* Tablet and desktop: table */}
      <div className="relative hidden overflow-x-auto border border-rule sm:block">
        <table className="w-full min-w-[620px] text-[13px]">
          <thead className="bg-brand text-left text-white">
            <tr>
              <th scope="col" className="px-2.5 py-3 font-semibold">Provider</th>
              <th scope="col" className="px-2.5 py-3 font-semibold">Our score</th>
              <th scope="col" className="px-2.5 py-3 font-semibold">Best for</th>
              <th scope="col" className="px-2.5 py-3 font-semibold">Highlight</th>
              <th scope="col" className="px-2.5 py-3"><span className="sr-only">Link</span></th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p, i) => (
              <tr key={p.slug} className={`border-t border-rule align-top ${i % 2 ? 'bg-brand/[0.03]' : 'bg-white'}`}>
                <th scope="row" className="px-2.5 py-3 text-left font-semibold text-black">
                  <span className="mr-1.5 text-gray-600">{p.rank}.</span>
                  {p.name}
                </th>
                <td className="px-2.5 py-3 font-semibold">{p.rating.toFixed(1)}</td>
                <td className="px-2.5 py-3">{p.bestFor}</td>
                <td className="px-2.5 py-3">{p.tagline}</td>
                <td className="px-2.5 py-3">
                  <HubLink
                    provider={p}
                    vertical={vertical}
                    placement="list"
                    className="inline-block whitespace-nowrap px-3 py-1.5 text-xs font-bold text-white"
                    style={{ background: HUB_CTA }}
                  >
                    Visit Site
                  </HubLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-gray-700">
        Prices and plans are what each provider publishes and can change. Confirm the details on the provider&apos;s own
        site before you start.
      </p>
    </section>
  );
}
