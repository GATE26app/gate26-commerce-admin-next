import { AxiosInstance } from 'axios';
import instance from '../_axios/instance';
import { getToken } from '@/utils/localStorage/token';
import {
  CouponDataResType,
  CouponListDtoType,
  CouponListResType,
  GoodsListDtoType,
  GoodsSearchDTOType,
  ListDtoType,
  PartnerListDtoType,
  PatchCouponModifyParamReqType,
  UserListDtoType,
  UserSearchType,
} from './CouponApi.type';

export class CouponApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  //쿠폰 목록 조회
  getCouponList = async (
    request: CouponListResType,
  ): Promise<CouponListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/coupons?pageNo=${request.pageNo + 1}&pageSize=${
        request.pageSize
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

  //쿠폰등록
  putCouponCreate = async (body: CouponDataResType): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'PUT',
      url: '/admin/coupons',
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body,
    });
    return data;
  };
  //쿠폰수정
  patchCouponModify = async (
    req: PatchCouponModifyParamReqType,
  ): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/admin/coupons/${req.CouponId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.data,
    });
    return data;
  };
  //쿠폰상세
  getCouponDetail = async (CounponId: string): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/coupons/${CounponId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  //쿠폰삭제
  deleteCoupon = async (CounponId: string): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'DELETE',
      url: `/admin/coupons/${CounponId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //사용자간단조화
  UserSearch = async (req: UserSearchType): Promise<UserListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/users-simple?pageNo=${req.pageNo}&pageSize=${req.pageSize}&searchKeyword=${req.searchKeyword}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  //사용자간단조화
  PartnerSearch = async (req: UserSearchType): Promise<PartnerListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/partners-simple?pageNo=${req.pageNo}&pageSize=${req.pageSize}&searchKeyword=${req.searchKeyword}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  //상품간단조화
  GoodsSearch = async (req: UserSearchType): Promise<GoodsListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/items-simple?pageNo=${req.pageNo}&pageSize=${req.pageSize}&searchKeyword=${req.searchKeyword}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
}

const couponApi = new CouponApi();

export default couponApi;
