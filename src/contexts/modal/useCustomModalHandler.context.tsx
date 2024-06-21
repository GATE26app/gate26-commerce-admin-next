import { useDispatch } from 'react-redux';

import constate from 'constate';

import { customModalSliceAction } from '@/features/customModal/customModalSlice';
import { orderModalSliceAction } from '@/features/orderModal/orderModalSlice';
import useOpenModalByQueryParams from '@/app/hooks/useOpenModalByQueryParams';

function useCustomModalHandler() {
  const dispatch = useDispatch();
  const { closeModal, openModal } = useOpenModalByQueryParams({
    'custom-modal': (isOpen: boolean) =>
      dispatch(customModalSliceAction.setIsOpenModal(isOpen)),
  });
  const { closeOrModal, openOrModal } = useOpenModalByQueryParams({
    'order-modal': (isOpen: boolean) =>
      dispatch(orderModalSliceAction.setIsOpenModal(isOpen)),
  });
  function closeCustomModal() {
    closeModal('custom-modal');
  }
  function openCustomModal() {
    openModal(['custom-modal']);
  }
  function closeOrderModal() {
    closeOrModal('order-modal');
  }
  function openOrderModal() {
    openOrModal(['order-modal']);
  }
  return { closeCustomModal, openCustomModal, closeOrderModal, openOrderModal };
}

export const [CustomModalHandlerProvider, useCustomModalHandlerContext] =
  constate(useCustomModalHandler);

// export const [OrderModalHandlerProvider, useOrderModalHandlerContext] =
// constate(useCustomModalHandler);

export function withCustomModalHandlerContext<T extends Function>(
  Component: T,
) {
  return function WrappedComponent(props: Parameter<T>) {
    return (
      <CustomModalHandlerProvider>
        <Component {...(typeof props === 'object' ? props : {})} />
      </CustomModalHandlerProvider>
    );
  };
}
