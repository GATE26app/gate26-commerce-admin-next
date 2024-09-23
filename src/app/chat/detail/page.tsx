'use client';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import '@sendbird/uikit-react/dist/index.css';
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
import { GroupChannelListHeader } from '@sendbird/uikit-react/GroupChannelList/components/GroupChannelListHeader';
import { GroupChannelListItem } from '@sendbird/uikit-react/GroupChannelList/components/GroupChannelListItem';
import {
  ColorBackRed,
  ColorGray700,
  ColorRed,
  ColorRed50,
  ColorRedOpa,
} from '@/utils/_Palette';
import MessageComponent from '@/components/chat/MessageComponent';
import { useSearchParams } from 'next/navigation';

const myColorSet = {
  '--sendbird-light-primary-500': ColorRedOpa,
  '--sendbird-light-primary-400': ColorRed50,
  '--sendbird-light-primary-300': ColorRed,
  '--sendbird-light-primary-200': ColorRed50,
  '--sendbird-light-primary-100': ColorBackRed,
};

function page() {
  const searchParams = useSearchParams();
  const getToken = searchParams.get('token');
  const getChannelUrl = searchParams.get('channelUrl');
  console.log('getToken', getToken);
  console.log('getChannelUrl', getChannelUrl);
  return (
    <Box w={'100%'} h={'calc(100vh - 402px)'} pt={'60px'}>
      {/* <SendbirdProvider
        appId={'78B8D84A-E617-493C-98CA-2D15F647923B'}
        userId="dmonster"
        accessToken={getToken}
        theme="light"
        colorSet={myColorSet}
      >
        <Flex flexDirection={'row'} h={'100%'}>
          {getChannelUrl !== '' && (
            <GroupChannel
              channelUrl={getChannelUrl}
              onBackClick={() => console.log('back')}
            />
          )}
        </Flex>
      </SendbirdProvider> */}
    </Box>
  );
}

export default page;
