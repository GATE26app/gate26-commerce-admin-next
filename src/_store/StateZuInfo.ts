import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface GoodsType {
  goodState?: boolean;
  LogItemDisable?: boolean;
  winnerState?: boolean;
  entryState?: boolean;
  reviewState?: boolean;
  partnerState?: boolean;
  orderState?: boolean;
  cancelState?: boolean;
  gate26CouponState?: boolean;
  partnerCouponState?: boolean;
  goodsCouponState?: boolean;
}

interface GoodsInfoState {
  goodsInfo: GoodsType;
  setGoodsInfo: (userZuInfo: GoodsType) => void;
  deleteGoodsInfo: () => void;
}

const defaultState = {
  goodState: true,
  LogItemDisable: false,
  winnerState: false,
  entryState: false,
  reviewState: false,
  partnerState: false,
  orderState: false,
  cancelState: false,
  gate26CouponState: false,
  partnerCouponState: false,
  goodsCouponState: false,
};

export const useGoodsStateZuInfo = create(
  persist<GoodsInfoState>(
    (set) => ({
      goodsInfo: defaultState,
      setGoodsInfo: (goodsInfo: GoodsType) => {
        set({ goodsInfo });
      },
      deleteGoodsInfo: () => {
        set({ goodsInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
