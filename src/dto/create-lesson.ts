export type CreateLessonDto = {
  description: string;
  image: string;
  status: '0' | '1';
  urlMd: string;
  flowChart: string;
  statusFlowChart: '0' | '1';
  lessonGroupId: number;
  lessonTypeId: number;
};
