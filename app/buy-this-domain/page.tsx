import type { Metadata } from 'next';
import { generateBaseMetadata } from '@/lib/seo-schema';
import DomainInquiryForm from '@/components/DomainInquiryForm';

export const metadata: Metadata = generateBaseMetadata({
  title: 'Buy This Domain | Glutathione.net Is For Sale',
  description:
    'Glutathione.net is for sale. Buy it outright for $25,000 USD, or lease to own for $30,000 over 12 months with a $5,000 first payment.',
  canonical: '/buy-this-domain',
});

const BUY_NOW_URL = 'https://www.spaceship.com/s/buy/glutathione.net/CwjlJRdYeT5sfyhr';
const LEASE_TO_OWN_URL = 'https://www.spaceship.com/s/buy/glutathione.net/kk8GwBYCPGxOKeJ5';

const HIGHLIGHTS = [
  'Exact-match .net for "glutathione", a widely searched wellness and longevity ingredient',
  'Short, memorable, easy to spell, and works for a brand, clinic, supplement line, or content site',
  'Ships with a live comparison site that already covers injections, nasal sprays and patches',
  'Secure checkout and domain transfer handled by Spaceship',
];

export default function BuyThisDomainPage() {
  return (
    <div className="container-shell py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">Premium domain for sale</p>
          <h1 className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">
            Glutathione<span className="text-primary-600">.net</span> is for sale
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-700">
            Buy this domain outright, or spread the cost with a 12-month lease-to-own plan. Both options check out
            through Spaceship.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <section
            aria-labelledby="buy-now-heading"
            className="flex flex-col rounded-2xl border-2 border-primary-600 bg-white p-6 shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">Own it today</p>
            <h2 id="buy-now-heading" className="mt-1 text-xl font-bold text-neutral-900">
              Buy Now
            </h2>
            <p className="mt-4">
              <span className="text-4xl font-bold text-neutral-900">$25,000</span>{' '}
              <span className="text-sm font-medium text-neutral-500">USD</span>
            </p>
            <p className="mt-1 text-sm text-neutral-600">One-time payment</p>
            <ul className="mb-6 mt-5 space-y-2 text-sm text-neutral-700">
              <li>Full ownership transferred right after payment</li>
              <li>Lowest total price</li>
            </ul>
            <a
              href={BUY_NOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto block rounded-lg bg-primary-600 px-5 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300"
            >
              Buy Now for $25,000
            </a>
          </section>

          <section
            aria-labelledby="lease-heading"
            className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary-700">Pay over time</p>
            <h2 id="lease-heading" className="mt-1 text-xl font-bold text-neutral-900">
              Lease to Own
            </h2>
            <p className="mt-4">
              <span className="text-4xl font-bold text-neutral-900">$30,000</span>{' '}
              <span className="text-sm font-medium text-neutral-500">USD over 12 months</span>
            </p>
            <p className="mt-1 text-sm text-neutral-600">$5,000 first-month payment</p>
            <ul className="mb-6 mt-5 space-y-2 text-sm text-neutral-700">
              <li>Start using the domain after the first payment</li>
              <li>Ownership transfers once the plan is paid in full</li>
            </ul>
            <a
              href={LEASE_TO_OWN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto block rounded-lg border-2 border-primary-600 bg-white px-5 py-3 text-center text-base font-semibold text-primary-700 transition-colors hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-300"
            >
              Start Lease to Own
            </a>
          </section>
        </div>

        <section aria-labelledby="why-heading" className="mt-12">
          <h2 id="why-heading" className="text-xl font-bold text-neutral-900">
            Why Glutathione.net
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-700">
            {HIGHLIGHTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="inquiry-heading" className="mt-12">
          <h2 id="inquiry-heading" className="text-xl font-bold text-neutral-900">
            Questions or an offer?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">
            Send us a message and we&apos;ll reply by email.
          </p>
          <div className="mt-5">
            <DomainInquiryForm />
          </div>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-neutral-500">
          Prices are in US dollars. Payment, escrow and transfer are handled by Spaceship under its terms.
        </p>
      </div>
    </div>
  );
}
