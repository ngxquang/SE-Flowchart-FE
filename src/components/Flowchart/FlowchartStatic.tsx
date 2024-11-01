'use client';

import {
  arrowSizes,
  circleRadius,
  fontInfo,
  lineSizes,
  rectangleSizes
} from '@/constants';
import { parsePseudoCode } from '@/helpers';
import {
  Flowchart,
  FlowchartConfigurer,
  FlowchartPositions,
  FlowchartProps,
  IFlowchartPosition
} from '@/types';
import React, { useEffect, useState } from 'react';

const FlowchartStatic = ({ pseudo }: FlowchartProps) => {
  const [positions, setPositions] = useState<IFlowchartPosition[][]>([]);

  // Điều chỉnh kích thức các khối, mũi tên
  const configurer = new FlowchartConfigurer();
  configurer.setRectangleSizes(rectangleSizes.width, rectangleSizes.height);
  configurer.setArrowSizes(arrowSizes.width, arrowSizes.height);
  configurer.setLineSizes(lineSizes.width, lineSizes.height);
  configurer.setCircleRadius(circleRadius);
  configurer.setFontInfo(fontInfo.family, fontInfo.color);

  useEffect(() => {
    // parse từ mã giả sang cấu trúc FlowNode
    const flowchart = parsePseudoCode(pseudo);
    // Xác định vị trí của các khối
    const positions = new FlowchartPositions();
    positions.generatePositions(flowchart);
    setPositions(positions.getAll());

    // Tương tác với canvas vẽ các khối
    const drawer = new Flowchart(
      positions.getAll(),
      configurer.getAll(),
      'myCanvas'
    );
    // Vẽ khối
    drawer.generateShapes(flowchart);
    // Vẽ các mũi tên
    drawer.generateLines(flowchart);
    // Vẽ text
    drawer.drawAllText('Đúng');
    drawer.drawAllText('Sai');
  }, [pseudo]);

  return (
    <canvas
      style={{
        width: positions[0]?.length > 3 ? '-webkit-fill-available' : ''
      }}
      id="myCanvas"
      className=""
    ></canvas>
  );
};

export default FlowchartStatic;
