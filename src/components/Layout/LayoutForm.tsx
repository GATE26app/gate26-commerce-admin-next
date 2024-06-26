'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import BottomLayout from './BottomLayout';
import MainLayout from './MainLayout';
import { useUserZuInfo } from '@/_store/UserZuInfo';

function LayoutForm({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { userZuInfo } = useUserZuInfo((state) => state);

  useEffect(() => {
    if (
      userZuInfo.accessToken == null ||
      userZuInfo.accessToken == '' ||
      userZuInfo.accessToken == undefined
    ) {
      router.replace('/login');
    }
  }, [userZuInfo, pathname]);

  return (
    <>
      {pathname == '/login' ? (
        <BottomLayout>{children}</BottomLayout>
      ) : (
        <MainLayout>{children}</MainLayout>
      )}
    </>
  );
}

export default LayoutForm;
