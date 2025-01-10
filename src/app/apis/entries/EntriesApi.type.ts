export type ListDtoType = {
  code?: string;
  count?: number;
  data?: any;
  success: boolean;
  message?: string;
};
//응모 목록 조회
export type EntriesListResType = {
  pageNo: number;
  pageSize: number;
  status?: number | null;
  level?: number;
  type?: number;
  searchType?: string;
  searchKeyword?: string;
};

export type EntriesListDtoType = {
  code: string;
  count: number;
  data: EntriesListReqType;
  success: boolean;
};

export type EntriesListReqType = {
  count: number;
  totalCount: number;
  pageCount: number;
  pageNo: number;
  pageSize: number;
  entries: Array<EntriesListType>;
};

export type EntriesListType = {
  entryId: number;
  status: number;
  statusName: string;
  level: number;
  levelName: string;
  type: number;
  typeName: string;
  title: string;
  winnerCnt: number;
  openDate: string;
  endDate: string;
  totalParticipantCnt: number; //실제 참여자수
  totalWinnerCnt: number;
};

//응모 등록
export type EntriesResType = {
  type: number;
  level: number;
  title: string;
  content: string;
  winnerCnt: number;
  openDate: string;
  endDate: string;
  point: number;
  limitCnt: number;
  images: Array<EntriesImageType>;
};

export type EntriesImageType = {
  imagePath: string;
  thumbnailImagePath: string;
};

//응모 등록 Dto
export type EntriesCreateDtpType = {
  code: string;
  count: number;
  data: EntriesDetailType;
  success: boolean;
};
//응모 상세
export type EntriesDetailType = {
  entryId: number;
  status: number;
  statusName: string;
  type: number;
  typeName: string;
  level: number;
  levelName: string;
  title: string;
  content: string;
  winnerCnt: number;
  openDate: string;
  endDate: string;
  point: number;
  limitCnt: number;
  totalParticipantCnt: number; //실제 참여자수
  totalWinnerCnt: number;
  images: Array<EntriesImageType>;
};

//응모 수정
export type PatchEntryModifyParamReqType = {
  entryId: number;
  data: EntriesResType;
};

//응모 노출 여부 수정
export type PatchEntryLevelModifyParamReqType = {
  entryId: number;
  level: number;
};

//응모 참여자 목록 params
export type GetEntryParticipantParams = {
  pageNo: number;
  pageSize: number;
  entryId: number;
};

export type PartUserType = {
  userId: string;
  emailAddress: string;
  name: string;
  phone: string;
  createdDate: string;
  participationCount: number;
};
//응모 참여자 목록 type
export type ParticipantListType = {
  count: number;
  pageCount: number;
  pageNo: number;
  pageSize: number;
  totalCount: number;
  users: Array<PartUserType>;
};
