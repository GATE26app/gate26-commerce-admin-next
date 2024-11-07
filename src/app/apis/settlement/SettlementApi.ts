import { AxiosInstance } from 'axios';

import instance from '../_axios/instance';

import { getToken } from '@/utils/localStorage/token';
import { SettleDetailDtoType, SettleEctParamsType, SettleListDtoType, SettleMemoParamsType, SettleMemoResType, SettlementDetailParamsType, SettlementListParamsType, SettlementUnListParamsType, SettleUnListDtoType } from './SettlementApi.type';

export class SettlementApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  //리뷰리스트
  getSettleList = async (
    request: SettlementListParamsType,
  ): Promise<SettleListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/settlements?pageNo=${request.pageNo + 1}&pageSize=${
        request.pageSize
      }${
        request.searchKeyword != ''
          ? '&searchType=' +
            request.searchType +
            '&searchKeyword=' +
            request.searchKeyword
          : ''
      }${request.fromDate != '' ? '&fromDate=' + request.fromDate : ''}${request.toDate != '' ? '&toDate=' + request.toDate : ''}${request.status != null ? '&status=' + request.status : ''}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //미정산리스트
  getUnSettleList = async (
    request: SettlementUnListParamsType,
  ): Promise<SettleUnListDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/unsettlements?pageNo=${request.pageNo + 1}&pageSize=${
        request.pageSize
      }${request.partnerId != '' ? `&partnerId=${request.partnerId}` : ''}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //리뷰상세
  getSettleDetail = async (settleId: number, searchKeyword?: string): Promise<SettleDetailDtoType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/settlements/${settleId}${searchKeyword != '' ? `?searchKeyword=${searchKeyword}` : ''}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

//   //리뷰 노출 여부
  getSettleComplete = async (body:any): Promise<SettleMemoResType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/settlements/${body.settlementId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //기타항목추가
  PutAddEct = async (body: SettleEctParamsType): Promise<SettleMemoResType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'PUT',
      url: `/admin/settlements/${body.settlementId}/item`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: body,
    });
    return data;
  };
 
 //주문 메모 입력
 putSettleMemo = async (
  req: SettleMemoParamsType,
): Promise<SettleMemoResType> => {
  //type : code 또는 parentCode
  const { data } = await this.axios({
    method: 'PUT',
    url: `/admin/settlements/${req.settlementId}/memo`,
    headers: {
      'X-AUTH-TOKEN': `${getToken().access}`,
    },
    data: req.body,
  });
  return data;
};

}

const settlementApi = new SettlementApi();

export default settlementApi;
