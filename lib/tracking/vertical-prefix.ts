/**
 * Maps URL pathnames to vertical event prefixes for Meta CAPI and other event naming.
 *
 * Prefixes chosen to avoid resemblance to medication/healthcare abbreviations:
 *   wl = weight-loss, tr = trt, hr = hrt, em = ed, nd = nad-therapy,
 *   se = sermorelin, gl = glutathione, og = oral-glp1,
 *   hl = hair-loss, tl = telehealth, th = therapy, nu = nutrition,
 *   sk = skincare, pc = primary-care, aa = anti-aging, bm = biomarker,
 *   mn = men, wn = women, et = homepage / everything-else
 */

const ROUTE_PREFIX_MAP: Array<[string | RegExp, string]> = [
  // Exact route prefixes (order matters — more specific first)
  ['/oral-glp1', 'og'],
  ['/oral-glp-1', 'og'],
  ['/weight-loss', 'wl'],
  ['/nad-therapy', 'nd'],
  ['/nad/', 'nd'],
  ['/sermorelin', 'se'],
  ['/glutathione', 'gl'],
  ['/hair-loss', 'hl'],
  ['/hairloss', 'hl'],
  ['/telehealth', 'tl'],
  ['/therapy', 'th'],
  ['/nutrition', 'nu'],
  ['/skincare', 'sk'],
  ['/primary-care', 'pc'],
  ['/anti-aging', 'aa'],
  ['/biomarker', 'bm'],
  ['/women', 'wn'],
  ['/men', 'mn'],
  ['/trt', 'tr'],
  ['/hrt', 'hr'],

  // /ed is tricky — must not match /education, /editorial, etc.
  [/^\/ed(\/|$)/, 'em'],

  // Review page slug keywords (standalone review articles)
  [/oral.?glp/i, 'og'],
  [/weight.loss/i, 'wl'],
  [/\bglp.?1\b/i, 'wl'],
  [/semaglutide/i, 'wl'],
  [/tirzepatide/i, 'wl'],
  [/testosterone/i, 'tr'],
  [/-trt-/i, 'tr'],
  [/hormone.replacement/i, 'hr'],
  [/-hrt-/i, 'hr'],
  [/erectile/i, 'em'],
  [/-ed-/i, 'em'],
  [/nad.therapy/i, 'nd'],
  [/sermorelin/i, 'se'],
  [/glutathione/i, 'gl'],
];

/**
 * Returns the two-letter event prefix for a given URL pathname.
 * Falls back to 'et' for the homepage and any unrecognised paths.
 */
export function getVerticalPrefix(pathname: string): string {
  const p = pathname.toLowerCase();

  for (const [matcher, prefix] of ROUTE_PREFIX_MAP) {
    if (typeof matcher === 'string') {
      if (p === matcher || p.startsWith(matcher + '/')) return prefix;
    } else {
      if (matcher.test(pathname)) return prefix;
    }
  }

  return 'et';
}
