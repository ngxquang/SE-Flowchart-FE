'use client';

import Image from 'next/image';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { EBAssignment, EBPseudo, Preview } from '@/components';
import { useContext, useEffect, useState } from 'react';
import { useGetLesson, useGetLessons } from '@/hooks';
import { LessonContext } from '@/contexts';
import { useParams } from 'next/navigation';

export default function LessonDetail() {
  const params = useParams();
  const { lesson } = params;
  const lessonIdParam = Number(lesson)
  
  const [isShowAssignment, setIsShowAssignment] = useState(false);
  const [isShowPseudo, setIsShowPseudo] = useState(false);

  const { markdown, setMarkdown } = useContext(LessonContext);
  const { data, error, isLoading } = useGetLesson(lessonIdParam);
  
  useEffect(() => {
    if (isLoading) setMarkdown('...loading...');
    if (data) {
      const initData = data.data.description;
      setMarkdown(initData);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setIsShowAssignment(true);
      setIsShowPseudo(true);
    }
  }, [data]);

  // useEffect(() => {
  //   if (markdown) {
  //     let newMark = markdown;
  //     if (typeof newMark === 'string') {
  //       newMark = newMark.replace(/\\/g, '\\\\');
  //     }
  //   }
  // }, [markdown]);

  const handleCollapseOrExpandDe = () => {
    setIsShowAssignment(!isShowAssignment);
  };

  const handldeCollapseOrExpandPseudo = () => {
    setIsShowPseudo(!isShowPseudo);
  };

  const handldeShowAll = () => {
    setIsShowAssignment(!isShowAssignment);
    setIsShowPseudo(!isShowPseudo);
  };

  return (
    <main className="overflow-hidden">
      <div className="h-dvh w-full px-2 py-2">
        {!isShowAssignment && !isShowPseudo ? (
          // Full Preview / Non-resizable Preview
          <div className="flex h-full flex-row gap-2">
            <div
              className="flex h-full w-8 items-center justify-center rounded-xl border border-outline bg-primary-container"
              onClick={handldeShowAll}
            >
              <Image
                alt="right-icon"
                src={'/icons/right.svg'}
                width={5}
                height={10}
                className="select-none"
              />
            </div>
            <Preview />
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
              {isShowAssignment && isShowPseudo ? (
                // Resizale
                <PanelGroup
                  autoSaveId="example2"
                  direction="vertical"
                  className="w-full"
                >
                  {/* Top-left panel */}
                  <Panel
                    minSize={20}
                    maxSize={80}
                    defaultSize={50}
                    className=""
                  >
                    <EBAssignment onCollapse={handleCollapseOrExpandDe} />
                  </Panel>
                  <PanelResizeHandle className="h-2 bg-on-primary" />
                  {/* Bottom-left panel */}
                  <Panel defaultSize={50} className="">
                    <EBPseudo onCollapse={handldeCollapseOrExpandPseudo} />
                  </Panel>
                </PanelGroup>
              ) : (
                // Non-resizale
                <div className="flex h-full w-full flex-col gap-2">
                  {/* Top-left */}
                  {isShowAssignment ? (
                    <EBAssignment onCollapse={handleCollapseOrExpandDe} />
                  ) : (
                    <div
                      className="flex h-8 w-full items-center justify-center rounded-xl border border-outline bg-primary-container"
                      onClick={handleCollapseOrExpandDe}
                    >
                      <Image
                        alt="dropdown-icon"
                        src={'/icons/down.svg'}
                        width={10}
                        height={5}
                        className="select-none"
                      />
                    </div>
                  )}
                  {/* Bottom-left */}
                  {isShowPseudo ? (
                    <EBPseudo onCollapse={handldeCollapseOrExpandPseudo} />
                  ) : (
                    <div
                      className="flex h-8 w-full items-center justify-center rounded-xl border border-outline bg-primary-container"
                      onClick={handldeCollapseOrExpandPseudo}
                    >
                      <Image
                        alt="dropdown-icon"
                        src={'/icons/down.svg'}
                        width={10}
                        height={5}
                        className="select-none"
                      />
                    </div>
                  )}
                </div>
              )}
            </Panel>
            <PanelResizeHandle className="w-2" />
            {/* Right panel */}
            <Panel defaultSize={50} className="">
              <Preview />
            </Panel>
          </PanelGroup>
        )}
      </div>
    </main>
  );
}
