import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface FirstFilterInfoType {
  pageNo: number;
  pageSize: number;
  status: null | number; //0=>오픈예정, 1=>진행중, 2=>종료
  level: number;
  type: number;
  searchType: string;
  searchKeyword: string;
}

interface FirstFiterInfoState {
  firstFilterInfo: FirstFilterInfoType;
  setFirstFilterInfo: (firstFilterInfo: FirstFilterInfoType) => void;
  deleteFilterFilterInfo: () => void;
}

const defaultState = {
  pageNo: 0,
  pageSize: 10,
  status: null, //0=>오픈예정, 1=>진행중, 2=>종료
  level: 0, //1=>노출, 2=>미노출
  type: 1, //1=>선착순, 2=>추첨 , 0 =>당첨자조회
  searchType: 'title',
  searchKeyword: '',
};

export const useFirstFilterZuInfo = create(
  persist<FirstFiterInfoState>(
    (set) => ({
      firstFilterInfo: defaultState,
      setFirstFilterInfo: (firstFilterInfo: FirstFilterInfoType) => {
        set({ firstFilterInfo });
      },
      deleteFilterFilterInfo: () => {
        set({ firstFilterInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
