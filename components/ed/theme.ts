/**
 * Design tokens for the vertical hub template, carried over from
 * exploretreatments.com's `components/ed/theme.ts` (the file's own comment
 * explains the values were measured off the reference listicle's rendered
 * computed styles, not eyeballed).
 *
 * Trimmed to the ED fallback palette plus the glutathione theme this site
 * actually uses — exploretreatments.com's file also carries a preset per
 * other vertical (sermorelin, NAD+, TRT, …), which this single-hub site has
 * no use for.
 *
 * ## Why these are CSS variables
 *
 * Every token a hub component paints with resolves through a `--hub-*` custom
 * property whose fallback is the original ED value. A page opts into a
 * different palette by passing `theme` to `EdHubPage`, which declares the
 * variables on its root element (see `hubThemeVars`).
 *
 * Because these strings are `var(...)` expressions they must only ever be used
 * in a `style` prop — never as an SVG presentation attribute like
 * `stroke="..."`, which does not resolve custom properties.
 */

/** Rank-tab bar and section headings (`--c-heading`). */
export const ED_HEADING = 'var(--hub-heading, #2153b6)';

/**
 * Header bar for rows 2..N (`--c-card-header`). The reference reserves the
 * darker `ED_HEADING` for the #1 row and its bottom restatement only, which is
 * most of how the top pick reads as the top pick at a glance.
 */
export const ED_CARD_HEADER = 'var(--hub-card-header, #99b9f9)';

/** Every call to action (`--c-primary`). Also the bullet check marks. */
export const ED_CTA = 'var(--hub-cta, #2B6DF1)';

/** Score wording and the provider name above the bullets (`--c-accent`). */
export const ED_ACCENT = 'var(--hub-accent, #084DAA)';

/** Hero band — `--c-light` at 15%. */
export const ED_HERO_BG = 'var(--hub-hero-bg, rgba(128, 167, 247, 0.15))';

/** Rank chip sitting at the left of the header bar. */
export const ED_RANK_CHIP = '#000000';

/** Body copy. */
export const ED_TEXT = '#212529';

export const ED_STAR_FILL = '#F3B42C';
export const ED_STAR_EMPTY = '#E5E5E5';

/** Card and module borders. */
export const ED_BORDER = 'rgba(0,0,0,.125)';
export const ED_FAQ_BORDER = 'rgba(0,0,0,.1)';

/** Card frame: shadow and the asymmetric corner rounding. */
export const ED_CARD_SHADOW = '3px 3px 12px rgba(0,0,0,.4)';
export const ED_CARD_RADIUS = '0 10px';

/**
 * A hub palette. Every field is required so a new vertical cannot half-theme
 * itself and end up with, say, green cards under a blue methodology band.
 */
export type HubTheme = {
  /** Section headings, the #1 row header bar and the methodology band. */
  heading: string;
  /** Header bar for rows 2..N. Carries white text, so keep it mid-tone. */
  cardHeader: string;
  /** Buttons, check marks, bullet dots. The brightest colour in the palette. */
  cta: string;
  /** Provider name and score wording on the ranked rows. */
  accent: string;
  /** Hero band and the interstitial offer banner. */
  heroBg: string;
  /**
   * The hero's readability wash, as bare `r, g, b` channels — the gradient
   * needs the same colour at four different alphas, so it cannot be a hex.
   */
  heroOverlayRgb: string;
  /** Coloured lift under the #1 flashcard, and its hover state. */
  glow: string;
  glowStrong: string;
};

/** ED palette, stated explicitly. Identical to the fallbacks above. */
export const ED_HUB_THEME: HubTheme = {
  heading: '#2153b6',
  cardHeader: '#99b9f9',
  cta: '#2B6DF1',
  accent: '#084DAA',
  heroBg: 'rgba(128, 167, 247, 0.15)',
  heroOverlayRgb: '236, 242, 254',
  glow: 'rgba(43, 109, 241, 0.18)',
  glowStrong: 'rgba(43, 109, 241, 0.30)',
};

/** Glutathione — teal, this site's brand colour. */
export const GLUTATHIONE_HUB_THEME: HubTheme = {
  heading: '#0f766e',
  cardHeader: '#7cc3bd',
  cta: '#0d9488',
  accent: '#115e59',
  heroBg: 'rgba(15, 118, 110, 0.10)',
  heroOverlayRgb: '230, 246, 244',
  glow: 'rgba(13, 148, 136, 0.18)',
  glowStrong: 'rgba(13, 148, 136, 0.30)',
};

/**
 * A theme as the custom-property declarations to put on a hub's root element.
 * Returns `{}` for the ED palette so those pages emit no inline variables at
 * all and keep rendering off the fallbacks.
 */
export function hubThemeVars(theme?: HubTheme): React.CSSProperties {
  if (!theme) return {};
  return {
    '--hub-heading': theme.heading,
    '--hub-card-header': theme.cardHeader,
    '--hub-cta': theme.cta,
    '--hub-accent': theme.accent,
    '--hub-hero-bg': theme.heroBg,
    '--hub-hero-overlay-rgb': theme.heroOverlayRgb,
    '--hub-glow': theme.glow,
    '--hub-glow-strong': theme.glowStrong,
  } as React.CSSProperties;
}
