export type ListDtoType = {
  code?: string;
  count?: number;
  data?: any;
  success: boolean;
  message?: string;
};
//상품 목록 params
export type FileListType = {
  type: number;
  typeName: string;
  filePath: string;
  thumbnailImagePath: string;
  createdDate: string;
};
export type ImageListType = {
  imagePath: string;
  thumbnailImagePath: string;
};
export type PartnersParamsType = {
  partnerId: string;
  loginId: string;
  level: number;
  levelName: string;
  type: number;
  typeName: string;
  title: string;
  authEmail: string;
  hp?: string;
  tel: string;
  info: string;
  bank: string;
  accountNumber: string;
  accountHolder: string;
  nameOfCompany: string;
  businessRegistrationNumber: string;
  nameOfRepresentative: string;
  registrationNumber?: string;
  address: string;
  addressDetail: string;
  businessType: string;
  businessItem: string;
  businessTel: string;
  images: Array<ImageListType>;
  files: Array<FileListType>;
  requestDate: string;
  processDate: string;
  deniedDate: string;
  deniedReason: string;
  resignRequestReason: string;
  resignRequestDate: string;
  resignDate: string;
  loginDate: string;
  createdDate: string;
  modifiedDate: string;
  status: number;
  statusName: string;
  mailOrderSalesRegistrationNo?: string;
  adminMemo: string;
  kakaoId?: string;
};

export type PartnerListParamGetType = {
  pageNo: number;
  pageSize: number;
  type?: number;
  status?: number;
  level?: number;
  searchKeyword?: string;
  searchType?: string;
  partnerId?: string;
};

export type PartnerListDataType = {
  count: number;
  totalCount: number;
  pageCount: number;
  pageNo: number;
  pageSize: number;
  partners: Array<PartnersParamsType>;
};

export type PartnerListDTO = {
  code: string;
  count: number;
  data: PartnerListDataType;
  success: boolean;
};

export type PartnerDetailDTO = {
  code: string;
  count: number;
  data: PartnersParamsType;
  success: boolean;
};

export type PartnerStatusResultType = {
  code: string;
  message?: string;
  count: number;
  success: boolean;
  data?: any;
};

export type PartnerAddStatusResultType = {
  code: string;
  message?: string;
  count: number;
  success: boolean;
  data: {
    partnerId: string;
  };
};

export type PartnerAddFormType = {
  partnerId?: string;
  type: number;
  hp?: string;
  loginId: string;
  password: string;
  password_check: string;
  title: string;
  tel: string;
  info: string;
  bank: string;
  authEmail?: string;
  accountNumber: string;
  accountHolder: string;
  nameOfCompany: string;
  businessRegistrationNumber: string;
  nameOfRepresentative: string;
  registrationNumber?: string;
  address: string;
  addressDetail: string;
  businessType: string;
  businessItem: string;
  businnessTel: string;
  mailOrderSalesRegistrationNo: string;
  images: Array<ImageListType>;
  files: Array<FileListType>;
  files1: Array<FileListType>;
  files2?: Array<FileListType>;
  files3: Array<FileListType>;
  files4?: Array<FileListType>;
  status: number;
  kakaoId?: string;
};

export type PartnerFileResponseType = {
  code: string;
  count: number;
  message?: string;
  data: {
    filePath: string;
    thumbnailImagePath: string;
  };
  success: boolean;
};

export type AdminStatusInputType = {
  adminMemo?: string;
  status: number;
};
export type ApprovePartnerType = {
  partnerId: string;
};
export type DeniedPartnerType = {
  partnerId: string;
  deniedReason?: string;
};
export type updateStatueType = {
  partnerId: string;
  adminMemo?: string;
};

export type PartnerShippingResType = {
  partnerId: string;
  shipping: PartnerShippingType;
};
export type PartnerShippingType = {
  shippingType: number;
  shippingFee: number;
  shippingMinAmount: number;
};
export type ParterServiceReqType = {
  partnerId: string;
  serviceChargePercent: number;
};
export type ParterServiceResType = {
  code: string;
  count: number;
  success: boolean;
};