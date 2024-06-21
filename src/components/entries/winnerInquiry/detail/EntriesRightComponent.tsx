import React, { Suspense, useEffect } from 'react';

import { Flex, useEditable } from '@chakra-ui/react';

import ApplyTable from './ApplyTable';
import WinnerTable from './WinnerTable';
function EntriesRightComponent() {
  return (
    <Flex flexDirection={'column'} gap={'60px'}>
      <Suspense>
        <>
          <WinnerTable />
          <ApplyTable />
        </>
      </Suspense>
    </Flex>
  );
}

export default EntriesRightComponent;
