import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/lib/seo-schema';
import { glutathioneProviders } from '@/data/providers/glutathione';
import { GLUTATHIONE_FAQS } from '../faqs';

export const dynamic = 'force-static';

/**
 * llms-full.txt — the comprehensive counterpart to /llms.txt. Built from the
 * same `glutathioneProviders` array the page itself renders from, rather than
 * a hand-duplicated copy, so this can never fall out of sync with what's
 * actually on the page (the System pricing had drifted stale once already
 * when it was hand-authored copy in two places).
 */
export function GET() {
  const providerSections = glutathioneProviders
    .map((p, i) => {
      const rank = i + 1;
      return `### ${rank}. ${p.name}

- Rating: ${p.rating.toFixed(2)}/10
- Price: ${p.priceRange}
- Summary: ${p.tagline}
- Features: ${p.features.join('; ')}
- Pros: ${p.pros.join('; ')}
- Cons: ${p.cons.join('; ')}
- Best for: ${p.bestFor}`;
    })
    .join('\n\n');

  const faqSection = GLUTATHIONE_FAQS.map((item) => `Q: ${item.q}\nA: ${item.a}`).join('\n\n');

  const body = `# Comprehensive LLM Reference — ${SITE_CONFIG.name}

> ${SITE_CONFIG.description}

## About ${SITE_CONFIG.name}

${SITE_CONFIG.name} is an independent, editorial comparison of online glutathione therapy providers. Our
comparison is a documentary review of what each provider publishes, checked against its own site — we do
not run clinical trials, test medication, or collect patient outcome data, so this page carries no
efficacy scores, success rates or survey results. We may earn a commission when a reader clicks through
to a provider and buys, at no extra cost to them; see ${SITE_CONFIG.domain}/advertising-disclosure/.

## Provider Directory (ranked)

${providerSections}

## Evaluation Criteria

We evaluate providers on: clinician oversight (whether a licensed prescriber reviews intake and is
reachable again to change a dose); pharmacy sourcing (whether the compounding pharmacy is named and
state-licensed); format options (injection, liposomal oral, nasal spray or patch); pricing and
transparency (whether the monthly figure is published before intake and what it becomes after any
introductory period); state availability; and what is bundled (labs, coaching, follow-up, dose
adjustments) versus billed as extras.

## Frequently Asked Questions

${faqSection}

## Key Facts About Glutathione Therapy

- Glutathione is a tripeptide (glutamate, cysteine, glycine) the body produces naturally; it is not
  meaningfully obtained from food.
- Compounded glutathione (injectable, nasal) is not FDA-approved as a finished product; the FDA does not
  review compounded drugs for safety or effectiveness before they reach patients.
- IV glutathione has the highest bioavailability but requires clinic administration and is not shipped by
  any telehealth provider in this comparison.
- Subcutaneous injection is the most common at-home format among the providers ranked here.

## Key Pages

- ${SITE_CONFIG.domain}/ — the ranked comparison, guide and FAQs
- ${SITE_CONFIG.domain}/about/
- ${SITE_CONFIG.domain}/advertising-disclosure/
- ${SITE_CONFIG.domain}/contact/
- ${SITE_CONFIG.domain}/privacy/
- ${SITE_CONFIG.domain}/terms/

## Safety Disclaimer

Content on this site is editorial and informational only. It does not constitute medical advice,
diagnosis or treatment, and does not replace consultation with a licensed clinician. Glutathione therapy
is not FDA-approved to treat, cure or prevent any disease. Individual response varies and no outcome is
promised. Consult a licensed clinician before starting, particularly if pregnant or breastfeeding,
managing a chronic condition, or taking medication that affects liver metabolism.
`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
