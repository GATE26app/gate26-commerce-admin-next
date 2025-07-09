import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface GoodsSettingFilterInfoType {
  pageNo: number;
  pageSize: number;
  status: null | number; //null =>전체 0=>임시저장, 1=>승인, 2=>대기, 3=> 반려
  level: number;
  forSale: number;
  searchType: string;
  searchKeyword: string;
  type: null | number;
  tripCheck: boolean;
}

interface GoodsSettingFiterInfoState {
  GoodsSettingFilterInfo: GoodsSettingFilterInfoType;
  setGoodsSettingFilterInfo: (
    firstFilterInfo: GoodsSettingFilterInfoType,
  ) => void;
  deleteGoodsSettingFilterInfo: () => void;
}

export const defaultState :GoodsSettingFilterInfoType  = {
  pageNo: 0,
  pageSize: 10,
  status: null, //0=>임시저장, 1=>승인, 2=>대기, 3=> 반려
  level: 0, //0 => 전체 1=>노출, 2=>미노출
  forSale: 0, //0=> 전체 1=>판매, 2=>판매안함 , 10 =>품절
  searchType: '',
  searchKeyword: '',
  type: 0,
  tripCheck: false,
};

// export const useGoodsSettingFilterZuInfo = create(
//   persist<GoodsSettingFiterInfoState>(
//     (set) => ({
//       GoodsSettingFilterInfo: defaultState,
//       setGoodsSettingFilterInfo: (
//         GoodsSettingFilterInfo: GoodsSettingFilterInfoType,
//       ) => {
//         set({ GoodsSettingFilterInfo });
//       },
//       deleteGoodsSettingFilterInfo: () => {
//         console.log('deleteGoodsSettingFilterInfo 호출됨');
//       console.log('초기화 값:', defaultState);
//         set({ GoodsSettingFilterInfo: defaultState });
//       },
//     }),
//     {
//       name: 'gate26',
//       storage: createJSONStorage(() => sessionStorage),
//       // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
//     },
//   ),
// );

export const useGoodsSettingFilterZuInfo = create(
  persist<GoodsSettingFiterInfoState>(
    (set) => ({
      GoodsSettingFilterInfo: defaultState,

      setGoodsSettingFilterInfo: (info) => {
        set({ GoodsSettingFilterInfo: info });
      },

      updatePartialFilter: (partial) => {
        set((state) => ({
          GoodsSettingFilterInfo: {
            ...state.GoodsSettingFilterInfo,
            ...partial,
          },
        }));
      },

      deleteGoodsSettingFilterInfo: () => {
        set({ GoodsSettingFilterInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);