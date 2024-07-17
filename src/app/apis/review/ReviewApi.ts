import { AxiosInstance } from 'axios';

import instance from '../_axios/instance';

import { getToken } from '@/utils/localStorage/token';
import {
  ReviewCommentReqType,
  ReviewDetailDtoType,
  ReviewListDtoType,
  ReviewListParamsType,
  ReviewShowType,
} from './ReviewApi.type';

export class ReviewApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  //리뷰리스트
  getReviewList = async (
    request: ReviewListParamsType,
  ): Promise<ReviewListDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/reviews?pageNo=${request.pageNo + 1}&pageSize=${
        request.pageSize
      }${
        request.searchKeyword != ''
          ? '&searchType=' +
            request.searchType +
            '&searchKeyword=' +
            request.searchKeyword
          : ''
      }${request.reply != '' ? '&reply=' + request.reply : ''}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //리뷰상세
  getReviewDetail = async (reviewId: string): Promise<ReviewDetailDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'GET',
      url: `/admin/reviews/${reviewId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //리뷰 노출 여부
  getReviewShow = async (res: ReviewShowType): Promise<ReviewDetailDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'PATCH',
      url: `/admin/reviews/${res.reviewId}/${res.state}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //리뷰 삭제
  deleteReview = async (reviewId: string): Promise<ReviewDetailDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'DELETE',
      url: `/admin/reviews/${reviewId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //리뷰 답글 삭제
  deleteReviewReply = async (
    reviewId: string,
  ): Promise<ReviewDetailDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'DELETE',
      url: `/admin/reviews/${reviewId}/reply`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
}

const reviewApi = new ReviewApi();

export default reviewApi;
