import Image from 'next/image';
import React, { useContext } from 'react';
import { LessonContext } from '@/contexts';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import { useAddLesson } from '@/hooks';
import { CreateLessonDto } from '@/dto/create-lesson';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import FlowchartStatic from '../Flowchart/FlowchartStatic';
import { checkPseudocodeSyntax } from '@/helpers';
import ButtonSolid from '../Button/ButtonSolid';

const Preview = () => {
  const { markdown, pseudo } = useContext(LessonContext);
  const { addLesson } = useAddLesson();

  const handleStoreAssignment = async () => {
    if (!markdown) return;

    const data: CreateLessonDto = {
      description: markdown,
      image: '',
      status: '1',
      urlMd: 'https://',
      flowChart: pseudo,
      statusFlowChart: pseudo ? '1' : '0',
      lessonGroupId: 1,
      lessonTypeId: 1
    };
    await addLesson(data);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl">
      {/* Header */}
      <div className="flex items-center  justify-center bg-primary-container px-3 py-2">
        <div className="flex size-6 justify-center rounded-full border border-primary ">
          <Image
            alt="dropdown-icon"
            src={'/icons/up.svg'}
            width={10}
            height={5}
            className="select-none"
          />
        </div>
      </div>
      {/* Preview */}
      <div className=" m-2 flex-grow overflow-x-auto">
        <Markdown
          className={`font-roboto_slab`}
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={{
            p: ({ node, ...props }) => (
              <p className="mb-1 text-base" {...props} />
            ),
            h1: ({ node, ...props }) => (
              <h1 className="mb-4 text-4xl" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="mb-3 text-3xl" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="mb-2 text-2xl" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul
                style={{
                  paddingLeft: '20px',
                  listStyleType: 'circle',
                  color: 'black'
                }}
                {...props}
              />
            ),
            li: ({ node, ...props }) => (
              <li
                style={{
                  fontWeight: 'normal',
                  listStyleType: 'disc'
                }}
                {...props}
              />
            ),
            table: ({ node, ...props }) => (
              <table
                className="border-gray-300 min-w-full border-collapse border"
                {...props}
              />
            ),
            thead: ({ node, ...props }) => (
              <thead className="bg-gray-200" {...props} />
            ),
            tbody: ({ node, ...props }) => (
              <tbody className="divide-gray-200 divide-y" {...props} />
            ),
            tr: ({ node, ...props }) => (
              <tr className="border-gray-300 border-b" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th
                className="text-gray-600 border-gray-400 border px-4 py-2 text-left text-sm font-medium"
                {...props}
              />
            ),
            td: ({ node, ...props }) => (
              <td
                className="text-gray-500 border-gray-400 border px-4 py-2 text-sm"
                {...props}
              />
            )
          }}
        >
          {markdown}
        </Markdown>
        <div className="max-h-fit w-full">
          <div className="flex items-start justify-center">
            {pseudo && checkPseudocodeSyntax(pseudo) === 'Cú pháp hợp lệ.' ? (
              <FlowchartStatic pseudo={pseudo} />
            ) : (
              pseudo && (
                <span className="font-roboto_slab text-erorr">
                  Please check your code!
                </span>
              )
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="flex w-full flex-row-reverse bg-primary-container px-5 py-3">
        <ButtonSolid
          content="Chạy từng bước"
          isPrimary={true}
          iconRight={<ArrowRightIcon width={20} height={20} color="white" 
          onClick={handleStoreAssignment}/>}
        />
      </footer>
    </div>
  );
};

export default Preview;
