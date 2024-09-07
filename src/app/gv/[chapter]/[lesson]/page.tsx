'use client';

import Image from 'next/image';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { EBAssignment, EBPseudo, Preview } from '@/components';
import { useState } from 'react';

export default function LessonDetail() {
  const [isShowAssignment, setIsShowAssignment] = useState(false);
  const [isShowPseudo, setIsShowPseudo] = useState(false);

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
    <main className="overflow-hidden pt-[41px]">
      <div className="h-dvh w-full px-2 py-2">
        {!isShowAssignment && !isShowPseudo ? (
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
          <PanelGroup
            autoSaveId="example"
            direction="horizontal"
            className="w-full"
          >
            <Panel minSize={20} maxSize={50} defaultSize={50} className=" ">
              {isShowAssignment && isShowPseudo ? (
                <PanelGroup
                  autoSaveId="example2"
                  direction="vertical"
                  className="w-full"
                >
                  <Panel
                    minSize={20}
                    maxSize={80}
                    defaultSize={50}
                    className=""
                  >
                    <EBAssignment onCollapse={handleCollapseOrExpandDe} />
                  </Panel>
                  <PanelResizeHandle className="h-2 bg-on-primary" />
                  <Panel defaultSize={50} className="">
                    <EBPseudo onCollapse={handldeCollapseOrExpandPseudo} />
                  </Panel>
                </PanelGroup>
              ) : (
                <div className="flex h-full w-full flex-col gap-2">
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
            <Panel defaultSize={50} className="">
              <Preview />
            </Panel>
          </PanelGroup>
        )}
      </div>
    </main>
  );
}
