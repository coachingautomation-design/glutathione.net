import type { Metadata } from 'next';
import { generateBaseMetadata } from '@/lib/seo-schema';

export const metadata: Metadata = generateBaseMetadata({
  title: 'About Us | Glutathione.net',
  description: 'Glutathione.net is an independent comparison of clinician-prescribed glutathione therapy providers.',
  canonical: '/about',
});

export default function AboutPage() {
  return (
    <div className="container-shell py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-neutral-900">About Glutathione.net</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-700">
          <p>
            Glutathione.net is an independent comparison site for clinician-prescribed glutathione therapy
            providers. We compare providers on the figures they publish themselves — format, pharmacy sourcing,
            state availability and monthly pricing — rather than on clinical testing or patient outcome data we do
            not collect.
          </p>
          <p>
            We may earn a commission when a reader clicks through to a provider and makes a purchase, at no extra
            cost to them. Our rankings reflect our own editorial methodology, not sponsorship or payment — see our{' '}
            <a href="/advertising-disclosure" className="underline hover:text-primary-600">
              advertising disclosure
            </a>{' '}
            for details.
          </p>
        </div>
      </div>
    </div>
  );
}
