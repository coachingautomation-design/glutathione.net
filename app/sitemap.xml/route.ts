import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/lib/seo-schema';

export const dynamic = 'force-static';

/**
 * Every real, indexable URL on the site. This is a single sitemap (not a
 * sitemapindex) because the site is one hub page plus a handful of static
 * legal pages — there is no per-vertical or per-review sub-sitemap to split
 * out yet.
 */
const PAGES: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/best-glutathione-nasal-spray/', priority: '0.9', changefreq: 'weekly' },
  { path: '/best-glutathione-patch/', priority: '0.9', changefreq: 'weekly' },
  { path: '/about/', priority: '0.3', changefreq: 'monthly' },
  { path: '/advertising-disclosure/', priority: '0.3', changefreq: 'monthly' },
  { path: '/contact/', priority: '0.3', changefreq: 'monthly' },
  { path: '/buy-this-domain/', priority: '0.3', changefreq: 'monthly' },
  { path: '/privacy/', priority: '0.2', changefreq: 'yearly' },
  { path: '/terms/', priority: '0.2', changefreq: 'yearly' },
];

export function GET() {
  const urls = PAGES.map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_CONFIG.domain}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
