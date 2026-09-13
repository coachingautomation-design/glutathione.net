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
import { glutathionePatchProviders } from '@/data/providers/glutathione-patch';
import { hubProvidersFromProviders } from '@/data/providers/hub-cards';
import { generateBaseMetadata } from '@/lib/seo-schema';

/**
 * /best-glutathione-patch/ — same template, theme and single-provider
 * pattern as /best-glutathione-nasal-spray/ (see that file's header
 * comment), narrowed to AgelessRx's patch format.
 */

const VERTICAL_SLUG = 'glutathione-patch';

const META_TITLE = 'Best Glutathione Patch Providers';
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
      heading="Best Glutathione Patch Providers"
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
      // The vial shot is an injection photo — off here so a patch page
      // doesn't show the wrong product.
      showTopPickVial={false}
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
            body: 'Same weekly cadence as the patch, but delivered under the skin rather than through it — a more direct dose in exchange for a needle.',
            onPage: 'From $99 the first month, then $149/month.',
          },
          {
            name: 'Daily nasal spray',
            body: 'Also needle-free, but a daily spray built around mental clarity rather than a once-a-week whole-body patch.',
            onPage: 'From $90 the first month, then $110/month.',
          },
        ],
        callout: {
          heading: 'What this therapy is not',
          body: 'A patch is still a prescription compounded medication delivered through the skin, not an over-the-counter supplement — it is not FDA-approved to treat, cure or prevent anything, and going needle-free doesn\'t change that status. Disclose your full medical history and every medication and supplement you take before your provider approves a protocol.',
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
                { href: '#what-is-it', label: 'What iontophoresis actually is' },
                { href: '#how-it-works', label: 'Why once a week changes the calculus' },
                { href: '#cost', label: 'What a quarterly kit costs per week' },
                { href: '#compounded', label: 'Compounded patches and the FDA' },
              ]}
            />

            <EdGuideHeading id="what-is-it">What iontophoresis actually is</EdGuideHeading>
            <EdGuideText first>
              Iontophoresis uses a mild electrical current to move glutathione through the skin instead of a needle
              breaking through it. It's the least common delivery method on this page, and it's the reason
              AgelessRx's patch can claim whole-body support with nothing to inject and nothing to remember daily —
              you apply it once and leave it on.
            </EdGuideText>
            <EdGuideText>
              AgelessRx is the only provider in our glutathione comparison currently publishing a patch. See how it
              compares to the injection and spray it also sells in{' '}
              <EdGuideLink href="/">our full glutathione comparison</EdGuideLink>.
            </EdGuideText>

            <EdGuideHeading id="how-it-works">Why once a week changes the calculus</EdGuideHeading>
            <EdGuideText first>
              A once-weekly patch trades dosing frequency for less control mid-cycle — you're not adjusting anything
              between applications the way you might time an injection or skip a day of spray. That's a genuine
              upside for anyone who has missed doses on a daily routine before, and a genuine downside if you'd rather
              fine-tune as you go. Intake itself is unchanged from AgelessRx's other formats: a short online
              questionnaire, clinician review, and a US-licensed pharmacy fulfilling the order once approved.
            </EdGuideText>

            <EdGuideHeading id="cost">What a quarterly kit costs per week</EdGuideHeading>
            <EdGuideText first>
              AgelessRx bills the patch at $180 per kit, quarterly, rather than a monthly figure. Assuming a standard
              13-week quarter's supply, that works out to roughly $14/week — the number worth holding next to the
              injection's and spray's monthly prices, since "$180" on its own reads far more expensive than it
              actually runs per week. The online medical evaluation and shipping are already inside that figure.
            </EdGuideText>

            <EdProviderRow provider={providers[0]} duplicate guideCard vertical={VERTICAL_SLUG} enableVialFlip={false} />

            <EdGuideHeading id="compounded">Compounded patches and the FDA</EdGuideHeading>
            <EdGuideText first>
              A compounded transdermal patch sits under the same rule as any other compounded medication:{' '}
              <EdAuthorityLink href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers">
                the FDA does not review compounded drugs
              </EdAuthorityLink>{' '}
              for safety or effectiveness before a patient receives them. For a patch specifically, that also means
              how well it sticks and delivers the dose depends on the compounding pharmacy's own formulation, not a
              standardized one — another reason the pharmacy's licensing is worth confirming alongside the
              prescriber's.
            </EdGuideText>

            <EdProviderRow provider={providers[0]} duplicate guideCard vertical={VERTICAL_SLUG} enableVialFlip={false} />

            <EdGuideList
              columns={1}
              items={[
                'Answer AgelessRx\'s online intake so a licensed provider can confirm the patch fits your goals and health history.',
                'Once approved, you\'re billed for the quarter and your kit ships free from a US-licensed pharmacy.',
                'Apply one patch a week on the schedule your provider sets — consistency matters more than the exact day.',
                'Any skin irritation at the application site goes to your provider, not a DIY fix.',
              ]}
            />

            <EdGuideCallout title="Before you start treatment">
              The glutathione patch is not FDA-approved to treat, cure or prevent any disease, and — like every
              format on this site — it's a compounded product rather than an FDA-reviewed finished one. Response
              varies person to person. Check with a licensed clinician first if you're pregnant or breastfeeding,
              manage a chronic condition, or take medication that affects liver metabolism.
            </EdGuideCallout>
          </>
        ),
      }}
      faqs={glutathionePatchProviders[0].faq.map((item) => ({ q: item.question, a: item.answer }))}
      faqHeading="Glutathione Patch FAQs"
    />
  );
}
