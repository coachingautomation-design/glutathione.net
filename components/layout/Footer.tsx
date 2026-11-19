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

/** Site footer in the bestnadtreatments.com style: slate disclaimer strip, then an ink footer. */
export function Footer() {
  return (
    <>
      <div className="bg-slate-900 text-[12.5px] leading-snug text-slate-100">
        <p className="mx-auto max-w-content px-4 py-2 md:px-6 lg:px-0">
          <strong className="font-semibold">Medical disclaimer:</strong> This site is for informational purposes only
          and is not medical advice. Always consult a licensed healthcare provider before starting glutathione therapy.{' '}
          <span className="text-slate-300">
            We may earn a commission from partner links -{' '}
            <SmartLink href="/advertising-disclosure/" className="underline hover:text-white">
              see our affiliate disclosure
            </SmartLink>
            .
          </span>
        </p>
      </div>
      <footer className="bg-ink text-white" aria-label="Site footer">
        <div className="mx-auto max-w-content px-4 py-10 md:px-6 lg:px-0 lg:py-12">
          <SmartLink href="/" className="font-serif text-[21px] font-bold tracking-tight">
            Glutathione<span className="text-[#E2A682]">.net</span>
          </SmartLink>
          <p className="mt-3 max-w-sm text-sm text-white/70">
            Independent comparison of clinician-prescribed glutathione therapy providers: format, price, shipping and
            plan terms, side by side.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <p className="text-[12px] font-semibold uppercase tracking-wide text-white/60">{section.title}</p>
                <ul className="mt-2.5 space-y-1.5 text-[13px] text-white/80">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <SmartLink href={link.href} className="transition-colors hover:text-white">
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-[12.5px] leading-relaxed text-white/60">
            Affiliate Disclosure: We may earn commissions from qualifying purchases. This does not influence our
            reviews or rankings. Compounded glutathione is not an FDA-approved drug product. For emergencies, call 911.
          </div>

          <p className="mt-5 text-[12px] text-white/50">© {currentYear()} Glutathione.net. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
