import { UseInfiniteQueryOptions, useInfiniteQuery } from 'react-query';

import { AxiosError } from 'axios';
import couponApi from './CouponApi';
import {
  GoodsListDtoType,
  PartnerListDtoType,
  UserListDtoType,
  UserSearchType,
} from './CouponApi.type';

export const COMMERCE_API_QUERY_KEY = {
  USER_LIST: () => ['userList'],
};

interface PagePrams {
  totalCount: number;
}

export const useGetUserLitQuery = (
  params: UserSearchType,
  options?: UseInfiniteQueryOptions<
    UserListDtoType,
    AxiosError<{ message: string }>,
    UserListDtoType,
    UserListDtoType,
    ['userList', UserSearchType]
  >,
) =>
  useInfiniteQuery({
    ...options,
    queryKey: ['userList', params], //query key 설정
    queryFn: async ({ pageParam: pageNum = 1 }: { pageParam?: number }) =>
      couponApi.UserSearch(params),
    enabled: !!params.searchKeyword,
    getNextPageParam: (nextInfo, allPages) => {
      console.log('nextInfo', nextInfo.data);
      // console.log('nextInfo?.data.pageNo', nextInfo?.data.pageNo);
      // console.log('nextInfo?.data.pageCount', nextInfo?.data.pageCount);
      if (nextInfo.data.totalCount !== 0) {
        if (nextInfo?.data.pageNo >= nextInfo.data.pageCount) {
          return undefined;
        } else {
          // console.log('*****plus');
          params.pageNo + 1;
          return allPages.length + 1;
        }
      }
    },
  });
export const useGetPartnerLitQuery = (
  params: UserSearchType,
  options?: UseInfiniteQueryOptions<
    PartnerListDtoType,
    AxiosError<{ message: string }>,
    PartnerListDtoType,
    PartnerListDtoType,
    ['partnerList', UserSearchType]
  >,
) =>
  useInfiniteQuery({
    ...options,
    queryKey: ['partnerList', params], //query key 설정
    queryFn: async ({ pageParam: pageNum = 1 }: { pageParam?: number }) =>
      couponApi.PartnerSearch(params),
    enabled: !!params.searchKeyword,
    getNextPageParam: (nextInfo, allPages) => {
      console.log('nextInfo', nextInfo.data);
      // console.log('nextInfo?.data.pageNo', nextInfo?.data.pageNo);
      // console.log('nextInfo?.data.pageCount', nextInfo?.data.pageCount);
      if (nextInfo.data.totalCount !== 0) {
        if (nextInfo?.data.pageNo >= nextInfo.data.pageCount) {
          return undefined;
        } else {
          // console.log('*****plus');
          params.pageNo + 1;
          return allPages.length + 1;
        }
      }
    },
  });
export const useGetGoodsLitQuery = (
  params: UserSearchType,
  options?: UseInfiniteQueryOptions<
    GoodsListDtoType,
    AxiosError<{ message: string }>,
    GoodsListDtoType,
    GoodsListDtoType,
    ['GoodsList', UserSearchType]
  >,
) =>
  useInfiniteQuery({
    ...options,
    queryKey: ['GoodsList', params], //query key 설정
    queryFn: async ({ pageParam: pageNum = 1 }: { pageParam?: number }) =>
      couponApi.GoodsSearch(params),
    enabled: !!params.searchKeyword,
    getNextPageParam: (nextInfo, allPages) => {
      console.log('nextInfo', nextInfo.data);
      // console.log('nextInfo?.data.pageNo', nextInfo?.data.pageNo);
      // console.log('nextInfo?.data.pageCount', nextInfo?.data.pageCount);
      if (nextInfo.data.totalCount !== 0) {
        if (nextInfo?.data.pageNo >= nextInfo.data.pageCount) {
          return undefined;
        } else {
          // console.log('*****plus');
          params.pageNo + 1;
          return allPages.length + 1;
        }
      }
    },
  });
