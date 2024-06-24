'use client';

import UpdateGoodDetail from '@/components/goods/UpdateGoods/UpdateGoodDetail';
import { Suspense } from 'react';

function page() {
  return (
    <Suspense>
      <UpdateGoodDetail />
    </Suspense>
  );
}

export default page;
