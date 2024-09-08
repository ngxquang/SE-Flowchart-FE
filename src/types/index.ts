export type ExerciseType = {
  title: string;
  url: string;
};

export type ListExerciseType = {
  titleChuong: string;
  Exercises: ExerciseType[];
};

export type ListMucType = ListExerciseType[];