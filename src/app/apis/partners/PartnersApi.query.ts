import { useQuery } from 'react-query';

import { QueryHookParams } from '@/app/apis/type';

import goodsApi from './GoodsApi';
import { GoodsLogItemType } from './GoodsApi.type';
import partnersApi from './PartnersApi';

export const PARTNERS_API_QUERY_KEY = {
    GET_PARTNER_DETAIL: (params: Parameter<typeof partnersApi.GetPartnersDetail>) => [
        'partners_detail',
        params.partnerId,
      ],
};

export function useGetItemLogQuery(
  params?: QueryHookParams<typeof goodsApi.getGoodsLogList>,
) {
  if (params) {
    const queryKey = PARTNERS_API_QUERY_KEY.GET_PARTNER_DETAIL(params?.variables);

    const query = useQuery(
      queryKey,
      () => goodsApi.getGoodsLogList(params?.variables),
      params?.options,
    );

    return { ...query, queryKey };
  }
}
