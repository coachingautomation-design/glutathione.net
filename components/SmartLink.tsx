'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode, useState, useEffect, useMemo, CSSProperties, MouseEvent } from 'react';
import { getStoredParams, mergeQueryParams } from '@/lib/tracking/params';
import { track } from '@/lib/tracking/events';

type Props = LinkProps & {
  children: ReactNode;
  className?: string;
  eventName?: string;
  eventPayload?: Record<string, string | number | boolean | null>;
  style?: CSSProperties;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export default function SmartLink({ children, href, className, eventName, eventPayload, style, onClick, ...rest }: Props) {
  const hrefValue = useMemo(() => typeof href === 'string' ? href : href.toString(), [href]);

  const [finalHref, setFinalHref] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    // Only skip parameter forwarding for absolute external URLs (http/https)
    if (hrefValue.startsWith('http://') || hrefValue.startsWith('https://')) {
      setFinalHref(hrefValue);
      return;
    }

    // Forward parameters to all internal URLs:
    // - Absolute paths: /weight-loss
    // - Relative paths: ../other-page
    // - Hash links: #section
    // - Query-only: ?param=value
    const storedParams = getStoredParams();
    const merged = mergeQueryParams(hrefValue, storedParams);
    setFinalHref(merged);
  }, [hrefValue]);

  const displayHref = mounted && finalHref ? finalHref : hrefValue;

  return (
    <Link
      {...rest}
      href={displayHref}
      className={className}
      style={style}
      onClick={(e) => {
        if (eventName) track(eventName, { ...eventPayload, timestamp: Date.now() });
        if (onClick) onClick(e);
      }}
      suppressHydrationWarning
    >
      {children}
    </Link>
  );
}
