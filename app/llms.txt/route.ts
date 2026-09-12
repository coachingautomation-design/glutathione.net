import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/lib/seo-schema';
import { glutathioneProviders } from '@/data/providers/glutathione';

export const dynamic = 'force-static';

/**
 * llms.txt (llmstxt.org convention) — a concise, curated directory of the
 * site for LLMs and AI agents, distinct from /llms-full.txt's full content
 * dump. Provider names/count are derived from the real roster so this can't
 * drift out of sync the way hand-duplicated copy can.
 */
export function GET() {
  const roster = glutathioneProviders.map((p) => p.name).join(', ');

  const body = `# ${SITE_CONFIG.name}

> ${SITE_CONFIG.description}

${SITE_CONFIG.name} is an independent comparison site. We rank providers on the figures they publish
themselves — format, pharmacy sourcing, state availability and monthly pricing. We do not run
clinical trials, test medication, or collect patient outcome data.

## Pages

- [Best glutathione injections 2026](${SITE_CONFIG.domain}/): Ranked comparison of ${roster}, plus a guide to glutathione therapy formats, cost and FAQs.
- [Best glutathione nasal spray](${SITE_CONFIG.domain}/best-glutathione-nasal-spray/): AgelessRx's needle-free intranasal spray format, format-specific pricing, guide and FAQs.
- [Best glutathione patch providers](${SITE_CONFIG.domain}/best-glutathione-patch/): AgelessRx's needle-free, once-weekly transdermal patch format, format-specific pricing, guide and FAQs.
- [About](${SITE_CONFIG.domain}/about/): What this site is and how it's funded.
- [Advertising Disclosure](${SITE_CONFIG.domain}/advertising-disclosure/): How affiliate compensation relates to the rankings.
- [Contact](${SITE_CONFIG.domain}/contact/)
- [Privacy Policy](${SITE_CONFIG.domain}/privacy/)
- [Terms of Use](${SITE_CONFIG.domain}/terms/)

## Machine-readable data

- [/llms-full.txt](${SITE_CONFIG.domain}/llms-full.txt): Full page content, including every ranked provider's pricing, format and features.
- [/api/mcp/providers/](${SITE_CONFIG.domain}/api/mcp/providers/): JSON list of the ranked providers.
- [/mcp.json](${SITE_CONFIG.domain}/mcp.json): WebMCP manifest describing this site's machine-readable endpoints.

## Disclaimer

Content is editorial and informational only, not medical advice, diagnosis or treatment — see a licensed
clinician for treatment decisions. Compounded glutathione is not an FDA-approved finished product. We may
earn a commission on affiliate links at no extra cost to the reader; see /advertising-disclosure/.
`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
