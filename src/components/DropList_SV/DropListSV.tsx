import ChuongDroplist from '@/components/DropList_SV/ChuongDroplist'; 
import { ListExerciseType, ListMucType } from '@/types';

export default function DropListSV({ ListDeMuc }: { ListDeMuc: ListMucType }) {
  return ListDeMuc.map((DeMuc: ListExerciseType) => {
    return (
      <ChuongDroplist
        ChuongTitle={DeMuc.titleChuong}
        ListExercises={DeMuc.Exercises}
      />
    );
  });
}