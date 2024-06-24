'use client';

import GoodsMainList from '@/components/goods/GoodsMainList';
import { getToken } from '@/utils/localStorage/token';
import { Suspense } from 'react';

// import { useGoodsStateZuInfo } from '_store/StateZuInfo';
// import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';
function page() {
  return (
    // <Suspense>
    <GoodsMainList />
    // </Suspense>
  );
}

export default page;
