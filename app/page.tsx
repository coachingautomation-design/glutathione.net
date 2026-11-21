import {
  AuthorityLink,
  GuideCallout,
  GuideContents,
  GuideHeading,
  GuideList,
  GuideTable,
  GuideText,
} from '@/components/hub/HubGuide';
import { HubPage } from '@/components/hub/HubPage';
import { HubProviderRow } from '@/components/hub/HubProviderRow';
import { glutathioneProviders } from '@/data/providers/glutathione';
import { hubProvidersFromProviders } from '@/data/providers/hub-cards';
import { generateBaseMetadata } from '@/lib/seo-schema';
import { GLUTATHIONE_FAQS } from '@/data/faqs/glutathione';

/**
 * Glutathione.net homepage, in the bestnadtreatments.com editorial design
 * (`HubPage`). Same roster, positioning lines, guide copy and FAQs as before;
 * the previous EdHubPage version of this page is frozen at /home-v1/ (and /v1/),
 * see app/v1/page.tsx.
 */

const VERTICAL_SLUG = 'glutathione';

const META_TITLE = 'Best Glutathione Injections 2026';
const META_DESCRIPTION =
  'Compare the best online glutathione providers of 2026 — clinician-prescribed injection, oral and patch protocols from $69, delivered to your door.';

const CANONICAL = '/';

export async function generateMetadata() {
  return generateBaseMetadata({
    title: META_TITLE,
    description: META_DESCRIPTION,
    canonical: CANONICAL,
  });
}

/**
 * Positioning line per provider — the reason it is on the page, in one clause.
 * A differentiator, never a compliment. Every figure here is one the provider
 * publishes.
 */
const POSITIONING: Record<string, string> = {
  system: 'Lowest entry price at $69',
  agelessrx: 'Three formats from $90/month',
  hone: 'Comprehensive labs included',
  shed: '20% off month one, coaching included',
  embody: 'Flat $99/month, 1–2 day shipping',
  bmimd: 'Value pick, five states excluded',
  readyrx: 'Injection or spray, no membership',
  taurus: '$79 first month, $10.75/shot',
};

const GUIDE_CONTENTS = [
  { href: '#what-is-glutathione', label: 'What glutathione is' },
  { href: '#why-levels-fall', label: 'Why glutathione levels fall' },
  { href: '#formats', label: 'Delivery formats compared' },
  { href: '#what-separates', label: 'What separates a good programme from a cheap one' },
  { href: '#cost', label: 'What glutathione therapy costs online' },
  { href: '#compounded', label: 'Compounded glutathione and the FDA' },
  { href: '#how-they-compare', label: 'How the ranked providers compare' },
  { href: '#getting-started', label: 'How to get started' },
];

const PROGRAMME_TYPES = [
  {
    name: 'Subcutaneous injection',
    body: 'A small self-administered injection that bypasses the digestive tract entirely. It is the highest-bioavailability route available for at-home use and the format most of these programmes are built around.',
    onPage: 'The default format at System, Shed, Embody and bmiMD, and one of the three AgelessRx offers.',
  },
  {
    name: 'Needle-free formats',
    body: 'Nasal sprays and transdermal patches for patients who will not self-inject. Absorption differs from injection, so this is a comfort-versus-route trade to settle with the prescribing clinician rather than a straight substitution.',
    onPage: 'AgelessRx publishes a weekly injection, a daily nasal spray and a needle-free patch at one starting price, from $90/month.',
  },
  {
    name: 'Labs-included protocols',
    body: 'Baseline bloodwork before the first dose, and monitoring after it, so the protocol is set against your own numbers rather than a standard plan. The price is higher because the clinical work is inside it.',
    onPage: 'Hone Health starts at roughly $99/month with comprehensive labs and personalised clinician oversight.',
  },
  {
    name: 'Flat monthly pricing',
    body: 'One published figure every month, with the consultation and shipping inside it. Nothing to recalculate at renewal and nothing added at checkout.',
    onPage: 'Embody charges a flat $99/month with personalised dosing and free 1–2 day shipping.',
  },
  {
    name: 'Low-cost entry',
    body: 'A discounted or low first month to get started, then the standard rate. Useful for trying a provider — the figure to compare across the page is still the ongoing monthly price.',
    onPage: 'System opens at $69 for the first month (reg. $133), the lowest verified entry price here; Shed opens with 20% off and includes health coaching.',
  },
  {
    name: 'Coaching and support bundles',
    body: 'Health coaching or 24/7 clinical messaging folded into the plan rather than sold separately. Worth checking whether it is a real service or a chatbot before it factors into the price you accept.',
    onPage: 'Shed includes health coaching in the base plan; bmiMD keeps the price low but does not ship to AR, CA, LA, MS or SC.',
  },
];

const FORMAT_TABLE = [
  {
    method: 'Subcutaneous injection',
    bioavailability: 'High',
    home: 'Yes',
    note: 'The standard at-home therapeutic route',
  },
  {
    method: 'IV drip',
    bioavailability: 'Highest',
    home: 'No — clinic only',
    note: 'Not shipped by any telehealth provider',
  },
  {
    method: 'Liposomal oral',
    bioavailability: 'Moderate',
    home: 'Yes',
    note: 'Absorbs far better than standard oral glutathione',
  },
  {
    method: 'Nasal spray',
    bioavailability: 'Good',
    home: 'Yes',
    note: 'Needle-free, dosed daily rather than weekly',
  },
  {
    method: 'Transdermal patch',
    bioavailability: 'Moderate',
    home: 'Yes',
    note: 'Needle-free; offered by AgelessRx alongside injection and spray',
  },
  {
    method: 'Standard oral',
    bioavailability: 'Low',
    home: 'Yes',
    note: 'Cheapest route, and the one most limited by absorption',
  },
];

const DEPLETION_FACTORS = [
  'Age — endogenous production declines steadily from roughly the third decade onward',
  'Alcohol, which depletes hepatic glutathione stores directly',
  'Certain medications, including acetaminophen at high doses',
  'Chronic illness, where glutathione is consumed responding to oxidative stress',
  'Sustained physiological stress',
  'Environmental exposures — pollutants, pesticides and heavy metals',
];

export default function GlutathioneHomePage() {
  const providers = hubProvidersFromProviders(glutathioneProviders, {
    reviewVertical: VERTICAL_SLUG,
    positioning: POSITIONING,
    fallbackBestFor: 'Online glutathione therapy',
  });

  return (
    <HubPage
      vertical={VERTICAL_SLUG}
      canonical={CANONICAL}
      metaTitle={META_TITLE}
      metaDescription={META_DESCRIPTION}
      heading="Best Glutathione Injections 2026"
      providers={providers}
      schema={{
        medicalCondition: 'Glutathione Therapy',
        breadcrumbName: 'Glutathione Therapy',
        itemListName: 'Best Glutathione Treatments 2026',
        itemListDescription:
          'Online glutathione therapy providers compared on format, price, clinician oversight and pharmacy sourcing',
      }}
      options={{
        heading: 'Which Glutathione Programme Is Right for Me?',
        intro:
          'Every provider on this page dispenses the same molecule. What differs is the route it takes into you, how much clinical work sits inside the price, and — in one case — whether the provider ships to your state at all. Those three questions narrow six providers to two fairly quickly. Whether glutathione is appropriate for you is a question for a licensed clinician who has your full medical history.',
        items: PROGRAMME_TYPES,
        callout: {
          heading: 'What glutathione therapy is not',
          body: 'Compounded glutathione is a prescription medication prepared by licensed compounding pharmacies; it is not an FDA-approved finished product and is not approved to treat, cure or prevent any disease. It is a wellness protocol, and no provider on this page — or this page itself — can tell you what it will do for you. Disclose your full medical history and every medication and supplement you take at intake.',
        },
      }}
      guide={{
        heading: 'The Complete Guide to Glutathione Therapy in 2026',
        children: (
          <>
            <GuideContents items={GUIDE_CONTENTS} />

            <GuideHeading id="what-is-glutathione">What glutathione is</GuideHeading>
            <GuideText>
              Glutathione is an antioxidant your body makes on its own, in every cell, described by the{' '}
              <AuthorityLink href="https://pubchem.ncbi.nlm.nih.gov/compound/Glutathione">
                NIH&apos;s PubChem database
              </AuthorityLink>{' '}
              as the most abundant of its kind. Unlike vitamin C or E, you can&apos;t meaningfully get more of it from
              food — which is the whole reason a therapy category built around topping it up exists.
            </GuideText>
            <GuideText>
              What it does inside the body is well established: it neutralises the oxidative damage that builds up
              from age, alcohol, illness and everyday environmental exposure, and supports the liver&apos;s own
              detox process. What a course of it will do for you personally is a separate question — one this page
              doesn&apos;t answer and no provider on it should claim to either.
            </GuideText>

            <GuideHeading id="why-levels-fall">Why glutathione levels fall</GuideHeading>
            <GuideText>
              Endogenous production declines with age, and several ordinary exposures deplete it faster than the body
              replaces it:
            </GuideText>
            <GuideList items={DEPLETION_FACTORS} />

            <GuideHeading id="formats">Delivery formats compared</GuideHeading>
            <GuideText>
              Oral glutathione has an absorption problem — your digestive system breaks most of it down before it
              reaches your bloodstream — which is why almost every clinician-supervised programme uses a route that
              bypasses it. Liposomal formulations improve on standard oral considerably; injection improves on both.
            </GuideText>
            <GuideTable
              headers={['Method', 'Bioavailability', 'At home?', 'What to know']}
              rows={FORMAT_TABLE.map((row) => [row.method, row.bioavailability, row.home, row.note])}
            />

            <HubProviderRow provider={providers[0]} vertical={VERTICAL_SLUG} guideCard />

            <GuideHeading id="what-separates">What separates a good programme from a cheap one</GuideHeading>
            <GuideText>
              Four things, all visible before you pay. A low headline price attached to none of them is not a saving:
            </GuideText>
            <GuideList items={[
                'A licensed clinician reviews your intake, and is reachable again when a dose needs changing.',
                'The compounding pharmacy is named and state-licensed.',
                'The consultation and shipping sit inside the published monthly price rather than arriving at checkout.',
                'State availability is stated up front — one provider here excludes five states outright.',
              ]}
            />

            <GuideHeading id="cost">What glutathione therapy costs online</GuideHeading>
            <GuideText>
              Entry prices on this page run from $69 to about $99 for a first month, and ongoing monthly costs across
              the category typically sit between $90 and $200 depending on format and dose. System is the lowest
              verified entry at $69, rising to $133/month after the first month; AgelessRx starts at $90/month across
              three formats; ReadyRx skips a monthly figure entirely, pricing injection or spray at a flat $84 per
              dose with no membership. Hone Health and Embody both sit around $99/month, the first with comprehensive
              labs included and the second as a flat rate with free 1–2 day delivery. Taurus opens at a similarly low
              $79 first month but is the highest ongoing price here at $179/month.
            </GuideText>
            <GuideText>
              The thing worth checking before the price is your state: bmiMD is the value option but does not prescribe
              into Arkansas, California, Louisiana, Mississippi or South Carolina.
            </GuideText>

            <HubProviderRow provider={providers[0]} vertical={VERTICAL_SLUG} guideCard />

            <GuideHeading id="compounded">Compounded glutathione and the FDA</GuideHeading>
            <GuideText>
              Injectable and nasal glutathione are compounded preparations — made by a licensed pharmacy against an
              individual prescription rather than manufactured as an approved finished product. As the{' '}
              <AuthorityLink href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers">
                FDA explains
              </AuthorityLink>
              , compounded drugs are not FDA-approved and are not reviewed for safety or effectiveness before they reach
              patients. That is the reason the prescriber and the pharmacy are the two things to verify, and why every
              provider ranked here routes your intake through a licensed clinician before anything ships.
            </GuideText>

            <GuideHeading id="how-they-compare">How the ranked providers compare</GuideHeading>
            <GuideText>
              System takes the top spot on entry price: $69 for the first month (regularly $133) and a fully online
              clinician review, which is the least you can commit and still be on a supervised protocol. AgelessRx
              ranks second as the most established platform here, and the only one offering three formats — weekly
              injection, daily nasal spray or a needle-free patch — from $90/month. ReadyRx is third, the only other
              provider here offering a nasal spray alongside its injection, priced per dose at $84 with no monthly
              membership to cancel.
            </GuideText>
            <GuideText>
              Below those, Hone Health is the pick for anyone who wants the protocol set against their own bloodwork,
              with comprehensive labs from around $99/month. Shed opens at 20% off the first month with health
              coaching in the base plan, Embody runs a flat $99/month with personalised 200mg–2000mg dosing and free
              1–2 day shipping, and bmiMD is the no-frills value pick with free shipping in the states it serves.
            </GuideText>
            <GuideText>
              Taurus rounds out the page with a trade-off rather than a straight step down in quality: a low $79
              first month, but a $179/month renewal that is the highest ongoing price on the page.
            </GuideText>

            <GuideHeading id="getting-started">How to get started</GuideHeading>
            <GuideList items={[
                'Complete the provider’s online health questionnaire — typically five to ten minutes, no in-person visit.',
                'A licensed clinician reviews your intake and history, usually within 24–48 hours, and prescribes only if it is appropriate.',
                'Your compounded glutathione is prepared by a licensed U.S. pharmacy and shipped with protocol instructions.',
                'Follow the dose and frequency your clinician set, and raise any injection-site reaction or side effect with them rather than adjusting it yourself.',
                'Refills and dose changes go back through the same clinical team — check before you enrol that they are included rather than billed.',
              ]}
            />

            <GuideCallout title="Before you start treatment">
              Glutathione therapy is not FDA-approved to treat, cure or prevent any disease, and compounded glutathione
              is not an FDA-approved finished product. Individual response varies and no outcome is promised here.
              Consult a licensed clinician before starting, particularly if you are pregnant or breastfeeding, managing a
              chronic condition, or taking medication that affects liver metabolism.
            </GuideCallout>
          </>
        ),
      }}
      faqs={GLUTATHIONE_FAQS}
      faqHeading="Glutathione Therapy FAQs"
    />
  );
}
