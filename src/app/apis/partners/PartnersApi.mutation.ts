import { useMutation } from 'react-query';

import { MutationHookParams } from '../../apis/type';
import partnersApi from './PartnersApi';

export const EXAMPLE_API_MUTATION_KEY = {
  POST: (param?: string) => ['item-code', param],
};

export const usePostPartnersListMutation = (
  params?: MutationHookParams<typeof partnersApi.getPartnersList>,
) => {
  return useMutation(partnersApi.getPartnersList, {
    ...params?.options,
  });
};

//파트너사 승인
export const useApprovePartner = (
  params?: MutationHookParams<typeof partnersApi.postPartnersApprove>,
) => {
  return useMutation(partnersApi.postPartnersApprove, {
    ...params?.options,
  });
};

//파트너사 반려
export const useRejectPartner = (
  params?: MutationHookParams<typeof partnersApi.postPartnersReject>,
) => {
  return useMutation(partnersApi.postPartnersReject, {
    ...params?.options,
  });
};

//상품정지
export const useItemStopPartner = (
  params?: MutationHookParams<typeof partnersApi.postPartnersStop>,
) => {
  return useMutation(partnersApi.postPartnersStop, {
    ...params?.options,
  });
};

//탈퇴
export const useItemResignPartner = (
  params?: MutationHookParams<typeof partnersApi.postPartnersResign>,
) => {
  return useMutation(partnersApi.postPartnersResign, {
    ...params?.options,
  });
};

//정상
export const useItemRestorePartner = (
  params?: MutationHookParams<typeof partnersApi.postPartnersRestore>,
) => {
  return useMutation(partnersApi.postPartnersRestore, {
    ...params?.options,
  });
};

//등록
export const usePutCreatePartnerMutation = (
  params?: MutationHookParams<typeof partnersApi.putCreatePartners>,
) => {
  return useMutation(partnersApi.putCreatePartners, {
    ...params?.options,
  });
};

//수정
export const usePatchUpdatePartnerMutation = (
  params?: MutationHookParams<typeof partnersApi.patchUpdatePartners>,
) => {
  return useMutation(partnersApi.patchUpdatePartners, {
    ...params?.options,
  });
};

//사진 등록
export const usePostPartnersImageMutation = (
  params?: MutationHookParams<typeof partnersApi.postPartnersImage>,
) => {
  return useMutation(partnersApi.postPartnersImage, {
    ...params?.options,
  });
};

//파일 등록
export const usePostPartnersFileMutation = (
  params?: MutationHookParams<typeof partnersApi.postPartnersfiles>,
) => {
  return useMutation(partnersApi.postPartnersfiles, {
    ...params?.options,
  });
};
//프로필 - 배송비 추가/수정
export const useProfileShippingMutation = (
  params?: MutationHookParams<typeof partnersApi.patchParnterShipping>,
) => {
  return useMutation(partnersApi.patchParnterShipping, {
    ...params?.options,
  });
};
