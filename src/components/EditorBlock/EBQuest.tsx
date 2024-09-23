import Image from 'next/image';
import React, { useState } from 'react';
import InputAssignment from '../Input/InputAssignment';

const EBQuest = ({ onCollapse, content }: { onCollapse: () => void, content: string }) => {
  const steps = content.split("\n");
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Hàm xử lý render step với component InputAssignment
  const renderStepWithInput = (step: string) => {
    const parts = step.split("||"); // Tách dựa trên "||"
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <InputAssignment title="test" onChange={() => {}} />
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-outline">
      {/* Quick Access Toolbar */}
      <div className="relative mr-8 flex flex-shrink-0 items-center justify-between gap-4 overflow-x-auto bg-primary-container px-2 py-2">
        <div className="flex select-none flex-row gap-3">
          <div
            onClick={handlePrevStep}
            className="flex h-6 w-8 items-center justify-center rounded-full bg-primary hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab text-on-primary">&lt;</span>
          </div>
          <div
            onClick={handleNextStep}
            className="flex h-6 w-8 items-center justify-center rounded-full bg-primary hover:cursor-pointer hover:bg-primary/50"
          >
            <span className="self-center font-roboto_slab text-on-primary">&gt;</span>
          </div>
        </div>
      </div>
      {/* Button collapse editor */}
      <div className="absolute right-0 top-0 bg-primary-container p-2">
        <div
          className="flex size-6 justify-center rounded-full border border-primary"
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
      {/* Content Display */}
      <div className="flex h-full w-full flex-grow overflow-hidden overflow-y-auto p-4">
        <pre className="whitespace-pre-wrap break-words w-full">
          {/* Render từng step */}
          {steps.slice(0, currentStep + 1).map((step, index) => (
            <div className="flex flex-wrap items-center border-b border-outline p-1" key={index}>
              {renderStepWithInput(step)}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default EBQuest;
