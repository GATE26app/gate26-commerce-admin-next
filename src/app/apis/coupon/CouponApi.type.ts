export type ListDtoType = {
  code?: string;
  count?: number;
  data?: any;
  success: boolean;
  message?: string;
};

//쿠폰 목록 조회
export type CouponListResType = {
  pageNo: number;
  pageSize: number;
  level?: number;
  type?: number;
  access?: number;
  searchType?: string;
  searchKeyword?: string;
};
//쿠폰 목록 조회
export type CouponListDtoType = {
  code: string;
  count: number;
  data: CouponListReqType;
  success: boolean;
};
export type CouponListReqType = {
  count: number;
  totalCount: number;
  pageCount: number;
  pageNo: number;
  pageSize: number;
  coupons: Array<CouponDataType>;
};

export type ImageType = {
  imagePath: string;
  thumbnailImagePath: string;
};

export type PartnerType = {
  partnerId: string;
  title: string;
  images: Array<ImageType>;
};

export type ImageRefType = {
  itemCode: string;
  item: {
    itemId: string;
    title: string;
    priceNet: number;
    priceDcPer: number;
    price: number;
    images: Array<ImageType>;
  };
};

export type PermissionType = {
  permissionId: number;
  user: {
    userId: string;
    emailAddress: string;
    nickName: string;
    profileImagePath: string;
  };
};
export type CouponDataType = {
  couponId: number;
  access: number;
  accessName: string;
  level: number;
  levelName: string;
  type: number;
  typeName: string;
  stockCnt: number;
  title: string;
  startDate: string;
  endDate: string;
  minOrderAmount: number;
  dcType: number;
  dcTypeName: string;
  priceDc?: number;
  partnerChargeAmount?: number;
  percentDc?: number;
  partnerChargePercent?: number;
  partner: PartnerType;
  itemRef: ImageRefType;
  permissions?: Array<PermissionType>;
  createdId: string;
  createdDate: string;
  modifiedId: string;
  modifiedDate: string;
  partnerId?: string;
  itemCode?: string;
};

export type CouponDataResType = {
  access: number;
  level: number;
  type: number;
  stockCnt?: number | null;
  title: string;
  startDate: string;
  endDate: string;
  minOrderAmount: number;
  dcType: number;
  priceDc?: number;
  partnerChargeAmount?: number;
  percentDc?: number;
  partnerChargePercent?: number;
  partnerId?: string;
  itemCode?: string;
  permissions?: Array<string>;
};

//쿠폰 수정
export type PatchCouponModifyParamReqType = {
  CouponId: string;
  data: CouponDataResType;
};
export type UserSearchType = {
  pageNo: number;
  pageSize: number;
  searchKeyword: string;
};
//사용자 간단 조회 request type
export type UserListDtoType = {
  code: string;
  count: number;
  data: {
    count: number;
    totalCount: number;
    pageCount: number;
    pageNo: number;
    pageSize: number;
    users: Array<UserSearchDTOType>;
  };
  success: boolean;
};
export type UserSearchDTOType = {
  userId: string;
  emailAddress: string;
  nickName: string;
  profileImagePath: string;
};
//파트너 간단 조회 request type
export type PartnerListDtoType = {
  code: string;
  count: number;
  data: {
    count: number;
    totalCount: number;
    pageCount: number;
    pageNo: number;
    pageSize: number;
    partners: Array<PartnerSearchDTOType>;
  };
  success: boolean;
};
export type PartnerSearchDTOType = {
  partnerId: string;
  loginId: string;
  level: number;
  levelName: string;
  status: number;
  statusName: string;
  type: number;
  typeName: string;
  title: string;
  images: [
    {
      imagePath: string;
      thumbnailImagePath: string;
      createdDate: string;
    },
  ];
  shippingType: number;
  shippingTypeName: string;
  shippingFee: number;
  shippingMinAmount: number;
};
//쿠폰 상세 파트너사 정보
export type PartnerDetailDTOType = {
  partnerId: string;
  title: string;
  images: Array<ImageType>;
};
//파트너 간단 조회 request type
export type GoodsListDtoType = {
  code: string;
  count: number;
  data: {
    count: number;
    totalCount: number;
    pageCount: number;
    pageNo: number;
    pageSize: number;
    items: Array<GoodsSearchDTOType>;
  };
  success: boolean;
};
export type GoodsSearchDTOType = {
  itemId: string;
  itemCode: string;
  title: string;
  priceNet: number;
  priceDcPer: number;
  price: number;
  images: [
    {
      sort: number;
      imagePath: string;
      thumbnailImagePath: string;
    },
  ];
};
