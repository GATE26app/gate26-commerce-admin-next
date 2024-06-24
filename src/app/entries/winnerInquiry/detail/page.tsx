'use client';
import EntriesWinnerDetail from '@/components/entries/winnerInquiry/detail/EntriesWinnerDetail';
import React, { Suspense } from 'react';
function page() {
  return (
    <Suspense>
      <EntriesWinnerDetail />
    </Suspense>
  );
}

export default page;
