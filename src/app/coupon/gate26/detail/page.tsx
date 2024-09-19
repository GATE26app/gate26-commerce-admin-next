'use client';

import CouponGate26Detail from '@/components/coupon/gate26/CouponGate26Detail';
import { Suspense } from 'react';
function page() {
  return (
    <Suspense>
      <CouponGate26Detail />
    </Suspense>
  );
}

export default page;
