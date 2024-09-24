'use client';

import Image from 'next/image';
import React, { useContext, useRef } from 'react';
import PseudocodeEditor from './PseudoEditor';
import { LessonContext } from '@/contexts';
import { PseudoEditorHandle } from '@/types';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { checkPseudocodeSyntax } from '@/helpers';

const EBPseudo = ({ onCollapse }: { onCollapse: () => void }) => {
  const editorRef = useRef<PseudoEditorHandle | null>(null);

  const { pseudo, setPseudo } = useContext(LessonContext);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-outline">
      {/* Quick Access Toolbar */}
      <div className="relative mr-8 flex flex-shrink-0 items-center justify-between gap-4 overflow-x-auto scroll-smooth bg-primary-container px-2 py-2 focus:scroll-auto">
        <div className=" flex h-6 flex-shrink-0 flex-row overflow-x-auto scroll-smooth">
          {pseudo && checkPseudocodeSyntax(pseudo) === 'Cú pháp hợp lệ.' ? (
            <>
              <CheckCircleIcon color="green" className="mr-2" />
              <span className="text-nowrap text-base font-thin">
                No issues found
              </span>
            </>
          ) : (
            pseudo && (
              <>
                <XCircleIcon color="red" className="mr-2" />
                <span className="text-nowrap text-base font-thin">
                  {checkPseudocodeSyntax(pseudo)}
                </span>
              </>
            )
          )}
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
