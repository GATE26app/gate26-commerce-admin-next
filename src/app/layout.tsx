import type { Metadata } from 'next';
import './globals.css';
import LayoutForm from '@/components/Layout/LayoutForm';
import ReactQueryProviders from '@/utils/react-query-provider';
import withAppProvider from '@/contexts/app/app.provider';
import localFont from 'next/font/local';
// const inter = Inter({ subsets: ['latin'] });
const pretendard = localFont({
  // src:'../../../',
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: 'GATE26 | 최고 관리자',
  description: 'GATE26 | 최고 관리자',
  // ✅ 구글 소유권 확인용 메타태그 추가
  other: {
    'google-site-verification': 'k0_FRmOg2qCZ',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <ReactQueryProviders>
          <LayoutForm>{children}</LayoutForm>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
// export default withAppProvider(
//   withGlobalModalHandlerContext(withCustomModalHandlerContext(RootLayout)),
// );
