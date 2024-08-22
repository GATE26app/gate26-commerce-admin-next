'use client';

import CreateGoodsComponentPage from '@/components/goods/CreateGoods/CreateGoodsComponentPage';
import { Suspense } from 'react';

function page() {
  return (
    <Suspense>
      <CreateGoodsComponentPage />
    </Suspense>
  );
}

export default page;
