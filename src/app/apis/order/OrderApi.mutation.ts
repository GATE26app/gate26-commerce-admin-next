import { useMutation } from 'react-query';

import orderApi from './OrderApi';
import { MutationHookParams } from '../type';

export const EXAMPLE_API_MUTATION_KEY = {
  POST: (param?: string) => ['item-code', param],
};

//주문 목록
export const usePostOrderListMutation = (
  params?: MutationHookParams<typeof orderApi.getOrderList>,
) => {
  return useMutation(orderApi.getOrderList, {
    ...params?.options,
  });
};

//주문 상세
export const useGetOrderDetailMutation = (
  params?: MutationHookParams<typeof orderApi.getOrderItem>,
) => {
  return useMutation(orderApi.getOrderItem, {
    ...params?.options,
  });
};

//주문 메모 입력

export const usePutOrderMemoMutation = (
  params?: MutationHookParams<typeof orderApi.putOrderMemo>,
) => {
  return useMutation(orderApi.putOrderMemo, {
    ...params?.options,
  });
};

//주문 배송지 입력

export const usePutOrderShoppingutation = (
  params?: MutationHookParams<typeof orderApi.putOrderDelivery>,
) => {
  return useMutation(orderApi.putOrderDelivery, {
    ...params?.options,
  });
};

//주문 취소 요청
export const usePutOrderCancelRequestMutation = (
  params?: MutationHookParams<typeof orderApi.postOrderCancelRequest>,
) => {
  return useMutation(orderApi.postOrderCancelRequest, {
    ...params?.options,
  });
};
//주문 취소
export const usePutOrderCancelMutation = (
  params?: MutationHookParams<typeof orderApi.postOrderCancel>,
) => {
  return useMutation(orderApi.postOrderCancel, {
    ...params?.options,
  });
};
//주문 접수
export const usePostOrderContfrimMutation = (
  params?: MutationHookParams<typeof orderApi.postOrderConfrim>,
) => {
  return useMutation(orderApi.postOrderConfrim, {
    ...params?.options,
  });
};

//주문 취소 수수료
export const usePostOrderCancelMutation = (
  params?: MutationHookParams<typeof orderApi.postOrderCheckCancelFee>,
) => {
  return useMutation(orderApi.postOrderCheckCancelFee, {
    ...params?.options,
  });
};

//주문번호 그룹화
export const usePostOrderGroupMutation = (
  params?: MutationHookParams<typeof orderApi.postOrderGroup>,
) => {
  return useMutation(orderApi.postOrderGroup, {
    ...params?.options,
  });
};

//주문번호 그룹화
export const usePostCancelDeniedMutation = (
  params?: MutationHookParams<typeof orderApi.postOrderRequestCancel>,
) => {
  return useMutation(orderApi.postOrderRequestCancel, {
    ...params?.options,
  });
};
