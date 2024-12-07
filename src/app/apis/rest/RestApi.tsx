import { AxiosInstance } from 'axios';

import instance from '../_axios/restInstance';
import { DecideMeetingMember } from './RestApi.type';

export class RestApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  postRevokeMeeting = async (params: DecideMeetingMember) => {
    const body = { meetingId: params.meetingId, userId: params.userId };
    const { data } = await this.axios({
      method: 'POST',
      url: `/rest/meeting/user/exit-paid`,
      data: body,
    });
    return data;
  };
}

const restApi = new RestApi();

export default restApi;
