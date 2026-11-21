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
import { factsFor, injectionProviders } from '@/data/providers/glutathione-facts';
import { hubProvidersFromProviders } from '@/data/providers/hub-cards';
import { generateBaseMetadata } from '@/lib/seo-schema';

/**
 * /best-sites-to-get-glutathione-injections/ — the "where do I actually buy
 * this" view: the same injection roster in editorial order, framed as sites,
 * with a guide on the kinds of places that sell glutathione injections and how
 * to tell a legitimate telehealth site from a gray-market vial seller.
 */

const VERTICAL_SLUG = 'glutathione-injections-sites';
const CANONICAL = '/best-sites-to-get-glutathione-injections/';
const META_TITLE = 'Best Sites to Get Glutathione Injections Online (2026)';
const META_DESCRIPTION =
  'The best websites to get glutathione injections online, with a licensed clinician and a U.S. pharmacy behind every order. Compare sites on price, formats and shipping, and learn how to spot an unsafe seller.';

export async function generateMetadata() {
  return generateBaseMetadata({ title: META_TITLE, description: META_DESCRIPTION, canonical: CANONICAL });
}

const POSITIONING: Record<string, string> = {
  system: 'Best overall site, from $69',
  agelessrx: 'Best for format choice',
  readyrx: 'Best without a membership',
  shed: 'Fastest signup and shipping',
  eden: 'Best for FSA/HSA payment',
  lttl: 'Lowest flat monthly price',
  embody: 'Flat $99 every month',
  bmimd: 'Simple online prescription',
  taurus: 'Low-cost first month',
};

const FAQS = [
  {
    q: 'What is the best site to get glutathione injections?',
    a: 'On our scoring, System is the best site to get glutathione injections online: a fully online clinician review, a 2000mg monthly supply with injection supplies included, 2-day temperature-controlled shipping, and a $69 first month (then $133/month). AgelessRx and ReadyRx are the strongest alternatives.',
  },
  {
    q: 'Can you legally buy glutathione injections online?',
    a: 'Yes, with a prescription. The telehealth sites on this page have a licensed clinician review your health intake and, if appropriate, prescribe glutathione that a licensed pharmacy compounds and ships to you. Sites that sell vials with no prescription, often labelled “research use only”, are not selling a product meant for you to inject.',
  },
  {
    q: 'Is it better to get glutathione injections online or at a med spa?',
    a: 'It depends on whether you want to inject at home. Telehealth sites ship a supply for self-administered subcutaneous injections, usually at a published monthly price. A med spa or IV clinic administers glutathione in person, including IV drips, which no telehealth site ships, and prices per visit.',
  },
  {
    q: 'How do I know a glutathione injection website is legitimate?',
    a: 'Check for four things before you pay: a real consultation with a licensed clinician, a named, state-licensed U.S. pharmacy, a published price that includes the renewal rate, and a way to reach the care team after you order. Be wary of any site that ships without asking about your health history.',
  },
  {
    q: 'Which sites ship glutathione injections fastest?',
    a: 'Shed ships the same day on approved orders. ReadyRx, Embody and LTTL publish free 1–2 day shipping, Eden offers free expedited shipping, and System ships on 2-day temperature-controlled delivery.',
  },
  {
    q: 'Do these sites ship to every state?',
    a: 'Not all of them. bmiMD does not prescribe into Arkansas, California, Louisiana, Mississippi or South Carolina. Confirm your state on the provider’s own site before you complete an intake.',
  },
];

export default function BestSitesToGetGlutathioneInjectionsPage() {
  const providers = hubProvidersFromProviders(injectionProviders, {
    reviewVertical: VERTICAL_SLUG,
    positioning: POSITIONING,
    fallbackBestFor: 'Glutathione injections online',
  });

  return (
    <HubPage
      vertical={VERTICAL_SLUG}
      canonical={CANONICAL}
      metaTitle={META_TITLE}
      metaDescription={META_DESCRIPTION}
      heading="Best Sites to Get Glutathione Injections"
      providers={providers}
      topBadge="Best Site"
      bestOverallHeading="Best Site Overall"
      faqs={FAQS}
      faqHeading="Where to Get Glutathione Injections: FAQs"
      schema={{
        medicalCondition: 'Glutathione Injection Therapy',
        breadcrumbName: 'Best Sites to Get Glutathione Injections',
        itemListName: 'Best Sites to Get Glutathione Injections',
        itemListDescription: 'Websites that prescribe and ship glutathione injections, compared on price, formats and shipping',
      }}
      guide={{
        heading: 'Where to Get Glutathione Injections Safely',
        children: (
          <>
            <GuideContents
              items={[
                { href: '#where', label: 'The four places that sell glutathione injections' },
                { href: '#site-by-site', label: 'The best sites, side by side' },
                { href: '#vet', label: 'How to vet a glutathione site' },
                { href: '#ordering', label: 'What ordering from a telehealth site looks like' },
                { href: '#research-use', label: 'Why to avoid “research use only” vials' },
              ]}
            />

            <GuideHeading id="where">The four places that sell glutathione injections</GuideHeading>
            <GuideList
              items={[
                { title: 'Telehealth sites', body: 'An online intake, a licensed clinician’s review and a prescription filled by a licensed pharmacy, shipped for at-home subcutaneous injection. Every site ranked on this page works this way.' },
                { title: 'Med spas and IV clinics', body: 'In-person administration, including IV drips that no telehealth site ships. Priced per visit, and you travel to them.' },
                { title: 'Your own doctor', body: 'A clinician you already see can prescribe compounded glutathione for a local compounding pharmacy to fill, if they consider it appropriate.' },
                { title: '“Research use only” sellers', body: 'Sites selling vials with no prescription and no clinician. Cheaper, unverified, and not sold for human use.' },
              ]}
            />

            <GuideHeading id="site-by-site">The best sites, side by side</GuideHeading>
            <GuideTable
              headers={['Site', 'Formats', 'Price to start', 'Check before you buy']}
              rows={injectionProviders.map((p) => {
                const f = factsFor(p.slug);
                return [p.name, f.formats.join(', '), f.entryLabel, f.watchOut];
              })}
              minWidth="44rem"
            />

            <GuideCardLabel>Best site overall</GuideCardLabel>
            <HubProviderRow provider={providers[0]} vertical={VERTICAL_SLUG} guideCard />

            <GuideHeading id="vet">How to vet a glutathione site</GuideHeading>
            <GuideProsCons
              goodTitle="A legitimate site"
              watchTitle="Walk away if"
              good={[
                'Asks for your health history and medications',
                'A licensed clinician reviews it before anything ships',
                'Names a state-licensed U.S. compounding pharmacy',
                'Publishes its price and its renewal rate',
                'Lets you message the care team after you order',
              ]}
              watch={[
                'It ships without a consultation or prescription',
                'Vials are labelled “research use only” or “not for human use”',
                'There is no named pharmacy or clinician',
                'The only price shown is a first-month teaser',
                'It promises a specific skin, weight or health outcome',
              ]}
            />

            <GuideHeading id="ordering">What ordering from a telehealth site looks like</GuideHeading>
            <GuideSteps
              items={[
                { label: 'Step 1', body: 'Choose a site and confirm it serves your state (bmiMD, for example, excludes five states).' },
                { label: 'Step 2', body: 'Complete the online intake, usually five to ten minutes, with your full health history and current medications.' },
                { label: 'Step 3', body: 'A licensed clinician reviews it, typically within 24–48 hours, and prescribes only if glutathione is appropriate.' },
                { label: 'Step 4', body: 'A licensed pharmacy compounds your prescription and ships it; several sites here publish 1–2 day or same-day shipping.' },
              ]}
            />
            <GuideText>
              Comparing on price? See the{' '}
              <GuideLink href="/cheapest-glutathione-injections/">cheapest glutathione injections</GuideLink> or our{' '}
              <GuideLink href="/top-ranked-glutathione-injections/">full ranking with scores explained</GuideLink>.
            </GuideText>

            <GuideHeading id="research-use">Why to avoid “research use only” vials</GuideHeading>
            <GuideText>
              Vials sold “for research use only” skip the two safeguards a compounded injection relies on: a clinician
              who has checked it is appropriate for you, and a licensed pharmacy accountable for what is in the vial. As
              the{' '}
              <AuthorityLink href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers">FDA explains</AuthorityLink>,
              even properly compounded drugs are not FDA-approved or reviewed before they reach patients, which is
              exactly why the prescriber and pharmacy matter.
            </GuideText>

            <GuideCallout title="Before you start treatment">
              Glutathione injections are not FDA-approved to treat, cure or prevent any disease, and individual response
              varies. Consult a licensed clinician first, particularly if you are pregnant or breastfeeding, managing a
              chronic condition, or taking medication that affects liver metabolism.
            </GuideCallout>
          </>
        ),
      }}
    />
  );
}
