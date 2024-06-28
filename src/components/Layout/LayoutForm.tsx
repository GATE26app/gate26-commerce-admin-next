'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import BottomLayout from './BottomLayout';
import MainLayout from './MainLayout';
import { useUserZuInfo } from '@/_store/UserZuInfo';
import { getToken } from '@/utils/localStorage/token';

function LayoutForm({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { userZuInfo } = useUserZuInfo((state) => state);

  useEffect(() => {
    if (
      getToken().access == null ||
      getToken().access == '' ||
      getToken().access == undefined
    ) {
      router.replace('/login');
    }
  }, [getToken(), pathname]);

  return (
    <>
      {pathname == '/login' ? (
        <BottomLayout>{children}</BottomLayout>
      ) : pathname == '/' ? (
        <>{children}</>
      ) : (
        <MainLayout>{children}</MainLayout>
      )}
    </>
  );
}

export default LayoutForm;
