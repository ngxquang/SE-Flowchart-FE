import { parsePseudoCode, hasEmptyArray } from '@/helpers';
import {
  Flowchart,
  FlowchartConfigurer,
  FlowchartPositions,
  FlowchartProps
} from '@/types';
import React, { useEffect } from 'react';

const FlowchartStatic = ({ pseudo }: FlowchartProps) => {
  const configurer = new FlowchartConfigurer();
  configurer.setRectangleSizes(150, 50);
  configurer.setArrowSizes(5, 10);
  configurer.setLineSizes(50, 50);
  configurer.setCircleRadius(10);
  configurer.setFontInfo('18px sans-serif', 'black');

  useEffect(() => {
    const flowchart = parsePseudoCode(pseudo);
    if (hasEmptyArray(flowchart)) return;
    const positions = new FlowchartPositions();
    positions.generatePositions(flowchart);

    const drawer = new Flowchart(
      positions.getAll(),
      configurer.getAll(),
      'myCanvas'
    );

    drawer.generateShapes(flowchart);
    drawer.generateLines(flowchart);
    drawer.drawAllText('Đúng');
    drawer.drawAllText('Sai');
  }, [pseudo]);

  return <canvas id="myCanvas" className=""></canvas>;
};

export default FlowchartStatic;
