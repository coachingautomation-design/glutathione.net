import {
  EdAuthorityLink,
  EdGuideCallout,
  EdGuideContents,
  EdGuideHeading,
  EdGuideList,
  EdGuideText,
} from '@/components/ed/EdGuide';
import { EdHubPage } from '@/components/ed/EdHubPage';
import { EdProviderRow } from '@/components/ed/EdProviderRow';
import { GLUTATHIONE_HUB_THEME } from '@/components/ed/theme';
import { glutathioneNasalSprayProviders } from '@/data/providers/glutathione-nasal-spray';
import { hubProvidersFromProviders } from '@/data/providers/hub-cards';
import { generateBaseMetadata } from '@/lib/seo-schema';

/**
 * /best-glutathione-nasal-spray/ — a format-specific spotlight page on the
 * same EdHubPage template and GLUTATHIONE_HUB_THEME as the homepage
 * (`/`), featuring AgelessRx's nasal spray (ReadyRx also lists a nasal
 * spray on the main comparison, but this spotlight page is AgelessRx's).
 * Single-provider, so the restated "Best Overall Pick" block and the
 * offer-banner interstitial are both switched off — repeating (or
 * interrupting) a one-row list adds nothing.
 */

const VERTICAL_SLUG = 'glutathione-nasal-spray';

const META_TITLE = 'Best Glutathione Nasal Spray';
const META_DESCRIPTION =
  "We've compared the top glutathione nasal spray providers online. Find affordable, trusted US glutathione providers.";

const CANONICAL = '/best-glutathione-nasal-spray/';

export async function generateMetadata() {
  return generateBaseMetadata({
    title: META_TITLE,
    description: META_DESCRIPTION,
    canonical: CANONICAL,
  });
}

export default function GlutathioneNasalSprayPage() {
  const providers = hubProvidersFromProviders(glutathioneNasalSprayProviders, {
    reviewVertical: VERTICAL_SLUG,
    fallbackBestFor: 'Needle-free glutathione nasal spray',
  });

  return (
    <EdHubPage
      vertical={VERTICAL_SLUG}
      pageEvent={{ name: 'vertical_page_viewed', payload: { vertical: 'glutathione-nasal-spray' } }}
      theme={GLUTATHIONE_HUB_THEME}
      canonical={CANONICAL}
      metaTitle={META_TITLE}
      metaDescription={META_DESCRIPTION}
      heading="Best Glutathione Nasal Spray"
      intro="We've compared the top glutathione nasal spray providers online. Find affordable, trusted US glutathione providers."
      trustStrip={[
        'Licensed Clinician Review',
        'Needle-Free Nasal Spray',
        'Simple Daily Routine',
        'Transparent Monthly Pricing',
      ]}
      heroImageUrl={null}
      providers={providers}
      showMore={null}
      offerBannerAfterIndex={null}
      bestOverallHeading={null}
      // The vial shot is an injection photo — off here so a nasal-spray page
      // doesn't show the wrong product.
      showTopPickVial={false}
      methodology={null}
      schema={{
        medicalCondition: 'Glutathione Nasal Spray Therapy',
        breadcrumbName: 'Glutathione Nasal Spray',
        itemListName: 'Best Glutathione Nasal Spray',
        itemListDescription: 'Online glutathione nasal spray providers compared on price, format and clinician oversight',
      }}
      treatmentTypes={{
        heading: 'Is the nasal spray right for you?',
        intro:
          "AgelessRx sells the same molecule in three formats, and the spray is the one built around mental clarity and focus rather than whole-body support. Here's how it stacks up against its other two routes.",
        items: [
          {
            name: 'Daily nasal spray',
            body: 'A once-daily, needle-free intranasal spray. Absorbed through the nasal mucosa rather than injected, and studied specifically for raising glutathione levels in the brain.',
            onPage: 'From $90 the first month, then $110/month.',
          },
          {
            name: 'Weekly injection',
            body: 'The most direct route for whole-body antioxidant support, for patients who don\'t mind self-injecting once a week.',
            onPage: 'From $99 the first month, then $149/month.',
          },
          {
            name: 'Needle-free patch',
            body: 'A once-weekly transdermal patch using iontophoresis — needle-free like the spray, but a single weekly application rather than a daily routine.',
            onPage: 'Billed at $180 per kit, quarterly.',
          },
        ],
        callout: {
          heading: 'What this therapy is not',
          body: 'Compounded glutathione is a prescription medication prepared by a licensed compounding pharmacy; it is not an FDA-approved finished product and is not approved to treat, cure or prevent any disease. Disclose your full medical history and every medication and supplement you take at intake.',
        },
      }}
      guide={{
        heading: 'The complete guide to glutathione nasal spray',
        moreGuides: [
          { href: '/', label: 'Best glutathione injections 2026' },
          { href: '/best-glutathione-patch/', label: 'Best glutathione patch providers' },
        ],
        moreGuidesHeading: 'More glutathione formats',
        children: (
          <>
            <EdGuideContents
              items={[
                { href: '#what-is-it', label: 'What intranasal glutathione is' },
                { href: '#how-it-works', label: 'How the spray works' },
                { href: '#cost', label: 'What it costs' },
                { href: '#compounded', label: 'Compounded glutathione and the FDA' },
              ]}
            />

            <EdGuideHeading id="what-is-it">What intranasal glutathione is</EdGuideHeading>
            <EdGuideText first>
              Glutathione is a tripeptide — glutamate, cysteine and glycine — that the body produces continuously and
              uses as its main defence against oxidative stress. Most at-home programmes deliver it by injection, which
              bypasses the digestive tract entirely. A nasal spray is a second needle-free route: absorbed through the
              nasal mucosa once daily rather than injected or swallowed.
            </EdGuideText>
            <EdGuideText>
              AgelessRx is the provider on this page publishing a nasal spray alongside its injection and patch, and
              it markets the format specifically around mental clarity and focus rather than the broader detox and
              recovery framing its injection carries. ReadyRx also lists a nasal spray, priced per dose alongside its
              own injectable option, in our main glutathione comparison.
            </EdGuideText>

            <EdProviderRow provider={providers[0]} duplicate vertical={VERTICAL_SLUG} enableVialFlip={false} />

            <EdGuideHeading id="how-it-works">How the spray works</EdGuideHeading>
            <EdGuideText first>
              You complete a short online health questionnaire, a licensed provider reviews it, and — if approved —
              your compounded nasal spray ships free from a US-licensed pharmacy. Payment is only taken once approved.
              The routine itself is a once-daily spray rather than a weekly self-injection, which is the main practical
              trade-off against AgelessRx's injectable format.
            </EdGuideText>

            <EdGuideHeading id="cost">What it costs</EdGuideHeading>
            <EdGuideText first>
              AgelessRx's nasal spray starts at $90 for the first month, renewing at $110/month. That includes the
              online medical evaluation and free shipping — there's no separate consultation fee, and you're only
              charged once a licensed provider approves your request.
            </EdGuideText>

            <EdProviderRow provider={providers[0]} duplicate vertical={VERTICAL_SLUG} enableVialFlip={false} />

            <EdGuideHeading id="compounded">Compounded glutathione and the FDA</EdGuideHeading>
            <EdGuideText first>
              Intranasal glutathione is a compounded preparation — made by a licensed pharmacy against an individual
              prescription rather than manufactured as an approved finished product. As the{' '}
              <EdAuthorityLink href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers">
                FDA explains
              </EdAuthorityLink>
              , compounded drugs are not FDA-approved and are not reviewed for safety or effectiveness before they
              reach patients. That's why the prescriber and the pharmacy are the two things worth verifying before you
              start.
            </EdGuideText>

            <EdProviderRow provider={providers[0]} duplicate vertical={VERTICAL_SLUG} enableVialFlip={false} />

            <EdGuideList
              columns={1}
              items={[
                'Complete AgelessRx\'s online health questionnaire — about 30 seconds, no in-person visit.',
                'A licensed provider reviews your intake and approves only if the spray is appropriate for you.',
                'Payment is taken only after approval; your spray ships free from a US-licensed pharmacy.',
                'Follow the dose and frequency your provider set, and raise any reaction with them rather than adjusting it yourself.',
              ]}
            />

            <EdGuideCallout title="Before you start treatment">
              Glutathione nasal spray is not FDA-approved to treat, cure or prevent any disease, and compounded
              glutathione is not an FDA-approved finished product. Individual response varies and no outcome is
              promised here. Consult a licensed clinician before starting, particularly if you are pregnant or
              breastfeeding, managing a chronic condition, or taking medication that affects liver metabolism.
            </EdGuideCallout>
          </>
        ),
      }}
      faqs={glutathioneNasalSprayProviders[0].faq.map((item) => ({ q: item.question, a: item.answer }))}
      faqHeading="Glutathione Nasal Spray FAQs"
    />
  );
}
