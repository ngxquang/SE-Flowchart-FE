'use client';

import { useParams } from 'next/navigation';
import { ListGV } from '@/components';
import { useGetLessonByLessonTypeIdAndLessonName, useGetLessonsByLessonTypeId } from '@/hooks';
import { useEffect, useState } from 'react';

export default function ChapterDetailScreen() {
  const params = useParams();
  const { chapter } = params || {};

  // Kiểm tra giá trị của chapter trước khi xử lý
  const chapterNum = Number(chapter.toString().split('chapter-')[1]);

  const parseSpaceLesson = (lessonName: string) => {
    return lessonName.replace(/%20/g, ' ');
  }

  const dataExercises = useGetLessonsByLessonTypeId(chapterNum);
  console.log('dataExercises: ', dataExercises);

  const [lessonId, setLessonId] = useState<number[]>([]);
  const [lessonName, setLessonName] = useState<string[]>([]);
  const [description, setDescription] = useState<string[]>([]);
  const [lessonGroupName, setLessonGroupName] = useState<string[]>([]);
  const [lengthData, setLengthData] = useState<number>(0);

  useEffect(() => {
    if (!dataExercises.isLoading && dataExercises.data) {
      const ansLessonId: number[] = dataExercises.data.data.map((lesson: any) => lesson.id);
      const ansLessonName: string[] = dataExercises.data.data.map(
        (lesson: any) => lesson.lessonName
      );
      const ansDescription: string[] = dataExercises.data.data.map(
        (lesson: any) => lesson.description
      );
      const ansLessonGroupName: string[] = dataExercises.data.data.map(
        (lesson: any) => lesson.lessonGroup.name
      );
      const ansLengthData: number = dataExercises.data.data.length;
      
      // Cập nhật state
      setLessonId(ansLessonId);
      setLessonName(ansLessonName);
      setDescription(ansDescription);
      setLessonGroupName(ansLessonGroupName);
      setLengthData(ansLengthData);
    }
  }, [dataExercises.isLoading, dataExercises.data]);

  // // Các giá trị sau khi state được cập nhật
  // console.log('lessonName: ', lessonName);
  // console.log('description: ', description);
  // console.log('lessonGroupName: ', lessonGroupName);
  // console.log('lengthData: ', lengthData);

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      {dataExercises.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <ListGV
          id={lessonId}
          lessonName={lessonName}
          description={description}
          lessonGroupName={lessonGroupName}
          lengthData={lengthData}
          chapter={chapterNum}
        />
      )}
    </div>
  );
}
