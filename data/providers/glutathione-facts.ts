import { glutathioneProviders } from './glutathione';
import type { Provider } from './types';

/**
 * Comparison facts for the glutathione landing pages, one row per provider in
 * ./glutathione.ts. Every figure here is restated from that provider's own entry
 * (its tagline, shortDescription, priceRange, features, pros and cons), which in
 * turn is what the provider publishes. Nothing is estimated: where a provider
 * does not publish a figure, the field says so and the numeric field is null.
 */
export type GlutathioneFacts = {
  slug: string;
  /** Delivery formats the provider publishes for glutathione. */
  formats: string[];
  /** True when a subcutaneous injection is one of the published formats. */
  injection: boolean;
  /** Lowest published price to start, for sorting. Null when not published. */
  entryPrice: number | null;
  /** The entry price as the provider frames it. */
  entryLabel: string;
  /** What it costs after the entry offer. */
  ongoingLabel: string;
  /** Lowest published recurring monthly price, for sorting. Null when not published. */
  ongoingPrice: number | null;
  /** What sits inside the price. */
  included: string;
  /** The one thing to check before buying. */
  watchOut: string;
  /** Injection format only: published first-order price. Null when not published or no injection. */
  injectionEntry: number | null;
  /** Injection format only: published recurring monthly price. Null when not published or per-dose. */
  injectionMonthly: number | null;
  /** Injection dose, supply and frequency as published. */
  injectionDose: string;
};

export const GLUTATHIONE_FACTS: Record<string, GlutathioneFacts> = {
  system: {
    slug: 'system',
    formats: ['Injection'],
    injection: true,
    entryPrice: 69,
    entryLabel: '$69 first month',
    ongoingLabel: '$133/month',
    ongoingPrice: 133,
    included: '2000mg monthly supply, injection supplies, 20% off a Rythm blood test, 2-day cold-chain shipping',
    watchOut: 'Price nearly doubles to $133/month after month one',
    injectionEntry: 69,
    injectionMonthly: 133,
    injectionDose: '2000mg monthly supply, injection supplies included',
  },
  agelessrx: {
    slug: 'agelessrx',
    formats: ['Injection', 'Nasal spray', 'Patch'],
    injection: true,
    entryPrice: 90,
    entryLabel: 'From $90 (spray); injection $99 first month',
    ongoingLabel: 'Injection $149/month; spray $110/month; patch $180/kit quarterly',
    ongoingPrice: 110,
    included: 'Online medical evaluation, free shipping, pause or cancel anytime',
    watchOut: 'Injection renews at $149/month after the $99 first month',
    injectionEntry: 99,
    injectionMonthly: 149,
    injectionDose: 'Weekly injection',
  },
  readyrx: {
    slug: 'readyrx',
    formats: ['Injection', 'Nasal spray'],
    injection: true,
    entryPrice: 84,
    entryLabel: '$84 per dose',
    ongoingLabel: '$84 per dose, no membership',
    ongoingPrice: null,
    included: 'Online consultation, free 1–2 day shipping, HSA/FSA eligible',
    watchOut: 'Priced per dose, so the monthly total depends on your dosing',
    injectionEntry: 84,
    injectionMonthly: null,
    injectionDose: 'Priced per dose; dosing set by your clinician',
  },
  hone: {
    slug: 'hone',
    formats: ['Not stated'],
    injection: false,
    entryPrice: 99,
    entryLabel: 'From about $99/month',
    ongoingLabel: 'From about $99/month',
    ongoingPrice: 99,
    included: 'Comprehensive lab testing, personalised protocol, ongoing monitoring',
    watchOut: 'Longer intake than the five-minute signups',
    injectionEntry: null,
    injectionMonthly: null,
    injectionDose: 'Format not stated',
  },
  shed: {
    slug: 'shed',
    formats: ['Injection'],
    injection: true,
    entryPrice: null,
    entryLabel: '20% off first month',
    ongoingLabel: 'Not published before signup',
    ongoingPrice: null,
    included: 'Health coaching, same-day shipping on approved orders, month-to-month',
    watchOut: 'Plan price is not published before you complete signup',
    injectionEntry: null,
    injectionMonthly: null,
    injectionDose: 'Not published before signup',
  },
  eden: {
    slug: 'eden',
    formats: ['Injection'],
    injection: true,
    entryPrice: 95,
    entryLabel: '$95 first month',
    ongoingLabel: 'Not published',
    ongoingPrice: null,
    included: 'Online consultation, free expedited shipping, no-cost follow-ups, FSA/HSA eligible',
    watchOut: 'Renewal price is not published on its glutathione page',
    injectionEntry: 95,
    injectionMonthly: null,
    injectionDose: 'Personalised dosing; dose not published',
  },
  lttl: {
    slug: 'lttl',
    formats: ['Injection'],
    injection: true,
    entryPrice: 79,
    entryLabel: 'From $79/month',
    ongoingLabel: 'From $79/month, same price at every dose',
    ongoingPrice: 79,
    included: 'Online visit and prescription, free 1–2 day shipping, cancel anytime',
    watchOut: 'Monthly supply and frequency not published before the consultation',
    injectionEntry: 79,
    injectionMonthly: 79,
    injectionDose: '200mg injections; schedule set by your clinician',
  },
  embody: {
    slug: 'embody',
    formats: ['Injection'],
    injection: true,
    entryPrice: 99,
    entryLabel: 'Flat $99/month',
    ongoingLabel: 'Flat $99/month',
    ongoingPrice: 99,
    included: 'Telemed visit and prescription, 200mg–2000mg dosing, free 1–2 day shipping',
    watchOut: 'Sale pricing is time-limited',
    injectionEntry: 99,
    injectionMonthly: 99,
    injectionDose: 'Personalised dosing from 200mg to 2000mg',
  },
  bmimd: {
    slug: 'bmimd',
    formats: ['Injection'],
    injection: true,
    entryPrice: null,
    entryLabel: 'Not published',
    ongoingLabel: 'Not published',
    ongoingPrice: null,
    included: 'Free shipping, licensed U.S. compounding pharmacy',
    watchOut: 'Not available in AR, CA, LA, MS or SC',
    injectionEntry: null,
    injectionMonthly: null,
    injectionDose: 'Not published',
  },
  taurus: {
    slug: 'taurus',
    formats: ['Injection'],
    injection: true,
    entryPrice: 79,
    entryLabel: '$79 first month (about $10.75/shot)',
    ongoingLabel: '$179/month',
    ongoingPrice: 179,
    included: 'Home injection kit (200mg/mL, 5mL bottle), HSA/FSA eligible',
    watchOut: 'Highest ongoing price on the page at $179/month',
    injectionEntry: 79,
    injectionMonthly: 179,
    injectionDose: '200mg/mL, 5mL bottle, home injection kit',
  },
  'joi-plus-blokes': {
    slug: 'joi-plus-blokes',
    formats: ['Injection'],
    injection: true,
    entryPrice: 69,
    entryLabel: '$69/month subscribe & save',
    ongoingLabel: '$69/month subscribe & save; $86/month one-time',
    ongoingPrice: 69,
    included: 'Clinician consultation, 1:1 health coaching, unlimited care-team messaging',
    watchOut: 'Dosed 1–2 times a week rather than once',
    injectionEntry: 69,
    injectionMonthly: 69,
    injectionDose: '1–2 injections a week from a 15-week supply',
  },
};

export function factsFor(slug: string): GlutathioneFacts {
  const facts = GLUTATHIONE_FACTS[slug];
  if (!facts) throw new Error(`No glutathione facts for "${slug}"`);
  return facts;
}

/** The injection pages list at most this many providers. */
export const MAX_INJECTION_PROVIDERS = 7;

/** Providers that publish a subcutaneous injection format, in editorial order, capped at MAX_INJECTION_PROVIDERS. */
export const injectionProviders: Provider[] = glutathioneProviders
  .filter((p) => factsFor(p.slug).injection)
  .slice(0, MAX_INJECTION_PROVIDERS);

/**
 * Six months of the injection format at the published rates: the entry price
 * once, then five months at the recurring price. Null unless both are published.
 */
export function sixMonthInjectionCost(slug: string): number | null {
  const { injectionEntry, injectionMonthly } = factsFor(slug);
  if (injectionEntry == null || injectionMonthly == null) return null;
  return injectionEntry + 5 * injectionMonthly;
}

export const usd = (n: number | null | undefined, fallback = 'Not published') => (n == null ? fallback : `$${n.toLocaleString('en-US')}`);

/** Reorders providers to follow a list of slugs; any not listed keep their order at the end. */
export function orderBySlugs(providers: Provider[], slugs: string[]): Provider[] {
  const listed = slugs.map((slug) => providers.find((p) => p.slug === slug)).filter((p): p is Provider => !!p);
  return [...listed, ...providers.filter((p) => !slugs.includes(p.slug))];
}
