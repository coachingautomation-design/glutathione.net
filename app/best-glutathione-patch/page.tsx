import {
  EdAuthorityLink,
  EdGuideCallout,
  EdGuideContents,
  EdGuideHeading,
  EdGuideList,
  EdGuideText,
} from '@/components/ed/EdGuide';
import { EdHubPage } from '@/components/ed/EdHubPage';
import { GLUTATHIONE_HUB_THEME } from '@/components/ed/theme';
import { glutathionePatchProviders } from '@/data/providers/glutathione-patch';
import { hubProvidersFromProviders } from '@/data/providers/hub-cards';
import { generateBaseMetadata } from '@/lib/seo-schema';

/**
 * /best-glutathione-patch/ — same template, theme and single-provider
 * pattern as /best-glutathione-nasal-spray/ (see that file's header
 * comment), narrowed to AgelessRx's patch format.
 */

const VERTICAL_SLUG = 'glutathione-patch';

const META_TITLE = 'Best glutathione patch providers';
const META_DESCRIPTION =
  "We've compared the top glutathione patch providers online. Find affordable, trusted US glutathione providers.";

const CANONICAL = '/best-glutathione-patch/';

export async function generateMetadata() {
  return generateBaseMetadata({
    title: META_TITLE,
    description: META_DESCRIPTION,
    canonical: CANONICAL,
  });
}

export default function GlutathionePatchPage() {
  const providers = hubProvidersFromProviders(glutathionePatchProviders, {
    reviewVertical: VERTICAL_SLUG,
    fallbackBestFor: 'Needle-free glutathione patch',
  });

  return (
    <EdHubPage
      vertical={VERTICAL_SLUG}
      pageEvent={{ name: 'vertical_page_viewed', payload: { vertical: 'glutathione-patch' } }}
      theme={GLUTATHIONE_HUB_THEME}
      canonical={CANONICAL}
      metaTitle={META_TITLE}
      metaDescription={META_DESCRIPTION}
      heading="Best glutathione patch providers"
      intro="We've compared the top glutathione patch providers online. Find affordable, trusted US glutathione providers."
      trustStrip={[
        'Licensed Clinician Review',
        'Once-Weekly, Needle-Free',
        'Whole-Body Support',
        'Transparent Quarterly Pricing',
      ]}
      heroImageUrl={null}
      providers={providers}
      showMore={null}
      offerBannerAfterIndex={null}
      bestOverallHeading={null}
      methodology={null}
      schema={{
        medicalCondition: 'Glutathione Patch Therapy',
        breadcrumbName: 'Glutathione Patch',
        itemListName: 'Best Glutathione Patch Providers',
        itemListDescription: 'Online glutathione patch providers compared on price, format and clinician oversight',
      }}
      treatmentTypes={{
        heading: 'Is the patch right for you?',
        intro:
          "AgelessRx sells the same molecule in three formats, and the patch is the lowest-effort of the three — once a week, no needles. Here's how it stacks up against its other two routes.",
        items: [
          {
            name: 'Once-weekly patch',
            body: 'A needle-free transdermal patch using iontophoresis — a mild electrical current that moves glutathione through the skin. Applied once a week for whole-body support.',
            onPage: 'Billed at $180 per kit, quarterly.',
          },
          {
            name: 'Weekly injection',
            body: 'The most direct route for whole-body antioxidant support, for patients who don\'t mind self-injecting once a week.',
            onPage: 'From $99 the first month, then $149/month.',
          },
          {
            name: 'Daily nasal spray',
            body: 'A once-daily, needle-free spray studied specifically for raising glutathione levels in the brain — a daily routine rather than a weekly one.',
            onPage: 'From $90 the first month, then $110/month.',
          },
        ],
        callout: {
          heading: 'What this therapy is not',
          body: 'Compounded glutathione is a prescription medication prepared by a licensed compounding pharmacy; it is not an FDA-approved finished product and is not approved to treat, cure or prevent any disease. Disclose your full medical history and every medication and supplement you take at intake.',
        },
      }}
      guide={{
        heading: 'The complete guide to the glutathione patch',
        moreGuides: [
          { href: '/', label: 'Best glutathione injections 2026' },
          { href: '/best-glutathione-nasal-spray/', label: 'Best glutathione nasal spray' },
        ],
        moreGuidesHeading: 'More glutathione formats',
        children: (
          <>
            <EdGuideContents
              items={[
                { href: '#what-is-it', label: 'What the glutathione patch is' },
                { href: '#how-it-works', label: 'How iontophoresis works' },
                { href: '#cost', label: 'What it costs' },
                { href: '#compounded', label: 'Compounded glutathione and the FDA' },
              ]}
            />

            <EdGuideHeading id="what-is-it">What the glutathione patch is</EdGuideHeading>
            <EdGuideText first>
              Glutathione is a tripeptide — glutamate, cysteine and glycine — that the body produces continuously and
              uses as its main defence against oxidative stress. Most at-home programmes deliver it by injection; a
              transdermal patch is a needle-free alternative, applied to the skin once a week rather than injected or
              swallowed.
            </EdGuideText>
            <EdGuideText>
              AgelessRx is the only provider in our glutathione comparison publishing a patch alongside its injection
              and nasal spray, and it's the lowest-effort of the three formats — nothing to self-inject and no daily
              routine to keep up.
            </EdGuideText>

            <EdGuideHeading id="how-it-works">How iontophoresis works</EdGuideHeading>
            <EdGuideText first>
              The patch uses iontophoresis — a mild electrical current that helps move the compound through the skin
              barrier, the mechanism that lets it work without an injection. You complete a short online health
              questionnaire, a licensed provider reviews it, and — if approved — your patch kit ships free from a
              US-licensed pharmacy. Payment is only taken once approved.
            </EdGuideText>

            <EdGuideHeading id="cost">What it costs</EdGuideHeading>
            <EdGuideText first>
              AgelessRx bills the patch at $180 per kit, quarterly, rather than a flat monthly figure — worth factoring
              in if you're comparing it against a per-month price on the injection or spray. The online medical
              evaluation and shipping are included, and you're only charged once a licensed provider approves your
              request.
            </EdGuideText>

            <EdGuideHeading id="compounded">Compounded glutathione and the FDA</EdGuideHeading>
            <EdGuideText first>
              The glutathione patch is a compounded preparation — made by a licensed pharmacy against an individual
              prescription rather than manufactured as an approved finished product. As the{' '}
              <EdAuthorityLink href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers">
                FDA explains
              </EdAuthorityLink>
              , compounded drugs are not FDA-approved and are not reviewed for safety or effectiveness before they
              reach patients. That's why the prescriber and the pharmacy are the two things worth verifying before you
              start.
            </EdGuideText>

            <EdGuideList
              columns={1}
              items={[
                'Complete AgelessRx\'s online health questionnaire — about 30 seconds, no in-person visit.',
                'A licensed provider reviews your intake and approves only if the patch is appropriate for you.',
                'Payment is taken only after approval; your patch kit ships free from a US-licensed pharmacy.',
                'Apply one patch a week as directed, and raise any skin reaction with your provider rather than adjusting the schedule yourself.',
              ]}
            />

            <EdGuideCallout title="Before you start treatment">
              The glutathione patch is not FDA-approved to treat, cure or prevent any disease, and compounded
              glutathione is not an FDA-approved finished product. Individual response varies and no outcome is
              promised here. Consult a licensed clinician before starting, particularly if you are pregnant or
              breastfeeding, managing a chronic condition, or taking medication that affects liver metabolism.
            </EdGuideCallout>
          </>
        ),
      }}
      faqs={glutathionePatchProviders[0].faq.map((item) => ({ q: item.question, a: item.answer }))}
      faqHeading="Glutathione Patch FAQs"
    />
  );
}
