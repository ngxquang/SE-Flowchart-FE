import { CreateLessonDto } from '@/dto/create-lesson';
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

export const addLesson = async (data: CreateLessonDto) => {
  try {
    const res = await axios.post(`/lessons`, data);
    return res.data;
  } catch (error) {
    console.log('🚫 ~ addLesson ~ error:', error);
    throw error;
  }
};
