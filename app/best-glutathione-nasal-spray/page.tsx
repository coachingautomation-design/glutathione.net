import {
  EdAuthorityLink,
  EdGuideCallout,
  EdGuideContents,
  EdGuideHeading,
  EdGuideLink,
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
 * same EdHubPage template and GLUTATHIONE_HUB_THEME as the homepage (`/`),
 * comparing the two providers that publish a nasal-spray format: AgelessRx
 * (top-ranked, matching its position on the main comparison) and ReadyRx.
 * With only two rows, the restated "Best Overall Pick" block and the
 * offer-banner interstitial are both switched off — repeating (or
 * interrupting) a two-row list adds nothing.
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
            body: 'Bypasses the nose entirely for a more direct, whole-body dose — the trade is a weekly self-injection instead of a daily spray.',
            onPage: 'From $99 the first month, then $149/month.',
          },
          {
            name: 'Needle-free patch',
            body: 'Also needle-free, but a once-a-week iontophoresis patch rather than something you apply every day.',
            onPage: 'Billed at $180 per kit, quarterly.',
          },
        ],
        callout: {
          heading: 'What this therapy is not',
          body: 'A nasal spray is still a prescription compounded medication, not an over-the-counter wellness product — it is not FDA-approved to treat, cure or prevent anything, and the intranasal route has not been evaluated by the FDA any more than the injection or patch have. Tell your provider about every medication, supplement and condition at intake, not just the ones that seem relevant to a nasal product.',
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
                { href: '#how-it-works', label: 'The daily-routine trade-off' },
                { href: '#cost', label: 'What it costs, per day' },
                { href: '#compounded', label: 'Compounded nasal sprays and the FDA' },
              ]}
            />

            <EdGuideHeading id="what-is-it">What intranasal glutathione is</EdGuideHeading>
            <EdGuideText first>
              A nasal spray delivers glutathione through the nasal lining instead of a needle or a swallowed pill.
              That matters for two practical reasons: you skip the injection entirely, and a spray doesn't get broken
              down in digestion the way a pill does — which is also why AgelessRx markets this format around focus
              and mental clarity rather than the whole-body framing its injection gets.
            </EdGuideText>
            <EdGuideText>
              AgelessRx sells a spray alongside its injection and patch, priced as a monthly subscription. ReadyRx
              also offers a spray, priced per dose with no recurring membership instead. Both also sell an injectable
              format — see how the full formularies stack up in{' '}
              <EdGuideLink href="/">our full glutathione comparison</EdGuideLink>.
            </EdGuideText>

            <EdGuideHeading id="how-it-works">The daily-routine trade-off</EdGuideHeading>
            <EdGuideText first>
              A spray asks more of your memory than a once-weekly format does — it's a daily application, not a
              weekly one — in exchange for skipping the needle entirely. Intake itself is standard telehealth: a short
              online questionnaire, review by a licensed provider, and a shipment from a US-licensed pharmacy once
              approved. Nothing about the intake changes based on format; the trade-off is entirely in the routine
              you keep afterward.
            </EdGuideText>

            <EdGuideHeading id="cost">What it costs, per day</EdGuideHeading>
            <EdGuideText first>
              AgelessRx prices the spray at $90 for the first month, then $110/month. Spread across a 30-day month
              that's roughly $3/day to start, stepping up to about $3.67/day once the introductory rate ends. ReadyRx
              instead prices its spray at $84 per dose with no recurring membership — cheaper per dose if you use it
              less than roughly daily, but worth comparing against your actual usage rather than the flat monthly
              figure alone. The online medical evaluation and shipping are already inside every number here.
            </EdGuideText>

            <EdProviderRow provider={providers[0]} duplicate guideCard vertical={VERTICAL_SLUG} enableVialFlip={false} />

            <EdGuideHeading id="compounded">Compounded nasal sprays and the FDA</EdGuideHeading>
            <EdGuideText first>
              Compounded nasal products carry the same regulatory status as any other compounded medication:{' '}
              <EdAuthorityLink href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers">
                the FDA does not review compounded drugs
              </EdAuthorityLink>{' '}
              for safety or effectiveness before they reach a patient, and how a nasal spray is prepared and stored
              depends entirely on the compounding pharmacy that made it — one more reason the pharmacy's licensing is
              worth confirming, not just the clinician's.
            </EdGuideText>

            <EdProviderRow provider={providers[0]} duplicate guideCard vertical={VERTICAL_SLUG} enableVialFlip={false} />

            <EdGuideList
              columns={1}
              items={[
                'Answer AgelessRx\'s online intake — it\'s built around goals like focus and energy, not just a generic health history form.',
                'A licensed provider reviews it and approves only if a nasal formulation is appropriate for you.',
                'You\'re billed only after approval; the spray ships free from a US-licensed pharmacy.',
                'Work the spray into a fixed daily slot — same time each day tends to be the difference between keeping the routine and forgetting it.',
              ]}
            />

            <EdGuideCallout title="Before you start treatment">
              Glutathione nasal spray is not FDA-approved to treat, cure or prevent any disease. It's a compounded
              product, not an FDA-reviewed finished one, and individual response varies — nothing here promises an
              outcome. Talk to a licensed clinician first, especially if you're pregnant or breastfeeding, manage a
              chronic condition, or take medication that affects liver metabolism.
            </EdGuideCallout>
          </>
        ),
      }}
      faqs={glutathioneNasalSprayProviders.flatMap((provider) =>
        provider.faq.map((item) => ({ q: item.question, a: item.answer }))
      )}
      faqHeading="Glutathione Nasal Spray FAQs"
    />
  );
}
