import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { generateBaseMetadata, generateWebsiteSchema, generateOrganizationSchema, SITE_CONFIG } from '@/lib/seo-schema';
import { TrackingParamsListener } from '@/components/tracking/TrackingParamsListener';
import { TrackEventProvider } from '@/components/tracking/TrackEventProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  ...generateBaseMetadata({
    title: 'Glutathione.net | Compare Glutathione Therapy Providers',
    description: 'Compare clinician-prescribed glutathione therapy providers online, by format, price and state availability.',
  }),
  metadataBase: new URL(SITE_CONFIG.domain),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="theme-color" content="#0d9488" />
        <meta name="format-detection" content="telephone=no" />

        {/* AI / LLM discoverability */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Reference (llms.txt)" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="Comprehensive LLM Reference" />

        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" title="Sitemap" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <TrackingParamsListener />
        <TrackEventProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-primary-700 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:font-semibold focus:border focus:border-primary-300"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </TrackEventProvider>
        <Suspense>
          <Analytics />
        </Suspense>
        <Suspense>
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  );
}
