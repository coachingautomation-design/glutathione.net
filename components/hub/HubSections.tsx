import SmartLink from '@/components/SmartLink';

/**
 * Methodology and disclosure bands at the foot of each landing page — the top of
 * bestdebtoptions.com's footer ("How We Rate", "How We Make Money"), plus the
 * byline and medical disclaimer this site needs.
 */

export const AFFILIATE_DISCLOSURE =
  'Glutathione.net may receive compensation when readers visit or purchase through links on this page. This does not increase the cost to the reader. Provider rankings are based on our published evaluation criteria, including pricing, transparency, treatment access, support and overall value.';

const MEDICAL_DISCLAIMER =
  'The information on Glutathione.net is provided for educational and comparison purposes only. It is not medical advice and does not replace consultation with a qualified healthcare professional. Glutathione therapy requires evaluation by a licensed clinician, and a prescription is not guaranteed. Compounded medications are not FDA-approved, and treatment availability varies by state and provider.';

const DEFAULT_CRITERIA = [
  { title: 'Pricing & transparency', body: 'whether the entry price and the renewal price are both published before intake, and whether consultation and shipping sit inside them' },
  { title: 'Clinical oversight', body: 'a licensed clinician reviews every intake, and is reachable again when a dose needs to change' },
  { title: 'Formats & dosing', body: 'which delivery routes a provider can prescribe, and whether the dose and supply are stated up front' },
  { title: 'Access & convenience', body: 'state availability, shipping speed and cost, and how easy it is to pause or cancel' },
];

export function HubFooterBands({ criteria = DEFAULT_CRITERIA }: { criteria?: { title: string; body: string }[] }) {
  const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <div className="mt-16 border-t border-rule bg-white">
      <section id="methodology" className="scroll-mt-20 border-b border-rule">
        <div className="bdo-container py-10">
          <h2 className="mb-4 text-xl text-black">How We Rank Providers</h2>
          <div className="prose-editorial max-w-3xl">
            <p>Our editors score every provider on Glutathione.net using the same criteria, then rank them by their combined score:</p>
            <ul>
              {criteria.map((c) => (
                <li key={c.title}>
                  <strong>{c.title}</strong> - {c.body}
                </li>
              ))}
            </ul>
            <p>
              We use only figures a provider publishes on its own site; numbers we cannot verify are shown as “not
              published”. These are editorial scores, not customer ratings, and rankings are never paid placement.
            </p>
            <p className="text-sm text-gray-700">
              By the <strong>Glutathione.net Editorial Team</strong> (independent, non-clinical provider research) · Last
              updated {lastUpdated}.{' '}
              <SmartLink href="/about/" className="font-semibold">
                About us →
              </SmartLink>
            </p>
          </div>
        </div>
      </section>
      <section className="border-b border-rule bg-gray-50">
        <div className="bdo-container space-y-5 py-6">
          <div>
            <h3 className="mb-2 text-sm text-black">How We Make Money</h3>
            <p className="max-w-3xl text-xs leading-relaxed text-gray-700">
              {AFFILIATE_DISCLOSURE}{' '}
              <SmartLink href="/advertising-disclosure/" className="underline hover:text-black">
                Read our advertising disclosure.
              </SmartLink>
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-sm text-black">Medical Disclaimer</h3>
            <p className="max-w-3xl text-xs leading-relaxed text-gray-700">{MEDICAL_DISCLAIMER}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
