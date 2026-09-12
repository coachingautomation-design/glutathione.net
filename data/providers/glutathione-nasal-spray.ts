import type { Provider } from './types';

/**
 * AgelessRx's nasal-spray format, isolated for the /best-glutathione-nasal-spray/
 * page. AgelessRx's main entry in ./glutathione.ts covers all three of its
 * formats (injection, spray, patch) with one shared tagline; this is a
 * separate, single-format Provider entry so the card headline and bullets on
 * this page can speak to the spray specifically. Pricing and the affiliate
 * URL are the same ones AgelessRx publishes on the shared entry — nothing
 * here is invented.
 */
export const glutathioneNasalSprayProviders: Provider[] = [
  {
    slug: 'agelessrx',
    name: 'AgelessRx',
    logoText: 'AgelessRx',
    logoUrl: 'https://assets.explorets.com/agelessrx-logo.svg',
    rating: 9.78,
    stars: 4.9,
    tagline: 'From $90/mo, made for mental clarity.',
    shortDescription: 'AgelessRx\'s glutathione nasal spray is a once-daily, needle-free intranasal formulation built for mental clarity and focus rather than injection. It starts at $90 for the first month, renewing at $110/month, with a 100% online medical evaluation and free shipping from a US-licensed pharmacy — you pay only if a licensed provider approves.',
    badges: ['Needle-Free', 'Daily Routine'],
    affiliate: {
      url: 'https://join.agelessrx.com/energy/glutathione/ns/aff/?utm_source=everflow&utm_medium=affiliate&utm_campaign=GSHInjection_CPA_Evergreen_Affiliate&utm_content=glutathione&utm_term=aff11&_ef_transaction_id=&oid=6&affid=11&sub1=1896&sub5=&oid2=6004&affid2=1896',
      network: 'everflow',
    },
    features: [
      'Intranasal delivery, no needles',
      'Made for mental clarity and focus',
      'Simple daily routine',
    ],
    pros: [
      'Needle-free — a spray, not an injection',
      'Intranasal route studied for raising glutathione levels in the brain specifically',
      'Simple once-daily routine, no self-injection technique to learn',
      'Pay only if a licensed provider approves, free shipping either way',
      'Backed by an established longevity platform with 197,000+ customers served',
    ],
    cons: [
      'Renews at $110/month after the $90 first month',
      'Compounded glutathione, not an FDA-approved finished product',
      'Intranasal absorption differs from injection — a route trade, not a strict upgrade',
    ],
    priceRange: 'From $90 first month, then $110/month',
    bestFor: 'Patients who want a needle-free, once-daily glutathione routine built around mental clarity and focus rather than whole-body injection',
    faq: [
      {
        question: 'What is intranasal glutathione?',
        answer: 'It\'s glutathione delivered as a nasal spray rather than an injection — absorbed through the nasal mucosa once daily. AgelessRx positions its spray for mental clarity and focus, distinct from the whole-body support its injectable format targets.',
      },
      {
        question: 'How much does AgelessRx\'s nasal spray cost?',
        answer: 'The spray is $90 for the first month, then $110/month. That includes a 100% online medical evaluation and free shipping from a US-licensed pharmacy, and you pay only if a licensed provider approves your request.',
      },
      {
        question: 'Why choose the nasal spray over an injection?',
        answer: 'Intranasal glutathione has been studied for raising glutathione levels in the brain specifically, which is why AgelessRx markets the spray around mental clarity and focus. It\'s also needle-free and fits into a simple daily routine — the injection, by contrast, is the more direct route for whole-body antioxidant support.',
      },
      {
        question: 'Is AgelessRx\'s glutathione nasal spray FDA-approved?',
        answer: 'No. Like AgelessRx\'s other glutathione formats, the nasal spray is a compounded preparation from a licensed pharmacy, not an FDA-approved finished product. The FDA does not review compounded drugs for safety or effectiveness before they reach patients — a licensed provider evaluates your intake before anything ships.',
      },
    ],
  },
];
