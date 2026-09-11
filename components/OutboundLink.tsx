'use client';

import { ReactNode, CSSProperties, MouseEvent, useState, useEffect, useRef } from 'react';
import { getStoredParams, mergeQueryParams, withEmbodyPageSource } from '@/lib/tracking/params';
import { track, trackVisitSite, trackCardClick, trackCheckPrice, trackTopChoice, trackMedviReview } from '@/lib/tracking/events';
// Internal webhook disabled — sendWebhook import removed.
import { sendCapiCtaClick } from '@/lib/tracking/meta-capi-client';

type OutboundLinkProps = {
  href: string;
  className?: string;
  children?: ReactNode;
  payload: {
    vertical: string;
    provider: string;
    providerSlug: string;
    placement: 'hero' | 'list' | 'card' | 'sticky' | 'footer' | 'sidebar' | 'success_stories';
    rank: number | null;
  };
  style?: CSSProperties;
  onMouseEnter?: (e: MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLAnchorElement>) => void;
  /** Accessible label for the anchor (useful when the whole card is the link). */
  ariaLabel?: string;
  /**
   * Extra analytics for a surface that needs its own event name, e.g. the Ro
   * slide-in firing `ro_slider_click` so its clicks stay distinguishable from
   * ordinary provider-card outbound clicks.
   *
   * This exists because `handleClick` calls `e.stopPropagation()`, so a click
   * handler on a wrapping element never sees the click. It is additive only —
   * it runs before the standard events and cannot suppress them, cannot
   * preventDefault the navigation, and cannot touch the param forwarding.
   */
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export default function OutboundLink({ href, className, children, payload, style, onMouseEnter, onMouseLeave, ariaLabel, onClick }: OutboundLinkProps) {
  const [finalHref, setFinalHref] = useState<string | null>(null);
  const clickInFlight = useRef(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const storedParams = getStoredParams();
    const merged = withEmbodyPageSource(mergeQueryParams(href, storedParams, true));
    setFinalHref(merged);
    // Tell the pre-hydration script (components/tracking/OutboundEarlyClick)
    // that React owns this anchor, so it stops firing its own fallback events
    // and we never double-count a click.
    anchorRef.current?.setAttribute('data-ol-hydrated', '1');
  }, [href]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Stop propagation to prevent parent card click handlers from firing
    e.stopPropagation();

    // Surface-specific analytics run first, before any early return, so a
    // modifier-click still counts as intent on the surface that owns it.
    onClick?.(e);

    // Middle-click / ctrl+click / cmd+click / shift/alt: let the browser open
    // naturally via target="_blank". Sub1 won't be appended for these, that's
    // acceptable.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    // Guard against double-clicks or rapid re-clicks.
    if (clickInFlight.current) {
      e.preventDefault();
      return;
    }
    clickInFlight.current = true;

    const freshParams = getStoredParams();
    const clickTimeHref = withEmbodyPageSource(mergeQueryParams(href, freshParams, true));
    const eventPayload = { ...payload, url: clickTimeHref, paramsIncluded: true, timestamp: Date.now() };

    // Internal webhook disabled — outbound clicks no longer POST to the webhook.
    // (The mergeQueryParams param-forwarding above is unaffected.)

    // Fire remaining tracking immediately, all fire-and-forget, never block navigation.
    trackVisitSite(eventPayload);

    if (payload.placement === 'card') trackCardClick(eventPayload);
    if (payload.rank === 1) trackTopChoice(eventPayload);
    if (payload.provider.toLowerCase().includes('medvi')) trackMedviReview(eventPayload);

    track('affiliate_cta_clicked', eventPayload);
    track('outbound_link_clicked', eventPayload);

    // Taboola pixel disabled — no provider_click_ob event fired.

    // Server-side CAPI event — same pixel/pipeline as {prefix}_pageview.
    sendCapiCtaClick();

    // Point the anchor at the freshest, fully param-forwarded affiliate URL and
    // let the browser's own target="_blank" open the new tab. Native anchor
    // navigation is a trusted user gesture, so it is NEVER treated as a popup
    // and can't be blocked. We deliberately do NOT call e.preventDefault() +
    // window.open() here — that async-adjacent popup path is what browser popup
    // blockers catch. Updating href guarantees the affiliate params (not the
    // bare URL) are what actually opens.
    //
    // There is deliberately no same-tab mode. It existed to dodge popup
    // blockers, but the native-anchor path above is already unblockable, so
    // same-tab navigation bought nothing and cost us the visitor — it replaced
    // our page instead of layering the affiliate site over it, so a returning
    // user had to re-find us.
    e.currentTarget.href = clickTimeHref;

    // Reset after 1 s, absorbs double-clicks while still allowing deliberate re-clicks.
    setTimeout(() => { clickInFlight.current = false; }, 1000);
  };

  // A single anchor for both the pre- and post-hydration states. It used to be
  // two branches, and the pre-hydration one carried no onClick and the bare
  // href — so a click landing before hydration lost both its ad params and
  // every analytics event. The data-* attributes below let the inlined
  // OutboundEarlyClick script cover exactly that window; see its file comment.
  return (
    <a
      ref={anchorRef}
      href={finalHref ?? href}
      target="_blank"
      rel="sponsored noopener"
      className={className}
      style={style}
      aria-label={ariaLabel}
      data-affiliate="1"
      data-affiliate-href={href}
      data-affiliate-payload={JSON.stringify(payload)}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      suppressHydrationWarning
    >
      {children}
    </a>
  );
}
