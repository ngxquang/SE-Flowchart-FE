import axios from '@/libs/axiosInstance';

export const getUsers = async (id: number) => {
  try {
    const res = await axios(`/users/${id}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ getUsers ~ error:', error);
    throw error;
  }
};
