'use client';

import Image from 'next/image';
import React, { useContext, useState, useRef, useEffect } from 'react';
import MarkdownEditor from './MarkdownEditor';
import { LessonContext } from '@/contexts';
import { MarkdownEditorHandle } from '@/types';

const EBAssignment = ({ onCollapse }: { onCollapse: () => void }) => {
  const editorRef = useRef<MarkdownEditorHandle | null>(null);

  const { markdown, setMarkdown } = useContext(LessonContext);

  const handleFocus = () => {
    console.log('🚀 ~ handleFocus ~ editorRef.current:', editorRef.current);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleBold = () => {
    if (editorRef.current) {
      editorRef.current.addFormatting('**');
      handleFocus();
    }
  };

  const handleItalic = () => {
    if (editorRef.current) {
      editorRef.current.addFormatting('*');
      handleFocus();
    }
  };

  const handleEQ = () => {
    if (editorRef.current) {
      editorRef.current.addText(' $Type \\ equation \\ here$');
      handleFocus();
    }
  };

  const handleGreekLetter = (letter: string): void => {
    if (editorRef.current) {
      editorRef.current.addText(letter);
      handleFocus();
    }
  };

  const handleMult = () => {
    if (editorRef.current) {
      editorRef.current.addText(' ×');
      handleFocus();
    }
  };

  const handleSqrt = () => {
    if (editorRef.current) {
      const newText = ' $\\sqrt{x}$';
      editorRef.current.addText(newText);
      handleFocus();
    }
  };

  const handleNSqrt = () => {
    if (editorRef.current) {
      const newText = ' $\\sqrt[n]{x}$';
      editorRef.current.addText(newText);
      handleFocus();
    }
  };

  const handleFrac = () => {
    if (editorRef.current) {
      const newText = ' $\\frac{a}{b}$';
      editorRef.current.addText(newText);
      handleFocus();
    }
  };

  const handleEQS = () => {
    if (editorRef.current) {
      const newText = ` \n$
\\begin{cases}
a + b = c \\\\
d + e = f
\\end{cases}
$`;
      editorRef.current.addText(newText);
      handleFocus();
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-outline">
      {/* Quick Access Toolbar */}
      <div className="relative mr-8 flex flex-shrink-0 items-center justify-between gap-4 overflow-x-auto scroll-smooth bg-primary-container px-2 py-2 focus:scroll-auto">
        <div className=" flex select-none flex-row flex-nowrap gap-3">
          <div
            onClick={handleBold}
            className="flex h-6 w-8 items-center justify-center rounded-full bg-primary hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab font-bold text-on-primary">
              B
            </span>
          </div>
          <div
            onClick={handleItalic}
            className="flex h-6 w-8 items-center justify-center rounded-full bg-primary hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab italic text-on-primary">
              I
            </span>
          </div>
          <div
            onClick={handleEQ}
            className="flex h-6 w-8 items-center justify-center rounded-full bg-primary hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab text-on-primary">
              EQ
            </span>
          </div>
          <div
            onClick={() => handleGreekLetter(' $\\alpha$')}
            className="flex h-6 w-8 items-center justify-center rounded-full bg-primary hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab text-on-primary">
              α
            </span>
          </div>
          <div
            onClick={() => handleGreekLetter(' $\\beta$')}
            className="flex h-6 w-8 items-center justify-center rounded-full bg-primary hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab text-on-primary">
              β
            </span>
          </div>
          <div
            onClick={() => handleGreekLetter(' $\\pi$')}
            className="flex h-6 w-8 items-center justify-center rounded-full bg-primary hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab text-on-primary">
              π
            </span>
          </div>
          <div
            onClick={() => handleGreekLetter(' $\\epsilon$')}
            className="flex h-6 w-8 items-center justify-center rounded-full bg-primary hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab text-on-primary">
              ϵ
            </span>
          </div>
          <div
            onClick={() => handleGreekLetter(' $\\Delta$')}
            className="flex h-6 w-8 items-center justify-center rounded-full bg-primary hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab text-on-primary">
              Δ
            </span>
          </div>
          <div
            onClick={handleMult}
            className="flex h-6 w-8 items-center justify-center rounded-full bg-primary hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab font-bold text-on-primary">
              ×
            </span>
          </div>
          <div
            onClick={handleSqrt}
            className="flex h-6 w-8 items-center justify-start rounded-full bg-primary pl-1 hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-left font-roboto_slab italic text-on-primary">
              √
            </span>
          </div>
          <div
            onClick={handleNSqrt}
            className="flex h-6 w-8 items-center justify-start rounded-full bg-primary pl-1 hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-left font-roboto_slab italic text-on-primary">
              n√
            </span>
          </div>
          <div
            onClick={handleFrac}
            className="flex h-6 w-8 items-center justify-center rounded-full bg-primary hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab text-on-primary">
              a/b
            </span>
          </div>
          <div
            onClick={handleEQS}
            className="flex h-6 w-8 items-center justify-center rounded-full bg-primary hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab text-on-primary">
              EQS
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
        onClick={handleFocus}
      >
        <MarkdownEditor
          ref={editorRef}
          value={markdown}
          onChange={setMarkdown}
        />
      </div>
    </div>
  );
};

export default EBAssignment;
