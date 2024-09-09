'use client';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import '@sendbird/uikit-react/dist/index.css';
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
import {
  GroupChannelProvider,
  useGroupChannelContext,
} from '@sendbird/uikit-react/GroupChannel/context';
import { GroupChannelHeader } from '@sendbird/uikit-react/GroupChannel/components/GroupChannelHeader';
import { GroupChannelUI } from '@sendbird/uikit-react/GroupChannel/components/GroupChannelUI';
import { FileViewer } from '@sendbird/uikit-react/GroupChannel/components/FileViewer';
import { FrozenNotification } from '@sendbird/uikit-react/GroupChannel/components/FrozenNotification';
import { Message } from '@sendbird/uikit-react/GroupChannel/components/Message';
import {
  MessageInputWrapper,
  VoiceMessageInputWrapper,
} from '@sendbird/uikit-react/GroupChannel/components/MessageInputWrapper';
import { MessageList } from '@sendbird/uikit-react/GroupChannel/components/MessageList';
import { RemoveMessageModal } from '@sendbird/uikit-react/GroupChannel/components/RemoveMessageModal';
import { TypingIndicator } from '@sendbird/uikit-react/GroupChannel/components/TypingIndicator';
import { UnreadCount } from '@sendbird/uikit-react/GroupChannel/components/UnreadCount';
import { SuggestedMentionList } from '@sendbird/uikit-react/GroupChannel/components/SuggestedMentionList';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
import {
  GroupChannelListProvider,
  useGroupChannelListContext,
} from '@sendbird/uikit-react/GroupChannelList/context';
import { AddGroupChannel } from '@sendbird/uikit-react/GroupChannelList/components/AddGroupChannel';
import { GroupChannelListUI } from '@sendbird/uikit-react/GroupChannelList/components/GroupChannelListUI';
import { GroupChannelListHeader } from '@sendbird/uikit-react/GroupChannelList/components/GroupChannelListHeader';
import { GroupChannelListItem } from '@sendbird/uikit-react/GroupChannelList/components/GroupChannelListItem';
import { GroupChannelPreviewAction } from '@sendbird/uikit-react/GroupChannelList/components/GroupChannelPreviewAction';
import OpenChannel from '@sendbird/uikit-react/OpenChannel';
import {
  ColorBackRed,
  ColorInputBorder,
  ColorRed,
  ColorRed50,
  ColorRedOpa,
} from '@/utils/_Palette';
import axios from 'axios';
const myColorSet = {
  '--sendbird-light-primary-500': ColorRedOpa,
  '--sendbird-light-primary-400': ColorRed50,
  '--sendbird-light-primary-300': ColorRed,
  '--sendbird-light-primary-200': ColorRed50,
  '--sendbird-light-primary-100': ColorBackRed,
};

const CustomMessageInput = () => {
  const { sendUserMessage } = useGroupChannelContext();
  const { currentChannel } = useGroupChannelContext();

  const sendAdminMessage = async (message) => {
    const url = `/sendbird/v3/group_channels/${currentChannel.url}/messages`;
    const headers = {
      'Content-Type': 'application/json; charset=utf8',
      // 'Api-Token': '4ffb2f107b47d128100a3a3dd9c767c708f0c3bf',
    };
    const data = {
      message_type: 'ADMM',
      message: message.message,
      // Channel: '78B8D84A-E617-493C-98CA-2D15F647923B',
    };

    try {
      const response = await axios.post(url, data, { headers });
      console.log('Admin message sent:', response.data);
    } catch (error) {
      console.error('Error sending admin message:', error);
    }
  };

  const handleSendMessage = (event) => {
    if (event.key === 'Enter') {
      const message = event.target.value;
      if (message.trim()) {
        sendAdminMessage({ message });
        event.target.value = '';
      }
    }
  };

  return (
    <div style={{ marginTop: '15px', marginLeft: '15px', marginRight: '15px' }}>
      {/* <InputBox onKeyDown={handleSendMessage} /> */}
      <input
        type="text"
        placeholder="채팅을 입력해주세요."
        style={{
          width: '100%',
          padding: '10px',
          borderColor: ColorInputBorder,
          borderWidth: 1,
          borderRadius: '10px',
          outline: 'none',
        }}
        onKeyDown={handleSendMessage}
      />
      {/* 파일 전송 버튼을 제거하거나 비활성화 */}
    </div>
  );
};
function page() {
  const [currentChannelUrl, setCurrentChannelUrl] = useState('');

  console.log('currentChannelUrl', currentChannelUrl);
  const handleSetCurrentChannel = (channel) => {
    if (channel?.url) {
      console.log('channel.url', channel.url);
      setCurrentChannelUrl(channel.url);
    }
  };
  return (
    <Box w={'100%'} h={'calc(100vh - 402px)'} pt={'60px'}>
      {' '}
      <SendbirdProvider
        appId={'78B8D84A-E617-493C-98CA-2D15F647923B'}
        userId="dmonster"
        accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1IjoyMDc1MjUxODksInYiOjEsImUiOjE3MjU5NDUwMTR9.tMfJZMOuZZHHIk13psVLFYNPyYxPyYRQ2YlRSpxfh3U"
        theme="light"
        // dateLocale={kr}
        colorSet={myColorSet}
        uikitOptions={{
          groupChannel: {
            enableMention: false,
            enableOgtag: true,
            enableTypingIndicator: true,
            input: {
              camera: {
                enablePhoto: true,
                enableVideo: true,
              },
              gallery: {
                enablePhoto: true,
                enableVideo: true,
              },
              enableDocument: true,
            },
          },
        }}
      >
        <Flex flexDirection={'row'} h={'100%'}>
          <GroupChannelList
            // enableTypingIndicator={false}
            renderHeader={(props) => (
              // <CustomGroupChannelListHeader />
              <GroupChannelListHeader
              // renderMiddle={() => (
              // <Flex alignItems={'center'} gap={'10px'}>
              //   <Box
              //     borderRadius={'50px'}
              //     overflow={'hidden'}
              //     w={'32px'}
              //     h={'32px'}
              //   >
              //     <img
              //       style={{
              //         width: '32px',
              //         height: '32px',
              //         objectFit: 'cover',
              //       }}
              //       src={
              //         partnerInfo.images !== undefined &&
              //         partnerInfo.images.length > 0
              //           ? `${imgPath()}${partnerInfo.images[0].thumbnailImagePath}`
              //           : '/images/header/icon_header_user.png'
              //       }
              //       alt="이미지 업로드"
              //     />
              //   </Box>
              //   {/* <Text>{props}</Text> */}
              //   <Text color={ColorBlack} fontSize={'16px'} fontWeight={500}>
              //     {partnerInfo.title}
              //   </Text>
              // </Flex>
              // )}
              />
            )}
            // renderIconButton={() => <></>}
            onChannelSelect={handleSetCurrentChannel}
            onChannelCreated={() => {
              console.log('2222');
            }}
          />
          <GroupChannel
            channelUrl={currentChannelUrl}
            onBackClick={() => console.log('back')}
            renderMessageInput={() => <CustomMessageInput />}
          />
        </Flex>
      </SendbirdProvider>
    </Box>
  );
}

export default page;
