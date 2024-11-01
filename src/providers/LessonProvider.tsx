'use client';

import { useCallback, useRef, useState } from 'react';
import { LessonContext } from '@/contexts';
import { ContentPair, ValidType } from '@/types';

function LessonProvider({ children }: { children: React.ReactNode }) {
  const [markdown, setMarkdown] = useState<string>('');
  const [pseudo, setPseudo] = useState<string>('');
  const [inputMode, setInputMode] = useState<boolean>(false);
  const [contents, setContents] = useState<ContentPair[]>([]);
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [isCurrentStepValid, setIsCurrentStepValid] =
    useState<ValidType>('default');
  const handlePrevStepTriggerRef = useRef<() => void>(() => {});

  const registerPrevStepTrigger = useCallback((callback: () => void) => {
    handlePrevStepTriggerRef.current = callback;
  }, []);

  const handlePrevStepTrigger = useCallback(() => {
    handlePrevStepTriggerRef.current();
  }, []);

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
        setInputs,
        isCurrentStepValid,
        setIsCurrentStepValid,
        registerPrevStepTrigger,
        handlePrevStepTrigger
      }}
    >
      {children}
    </LessonContext.Provider>
  );
}

export default LessonProvider;
