'use client';

import { classNames } from '@/components/classNames';
import { useState, useRef } from 'react';
import { ExerciseType } from '@/types';
import ExerciseComp from '@/components/DropList_SV/BTapChuong'; 

export default function ChuongDroplist({
  ChuongTitle,
  ListExercises
}: {
  ChuongTitle: string;
  ListExercises: ExerciseType[];
}) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classNames("w-full sm:flex-row sm:max-w-[100%] md:max-w-[80%] lg:max-w-[60%] mt-4 ")}>
      <div
        className={classNames("flex h-[80px] cursor-pointer items-center justify-between rounded-xl bg-primary px-4 py-2 text-on-primary border-2 border-outline-focus")}
        onClick={toggleDropdown}
      >
        <div className={classNames('flex items-center max-w-[90%]')}>
          <span className={classNames('rounded-full bg-secondary p-2')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className={classNames('size-6')}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
          </span>
          <div className={classNames('flex flex-1 flex-col ml-4 mr-9 overflow-hidden')}>
            <div><p className={classNames('text-2xl truncate whitespace-nowrap overflow-hidden text-ellipsis')}>{ChuongTitle}</p></div>
            <p className={classNames('text-sm')}>
              {ListExercises.length} bài học
            </p>
          </div>
        </div>

        <div className={classNames('flex items-center')}>
          {expanded ? (
            <div className={classNames('rounded-full p-2 border-2 border-primary-container')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={classNames('size-4')}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            </div>
          ) : (
            <div className={classNames('rounded-full p-2 border-2 border-primary-container')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={classNames('size-4')}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      <div
        ref={contentRef}
        className={classNames('overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-300 ease-in-out')}
        style={{
          maxHeight: expanded ? `${contentRef.current?.scrollHeight}px` : '0px'
        }}
      >
        {ListExercises.map((Exercise, index) => (
          <div key={index}>
            <ExerciseComp ExerciseTitle={Exercise.title} href={Exercise.href} />
          </div>
        ))}
      </div>
    </div>
  );
}