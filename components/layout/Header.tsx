'use client';

import { useState } from 'react';
import SmartLink from '@/components/SmartLink';

type HeaderNavItem = { label: string; href: string };

const DEFAULT_NAV: HeaderNavItem[] = [
  { label: 'Rankings', href: '#rankings' },
  { label: 'Which Programme Is Right for Me?', href: '#treatment-types' },
  { label: 'FAQs', href: '#faq' },
];

/**
 * Site header — carried over from exploretreatments.com's
 * `components/layout/Header`, simplified for a single-page site: that
 * component's mega-menu ("Categories", "Am I Eligible?", multi-vertical nav
 * groups) reads from a cross-vertical registry this site does not have. The
 * on-page section nav below serves the same "get to what you want" purpose
 * for a one-hub site.
 */
export function Header({ navItems = DEFAULT_NAV }: { navItems?: HeaderNavItem[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white shadow-sm" aria-label="Site header">
      <div className="container-shell py-2.5 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <SmartLink href="/" className="text-xl sm:text-2xl font-bold text-neutral-900 select-none">
            Glutathione<span className="text-primary-600">.net</span>
          </SmartLink>

          <div className="flex items-center gap-2">
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navItems.map((item) => (
                <SmartLink
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
                >
                  {item.label}
                </SmartLink>
              ))}
            </nav>

            <button
              type="button"
              className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors duration-200 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="mt-3 space-y-2 border-t border-neutral-200 pt-3 lg:hidden" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <SmartLink
                key={item.href}
                href={item.href}
                className="block rounded-md px-2 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </SmartLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
