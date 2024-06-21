import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserStateType {
  isOpenModal: boolean;
  title?: string;
  message: string;
  okButtonName?: string;
  type: 'alert' | 'confirm';
  cbOk?: () => void; // alert, confirm OK 버튼 콜백
  cbCancel?: () => void; // confirm Cancel 버튼 콜백
}

const initialState: UserStateType = {
  isOpenModal: false,
  title: 'Alert',
  message: '',
  type: 'alert',
  okButtonName: '확인',
};

interface MessageType {
  title?: string;
  message: string;
  okButtonName?: string;
  type: 'alert' | 'confirm';
  cbOk?: () => void; // alert, confirm OK 버튼 콜백
  cbCancel?: () => void; // confirm Cancel 버튼 콜백
}
export const customModalSlice = createSlice({
  name: 'CUSTOM_MODAL',
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
  actions: customModalSliceAction, //
  reducer: customModalSliceReducer,
} = customModalSlice;

export default customModalSlice;
