import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { LessonContext } from '@/contexts';
import FlowchartStatic from '../Flowchart/FlowchartStatic';
import { checkPseudocodeSyntax } from '@/helpers';
import ButtonSolid from '../Button/ButtonSolid';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useRouter, useParams } from 'next/navigation';

const PreviewFlowchart = () => {
  const route = useRouter();
  const params = useParams();

  const [isShowFlowchart, setIsShowFlowchart] = useState(false);

  const { lesson } = params;
  const { pseudo } = useContext(LessonContext);

  const hideOrShowFlowchart = () => {
    setIsShowFlowchart(!isShowFlowchart);
  };

  const handleNavigateFlowchart = () => {
    route.push(`learning/flowchart`);
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl">
      {/* Quick Access Toolbar */}
      <div className="flex select-none flex-row justify-around bg-primary-container px-2 py-2">
        <ButtonSolid
          content={isShowFlowchart ? 'Ẩn lưu đồ' : 'Hiện lưu đồ'}
          isPrimary={false}
          className="h-6"
          onClick={hideOrShowFlowchart}
        />
        <ButtonSolid
          content="Chạy từng bước"
          isPrimary={false}
          className="h-6"
          onClick={handleNavigateFlowchart}
        />
        <ButtonSolid
          content="Chạy thủ công"
          isPrimary={false}
          className="h-6"
        />
      </div>

      {/* Preview */}
      <div className="flex h-full w-full flex-grow overflow-hidden overflow-y-auto">
        <div className=" m-2 flex flex-grow items-start justify-center overflow-x-auto">
          {isShowFlowchart &&
          pseudo &&
          checkPseudocodeSyntax(pseudo) === 'Cú pháp hợp lệ.' ? (
            <FlowchartStatic pseudo={pseudo} />
          ) : (
            isShowFlowchart &&
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

export default PreviewFlowchart;
