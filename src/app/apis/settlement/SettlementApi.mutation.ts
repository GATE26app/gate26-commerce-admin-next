import { useMutation } from 'react-query';

import { MutationHookParams } from '../type';
import settlementApi from './SettlementApi';

export const EXAMPLE_API_MUTATION_KEY = {
  POST: (param?: string) => ['item-code', param],
};

//리뷰 목록
export const useGetSettleListMutation = (
  params?: MutationHookParams<typeof settlementApi.getSettleList>,
) => {
  return useMutation(settlementApi.getSettleList, {
    ...params?.options,
  });
};

// 미정산 리스트
export const useGetUnSettleListMutation = (
  params?: MutationHookParams<typeof settlementApi.getUnSettleList>,
) => {
  return useMutation(settlementApi.getUnSettleList, {
    ...params?.options,
  });
};

// 기타 추가
export const usePostAddEctMutation = (
  params?: MutationHookParams<typeof settlementApi.PutAddEct>,
) => {
  return useMutation(settlementApi.PutAddEct, {
    ...params?.options,
  });
};

// 정산 상세
export const useGetSettleDetailMutation = (
  params?: MutationHookParams<typeof settlementApi.getSettleDetail>,
) => {
  return useMutation(settlementApi.getSettleDetail, {
    ...params?.options,
  });
};
 

export const usePutSettleMemoMutation = (
  params?: MutationHookParams<typeof settlementApi.putSettleMemo>,
) => {
  return useMutation(settlementApi.putSettleMemo, {
    ...params?.options,
  });
};

export const usePostSettleCompleteMutation = (
  params?: MutationHookParams<typeof settlementApi.getSettleComplete>,
) => {
  return useMutation(settlementApi.getSettleComplete, {
    ...params?.options,
  });
};
