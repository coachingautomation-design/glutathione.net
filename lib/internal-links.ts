/**
 * A related-content link, as rendered in the hub template's sidebar and guide
 * "more guides" modules.
 *
 * exploretreatments.com's `lib/internal-links.ts` derives these from a large
 * cross-vertical link graph (guides, comparisons, vs-pages). This site is a
 * single hub page with no guide library or comparison library of its own, so
 * only the shared type is kept here — every hub component that references
 * `RelatedLink` still compiles, and the page simply passes an empty list.
 */
export type RelatedLink = { href: string; label: string; description?: string };
