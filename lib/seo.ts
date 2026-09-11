import type { Metadata } from 'next';
import { siteConfig } from './utils';

/**
 * Bing flags meta descriptions outside ~25–160 chars ("Meta Description too
 * long or too short"), which per its Webmaster Guidelines can reduce indexing
 * reliability and ranking. Truncates on a word boundary.
 */
export const clampDescription = (text: string, max = 160): string => {
  const t = text.trim().replace(/\s+/g, ' ');
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

export const buildMetadata = ({
  title,
  description: rawDescription,
  path,
  ogImage
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata => {
  const description = clampDescription(rawDescription);
  const normalizedPath = path.endsWith('/') || path.includes('?') || path.includes('#') ? path : `${path}/`;
  const canonicalUrl = `${siteConfig.url}${normalizedPath}`;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: 'website',
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }),
    },
    twitter: { card: 'summary_large_image', title, description, ...(ogImage && { images: [ogImage] }) }
  };
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US'
  }
};
