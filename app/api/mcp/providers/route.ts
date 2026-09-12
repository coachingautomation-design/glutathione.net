import { NextResponse } from 'next/server';
import { glutathioneProviders } from '@/data/providers/glutathione';

export const dynamic = 'force-static';

/**
 * Structured, machine-readable provider data for AI agents (WebMCP). Mirrors
 * exactly what's rendered on the page — same source array — just as JSON.
 * `min_rating` and `max_price` aren't implemented as query filters yet since
 * the roster is only 6 providers; the whole list is returned every time.
 */
export function GET() {
  const providers = glutathioneProviders.map((p, i) => ({
    rank: i + 1,
    slug: p.slug,
    name: p.name,
    rating: p.rating,
    priceRange: p.priceRange,
    tagline: p.tagline,
    features: p.features,
    pros: p.pros,
    cons: p.cons,
    bestFor: p.bestFor,
  }));

  return NextResponse.json(
    { category: 'glutathione', count: providers.length, providers },
    { headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' } }
  );
}
