import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import InputAssignment from '../Input/InputAssignment';
import { LessonContext } from '@/contexts';
import { ContentPair } from '@/types';
import { NodeType } from '@/enums';
import ButtonSolid from '../Button/ButtonSolid';
import { convertContentPairToRecord } from '@/helpers';

type LessonContextType = {
  inputMode: boolean;
  setInputMode: (value: boolean) => void;
  contents: ContentPair[];
  setInputs: (value: Record<string, number>) => void;
  // setContents: (value: ContentPair[]) => void;
};

const EBQuest = () => {
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [inputStatus, setInputStatus] = useState<string>('');
  const { inputMode, setInputMode, contents, setInputs } = useContext(
    LessonContext
  ) as LessonContextType;
  console.log('🚀 ~ EBQuest ~ contents:', contents);

  // xử lý ghi nhận nhiều input
  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value; // Cập nhật giá trị tại index
    setInputValues(newInputValues);

    // Xử lý logic valid trạng thái
    // const newValidStates = [...validStates];
    // if (value.trim() === '') {
    //   newValidStates[index] = 'error';
    // } else {
    //   newValidStates[index] = 'success';
    // }
    // setValidStates(newValidStates);
  };

  // Kiểm tra các input đã được nhập hết chưa -> nếu rồi thì trả dữ liệu cho FlowchartDynamic
  const handleSubmit = () => {
    if (inputMode === false) {
      setInputStatus('No input required');
      return;
    }

    const inputs = contents.filter(
      (content) => content.type === NodeType.Parallelogram
    );
    const testInput = inputValues.filter((x) => x !== null && x !== undefined);

    const allFilled = testInput.every((value) => value && value.trim() !== '');
    if (
      inputValues.length > 0 &&
      testInput.length === inputs.length &&
      allFilled
    ) {
      setInputStatus('All inputs are filled');
      inputs.forEach((input, index) => {
        input.right = testInput[index];
      });
      setInputMode(false);
      setInputs(convertContentPairToRecord(inputs));
    } else {
      setInputStatus('Some inputs are missing values');
    }
  };

  useEffect(() => {
    if (inputStatus)
      setTimeout(() => {
        setInputStatus('');
      }, 3000);
  }, [inputStatus]);

  // Hàm xử lý render step với component InputAssignment
  const renderContent = (content: ContentPair, index: number) => {
    if (content.type === NodeType.Oval) {
      return (
        <>
          <React.Fragment>{content.left}</React.Fragment>
        </>
      );
    } else if (content.type === NodeType.Parallelogram) {
      if (content.right)
        return (
          <>
            <React.Fragment>
              <span>{content.left}: </span>
              <InputAssignment
                key={index}
                value={content.right}
                title="test"
                readOnly={!inputMode}
                onChange={(value) => handleInputChange(index, value)}
              />
            </React.Fragment>
          </>
        );
      return (
        <>
          <React.Fragment>
            <span>{content.left}: </span>
            <InputAssignment
              key={index}
              type="number"
              title="test"
              readOnly={!inputMode}
              onChange={(value) => handleInputChange(index, value)}
            />
          </React.Fragment>
        </>
      );
    } else if (content.type === NodeType.Rectangle) {
      return (
        <>
          <React.Fragment>
            <span>{content.left} = </span>
            <span>{content.right}</span>
          </React.Fragment>
        </>
      );
    } else if (content.type === NodeType.Diamond) {
      return (
        <>
          <React.Fragment>
            <span>{content.left} </span>
            <InputAssignment
              key={index}
              value={content.right}
              title="test"
              readOnly={true}
              onChange={(value) => handleInputChange(index, value)}
            />
          </React.Fragment>
        </>
      );
    }
  };

  // useEffect(() => {
  //   setCurrContents(contents);
  // }, [contents]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-outline">
      {/* Quick Access Toolbar */}
      <div className="relative mr-8 flex flex-shrink-0 items-center justify-between gap-4 overflow-x-auto bg-primary-container px-2 py-2">
        <div className="flex select-none flex-row gap-3">
          <ButtonSolid
            content="Submit"
            isPrimary={false}
            className="h-6"
            onClick={handleSubmit}
          />
          <span className="text-nowrap text-base font-thin">{inputStatus}</span>
        </div>
      </div>
      {/* Button collapse editor */}
      <div className="absolute right-0 top-0 bg-primary-container p-2">
        <div className="flex size-6 justify-center rounded-full border border-primary">
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
        <pre className="w-full overscroll-y-auto whitespace-pre-wrap break-words">
          {/* Render từng step */}
          {contents.map((content: ContentPair, index) => (
            <div
              className="flex flex-wrap items-center border-b border-outline p-1"
              key={index}
            >
              {renderContent(content, index)}
              {/* {renderStepWithInput(content)} */}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default EBQuest;
