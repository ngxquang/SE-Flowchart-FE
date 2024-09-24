import axios from '@/libs/axiosInstance';

export const getLessonGroups = async (topicId?: number) => {
  try {
    const res = await axios(`/lesson-groups`, {
      params: { topicId }
    });
    return res.data;
  } catch (error) {
    console.log('🚫 ~ getLessonGroups ~ error:', error);
    throw error;
  }
};
