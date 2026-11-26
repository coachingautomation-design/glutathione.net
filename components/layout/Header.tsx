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

/** Pages that carry the ranked list, so the header CTA can jump to it in place. */
const RANKED_PAGES = new Set([
  '/',
  '/best-glutathione-injections/',
  '/top-ranked-glutathione-injections/',
  '/affordable-glutathione-injections/',
  '/cheapest-glutathione-injections/',
  '/best-sites-to-get-glutathione-injections/',
  '/best-glutathione-nasal-spray/',
  '/best-glutathione-patch/',
]);

/**
 * Site header in the bestdebtoptions.com style: white bar with a serif
 * wordmark, plain text links and a solid CTA; a hamburger menu on phones.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkClass = (href: string) =>
    `transition-colors duration-150 hover:text-black ${pathname === href ? 'text-brick' : 'text-gray-800'}`;

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-rule bg-white transition-shadow duration-200 ${scrolled ? 'shadow-[0_1px_8px_rgba(0,0,0,0.08)]' : ''}`} aria-label="Site header">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center justify-between sm:h-16">
          <SmartLink href="/" className="flex shrink-0 items-center gap-2 font-merri text-base font-bold leading-tight text-black sm:text-lg">
            <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
              <circle cx="16" cy="16" r="15" fill="#7c2d12" />
              <path d="M9 17.25 13.75 22 23.5 10.5" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>
              Glutathione<span className="text-brick">.net</span>
            </span>
          </SmartLink>

          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <SmartLink key={link.href} href={link.href} className={`text-sm font-medium ${linkClass(link.href)}`}>
                {link.label}
              </SmartLink>
            ))}
          </nav>

          <SmartLink
            href={RANKED_PAGES.has(pathname) ? '#rankings' : '/#rankings'}
            className="hidden items-center gap-1.5 bg-brick px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:bg-brick-dark active:scale-95 md:inline-flex"
          >
            See Our Rankings
          </SmartLink>

          <button
            type="button"
            className="-mr-2 flex h-10 w-10 items-center justify-center text-black md:hidden"
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
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-rule bg-white md:hidden">
          <ul className="mx-auto max-w-content px-4 py-2">
            {[{ href: '/', label: 'Home' }, ...NAV_LINKS].map((link) => (
              <li key={link.href} className="border-b border-rule last:border-b-0">
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
