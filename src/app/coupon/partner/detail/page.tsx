import React from 'react';
import { Suspense } from 'react';
import CouponPartnerDetail from '@/components/coupon/partner/CouponPartnerDetail';

function page() {
  return (
    <Suspense>
      <CouponPartnerDetail />
    </Suspense>
  );
}

export default page;
