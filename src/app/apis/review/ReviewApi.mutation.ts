import { useMutation } from 'react-query';

import reviewApi from './ReviewApi';
import { MutationHookParams } from '../type';

export const EXAMPLE_API_MUTATION_KEY = {
  POST: (param?: string) => ['item-code', param],
};

//리뷰 목록
export const usePostReviewListMutation = (
  params?: MutationHookParams<typeof reviewApi.getReviewList>,
) => {
  return useMutation(reviewApi.getReviewList, {
    ...params?.options,
  });
};

//리뷰 노출 여부
export const useReviewShowMutation = (
  params?: MutationHookParams<typeof reviewApi.getReviewShow>,
) => {
  return useMutation(reviewApi.getReviewShow, {
    ...params?.options,
  });
};
//리뷰 삭제
export const useDeleteReviewMutation = (
  params?: MutationHookParams<typeof reviewApi.deleteReview>,
) => {
  return useMutation(reviewApi.deleteReview, {
    ...params?.options,
  });
};

//리뷰 댓글 삭제
export const useDeleteReviewCommentMutation = (
  params?: MutationHookParams<typeof reviewApi.deleteReviewReply>,
) => {
  return useMutation(reviewApi.deleteReviewReply, {
    ...params?.options,
  });
};
