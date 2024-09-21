import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';
import {
  generateContents,
  generateSteps,
  parsePseudoCode,
  setNodeColor
} from '@/helpers';
import {
  ContentPair,
  Flowchart,
  FlowchartConfigurer,
  FlowchartDynamicHandle,
  FlowchartDynamicProps,
  FlowchartPositions,
  FlowNode,
  IFlowchartPosition
} from '@/types';

const FlowchartDynamic = forwardRef<
  FlowchartDynamicHandle,
  FlowchartDynamicProps
>(({ pseudo }, ref) => {
  const [drawer, setDrawer] = useState<Flowchart>();
  const [positions, setPositions] = useState<IFlowchartPosition[][]>([]);
  const [flowchart, setFlowchart] = useState<FlowNode[]>([]);
  const [step, setStep] = useState<number>(-1);
  const [steps, setSteps] = useState<string[]>([]);
  const [contents, setContents] = useState<ContentPair[]>([]);

  const configurer = new FlowchartConfigurer();
  configurer.setRectangleSizes(150, 45);
  configurer.setArrowSizes(5, 10);
  configurer.setLineSizes(25, 25);
  configurer.setCircleRadius(10);
  configurer.setFontInfo('14px sans-serif', 'black');

  useEffect(() => {
    const flowchart = parsePseudoCode(pseudo);
    setFlowchart(flowchart);
    const input = { x: 3, n: 4 };
    generateSteps(flowchart, input).then((steps) => setSteps(steps));
    generateContents(flowchart, input).then((contents) => {
      setContents(contents);
      console.log('🚀 ~ useEffect ~ contents:', contents);
    });

    const positions = new FlowchartPositions();
    positions.generatePositions(flowchart);
    setPositions(positions.getAll());

    const drawer = new Flowchart(
      positions.getAll(),
      configurer.getAll(),
      'myCanvas'
    );
    setDrawer(drawer);

    drawer.generateShapes(flowchart);
    drawer.generateLines(flowchart);
    drawer.drawAllText('Đúng');
    drawer.drawAllText('Sai');
  }, [pseudo]);

  useEffect(() => {
    if (step >= steps.length) {
      setStep(-1);
      return;
    }
    const currFlowchart = flowchart;
    const newFlowchart = setNodeColor(currFlowchart, steps[step], '#fafa');
    drawer?.generateShapes(newFlowchart);
  }, [step]);

  useImperativeHandle(
    ref,
    () => ({
      next() {
        setStep((prev) => prev + 1);
      },
      prev() {
        setStep((prev) => prev - 1);
      }
    }),
    []
  );

  return (
    <canvas
      style={{
        width: positions[0]?.length > 3 ? '-webkit-fill-available' : ''
      }}
      id="myCanvas"
      className=""
    ></canvas>
  );
});

export default FlowchartDynamic;
