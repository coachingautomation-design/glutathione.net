/**
 * Editorial hero, matched to bestnadtreatments.com's HomeHero: very dark navy
 * band with white text, "Updated on" row, serif title and two trust points as
 * small pills. No description line. The portrait sits on the right; its edges are
 * the same navy as the band, and a left-to-right scrim blends it in and keeps
 * the text legible where they overlap on mobile. `id="hero-section"` is what the
 * sticky offer bar watches.
 *
 * The trust points are site-wide claims, so both must hold for every provider:
 * every intake is clinician-reviewed, and free shipping is offered by most of the
 * roster (HSA/FSA, bestnad's second pill, is only published by a few providers here).
 */

const UPDATED_DATE = () =>
  new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const FEATURES = [
  {
    label: 'Clinician-prescribed only',
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    label: 'Free shipping options',
    icon: (
      <path
        d="M1 3h15v13H1zM16 8h4l3 3v5h-7M5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export function HubHero({ title }: { title: string }) {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-band">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-portrait.webp"
        alt=""
        width={1672}
        height={941}
        className="absolute inset-y-0 right-0 h-full w-[75%] object-cover object-[72%_18%] md:w-[60%] lg:w-[58%] lg:object-[70%_22%]"
        loading="eager"
        fetchPriority="high"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0d172c_35%,rgba(13,23,44,0.7)_55%,transparent)] md:bg-[linear-gradient(to_right,#0d172c_40%,rgba(13,23,44,0.4)_50%,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#0d172c_0%,transparent_45%),linear-gradient(to_left,#0d172c_0%,transparent_18%)]"
      />
      <div className="relative mx-auto max-w-content px-4 pb-[32px] pt-4 md:px-6 md:pb-14 md:pt-[23px] lg:px-0 lg:pb-16 lg:pt-8">
        <div className="flex w-[85%] flex-col md:block md:w-[60%]">
          <div className="order-2 mt-1.5 flex h-5 w-fit items-center gap-1 whitespace-nowrap text-[10px] leading-5 text-white/75 md:order-none md:mb-3 md:mt-0 md:gap-1.5 md:text-[11px] lg:text-[12px]">
            <svg className="h-[14px] w-[14px] shrink-0 text-teal-light md:h-4 md:w-4 lg:h-[18px] lg:w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Updated on</span>
            <time>{UPDATED_DATE()}</time>
          </div>

          <h1 className="order-1 max-w-[660px] text-[22px] font-semibold leading-[27px] text-white md:text-[34px] md:leading-[40px] lg:text-[42px] lg:leading-[48px]">
            {title}
          </h1>

          <ul className="mt-5 hidden flex-wrap gap-2 md:mt-6 md:flex lg:mt-5">
            {FEATURES.map((f) => (
              <li
                key={f.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[13px] font-medium leading-5 text-white md:text-[14px]"
              >
                <svg className="h-4 w-4 shrink-0 text-teal-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  {f.icon}
                </svg>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
