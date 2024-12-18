import { AxiosInstance } from 'axios';

import instance from '../_axios/instance';

import { getToken } from '@/utils/localStorage/token';
import {
  DeniedPartnerType,
  ListDtoType,
  ParterServiceReqType,
  ParterServiceResType,
  PartnerAddFormType,
  PartnerListDTO,
  PartnerListParamGetType,
  PartnerShippingResType,
  PartnerShippingType,
  PartnerStatusResultType,
  updateStatueType,
} from './PartnersApi.type';

export class PartnersApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getPartnersList = async (
    request: PartnerListParamGetType,
  ): Promise<PartnerListDTO> => {
    const url = `/admin/partners?pageNo=${request.pageNo + 1}&pageSize=${
      request.pageSize
    }${request.searchType !== '' ? '&searchType=' + request.searchType : ''}${
      request.searchKeyword ? `&searchKeyword=${request.searchKeyword}` : ''
    }${request.level ? `&level=${request.level}` : ''}${
      request.status ? `&status=${request.status}` : ''
    }${request.type ? `&type=${request.type}` : ''}`;

    const { data } = await this.axios({
      method: 'GET',
      url: url,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //상세
  GetPartnersDetail = async (
    partnerId: string,
  ): Promise<PartnerStatusResultType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/partners/${partnerId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  postPartnersApprove = async (
    partnerId: string,
  ): Promise<PartnerStatusResultType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/partners/${partnerId}/approve`,
      // headers: {
      //   'X-AUTH-TOKEN': `${getToken().access}`,
      // },
    });
    console.log(data);
    return data;
  };

  // 반려
  postPartnersReject = async (
    req: DeniedPartnerType,
  ): Promise<PartnerStatusResultType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/partners/${req.partnerId}/denied`,
      // headers: {
      //   'X-AUTH-TOKEN': `${getToken().access}`,
      // },
      data: {
        deniedReason: req.deniedReason,
      },
    });
    return data;
  };

  // 정지
  postPartnersStop = async (
    info: updateStatueType,
  ): Promise<PartnerStatusResultType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/partners/${info.partnerId}/stop`,
      data: {
        adminMemo: info.adminMemo,
      },
    });
    return data;
  };

  // 탈퇴
  postPartnersResign = async (
    info: updateStatueType,
  ): Promise<PartnerStatusResultType> => {
    console.log(info.adminMemo, ',e');
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/partners/${info.partnerId}/resign`,
      // headers: {
      //   'X-AUTH-TOKEN': `${getToken().access}`,
      // },
      data: {
        adminMemo: info.adminMemo,
      },
    });
    return data;
  };

  // 정상
  postPartnersRestore = async (
    info: updateStatueType,
  ): Promise<PartnerStatusResultType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/partners/${info.partnerId}/restore`,
      data: {
        adminMemo: info.adminMemo,
      },
    });
    return data;
  };

  //등록
  putCreatePartners = async (
    body: PartnerAddFormType,
  ): Promise<PartnerStatusResultType> => {
    const { data } = await this.axios({
      method: 'PUT',
      url: '/admin/partners',
      // headers: {
      //   'X-AUTH-TOKEN': `${getToken().access}`,
      // },
      data: body,
    });
    return data;
  };

  //수정
  patchUpdatePartners = async (
    body: PartnerAddFormType,
  ): Promise<PartnerStatusResultType> => {
    const { data } = await this.axios({
      method: 'PUT',
      url: `/admin/partners/${body.partnerId}`,
      // headers: {
      //   'X-AUTH-TOKEN': `${getToken().access}`,
      // },
      data: body,
    });
    return data;
  };

  // 사진 등록
  postPartnersImage = async (body: FormData): Promise<ListDtoType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/admin/partners/image/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body,
    });
    return data;
  };

  // 사진 등록
  postPartnersfiles = async (body: FormData): Promise<ListDtoType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/admin/partners/file/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body,
    });
    return data;
  };

  getPartnersFileView = async (link: string): Promise<ListDtoType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/${link}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  // 배송비 추가/수정
  patchParnterShipping = async (
    body: PartnerShippingResType,
  ): Promise<ListDtoType> => {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/admin/partners/${body.partnerId}/shipping`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body.shipping,
    });
    return data;
  };

  // 서비스수수료 등록
  patchParnterService = async (
    body: ParterServiceReqType,
  ): Promise<ParterServiceResType> => {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/admin/partners/${body.partnerId}/service/${body.serviceChargePercent}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
}

const partnersApi = new PartnersApi();

export default partnersApi;
