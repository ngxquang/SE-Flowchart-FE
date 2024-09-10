import useSWR from 'swr';
import { getUsers, getUser } from '@/services/userApi';

const fetcherGetUser = (id: number) => getUser(id);

export const useGetUser = (id: number) => {
  const { data, error, isLoading } = useSWR(`/users/${id}`, () =>
    fetcherGetUser(id)
  );
  return { data, error, isLoading };
};

const fetcherGetUsers = () => getUsers();

export const useGetUsers = () => {
  const { data, error, isLoading } = useSWR(`/users`, fetcherGetUsers);
  return { data, error, isLoading };
};
