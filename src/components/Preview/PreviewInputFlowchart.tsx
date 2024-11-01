'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { LessonContext } from '@/contexts';
import { checkPseudocodeSyntax } from '@/helpers';
import ButtonSolid from '../Button/ButtonSolid';
import { ArrowRightIcon, ArrowPathIcon } from '@heroicons/react/20/solid';
import { useRouter, useParams } from 'next/navigation';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  BackwardIcon,
  ForwardIcon
} from '@heroicons/react/24/outline';
import { FlowchartDynamicHandle, ValidType } from '@/types';
import FlowchartDynamic from '../Flowchart/FlowchartDynamic';
import { classNames } from '../classNames';

type LessonContextType = {
  pseudo: string;
  inputs: Record<string, number>;
  isCurrentStepValid: ValidType;
  setIsCurrentStepValid: (value: ValidType) => void;
  handlePrevStepTrigger: () => void;
};

const PreviewInputFlowchart = () => {
  const flowchartRef = useRef<FlowchartDynamicHandle | null>(null);

  const [isRunAuto, setIsRunAuto] = useState<boolean>(false);

  const {
    pseudo,
    inputs,
    isCurrentStepValid,
    setIsCurrentStepValid,
    handlePrevStepTrigger
  } = useContext(LessonContext) as LessonContextType;

  // React to changes in current step validation
  useEffect(() => {
    if (isCurrentStepValid === 'success') {
      handleNextStep(); // Move to the next step
      setIsCurrentStepValid('error'); // Reset validation for the next step
    }
  }, [isCurrentStepValid]);

  // Go to next step when submitting inputs
  useEffect(() => {
    if (!(Object.keys(inputs).length === 0)) {
      if (flowchartRef.current) {
        flowchartRef.current.next();
      }
    }
  }, [inputs]);

  const handleNextStep = () => {
    // Return when current-step is not valid
    if (
      !(Object.keys(inputs).length === 0) &&
      !(isCurrentStepValid === 'success')
    )
      return;

    if (flowchartRef.current) {
      flowchartRef.current.next();
    }
  };

  const handlePrevStep = () => {
    if (flowchartRef.current) {
      flowchartRef.current.prev();
      handlePrevStepTrigger(); // Trigger the registered callback in EBInputQuest
    }
  };

  const handleRestart = () => {
    if (flowchartRef.current) {
      flowchartRef.current.backwardToStart();
      setIsRunAuto(true);
    }
  }

  // const handleRunAuto = () => {
  //   if (flowchartRef.current) {
  //     if (isRunAuto === true) {
  //       flowchartRef.current.stopRunAuto();
  //       setIsRunAuto(false);
  //     } else {
  //       flowchartRef.current.startRunAuto();
  //       setIsRunAuto(true);
  //     }
  //   }
  // };

  // const handleForward = () => {
  //   if (flowchartRef.current) {
  //     flowchartRef.current.forwardToEnd();
  //     setIsRunAuto(true);
  //   }
  // };

  // const handleBackward = () => {
  //   if (flowchartRef.current) {
  //     flowchartRef.current.backwardToStart();
  //     setIsRunAuto(true);
  //   }
  // };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl">
      {/* Quick Access Toolbar */}
      <div className="flex select-none flex-row justify-around bg-primary-container px-2 py-2">
        {/* <div className="flex flex-row gap-4">
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
        </div> */}
        <div>
          <ArrowPathIcon className="size-8 rounded-full bg-primary p-2 text-on-primary hover:cursor-pointer hover:brightness-110" 
          onClick={handleRestart}/>
        </div>
        <div className="flex flex-row gap-4">
          <ChevronLeftIcon
            className="size-8 rounded-full bg-primary p-2 text-on-primary hover:cursor-pointer hover:brightness-110"
            onClick={handlePrevStep}
          />
          <ChevronRightIcon
            className={classNames(
              'size-8 rounded-full bg-primary p-2 text-on-primary hover:brightness-110',
              !(Object.keys(inputs).length === 0) &&
                !(isCurrentStepValid === 'success')
                ? 'hover:cursor-not-allowed'
                : 'hover:cursor-pointer'
            )}
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

export default PreviewInputFlowchart;
