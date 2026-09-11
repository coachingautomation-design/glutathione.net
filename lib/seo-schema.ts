import { Metadata } from 'next';
import { clampDescription } from './seo';

export const SITE_CONFIG = {
  name: 'Glutathione.net',
  domain: 'https://glutathione.net',
  description: 'Compare clinician-prescribed glutathione therapy providers online — format, pricing and state availability.',
  logo: 'https://glutathione.net/icon.svg',
  ogImage: 'https://glutathione.net/icon.svg',
} as const;

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.domain}/#website`,
    name: SITE_CONFIG.name,
    alternateName: 'Glutathione.net',
    url: SITE_CONFIG.domain,
    description: SITE_CONFIG.description,
    publisher: {
      '@id': `${SITE_CONFIG.domain}/#organization`,
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.domain}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: 'Glutathione.net',
    url: SITE_CONFIG.domain,
    logo: {
      '@type': 'ImageObject',
      url: SITE_CONFIG.logo,
      width: 200,
      height: 60,
    },
    image: SITE_CONFIG.ogImage,
    description: SITE_CONFIG.description,
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${SITE_CONFIG.domain}/contact`,
    },
  };
}

export function generateMedicalWebPageSchema({
  name,
  description,
  url,
  medicalCondition,
  lastReviewed,
}: {
  name: string;
  description: string;
  url: string;
  medicalCondition?: string;
  lastReviewed?: string;
}) {
  // Stable review date only — never the build date (avoids fake freshness).
  // When no real review date is supplied, omit the field entirely rather than
  // asserting a default date that never happened.
  // We intentionally do NOT emit `reviewedBy`: this content is editorially
  // researched, not medically reviewed by a verified clinician, so asserting a
  // medical reviewer here would be an unsupported YMYL claim.
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name,
    description,
    url,
    ...(lastReviewed && { lastReviewed }),
    ...(medicalCondition && {
      about: {
        '@type': 'MedicalCondition',
        name: medicalCondition,
      },
    }),
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain,
    },
  };
}

export function generateItemListSchema({
  name,
  description,
  items,
}: {
  name: string;
  description: string;
  // url is optional: only emit URLs that resolve to live pages (never
  // templated review URLs, which permanently redirect).
  items: Array<{ name: string; url?: string; position: number }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      ...(item.url && { url: item.url }),
    })),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqItems: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateBaseMetadata({
  title,
  description: rawDescription,
  canonical,
  noindex = false,
  ogImage,
  languages,
}: {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
  // hreflang alternates, e.g. { 'en-US': '…', 'en-CA': '…', 'x-default': '…' }
  languages?: Record<string, string>;
}): Metadata {
  const description = clampDescription(rawDescription);
  const fullUrl = canonical
    ? canonical.startsWith('http')
      ? canonical
      : canonical.includes('?') || canonical.includes('#') || canonical.endsWith('/')
        ? `${SITE_CONFIG.domain}${canonical}`
        : `${SITE_CONFIG.domain}${canonical}/`
    : undefined;

  const alternates: NonNullable<Metadata['alternates']> = {};
  if (fullUrl) alternates.canonical = fullUrl;
  if (languages) alternates.languages = languages;

  return {
    title,
    description,
    metadataBase: new URL(SITE_CONFIG.domain),
    ...(Object.keys(alternates).length > 0 && { alternates }),
    ...(noindex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    openGraph: {
      title,
      description,
      ...(fullUrl && { url: fullUrl }),
      siteName: SITE_CONFIG.name,
      type: 'website',
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && {
        images: [ogImage],
      }),
    },
  };
}
