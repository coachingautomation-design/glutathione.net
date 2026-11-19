import SmartLink from '@/components/SmartLink';
import { HUB_HEADING, HUB_BORDER } from './theme';

const HOW_WE_RANK_POINTS = [
  'Only figures a provider publishes on its own site.',
  'No clinical testing and no patient outcome data.',
  'Unverifiable numbers are shown as “not published”.',
  'Rankings are editorial, not paid placement.',
];

/** Slim "How We Rank" strip directly under the ranked list. */
export function HubHowWeRankStrip() {
  return (
    <div
      className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-1.5 bg-white px-4 py-3 text-xs leading-snug"
      style={{ border: `1px solid ${HUB_BORDER}`, color: '#374151' }}
    >
      <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: HUB_HEADING }}>
        How We Rank
      </span>
      {HOW_WE_RANK_POINTS.map((point) => (
        <span key={point}>{point}</span>
      ))}
    </div>
  );
}

const disclosureContent = {
  affiliate: {
    title: 'Affiliate Disclosure',
    content:
      'Glutathione.net may receive compensation when readers visit or purchase through links on this page. This does not increase the cost to the reader. Provider rankings are based on our published evaluation criteria, including pricing, transparency, treatment access, support and overall value.',
  },
  medical: {
    title: 'Medical Disclaimer',
    content:
      'The information on Glutathione.net is provided for educational and comparison purposes only. It is not medical advice and does not replace consultation with a qualified healthcare professional. Glutathione therapy requires evaluation by a licensed clinician, and a prescription is not guaranteed. Compounded medications are not FDA-approved, and treatment availability varies by state and provider.',
  },
};

export function Disclosure({ variant = 'affiliate' }: { variant?: 'affiliate' | 'medical' }) {
  const c = disclosureContent[variant];
  return (
    <div
      className={`rounded-2xl border p-4 ${variant === 'medical' ? 'border-amber-400/30 bg-amber-400/5' : 'border-border bg-sand'}`}
    >
      <div className="flex items-start gap-3">
        <svg
          className={`mt-0.5 h-5 w-5 shrink-0 ${variant === 'medical' ? 'text-amber-500' : 'text-inkMuted'}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {variant === 'medical' ? (
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
          ) : (
            <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01" />
          )}
        </svg>
        <div>
          <p className="mb-1 text-[14px] font-bold leading-5 text-ink">{c.title}</p>
          <p className="text-[13px] leading-5 text-inkMuted md:text-[14px] md:leading-[22px]">{c.content}</p>
        </div>
      </div>
    </div>
  );
}

const DEFAULT_CRITERIA = [
  { title: 'Pricing & transparency', body: 'Whether the entry price and the renewal price are both published before intake, and whether consultation and shipping sit inside them.' },
  { title: 'Clinical oversight', body: 'A licensed clinician reviews every intake, and is reachable again when a dose needs to change.' },
  { title: 'Formats & dosing', body: 'Which delivery routes a provider can prescribe, and whether the dose and supply are stated up front.' },
  { title: 'Access & convenience', body: 'State availability, shipping speed and cost, and how easy it is to pause or cancel. These are editorial scores, not customer ratings.' },
];

export function HowWeRank({ criteria = DEFAULT_CRITERIA }: { criteria?: { title: string; body: string }[] }) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5">
      <h2 className="mb-5 text-[18px] leading-7 text-ink">How We Rank Providers</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {criteria.map((c) => (
          <div key={c.title} className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-tint">
              <svg className="h-5 w-5 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
            </div>
            <div>
              <h3 className="font-sans text-[14px] font-bold leading-5 text-ink" style={{ fontFamily: 'inherit' }}>
                {c.title}
              </h3>
              <p className="mt-0.5 text-[14px] leading-[22px] text-inkMuted">{c.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EditorialByline() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <span className="text-[16px] font-bold text-ink">Glutathione.net Editorial Team</span>
          <p className="text-[14px] leading-5 text-inkMuted">Independent provider research and pricing analysis</p>
          <p className="mt-0.5 text-[12px] leading-4 text-inkMuted">
            Non-clinical editorial team, see our{' '}
            <SmartLink href="/advertising-disclosure/" className="underline">
              disclosure
            </SmartLink>
          </p>
        </div>
        <div className="shrink-0 text-right text-[12px] leading-4 text-inkMuted">
          <div className="font-bold">Last Updated</div>
          <div>{lastUpdated}</div>
        </div>
      </div>
      <p className="mt-3 border-t border-border pt-3 text-[12px] leading-[18px] text-inkMuted">
        This page is independent editorial research, not medical advice, and has not been reviewed by a licensed
        clinician. Glutathione therapy requires evaluation by a licensed healthcare professional, and a prescription is
        not guaranteed. Discuss your health history, medications and treatment goals with a qualified clinician before
        starting any treatment.
      </p>
    </div>
  );
}
