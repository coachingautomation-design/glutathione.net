import type { Metadata } from 'next';
import { generateBaseMetadata } from '@/lib/seo-schema';

export const metadata: Metadata = generateBaseMetadata({
  title: 'Contact | Glutathione.net',
  description: 'How to reach the Glutathione.net editorial team.',
  canonical: '/contact',
});

export default function ContactPage() {
  return (
    <div className="container-shell py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-neutral-900">Contact Us</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-700">
          <p>
            For editorial questions, corrections, or provider inquiries, email{' '}
            <a href="mailto:hello@glutathione.net" className="underline hover:text-primary-600">
              hello@glutathione.net
            </a>
            .
          </p>
          <p>
            This site does not provide medical advice. For treatment questions, contact a licensed healthcare
            provider directly.
          </p>
        </div>
      </div>
    </div>
  );
}
