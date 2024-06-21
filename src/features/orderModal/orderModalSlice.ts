import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserStateType {
  isOpenModal: boolean;
  title?: string;
  message: string;
  okButtonName?: string;
  type: 'delivery' | 'cancel';
  cbOk?: () => void; // alert, confirm OK 버튼 콜백
  cbCancel?: () => void; // confirm Cancel 버튼 콜백
}

const initialState: UserStateType = {
  isOpenModal: false,
  title: 'Alert',
  message: '',
  type: 'delivery',
  okButtonName: '확인',
};

interface MessageType {
  title?: string;
  message: string;
  okButtonName?: string;
  type: 'delivery' | 'cancel';
  cbOk?: () => void; // alert, confirm OK 버튼 콜백
  cbCancel?: () => void; // confirm Cancel 버튼 콜백
}
export const orderModalSlice = createSlice({
  name: 'ORDER_MODAL',
  initialState,
  reducers: {
    setIsOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
    setMessage: (state, action: PayloadAction<MessageType>) => {
      const { title, message, type, okButtonName, cbOk, cbCancel } =
        action.payload;
      state.title = title;
      state.message = message;
      state.type = type;
      state.okButtonName = okButtonName;
      state.cbOk = cbOk;
      state.cbCancel = cbCancel;
    },
  },
});

export const {
  actions: orderModalSliceAction, //
  reducer: orderModalSliceReducer,
} = orderModalSlice;

export default orderModalSlice;
