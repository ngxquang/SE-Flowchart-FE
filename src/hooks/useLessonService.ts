import useSWR, { mutate } from 'swr';
import { getLesson, getLessons, addLesson } from '@/services/lessonService';

const fetcherGetLesson = (id: number) => getLesson(id);

export const useGetLesson = (id: number) => {
  const { data, error, isLoading } = useSWR(`/lessons/${id}`, () =>
    fetcherGetLesson(id)
  );
  return { data, error, isLoading };
};

const fetcherGetLessons = () => getLessons();

export const useGetLessons = () => {
  const { data, error, isLoading } = useSWR(`/lessons`, fetcherGetLessons);
  return { data, error, isLoading };
};

export const useAddLesson = () => {
  const addNewLesson = async (lessonData: {
    description: string;
    lessonGroupId: number;
    lessonTypeId: number;
  }) => {
    try {
      await addLesson(lessonData);
      // Trigger revalidation of the lesson data
      mutate('/lesson');
    } catch (error) {
      console.error('Error adding lesson:', error);
      throw error;
    }
  };

  return {
    addLesson: addNewLesson
  };
};
