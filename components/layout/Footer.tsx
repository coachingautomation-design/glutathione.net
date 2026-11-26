import SmartLink from '@/components/SmartLink';
import { currentYear } from '@/lib/utils';

const COMPARE_LINKS = [
  { href: '/', label: 'Glutathione Providers 2026' },
  { href: '/best-glutathione-injections/', label: 'Best Glutathione Injections' },
  { href: '/top-ranked-glutathione-injections/', label: 'Top Ranked Injections' },
  { href: '/best-sites-to-get-glutathione-injections/', label: 'Best Sites to Get Injections' },
];

const PRICE_LINKS = [
  { href: '/affordable-glutathione-injections/', label: 'Affordable Injections' },
  { href: '/cheapest-glutathione-injections/', label: 'Cheapest Injections' },
];

const FORMAT_LINKS = [
  { href: '/best-glutathione-nasal-spray/', label: 'Glutathione Nasal Spray' },
  { href: '/best-glutathione-patch/', label: 'Glutathione Patch' },
];

const SITE_LINKS = [
  { href: '/about/', label: 'About Us' },
  { href: '/advertising-disclosure/', label: 'Advertising Disclosure' },
  { href: '/contact/', label: 'Contact' },
  { href: '/privacy/', label: 'Privacy Policy' },
  { href: '/terms/', label: 'Terms of Use' },
  { href: '/buy-this-domain/', label: 'Buy This Domain' },
];

const SECTIONS = [
  { title: 'Compare', links: COMPARE_LINKS },
  { title: 'Price', links: PRICE_LINKS },
  { title: 'Formats', links: FORMAT_LINKS },
  { title: 'Site', links: SITE_LINKS },
];

/** Site footer in the bestdebtoptions.com style: light disclaimer strip, then a plain white footer. */
export function Footer() {
  return (
    <>
      <div className="border-t border-rule bg-gray-50 text-[12.5px] leading-snug text-gray-800">
        <p className="mx-auto max-w-[1280px] px-4 py-3 sm:px-6 lg:px-8">
          <strong className="font-semibold">Medical disclaimer:</strong> This site is for informational purposes only
          and is not medical advice. Always consult a licensed healthcare provider before starting glutathione therapy.{' '}
          <span className="text-gray-600">
            We may earn a commission from partner links -{' '}
            <SmartLink href="/advertising-disclosure/" className="underline hover:text-black">
              see our affiliate disclosure
            </SmartLink>
            .
          </span>
        </p>
      </div>
      <footer className="border-t border-rule bg-white text-black" aria-label="Site footer">
        <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
          <SmartLink href="/" className="font-merri text-base font-bold">
            Glutathione<span className="text-brand">.net</span>
          </SmartLink>
          <p className="mt-2 max-w-sm text-xs text-gray-700">
            Independent comparison of clinician-prescribed glutathione therapy providers: format, price, shipping and
            plan terms, side by side.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <p className="font-merri text-sm font-bold text-black">{section.title}</p>
                <ul className="mt-2.5 space-y-1.5 text-[13px]">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <SmartLink href={link.href} className="text-brand hover:underline">
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-rule pt-6 text-xs leading-relaxed text-gray-700">
            Affiliate Disclosure: We may earn commissions from qualifying purchases. This does not influence our
            reviews or rankings. Compounded glutathione is not an FDA-approved drug product. For emergencies, call 911.
          </div>

          <p className="mt-4 text-xs text-gray-700">© {currentYear()} Glutathione.net. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
