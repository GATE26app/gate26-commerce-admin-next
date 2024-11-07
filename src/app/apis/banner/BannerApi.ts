import { getToken } from '@/utils/localStorage/token/index';
import { AxiosInstance } from 'axios';

import instance from '../_axios/instance';
import {
  BannerListReqType,
  BannerListResType,
  BannerModifyType,
  ListDtoType,
} from './BannerApi.type';

export class BannerApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  //배너 조회
  getBannerList = async (request: BannerListReqType): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/banners?pageNo=${request.pageNo + 1}&pageSize=${
        request.pageSize
      }${request.level != 0 ? '&level=' + request.level : ''}${
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

  // 배너 상세
  getBannersDetail = async (bannerId: string): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/banners/${bannerId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  // 배너 등록
  getBannersCreate = async (res): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'PUT',
      url: `/admin/banners`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: res,
    });
    return data;
  };

  // 배너 등록
  getBannersModify = async (res: BannerModifyType): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/admin/banners/${res.bannerId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: res.data,
    });
    return data;
  };

  // 배너 이미지
  postBannerImage = async (body: FormData): Promise<ListDtoType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/admin/banners-upload-image',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body,
    });
    return data;
  };

  //배너삭제
  deleteBanner = async (bannerId: number): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'DELETE',
      url: `/admin/banners/${bannerId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //배너 순서 변경
  changeOrderBanner = async (body: any): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/banners/${body.bannerId}/sort/${body.order}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //배너 노출로 변경
  changeShowBanner = async (bannerId: string): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/banners/${bannerId}/show`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //배너 비노출로 변경
  changehideBanner = async (bannerId: string): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/banners/${bannerId}/hide`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
}

const bannerApi = new BannerApi();

export default bannerApi;
