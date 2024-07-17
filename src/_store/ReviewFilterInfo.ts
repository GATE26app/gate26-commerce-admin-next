import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface ReviewFilterInfoType {
  pageNo: number;
  pageSize: number;
  searchType: string;
  searchKeyword: string;
  reply: string;
  level: number;
}

interface ReviewFiterInfoState {
  reviewFilterInfo: ReviewFilterInfoType;
  setReviewFilterInfo: (firstFilterInfo: ReviewFilterInfoType) => void;
  deleteReviewFilterInfo: () => void;
}

const defaultState = {
  pageNo: 0,
  pageSize: 10,
  searchType: '',
  searchKeyword: '',
  reply: '',
  level: 0,
};

export const useReviewFilterZuInfo = create(
  persist<ReviewFiterInfoState>(
    (set) => ({
      reviewFilterInfo: defaultState,
      setReviewFilterInfo: (reviewFilterInfo: ReviewFilterInfoType) => {
        set({ reviewFilterInfo });
      },
      deleteReviewFilterInfo: () => {
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
