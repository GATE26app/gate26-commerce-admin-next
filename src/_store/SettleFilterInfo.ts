import { create } from 'zustand';

import { createJSONStorage, persist } from 'zustand/middleware';

interface settleFilterType {
  pageNo: number;
  pageSize: number;
  status: string | null;
  searchKeyword: string;
  searchType: string;
  fromDate: string;
  toDate: string;
}

interface settleFiterInfoState {
  settleFilterInfo: settleFilterType;
  setSettleFilterInfo: (settleFilterInfo: settleFilterType) => void;
  deleteSettleFilterInfo: () => void;
}

const defaultState = {
  pageNo: 0,
  pageSize: 10,
  status: null,
  searchKeyword: '',
  searchType: '',
  fromDate: '',
  toDate: '',
};

export const useSettleFilterZuInfo = create(
  persist<settleFiterInfoState>(
    (set) => ({
      settleFilterInfo: defaultState,
      setSettleFilterInfo: (settleFilterInfo: settleFilterType) => {
        set({ settleFilterInfo });
      },
      deleteSettleFilterInfo: () => {
        set({ settleFilterInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
