import useSWR from 'swr';
import { getGroups } from '@/services/groupService';

const fetcherGetGroups = () => getGroups();

export const useGetGroups = () => {
  const { data, error, isLoading } = useSWR(`/groups`, fetcherGetGroups);
  return { data, error, isLoading };
};
