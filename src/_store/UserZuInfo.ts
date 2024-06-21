import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface userInfoType {
  accessToken?: string;
  refreshToken?: string;
}

interface UserInfoState {
  userZuInfo: userInfoType;
  setUserZuInfo: (userZuInfo: userInfoType) => void;
  deleteUserZuInfo: () => void;
}

const defaultState = {
  accessToken: '',
  refreshToken: '',
};

export const useUserZuInfo = create(
  persist<UserInfoState>(
    (set) => ({
      userZuInfo: defaultState,
      setUserZuInfo: (userZuInfo: userInfoType) => {
        set({ userZuInfo });
      },
      deleteUserZuInfo: () => {
        set({ userZuInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
