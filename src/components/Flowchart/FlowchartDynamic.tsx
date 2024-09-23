import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import {
  generateContents,
  generateSteps,
  parseInput,
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
  IFlowchartPosition,
  InputNode
} from '@/types';
import { LessonContext } from '@/contexts';

type LessonContextType = {
  inputMode: boolean;
  setInputMode: (value: boolean) => void;
  contents: ContentPair[];
  setContents: (value: ContentPair[]) => void;
  inputs: Record<string, number>;
  setInputs: (value: Record<string, number>) => void;
};

const FlowchartDynamic = forwardRef<
  FlowchartDynamicHandle,
  FlowchartDynamicProps
>(({ pseudo }, ref) => {
  const [drawer, setDrawer] = useState<Flowchart>();
  const [positions, setPositions] = useState<IFlowchartPosition[][]>([]);
  const [flowchart, setFlowchart] = useState<FlowNode[]>([]);
  const [step, setStep] = useState<number>(-1);
  const [steps, setSteps] = useState<string[]>([]);
  const [currContents, setCurrContents] = useState<ContentPair[]>([]);

  const prevStepRef = useRef<number>(step);
  const { inputMode, setInputMode, contents, setContents, inputs, setInputs } =
    useContext(LessonContext) as LessonContextType;

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
      setCurrContents(contents);
      console.log('🚀 ~ useEffect ~ contents:', contents);
    });
    setContents([]);

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
    const prevStep = prevStepRef.current;

    if (inputMode === true) {
      if (step > prevStep) {
        setStep(prevStep);
        return;
      } else if (step < prevStep) {
        setInputMode(false);
        let newContents = [...contents];
        const content = parseInput(currContents[step + 1]);
        newContents = newContents.filter(
          (ct) => !content.some((c) => c.left === ct.left)
        );
        setContents(newContents);

        const currFlowchart = [...flowchart];
        const newFlowchart = setNodeColor(currFlowchart, steps[step], '#fafa');
        drawer?.generateShapes(newFlowchart);

        prevStepRef.current = step;
        return;
      }
    }

    if (step === prevStep) return;

    if (step >= steps.length || step < -1) {
      setStep(-1);
      setContents([]);
      setInputs({});
      return;
    }

    const currNode = flowchart.find((node) => node.id === steps[step]);

    if (currNode instanceof InputNode) {
      setInputMode(true); // Activate input mode
      if (step > prevStep) {
        const newContents = [...contents];
        const content = parseInput(currContents[step]);
        newContents.push(...content);
        setContents(newContents);
      } else if (step < prevStep) {
        const newContents = [...contents];
        newContents.pop();
        setContents(newContents);
      }
      console.log('🚀 ~ useEffect ~ contents:', contents);
      const currFlowchart = [...flowchart];
      const newFlowchart = setNodeColor(currFlowchart, steps[step], '#fafa');
      drawer?.generateShapes(newFlowchart);

      prevStepRef.current = step;
      return;
    }

    if (step > prevStep) {
      const newContents = [...contents];
      const content = currContents[step];
      newContents.push(content);
      setContents(newContents);
    } else if (step < prevStep) {
      const newContents = [...contents];
      console.log('🚀 ~ useEffect ~ ddnewContents:', newContents);
      newContents.pop();
      setContents(newContents);
    }
    console.log('🚀 ~ useEffect ~ contents:', contents);

    const currFlowchart = [...flowchart];
    const newFlowchart = setNodeColor(currFlowchart, steps[step], '#fafa');
    drawer?.generateShapes(newFlowchart);

    prevStepRef.current = step;
  }, [step, currContents]);

  useEffect(() => {
    if (inputs) {
      generateSteps(flowchart, inputs).then((steps) => setSteps(steps));
      generateContents(flowchart, inputs).then((contents) => {
        setCurrContents(contents);
        console.log('🚀 ~ useEffect ~ contents:', contents);
      });
    }
  }, [inputs]);

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
