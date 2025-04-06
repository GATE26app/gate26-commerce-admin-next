"use client"

import React from 'react';
import { Box, Flex} from '@chakra-ui/react';
import SendbirdComponent from '@/components/sendbirdChat/SendbirdComponent';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

function page() {
  return (
    <Box w={'100%'} h={'600px'}>
      <Flex justifyContent={'space-between'} mb={'26px'}>
      </Flex>
      <Tabs defaultValue="members" variant='soft-rounded' colorScheme='gray'>
      <TabList h="50px" mb="30px">
        <Tab>
          {"살롱"}
        </Tab>
        <Tab>
          {"동행"}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SendbirdComponent chatGroupType='MEETING'/>
        </TabPanel>
        <TabPanel>
          <SendbirdComponent  chatGroupType='ACCOMPANY'/>
        </TabPanel>
      </TabPanels>
    </Tabs>
    </Box>
  );
}

export default page;
