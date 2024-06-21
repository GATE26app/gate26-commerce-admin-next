import { useQuery } from 'react-query';

import { QueryHookParams } from '@/app/apis/type';

import goodsApi from './GoodsApi';
import { GoodsLogItemType } from './GoodsApi.type';

export const GOODS_API_QUERY_KEY = {
  // GET_GOODSLIST: (pageNo?: string, pageSize?: string) => [
  //   'goodslist',
  //   pageNo,
  //   pageSize,
  // ],
  GET_GOODSLIST: (params: Parameter<typeof goodsApi.getGoodsList>) => [
    'good-list',
    params.pageNo,
    params.pageSize,
  ],
  GET_GOODSDETAIL: (params: Parameter<typeof goodsApi.getGoodsDetail>) => [
    'good-detail',
    params.itemCode,
  ],
  GET_LOGLIST: (param?: GoodsLogItemType) => ['log', param?.itemCode],
  GET_LOCATION: () => ['location'],
  GET_CATEGORY: () => ['category'],
  GET_ITEMLOG: () => ['logslist'],
};

export function useGetGoodstListQuery(
  params?: QueryHookParams<typeof goodsApi.getGoodsList>,
) {
  if (params) {
    const queryKey = GOODS_API_QUERY_KEY.GET_GOODSLIST(params?.variables);
    const query = useQuery(
      queryKey,
      goodsApi.getGoodsList(params?.variables),
      params?.options,
    );
    return { ...query, queryKey };
  }

  // const query = useQuery(
  //   queryKey,
  //   () => goodsApi.getLoation(),
  //   params?.options,
  // );
  // const query = useQuery(
  //   queryKey,
  //   () => goodsApi.getGoodsList(params?.variables),
  //   params?.options,
  // );
}

// export function useGetGoodstDetailQuery(
//   params?: QueryHookParams<typeof goodsApi.getGoodsDetail>,
// ) {
//   if (params) {
//     const queryKey = GOODS_API_QUERY_KEY.GET_GOODSDETAIL(params?.variables);
//     const query = useQuery(
//       queryKey,
//       goodsApi.getGoodsDetail(params?.variables),
//       params?.options,
//     );
//     return { ...query, queryKey };
//   }
// }
export function useGetCategoryQuery(
  params?: QueryHookParams<typeof goodsApi.getCategory>,
) {
  const queryKey = GOODS_API_QUERY_KEY.GET_CATEGORY();
  // const query = useQuery(
  //   queryKey,
  //   () => goodsApi.getLoation(),
  //   params?.options,
  // );
  const query = useQuery(queryKey, goodsApi.getCategory, params?.options);

  return { ...query, queryKey };
}

export function useGetLocationQuery(
  params?: QueryHookParams<typeof goodsApi.getLoation>,
) {
  const queryKey = GOODS_API_QUERY_KEY.GET_LOCATION();
  // const query = useQuery(
  //   queryKey,
  //   () => goodsApi.getLoation(),
  //   params?.options,
  // );
  const query = useQuery(queryKey, goodsApi.getLoation, params?.options);

  return { ...query, queryKey };
}

export function useGetItemLogQuery(
  params?: QueryHookParams<typeof goodsApi.getGoodsLogList>,
) {
  if (params) {
    const queryKey = GOODS_API_QUERY_KEY.GET_LOGLIST(params?.variables);

    const query = useQuery(
      queryKey,
      () => goodsApi.getGoodsLogList(params?.variables),
      params?.options,
    );

    return { ...query, queryKey };
  }
}

// export function useGetGoodsItemLogQuery(
//   params?: QueryHookParams<typeof goodsApi.getGoodsItemLog>,
// ) {
//   if (params) {
//     const queryKey = GOODS_API_QUERY_KEY.GET_ITEMLOG(params?.options);
//     // const query = useQuery(
//     //   queryKey,
//     //   () => goodsApi.getLoation(),
//     //   params?.options,
//     // );
//     const query = useQuery(queryKey, goodsApi.getGoodsItemLog, params?.options);
//     return { ...query, queryKey };
//   }
// }
