import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface AuctionFilterInfoType {
  pageNo: number;
  pageSize: number;
  status: null | number; //0=>오픈예정, 1=>진행중, 2=>종료
  level: number;
  type: number;
  searchType: string;
  searchKeyword: string;
}

interface AuctionFiterInfoState {
  auctionFilterInfo: AuctionFilterInfoType;
  setAuctionFilterInfo: (auctionFilterInfo: AuctionFilterInfoType) => void;
  deleteAuctionFilterInfo: () => void;
}

const defaultState = {
  pageNo: 0,
  pageSize: 10,
  status: null, //0=>오픈예정, 1=>진행중, 2=>종료
  level: 0, //1=>노출, 2=>미노출
  type: 2, //1=>선착순, 2=>추첨 , 0 =>당첨자조회
  searchType: '',
  searchKeyword: '',
};

export const useAuctionFilterZuInfo = create(
  persist<AuctionFiterInfoState>(
    (set) => ({
      auctionFilterInfo: defaultState,
      setAuctionFilterInfo: (auctionFilterInfo: AuctionFilterInfoType) => {
        set({ auctionFilterInfo });
      },
      deleteAuctionFilterInfo: () => {
        set({ auctionFilterInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
