'use client';

import { useState } from 'react';
import { LessonContext } from '@/contexts';

function ChapterGVProvider({ children }: { children: React.ReactNode }) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <LessonContext.Provider
      value={{
        isOpenModal,
        setIsOpenModal
      }}
    >
      {children}
    </LessonContext.Provider>
  );
}

export default ChapterGVProvider;
