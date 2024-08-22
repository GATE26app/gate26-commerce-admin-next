import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface partnerInfoType {
  level: number;
  levelName: string;
  loginId: string;
  partnerId: string;
  shippingFee: number;
  shippingMinAmount: number;
  shippingType: number;
  shippingTypeName: string;
  status: number;
  statusName: string;
  title: string;
  type: number;
  typeName: string;
}

interface PartnerInfoState {
  partnerZuInfo: partnerInfoType;
  setPartnerZuInfo: (partnerZuInfo: partnerInfoType) => void;
  deletePartnerZuInfo: () => void;
}

const defaultState = {
  partnerId: '',
  loginId: '',
  level: 0,
  levelName: '',
  type: 0,
  typeName: '',
  title: '',
  status: 0,
  statusName: '',
  shippingFee: 0,
  shippingMinAmount: 0,
  shippingType: 0,
  shippingTypeName: '',
};

export const usePartnerZuInfo = create(
  persist<PartnerInfoState>(
    (set) => ({
      partnerZuInfo: defaultState,
      setPartnerZuInfo: (partnerZuInfo: partnerInfoType) => {
        set({ partnerZuInfo });
      },
      deletePartnerZuInfo: () => {
        set({ partnerZuInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
