export type FAQItem = {
  question: string;
  answer: string;
};

export type Provider = {
  slug: string;
  name: string;
  logoText: string;
  logoUrl?: string;
  /**
   * Product shot of this provider's own glutathione vial. Shown on the back of
   * the #1 pick's logo on hover and in the sidebar's top-pick module; a #1
   * provider without one simply doesn't flip, so no page shows another brand's
   * vial under the wrong name.
   */
  vialImageUrl?: string;
  rating: number;
  stars: number;
  shortDescription: string;
  badges: string[];
  affiliate: { url: string; network: 'everflow' | 'impact' | 'custom' | 'katalys'; official_url?: string };
  features: string[];
  pros: string[];
  cons: string[];
  priceRange: string;
  bestFor: string;
  faq: FAQItem[];
  tagline?: string;
  /** Optional small-print note rendered under the card features (e.g. an affiliate-detail disclaimer). */
  disclaimerNote?: string;
  userVotes?: number;
  reviewCount?: number;
  datePublished?: string;
  dateModified?: string;
  reviewContent?: {
    intro: string;
    whatIsIt: string;
    howItWorks: string;
    whoIsItFor: string;
    pricingDetails: string;
    ourVerdict: string;
  };
  interlinks?: Array<{ label: string; href: string; description: string }>;
  /**
   * Other treatments this provider sells outside the vertical the card sits in
   * — e.g. Willow offering NAD+ alongside its GLP-1 programme. Each carries its
   * own affiliate URL, so these must be rendered through OutboundLink like any
   * other affiliate link. Optional: omit unless the provider genuinely offers
   * something beyond the current vertical.
   */
  additionalTreatments?: Array<{ label: string; url: string; description?: string }>;
  /**
   * Optional second affiliate destination rendered under the primary "Visit Site"
   * CTA — e.g. a provider's free assessment/intake flow, which converts on a
   * different intent than the storefront. Rendered through OutboundLink like the
   * primary CTA, so stored ad params are forwarded onto it too. Omit unless the
   * provider genuinely has a distinct second entry point worth its own click.
   */
  secondaryCta?: { label: string; url: string };
  /** When true, the provider offer is unavailable — no active purchase CTA is shown. */
  unavailable?: boolean;
  /** When true, the provider is hidden from every listing/comparison surface (kept only for direct lookups). */
  hidden?: boolean;
};
