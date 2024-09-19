import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export type PartnerImageType = {
  imagePath: string;
  thumbnailImagePath: string;
  createdDate: string;
};
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
  images: Array<PartnerImageType>;
  // imagePath: string;
  // thumbnailImagePath: string;
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
  images: [],
  // imagePath: '',
  // thumbnailImagePath: '',
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
