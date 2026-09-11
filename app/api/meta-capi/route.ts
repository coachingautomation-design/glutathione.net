import { NextResponse } from 'next/server';

/**
 * Meta CAPI sink. `lib/tracking/meta-capi-client.ts` POSTs affiliate-click
 * events here (fire-and-forget, ignores the response). This site has no Meta
 * Conversions API pixel configured yet, so the route just acknowledges the
 * request rather than forwarding it anywhere. When a Meta pixel is set up for
 * glutathione.net, forward the event server-side to Meta's Graph API from
 * here.
 */
export async function POST() {
  return NextResponse.json({ received: true });
}
