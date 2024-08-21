import { create } from 'zustand';

import { createJSONStorage, persist } from 'zustand/middleware';

interface CancelFilterType {
  pageNo: number;
  pageSize: number;
  searchType: string;
  searchKeyword: string;
  orderType: number;
  orderStatus: number;
  cancelStatus: number[];
  periodType: string;
  periodStartDate: string;
  periodEndDate: string;
}

interface CancelFiterInfoState {
  cancelFilterInfo: CancelFilterType;
  setCancelFilterInfo: (cancelFilterInfo: CancelFilterType) => void;
  deleteCancelFilterInfo: () => void;
}

const defaultState = {
  pageNo: 0,
  pageSize: 10,
  searchType: '',
  searchKeyword: '',
  orderType: 0, //주문 상품 유형, 1=>일반형, 2=>바우처형, 3=>예약형
  orderStatus: 0, //주문 상품 상태 1=>결제완료, 2=>예약확정, 3=>이용일, 10=>이용완료,(결제)취소 =>100
  cancelStatus: [1, 2, 3], //취소 상태, 1=>취소요청, 2=>취소거절, 3=>취소완료
  periodType: '', //기간 유형, 'paymentDate'=>결제일, 'orderDateTimeOfUse'=>이용일, 'cancelRequestDate'=>취소요청일, 'cancelConfirmDate'=>취소승인일, 'cancelDeniedDate'=>취소반려일
  periodStartDate: '',
  periodEndDate: '',
};

export const useCancelFilterZuInfo = create(
  persist<CancelFiterInfoState>(
    (set) => ({
      cancelFilterInfo: defaultState,
      setCancelFilterInfo: (cancelFilterInfo: CancelFilterType) => {
        set({ cancelFilterInfo });
      },
      deleteCancelFilterInfo: () => {
        set({ cancelFilterInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
