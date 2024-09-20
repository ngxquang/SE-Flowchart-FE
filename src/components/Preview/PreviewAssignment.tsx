'use client';

import Image from 'next/image';
import React, { useContext } from 'react';
import { LessonContext } from '@/contexts';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';

const PreviewAssignment = () => {
  const { markdown } = useContext(LessonContext);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-outline">
      {/* Quick Access Toolbar */}
      <div className="relative flex flex-shrink-0 items-center justify-between gap-4 overflow-x-auto scroll-smooth bg-primary-container px-2 py-2 focus:scroll-auto">
        <div className=" flex select-none flex-row flex-nowrap gap-3 pl-10">
          <span className="font-semibold text-on-primary-container">
            Đề bài
          </span>
        </div>
      </div>

      {/* Preview */}
      <div className="flex h-full w-full flex-grow overflow-hidden overflow-y-auto">
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
        </div>
      </div>
    </div>
  );
};

export default PreviewAssignment;
