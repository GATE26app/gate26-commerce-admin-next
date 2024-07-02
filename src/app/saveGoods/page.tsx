'use client';
import SaveGoodsPageComponent from '@/components/goods/SaveGoods/SaveGoodsPageComponent';
import React, { Suspense, useState } from 'react';

function SaveGoodsPage() {
  return (
    <Suspense>
      <SaveGoodsPageComponent />
    </Suspense>
  );
}

export default SaveGoodsPage;
