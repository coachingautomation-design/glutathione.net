'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SmartLink from '@/components/SmartLink';

const NAV_LINKS = [
  { href: '/best-glutathione-injections/', label: 'Best Injections' },
  { href: '/cheapest-glutathione-injections/', label: 'Cheapest' },
  { href: '/best-glutathione-nasal-spray/', label: 'Nasal Spray' },
  { href: '/best-glutathione-patch/', label: 'Patch' },
  { href: '/about/', label: 'About Us' },
];

/**
 * Site header in the bestnadtreatments.com style: cream bar with a serif
 * wordmark, copper accent and plain text links; a hamburger menu on phones.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkClass = (href: string) =>
    `transition-colors hover:text-copper-dark ${pathname === href ? 'text-copper-dark' : 'text-ink'}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-[rgba(250,246,240,0.95)] backdrop-blur" aria-label="Site header">
      <div className="mx-auto max-w-content px-4 md:px-6 lg:px-0">
        <div className="relative flex h-[52px] items-center justify-between md:h-[58px]">
          <SmartLink href="/" className="shrink-0 font-serif text-[20px] font-bold tracking-tight text-ink md:text-[24px]">
            Glutathione<span className="text-copper-dark">.net</span>
          </SmartLink>

          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <SmartLink key={link.href} href={link.href} className={`text-[16px] font-medium lg:text-[17px] ${linkClass(link.href)}`}>
                {link.label}
              </SmartLink>
            ))}
          </nav>

          <button
            type="button"
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded text-ink md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-border bg-cream md:hidden">
          <ul className="mx-auto max-w-content px-4 py-2">
            {[{ href: '/', label: 'Home' }, ...NAV_LINKS].map((link) => (
              <li key={link.href} className="border-b border-border last:border-b-0">
                <SmartLink href={link.href} className={`block py-3 text-[16px] font-medium ${linkClass(link.href)}`}>
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
