import { AxiosInstance } from 'axios';

import instance from '../_axios/instance';

import { getToken } from '@/utils/localStorage/token';

import {
  CategoryDtoType,
  DeleteType,
  GoodsCreateDtoType,
  GoodsItemProps,
  GoodsItemType,
  GoodsListDtoType,
  GoodsListParamGetType,
  GoodsLogItemReqType,
  GoodsLogItemType,
  GoodsReqProps,
  ItemApproveReqType,
  ItemApproveResType,
  ItemDeniedReqType,
  ListDtoType,
  LocationDtoType,
  PatchGoodsStatusParmaType,
  PatchOptionStockType,
  PatchUpdateGoodsStatusParmaType,
  RequestDTOType,
  basicDtotype,
} from './GoodsApi.type';

export class GoodsApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // userZuInfo = useStore(useUserZuInfo, (state) => state.userZuInfo);
  //상품리스트
  getGoodsList = async (
    request: GoodsListParamGetType,
  ): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/items?pageNo=${request.pageNo + 1}&pageSize=${
        request.pageSize
      }${request.status != null ? '&status=' + request.status : ''}${
        request.level != 0 ? '&level=' + request.level : ''
      }${request.forSale != 0 ? '&forSale=' + request.forSale : ''}${
        request.searchKeyword != ''
          ? '&searchType=' +
            request.searchType +
            '&searchKeyword=' +
            request.searchKeyword
          : ''
      }${request.partnerId !== '' ? '&partnerId=' + request.partnerId : ''}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  //상품 삭제
  getGoodsDelete = async (req: DeleteType): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'DELETE',
      url: `/admin/items/${req.itemCode}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  //상품 상세
  getGoodsDetail = async (itemCode: string): Promise<ListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/items/${itemCode}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  // 상품코드 발급
  postItemCode = async (): Promise<basicDtotype> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/admin/generate-item-code',
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //카테고리
  getCategory = async (): Promise<CategoryDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: '/admin/categories',
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  //지역 리스트
  getLoation = async (): Promise<LocationDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: '/admin/locations',
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  getCommonCodeById = async (
    type: string,
    codeName: string,
  ): Promise<basicDtotype> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': `${getToken()}`,
      },
      url: `/common/codes?type=${type}&keyword=${codeName}`,
    });
    return data;
  };

  // 이미지
  postImage = async (body: FormData): Promise<ListDtoType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: '/admin/items/image/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body,
    });
    return data;
  };

  //상품등록
  putCreateGoods = async (body: GoodsReqProps): Promise<GoodsCreateDtoType> => {
    const { data } = await this.axios({
      method: 'PUT',
      url: '/admin/items',
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body,
    });
    return data;
  };

  //상품 수정 [버전변경]
  putUpdateGoods = async (
    req: PatchUpdateGoodsStatusParmaType,
  ): Promise<GoodsCreateDtoType> => {
    const { data } = await this.axios({
      method: 'PUT',
      url: `/admin/items/${req.itemCode}/${req.itemId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.data,
    });
    return data;
  };

  //상품 리스트 로그 목록
  getGoodsLogList = async (itemCode: string): Promise<GoodsCreateDtoType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/items/${itemCode}/logs`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  //상품 리스트 로그 상세
  getGoodsLogItem = async (
    req: GoodsLogItemReqType,
  ): Promise<GoodsCreateDtoType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/items/${req.itemCode}/logs/${req.itemId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //상품 노출여부 수정
  patchStatus = async (
    req: PatchGoodsStatusParmaType,
  ): Promise<GoodsCreateDtoType> => {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/admin/items/${req.itemCode}/${req.itemId}/level`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.data,
    });
    return data;
  };

  //상품 옵션 갯수수정
  patchOptionStockModify = async (
    req: PatchOptionStockType,
  ): Promise<GoodsCreateDtoType> => {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/admin/items/${req.itemCode}/${req.itemId}/stock`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.data,
    });
    return data;
  };
  // 상품승인
  postItemApprove = async (
    req: ItemApproveReqType,
  ): Promise<ItemApproveResType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/items/${req.itemCode}/${req.itemId}/approve`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  // 상품거절
  postItemDenied = async (
    req: ItemDeniedReqType,
  ): Promise<ItemApproveResType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/items/${req.itemCode}/${req.itemId}/denied`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.deniedReason,
    });
    return data;
  };
}

const goodsApi = new GoodsApi();

export default goodsApi;
