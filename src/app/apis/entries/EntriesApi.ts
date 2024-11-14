import { AxiosInstance } from 'axios';
import instance from '../_axios/instance';
import { getToken } from '@/utils/localStorage/token';
import {
  EntriesCreateDtpType,
  EntriesListDtoType,
  EntriesListResType,
  EntriesResType,
  GetEntryParticipantParams,
  ListDtoType,
  PatchEntryLevelModifyParamReqType,
  PatchEntryModifyParamReqType,
} from './EntriesApi.type';

export class EntriesApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  //응모 목록 조회
  getEntriesList = async (
    request: EntriesListResType,
  ): Promise<EntriesListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/entries?pageNo=${request.pageNo + 1}&pageSize=${
        request.pageSize
      }${request.status != null ? '&status=' + request.status : ''}${
        request.level != 0 ? '&level=' + request.level : ''
      }${request.type != 0 ? '&type=' + request.type : ''}${
        request.searchKeyword != ''
          ? '&searchType=' +
            request.searchType +
            '&searchKeyword=' +
            request.searchKeyword
          : ''
      }`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  
  // 응모 이미지
  postEntriesImage = async (body: FormData): Promise<ListDtoType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/admin/entries-upload-image',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body,
    });
    return data;
  };

  //응모등록
  putCreateEntries = async (
    body: EntriesResType,
  ): Promise<EntriesCreateDtpType> => {
    const { data } = await this.axios({
      method: 'PUT',
      url: '/admin/entries',
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body,
    });
    return data;
  };

  //응모상세
  getEntriesDetail = async (entryId: string): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/entries/${entryId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  //응모수정
  patchEntriesModify = async (
    req: PatchEntryModifyParamReqType,
  ): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/admin/entries/${req.entryId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.data,
    });
    return data;
  };
  //응모노출여부수정
  patchEntriesLevelModify = async (
    req: PatchEntryLevelModifyParamReqType,
  ): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/admin/entries/${req.entryId}/level`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.level,
    });
    return data;
  };
  //응모삭제
  deleteEntry = async (entryId: string): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'DELETE',
      url: `/admin/entries/${entryId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  //응모 참여자 목록
  getEntryParticipant = async (
    req: GetEntryParticipantParams,
  ): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/entries/${req.entryId}/participants?pageNo=${req.pageNo}&pageSize=${req.pageSize}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //응모 당첨자 목록
  getEntryWinnerList = async (
    req: GetEntryParticipantParams,
  ): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/entries/${req.entryId}/winners?pageNo=${req.pageNo}&pageSize=${req.pageSize}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
}

const entriesApi = new EntriesApi();

export default entriesApi;
