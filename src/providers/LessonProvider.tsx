'use client';

import { useState } from 'react';
import { LessonContext } from '@/contexts';
import { ContentPair } from '@/types';

function LessonProvider({ children }: { children: React.ReactNode }) {
  const [markdown, setMarkdown] = useState<string>('');
  const [pseudo, setPseudo] = useState<string>('');
  const [inputMode, setInputMode] = useState<boolean>(false);
  const [contents, setContents] = useState<ContentPair[]>([]);
  const [inputs, setInputs] = useState<Record<string, number>>({});

  return (
    <LessonContext.Provider
      value={{
        markdown,
        setMarkdown,
        pseudo,
        setPseudo,
        inputMode,
        setInputMode,
        contents,
        setContents,
        inputs,
        setInputs
      }}
    >
      {children}
    </LessonContext.Provider>
  );
}

export default LessonProvider;
