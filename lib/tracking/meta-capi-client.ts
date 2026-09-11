import { getVerticalPrefix } from './vertical-prefix';

/**
 * Server-side Meta CAPI events, fired from the browser via /api/meta-capi.
 *
 * These go to the single CAPI pixel configured in lib/tracking/meta-capi-server.ts
 * — the same pipeline that produces the `{prefix}_pageview` events — unlike
 * browser-side `fbq('track', …)` custom events, which broadcast to every pixel
 * initialised on the page.
 *
 * Fire-and-forget: never blocks navigation, never throws.
 */
export function sendCapiEvent(eventName: string): void {
  if (typeof window === 'undefined') return;
  fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name: eventName,
      event_source_url: window.location.href,
    }),
    keepalive: true,
  }).catch(() => {});
}

/**
 * Affiliate CTA click event, named `{vertical prefix}_ctaclick` to mirror the
 * `{prefix}_pageview` naming (wl_ctaclick, tr_ctaclick, …).
 *
 * Must be called from EVERY affiliate click path — OutboundLink and every
 * component with its own window.open handler (provider cards/rows, popups,
 * carousels).
 */
export function sendCapiCtaClick(): void {
  if (typeof window === 'undefined') return;
  const prefix = getVerticalPrefix(window.location.pathname);
  sendCapiEvent(`${prefix}_ctaclick`);
}
