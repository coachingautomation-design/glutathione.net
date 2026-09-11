/**
 * The provider shape every ED hub surface renders from.
 *
 * `/best-ed-providers/` reads its roster from the hand-curated
 * `data/providers/ed-comparison.ts` (`RankedEdProvider`), but the other ED hubs
 * own different rosters — the ED-care provider list, the combination-formula
 * list in `data/ed-medications.ts` — and must not have their offers or
 * affiliate URLs swapped out just to share a layout. So the card components take
 * this narrower structural type instead: it is exactly the fields the ranked
 * row, the flashcard strip and the sidebar actually read.
 *
 * `RankedEdProvider` satisfies it as-is; the adapters in
 * `data/providers/ed-hub.ts` map the other rosters onto it.
 */
export type EdHubProvider = {
  slug: string;
  name: string;
  /** Empty string falls back to `logoText`. */
  logoUrl: string;
  logoText: string;
  /** Punchy one-liner: what it is, then the number that matters. */
  tagline: string;
  /** Positioning badge — a differentiator, not a compliment. */
  bestFor: string;
  /** 3–5 benefit bullets; only the first five render. */
  differentiators: string[];
  affiliateUrl: string;
  rating: number;
  userVotes: number;
  /** ExploreTreatments standalone review, when one exists. */
  reviewPath: string | null;
  /** Position in the visible list, 1-based. */
  rank: number;
};
