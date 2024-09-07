import Image from 'next/image';
import React, { useContext, useState, useRef } from 'react';
import MarkdownEditor from './MarkdownEditor';
import { LessonContext } from '@/contexts';

const EBDe = ({ onCollapse }: { onCollapse: () => void }) => {
  const editorRef = useRef<{
    focus: () => void;
    addText: (text: string) => void;
  } | null>(null);
  const { markdown, setMarkdown } = useContext(LessonContext);
  const [editorKey, setEditorKey] = useState(0);

  const handleFocus = () => {
    if (editorRef.current) {
      editorRef.current.focus(); // Focus vào editor
    }
  };

  const handleBold = () => {
    if (editorRef.current) {
      editorRef.current.addText(' **bold text**');
      forceReRender();
    }
  };

  // Hàm xử lý in nghiêng
  const handleItalic = () => {
    if (editorRef.current) {
      editorRef.current.addText(' *italic text*');
      forceReRender();
    }
  };

  const forceReRender = () => {
    setEditorKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-xl border border-outline">
      <div className="flex items-center justify-between bg-primary-container px-3 py-2">
        <div className="flex flex-row gap-3">
          <div
            onClick={handleBold}
            className="flex h-6 w-7 items-center justify-center rounded-full bg-primary hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab font-bold text-on-primary">
              B
            </span>
          </div>
          <div
            onClick={handleItalic}
            className="flex h-6 w-7 items-center justify-center rounded-full bg-primary hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab italic text-on-primary">
              I
            </span>
          </div>
        </div>
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

export default EBDe;
