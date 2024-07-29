'use client';

import GoodsMainList from '@/components/goods/GoodsMainList';
import PartnerMainList from '@/components/partner/PartnerMainList';
import { Suspense } from 'react';

function page() {
  return (
    <Suspense>
      <PartnerMainList />
    </Suspense>
  );
}

export default page;
