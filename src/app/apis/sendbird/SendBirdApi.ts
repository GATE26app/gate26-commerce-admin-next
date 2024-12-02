import { AxiosInstance } from 'axios';
import { useStore } from 'zustand';

import { getToken } from '@/utils/localStorage/token';
import {
  SendBirdAllChannelListDtoType,
  SendBirdChannelMessageType,
  SendBirdImageDtoType,
  SendBirdImageType,
  SendBirdMessageDtoType,
  SendBirdTokenDtoType,
  SendbirdUserListParams,
  SendbirdUserListResponse,
  SendMessageType,
} from './SendBirdApi.type';
import instance from '../_axios/instance';

export class SendBirdApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }
  
  //알림리스트
  getSendBirdToken = async (): Promise<SendBirdTokenDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'GET',
      url: '/admin/chat/token',
    });
    return data;
  };

  //이미지presignedUrl
  getSendBirdImage = async (
    res: SendBirdImageType,
  ): Promise<SendBirdImageDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/chat/channels/${res.ChannelUrl}/images/${res.imageId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  // 전체채널조회
  getSendBirdAllChannelList = async (
    token: string,
  ): Promise<SendBirdAllChannelListDtoType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/chat/channels?show_member=true${
        token !== '' ? '&token=' + token : ''
      }`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //채널 메세지 조회
  getSendBirdChannelMessage = async (
    res: SendBirdChannelMessageType,
  ): Promise<SendBirdMessageDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/chat/channels/${res.channelUrl}/messages?message_ts=${res.ts}&prev_limit=${res.prevLimit}&next_limit=${res.nextLimit}&reverse=true&include_reply_type=all&with_sorted_meta_array=true&include_reactions=true&include_thread_info=true&include_parent_message_info=true&show_subchannel_message_only=false&include_poll_details=true`,
    });
    return data;
  };

  //관리자 메세지 전송
  getMessageSend = async (
    res: SendMessageType,
  ): Promise<SendBirdMessageDtoType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/chat/channels/${res.channelUrl}/messages`,
      data: res.body,
    });
    return data;
  };

  //백업 메세지 조회
  getSendBirdBackUpMessage = async (
    res: SendBirdChannelMessageType,
  ): Promise<SendBirdMessageDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/chat/channels/${res.channelUrl}/backup-messages?message_ts=${res.ts}&prev_limit=${res.prevLimit}&next_limit=${res.nextLimit}&reverse=true&include_reply_type=all&with_sorted_meta_array=true&include_reactions=true&include_thread_info=true&include_parent_message_info=true&show_subchannel_message_only=false&include_poll_details=true`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  // 사용자 조회
  getChannelUserList = async (
    res: SendbirdUserListParams,
  ): Promise<SendbirdUserListResponse> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/chat/channels/${res.channelUrl}/members?${res.next ? `next=${res.next}` : ''}${res.limit ? `limit=${res.limit}` : ''}`,
    });
    return data;
  };
}

const sendBirdApi = new SendBirdApi();

export default sendBirdApi;
