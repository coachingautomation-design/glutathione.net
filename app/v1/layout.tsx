import type { Metadata } from 'next';

// Frozen copies of the landing pages in their original EdHubPage design, served
// at "-v1" URLs (see the rewrites in next.config.mjs): /home-v1 (or /v1),
// /best-glutathione-nasal-spray-v1/ and /best-glutathione-patch-v1/. They exist
// for side-by-side comparison only, so every page under here is kept out of
// search results, and next.config.mjs also sends an X-Robots-Tag header for the
// same URLs. The `.v1-scope` wrapper restores the original system font stack,
// so the new Fraunces/Inter type of the live design does not leak in.
export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function V1Layout({ children }: { children: React.ReactNode }) {
  return <div className="v1-scope">{children}</div>;
}
