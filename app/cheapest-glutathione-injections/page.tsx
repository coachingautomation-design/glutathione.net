import {
  AuthorityLink,
  GuideCallout,
  GuideCardLabel,
  GuideContents,
  GuideHeading,
  GuideLink,
  GuideList,
  GuideNote,
  GuideTable,
  GuideText,
  GuideTiers,
} from '@/components/hub/HubGuide';
import { HubPage } from '@/components/hub/HubPage';
import { HubProviderRow } from '@/components/hub/HubProviderRow';
import { factsFor, injectionProviders, usd } from '@/data/providers/glutathione-facts';
import { hubProvidersFromProviders } from '@/data/providers/hub-cards';
import { generateBaseMetadata } from '@/lib/seo-schema';

/**
 * /cheapest-glutathione-injections/ — injection providers sorted by the lowest
 * published first-order price for the injection format. Ties break on the
 * editorial score; providers that do not publish an entry price follow, in
 * editorial order. The sister page /affordable-glutathione-injections/ sorts on
 * six-month cost instead, which is the better measure of what you will pay.
 */

const VERTICAL_SLUG = 'glutathione-injections-cheapest';
const CANONICAL = '/cheapest-glutathione-injections/';
const META_TITLE = 'Cheapest Glutathione Injections Online (2026): From $69';
const META_DESCRIPTION =
  'The cheapest glutathione injections online, sorted by the lowest published first-month price. Compare $69, $79 and $84 offers, what they renew at, and what is included.';

export async function generateMetadata() {
  return generateBaseMetadata({ title: META_TITLE, description: META_DESCRIPTION, canonical: CANONICAL });
}

const byEntryPrice = [...injectionProviders].sort((a, b) => {
  const ea = factsFor(a.slug).injectionEntry;
  const eb = factsFor(b.slug).injectionEntry;
  if (ea == null && eb == null) return 0;
  if (ea == null) return 1;
  if (eb == null) return -1;
  return ea - eb || b.rating - a.rating;
});

const POSITIONING: Record<string, string> = {
  system: '$69 first month, then $133',
  'joi-plus-blokes': '$69/month, stays $69',
  taurus: '$79 first month, then $179',
  readyrx: '$84 per dose, no membership',
  agelessrx: '$99 first month, then $149',
  embody: 'Flat $99 every month',
  shed: '20% off the first month',
  bmimd: 'Price not published',
};

const FAQS = [
  {
    q: 'What are the cheapest glutathione injections online?',
    a: 'The lowest published first-month price for injectable glutathione on this page is $69, offered by System (a 2000mg monthly supply with injection supplies, then $133/month) and Joi + Blokes ($69/month on subscribe & save). Taurus follows at $79 for the first month, and ReadyRx charges $84 per dose with no membership.',
  },
  {
    q: 'Which glutathione injection stays cheapest after the first month?',
    a: 'Joi + Blokes. Its subscribe & save price is $69/month and does not step up after the first month ($86/month if you buy one-time). Embody charges a flat $99/month. System rises to $133/month and Taurus to $179/month after their discounted first months.',
  },
  {
    q: 'Is a $69 first month a good deal?',
    a: 'It is a good way to try a supervised injection protocol for very little, but compare the renewal price before you sign up. System’s $69 opener becomes $133/month, so over six months the flat-rate plans can work out cheaper.',
  },
  {
    q: 'Are cheap glutathione injections lower quality?',
    a: 'Price is not a reliable signal either way. Every provider on this page routes your intake through a licensed clinician and fills the prescription at a licensed pharmacy. What usually changes with price is what sits around the medication: supplies, shipping speed, coaching or lab work.',
  },
  {
    q: 'Can I use HSA or FSA funds for glutathione injections?',
    a: 'ReadyRx and Taurus both state that their plans are HSA/FSA eligible. Check eligibility with your plan administrator before you pay.',
  },
  {
    q: 'Why not buy glutathione vials from a cheaper website?',
    a: 'Sites selling glutathione “for research use only” sell without a prescription or clinician review, and you have no way to verify what is in the vial. A prescribed, pharmacy-compounded product from a telehealth provider costs a little more for exactly that reason.',
  },
];

export default function CheapestGlutathioneInjectionsPage() {
  const providers = hubProvidersFromProviders(byEntryPrice, {
    reviewVertical: VERTICAL_SLUG,
    positioning: POSITIONING,
    fallbackBestFor: 'Low-cost glutathione injections',
  });

  return (
    <HubPage
      vertical={VERTICAL_SLUG}
      canonical={CANONICAL}
      metaTitle={META_TITLE}
      metaDescription={META_DESCRIPTION}
      heading="Cheapest Glutathione Injections"
      intro="Glutathione injection providers sorted by the lowest price you can start at, with the renewal price beside every offer so the cheapest start is not mistaken for the cheapest plan."
      trustPoints={['Sorted by Entry Price', 'Renewal Prices Shown', 'Licensed Clinician Review', 'Free Shipping Options']}
      providers={providers}
      topBadge="Lowest Price"
      bestOverallHeading="Lowest Entry Price"
      rankingNote="Sorted by lowest published first-month price for the injection format; ties go to the higher editorial score."
      faqs={FAQS}
      faqHeading="Cheap Glutathione Injection FAQs"
      schema={{
        medicalCondition: 'Glutathione Injection Therapy',
        breadcrumbName: 'Cheapest Glutathione Injections',
        itemListName: 'Cheapest Glutathione Injection Providers',
        itemListDescription: 'Online glutathione injection providers sorted by lowest published first-month price',
      }}
      guide={{
        heading: 'How to Find the Cheapest Glutathione Injections',
        children: (
          <>
            <GuideContents
              items={[
                { href: '#price-table', label: 'Every injection price, side by side' },
                { href: '#first-vs-ongoing', label: 'First-month price vs. what you keep paying' },
                { href: '#price-bands', label: 'The three price bands' },
                { href: '#save', label: 'Ways to pay less' },
                { href: '#too-cheap', label: 'When a price is too cheap' },
              ]}
            />

            <GuideHeading id="price-table">Every injection price, side by side</GuideHeading>
            <GuideText>
              The prices below are the ones each provider publishes for its injectable glutathione, in the same order as
              the ranked list above. Every one routes your intake through a licensed clinician before anything ships.
            </GuideText>
            <GuideTable
              headers={['Provider', 'First month', 'After that', 'Included']}
              rows={byEntryPrice.map((p) => {
                const f = factsFor(p.slug);
                const after = f.injectionMonthly != null ? `${usd(f.injectionMonthly)}/month` : f.slug === 'readyrx' ? '$84 per dose' : 'Not published';
                return [p.name, f.slug === 'shed' ? '20% off' : f.slug === 'readyrx' ? '$84 per dose' : usd(f.injectionEntry), after, f.included];
              })}
              minWidth="44rem"
            />

            <GuideCardLabel>Lowest entry price</GuideCardLabel>
            <HubProviderRow provider={providers[0]} vertical={VERTICAL_SLUG} guideCard />

            <GuideHeading id="first-vs-ongoing">First-month price vs. what you keep paying</GuideHeading>
            <GuideText>
              Most low prices in this category are introductory. System&apos;s $69 first month renews at $133/month, and
              Taurus&apos;s $79 opener renews at $179/month, the highest ongoing rate on the page. Joi + Blokes is the
              exception: its $69 subscribe &amp; save price is the recurring rate, not a one-off.
            </GuideText>
            <GuideNote title="The quick rule">
              If you only want to try injections for a month, sort by first-month price. If you expect to stay on a
              protocol, compare the price you pay from month two onward, or look at our{' '}
              <GuideLink href="/affordable-glutathione-injections/">six-month cost comparison</GuideLink>.
            </GuideNote>

            <GuideHeading id="price-bands">The three price bands</GuideHeading>
            <GuideTiers
              items={[
                { title: 'Under $80 to start', figure: '$69–$79 first month', body: 'System, Joi + Blokes and Taurus. Check the renewal: it ranges from $69 to $179/month.' },
                { title: 'Flat or per-dose', figure: '$84–$99', body: 'ReadyRx at $84 per dose with no membership, and Embody at a flat $99 every month.' },
                { title: 'Established platform', figure: '$99 first month, $149 after', body: 'AgelessRx’s weekly injection, with the option to switch to its spray or patch later.' },
              ]}
            />

            <GuideHeading id="save">Ways to pay less</GuideHeading>
            <GuideList
              items={[
                { title: 'Subscribe rather than buy once', body: 'Joi + Blokes charges $69/month on subscribe & save against $86/month one-time.' },
                { title: 'Use pre-tax money', body: 'ReadyRx and Taurus state their plans are HSA/FSA eligible.' },
                { title: 'Take the first-month offer, then reassess', body: 'System, Taurus and AgelessRx all discount month one; set a reminder before the renewal date.' },
                { title: 'Count what is included', body: 'System includes injection supplies and 20% off a Rythm blood test; several others include free 1–2 day shipping.' },
              ]}
            />

            <GuideHeading id="too-cheap">When a price is too cheap</GuideHeading>
            <GuideText>
              Glutathione sold online without a prescription, often labelled “for research use only”, is cheaper because
              it skips the clinician and the licensed pharmacy. Those are the two safeguards that matter with a
              compounded product: the{' '}
              <AuthorityLink href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers">FDA does not review compounded drugs</AuthorityLink>{' '}
              before they reach patients, so the pharmacy&apos;s licensing is what you are relying on.
            </GuideText>

            <GuideCallout title="Before you start treatment">
              Glutathione injections are not FDA-approved to treat, cure or prevent any disease, and individual response
              varies. Consult a licensed clinician first, particularly if you are pregnant or breastfeeding, managing a
              chronic condition, or taking medication that affects liver metabolism. Prices change often, so confirm
              the current price on the provider&apos;s own site before you buy.
            </GuideCallout>
          </>
        ),
      }}
    />
  );
}
