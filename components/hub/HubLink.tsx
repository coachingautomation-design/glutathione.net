import type { CSSProperties, ReactNode } from 'react';
import OutboundLink from '@/components/OutboundLink';
import type { EdHubProvider } from '@/components/ed/types';

export type HubPlacement = 'hero' | 'list' | 'card' | 'sticky' | 'sidebar';

/**
 * Affiliate link for a hub card. Goes through OutboundLink, so stored ad params
 * are forwarded and the standard outbound events fire with the placement.
 */
export function HubLink({
  provider,
  vertical,
  placement,
  className,
  style,
  label,
  children,
}: {
  provider: EdHubProvider;
  vertical: string;
  placement: HubPlacement;
  className?: string;
  style?: CSSProperties;
  /** aria-label for links with no text of their own (whole-card overlays). */
  label?: string;
  children?: ReactNode;
}) {
  return (
    <OutboundLink
      href={provider.affiliateUrl}
      payload={{ vertical, provider: provider.name, providerSlug: provider.slug, placement, rank: provider.rank }}
      className={className}
      style={{ textDecoration: 'none', ...style }}
      ariaLabel={label}
    >
      {children}
    </OutboundLink>
  );
}

/** Whole-card overlay link. Sits beneath the CTA (z-index) so the button keeps its own click. */
export function HubCardOverlay({
  provider,
  vertical,
  placement,
  className = '',
}: {
  provider: EdHubProvider;
  vertical: string;
  placement: HubPlacement;
  className?: string;
}) {
  return (
    <HubLink
      provider={provider}
      vertical={vertical}
      placement={placement}
      label={`Visit ${provider.name}`}
      className={`absolute inset-0 z-[1] ${className}`}
    />
  );
}
