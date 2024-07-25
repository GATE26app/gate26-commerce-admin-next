'use client';
import SaveGoodsPageComponent from '@/components/goods/SaveGoods/SaveGoodsPageComponent';
import AddPartnerDetail from '@/components/partner/add/AddPertnerDetail';
import AddPartnerForm from '@/components/partner/add/AddPertnerForm';
import UpdatePartnerDetail from '@/components/partner/detail/UpdatePertnerDetail';
import React, { Suspense, useState } from 'react';

function SaveGoodsPage() {
  return (
    <Suspense>
      <AddPartnerForm />
    </Suspense>
  );
}

export default SaveGoodsPage;
