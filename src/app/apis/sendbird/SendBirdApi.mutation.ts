import { useMutation } from 'react-query';

import { MutationHookParams } from '../../apis/type';
import sendBirdApi from './SendBirdApi';

export const EXAMPLE_API_MUTATION_KEY = {
  POST: (param?: string) => ['item-code', param],
};

export const useChatAllListMutation = (
  params?: MutationHookParams<typeof sendBirdApi.getSendBirdAllChannelList>,
) => {
  return useMutation(sendBirdApi.getSendBirdAllChannelList, {
    ...params?.options,
  });
};

export const useChatMessageMutation = (
  params?: MutationHookParams<typeof sendBirdApi.getSendBirdChannelMessage>,
) => {
  return useMutation(sendBirdApi.getSendBirdChannelMessage, {
    ...params?.options,
  });
};
export const useSendMessageMutation = (
  params?: MutationHookParams<typeof sendBirdApi.getMessageSend>,
) => {
  return useMutation(sendBirdApi.getMessageSend, {
    ...params?.options,
  });
};

export const useSendImageMutation = (
  params?: MutationHookParams<typeof sendBirdApi.getSendBirdImage>,
) => {
  return useMutation(sendBirdApi.getSendBirdImage, {
    ...params?.options,
  });
};
