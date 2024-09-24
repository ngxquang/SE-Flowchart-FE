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
  // step: lưu vị trí hiện tại
  const [step, setStep] = useState<number>(-1);
  // steps: mảng chứa id của các FlowNode tương ứng, sắp xếp thứ tự thực thi theo input
  const [steps, setSteps] = useState<string[]>([]);
  // currContents: mảng chứa nội dung của các FlowNode tương ứng, sắp xếp thứ tự thực thi theo input
  const [currContents, setCurrContents] = useState<ContentPair[]>([]);

  const prevStepRef = useRef<number>(step);
  const { inputMode, setInputMode, contents, setContents, inputs, setInputs } =
    useContext(LessonContext) as LessonContextType;

  // Điều chỉnh kích thức các khối, mũi tên
  const configurer = new FlowchartConfigurer();
  configurer.setRectangleSizes(150, 45);
  configurer.setArrowSizes(5, 10);
  configurer.setLineSizes(25, 25);
  configurer.setCircleRadius(10);
  configurer.setFontInfo('14px sans-serif', 'black');

  useEffect(() => {
    // parse từ mã giả sang cấu trúc FlowNode
    const flowchart = parsePseudoCode(pseudo);
    setFlowchart(flowchart);
    const input = { x: 3, n: 4 };
    // tạo steps và contents ban đầu với input mẫu
    generateSteps(flowchart, input).then((steps) => setSteps(steps));
    generateContents(flowchart, input).then((contents) => {
      setCurrContents(contents);
      console.log('🚀 ~ useEffect ~ contents:', contents);
    });
    // truyền contents cho chạy từng bước
    setContents([]);

    // Tương tác với canvas vẽ các khối
    const positions = new FlowchartPositions();
    positions.generatePositions(flowchart);
    setPositions(positions.getAll());
    const drawer = new Flowchart(
      positions.getAll(),
      configurer.getAll(),
      'myCanvas'
    );
    setDrawer(drawer);

    // Vẽ khối
    drawer.generateShapes(flowchart);
    // Vẽ các mũi tên
    drawer.generateLines(flowchart);
    // Vẽ text
    drawer.drawAllText('Đúng');
    drawer.drawAllText('Sai');
  }, [pseudo]);

  useEffect(() => {
    const prevStep = prevStepRef.current;

    // nếu đang nhập
    if (inputMode === true) {
      if (step > prevStep) {
        setStep(prevStep);
        return;
      } else if (step < prevStep) {
        // thoát khỏi sự kiện nhập
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

    // nếu hoàn thành bài -> reset
    if (step >= steps.length || step < -1) {
      setStep(-1);
      setContents([]);
      setInputs({});
      return;
    }

    const currNode = flowchart.find((node) => node.id === steps[step]);

    // nếu node hiện tại là InputNode
    if (currNode instanceof InputNode) {
      setInputMode(true); // Activate input mode
      if (step > prevStep) {
        // Thêm số lượng input tương ứng thông qua hàm parseInput
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
      // render lại lưu đồ
      const currFlowchart = [...flowchart];
      const newFlowchart = setNodeColor(currFlowchart, steps[step], '#fafa');
      drawer?.generateShapes(newFlowchart);

      prevStepRef.current = step;
      return;
    }

    // xử lý các node thông thường
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

    // render lại flowchart
    const currFlowchart = [...flowchart];
    const newFlowchart = setNodeColor(currFlowchart, steps[step], '#fafa');
    drawer?.generateShapes(newFlowchart);

    prevStepRef.current = step;
  }, [step, currContents]);

  // Bắt sự kiện inputs thay đổi để tạo contents và steps mới
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
