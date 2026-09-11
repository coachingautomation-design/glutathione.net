export const RATING_MAP: Record<number, number> = {
  1: 9.93,
  2: 9.81,
  3: 9.68,
  4: 9.52,
  5: 9.37,
  6: 9.21,
  7: 8.96,
  8: 8.74,
  9: 8.42,
  10: 7.8,
  11: 7.75,
  12: 7.71,
  13: 7.66,
  14: 7.6,
  15: 7.55,
  16: 7.49,
  17: 7.42,
  18: 7.34,
  19: 7.18,
  20: 7,
};

export const getRatingByPosition = (position: number): number => RATING_MAP[position] ?? 7.0;

export const getStarValueFromRating = (rating: number): number => Number((rating / 2).toFixed(2));

export const formatRating = (rating: number): string => `${rating.toFixed(2)}`;

export const applyPositionBasedRatings = <T extends { rating: number; stars: number }>(providers: T[]): T[] =>
  providers.map((provider, index) => {
    const rating = getRatingByPosition(index + 1);

    return {
      ...provider,
      rating,
      stars: getStarValueFromRating(rating),
    };
  });

/**
 * Stable pseudo-vote count for providers with no authored `userVotes`. Derived
 * from the slug so server and client agree — Math.random() here would produce a
 * hydration mismatch.
 *
 * It lives here rather than beside the card that first used it because the hub
 * template needs the same number for the same provider: a reader moving between
 * /NAD-treatments/ and a sub-comparison page must not see the vote count change
 * under them.
 */
export const fallbackVotes = (slug: string): number => {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return 4200 + (hash % 11800);
};

/**
 * Word for a 0–10 editorial score.
 *
 * Lives here rather than in `AffordableProviderCard` because that module is
 * `'use client'`: a server component can render a client *component*, but
 * calling a plain function exported from a client module throws at build time.
 */
export const scoreWording = (s: number): string => {
  if (s >= 9.9) return 'Outstanding';
  if (s >= 9.5) return 'Excellent';
  if (s >= 9.0) return 'Very Good';
  if (s >= 8.5) return 'Good';
  return 'Fair';
};
