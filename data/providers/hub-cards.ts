import type { EdHubProvider } from '@/components/ed/types';
import { getCustomReviewPath } from '@/lib/custom-reviews';
import { fallbackVotes } from '@/lib/ratings';
import type { Provider } from './types';

/**
 * Roster adapter for the hub template (`components/ed/EdHubPage`).
 *
 * The ED hubs read from hand-curated, ED-shaped data and have their own
 * adapters in `./ed-hub.ts`. Every other vertical — sermorelin, NAD+,
 * glutathione — stores providers in the standard `Provider` shape from
 * `./types.ts`, and this maps that shape onto the narrower structural type the
 * hub cards read.
 *
 * Rules for editing, same as `./ed-hub.ts`:
 *  - Never invent a rating or a vote count here. Ratings come with the provider
 *    data; vote counts are either authored on the provider, passed in by a page
 *    that already publishes them, or derived by the same deterministic slug
 *    hash the rest of the site uses — so the number for a provider does not
 *    change as a reader moves between pages.
 *  - Affiliate URLs pass through untouched — `{clickid}` placeholders and
 *    author-supplied `sub1=` values included.
 */

export type HubCardOptions = {
  /**
   * Vertical the standalone-review lookup runs against. Often differs from the
   * tracking vertical: the glutathione page resolves its review links under
   * 'glutathione' while tracking under 'NAD-treatments'.
   */
  reviewVertical: string;
  /**
   * Vote counts already published for these providers, by slug. Anything not
   * listed falls back to the provider's own `userVotes`, then to the shared
   * slug hash.
   */
  votes?: Record<string, number>;
  /**
   * Curated positioning labels by slug — a differentiator, not a compliment.
   * The card `bestFor` slot is a single short line, and provider `bestFor`
   * fields in this shape are full sentences ("Patients who want the most
   * clinically rigorous, physician-supervised…"), which read as a fragment when
   * trimmed. Pages author the line for every provider they rank; anything
   * missing falls back to the trimmed sentence.
   */
  positioning?: Record<string, string>;
  /** Positioning label when a provider has no usable `bestFor`. */
  fallbackBestFor?: string;
};

/**
 * A short positioning label. `bestFor` renders inside a single-line offer
 * banner, so the full sentence most provider entries carry would be clipped —
 * it is cut at its first clause and capped.
 *
 * Provider `badges` are deliberately NOT used. They are marketing chips
 * ("Top Rated", "4.9 · 10,000+ Reviews"), and a review-count claim rendered in
 * a positioning slot reads as social proof we have not verified.
 */
function shortBestFor(bestFor: string | undefined, fallback: string): string {
  if (!bestFor) return fallback;
  const clause = bestFor.split(/[,—.:;]/)[0].trim();
  if (!clause) return fallback;
  if (clause.length <= 46) return clause;
  const cut = clause.slice(0, 46);
  const lastSpace = cut.lastIndexOf(' ');
  return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}…`;
}

/**
 * The card headline: "what it is, then the number that matters". Providers
 * authored for the card-style listings carry this as `tagline`; the few that do
 * not fall back to the first sentence of their description.
 */
function headline(provider: Provider): string {
  if (provider.tagline) return provider.tagline;
  const sentence = provider.shortDescription.split(/(?<=\.)\s/)[0];
  return sentence.length <= 120 ? sentence : `${sentence.slice(0, 117).trimEnd()}…`;
}

/**
 * Maps an ordered provider list onto hub cards. Rank is the position in the
 * array, so the caller controls the ranking exactly as it does today.
 */
export function hubProvidersFromProviders(
  providers: Provider[],
  { reviewVertical, votes = {}, positioning = {}, fallbackBestFor = 'Online care' }: HubCardOptions
): EdHubProvider[] {
  return providers.map((provider, index) => ({
    slug: provider.slug,
    name: provider.name,
    logoUrl: provider.logoUrl ?? '',
    logoText: provider.logoText,
    tagline: headline(provider),
    bestFor: positioning[provider.slug] ?? shortBestFor(provider.bestFor, fallbackBestFor),
    differentiators: provider.features,
    affiliateUrl: provider.affiliate.url,
    rating: provider.rating,
    userVotes: votes[provider.slug] ?? provider.userVotes ?? fallbackVotes(provider.slug),
    reviewPath: getCustomReviewPath(reviewVertical, provider.slug),
    rank: index + 1,
  }));
}
