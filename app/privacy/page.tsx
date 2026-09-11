import type { Metadata } from 'next';
import { generateBaseMetadata } from '@/lib/seo-schema';
import { currentYear } from '@/lib/utils';

export const metadata: Metadata = generateBaseMetadata({
  title: 'Privacy Policy | Glutathione.net',
  description: 'How Glutathione.net collects, uses, and protects visitor information.',
  canonical: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="container-shell py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-neutral-900">Privacy Policy</h1>
        <p className="mt-2 text-xs text-neutral-500">Last updated {currentYear()}</p>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-700">
          <p>
            This placeholder privacy policy should be reviewed and completed by qualified counsel before this site
            goes live. At a minimum it should describe: what information is collected (e.g. ad click identifiers
            such as <code>gclid</code>/<code>fbclid</code> stored in the browser to attribute affiliate clicks),
            how it is used, what is shared with affiliate partners and analytics providers, cookie and
            local-storage usage, and how a visitor can request their data be deleted.
          </p>
          <p>
            Until a complete policy is published, assume no personal information beyond standard web analytics and
            ad-click attribution parameters is collected by this site.
          </p>
        </div>
      </div>
    </div>
  );
}
