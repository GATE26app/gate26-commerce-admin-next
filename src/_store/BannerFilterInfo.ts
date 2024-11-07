import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface BannerFilterInfoType {
  pageNo: number;
  pageSize: number;
  searchType: string;
  searchKeyword: string;
  level: number;
}

interface BannerFiterInfoState {
  bannerFilterInfo: BannerFilterInfoType;
  setBannerFilterInfo: (firstFilterInfo: BannerFilterInfoType) => void;
  deleteBannerFilterInfo: () => void;
}

const defaultState = {
  pageNo: 0,
  pageSize: 10,
  searchType: '',
  searchKeyword: '',
  level: 0,
};

export const useBannerFilterZuInfo = create(
  persist<BannerFiterInfoState>(
    (set) => ({
      bannerFilterInfo: defaultState,
      setBannerFilterInfo: (reviewFilterInfo: BannerFilterInfoType) => {
        set({ reviewFilterInfo });
      },
      deleteBannerFilterInfo: () => {
        set({ reviewFilterInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
