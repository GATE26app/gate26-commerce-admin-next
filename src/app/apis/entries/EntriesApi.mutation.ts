import { useMutation } from 'react-query';

import { MutationHookParams } from '../../apis/type';

import entriesApi from './EntriesApi';

//응모목록
export const useGetListMutation = (
  params?: MutationHookParams<typeof entriesApi.getEntriesList>,
) => {
  return useMutation(entriesApi.getEntriesList, {
    ...params?.options,
  });
};
//응모 상세
export const useGetEntryDetailMutation = (
  params?: MutationHookParams<typeof entriesApi.getEntriesDetail>,
) => {
  return useMutation(entriesApi.getEntriesDetail, {
    ...params?.options,
  });
};
export const usePostEntriesImageMutation = (
  params?: MutationHookParams<typeof entriesApi.postEntriesImage>,
) => {
  return useMutation(entriesApi.postEntriesImage, {
    ...params?.options,
  });
};
//응모등록
export const usePutCreateEntriesMutation = (
  params?: MutationHookParams<typeof entriesApi.putCreateEntries>,
) => {
  return useMutation(entriesApi.putCreateEntries, {
    ...params?.options,
  });
};
//응모 수정
export const usePatchEntryModifyMutation = (
  params?: MutationHookParams<typeof entriesApi.patchEntriesModify>,
) => {
  return useMutation(entriesApi.patchEntriesModify, {
    ...params?.options,
  });
};
//응모 삭제
export const useEntryDeleteMutation = (
  params?: MutationHookParams<typeof entriesApi.deleteEntry>,
) => {
  return useMutation(entriesApi.deleteEntry, {
    ...params?.options,
  });
};
//응모 참여자 목록
export const useGetEntryParticipantListMutation = (
  params?: MutationHookParams<typeof entriesApi.getEntryParticipant>,
) => {
  return useMutation(entriesApi.getEntryParticipant, {
    ...params?.options,
  });
};
//응모 당첨자 목록
export const useGetEntryWinnerListMutation = (
  params?: MutationHookParams<typeof entriesApi.getEntryWinnerList>,
) => {
  return useMutation(entriesApi.getEntryWinnerList, {
    ...params?.options,
  });
};
