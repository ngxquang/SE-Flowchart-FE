import axios from '@/libs/axiosInstance';

export const getLessons = async () => {
  try {
    const res = await axios.get(`/lessons`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ getLessons ~ error:', error);
    throw error;
  }
};

export const getLesson = async (id: number) => {
  try {
    const res = await axios.get(`/lessons/${id}`);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ getLessons ~ error:', error);
    throw error;
  }
};

export const getLessonByLessonTypeIdAndLessonName = async (lessonTypeId: number, lessonName: string) => {
  try {
    const res = await axios.get(`/lessons/lesson-name`, {
      params: {lessonTypeId, lessonName}
    })
    return res.data;
  } catch (error) {
    console.log('🚫 ~ getLessonByLessonTypeIdAndLessonName ~ error:', error);
    throw error;
  }
}

export const getLessonsByLessonTypeId = async (lessonTypeId: number) => {
  try {
    const res = await axios.get(`/lessons`, {
      params: {lessonTypeId}
    })
    return res.data;
  } catch (error) {
    console.log('🚫 ~ getLessonByLessonTypeId ~ error:', error);
    throw error;
  }
}

export const addLesson = async ({
  description,
  lessonGroupId,
  lessonTypeId
}: {
  description: string;
  lessonGroupId: number;
  lessonTypeId: number;
}) => {
  try {
    const data = { description, lessonGroupId, lessonTypeId };
    const res = await axios.post(`/lessons`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ addLesson ~ error:', error);
    throw error;
  }
};
