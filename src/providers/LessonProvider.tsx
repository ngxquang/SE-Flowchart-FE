'use client';

import { useState } from 'react';
import { LessonContext } from '@/contexts';

function LessonProvider({ children }: { children: React.ReactNode }) {
  const [markdown, setMarkdown] = useState<string>('');

  return (
    <LessonContext.Provider
      value={{
        markdown,
        setMarkdown
      }}
    >
      {children}
    </LessonContext.Provider>
  );
}

export default LessonProvider;
