'use client';
import CouponPartnerCreate from '@/components/coupon/partner/CouponPartnerCreate';
import React, { Suspense } from 'react';
function page() {
  return (
    <Suspense>
      <CouponPartnerCreate />
    </Suspense>
  );
}

export default page;
