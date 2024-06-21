'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import BottomLayout from './BottomLayout';
import MainLayout from './MainLayout';

function LayoutForm({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // useEffect(() => {
  //   if (sessionStorage.getItem('mt_id') == null) {
  //     router.replace('/Login');
  //   }
  // }, [pathname]);
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
