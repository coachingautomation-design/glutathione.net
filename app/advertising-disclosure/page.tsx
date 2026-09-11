import type { Metadata } from 'next';
import { generateBaseMetadata } from '@/lib/seo-schema';

export const metadata: Metadata = generateBaseMetadata({
  title: 'Advertising Disclosure | Glutathione.net',
  description: 'How Glutathione.net is compensated, and how that relates to our provider rankings.',
  canonical: '/advertising-disclosure',
});

export default function AdvertisingDisclosurePage() {
  return (
    <div className="container-shell py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-neutral-900">Advertising & Affiliate Disclosure</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-700">
          <p>
            Glutathione.net may receive compensation when a reader clicks a link to a provider featured on this
            site and makes a purchase. This is how the site is funded, and it comes at no extra cost to the reader.
          </p>
          <p>
            Our rankings and recommendations are based on our own editorial research and methodology — the figures
            each provider publishes about its format, pricing, pharmacy sourcing and state availability — not on
            sponsorship or payment. A provider cannot pay for a better rank.
          </p>
          <p>
            <strong>Medical Disclaimer:</strong> The content on this site is for informational purposes only and
            does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare
            provider for medical questions, treatment decisions, or emergency care.
          </p>
        </div>
      </div>
    </div>
  );
}
