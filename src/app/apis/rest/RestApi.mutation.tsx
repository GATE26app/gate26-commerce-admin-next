import { useMutation } from 'react-query';

import { MutationHookParams } from '../../apis/type';
import restApi from './RestApi';
import { DecideMeetingMember } from './RestApi.type';

export const EXAMPLE_API_MUTATION_KEY = {
  MEETING_MEMBER_DECIDE: (param?: DecideMeetingMember) => [
    'decidemeetingmember',
    param,
  ],
};

export const usePosteDecideMeetingMemberMutation = (
  params?: MutationHookParams<typeof restApi.postRevokeMeeting>,
) => {
  return useMutation(restApi.postRevokeMeeting, {
    ...params?.options,
  });
};
