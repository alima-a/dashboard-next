/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path((?!_next/|favicon\\.ico|auth(?:/.*)?|api/(?:login|logout)(?:/.*)?).*)',
        missing: [{ type: 'cookie', key: 'auth' }],
        destination: '/auth/login?from=/:path',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
