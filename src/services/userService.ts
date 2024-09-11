import axios from '@/libs/axiosInstance';

export const getUser = async (id: number) => {
  try {
    const res = await axios(`/users/${id}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ getUser ~ error:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const res = await axios(`/users`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ getUsers ~ error:', error);
    throw error;
  }
};
