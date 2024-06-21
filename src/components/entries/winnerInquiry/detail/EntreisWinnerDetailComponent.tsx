import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

import EntriesLeftComponent from './EntriesLeftComponent';
import EntriesRightComponent from './EntriesRightComponent';
import { EntriesDetailType } from '@/app/apis/entries/EntriesApi.type';

interface Props {
  data: EntriesDetailType;
}
function EntreisWinnerDetailComponent({ data }: Props) {
  return (
    <Flex gap={'40px'}>
      <Box w={'50%'}>
        {data !== undefined && <EntriesLeftComponent data={data} />}
      </Box>
      <Box w={'50%'}>
        <EntriesRightComponent />
      </Box>
    </Flex>
  );
}

export default EntreisWinnerDetailComponent;
