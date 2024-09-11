import axios from '@/libs/axiosInstance';

export const getGroups = async () => {
  try {
    const res = await axios(`/groups`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ getGroups ~ error:', error);
    throw error;
  }
};
