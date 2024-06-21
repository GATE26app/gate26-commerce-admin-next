// import { useDispatch } from 'react-redux';

// import constate from 'constate';

// import { orderModalSliceAction } from '@features/orderModal/orderModalSlice';

// import useOpenModalByQueryParams from 'hooks/useOpenModalByQueryParams';

// function useOrderModalHandler() {
//   const dispatch = useDispatch();
//   const { closeModal, openModal } = useOpenModalByQueryParams({
//     'order-modal': (isOpen: boolean) =>
//       dispatch(orderModalSliceAction.setIsOpenModal(isOpen)),
//   });
//   function closeOrderModal() {
//     closeModal('order-modal');
//   }
//   function openOrderModal() {
//     openModal(['order-modal']);
//   }
//   return { closeOrderModal, openOrderModal };
// }

// export const [OrderModalHandlerProvider, useOrderModalHandlerContext] =
//   constate(useOrderModalHandler);

// export function withOrderModalHandlerContext<T extends Function>(Component: T) {
//   return function WrappedComponent(props: Parameter<T>) {
//     return (
//       <OrderModalHandlerProvider>
//         <Component {...(typeof props === 'object' ? props : {})} />
//       </OrderModalHandlerProvider>
//     );
//   };
// }
