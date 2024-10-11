'use client';
import React, { Suspense } from 'react';
import BannerModify from '@/components/banner/modify/BannerModify';

function page() {
  return (
    <Suspense>
      <BannerModify />
    </Suspense>
  );
}

export default page;
