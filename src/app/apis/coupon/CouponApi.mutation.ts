import { useMutation } from 'react-query';

import { MutationHookParams } from '../../apis/type';
import couponApi from './CouponApi';

//쿠폰목록
export const useGetCouponListMutation = (
  params?: MutationHookParams<typeof couponApi.getCouponList>,
) => {
  return useMutation(couponApi.getCouponList, {
    ...params?.options,
  });
};
//쿠폰 상세
export const useGetCouponDetailMutation = (
  params?: MutationHookParams<typeof couponApi.getCouponDetail>,
) => {
  return useMutation(couponApi.getCouponDetail, {
    ...params?.options,
  });
};
// export const usePostEntriesImageMutation = (
//   params?: MutationHookParams<typeof entriesApi.postEntriesImage>,
// ) => {
//   return useMutation(entriesApi.postEntriesImage, {
//     ...params?.options,
//   });
// };
//쿠폰 등록
export const usePutCouponCreateMutation = (
  params?: MutationHookParams<typeof couponApi.putCouponCreate>,
) => {
  return useMutation(couponApi.putCouponCreate, {
    ...params?.options,
  });
};
//쿠폰 수정
export const usePatchCouponModifyMutation = (
  params?: MutationHookParams<typeof couponApi.patchCouponModify>,
) => {
  return useMutation(couponApi.patchCouponModify, {
    ...params?.options,
  });
};
//응모 삭제
export const useCouponDeleteMutation = (
  params?: MutationHookParams<typeof couponApi.deleteCoupon>,
) => {
  return useMutation(couponApi.deleteCoupon, {
    ...params?.options,
  });
};
//사용자 간단 조회
export const useGetUserSearchMutation = (
  params?: MutationHookParams<typeof couponApi.UserSearch>,
) => {
  return useMutation(couponApi.UserSearch, {
    ...params?.options,
  });
};
//파트너사 간단 조회
export const useGetPartnerSearchMutation = (
  params?: MutationHookParams<typeof couponApi.PartnerSearch>,
) => {
  return useMutation(couponApi.PartnerSearch, {
    ...params?.options,
  });
};
//상품 간단 조회
export const useGetGoodsSearchMutation = (
  params?: MutationHookParams<typeof couponApi.GoodsSearch>,
) => {
  return useMutation(couponApi.GoodsSearch, {
    ...params?.options,
  });
};
