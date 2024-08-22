import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface OrderStateType {
  orderCancelRequestDetail: string;
}

interface OrderStateInfoState {
  orderStateInfo: OrderStateType;
  setOrderStateInfo: (orderStateInfo: OrderStateType) => void;
  deleteOrferStateInfo: () => void;
}

const defaultState = {
  orderCancelRequestDetail: '',
};

export const useOrderStateZuInfo = create(
  persist<OrderStateInfoState>(
    (set) => ({
      orderStateInfo: defaultState,
      setOrderStateInfo: (orderStateInfo: OrderStateType) => {
        set({ orderStateInfo });
      },
      deleteOrferStateInfo: () => {
        set({ orderStateInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
