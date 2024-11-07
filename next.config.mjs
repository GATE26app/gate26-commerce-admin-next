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
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: 'AIzaSyBLx620AeBQnveLI0c7kflx282CNVlJQU8',
    SECRET_KEY: 'IDT-ReGate26',
    URL_API: 'https://web.gate26.co.kr',
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
        destination: 'https://commercebackoffice.gate26.co.kr/:path*',
        permanent: false
      },
      {
        source: '/api/rest/:path*',
        // destination: 'https://auth.gate26.co.kr/auth/:path*',
        destination: 'https://rest.gate26.co.kr/rest/:path*',
        // destination: 'http://10.254.121.143:40000/auth/:path*',
        permanent: false,
      },
    ];
  }
};

export default nextConfig;
