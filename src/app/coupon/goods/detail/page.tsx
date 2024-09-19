'use client';
import React from 'react';

import { Suspense } from 'react';
import CouponGoodsDetail from '@/components/coupon/goods/CouponGoodsDetail';
function page() {
  return (
    <Suspense>
      <CouponGoodsDetail />
    </Suspense>
  );
}

export default page;
