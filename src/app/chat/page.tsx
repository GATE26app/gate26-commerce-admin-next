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

function page() {
  return <Box w={'100%'} h={'calc(100vh - 402px)'} pt={'60px'}></Box>;
}

export default page;
