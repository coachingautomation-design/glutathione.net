import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/lib/seo-schema';

export const dynamic = 'force-static';

/** Site metadata + API directory for WebMCP discovery — see /mcp.json. */
export function GET() {
  return NextResponse.json(
    {
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain,
      description: SITE_CONFIG.description,
      category: 'glutathione therapy',
      resources: [
        { endpoint: '/api/mcp/providers/', description: 'Ranked glutathione providers with pricing and features' },
        { endpoint: '/llms.txt', description: 'Curated site directory for LLMs' },
        { endpoint: '/llms-full.txt', description: 'Full page content and provider data for LLMs' },
      ],
    },
    { headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' } }
  );
}
