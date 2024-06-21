import { usePathname } from 'next/navigation';

import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';

export default function SignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
