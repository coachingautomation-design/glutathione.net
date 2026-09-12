import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/lib/seo-schema';

export const dynamic = 'force-static';

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE_CONFIG.domain}/sitemap.xml
`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
