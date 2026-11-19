// The original EdHubPage design of every landing page is kept under app/v1 and
// served at the page's own URL plus "-v1" (/best-glutathione-patch-v1/,
// /best-glutathione-nasal-spray-v1/; the homepage at /v1/ and /home-v1/).
// None of those URLs may be indexed.
const NOINDEX = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required by @opennextjs/cloudflare, which packages this standalone
  // output into the Worker it deploys to Cloudflare.
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.explorets.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.exploretreatments.com',
        pathname: '/images/**',
      },
    ],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2592000,
  },
  trailingSlash: true,
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      { source: '/v1', headers: NOINDEX },
      { source: '/v1/:path*', headers: NOINDEX },
      { source: '/home-v1', headers: NOINDEX },
      { source: '/:slug-v1', headers: NOINDEX },
    ];
  },

  async rewrites() {
    return [
      { source: '/home-v1', destination: '/v1/' },
      { source: '/:slug-v1', destination: '/v1/:slug/' },
    ];
  },
};

export default nextConfig;
