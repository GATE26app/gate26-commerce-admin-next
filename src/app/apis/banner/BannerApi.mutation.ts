import { MutationHookParams } from '../type';
import bannerApi from './BannerApi';
import { useMutation } from 'react-query';

export const useGetListMutation = (
  params?: MutationHookParams<typeof bannerApi.getBannerList>,
) => {
  return useMutation(bannerApi.getBannerList, {
    ...params?.options,
  });
};

export const useGetDetailutation = (
  params?: MutationHookParams<typeof bannerApi.getBannersDetail>,
) => {
  return useMutation(bannerApi.getBannersDetail, {
    ...params?.options,
  });
};

export const usePostBannersImageMutation = (
  params?: MutationHookParams<typeof bannerApi.postBannerImage>,
) => {
  return useMutation(bannerApi.postBannerImage, {
    ...params?.options,
  });
};

//배너 삭제
export const useBannerDeleteMutation = (
  params?: MutationHookParams<typeof bannerApi.deleteBanner>,
) => {
  return useMutation(bannerApi.deleteBanner, {
    ...params?.options,
  });
};

//배너 순서 변경
export const useBannerOrderMutation = (
  params?: MutationHookParams<typeof bannerApi.changeOrderBanner>,
) => {
  return useMutation(bannerApi.changeOrderBanner, {
    ...params?.options,
  });
};

//배너 노출
export const useBannerShowMutation = (
  params?: MutationHookParams<typeof bannerApi.changeShowBanner>,
) => {
  return useMutation(bannerApi.changeShowBanner, {
    ...params?.options,
  });
};

//배너 비노출
export const useBannerHideMutation = (
  params?: MutationHookParams<typeof bannerApi.changehideBanner>,
) => {
  return useMutation(bannerApi.changehideBanner, {
    ...params?.options,
  });
};
//배너 등록
export const useBannerCreateMutation = (
  params?: MutationHookParams<typeof bannerApi.getBannersCreate>,
) => {
  return useMutation(bannerApi.getBannersCreate, {
    ...params?.options,
  });
};
//배너 수정
export const useBannerModifyMutation = (
  params?: MutationHookParams<typeof bannerApi.getBannersModify>,
) => {
  return useMutation(bannerApi.getBannersModify, {
    ...params?.options,
  });
};
