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
    NEXT_PUBLIC_SENDBIRD_APP_ID:
      process.env.NODE_ENV === "production"
        ? '78B8D84A-E617-493C-98CA-2D15F647923B' // 운영 환경
        : '66FCC048-72FA-40D7-BCE7-89F42D63600B', // 개발 환경

    // vercel환경
    NEXT_PUBLIC_SENDBIRD_APP_ID:
      process.env.VERCEL_ENV === 'production'
        ? '78B8D84A-E617-493C-98CA-2D15F647923B' // 운영
        : '66FCC048-72FA-40D7-BCE7-89F42D63600B', // 개발 또는 preview

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
