'use client';

import React, { useContext, useRef, useState } from 'react';
import { LessonContext } from '@/contexts';
import { checkPseudocodeSyntax } from '@/helpers';
import ButtonSolid from '../Button/ButtonSolid';
import { ArrowRightIcon, PlayIcon, PauseIcon } from '@heroicons/react/20/solid';
import { useRouter, useParams } from 'next/navigation';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  BackwardIcon,
  ForwardIcon
} from '@heroicons/react/24/outline';
import { FlowchartDynamicHandle } from '@/types';
import FlowchartDynamic from '../Flowchart/FlowchartDynamic';

const PreviewRunFlowchart = () => {
  const flowchartRef = useRef<FlowchartDynamicHandle | null>(null);
  const route = useRouter();
  const params = useParams();

  const [isShowFlowchart, setIsShowFlowchart] = useState(false);
  const [isRunAuto, setIsRunAuto] = useState<boolean>(false);

  const { lesson } = params;
  const { pseudo } = useContext(LessonContext);

  const handleNextStep = () => {
    if (flowchartRef.current) {
      flowchartRef.current.next();
    }
  };

  const handlePrevStep = () => {
    if (flowchartRef.current) {
      flowchartRef.current.prev();
    }
  };

  const handleRunAuto = () => {
    if (flowchartRef.current) {
      if (isRunAuto === true) {
        flowchartRef.current.stopRunAuto();
        setIsRunAuto(false);
      } else {
        flowchartRef.current.startRunAuto();
        setIsRunAuto(true);
      }
    }
  };

  const handleForward = () => {
    if (flowchartRef.current) {
      flowchartRef.current.forwardToEnd();
      setIsRunAuto(true);
    }
  };

  const handleBackward = () => {
    if (flowchartRef.current) {
      flowchartRef.current.backwardToStart();
      setIsRunAuto(true);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl">
      {/* Quick Access Toolbar */}
      <div className="flex select-none flex-row justify-around bg-primary-container px-2 py-2">
        <div className="flex flex-row gap-4">
          <BackwardIcon
            className="size-8 rounded-full bg-primary p-2 text-on-primary hover:cursor-pointer hover:brightness-110"
            onClick={handleBackward}
          />
          {isRunAuto ? (
            <PauseIcon
              className="size-8 rounded-full bg-primary p-2 text-on-primary hover:cursor-pointer hover:brightness-110"
              onClick={handleRunAuto}
            />
          ) : (
            <PlayIcon
              className="size-8 rounded-full bg-primary p-2 text-on-primary hover:cursor-pointer hover:brightness-110"
              onClick={handleRunAuto}
            />
          )}
          <ForwardIcon
            className="size-8 rounded-full bg-primary p-2 text-on-primary hover:cursor-pointer hover:brightness-110"
            onClick={handleForward}
          />
        </div>
        <div className="flex flex-row gap-4">
          <ChevronLeftIcon
            className="size-8 rounded-full bg-primary p-2 text-on-primary hover:cursor-pointer hover:brightness-110"
            onClick={handlePrevStep}
          />
          <ChevronRightIcon
            className="size-8 rounded-full bg-primary p-2 text-on-primary hover:cursor-pointer hover:brightness-110"
            onClick={handleNextStep}
          />
        </div>
      </div>

      {/* Preview */}
      <div className="flex h-full w-full flex-grow overflow-hidden overflow-y-auto">
        <div className="m-2 flex flex-grow items-start justify-center overflow-x-auto">
          {pseudo && checkPseudocodeSyntax(pseudo) === 'Cú pháp hợp lệ.' ? (
            <FlowchartDynamic
              ref={flowchartRef}
              pseudo={pseudo}
              isRunAuto={isRunAuto}
              setIsRunAuto={setIsRunAuto}
            />
          ) : (
            pseudo && (
              <span className="font-roboto_slab text-erorr">
                Please check your code!
              </span>
            )
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className="flex w-full flex-row-reverse bg-primary-container px-5 py-3">
        <ButtonSolid
          content="Bài tiếp theo"
          isPrimary={true}
          iconRight={<ArrowRightIcon width={20} height={20} color="white" />}
        />
      </footer>
    </div>
  );
};

export default PreviewRunFlowchart;
