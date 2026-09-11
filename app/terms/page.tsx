import type { Metadata } from 'next';
import { generateBaseMetadata } from '@/lib/seo-schema';
import { currentYear } from '@/lib/utils';

export const metadata: Metadata = generateBaseMetadata({
  title: 'Terms of Use | Glutathione.net',
  description: 'The terms governing use of Glutathione.net.',
  canonical: '/terms',
});

export default function TermsPage() {
  return (
    <div className="container-shell py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-neutral-900">Terms of Use</h1>
        <p className="mt-2 text-xs text-neutral-500">Last updated {currentYear()}</p>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-700">
          <p>
            This placeholder terms-of-use page should be reviewed and completed by qualified counsel before this
            site goes live. At a minimum it should cover: the informational (non-medical-advice) nature of the
            content, the affiliate relationship with the providers listed (see our{' '}
            <a href="/advertising-disclosure" className="underline hover:text-primary-600">
              advertising disclosure
            </a>
            ), acceptable use of the site, and limitation-of-liability language appropriate for a health-adjacent
            comparison publisher.
          </p>
        </div>
      </div>
    </div>
  );
}
