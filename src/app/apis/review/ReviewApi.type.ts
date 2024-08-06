//리뷰내역 params
export type ReviewListParamsType = {
  pageNo: number;
  pageSize: number;
  searchType?: string;
  searchKeyword?: string;
  reply?: string;
  level?: number;
};
//리뷰내역 request type
export type ReviewListDtoType = {
  code: string;
  count: number;
  data: ReviewListResType;
  success: boolean;
};
//리뷰내역 response type
export type ReviewListResType = {
  count: number;
  totalCount: number;
  pageCount: number;
  pageNo: number;
  pageSize: number;
  reviews: Array<ReviewListItemType>;
};

//이미지 타입
export type ImageType = {
  sort: number;
  imagePath: string;
  thumbnailImagePath: string;
};
export type ReviewListItemType = {
  orderId: string;
  merchantUid: string;
  orderTitle: string;
  orderOptionTitle: string;
  orderItemId: string;
  orderItemCode: string;
  orderPartnerId: string;
  orderCategoryTitle: string;
  orderLocationTitle: string;
  orderImagePath: string;
  orderThumbnailImagePath: string;
  orderDateTimeOfUse: string;
  orderCnt: number;
  orderType: number;
  user: {
    userId: string;
    nickName: string;
    profileImagePath: string;
  };
  review: {
    reviewId: string;
    star: number;
    content: string;
    level: number;
    levelName: string;
    user: {
      userId: string;
      nickName: string;
      profileImagePath: string;
    };
    images: Array<ImageType>;
    writeDate: string;
    reWriteDate: string;
    partner: {
      partnerId: string;
      title: string;
    };
    replyContent: string;
    replyDate: string;
  };
};

//리뷰상세 request type
export type ReviewDetailDtoType = {
  code: string;
  count: number;
  data: ReviewListItemType;
  success: boolean;
  message: string;
};

//리뷰 댓글 작성
export type ReviewCommentReqType = {
  reviewId: string;
  data: {
    replyContent: string;
  };
};

export type ReviewShowType = {
  reviewId: string;
  state: string;
};
