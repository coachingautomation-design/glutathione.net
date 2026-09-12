import type { Provider } from './types';

/**
 * AgelessRx's patch format, isolated for the /best-glutathione-patch/ page —
 * same relationship to ./glutathione.ts as ./glutathione-nasal-spray.ts (see
 * that file's header comment). Pricing and the affiliate URL are the same
 * ones AgelessRx publishes on the shared entry.
 */
export const glutathionePatchProviders: Provider[] = [
  {
    slug: 'agelessrx',
    name: 'AgelessRx',
    logoText: 'AgelessRx',
    logoUrl: 'https://assets.explorets.com/agelessrx-logo.svg',
    rating: 9.78,
    stars: 4.9,
    tagline: 'Once-weekly, and completely needle-free.',
    shortDescription: 'AgelessRx\'s glutathione patch is a once-weekly, needle-free transdermal option that uses iontophoresis to absorb through the skin. It\'s billed at $180 per kit, quarterly, with a 100% online medical evaluation and free shipping from a US-licensed pharmacy — you pay only if a licensed provider approves.',
    badges: ['Needle-Free', 'Once-Weekly'],
    affiliate: {
      url: 'https://join.agelessrx.com/energy/glutathione/ns/aff/?_ef_transaction_id=&utm_source=everflow&utm_medium=affiliate&utm_campaign=&oid=6&affid=11&sub1=1896&sub5=&oid2=6004&affid2=1896',
      network: 'everflow',
    },
    features: [
      'Iontophoresis, absorbed through the skin',
      'Whole-body support, no needles',
      'One patch a week',
    ],
    pros: [
      'Completely needle-free — no injection, no daily spray',
      'Whole-body support, not a single-system focus',
      'Just one patch a week — the lowest-effort routine of AgelessRx\'s three formats',
      'Pay only if a licensed provider approves, free shipping either way',
      'Backed by an established longevity platform with 197,000+ customers served',
    ],
    cons: [
      'Billed quarterly at $180 per kit rather than a simple monthly figure',
      'Compounded glutathione, not an FDA-approved finished product',
      'Transdermal absorption is not the same as injection — a route trade, not a strict upgrade',
    ],
    priceRange: '$180 per kit, billed quarterly',
    bestFor: 'Patients who want whole-body glutathione support with the least effort — no needles, no daily routine, just one patch a week',
    faq: [
      {
        question: 'What is the AgelessRx glutathione patch?',
        answer: 'It\'s a once-weekly transdermal patch — no needles, no daily spray. AgelessRx uses iontophoresis, a mild electrical current, to move glutathione through the skin rather than requiring an injection or oral dose.',
      },
      {
        question: 'How much does the AgelessRx patch cost?',
        answer: 'The patch is billed at $180 per kit, quarterly. That includes a 100% online medical evaluation and free shipping from a US-licensed pharmacy, and you pay only if a licensed provider approves your request.',
      },
      {
        question: 'How does iontophoresis work?',
        answer: 'Iontophoresis uses a mild electrical current to help a compound pass through the skin barrier, rather than needing an injection to bypass it. It\'s the mechanism behind AgelessRx\'s needle-free patch.',
      },
      {
        question: 'Is the AgelessRx glutathione patch FDA-approved?',
        answer: 'No. Like AgelessRx\'s other glutathione formats, the patch is a compounded preparation from a licensed pharmacy, not an FDA-approved finished product. The FDA does not review compounded drugs for safety or effectiveness before they reach patients — a licensed provider evaluates your intake before anything ships.',
      },
    ],
  },
];
