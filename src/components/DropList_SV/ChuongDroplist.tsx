'use client';

import { classNames } from '@/components';
import { useState, useRef } from 'react';
import { ExerciseType } from '@/types';
import { ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/solid';
import { FolderIcon } from '@heroicons/react/24/outline';
import BTapChuong from '@/components/DropList_SV/BTapChuong';

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
    <div
      className={classNames(
        'mt-4 w-full sm:max-w-[100%] sm:flex-row md:max-w-[80%] lg:max-w-[60%] '
      )}
    >
      <div
        className={classNames(
          'flex h-[80px] cursor-pointer items-center justify-between rounded-xl border-2 border-outline-focus bg-primary px-4 py-2 text-on-primary'
        )}
        onClick={toggleDropdown}
      >
        <div className={classNames('flex max-w-[90%] items-center')}>
          <span className={classNames('rounded-full bg-secondary p-2')}>
          <FolderIcon className={classNames('size-6 stroke-2')}/>
          </span>
          <div
            className={classNames(
              'ml-4 mr-9 flex flex-1 flex-col overflow-hidden'
            )}
          >
            <div>
              <p
                className={classNames(
                  'overflow-hidden truncate text-ellipsis whitespace-nowrap text-2xl'
                )}
              >
                {ChuongTitle}
              </p>
            </div>
            <p className={classNames('text-sm')}>
              {ListExercises.length} bài học
            </p>
          </div>
        </div>

        <div className={classNames('flex items-center')}>
          {expanded ? (
            <div
              className={classNames(
                'rounded-full border-2 border-primary-container p-2'
              )}
            >
              <ChevronUpIcon className={classNames('size-4')} />
            </div>
          ) : (
            <div
              className={classNames(
                'rounded-full border-2 border-primary-container p-2'
              )}
            >
              <ChevronDownIcon className={classNames('size-4')} />
            </div>
          )}
        </div>
      </div>

      <div
        ref={contentRef}
        className={classNames(
          'overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-300 ease-in-out'
        )}
        style={{
          maxHeight: expanded ? `${contentRef.current?.scrollHeight}px` : '0px'
        }}
      >
        {ListExercises.map((Exercise, index) => (
          <div key={index}>
            <BTapChuong ExerciseTitle={Exercise.title} href={Exercise.href} />
          </div>
        ))}
      </div>
    </div>
  );
}