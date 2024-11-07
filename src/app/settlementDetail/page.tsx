'use client';
import SettleDetailComponent from '@/components/Settlement/Detail/SettleDetailComponent';
import React, { Suspense } from 'react';
function page() {
  return (
    <Suspense>
      <SettleDetailComponent />
    </Suspense>
  );
}

export default page;
