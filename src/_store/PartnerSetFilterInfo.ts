import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export interface PartnerSettingFilterInfoType {
  pageNo: number;
  pageSize: number;
  user_approval: null | number; //null =>전체 0=>임시저장, 1=>승인, 2=>대기, 3=> 반려
  pay_type: number;
  user_status: number;
  searchType: string;
  searchKeyword: string;
}

interface PartnerSettingFiterInfoState {
  GoodsSettingFilterInfo: PartnerSettingFilterInfoType;
  setGoodsSettingFilterInfo: (
    firstFilterInfo: PartnerSettingFilterInfoType,
  ) => void;
  deleteGoodsSettingFilterInfo: () => void;
}

const defaultState = {
  pageNo: 0,
  pageSize: 10,
  level: 0, // 0: 전체 / 1: 대기 / 2: 승인 / 3: 반려
  type: 0,
  status: 0,
  searchType: '',
  searchKeyword: '',
};

export const usePartnerSettingFilterZuInfo = create(
  persist<PartnerSettingFiterInfoState>(
    (set) => ({
      PartnersSettingFilterInfo: defaultState,
      setPartnersSettingFilterInfo: (
        PartnersSettingFilterInfo: PartnerSettingFilterInfoType,
      ) => {
        set({ PartnersSettingFilterInfo });
      },
      deletePartnersSettingFilterInfo: () => {
        set({ PartnersSettingFilterInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
