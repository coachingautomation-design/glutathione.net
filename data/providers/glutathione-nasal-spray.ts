import type { Provider } from './types';

/**
 * Nasal-spray formats, isolated for the /best-glutathione-nasal-spray/ page.
 * Both AgelessRx and ReadyRx also carry entries in ./glutathione.ts that
 * cover their full formulary (AgelessRx: injection, spray, patch; ReadyRx:
 * injection, spray) with one shared tagline each; these are separate,
 * single-format Provider entries so the card headline and bullets on this
 * page can speak to the spray specifically. Pricing and the affiliate URLs
 * are the same ones each provider publishes on its shared entry — nothing
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
      'Studied for raising brain glutathione',
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
  {
    // Rating/stars carried over from ReadyRx's shared entry in ./glutathione.ts
    // (lib/ratings.ts RATING_MAP position 7), not a hand-picked number.
    slug: 'readyrx',
    name: 'ReadyRx',
    logoText: 'ReadyRx',
    logoUrl: 'https://readyhealth.everflowclient.io/logo.png',
    rating: 8.96,
    stars: 4.48,
    tagline: 'From $84 per dose. No membership.',
    shortDescription: 'ReadyRx offers clinician-prescribed glutathione nasal spray priced per dose at $84, with no recurring monthly membership required. Every order includes a 100% online consultation with a licensed provider and free 1–2 day shipping, and you can cancel anytime.',
    badges: ['No Membership', 'Format Choice'],
    affiliate: {
      url: 'https://www.dpy84ben.com/6MW5NB/SL1HB/',
      network: 'everflow',
    },
    features: [
      '100% online consultation with licensed provider',
      'Free 1–2 day shipping',
      'HSA/FSA eligible, cancel anytime',
    ],
    pros: [
      'No recurring monthly membership — pay per dose, cancel anytime',
      '100% online consultation with a licensed provider',
      'Free shipping with 1–2 day delivery',
      'HSA/FSA eligible',
      'Also offers an injectable format if you want to switch routes later',
    ],
    cons: [
      'No flat monthly subscription price — cost is per dose',
      'Compounded glutathione, not an FDA-approved finished product',
    ],
    priceRange: 'From $84 per dose',
    bestFor: 'Patients who want a needle-free nasal spray without committing to a recurring monthly membership',
    faq: [
      {
        question: 'How much does ReadyRx\'s nasal spray cost?',
        answer: 'ReadyRx prices its glutathione nasal spray at $84 per dose, with no recurring monthly membership fee. You can cancel anytime.',
      },
      {
        question: 'Does ReadyRx\'s nasal spray require a subscription?',
        answer: 'No. ReadyRx prices the spray per dose rather than as a flat monthly subscription, so you pay $84 each time rather than committing to a recurring membership.',
      },
      {
        question: 'How fast does ReadyRx ship the nasal spray?',
        answer: 'ReadyRx includes free shipping with 1–2 day delivery on every order once a licensed provider approves your consultation.',
      },
      {
        question: 'Is ReadyRx\'s glutathione nasal spray FDA-approved?',
        answer: 'No. ReadyRx sources compounded glutathione from a licensed U.S. pharmacy; compounded drugs are not FDA-approved and are not reviewed for safety or effectiveness before reaching patients. A 100% online consultation with a licensed provider is required before anything ships.',
      },
    ],
  },
];
