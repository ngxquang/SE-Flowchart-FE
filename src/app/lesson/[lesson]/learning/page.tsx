'use client';

import Image from 'next/image';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { PreviewAssignment, PreviewFlowchart } from '@/components';
import { useContext, useEffect, useState } from 'react';
import { useGetLessons } from '@/hooks';
import { LessonContext } from '@/contexts';

const LearningScreen = () => {
  const { setMarkdown, setPseudo } = useContext(LessonContext);
  const { data, error, isLoading } = useGetLessons();

  const [isShowAssignment, setIsShowAssignment] = useState(false);

  const handleCollapseOrExpandAssignment = () => {
    setIsShowAssignment(!isShowAssignment);
  };

  useEffect(() => {
    if (isLoading) setMarkdown('...loading...');
    if (data) {
      const markdown = data.data[0].description;
      const flowChart = data.data[0].flowChart;
      setMarkdown(markdown);
      setPseudo(flowChart);
    }
  }, [data]);

  return (
    <main className="overflow-hidden">
      <div className="h-dvh w-full px-2 py-2">
        {!isShowAssignment ? (
          // Full Preview / Non-resizable Preview
          <div className="flex h-full flex-row gap-2">
            <div
              className="flex h-full w-8 items-center justify-center rounded-xl border border-outline bg-primary-container"
              onClick={handleCollapseOrExpandAssignment}
            >
              <Image
                alt="right-icon"
                src={'/icons/right.svg'}
                width={5}
                height={10}
                className="select-none"
              />
            </div>
            <PreviewFlowchart />
          </div>
        ) : (
          // Resizale Preview
          <PanelGroup
            autoSaveId="example"
            direction="horizontal"
            className="w-full"
          >
            {/* Left panel */}
            <Panel minSize={20} maxSize={50} defaultSize={50} className=" ">
              {/* Non-resizale */}
              <div className="flex h-full w-full flex-col gap-2">
                <PreviewAssignment
                  onCollapse={handleCollapseOrExpandAssignment}
                />
              </div>
            </Panel>
            <PanelResizeHandle className="w-2" />
            {/* Right panel */}
            <Panel defaultSize={50} className="">
              <PreviewFlowchart />
            </Panel>
          </PanelGroup>
        )}
      </div>
    </main>
  );
};

export default LearningScreen;
