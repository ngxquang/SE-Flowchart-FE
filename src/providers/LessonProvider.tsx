'use client';

import { useState } from 'react';
import { LessonContext } from '@/contexts';

function LessonProvider({ children }: { children: React.ReactNode }) {
  const [markdown, setMarkdown] = useState<string>('');
  const [pseudo, setPseudo] = useState<string>('');

  return (
    <LessonContext.Provider
      value={{
        markdown,
        setMarkdown,
        pseudo,
        setPseudo
      }}
    >
      {children}
    </LessonContext.Provider>
  );
}

export default LessonProvider;
