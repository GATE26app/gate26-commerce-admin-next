//@delete:line
import counterSlice from '@/features/counter/counterSlice';
import modalSlice from '@/features/modal/modalSlice';
import userSlice from '@/features/user/userSlice';

import { configureStore } from '@reduxjs/toolkit';

import customModalSlice from './customModal/customModalSlice';
import orderModalSlice from './orderModal/orderModalSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      //@delete:line
      [counterSlice.name]: counterSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [modalSlice.name]: modalSlice.reducer,
      [customModalSlice.name]: customModalSlice.reducer,
      [orderModalSlice.name]: orderModalSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
}

const store = makeStore();

export default store;
