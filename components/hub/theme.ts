/**
 * Design tokens for the live hub design, matched to bestnadtreatments.com:
 * the navy of the hero band for headings and the rank header bars, copper for
 * every call to action. The original EdHubPage palette is frozen in
 * components/ed/theme.ts for the -v1 pages.
 *
 * Plain values (no CSS variables), so they are safe as SVG attributes too.
 */

/** Section headings and the text on the rank header bars. */
export const HUB_HEADING = '#16264D';
/** Header bar for rows 2..N. */
export const HUB_CARD_HEADER = '#EEF1F6';
/** Light header bar for the #1 card, a warm tint so it still stands out. */
export const HUB_CARD_HEADER_TOP = '#F8E6DA';
/** Every call to action, and the bullet check marks. AA against white text. */
export const HUB_CTA = '#B0542A';
/** Score wording on the ranked rows. */
export const HUB_ACCENT = '#9E4E22';
/** Interstitial offer banner tint (laid over white). */
export const HUB_TINT = 'rgba(194, 98, 45, 0.08)';

export const HUB_RANK_CHIP = '#000000';
export const HUB_TEXT = '#212529';
export const HUB_STAR_FILL = '#F3B42C';
export const HUB_STAR_EMPTY = '#E5E5E5';
export const HUB_BORDER = 'rgba(0,0,0,.125)';
export const HUB_FAQ_BORDER = 'rgba(0,0,0,.1)';
export const HUB_CARD_SHADOW = '3px 3px 12px rgba(0,0,0,.4)';
export const HUB_CARD_RADIUS = '10px';

export function scoreWording(rating: number): string {
  if (rating >= 9.8) return 'Outstanding';
  if (rating >= 9.4) return 'Excellent';
  if (rating >= 9.0) return 'Great';
  if (rating >= 8.5) return 'Very Good';
  return 'Good';
}
