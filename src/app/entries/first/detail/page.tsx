'use client';

import EntriesFirstDetail from '@/components/entries/first/EntriesFirstDetail';
import { Suspense } from 'react';

function page() {
  return (
    <Suspense>
      <EntriesFirstDetail />
    </Suspense>
  );
}

export default page;
