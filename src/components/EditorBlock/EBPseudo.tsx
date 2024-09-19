'use client';

import Image from 'next/image';
import React, { useContext, useRef } from 'react';
import PseudocodeEditor from './PseudoEditor';
import { LessonContext } from '@/contexts';

const EBPseudo = ({ onCollapse }: { onCollapse: () => void }) => {
  const editorRef = useRef<{
    focus: () => void;
    clearContent: () => void;
    addFormatting: (text: string) => void;
    addText: (text: string) => void;
  } | null>(null);

  const { pseudo, setPseudo } = useContext(LessonContext);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-outline">
      {/* Quick Access Toolbar */}
      <div className="relative mr-8 flex flex-shrink-0 items-center justify-between gap-4 overflow-x-auto scroll-smooth bg-primary-container px-2 py-2 focus:scroll-auto">
        <div className=" flex select-none flex-row flex-nowrap gap-3">
          <div
            onClick={onCollapse}
            className="flex h-6 w-8 items-center justify-center rounded-full bg-primary hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab text-on-primary">
              IF
            </span>
          </div>
        </div>
      </div>
      {/* Button collapse editor */}
      <div className="absolute right-0 top-0 bg-primary-container p-2">
        <div
          className="flex size-6 justify-center rounded-full border border-primary "
          onClick={onCollapse}
        >
          <Image
            alt="dropdown-icon"
            src={'/icons/up.svg'}
            width={10}
            height={5}
            className="select-none"
          />
        </div>
      </div>
      {/* Editor */}
      <div
        className="flex h-full w-full flex-grow overflow-hidden overflow-y-auto"
        onClick={() => {}}
      >
        <PseudocodeEditor ref={editorRef} value={pseudo} onChange={setPseudo} />
      </div>
    </div>
  );
};

export default EBPseudo;
