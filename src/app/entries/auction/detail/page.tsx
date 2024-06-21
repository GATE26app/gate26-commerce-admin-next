import EntriesAuctionDetail from '@/components/entries/action/EntriesAuctionDetail';
import { Suspense } from 'react';

// import EntriesFirstContent from './_fragments/EntriesFirstContent';
function page() {
  return (
    <Suspense>
      <EntriesAuctionDetail />
    </Suspense>
  );
}

export default page;
