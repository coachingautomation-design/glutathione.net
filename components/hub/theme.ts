/**
 * Design tokens for the live comparison layout: bestdebtoptions.com's
 * structure in glutathione.net's brown-red palette. The original EdHubPage
 * palette is frozen in components/ed/theme.ts for the -v1 pages.
 *
 * Plain values (no CSS variables), so they are safe as SVG attributes too.
 */

/** Headings, links, table header, sidebar accents. */
export const HUB_HEADING = '#7c2d12';
/** Score tile on the rating box. */
export const HUB_SCORE = '#7c2d12';
/** Every call to action. AA against white text. */
export const HUB_CTA = '#b0542a';
/** Score wording / small accent text. */
export const HUB_ACCENT = '#9e4e22';
/** Featured-pick banner gradient. */
export const HUB_BANNER_GRADIENT = 'linear-gradient(120deg, #4a1a08 0%, #6b2610 60%, #7c2d12 100%)';

export const HUB_TEXT = '#1a1a1a';
export const HUB_STAR_FILL = '#F3B42C';
export const HUB_STAR_EMPTY = '#E5E5E5';
export const HUB_BORDER = '#d1d1d1';

export function scoreWording(rating: number): string {
  if (rating >= 9.8) return 'Outstanding';
  if (rating >= 9.4) return 'Excellent';
  if (rating >= 9.0) return 'Great';
  if (rating >= 8.5) return 'Very Good';
  return 'Good';
}
