import {
  GuideCallout,
  GuideCardLabel,
  GuideContents,
  GuideHeading,
  GuideLink,
  GuideList,
  GuideNote,
  GuideTable,
  GuideText,
} from '@/components/hub/HubGuide';
import { HubPage } from '@/components/hub/HubPage';
import { HubProviderRow } from '@/components/hub/HubProviderRow';
import { scoreWording } from '@/components/hub/theme';
import { factsFor, injectionProviders } from '@/data/providers/glutathione-facts';
import { hubProvidersFromProviders } from '@/data/providers/hub-cards';
import { generateBaseMetadata } from '@/lib/seo-schema';

/**
 * /top-ranked-glutathione-injections/ — injection providers strictly by
 * editorial score, with the scoring explained: what each criterion looks at,
 * and the standout and trade-off behind every provider's position.
 */

const VERTICAL_SLUG = 'glutathione-injections-top-ranked';
const CANONICAL = '/top-ranked-glutathione-injections/';
const META_TITLE = 'Top Ranked Glutathione Injections (2026): Scores Explained';
const META_DESCRIPTION =
  'Top ranked glutathione injection providers for 2026, scored on pricing transparency, clinical oversight, dosing and convenience, with the reason behind every position.';

export async function generateMetadata() {
  return generateBaseMetadata({ title: META_TITLE, description: META_DESCRIPTION, canonical: CANONICAL });
}

const ranked = [...injectionProviders].sort((a, b) => b.rating - a.rating);

/** Why each provider sits where it does: its standout, then its trade-off. */
const REASONS: Record<string, { standout: string; tradeOff: string }> = {
  system: {
    standout: 'Lowest entry ($69) with a 2000mg monthly supply and supplies included',
    tradeOff: 'Renews at $133/month',
  },
  agelessrx: {
    standout: 'Most established platform (197,000+ customers), three formats',
    tradeOff: 'Injection renews at $149/month',
  },
  readyrx: {
    standout: 'Injection or spray at $84 per dose, no membership',
    tradeOff: 'No flat monthly figure to budget against',
  },
  shed: {
    standout: 'Five-minute signup, same-day shipping, coaching included',
    tradeOff: 'Plan price not published before signup',
  },
  eden: {
    standout: '$95 first month, free expedited shipping, FSA/HSA eligible',
    tradeOff: 'Renewal price not published',
  },
  lttl: {
    standout: 'From $79/month at every dose, free 1–2 day shipping',
    tradeOff: 'Monthly supply not published before the consultation',
  },
  embody: {
    standout: 'Flat $99/month with 200–2000mg dosing',
    tradeOff: 'Sale pricing is time-limited',
  },
  bmimd: {
    standout: 'Simple online prescription, free shipping',
    tradeOff: 'Not available in AR, CA, LA, MS or SC',
  },
  taurus: {
    standout: '$79 first month, about $10.75 a shot',
    tradeOff: 'Highest ongoing price at $179/month',
  },
};

const POSITIONING: Record<string, string> = Object.fromEntries(
  ranked.map((p) => [p.slug, `${p.rating.toFixed(2)} · ${scoreWording(p.rating)}`])
);

const FAQS = [
  {
    q: 'Which glutathione injection provider is ranked #1?',
    a: `System, with an editorial score of ${ranked[0].rating.toFixed(2)}. It pairs the lowest entry price on the page ($69 for the first month) with a 2000mg monthly supply, injection supplies and 2-day temperature-controlled shipping, all through a fully online clinician review.`,
  },
  {
    q: 'How are glutathione injection providers ranked?',
    a: 'On a documentary review of what each provider publishes: pricing and transparency, clinical oversight, formats and dosing, and access and convenience. We do not run clinical trials, test medication or collect patient outcome data, so the scores are editorial, not clinical ratings.',
  },
  {
    q: 'Are the rankings paid for?',
    a: 'No. We may earn a commission when a reader clicks through and buys, at no extra cost to them, but placement is set by our editorial scoring, not by payment.',
  },
  {
    q: 'Why is the cheapest provider not ranked first?',
    a: 'Price is one criterion of four. LTTL has the lowest flat monthly price ($79) but ranks sixth overall, and Taurus’s $79 first month renews at the page’s highest rate ($179/month). The top three combine a competitive price with clear terms and strong clinical oversight.',
  },
  {
    q: 'How often are the rankings updated?',
    a: 'We re-check published prices and terms regularly and update the page when they change. Always confirm the current price and terms on the provider’s own site before you buy.',
  },
];

export default function TopRankedGlutathioneInjectionsPage() {
  const providers = hubProvidersFromProviders(ranked, {
    reviewVertical: VERTICAL_SLUG,
    positioning: POSITIONING,
    fallbackBestFor: 'Top ranked glutathione injections',
  });

  return (
    <HubPage
      vertical={VERTICAL_SLUG}
      canonical={CANONICAL}
      metaTitle={META_TITLE}
      metaDescription={META_DESCRIPTION}
      heading="Top Ranked Glutathione Injections"
      providers={providers}
      topBadge="Top Ranked"
      bestOverallHeading="Highest Ranked Provider"
      rankingNote="Sorted by editorial score out of 10."
      faqs={FAQS}
      faqHeading="Glutathione Ranking FAQs"
      schema={{
        medicalCondition: 'Glutathione Injection Therapy',
        breadcrumbName: 'Top Ranked Glutathione Injections',
        itemListName: 'Top Ranked Glutathione Injection Providers',
        itemListDescription: 'Online glutathione injection providers ranked by editorial score',
      }}
      guide={{
        heading: 'How We Rank Glutathione Injection Providers',
        children: (
          <>
            <GuideContents
              items={[
                { href: '#scores', label: 'The scores, provider by provider' },
                { href: '#criteria', label: 'The four criteria' },
                { href: '#top-three', label: 'What separates the top three' },
                { href: '#rest', label: 'The rest of the list' },
                { href: '#limits', label: 'What a score can and cannot tell you' },
              ]}
            />

            <GuideHeading id="scores">The scores, provider by provider</GuideHeading>
            <GuideTable
              headers={['Provider', 'Score', 'Standout', 'Trade-off']}
              rows={ranked.map((p, i) => [
                `${i + 1}. ${p.name}`,
                `${p.rating.toFixed(2)} (${scoreWording(p.rating)})`,
                REASONS[p.slug]?.standout ?? '',
                REASONS[p.slug]?.tradeOff ?? factsFor(p.slug).watchOut,
              ])}
              minWidth="44rem"
            />

            <GuideHeading id="criteria">The four criteria</GuideHeading>
            <GuideList
              items={[
                { title: 'Pricing & transparency', body: 'Whether the entry price and the renewal price are both published before intake, and whether the consultation and shipping sit inside them.' },
                { title: 'Clinical oversight', body: 'A licensed clinician reviews every intake before anything ships, and is reachable again when a dose needs to change.' },
                { title: 'Formats & dosing', body: 'Whether the dose or monthly supply is stated up front, and whether the provider can move you to another format later.' },
                { title: 'Access & convenience', body: 'State availability, shipping speed and cost, signup time, and how easy it is to pause or cancel.' },
              ]}
            />

            <GuideCardLabel>Highest ranked</GuideCardLabel>
            <HubProviderRow provider={providers[0]} vertical={VERTICAL_SLUG} guideCard />

            <GuideHeading id="top-three">What separates the top three</GuideHeading>
            <GuideText>
              System, AgelessRx and ReadyRx all score above 9.7, and each earns it differently. System leads on what it
              costs to start, $69 for a 2000mg monthly supply with the injection supplies in the box. AgelessRx is the
              most established name here, with 197,000+ customers and the only lineup that runs from a weekly injection
              to a nasal spray and a patch. ReadyRx is the pick for anyone who does not want a membership at all: $84
              per dose, free 1–2 day shipping and HSA/FSA eligibility.
            </GuideText>

            <GuideHeading id="rest">The rest of the list</GuideHeading>
            <GuideText>
              Shed, Eden and Embody score in the mid-9s. Shed is the fastest to start, with a five-minute signup and
              same-day shipping, but does not publish its plan price before signup. Eden opens at $95 with free
              expedited shipping and FSA/HSA eligibility, but likewise leaves its renewal price unpublished. LTTL
              has the lowest flat price on the page, $79 a month at every dose, but does not state the monthly supply. Embody is the most predictable, a flat
              $99/month with personalised dosing. bmiMD is a straightforward value option held back by state
              availability. Taurus closes the list with a real trade-off rather than weaker care: it is cheap to start
              but the dearest to keep.
            </GuideText>
            <GuideNote title="Ranking by price instead?">
              See the <GuideLink href="/cheapest-glutathione-injections/">cheapest glutathione injections</GuideLink> for
              the lowest first month, or{' '}
              <GuideLink href="/affordable-glutathione-injections/">affordable glutathione injections</GuideLink> for the
              lowest six-month cost.
            </GuideNote>

            <GuideHeading id="limits">What a score can and cannot tell you</GuideHeading>
            <GuideText>
              Our scores reflect a provider&apos;s published pricing, terms and process. They are not clinical ratings and
              do not measure how well glutathione will work for you; nobody can promise that, and no provider here
              should. Whether glutathione is appropriate for you is a question for a licensed clinician with your full
              medical history.
            </GuideText>

            <GuideCallout title="Before you start treatment">
              Glutathione injections are compounded medications, not FDA-approved finished products, and are not approved
              to treat, cure or prevent any disease. Consult a licensed clinician first, particularly if you are pregnant
              or breastfeeding, managing a chronic condition, or taking medication that affects liver metabolism.
            </GuideCallout>
          </>
        ),
      }}
    />
  );
}
