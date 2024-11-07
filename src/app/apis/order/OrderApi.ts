import { AxiosInstance } from 'axios';

import { getToken } from '@/utils/localStorage/token';

import {
  OrderCacelFeeType,
  OrderCancelFeeItemResType,
  OrderCancelParamsType,
  OrderCancelRequestParamsType,
  OrderConfrimParamsType,
  OrderDetailItemResType,
  OrderGroupResType,
  OrderGroupType,
  OrderListDtoType,
  OrderListParamsType,
  OrderMemoParamsType,
  OrderRequestCancelType,
  OrderShoppingParamsType,
} from './OrderApi.type';
import instance from '../_axios/instance';

export class OrderApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }
  //주문리스트
  getOrderList = async (
    request: OrderListParamsType,
  ): Promise<OrderListDtoType> => {
    //type : code 또는 parentCode
    var cancelText =
      request.cancelStatus !== undefined && request.cancelStatus.length > 0
        ? request.cancelStatus
            .map((number) => `&cancelStatus=${number}`)
            .join('')
        : '';

    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/orders?pageNo=${request.pageNo + 1}&pageSize=${
        request.pageSize
      }${
        request.searchKeyword != ''
          ? '&searchType=' +
            request.searchType +
            '&searchKeyword=' +
            request.searchKeyword
          : ''
      }${request.orderType != 0 ? '&orderType=' + request.orderType : ''}${
        request.orderStatus != 0 ? '&orderStatus=' + request.orderStatus : ''
      }${request.cancelStatus?.length !== 0 ? cancelText : ''}${
        request.periodType != '' ? '&periodType=' + request.periodType : ''
      }${
        request.periodStartDate != ''
          ? '&periodStartDate=' + request.periodStartDate
          : ''
      }${
        request.periodEndDate != ''
          ? '&periodEndDate=' + request.periodEndDate
          : ''
      }`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //주문상세
  getOrderItem = async (orderId: string): Promise<OrderDetailItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/orders/${orderId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  //주문 메모 입력
  putOrderMemo = async (
    req: OrderMemoParamsType,
  ): Promise<OrderDetailItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'PUT',
      url: `/admin/orders/${req.orderId}/memo`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.body,
    });
    return data;
  };

  //배송지정보 입력
  putOrderDelivery = async (
    req: OrderShoppingParamsType,
  ): Promise<OrderDetailItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'PUT',
      url: `/admin/orders/${req.orderId}/shipping`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.body,
    });
    return data;
  };

  //주문 취소 요청
  postOrderCancelRequest = async (
    req: OrderCancelRequestParamsType,
  ): Promise<OrderDetailItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/orders/${req.orderId}/request-cancel`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.body,
    });
    return data;
  };

  //주문 취소 요청
  postOrderCancelRequestForAgent = async (
    req: OrderCancelRequestParamsType,
  ): Promise<OrderDetailItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/agent/orders/${req.orderId}/request-cancel`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.body,
    });
    return data;
  };

  //주문 취소
  postOrderCancel = async (
    req: OrderCancelParamsType,
  ): Promise<OrderDetailItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/orders/${req.orderId}/cancel`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.body,
    });
    return data;
  };

  //주문 접수
  postOrderConfrim = async (
    req: OrderConfrimParamsType,
  ): Promise<OrderDetailItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/orders/${req.orderId}/confirm`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //주문 취소 수수료
  postOrderCheckCancelFee = async (
    req: OrderCacelFeeType,
  ): Promise<OrderCancelFeeItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/orders/${req.orderId}/check-cancellation-fee`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.body,
    });
    return data;
  };

  //주문번호 그룹화
  postOrderGroup = async (req: OrderGroupType): Promise<OrderGroupResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: '/admin/grouping-orders',
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req,
    });
    return data;
  };

  //취소반려
  postOrderRequestCancel = async (
    req: OrderRequestCancelType,
  ): Promise<OrderGroupResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/orders/${req.orderId}/request-cancel-denied`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.body,
    });
    return data;
  };
}

const orderApi = new OrderApi();

export default orderApi;
