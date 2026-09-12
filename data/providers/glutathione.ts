import type { Provider } from './types';

/**
 * Glutathione therapy providers for the /glutathione comparison page and the
 * standalone AgelessRx glutathione review. These live in their own file (rather
 * than the vertical registry in ./index.ts) because the glutathione landing page
 * tracks under the NAD-treatments vertical and does not use the templated
 * /[vertical]/reviews/[provider]/ route — so registering the slug in the
 * provider map would spawn thin templated review pages we do not want.
 */
export const glutathioneProviders: Provider[] = [
  {
    slug: 'system',
    name: 'System',
    logoText: 'System',
    logoUrl: 'https://assets.explorets.com/system.svg',
    rating: 9.87,
    stars: 4.94,
    tagline: 'Injectable glutathione from $69 your first month (reg. $133).',
    shortDescription: 'System offers injectable glutathione — a 2000mg monthly supply — starting at $69 for your first month (regularly $133), one of the lowest entry prices in the market. The plan includes injection supplies, 20% off a Rythm blood test and 2-day temperature-controlled shipping, with no clinic visit required. If you want an affordable, fully online path to injectable glutathione, System is the clear first choice.',
    badges: ['#1 Ranked', 'Best Value'],
    affiliate: {
      url: 'https://track.revoffers.com/aff_c?offer_id=1575&aff_id=10248&url_id=12144',
      network: 'custom',
    },
    features: [
      'Starting at $69 for your first month (regularly $133)',
      '2000mg monthly injectable supply, injection supplies included',
      '20% off a Rythm blood test, 2-day temp-controlled shipping',
    ],
    pros: [
      'Lowest entry price at $69 for your first month (down from $133)',
      'Injectable 2000mg monthly glutathione supply',
      'Injection supplies included, nothing extra to order',
      '20% off a Rythm blood test',
      'Fully online, no clinic visit required',
    ],
    cons: [
      'Price rises to $133/month after the discounted first month',
      'Compounded glutathione, not an FDA-approved finished product',
    ],
    priceRange: 'From $69 first month, then $133/month',
    bestFor: 'Anyone looking for an affordable, clinician-prescribed injectable glutathione protocol who wants to skip the clinic visit',
    reviewContent: {
      intro: 'System has built a compelling case as the most accessible entry point into injectable glutathione therapy. By combining a $69 first-month offer (down from $133) with a fully online experience, they have removed the two biggest barriers, cost and convenience, that keep patients from starting. The result is a platform that genuinely delivers on its promise: an injectable, pharmaceutical-grade protocol without a high upfront commitment.',
      whatIsIt: 'System is a fully online telehealth platform offering a clinician-prescribed, injectable glutathione protocol — a 2000mg monthly supply — marketed around glowing skin and faster recovery. Glutathione, often called the "master antioxidant", is a tripeptide produced naturally by the body that plays a central role in neutralizing free radicals, supporting liver detox pathways, and protecting cells from oxidative stress. System sources pharmaceutical-grade glutathione from licensed compounding pharmacies and ships it directly to patients with clinician oversight built in.',
      howItWorks: 'Getting started with System takes minutes online. You complete a brief health intake, a licensed clinician reviews your case and prescribes your injectable glutathione protocol, and your first shipment — injection supplies included — is prepared at a licensed compounding pharmacy and shipped via 2-day temperature-controlled delivery. Ongoing care is managed through the System platform, with clinician access available for protocol adjustments as your goals evolve.',
      whoIsItFor: 'System is the right choice for patients who want to start an injectable glutathione protocol without a large upfront financial commitment and without a clinic visit. If you are focused on skin appearance and recovery and want a straightforward, doctor-prescribed option, System delivers exactly that at the most accessible first-month price point in this market.',
      pricingDetails: 'System prices its 2000mg monthly injectable glutathione supply at $69 for the first month, discounted from a regular $133/month. Injection supplies and 20% off a Rythm blood test are included. Confirm at checkout whether the discounted rate applies to any additional months beyond the first.',
      ourVerdict: 'System earns the top spot on this page by delivering what matters most: accessible first-month pricing, an injectable format with supplies included, and a fully online experience. The $69 first-month offer dramatically lowers the cost of entry into a 2000mg monthly injectable protocol. For patients who want to start now without overcomplicating the process, System is the strongest option available — just budget for the $133/month it becomes afterward.',
    },
    faq: [
      {
        question: 'How does the $69 first-month offer work at System?',
        answer: 'New System patients start at $69 for their first month of injectable glutathione therapy, discounted from the regular $133/month. The discounted pricing is applied at signup, no coupon code required.',
      },
      {
        question: 'What format is System\'s glutathione, and what does it include?',
        answer: 'System dispenses a 2000mg monthly supply of injectable glutathione. The plan includes injection supplies and 20% off a Rythm blood test, so there is nothing extra to order before your first dose.',
      },
      {
        question: 'How does shipping work with System?',
        answer: 'System ships your compounded glutathione via 2-day temperature-controlled delivery to keep it stable in transit, with injection supplies included in the box.',
      },
      {
        question: 'Do I need a prescription for System glutathione?',
        answer: 'Yes. System requires a licensed clinician to evaluate your health intake and prescribe your glutathione protocol. This evaluation is included in the process at no extra charge.',
      },
    ],
  },
  {
    slug: 'agelessrx',
    name: 'AgelessRx',
    logoText: 'AgelessRx',
    logoUrl: 'https://assets.explorets.com/agelessrx-logo.svg',
    rating: 9.78,
    stars: 4.9,
    tagline: 'Three ways to take it, starting at $90/mo. Free shipping.',
    shortDescription: 'AgelessRx is the most established name on this list, a research-led longevity platform that has served 197,000+ customers and offers glutathione in three distinct delivery formats: a weekly injection, a daily nasal spray made for mental clarity, and a needle-free once-weekly patch. Starting at $90 a month with a 100% online medical evaluation and free shipping, AgelessRx lets you match the delivery method to your routine and your goals instead of forcing a single product on everyone.',
    badges: ['Most Established', '3 Delivery Formats'],
    affiliate: {
      url: 'https://join.agelessrx.com/energy/glutathione/ns/aff/?utm_source=everflow&utm_medium=affiliate&utm_campaign=GSHInjection_CPA_Evergreen_Affiliate&utm_content=glutathione&utm_term=aff11&_ef_transaction_id=&oid=6&affid=11&sub1=1896&sub5=&oid2=6004&affid2=1896',
      network: 'everflow',
    },
    features: [
      'Three formats: weekly injection, daily nasal spray, or once-weekly patch',
      'Starting at $90/month, 100% online medical evaluation',
      'Free shipping from a US-licensed pharmacy, 197,000+ customers served',
    ],
    pros: [
      'Three delivery formats, choose injection, nasal spray, or needle-free patch',
      'Intranasal spray shown to raise glutathione in the brain, made for mental clarity',
      'Needle-free iontophoresis patch for whole-body support without injections',
      'Established longevity platform with 197,000+ customers served',
      'Pay only if a licensed provider approves, free shipping and pause/cancel anytime',
    ],
    cons: [
      'Injection renews at $149/month after the $99 first month',
      'Patch is billed quarterly at $180 per kit, not a low monthly figure',
      'Compounded glutathione, not an FDA-approved finished product',
    ],
    priceRange: 'From $90/month',
    bestFor: 'Patients who want to match the glutathione delivery format, injection, nasal spray, or needle-free patch, to their routine, backed by an established longevity platform',
    reviewContent: {
      intro: 'AgelessRx approaches glutathione the way it approaches the rest of its longevity catalog: research-led, format-flexible, and transparent about what the evidence does and does not show. Where most telehealth providers sell a single glutathione product, AgelessRx offers three genuinely different delivery routes, a weekly injection for the most direct whole-body support, a daily nasal spray built for mental clarity, and a once-weekly needle-free patch, so you pick the one that fits your life instead of the one that happens to be in stock.',
      whatIsIt: 'AgelessRx is an established research-led longevity telehealth platform offering clinician-prescribed glutathione, the body\'s "master antioxidant," in three delivery formats. Glutathione sits at the center of the body\'s antioxidant defense, helping cells manage the oxidative byproducts of normal energy production and recycling other antioxidants so they keep working. Because levels decline with age and sustained stress, AgelessRx positions glutathione as a way to replenish that defense, with each format, injection, intranasal spray, and transdermal patch, offering a different absorption route and use case.',
      howItWorks: 'Everything happens online, and payment is only taken if a licensed provider approves the request. You pick your delivery method, injection, nasal spray, or patch, and answer a few questions about your goals and health history in about 30 seconds. A licensed provider reviews the intake and whether glutathione may be appropriate, then sets a tailored protocol. If approved, treatment ships free from a US-licensed pharmacy in discreet packaging, and you can adjust, pause, or cancel anytime with a care team alongside the whole way.',
      whoIsItFor: 'AgelessRx is the right choice for patients who want format flexibility and an established platform behind their glutathione therapy. If you want the most direct whole-body support, the weekly injection fits. If mental clarity and focus are your priority, the intranasal spray is built for that and is needle-free. If you want whole-body support with no needles at all, the once-weekly patch uses iontophoresis to absorb through the skin. It is also a strong fit for existing AgelessRx patients who want to fold glutathione into a broader longevity plan.',
      pricingDetails: 'AgelessRx prices each format separately. The Glutathione Injection is $99 for the first month, then $149/month, and is billed as a weekly injection protocol. The Glutathione Nasal Spray is $90 for the first month, then $110/month. The Glutathione Patch is $180 per kit billed quarterly, working out to a once-weekly needle-free option. All three include the online medical evaluation and free shipping, and you pay only if a licensed provider approves.',
      ourVerdict: 'AgelessRx earns a top-tier spot for one reason most competitors cannot match: real format choice from a platform with a genuine track record. The nasal spray is the standout, it is the rare glutathione product with clinical support for actually raising brain glutathione, and at $90 to start it is priced to compete. The injection is the most direct route but renews at $149/month, on the higher end, and the patch is a smart needle-free option if you can accept quarterly billing. For patients who value matching the delivery method to their goals, AgelessRx is the most versatile option on this page.',
    },
    faq: [
      {
        question: 'What glutathione formats does AgelessRx offer?',
        answer: 'AgelessRx offers three: a weekly Glutathione Injection (the most direct way to raise your levels), a daily Glutathione Nasal Spray made for mental clarity and focus, and a once-weekly needle-free Glutathione Patch that uses iontophoresis to absorb through the skin. You pick the delivery method that fits your routine and goals.',
      },
      {
        question: 'How much does AgelessRx glutathione cost?',
        answer: 'The Injection is $99 the first month, then $149/month. The Nasal Spray is $90 the first month, then $110/month. The Patch is $180 per kit, billed quarterly. All three include a 100% online medical evaluation and free shipping, and you pay only if a licensed provider approves.',
      },
      {
        question: 'Why choose the AgelessRx nasal spray over the injection?',
        answer: 'Intranasal glutathione has been shown in clinical research to raise glutathione levels in the brain, which is why AgelessRx positions the nasal spray for mental clarity and focus. It is also needle-free and part of a simple daily routine. The injection, by contrast, bypasses the gut for the most direct whole-body antioxidant support.',
      },
      {
        question: 'Is AgelessRx glutathione FDA approved?',
        answer: 'No. Glutathione has not been approved by the FDA for these or any uses, and AgelessRx\'s products are compounded by a licensed pharmacy. Multiple third-party studies support the benefits described, but compounded products are not FDA-reviewed for safety, efficacy, or quality. A licensed provider determines whether a prescription is appropriate.',
      },
      {
        question: 'Can I pause or cancel AgelessRx glutathione anytime?',
        answer: 'Yes. AgelessRx lets you adjust, pause, or cancel anytime, with a care team available throughout. Payment is only taken if a licensed provider approves your request, and shipping is free from a US-licensed pharmacy in discreet packaging.',
      },
    ],
  },
  {
    slug: 'hone',
    name: 'Hone Health',
    logoText: 'Hone Health',
    logoUrl: 'https://www.exploretreatments.com/images/Logo_Lock_Up_Black.png',
    rating: 9.74,
    stars: 4.87,
    tagline: 'Comprehensive labs included. Personalized glutathione protocol.',
    shortDescription: 'Hone Health brings clinical depth to glutathione therapy that few telehealth providers can match, comprehensive lab testing is included in the program, giving your clinician the data needed to design a personalized protocol. For patients who want more than a one-size-fits-all prescription, Hone Health delivers the monitoring and expert oversight that translates glutathione therapy into targeted, measurable results.',
    badges: ['Best Personalized Care'],
    affiliate: {
      url: 'https://track.revoffers.com/aff_c?offer_id=1291&aff_id=10248&url_id=11197',
      network: 'custom',
    },
    features: [
      'Comprehensive labs included in program',
      'Personalized glutathione protocol with clinician oversight',
      'Expert medical support and ongoing monitoring',
    ],
    pros: [
      'Comprehensive lab testing included, not a separate add-on',
      'Personalized protocol designed around your actual biomarkers',
      'Expert clinician support and ongoing monitoring',
      'Established telehealth platform with strong clinical reputation',
      'Ideal for patients with complex health histories or specific goals',
    ],
    cons: [
      'Higher starting price than entry-level options like System',
      'More comprehensive intake, takes longer than 5-minute signups',
    ],
    priceRange: 'Starting at $99/month',
    bestFor: 'Patients who want a data-driven glutathione protocol with full lab monitoring and personalized clinician oversight',
    reviewContent: {
      intro: 'Hone Health takes a different approach to glutathione therapy than budget-focused providers, they build your protocol around comprehensive lab data rather than a standard intake questionnaire. This clinical depth is valuable for patients who want their glutathione therapy calibrated to their actual oxidative stress markers, liver function, and baseline antioxidant status, not just a standard starting dose.',
      whatIsIt: 'Hone Health is a comprehensive telehealth wellness platform offering clinician-prescribed treatments including glutathione therapy. Their model emphasizes personalization: comprehensive labs are included in the program, giving clinicians the biomarker data needed to design a protocol that reflects your individual health status. Hone Health draws on a team of expert clinicians with deep experience in hormone health and wellness optimization.',
      howItWorks: 'Hone Health\'s process starts with a comprehensive health intake and lab work, both included in the program. A licensed clinician reviews your labs alongside your health history to design a glutathione protocol matched to your goals. You receive your compounded glutathione from a licensed pharmacy with clinician-directed dosing instructions. Ongoing monitoring is built in so your protocol can be adjusted as your labs and goals evolve.',
      whoIsItFor: 'Hone Health is the right choice for patients who want more than a basic glutathione prescription. If you have complex health goals, heavy metal detox, chronic oxidative stress, anti-aging optimization, or recovery from serious illness, the clinical depth of Hone\'s lab-informed approach delivers a materially better starting point than a generic protocol. It\'s also ideal for patients already using Hone for hormone health who want to integrate glutathione into a comprehensive wellness plan.',
      pricingDetails: 'Hone Health\'s glutathione program starts at approximately $99/month with comprehensive lab testing included. The full program pricing is confirmed during the intake process based on your personalized protocol. Labs are bundled into the program, not charged separately, which is a notable value distinction compared to providers who bill lab fees on top of program costs.',
      ourVerdict: 'Hone Health earns the #3 position by delivering what matters to the most serious glutathione patients: lab-informed protocols, clinical depth, and real personalization. The $69 System entry point remains the best for patients who want to start affordably, but for patients who want their therapy built around their actual biomarkers, Hone Health delivers a meaningfully superior clinical experience.',
    },
    faq: [
      {
        question: 'What labs does Hone Health include with glutathione therapy?',
        answer: 'Hone Health includes comprehensive lab testing as part of their wellness programs. For glutathione therapy, labs help clinicians assess your baseline oxidative stress, liver function, and overall health status to design a personalized protocol. The lab panel is included in your program, not a separate fee.',
      },
      {
        question: 'How does Hone Health personalize glutathione therapy?',
        answer: 'Hone Health clinicians review your comprehensive lab results alongside your health history and goals to prescribe a glutathione protocol calibrated to your individual biomarkers. Rather than starting everyone at a standard dose, the protocol reflects your actual clinical picture, which can improve outcomes for patients with specific detox, anti-aging, or recovery goals.',
      },
      {
        question: 'Is Hone Health right for patients with complex health histories?',
        answer: 'Yes. Hone Health\'s comprehensive intake and lab-based approach makes it particularly well-suited for patients with complex health backgrounds, multiple wellness goals, or specific clinical needs. The clinical depth exceeds what is possible through questionnaire-only telehealth platforms.',
      },
      {
        question: 'Can I combine Hone Health glutathione with other Hone treatments?',
        answer: 'Yes. Hone Health offers a range of wellness and hormone health programs. Patients already using Hone for hormone therapy or other treatments can add glutathione to their existing care plan, giving clinicians a complete picture of your health when designing your protocol.',
      },
    ],
  },
  {
    slug: 'shed',
    name: 'Shed',
    logoText: 'Shed',
    logoUrl: 'https://www.exploretreatments.com/images/shedrx-logo.avif',
    rating: 9.61,
    stars: 4.81,
    tagline: '20% off first month. Health coaching included.',
    shortDescription: 'Shed combines speed with value, their 5-minute signup and same-day shipping on approved orders gets your glutathione therapy started faster than any other platform. New patients receive 20% off their first month, and health coaching is included in every plan at no extra cost. For patients who want to move quickly and get lifestyle support alongside treatment, Shed delivers.',
    badges: ['Fastest Approval'],
    affiliate: {
      url: 'https://www.shm2idjl.com/BRK5HK/27P3D6/',
      network: 'everflow',
    },
    features: [
      '20% off your first month, auto-applied',
      'Health coaching included. Not an add-on.',
      '5-minute signup. Same-day shipping.',
    ],
    pros: [
      '20% first-month discount applied automatically at signup',
      'Health coaching bundled in at no extra cost',
      'Fastest 5-minute signup and same-day shipping on approved orders',
      'Mobile-friendly platform for patients who prefer phone access',
      'Flexible month-to-month subscription with no cancellation penalty',
    ],
    cons: [
      'Limited plan pricing detail available before completing signup',
      'Health coaching is general wellness, not specialized glutathione optimization',
    ],
    priceRange: '20% off first month',
    bestFor: 'Patients who want to start glutathione therapy as quickly as possible with a first-month discount and health coaching included in the base plan',
    reviewContent: {
      intro: 'Shed has a specific niche: fastest start, first-month savings, and included coaching that no budget competitor matches. For glutathione therapy specifically, this combination means patients can have their first order processing before they finish reading this comparison, and they get lifestyle guidance to help maximize the therapy\'s detox and recovery benefits.',
      whatIsIt: 'Shed is a mobile-first telehealth platform that offers clinician-prescribed glutathione therapy alongside wellness coaching. Their platform is purpose-built for speed, the entire intake, clinician review, and fulfillment process is optimized to get patients approved and shipped quickly. The included health coaching component provides guidance on nutrition, sleep, and recovery to help patients amplify glutathione\'s antioxidant and detox benefits.',
      howItWorks: 'Shed\'s intake takes approximately 5 minutes on mobile, one of the fastest in the market. You answer a short health questionnaire, a licensed clinician reviews your case, and approved patients receive same-day shipping confirmation. The wellness coaching component connects you with coaches who can advise on lifestyle factors that support glutathione efficacy. The subscription is flexible: monthly with no cancellation penalty.',
      whoIsItFor: 'Shed is the right choice for action-oriented patients who want glutathione therapy started today. If you have decided you want treatment and your main concern is friction, long intakes, waiting periods, slow shipping, Shed eliminates all of it. It\'s also valuable for patients who want lifestyle guidance alongside their protocol without paying extra for it.',
      pricingDetails: 'New Shed patients automatically receive 20% off their first month of glutathione therapy at signup. The ongoing monthly price is confirmed during the intake process. All plans include health coaching at no additional charge. Same-day shipping is available on approved orders placed on business days.',
      ourVerdict: 'Shed is the fastest way to start glutathione therapy with meaningful first-month savings. The 5-minute signup, same-day shipping, 20% discount, and included health coaching make it a compelling package for patients who want to move quickly without sacrificing support. The trade-off is lighter clinical depth compared to System\'s personalization, but for patients who are ready to start now and learn as they go, Shed is excellent.',
    },
    faq: [
      {
        question: 'How does Shed\'s 5-minute glutathione signup work?',
        answer: 'Shed\'s intake is built for mobile speed, you answer a short health questionnaire and a licensed clinician reviews your case, typically within hours. Approved patients receive same-day shipping confirmation on orders placed during business hours.',
      },
      {
        question: 'What does the 20% first-month discount cover at Shed?',
        answer: 'The 20% discount applies to your first month of glutathione therapy, automatically applied when you complete signup through the promotional link. No coupon code required.',
      },
      {
        question: 'What health coaching is included with Shed\'s glutathione plan?',
        answer: 'Shed includes access to wellness coaches who provide guidance on lifestyle, nutrition, sleep, and recovery, all areas that complement glutathione\'s detox and antioxidant effects. Coaching is bundled into every plan at no extra cost.',
      },
      {
        question: 'Can I cancel Shed\'s glutathione plan anytime?',
        answer: 'Yes. Shed offers flexible month-to-month subscriptions with no cancellation penalty, you can stop at any time.',
      },
    ],
  },
  {
    slug: 'embody',
    name: 'Embody',
    logoText: 'Embody',
    logoUrl: 'https://www.exploretreatments.com/images/embody_nad.png',
    rating: 9.55,
    stars: 4.77,
    tagline: 'Flat $99/month. Free 1-2 day shipping.',
    shortDescription: 'Embody offers clinician-prescribed glutathione therapy at a flat, fixed rate of $99 per month, no introductory pricing that jumps later. Every plan includes a 100% online medical visit, personalized dosing from 200mg to 2000mg, and the prescription itself, with no insurance required. For patients who want transparent, predictable pricing and fast free shipping that arrives in 1-2 days, Embody is a standout choice.',
    badges: ['Flat-Rate Pricing'],
    affiliate: {
      url: 'https://track.revoffers.com/aff_c?offer_id=1548&aff_id=10248&url_id=12310',
      network: 'custom',
    },
    features: [
      'Flat $99/month, glutathione in stock. Save $100 every month in the summer sale.',
      '100% online medical visit with personalized dosing from 200mg to 2000mg.',
      'Prescription & telemed visit included, no insurance required. Free shipping arrives in 1-2 days.',
    ],
    pros: [
      'Flat, fixed $99/month pricing with no first-month bait-and-switch',
      'Limited summer sale saves $100 every month',
      'Personalized dosing from 200mg up to 2000mg',
      'Telemed visit and prescription included, no insurance required',
      'Fast free shipping that arrives in 1-2 days',
    ],
    cons: [
      'Summer sale pricing is time-limited',
      'Compounded glutathione, not an FDA-approved finished product',
    ],
    priceRange: 'Flat $99/month',
    bestFor: 'Patients who want transparent, flat-rate glutathione pricing with personalized dosing and fast free shipping',
    reviewContent: {
      intro: 'Embody stands out in the glutathione market for one simple reason: transparent, flat-rate pricing. At a fixed $99 per month with no introductory rate that quietly climbs later, Embody removes the guesswork that comes with many telehealth glutathione offers. Add a limited summer sale that saves $100 every month, personalized dosing, and fast free shipping, and Embody becomes a genuinely compelling option for value-focused patients.',
      whatIsIt: 'Embody is a fully online telehealth platform offering clinician-prescribed glutathione therapy to support detox, healthy aging, and recovery. Glutathione, the body\'s master antioxidant, is prescribed after a 100% online medical visit and dosed personally to your needs, anywhere from 200mg to 2000mg. Embody sources its compounded glutathione through licensed pharmacies and ships it directly to your door with the telemed visit and prescription bundled into the flat monthly price.',
      howItWorks: 'Getting started with Embody is entirely online. You complete a 100% online medical visit, a licensed clinician reviews your case and prescribes a personalized glutathione dose between 200mg and 2000mg, and your order ships free, arriving in just 1-2 days. There is no insurance required and no clinic visit, the telemed visit and prescription are included in the flat $99 monthly price. During the limited summer sale, patients save $100 every month.',
      whoIsItFor: 'Embody is the right choice for patients who value pricing transparency and speed. If you are tired of introductory offers that spike after the first month and want a flat, predictable $99 rate, Embody delivers exactly that. It is also ideal for patients who want dosing tailored to their needs, from a conservative 200mg to a therapeutic 2000mg, and who appreciate free shipping that arrives in 1-2 days.',
      pricingDetails: 'Embody charges a flat, fixed $99 per month for glutathione therapy, with the telemed visit and prescription included and no insurance required. A limited summer sale saves patients $100 every month. Free shipping is included on every order and typically arrives within 1-2 days. Unlike promotional first-month pricing, Embody\'s flat rate means your cost stays the same month to month.',
      ourVerdict: 'Embody earns a strong position on this page by combining flat-rate transparency with genuine value. The fixed $99 monthly price, limited summer sale savings, personalized 200mg-2000mg dosing, and fast free 1-2 day shipping make it an easy recommendation for patients who want to know exactly what they will pay. For value-focused patients who dislike introductory pricing games, Embody is one of the most straightforward options available.',
    },
    faq: [
      {
        question: 'How much does Embody glutathione cost?',
        answer: 'Embody charges a flat, fixed $99 per month for glutathione therapy, with the telemed visit and prescription included and no insurance required. During the limited summer sale, patients save $100 every month. Unlike introductory offers, the flat rate stays consistent month to month.',
      },
      {
        question: 'What dosing does Embody offer?',
        answer: 'Embody offers personalized glutathione dosing ranging from 200mg to 2000mg. After your 100% online medical visit, a licensed clinician prescribes the dose that fits your goals and health profile.',
      },
      {
        question: 'How fast does Embody ship glutathione?',
        answer: 'Embody includes free shipping on every order, and shipments typically arrive within 1-2 days, one of the fastest delivery windows in this comparison.',
      },
      {
        question: 'Do I need insurance for Embody glutathione?',
        answer: 'No. Embody requires no insurance. The 100% online medical visit and prescription are included in the flat $99 monthly price, so there are no separate consultation or insurance charges.',
      },
    ],
  },
  {
    slug: 'bmimd',
    name: 'bmiMD',
    logoText: 'bmiMD',
    logoUrl: 'https://assets.explorets.com/bmimd.svg',
    rating: 9.48,
    stars: 4.74,
    tagline: 'Affordable clinician-prescribed glutathione. Free shipping.',
    shortDescription: 'bmiMD offers clinician-prescribed glutathione therapy at one of the most competitive ongoing price points in this market, with free shipping and sourcing from a licensed U.S. compounding pharmacy. For patients in eligible states who want a straightforward, affordable monthly glutathione program, bmiMD is a reliable option. Not available in AR, CA, LA, MS, or SC.',
    badges: ['Best Budget Option'],
    affiliate: {
      url: 'https://www.bmimd.com/glutathione-injection/?_ef_transaction_id=&utm_source=everflow&utm_medium=affiliate&utm_campaign=134&utm_content=144&oid2=144&aff_id2=134',
      network: 'everflow',
    },
    features: [
      'Affordable clinician-prescribed glutathione',
      'Free shipping on every order',
      'Licensed U.S. compounding pharmacy',
      'Not available in AR, CA, LA, MS, SC',
    ],
    pros: [
      'Competitive ongoing monthly pricing',
      'Free shipping included on every order',
      'Licensed U.S. compounding pharmacy sourcing',
      'Straightforward fully online prescription process',
      'No complex signup requirements',
    ],
    cons: [
      'Not available in AR, CA, LA, MS, or SC',
      'Less clinical personalization than Hone Health',
      'Fewer brand recognition and scale than larger platforms',
    ],
    priceRange: 'Competitive monthly pricing',
    bestFor: 'Patients in eligible states who want affordable, no-frills clinician-prescribed glutathione therapy with free shipping',
    reviewContent: {
      intro: 'bmiMD offers a no-frills glutathione therapy option for patients who want a straightforward, affordable prescription without the premium pricing of more clinically intensive platforms. Free shipping and licensed U.S. pharmacy sourcing are standard, making it a reliable choice for eligible patients who have done their research and simply want to start therapy at a competitive monthly price.',
      whatIsIt: 'bmiMD is a telehealth platform offering clinician-prescribed compounded medications including glutathione therapy. Their model is built around accessible pricing and a simple online prescription process backed by licensed U.S. compounding pharmacies. bmiMD has built a track record across multiple wellness verticals with a consistent focus on affordability and pharmacy quality.',
      howItWorks: 'Getting started with bmiMD is straightforward: complete an online health intake, receive a licensed clinician review, and if approved, your glutathione ships free from a licensed compounding pharmacy. The process is fully online with no in-person visits required. Free shipping is included on every order.',
      whoIsItFor: 'bmiMD is the right choice for patients in eligible states, not available in AR, CA, LA, MS, or SC, who want affordable glutathione therapy without the complexity of lab-inclusive programs or the introductory pricing strings of first-month promotional offers. It is particularly well-suited for patients who are already familiar with compounded glutathione and simply want a reliable, cost-competitive ongoing supply.',
      pricingDetails: 'bmiMD offers glutathione therapy at competitive ongoing monthly pricing with free shipping included. Pricing is confirmed during the intake process. Not available to patients in AR, CA, LA, MS, or SC, patients in these states should consider System or Hone Health instead.',
      ourVerdict: 'bmiMD earns the #6 position as a solid budget-focused glutathione option for eligible state patients. It won\'t match the personalization depth of Hone Health or the entry-price advantage of System, but for patients in eligible states who want a reliable, affordable ongoing supply from a licensed pharmacy with free shipping, bmiMD delivers exactly what it promises.',
    },
    faq: [
      {
        question: 'What states is bmiMD glutathione NOT available in?',
        answer: 'bmiMD is not available to patients in Arkansas (AR), California (CA), Louisiana (LA), Mississippi (MS), or South Carolina (SC). Patients in these states should consider System or Hone Health, which have broader state availability.',
      },
      {
        question: 'Does bmiMD include free shipping on glutathione orders?',
        answer: 'Yes. bmiMD includes free shipping on every glutathione order, shipped from their licensed U.S. compounding pharmacy directly to your door.',
      },
      {
        question: 'How does bmiMD compare to System for glutathione pricing?',
        answer: 'System offers the lowest entry price in this market at $69 for the first month (regularly $133). bmiMD offers competitive ongoing monthly pricing without introductory pricing structures. If your priority is the lowest first-month cost, System is the better choice. If you prefer consistent pricing from month one, bmiMD is a solid alternative for eligible state patients.',
      },
      {
        question: 'Is bmiMD glutathione from a licensed U.S. pharmacy?',
        answer: 'Yes. bmiMD sources all compounded medications including glutathione from licensed U.S. compounding pharmacies. As with all compounded glutathione, it is a prescription compounded medication, not an FDA-approved finished product, prepared at a licensed pharmacy.',
      },
    ],
  },
  {
    // Rating/stars follow the shared position-based scale (lib/ratings.ts
    // RATING_MAP position 7), not a hand-picked number.
    slug: 'readyrx',
    name: 'ReadyRx',
    logoText: 'ReadyRx',
    logoUrl: 'https://readyhealth.everflowclient.io/logo.png',
    rating: 8.96,
    stars: 4.48,
    tagline: 'From $84 per dose, injection or nasal spray. No membership.',
    shortDescription: 'ReadyRx offers clinician-prescribed glutathione in your choice of injection or nasal spray, priced per dose at $84 with no recurring monthly membership required. Every order includes a 100% online consultation with a licensed provider and free 1–2 day shipping, and you can cancel anytime.',
    badges: ['Format Choice', 'No Membership'],
    affiliate: {
      url: 'https://www.dpy84ben.com/6MW5NB/SL1HB/',
      network: 'everflow',
    },
    features: [
      'Injection or nasal spray, your choice',
      '$84 per dose, no monthly membership required',
      'Free 1–2 day shipping, cancel anytime',
    ],
    pros: [
      'Choice of injectable or nasal spray format',
      'No recurring monthly membership — pay per dose, cancel anytime',
      '100% online consultation with a licensed provider',
      'Free shipping with 1–2 day delivery',
      'HSA/FSA eligible',
    ],
    cons: [
      'No flat monthly subscription price — cost is per dose',
      'Compounded glutathione, not an FDA-approved finished product',
    ],
    priceRange: 'From $84 per dose',
    bestFor: 'Patients who want a choice of format (injection or nasal spray) without committing to a recurring monthly membership',
    faq: [
      {
        question: 'What glutathione formats does ReadyRx offer?',
        answer: 'ReadyRx offers both injectable and nasal spray glutathione, both listed at $84 per dose. You choose the format at intake.',
      },
      {
        question: 'Does ReadyRx require a monthly membership?',
        answer: 'No. ReadyRx prices glutathione per dose at $84 with no recurring monthly membership fee, and you can cancel anytime.',
      },
      {
        question: 'How fast does ReadyRx ship?',
        answer: 'ReadyRx includes free shipping with 1–2 day delivery on every order once a licensed provider approves your consultation.',
      },
      {
        question: 'Is ReadyRx glutathione FDA-approved?',
        answer: 'No. ReadyRx sources compounded glutathione from a licensed U.S. pharmacy; compounded drugs are not FDA-approved and are not reviewed for safety or effectiveness before reaching patients. A 100% online consultation with a licensed provider is required before anything ships.',
      },
    ],
  },
  {
    // Rating/stars follow the shared position-based scale (lib/ratings.ts
    // RATING_MAP position 8), not a hand-picked number.
    slug: 'taurus',
    name: 'Taurus',
    logoText: 'Taurus',
    logoUrl: 'https://taurusmeds.com/images/taurus-logo-red.svg',
    rating: 8.74,
    stars: 4.37,
    tagline: 'Powerful antioxidant peptide from $79/mo.',
    shortDescription: 'Taurus ships a home injection kit of glutathione (200mg/mL, 5mL per bottle) from a licensed US pharmacy, working out to about $10.75 per shot at the discounted $79 first-month rate. No insurance is required and the plan is HSA/FSA eligible, though the price steps up to $179/month after the first month.',
    badges: ['Home Injection Kit'],
    affiliate: {
      url: 'https://taurusmeds.com/pages/glutathione?_ef_transaction_id=&oid=124&aff_id=134',
      network: 'everflow',
    },
    features: [
      'No insurance required, HSA/FSA eligible',
      '200mg/mL (5mL per bottle)',
      'Shipped from licensed US pharmacy',
    ],
    pros: [
      'Low first-month price at $79',
      'Home injection kit ships directly from a licensed US pharmacy',
      'No insurance required, HSA/FSA eligible',
    ],
    cons: [
      'Renews at $179/month after the discounted first month — the highest ongoing price in this comparison',
      'Compounded glutathione, not an FDA-approved finished product',
    ],
    priceRange: 'From $79 first month, then $179/month',
    bestFor: 'Patients who want the lowest possible first-month price and plan to reassess before the $179/month renewal',
    faq: [
      {
        question: 'How much does Taurus glutathione cost after the first month?',
        answer: 'The first month is $79, working out to about $10.75 per shot. It renews at $179/month afterward — the highest ongoing price among the providers in this comparison.',
      },
      {
        question: 'What does the Taurus glutathione kit include?',
        answer: 'A home injection kit dosed at 200mg/mL in a 5mL bottle, shipped from a licensed US pharmacy. No insurance is required, and the plan is HSA/FSA eligible.',
      },
      {
        question: 'Is Taurus glutathione FDA-approved?',
        answer: 'No. Taurus\'s glutathione is a compounded medication; compounded drugs are not FDA-approved and are not reviewed for safety or effectiveness before reaching patients.',
      },
    ],
  },
  {
    // Rating/stars follow the shared position-based scale (lib/ratings.ts
    // RATING_MAP position 9), not a hand-picked number.
    slug: 'joi-plus-blokes',
    name: 'Joi + Blokes',
    logoText: 'Joi + Blokes',
    logoUrl: 'https://assets.explorets.com/Joi%20%2B%20Blokes%20logo-Black.png',
    rating: 8.42,
    stars: 4.21,
    tagline: 'From $69/month with 1:1 health coaching included.',
    shortDescription: 'Joi + Blokes prescribes subcutaneous glutathione injections, 1–2 times a week from a 15-week supply, starting at $69/month with subscribe & save (or $86/month one-time). A board-certified clinician consultation, 1:1 health coaching and unlimited care-team messaging are bundled into the plan rather than sold separately.',
    badges: ['Coaching Included'],
    affiliate: {
      url: 'https://joiandblokes.com/shop/women/longevity/glutathione/?_ef_transaction_id=&utm_source=everflow&utm_medium=affiliate&utm_campaign=134&utm_content=161&oid2=161&aff_id2=134',
      network: 'everflow',
    },
    features: [
      'From $69/month with subscribe & save, or $86/month one-time',
      '1–2 subcutaneous injections per week, 15-week supply',
      '1:1 health coaching and unlimited care-team messaging included',
    ],
    pros: [
      'Lowest ongoing subscription price in this comparison at $69/month',
      '1:1 health coaching and lifestyle support bundled in, not sold separately',
      'Board-certified clinician consultation required before prescribing',
      'Unlimited messaging with your care team',
    ],
    cons: [
      '1–2 injections per week is a more frequent routine than the once-weekly formats on this page',
      'Compounded glutathione, not an FDA-approved finished product',
    ],
    priceRange: 'From $69/month (subscribe & save), $86/month one-time',
    bestFor: 'Patients who want the lowest ongoing subscription price plus health coaching bundled into the plan',
    faq: [
      {
        question: 'How much does Joi + Blokes glutathione cost?',
        answer: 'Subscribe & save pricing starts at $69/month (a 15-week supply, roughly 20% off); a one-time purchase of the same supply is $86/month. Both include free shipping on the subscription plan.',
      },
      {
        question: 'What is included with Joi + Blokes glutathione?',
        answer: 'A board-certified clinician consultation, 1:1 health coaching, lifestyle and nutrition support, and unlimited messaging with your care team are all bundled into the plan, alongside home delivery of your medication.',
      },
      {
        question: 'How often do I inject with Joi + Blokes?',
        answer: 'The subcutaneous glutathione injections are dosed 1–2 times per week from a 15-week supply — more frequent than the once-weekly formats offered elsewhere in this comparison.',
      },
      {
        question: 'Is Joi + Blokes glutathione FDA-approved?',
        answer: 'No. Joi + Blokes\'s glutathione is a compounded medication; compounded drugs are not FDA-approved and are not reviewed for safety or effectiveness before reaching patients. A board-certified clinician evaluates your intake before anything ships.',
      },
    ],
  },
];
