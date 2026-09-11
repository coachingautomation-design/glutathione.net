const STORAGE_KEY = 'tracking_params';
export const CRITICAL_AD_PARAMS = ['gclid', 'fbclid', 'msclkid', 'ttclid', 'utm_source', 'utm_medium', 'utm_campaign', 'gbraid', 'wbraid', 'tblci', 'taboola_click_id'];

export function parseQueryParams(queryString: string): Record<string, string> {
  const params: Record<string, string> = {};

  if (!queryString) return params;

  const urlParams = new URLSearchParams(queryString);
  urlParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

export function storeTrackingParams(params: Record<string, string>): void {
  setStoredParams(params);
}

export function getStoredParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('[params] Failed to get stored params:', error);
    return {};
  }
}

export function setStoredParams(params: Record<string, string>): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch (error) {
    console.error('[params] Failed to set stored params:', error);
  }
}

export function mergeQueryParams(
  url: string,
  params: Record<string, string>,
  preserveExisting: boolean = true
): string {
  try {
    // Handle relative URLs by creating a temporary absolute URL
    const isAbsolute = url.startsWith('http://') || url.startsWith('https://');
    const baseUrl = isAbsolute ? '' : 'https://temp.com';
    const fullUrl = isAbsolute ? url : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;

    const urlObj = new URL(fullUrl);

    Object.entries(params).forEach(([key, value]) => {
      if (!preserveExisting || !urlObj.searchParams.has(key)) {
        urlObj.searchParams.set(key, value);
      }
    });

    // Return just the path + search for relative URLs
    if (!isAbsolute) {
      return urlObj.pathname + urlObj.search + urlObj.hash;
    }

    return urlObj.toString();
  } catch (error) {
    console.error('[params] Failed to merge query params:', error);
    return url;
  }
}

/**
 * Embody affiliate links (RevOffers offer_id=1548, across GLP-1, NAD+, Rodeo,
 * Sermorelin and Glutathione) get a dynamic `source` stamped with the current
 * page slug, so click attribution reflects the page the click came from. This
 * overrides any static `source` baked into the URL. No-op on the server and for
 * every non-Embody URL.
 */
export function withEmbodyPageSource(url: string): string {
  if (typeof window === 'undefined') return url;
  try {
    if (!/revoffers\.com/.test(url) || !/[?&]offer_id=1548(?:&|$)/.test(url)) return url;
    const urlObj = new URL(url);
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    urlObj.searchParams.set('source', path === '' ? 'home' : path.replace(/\//g, '_'));
    return urlObj.toString();
  } catch (error) {
    console.error('[params] Failed to apply Embody page source:', error);
    return url;
  }
}

export function getCriticalAdParams(params: Record<string, string>): Record<string, string> {
  const critical: Record<string, string> = {};

  CRITICAL_AD_PARAMS.forEach(key => {
    if (params[key]) {
      critical[key] = params[key];
    }
  });

  return critical;
}

export function validateParameters(
  storedParams: Record<string, string>,
  finalUrl: string
): {
  allParamsForwarded: boolean;
  criticalParamsFound: string[];
  trafficSource: string | null;
} {
  const urlObj = new URL(finalUrl);
  const criticalParams = getCriticalAdParams(storedParams);
  const criticalKeys = Object.keys(criticalParams);

  const criticalParamsFound = criticalKeys.filter(key =>
    urlObj.searchParams.has(key)
  );

  let trafficSource: string | null = null;
  if (urlObj.searchParams.has('gclid')) trafficSource = 'google';
  else if (urlObj.searchParams.has('fbclid')) trafficSource = 'facebook';
  else if (urlObj.searchParams.has('msclkid')) trafficSource = 'microsoft';
  else if (urlObj.searchParams.has('ttclid')) trafficSource = 'tiktok';
  else if (urlObj.searchParams.has('utm_source')) trafficSource = urlObj.searchParams.get('utm_source');

  return {
    allParamsForwarded: criticalKeys.length === 0 || criticalParamsFound.length === criticalKeys.length,
    criticalParamsFound,
    trafficSource,
  };
}
