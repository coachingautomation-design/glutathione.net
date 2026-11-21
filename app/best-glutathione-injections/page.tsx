import {
  AuthorityLink,
  GuideCallout,
  GuideCardLabel,
  GuideContents,
  GuideHeading,
  GuideLink,
  GuideList,
  GuideProsCons,
  GuideSteps,
  GuideTable,
  GuideText,
} from '@/components/hub/HubGuide';
import { HubPage } from '@/components/hub/HubPage';
import { HubProviderRow } from '@/components/hub/HubProviderRow';
import { factsFor, injectionProviders, usd } from '@/data/providers/glutathione-facts';
import { hubProvidersFromProviders } from '@/data/providers/hub-cards';
import { generateBaseMetadata } from '@/lib/seo-schema';

/**
 * /best-glutathione-injections/ — the injection-only view of the comparison.
 * Same editorial order as the homepage, narrowed to the providers that publish a
 * subcutaneous injection format (Hone Health does not state its format, so it is
 * left out here). The guide is about the injection itself: dose and supply,
 * what ships in the box, frequency and site care.
 */

const VERTICAL_SLUG = 'glutathione-injections';
const CANONICAL = '/best-glutathione-injections/';
const META_TITLE = 'Best Glutathione Injections Online (2026): Providers Compared';
const META_DESCRIPTION =
  'The best glutathione injection providers online, compared on dose, supply, injection kit, shipping and monthly price. Clinician-prescribed, shipped to your door from $69.';

export async function generateMetadata() {
  return generateBaseMetadata({ title: META_TITLE, description: META_DESCRIPTION, canonical: CANONICAL });
}

const POSITIONING: Record<string, string> = {
  system: '2000mg monthly supply from $69',
  agelessrx: 'Weekly injection, most established',
  readyrx: 'Pay per dose, no membership',
  shed: '20% off month one, coaching included',
  eden: '$95 first month, FSA/HSA eligible',
  lttl: '$79/month, same price every dose',
  embody: 'Flat $99/month, 200–2000mg dosing',
  bmimd: 'Free shipping, five states excluded',
  taurus: '$79 first month, $10.75/shot',
};

const FAQS = [
  {
    q: 'What are the best glutathione injections online?',
    a: 'On our scoring, System ranks first for injections: a 2000mg monthly supply with injection supplies included from $69 for the first month (then $133/month). AgelessRx is second as the most established platform, with a weekly injection from $99 for the first month. ReadyRx is third for anyone who would rather pay per dose ($84) than hold a monthly membership.',
  },
  {
    q: 'Do glutathione injection providers send the needles and syringes?',
    a: 'System states that injection supplies are included with its monthly supply, and Taurus ships a home injection kit. Other providers on this page ship the medication with protocol instructions; confirm what is in the box at checkout before your first order.',
  },
  {
    q: 'How often are glutathione injections dosed?',
    a: 'Your prescribing clinician sets the dose and frequency. Of the published schedules, AgelessRx describes a weekly injection. Embody publishes a dosing range of 200mg to 2000mg rather than a fixed schedule.',
  },
  {
    q: 'Are at-home glutathione injections subcutaneous or intramuscular?',
    a: 'The telehealth programmes on this page are built around self-administered subcutaneous injections: a short, fine needle placed just under the skin. IV glutathione is a clinic-only treatment and is not something any provider here ships.',
  },
  {
    q: 'How much do glutathione injections cost per month?',
    a: 'Published first-month injection prices on this page run from $69 (System) to $99 (AgelessRx, Embody). After the first month, published monthly rates range from $79 (LTTL, same price at every dose) to $179 (Taurus). ReadyRx prices per dose at $84 with no membership.',
  },
  {
    q: 'Are glutathione injections FDA-approved?',
    a: 'No. Injectable glutathione from these providers is compounded by a licensed pharmacy against an individual prescription. Compounded drugs are not FDA-approved and are not reviewed by the FDA for safety or effectiveness before they reach patients.',
  },
];

export default function BestGlutathioneInjectionsPage() {
  const providers = hubProvidersFromProviders(injectionProviders, {
    reviewVertical: VERTICAL_SLUG,
    positioning: POSITIONING,
    fallbackBestFor: 'Clinician-prescribed glutathione injections',
  });

  return (
    <HubPage
      vertical={VERTICAL_SLUG}
      canonical={CANONICAL}
      metaTitle={META_TITLE}
      metaDescription={META_DESCRIPTION}
      heading="Best Glutathione Injections"
      providers={providers}
      faqs={FAQS}
      faqHeading="Glutathione Injection FAQs"
      schema={{
        medicalCondition: 'Glutathione Injection Therapy',
        breadcrumbName: 'Best Glutathione Injections',
        itemListName: 'Best Glutathione Injection Providers',
        itemListDescription: 'Online glutathione injection providers compared on dose, supply, kit, shipping and price',
      }}
      options={{
        heading: 'Which Injection Programme Fits You?',
        intro:
          'Every provider here ships the same molecule for subcutaneous injection. What differs is how the dose is set, how the price is structured, and how much support sits around the needle.',
        items: [
          {
            name: 'A fixed monthly supply',
            body: 'One stated quantity each month, so you know exactly what arrives and what it costs per milligram.',
            onPage: 'System ships a 2000mg monthly supply with injection supplies included.',
          },
          {
            name: 'A personalised dose',
            body: 'The clinician picks your dose from a published range rather than giving everyone the same vial.',
            onPage: 'Embody doses from 200mg to 2000mg at a flat $99/month.',
          },
          {
            name: 'Pay as you go',
            body: 'No membership to cancel: you pay for each dose you order, which suits irregular use.',
            onPage: 'ReadyRx charges $84 per dose with free 1–2 day shipping.',
          },
          {
            name: 'Coaching bundled in',
            body: 'Lifestyle or health coaching inside the plan price rather than sold separately.',
            onPage: 'Shed includes health coaching and opens with 20% off the first month.',
          },
          {
            name: 'A low first month',
            body: 'A discounted month to try injections before the standard rate starts. Compare the renewal price, not just the opener.',
            onPage: 'Taurus opens at $79, then $179/month; System opens at $69, then $133/month.',
          },
          {
            name: 'More than one format',
            body: 'A provider that can switch you to a needle-free route later without a new account.',
            onPage: 'AgelessRx also sells a nasal spray and a patch; ReadyRx also sells a spray.',
          },
        ],
      }}
      guide={{
        heading: 'The Guide to Glutathione Injections in 2026',
        children: (
          <>
            <GuideContents
              items={[
                { href: '#why-injections', label: 'Why injection is the default route' },
                { href: '#dose-and-supply', label: 'Dose and supply, provider by provider' },
                { href: '#what-ships', label: 'What ships in the box' },
                { href: '#good-programme', label: 'What a good injection programme looks like' },
                { href: '#first-injection', label: 'Your first injection, step by step' },
                { href: '#compounded', label: 'Compounded injections and the FDA' },
              ]}
            />

            <GuideHeading id="why-injections">Why injection is the default route</GuideHeading>
            <GuideText>
              Glutathione is a tripeptide your body makes in every cell, catalogued by the{' '}
              <AuthorityLink href="https://pubchem.ncbi.nlm.nih.gov/compound/Glutathione">NIH&apos;s PubChem database</AuthorityLink>.
              Swallowed as a standard capsule, most of it is broken down in digestion before it reaches the bloodstream,
              which is why nearly every clinician-supervised programme is built around a route that skips the gut. A
              subcutaneous injection does that, and it is the highest-bioavailability route you can use at home; IV
              glutathione goes further but needs a clinic.
            </GuideText>
            <GuideText>
              That makes the injection the format most of this market competes on, and the one where the differences
              between providers are easiest to compare: a stated dose, a stated supply and a stated monthly price.
            </GuideText>

            <GuideHeading id="dose-and-supply">Dose and supply, provider by provider</GuideHeading>
            <GuideText>
              These are the figures each provider publishes for its injection. Where a provider does not publish one, we
              say so rather than estimate it.
            </GuideText>
            <GuideTable
              headers={['Provider', 'Dose & supply', 'First month', 'After that']}
              rows={injectionProviders.map((p) => {
                const f = factsFor(p.slug);
                return [p.name, f.injectionDose, usd(f.injectionEntry), f.injectionMonthly != null ? `${usd(f.injectionMonthly)}/month` : f.slug === 'readyrx' ? '$84 per dose' : 'Not published'];
              })}
            />

            <GuideCardLabel>#1 ranked injection provider</GuideCardLabel>
            <HubProviderRow provider={providers[0]} vertical={VERTICAL_SLUG} guideCard />

            <GuideHeading id="what-ships">What ships in the box</GuideHeading>
            <GuideText>
              An injection programme is only as convenient as the kit that arrives with it. System states that injection
              supplies come with its 2000mg monthly supply and that it ships on 2-day temperature-controlled delivery.
              Taurus ships a home injection kit (a 5mL bottle at 200mg/mL) from a licensed U.S. pharmacy. ReadyRx,
              Embody and LTTL all publish free 1–2 day shipping, Eden ships free on expedited delivery, and Shed ships the same day on approved orders.
            </GuideText>
            <GuideText>
              If a provider does not say whether needles, syringes and alcohol swabs are included, ask before you pay.
              Buying them separately is not expensive, but it is one more thing between you and your first dose.
            </GuideText>

            <GuideHeading id="good-programme">What a good injection programme looks like</GuideHeading>
            <GuideProsCons
              goodTitle="Signs of a good programme"
              watchTitle="Reasons to look elsewhere"
              good={[
                'A licensed clinician reviews your intake before anything ships',
                'The dose or monthly supply is stated up front',
                'The renewal price is published next to the first-month offer',
                'Supplies and shipping are inside the price, not added at checkout',
                'The compounding pharmacy is U.S.-licensed',
              ]}
              watch={[
                'No consultation, or a prescription issued without a health history',
                'Only a first-month price, with the ongoing rate hidden until signup',
                'Vials sold as “research use only” rather than prescribed to you',
                'No way to reach a clinician when you want to change the dose',
              ]}
            />

            <GuideHeading id="first-injection">Your first injection, step by step</GuideHeading>
            <GuideSteps
              items={[
                { label: 'Day 1', body: 'Complete the online health intake. Most take five to ten minutes; programmes that start with lab work take longer.' },
                { label: 'Days 1–2', body: 'A licensed clinician reviews your history and prescribes only if glutathione is appropriate for you.' },
                { label: 'Days 2–4', body: 'A licensed pharmacy compounds your glutathione and ships it with instructions; several providers here publish 1–2 day delivery.' },
                { label: 'First dose', body: 'Follow the dose and frequency your clinician set. Rotate injection sites and raise any reaction with your care team rather than adjusting the dose yourself.' },
              ]}
            />

            <GuideHeading id="compounded">Compounded injections and the FDA</GuideHeading>
            <GuideText>
              Injectable glutathione is a compounded preparation, made by a licensed pharmacy for an individual
              prescription rather than manufactured as an approved finished product. As the{' '}
              <AuthorityLink href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers">FDA explains</AuthorityLink>,
              compounded drugs are not FDA-approved and are not reviewed for safety or effectiveness before they reach
              patients. That is why the prescriber and the pharmacy are the two things worth checking, whichever
              provider you choose.
            </GuideText>
            <GuideText>
              Looking for the lowest price instead? See the{' '}
              <GuideLink href="/cheapest-glutathione-injections/">cheapest glutathione injections</GuideLink>, or the{' '}
              <GuideLink href="/affordable-glutathione-injections/">most affordable over six months</GuideLink>.
            </GuideText>

            <GuideList
              items={[
                { title: 'Not a cure', body: 'Glutathione therapy is not FDA-approved to treat, cure or prevent any disease, and no outcome is promised here.' },
                { title: 'Tell your clinician everything', body: 'Disclose every medication and supplement at intake, particularly anything that affects liver metabolism.' },
              ]}
            />

            <GuideCallout title="Before you start treatment">
              Consult a licensed clinician before starting glutathione injections, particularly if you are pregnant or
              breastfeeding, managing a chronic condition, or taking medication that affects liver metabolism.
              Individual response varies.
            </GuideCallout>
          </>
        ),
      }}
    />
  );
}
