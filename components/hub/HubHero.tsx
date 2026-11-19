/**
 * Editorial hero in the bestnadtreatments.com style: a very dark navy band with
 * white text, an "Updated on" row, a serif title, a short intro and the trust
 * points as small pills. There is no stock photo — a generic wellness image would
 * say nothing about glutathione — so the right side carries a soft copper and
 * teal glow instead. `id="hero-section"` is what the sticky offer bar watches.
 */
export function HubHero({ title, intro, trustPoints = [] }: { title: string; intro?: string; trustPoints?: string[] }) {
  const updated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <section id="hero-section" className="relative overflow-hidden bg-band">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 90% at 88% 20%, rgba(194, 98, 45, 0.30) 0%, rgba(194, 98, 45, 0) 60%), radial-gradient(45% 80% at 70% 110%, rgba(143, 211, 203, 0.18) 0%, rgba(143, 211, 203, 0) 60%)',
        }}
      />
      <div className="relative mx-auto max-w-content px-4 pb-[34px] pt-5 md:px-6 md:pb-14 md:pt-7 lg:px-0 lg:pb-16 lg:pt-9">
        <div className="max-w-[720px]">
          <div className="mb-2 flex items-center gap-1.5 whitespace-nowrap text-[11px] leading-5 text-white/75 md:mb-3 md:text-[12px]">
            <svg className="h-4 w-4 shrink-0 text-teal-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Updated on</span>
            <time>{updated}</time>
          </div>

          <h1 className="text-[26px] font-semibold leading-[32px] text-white md:text-[36px] md:leading-[42px] lg:text-[44px] lg:leading-[50px]">
            {title}
          </h1>

          {intro && <p className="mt-3 max-w-[620px] text-[15px] leading-6 text-white/80 md:text-[17px] md:leading-7">{intro}</p>}

          {trustPoints.length > 0 && (
            <ul className="mt-5 hidden flex-wrap gap-2 sm:flex">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[13px] font-medium leading-5 text-white md:text-[14px]"
                >
                  <svg className="h-4 w-4 shrink-0 text-teal-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
