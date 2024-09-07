import Image from 'next/image';
import React, { useContext, useState, useRef, useEffect } from 'react';
import MarkdownEditor from './MarkdownEditor';
import { LessonContext } from '@/contexts';

const EBAssignment = ({ onCollapse }: { onCollapse: () => void }) => {
  const editorRef = useRef<{
    focus: () => void;
    addText: (text: string) => void;
  } | null>(null);
  const { markdown, setMarkdown } = useContext(LessonContext);
  const [editorKey, setEditorKey] = useState(0);

  const handleFocus = () => {
    console.log('🚀 ~ handleFocus ~ editorRef.current:', editorRef.current);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleBold = () => {
    if (editorRef.current) {
      editorRef.current.addText(' **bold text**');
      forceReRender();
    }
  };

  const handleItalic = () => {
    if (editorRef.current) {
      editorRef.current.addText(' *italic text*');
      forceReRender();
    }
  };

  const handleEQ = () => {
    if (editorRef.current) {
      editorRef.current.addText(' $Type \\ equation \\ here$');
      forceReRender();
    }
  };

  const handleGreekLetter = (letter: string): void => {
    if (editorRef.current) {
      editorRef.current.addText(letter);
      forceReRender();
    }
  };

  const handleMult = () => {
    if (editorRef.current) {
      editorRef.current.addText(' ×');
      forceReRender();
    }
  };

  const handleSqrt = () => {
    if (editorRef.current) {
      const newText = ' $\\sqrt{x}$';
      editorRef.current.addText(newText);
      forceReRender();
    }
  };

  const handleNSqrt = () => {
    if (editorRef.current) {
      const newText = ' $\\sqrt[n]{x}$';
      editorRef.current.addText(newText);
      forceReRender();
    }
  };

  const handleFrac = () => {
    if (editorRef.current) {
      const newText = ' $\\frac{a}{b}$';
      editorRef.current.addText(newText);
      forceReRender();
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
      forceReRender();
    }
  };

  const forceReRender = () => {
    setEditorKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-xl border border-outline">
      <div className="relative flex items-center justify-between gap-4 bg-primary-container px-3 py-2">
        <div className="flex flex-row gap-3">
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
        <div className="absolute right-0 bg-primary-container p-2">
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
      </div>
      <div className="h-[90%] w-full overflow-x-auto" onClick={handleFocus}>
        <MarkdownEditor
          key={editorKey}
          ref={editorRef}
          value={markdown}
          onChange={setMarkdown}
        />
      </div>
    </div>
  );
};

export default EBAssignment;
