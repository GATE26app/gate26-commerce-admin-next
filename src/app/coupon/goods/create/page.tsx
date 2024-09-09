'use client';
import CouponGoodsCreate from '@/components/coupon/goods/CouponGoodsCreate';
import React, { Suspense } from 'react';
function page() {
  return (
    <Suspense>
      <CouponGoodsCreate />
    </Suspense>
  );
}

export default page;
