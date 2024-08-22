/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/backoffice/:path*',
  //       destination: 'http://cdbackoffice.gate26.co.kr/:path*',
  //     },
  //   ];
  // },

  async redirects() {
    return [
      {
        source: '/backoffice/:path*',
        // destination: 'https://cdbackoffice.gate26.co.kr/:path*',
       destination: 'https://commercebackoffice.gate26.co.kr/:path*',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
