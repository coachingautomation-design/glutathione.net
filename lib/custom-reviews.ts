/**
 * Standalone review lookup.
 *
 * exploretreatments.com maps provider slugs to hand-written standalone review
 * articles here (`CUSTOM_REVIEW_ARTICLES`). This site launches with the
 * glutathione hub page only — no standalone review articles yet — so this
 * always returns null. When a standalone review is added for a provider on
 * this page, register it here as `{ vertical: { providerSlug: '/review-slug/' } }`
 * the same way exploretreatments.com does.
 */
export function getCustomReviewPath(_vertical: string, _providerSlug: string): string | null {
  return null;
}
