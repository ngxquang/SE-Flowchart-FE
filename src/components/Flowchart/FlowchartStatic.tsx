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

  const configurer = new FlowchartConfigurer();
  configurer.setRectangleSizes(150, 45);
  configurer.setArrowSizes(5, 10);
  configurer.setLineSizes(25, 25);
  configurer.setCircleRadius(10);
  configurer.setFontInfo('14px sans-serif', 'black');

  useEffect(() => {
    const flowchart = parsePseudoCode(pseudo);
    const positions = new FlowchartPositions();
    positions.generatePositions(flowchart);
    setPositions(positions.getAll());

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
