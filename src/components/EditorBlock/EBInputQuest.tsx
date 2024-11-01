'use client';

import Image from 'next/image';
import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import InputAssignment from '../Input/InputAssignment';
import { LessonContext } from '@/contexts';
import { ContentPair, ValidType } from '@/types';
import { NodeType } from '@/enums';
import ButtonSolid from '../Button/ButtonSolid';
import { convertContentPairToRecord } from '@/helpers';
import { classNames } from '../classNames';
import { currNodeColor } from '@/constants';

type LessonContextType = {
  inputMode: boolean;
  setInputMode: (value: boolean) => void;
  contents: ContentPair[];
  inputs: Record<string, number>;
  setInputs: (value: Record<string, number>) => void;
  setIsCurrentStepValid: (value: ValidType) => void;
  registerPrevStepTrigger: (callback: () => void) => void;
};

const currColorContent = `bg-secondary`;

const EBInputQuest = () => {
  const [inputValues, setInputValues] = useState<
    { value: string; valid: ValidType }[]
  >([]);
  const [inputStatus, setInputStatus] = useState<string>('');
  const {
    inputMode,
    setInputMode,
    contents,
    inputs,
    setInputs,
    setIsCurrentStepValid,
    registerPrevStepTrigger
  } = useContext(LessonContext) as LessonContextType;
  const contentsEndRef = useRef<HTMLDivElement | null>(null);

  // handlePrevStep called in PreviewInputFlowchart

  // xử lý ghi nhận nhiều input
  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = { value, valid: 'default' }; // Cập nhật giá trị tại index
    setInputValues(newInputValues);
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

    const allFilled = testInput.every(
      (input) => input && input.value.trim() !== ''
    );
    if (
      inputValues.length > 0 &&
      testInput.length === inputs.length &&
      allFilled
    ) {
      setInputStatus('All inputs are filled');
      inputs.forEach((input, index) => {
        input.right = testInput[index].value;
      });
      setInputMode(false);
      setInputs(convertContentPairToRecord(inputs));
    } else {
      setInputStatus('Some inputs are missing values');
    }
  };

  // Kiểm tra kết quả nhập
  const handleCheck = (index: number, value: string, contentRight: string) => {
    // Xử lý kết quả
    const newInputValues = [...inputValues];
    newInputValues[index].valid = value == contentRight ? 'success' : 'error'; // Cập nhật giá trị tại index, xác định xem tại đó sinh viên đã điền đúng hay sai
    setInputValues(newInputValues);

    if (newInputValues[index].valid === 'success') {
      setIsCurrentStepValid('success');
    }
    console.log('🚀 ~ handleInputChange ~ newInputValues:', inputValues);
  };

  const handlePrevStepInEBInputQuest = (
    inputValues: { value: string; valid: ValidType }[],
    currContents: ContentPair[]
  ) => {
    console.log('handlePrevStep called in PreviewInputFlowchartt');

    const newInputValues = inputValues.filter(
      (_, index) => index <= currContents.length - 2
    );
    console.log('inputValues length:', inputValues.length);
    console.log('contents length:', currContents.length);
    setInputValues(newInputValues);
    console.log('🚀 ~ EBInputQuest ~ newInputValues:', newInputValues);
  };

  useEffect(() => {
    // Register a callback that fetches the latest inputValues when called
    registerPrevStepTrigger(() => {
      setInputValues((currentValues) => {
        handlePrevStepInEBInputQuest(currentValues, contents); // Use the latest inputValues in the state
        return currentValues; // Return the same values as no change is being made here
      });
    });
    // Register the function / Đăng ký hàm được sẽ được gọi lại (thực thi). Tức handlePrevStepInEBInputQuest
  }, [registerPrevStepTrigger, contents]);

  useEffect(() => {
    if (inputStatus)
      setTimeout(() => {
        setInputStatus('');
      }, 3000);
  }, [inputStatus]);

  useEffect(() => {
    contentsEndRef.current?.scrollIntoView();
  }, [contents]);

  useEffect(()=>{
    // inputs rỗng
    if (Object.keys(inputs).length === 0) {
      setInputValues([]);
    }
  },[inputs])

  // Hàm xử lý render step với component InputAssignment
  const renderContent = (content: ContentPair, index: number) => {
    if (content.type === NodeType.Oval) {
      return (
        <div
          className={classNames(
            index === contents.length - 1 ? currColorContent : '',
            'flex w-full flex-row items-center p-1'
          )}
        >
          <React.Fragment>{content.left}</React.Fragment>
        </div>
      );
    } else if (content.type === NodeType.Parallelogram) {
      if (content.right) {
        if (content.left.startsWith("Xuất")) {
          // OUTPUT
          return (
            <div
              className={classNames(
                index === contents.length - 1 ? currColorContent : '',
                'flex w-full flex-row items-center p-1'
              )}
            >
              <React.Fragment>
                <span>{content.left}: </span>
                <InputAssignment
                  key={index}
                  title="test"
                  readOnly={!(index === contents.length - 1)}
                  valid={inputValues[index] ? inputValues[index].valid : 'default'}
                  onChange={(value) => handleInputChange(index, value)}
                  onEnter={(e) =>
                    handleCheck(index, inputValues[index].value, content.right)
                  }
                  autoFocus={index === contents.length - 1}
                />
              </React.Fragment>
            </div>
          );
        } 
        else {
          // Completed INPUT
          return (
            <div
              className={classNames(
                index === contents.length - 1 ? currColorContent : '',
                'flex w-full flex-row items-center p-1'
              )}
            >
              <React.Fragment>
                <span>{content.left}: </span>
                <InputAssignment
                  key={index}
                  value={content.right}
                  title="test"
                  readOnly={!inputMode}
                  onChange={(value) => handleInputChange(index, value)}
                  onEnter={(e) =>
                    handleCheck(index, inputValues[index].value, content.right)
                  }
                  autoFocus={index === contents.length - 1}
                />
              </React.Fragment>
            </div>
          );
        }
      }
      

      return (
        // INPUT
        <>
          <React.Fragment>
            <span>Nhập {content.left}: </span>
            <InputAssignment
              key={index}
              type="number"
              title="test"
              readOnly={!inputMode}
              onChange={(value) => handleInputChange(index, value)}
              autoFocus={index === contents.length - 1}
            />
          </React.Fragment>
        </>
      );
    } else if (content.type === NodeType.Rectangle) {
      // Biểu thức tính toán
      return (
        <div
          className={classNames(
            index === contents.length - 1 ? currColorContent : '',
            'flex w-full flex-row items-center p-1'
          )}
        >
          <React.Fragment>
            <span>{content.left} = </span>
            <InputAssignment
              key={index}
              // value={inputValues[index].value}
              title="test"
              readOnly={!(index === contents.length - 1)}
              valid={inputValues[index] ? inputValues[index].valid : 'default'}
              onChange={(value) => handleInputChange(index, value)}
              onEnter={(e) =>
                handleCheck(index, inputValues[index].value, content.right)
              }
              autoFocus={index === contents.length - 1}
            />
          </React.Fragment>
        </div>
      );
    } else if (content.type === NodeType.Diamond) {
      // Câu điều kiện
      return (
        <div
          className={classNames(
            index === contents.length - 1 ? currColorContent : '',
            'flex w-full flex-row items-center p-1'
          )}
        >
          <React.Fragment>
            <span>{content.left} </span>
            <InputAssignment
              key={index}
              // value={inputValues[index].value}
              title="test"
              valid={inputValues[index] ? inputValues[index].valid : 'default'}
              readOnly={!(index === contents.length - 1)}
              onChange={(value) => handleInputChange(index, value)}
              onEnter={(e) =>
                handleCheck(index, inputValues[index].value, content.right)
              }
              autoFocus={index === contents.length - 1}
            />
          </React.Fragment>
        </div>
      );
    }
  };

  // useEffect(() => {
  //   setCurrContents(contents);
  // }, [contents]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-outline">
      {/* Quick Access Toolbar */}
      <div className="relative flex flex-shrink-0 items-center justify-between gap-4 overflow-x-auto bg-primary-container px-2 py-2">
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

      {/* Content Display */}
      <div className="flex h-full w-full flex-grow overflow-hidden overflow-y-auto p-4">
        <pre className="no-scrollbar w-full overflow-y-auto whitespace-pre-wrap break-words">
          {/* Render từng step */}
          {contents.map((content: ContentPair, index) => (
            <div
              className="flex flex-wrap items-center border-b border-dashed border-outline"
              key={index}
            >
              {renderContent(content, index)}
              {/* {renderStepWithInput(content)} */}
            </div>
          ))}
          {/* Scroll to div element, end of contents */}
          <div ref={contentsEndRef} />
        </pre>
      </div>
    </div>
  );
};

export default EBInputQuest;
