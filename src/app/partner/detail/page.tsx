'use client';
import SaveGoodsPageComponent from '@/components/goods/SaveGoods/SaveGoodsPageComponent';
import UpdatePartnerDetail from '@/components/partner/detail/UpdatePertnerDetail';
import React, { Suspense, useState } from 'react';

function PartnerDetailPage() {
  return (
    <Suspense>
      <UpdatePartnerDetail />
    </Suspense>
  );
}

export default PartnerDetailPage;
