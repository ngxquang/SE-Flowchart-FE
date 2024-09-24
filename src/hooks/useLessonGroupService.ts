import useSWR from 'swr';
import { getLessonGroups } from '@/services/lessonGroupService';

const fetchGetLessonGroups = (topicId?: number) => getLessonGroups(topicId);

export const useGetLessonGroups = (topicId?: number) => {
  const { data, error, isLoading } = useSWR(`/lesson-groups`, () =>
    fetchGetLessonGroups(topicId)
  );
  return { data, error, isLoading };
};