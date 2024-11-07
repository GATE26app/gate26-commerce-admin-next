//배너 params
export type BannerListParamsType = {
  pageNo: number;
  pageSize: number;
  searchType?: string;
  searchKeyword?: string;
  level?: number;
};
export type BannerListReqType = {
  pageNo: number;
  pageSize: number;
  level?: number;
  searchType?: string;
  searchKeyword?: string;
};

//배너내역 response type
export type BannerListResType = {
  count: number;
  totalCount: number;
  pageCount: number;
  pageNo: number;
  pageSize: number;
  banners: Array<BannerListItemType>;
};

export type BannerListItemType = {
  bannerId?: number;
  level: number;
  type: number;
  sort: number;
  title: string;
  target: string;
  openDate: string;
  endDate: string;
  images: Array<BannerImageType>;
  createdDate?: string;
  modifiedDate?: string;
};

//응모 등록
export type BannerResType = {
  type: number;
  level: number;
  sort: number;
  title: string;
  target: string;
  openDate: string;
  endDate: string;
  images: Array<BannerImageType>;
};

export type BannerImageType = {
  imagePath: string;
  thumbnailImagePath: string;
};

export type ListDtoType = {
  code?: string;
  count?: number;
  data?: any;
  success: boolean;
  message?: string;
};

export type BannerModifyType = {
  bannerId: number;
  data: {
    type: number;
    level: number;
    sort: number;
    title: string;
    target: string;
    openDate: string;
    endDate: string;
    images: Array<BannerImageType>;
  };
};
