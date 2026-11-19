import type { Metadata } from 'next';
import { Suspense } from 'react';
import localFont from 'next/font/local';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { generateBaseMetadata, generateWebsiteSchema, generateOrganizationSchema, SITE_CONFIG } from '@/lib/seo-schema';
import { TrackingParamsListener } from '@/components/tracking/TrackingParamsListener';
import { TrackEventProvider } from '@/components/tracking/TrackEventProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Fraunces (headings) and Inter (body/UI), self-hosted as in
// bestnadtreatments.com so builds never depend on fonts.gstatic.com. Each file is
// the variable font; latin-ext is chained after latin in the font stacks.
const fraunces = localFont({ src: './fonts/fraunces-latin.woff2', weight: '100 900', display: 'swap', variable: '--font-fraunces' });
const frauncesExt = localFont({ src: './fonts/fraunces-latin-ext.woff2', weight: '100 900', display: 'swap', preload: false, variable: '--font-fraunces-ext' });
const inter = localFont({ src: './fonts/inter-latin.woff2', weight: '100 900', display: 'swap', variable: '--font-inter' });
const interExt = localFont({ src: './fonts/inter-latin-ext.woff2', weight: '100 900', display: 'swap', preload: false, variable: '--font-inter-ext' });

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
    <html lang="en" dir="ltr" className={`${fraunces.variable} ${frauncesExt.variable} ${inter.variable} ${interExt.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="theme-color" content="#0d172c" />
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
      <body className="flex min-h-screen flex-col">
        <TrackingParamsListener />
        <TrackEventProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-copper-dark focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:font-semibold focus:border focus:border-border"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
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
