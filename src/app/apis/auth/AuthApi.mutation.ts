import { useMutation } from 'react-query';

import { MutationHookParams } from '../../apis/type';

import authApi from './AuthApi';

export const EXAMPLE_API_MUTATION_KEY = {
  POST: (param?: string) => ['login', 'signup', 'refreshtoken', param],
};

export const usePostLoginMutation = (
  params?: MutationHookParams<typeof authApi.postLogin>,
) => {
  return useMutation(authApi.postLogin, {
    ...params?.options,
  });
};

// export const usePostSignupMutaion = (
//   params?: MutationHookParams<typeof authApi.postSignUp>,
// ) => {
//   return useMutation(authApi.postSignUp, {
//     ...params?.options,
//   });
// };

// export const usePostRefreshToken = (
//   params?: MutationHookParams<typeof authApi.getRefreshedToken>,
// ) => {
//   return useMutation(authApi.getRefreshedToken, {
//     ...params?.options,
//   });
// };
