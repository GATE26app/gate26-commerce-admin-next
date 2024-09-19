import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface Gate26FilterInfoType {
  pageNo: number;
  pageSize: number;
  level: number; //파트너 레벨, 1=>정상, 2=>승인대기중, 3=>반려
  searchType: string; //검색유형 'counponId'=>쿠폰아이디, 'title'=>쿠폰명
  searchKeyword: string;
  type: number; //1=>전체상품(gate26전체상품), 2=>특정상점(파트너사쿠폰), 3=>특정상품(단일상품)
  access?: number;
}

interface Gate26FiterInfoState {
  gate26FilterInfo: Gate26FilterInfoType;
  setGate26FilterInfo: (gate26FilterInfo: Gate26FilterInfoType) => void;
  deleteGate26FilterInfo: () => void;
}

const defaultState = {
  pageNo: 0,
  pageSize: 10,
  level: 1, //파트너 레벨, 1=>정상, 2=>승인대기중, 3=>반려
  searchType: 'title',
  searchKeyword: '',
  status: null, //0=>오픈예정, 1=>진행중, 2=>종료
  type: 1, //1=>전체상품(gate26전체상품), 2=>특정상점(파트너사쿠폰), 3=>특정상품(단일상품)
  access: 0,
};

export const useGate26FilterZuInfo = create(
  persist<Gate26FiterInfoState>(
    (set) => ({
      gate26FilterInfo: defaultState,
      setGate26FilterInfo: (gate26FilterInfo: Gate26FilterInfoType) => {
        set({ gate26FilterInfo });
      },
      deleteGate26FilterInfo: () => {
        set({ gate26FilterInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
