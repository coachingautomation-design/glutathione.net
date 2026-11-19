import {
  GuideCallout,
  GuideCardLabel,
  GuideContents,
  GuideHeading,
  GuideLink,
  GuideList,
  GuideNote,
  GuideProsCons,
  GuideTable,
  GuideText,
} from '@/components/hub/HubGuide';
import { HubPage } from '@/components/hub/HubPage';
import { HubProviderRow } from '@/components/hub/HubProviderRow';
import { factsFor, injectionProviders, sixMonthInjectionCost, usd } from '@/data/providers/glutathione-facts';
import { hubProvidersFromProviders } from '@/data/providers/hub-cards';
import { generateBaseMetadata } from '@/lib/seo-schema';

/**
 * /affordable-glutathione-injections/ — injection providers sorted by what six
 * months costs at their published rates (first month + five renewals). That is
 * the measure of "affordable" that a first-month discount cannot game. Providers
 * that do not publish both figures follow in editorial order, and say why.
 * /cheapest-glutathione-injections/ sorts on the first-month price instead.
 */

const VERTICAL_SLUG = 'glutathione-injections-affordable';
const CANONICAL = '/affordable-glutathione-injections/';
const META_TITLE = 'Affordable Glutathione Injections (2026): Six-Month Costs Compared';
const META_DESCRIPTION =
  'Affordable glutathione injections online, ranked by what six months actually costs at each provider’s published price, not just the first-month discount. From $69/month.';

export async function generateMetadata() {
  return generateBaseMetadata({ title: META_TITLE, description: META_DESCRIPTION, canonical: CANONICAL });
}

const bySixMonthCost = [...injectionProviders].sort((a, b) => {
  const ca = sixMonthInjectionCost(a.slug);
  const cb = sixMonthInjectionCost(b.slug);
  if (ca == null && cb == null) return 0;
  if (ca == null) return 1;
  if (cb == null) return -1;
  return ca - cb;
});

const sixMonthLabel = (slug: string) => {
  const cost = sixMonthInjectionCost(slug);
  return cost == null ? null : `${usd(cost)} over six months`;
};

const POSITIONING: Record<string, string> = {
  'joi-plus-blokes': sixMonthLabel('joi-plus-blokes') ?? '',
  embody: sixMonthLabel('embody') ?? '',
  system: sixMonthLabel('system') ?? '',
  agelessrx: sixMonthLabel('agelessrx') ?? '',
  taurus: sixMonthLabel('taurus') ?? '',
  readyrx: '$84 per dose, no membership',
  shed: '20% off month one, coaching included',
  bmimd: 'Free shipping, price not published',
};

const FAQS = [
  {
    q: 'What is the most affordable glutathione injection online?',
    a: `Over six months at published prices, Joi + Blokes is the most affordable injection on this page at ${usd(sixMonthInjectionCost('joi-plus-blokes'))} ($69/month on subscribe & save, with 1:1 health coaching included). Embody is next at ${usd(sixMonthInjectionCost('embody'))} on its flat $99/month plan.`,
  },
  {
    q: 'Why rank by six-month cost instead of the first-month price?',
    a: 'Because first-month discounts are where the prices in this category differ least and change most. System opens at $69 and Taurus at $79, but they renew at $133 and $179 a month. Six months at the published rates shows what a protocol actually costs once the introductory offer is gone.',
  },
  {
    q: 'How much does glutathione injection therapy cost per year?',
    a: 'At published rates, twelve months ranges from about $828 on Joi + Blokes’ $69/month plan and $1,188 on Embody’s flat $99/month, to roughly $2,048 on Taurus ($79 first month, then $179/month). ReadyRx prices per dose, so its total depends on how often your clinician doses you.',
  },
  {
    q: 'Is a flat monthly price better than a first-month discount?',
    a: 'If you plan to stay on a protocol for more than two or three months, usually yes. Embody’s $99/month never changes, which on our six-month figures works out cheaper than System’s $69 opener followed by $133/month.',
  },
  {
    q: 'Does insurance cover glutathione injections?',
    a: 'Compounded glutathione is generally an out-of-pocket wellness treatment. ReadyRx and Taurus state that their plans are HSA/FSA eligible, which lets you pay with pre-tax money; check with your plan administrator.',
  },
  {
    q: 'What makes a glutathione provider good value rather than just cheap?',
    a: 'What sits inside the price. System includes injection supplies and a blood-test discount, Embody includes the telemed visit and 1–2 day shipping, and Joi + Blokes and Shed include health coaching. A low price with none of that, or with no clinician review, is not a saving.',
  },
];

export default function AffordableGlutathioneInjectionsPage() {
  const providers = hubProvidersFromProviders(bySixMonthCost, {
    reviewVertical: VERTICAL_SLUG,
    positioning: POSITIONING,
    fallbackBestFor: 'Affordable glutathione injections',
  });

  return (
    <HubPage
      vertical={VERTICAL_SLUG}
      canonical={CANONICAL}
      metaTitle={META_TITLE}
      metaDescription={META_DESCRIPTION}
      heading="Affordable Glutathione Injections"
      intro="Glutathione injection providers ranked by what six months really costs at their published prices, so a cheap first month does not hide an expensive second one."
      trustPoints={['Ranked by Six-Month Cost', 'Flat-Rate Plans Compared', 'Licensed Clinician Review', 'HSA/FSA Options']}
      providers={providers}
      topBadge="Best Value"
      bestOverallHeading="Most Affordable Over Six Months"
      rankingNote="Sorted by six-month cost at published prices (first month plus five months at the renewal rate). Providers that do not publish both follow."
      faqs={FAQS}
      faqHeading="Affordable Glutathione Injection FAQs"
      schema={{
        medicalCondition: 'Glutathione Injection Therapy',
        breadcrumbName: 'Affordable Glutathione Injections',
        itemListName: 'Most Affordable Glutathione Injection Providers',
        itemListDescription: 'Online glutathione injection providers ranked by six-month cost at published prices',
      }}
      guide={{
        heading: 'What Affordable Glutathione Injections Really Cost',
        children: (
          <>
            <GuideContents
              items={[
                { href: '#six-months', label: 'Six months at published prices' },
                { href: '#value', label: 'What you get for the money' },
                { href: '#flat-vs-intro', label: 'Flat rates vs. introductory offers' },
                { href: '#value-checks', label: 'Good value vs. false economy' },
                { href: '#budget', label: 'Keeping a protocol on budget' },
              ]}
            />

            <GuideHeading id="six-months">Six months at published prices</GuideHeading>
            <GuideText>
              We take each provider&apos;s published first-month price for its injection, add five months at its
              published renewal rate, and rank on the total. It is simple arithmetic, but it is the number a
              first-month discount cannot hide.
            </GuideText>
            <GuideTable
              headers={['Provider', 'First month', 'Then', 'Six months']}
              rows={bySixMonthCost.map((p) => {
                const f = factsFor(p.slug);
                return [
                  p.name,
                  f.slug === 'shed' ? '20% off' : f.slug === 'readyrx' ? '$84 per dose' : usd(f.injectionEntry),
                  f.injectionMonthly != null ? `${usd(f.injectionMonthly)}/month` : f.slug === 'readyrx' ? '$84 per dose' : 'Not published',
                  usd(sixMonthInjectionCost(p.slug), f.slug === 'readyrx' ? 'Depends on dosing' : 'Not published'),
                ];
              })}
            />

            <GuideCardLabel>Most affordable over six months</GuideCardLabel>
            <HubProviderRow provider={providers[0]} vertical={VERTICAL_SLUG} guideCard />

            <GuideHeading id="value">What you get for the money</GuideHeading>
            <GuideText>
              The cheapest total is not automatically the best value; it depends on what is inside the price.
            </GuideText>
            <GuideTable
              headers={['Provider', 'Dose & supply', 'Included in the price']}
              rows={bySixMonthCost.map((p) => {
                const f = factsFor(p.slug);
                return [p.name, f.injectionDose, f.included];
              })}
            />

            <GuideHeading id="flat-vs-intro">Flat rates vs. introductory offers</GuideHeading>
            <GuideText>
              Two pricing models run through this market. Flat-rate plans, like Embody&apos;s $99/month and Joi +
              Blokes&apos; $69/month subscribe &amp; save, charge the same every month. Introductory offers, like
              System&apos;s $69 first month (then $133) and Taurus&apos;s $79 first month (then $179), are cheaper to
              start and dearer to keep.
            </GuideText>
            <GuideNote title="Where the lines cross">
              On published prices, a $99 flat plan overtakes a $69-then-$133 plan from the second month, and the gap
              widens every month after. If you are planning a protocol rather than a trial, the flat rate wins.
            </GuideNote>
            <GuideText>
              If you only want one month to see how you get on, the{' '}
              <GuideLink href="/cheapest-glutathione-injections/">cheapest first-month offers</GuideLink> are the better
              list.
            </GuideText>

            <GuideHeading id="value-checks">Good value vs. false economy</GuideHeading>
            <GuideProsCons
              goodTitle="Good value"
              watchTitle="False economy"
              good={[
                'Renewal price published next to the opening offer',
                'Clinician review and prescription inside the price',
                'Supplies and shipping included',
                'Pause or cancel without a penalty',
              ]}
              watch={[
                'A first-month price with no renewal figure anywhere',
                'Consultation or shipping fees added at checkout',
                'Unprescribed “research” vials sold at a discount',
                'Long prepaid commitments to unlock the headline price',
              ]}
            />

            <GuideHeading id="budget">Keeping a protocol on budget</GuideHeading>
            <GuideList
              items={[
                { title: 'Pick the plan for the length you expect', body: 'Flat rates for a protocol, first-month offers for a trial.' },
                { title: 'Subscribe if you will reorder anyway', body: 'Joi + Blokes is $69/month on subscribe & save against $86/month one-time.' },
                { title: 'Use pre-tax money where you can', body: 'ReadyRx and Taurus state their plans are HSA/FSA eligible.' },
                { title: 'Diarise the renewal', body: 'Set a reminder a few days before an introductory month ends, so the step-up is a decision, not a surprise.' },
              ]}
            />

            <GuideCallout title="Before you start treatment">
              Glutathione injections are compounded medications, not FDA-approved finished products, and are not approved
              to treat, cure or prevent any disease. Consult a licensed clinician first, particularly if you are pregnant
              or breastfeeding, managing a chronic condition, or taking medication that affects liver metabolism. Prices
              change often; confirm the current price on the provider&apos;s own site before you buy.
            </GuideCallout>
          </>
        ),
      }}
    />
  );
}
