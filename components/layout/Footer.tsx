import SmartLink from '@/components/SmartLink';
import { currentYear } from '@/lib/utils';

const ON_PAGE_LINKS = [
  { href: '#rankings', label: 'Ranked Providers' },
  { href: '#treatment-types', label: 'Which Programme Is Right for Me?' },
  { href: '#education', label: 'Glutathione Therapy Guide' },
  { href: '#faq', label: 'FAQs' },
];

const COMPANY_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/advertising-disclosure', label: 'Advertising Disclosure' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/buy-this-domain', label: 'Buy This Domain' },
];

/**
 * Site footer — carried over from exploretreatments.com's
 * `components/layout/Footer` (same grid layout, brand column, bottom bar),
 * trimmed for a single-page launch: the reference footer's "Treatment
 * Categories", "Top Reviews" and "Popular Guides" columns read from a
 * cross-vertical provider/guide registry this site does not have, and its
 * LegitScript badge and Discord invite are exploretreatments.com-specific.
 * Every link below resolves to a real section or page on this site.
 */
export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50" aria-label="Site footer">
      <div className="container-shell grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="md:col-span-2">
          <SmartLink href="/" className="text-xl font-bold text-neutral-900 hover:text-primary-600 transition-colors">
            Glutathione<span className="text-primary-600">.net</span>
          </SmartLink>
          <p className="mt-2 text-sm text-neutral-600 max-w-xs leading-relaxed">
            Independent comparison of clinician-prescribed glutathione therapy providers — format, pharmacy sourcing,
            state availability and monthly pricing, compared side by side.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">On This Page</p>
          <ul className="space-y-2 text-sm text-neutral-700">
            {ON_PAGE_LINKS.map((link) => (
              <li key={link.href}>
                <SmartLink href={link.href} className="hover:text-primary-600 transition-colors duration-200">
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Company</p>
          <ul className="space-y-2 text-sm text-neutral-700">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <SmartLink href={link.href} className="hover:text-primary-600 transition-colors duration-200">
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-200 bg-white">
        <div className="container-shell py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © {currentYear()} Glutathione.net. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500 max-w-2xl leading-relaxed">
            <strong>Medical Disclaimer:</strong> Content is educational only and does not constitute medical advice,
            diagnosis, or treatment. Always consult a qualified healthcare provider. For emergencies, call 911.{' '}
            <SmartLink href="/advertising-disclosure" className="underline hover:text-neutral-700">
              Affiliate disclosure.
            </SmartLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
