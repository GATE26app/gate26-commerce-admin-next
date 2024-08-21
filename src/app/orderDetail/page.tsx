'use client';
import React, { ReactElement, Suspense, useEffect, useState } from 'react';

import OrderDetailComponentPage from '@/components/order/detail/OrderDetailComponentPage';

function OrderDetailPage() {
  return (
    <Suspense>
      <OrderDetailComponentPage />
    </Suspense>
  );
}

export default OrderDetailPage;
