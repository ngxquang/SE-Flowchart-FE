import { NodeType } from '@/enums';
import {
  ConditionNode,
  FlowNode,
  IFlowchartConfig,
  IFlowchartPosition,
  WhileNode
} from '.';
import { FlowchartCanvas } from './FlowchartCanvas';

export class Flowchart {
  private elements: { [key: string]: { x: number; y: number; title: string } } =
    {};
  private initialX: number = 5;
  private initialY: number = 5;
  private context: FlowchartCanvas;
  private config: IFlowchartConfig;

  constructor(
    positions: IFlowchartPosition[][],
    config: IFlowchartConfig,
    canvasID: string
  ) {
    this.config = config;

    // allow top and bottom branching
    const initialY = this.initialY + config.lineHeight / 2;

    for (var i = 0; i < positions.length; i++) {
      const y = initialY + i * (config.rectangleHeight + config.lineHeight);
      for (var j = 0; j < positions[i].length; j++) {
        if (positions[i][j].title !== '') {
          const x =
            this.initialX + j * (config.rectangleWidth + config.lineWidth);
          this.elements[positions[i][j].id] = {
            x: x,
            y: y,
            title: positions[i][j].title
          };
        }
      }
    }

    const canvasWidth =
      this.initialX * 2 +
      positions[0].length * (config.rectangleWidth + config.lineWidth + 20) -
      config.lineWidth;
    const canvasHeight =
      initialY * 2 +
      positions.length * (config.rectangleHeight + config.lineHeight) -
      config.lineHeight;
    this.context = new FlowchartCanvas(
      canvasID,
      canvasWidth,
      canvasHeight,
      config
    );
  }

  private lineHorizontalVerticalHorizontal(
    from: string,
    to: string,
    color: string,
    offsetFrom: number,
    offsetTo: number,
    offsetX: number,
    isLeftArrow: boolean,
    isLeftDirection: boolean
  ) {
    let offset1 = isLeftArrow ? this.config.rectangleWidth : 0;
    let diff =
      this.elements[from].y +
      offsetFrom * this.config.rectangleHeight -
      this.elements[to].y -
      offsetTo * this.config.rectangleHeight;
    let intermediateX = 0;
    if (isLeftDirection) {
      intermediateX = this.elements[from].x - offsetX * this.config.lineWidth;
      console.log(intermediateX);
      this.context.drawHorizontalLine(
        this.elements[from].x,
        this.elements[from].y + this.config.rectangleHeight * offsetFrom,
        -(offsetX * this.config.lineWidth),
        color
      );
    } else {
      intermediateX =
        this.elements[from].x +
        this.config.rectangleWidth +
        offsetX * this.config.lineWidth;
      this.context.drawHorizontalLine(
        this.elements[from].x + this.config.rectangleWidth,
        this.elements[from].y + this.config.rectangleHeight * offsetFrom,
        offsetX * this.config.lineWidth,
        color
      );
    }
    this.context.drawVerticalLine(
      intermediateX,
      this.elements[to].y + this.config.rectangleHeight * offsetTo,
      diff,
      color
    );
    this.context.drawHorizontalLine(
      intermediateX,
      this.elements[to].y + this.config.rectangleHeight * offsetTo,
      this.elements[to].x + offset1 - intermediateX,
      color
    );
    if (isLeftArrow) {
      this.context.drawLeftArrow(
        this.elements[to].x + offset1,
        this.elements[to].y + this.config.rectangleHeight * offsetTo,
        color
      );
    } else {
      this.context.drawRightArrow(
        this.elements[to].x,
        this.elements[to].y + this.config.rectangleHeight * offsetTo,
        color
      );
    }
  }

  private lineHorizontalVerticalHorizontalForIf(
    from: string,
    to: string,
    color: string,
    offsetFrom: number,
    offsetTo: number,
    offsetX: number,
    isLeftArrow: boolean,
    isLeftDirection: boolean
  ) {
    let radius = this.config.circleRadius;
    let lineDiff = this.config.rectangleWidth / 2 / radius - 1;
    let offset1 = isLeftArrow ? this.config.rectangleWidth : 0;
    let diff =
      this.elements[from].y +
      offsetFrom * this.config.rectangleHeight -
      this.elements[to].y -
      offsetTo * this.config.rectangleHeight;
    let intermediateX = 0;
    if (isLeftDirection) {
      intermediateX = this.elements[from].x - offsetX * this.config.lineWidth;
      console.log(intermediateX);
      this.context.drawHorizontalLine(
        this.elements[from].x,
        this.elements[from].y + this.config.rectangleHeight * offsetFrom,
        -(offsetX * this.config.lineWidth),
        color
      );
    } else {
      intermediateX =
        this.elements[from].x +
        this.config.rectangleWidth +
        offsetX * this.config.lineWidth;
      this.context.drawHorizontalLine(
        this.elements[from].x + this.config.rectangleWidth,
        this.elements[from].y + this.config.rectangleHeight * offsetFrom,
        offsetX * this.config.lineWidth,
        color
      );
    }
    this.context.drawVerticalLine(
      intermediateX,
      this.elements[to].y + this.config.rectangleHeight * offsetTo,
      diff,
      color
    );
    this.context.drawHorizontalLine(
      intermediateX,
      this.elements[to].y + this.config.rectangleHeight * offsetTo,
      this.elements[to].x + offset1 - intermediateX + lineDiff * radius,
      color
    );
    if (isLeftArrow) {
      this.context.drawLeftArrow(
        this.elements[to].x + offset1,
        this.elements[to].y + this.config.rectangleHeight * offsetTo,
        color
      );
    } else {
      this.context.drawRightArrow(
        this.elements[to].x + lineDiff * radius,
        this.elements[to].y + this.config.rectangleHeight * offsetTo,
        color
      );
    }
  }

  private lineVerticalHorizontalVertical(
    from: string,
    to: string,
    color: string,
    offsetFrom: number,
    offsetTo: number,
    offsetY: number,
    isTopArrow: boolean,
    isTopDirection: boolean
  ) {
    let sourceX =
      this.elements[from].x + offsetFrom * this.config.rectangleWidth;
    let sourceY =
      this.elements[from].y +
      (isTopDirection ? 0 : this.config.rectangleHeight);
    let destinationX =
      this.elements[to].x + offsetTo * this.config.rectangleWidth;
    let destinationY =
      this.elements[to].y + (!isTopArrow ? 0 : this.config.rectangleHeight);
    this.context.drawVerticalLine(sourceX, sourceY, -offsetY, color);
    this.context.drawHorizontalLine(
      sourceX,
      sourceY - offsetY,
      destinationX - sourceX,
      color
    );
    this.context.drawVerticalLine(
      destinationX,
      destinationY,
      sourceY - offsetY - destinationY,
      color
    );
    if (isTopArrow) {
      this.context.drawTopArrow(destinationX, destinationY, color);
    } else {
      this.context.drawBottomArrow(destinationX, destinationY, color);
    }
  }

  private lineHorizontalVertical(
    from: string,
    to: string,
    color: string,
    offsetFrom: number,
    offsetTo: number,
    isTopArrow: boolean,
    isLeftDirection: boolean
  ) {
    let offset1 = isTopArrow ? this.config.rectangleHeight : 0;
    let offset2 = isLeftDirection ? 0 : this.config.rectangleWidth;
    let ydiff =
      this.elements[from].y +
      offsetFrom * this.config.rectangleHeight -
      this.elements[to].y -
      offset1;
    let xdiff =
      this.elements[to].x -
      this.elements[from].x +
      offsetTo * this.config.rectangleWidth -
      offset2;
    this.context.drawHorizontalLine(
      this.elements[from].x + offset2,
      this.elements[from].y + this.config.rectangleHeight * offsetFrom,
      xdiff,
      color
    );
    this.context.drawVerticalLine(
      this.elements[to].x + offsetTo * this.config.rectangleWidth,
      this.elements[to].y + offset1,
      ydiff,
      color
    );
    if (isTopArrow) {
      this.context.drawTopArrow(
        this.elements[to].x + offsetTo * this.config.rectangleWidth,
        this.elements[to].y + offset1,
        color
      );
    } else {
      this.context.drawBottomArrow(
        this.elements[to].x + offsetTo * this.config.rectangleWidth,
        this.elements[to].y,
        color
      );
    }
  }

  private lineVerticalHorizontal(
    from: string,
    to: string,
    color: string,
    offsetFrom: number,
    offsetTo: number,
    isLeftArrow: boolean,
    isTopDirection: boolean
  ) {
    let ydiff =
      this.elements[to].y -
      this.elements[from].y +
      offsetTo * this.config.rectangleHeight -
      (isTopDirection ? 0 : this.config.rectangleHeight);
    let xdiff =
      this.elements[to].x -
      this.elements[from].x -
      offsetFrom * this.config.rectangleWidth +
      (isLeftArrow ? this.config.rectangleWidth : 0);
    var offset1 = isLeftArrow ? this.config.rectangleWidth : 0;
    let offset2 =
      this.elements[from].x + offsetFrom * this.config.rectangleWidth;
    this.context.drawVerticalLine(
      offset2,
      this.elements[from].y +
        (isTopDirection ? 0 : this.config.rectangleHeight),
      ydiff,
      color
    );
    this.context.drawHorizontalLine(
      offset2,
      this.elements[from].y +
        ydiff +
        (isTopDirection ? 0 : this.config.rectangleHeight),
      xdiff,
      color
    );
    if (isLeftArrow) {
      this.context.drawLeftArrow(
        this.elements[to].x + (isLeftArrow ? this.config.rectangleWidth : 0),
        this.elements[to].y + this.config.rectangleHeight * offsetTo,
        color
      );
    } else {
      this.context.drawRightArrow(
        this.elements[to].x + offset1,
        this.elements[to].y + this.config.rectangleHeight * offsetTo,
        color
      );
    }
  }

  private lineVerticalHorizontalForIf(
    from: string,
    to: string,
    color: string,
    offsetFrom: number,
    offsetTo: number,
    isLeftArrow: boolean,
    isTopDirection: boolean
  ) {
    let radius = this.config.circleRadius;
    let lineDiff = this.config.rectangleWidth / 2 / radius - 1;
    let ydiff =
      this.elements[to].y -
      this.elements[from].y +
      offsetTo * this.config.rectangleHeight -
      (isTopDirection ? 0 : this.config.rectangleHeight);
    let xdiff =
      this.elements[to].x -
      this.elements[from].x -
      offsetFrom * this.config.rectangleWidth +
      (isLeftArrow ? this.config.rectangleWidth : 0);
    var offset1 = isLeftArrow ? this.config.rectangleWidth : 0;
    let offset2 =
      this.elements[from].x + offsetFrom * this.config.rectangleWidth;
    this.context.drawVerticalLine(
      offset2,
      this.elements[from].y +
        (isTopDirection ? 0 : this.config.rectangleHeight),
      ydiff,
      color
    );
    this.context.drawHorizontalLine(
      offset2,
      this.elements[from].y +
        ydiff +
        (isTopDirection ? 0 : this.config.rectangleHeight),
      isLeftArrow ? xdiff - lineDiff * radius : xdiff + lineDiff * radius,
      color
    );
    if (isLeftArrow) {
      this.context.drawLeftArrow(
        this.elements[to].x +
          (isLeftArrow ? this.config.rectangleWidth : 0) -
          lineDiff * radius,
        this.elements[to].y + this.config.rectangleHeight * offsetTo,
        color
      );
    } else {
      this.context.drawRightArrow(
        this.elements[to].x + offset1 + lineDiff * radius,
        this.elements[to].y + this.config.rectangleHeight * offsetTo,
        color
      );
    }
  }

  rectangle(id: string, color: string) {
    this.context.drawRectangle(this.elements[id].x, this.elements[id].y, color);
    this.context.drawText(
      this.elements[id].title,
      this.elements[id].x + this.config.rectangleWidth / 2,
      this.elements[id].y + this.config.rectangleHeight / 2,
      this.config.rectangleWidth
    );
  }

  text(id: string, color: string, offset: number = 0.2) {
    this.context.drawText(
      this.elements[id].title,
      this.elements[id].x + this.config.rectangleWidth / 2,
      this.elements[id].y + this.config.rectangleHeight * offset,
      this.config.rectangleWidth
    );
  }

  lineRightLeft(from: string, to: string, color: string, offset: number = 0.5) {
    let diff =
      this.elements[to].x - this.elements[from].x - this.config.rectangleWidth;
    this.context.drawHorizontalLine(
      this.elements[from].x + this.config.rectangleWidth,
      this.elements[from].y + this.config.rectangleHeight * offset,
      diff,
      color
    );
    this.context.drawRightArrow(
      this.elements[to].x,
      this.elements[to].y + this.config.rectangleHeight * offset,
      color
    );
  }

  lineLeftRight(from: string, to: string, color: string, offset: number = 0.5) {
    let diff =
      this.elements[from].x - this.elements[to].x - this.config.rectangleWidth;
    this.context.drawHorizontalLine(
      this.elements[to].x + this.config.rectangleWidth,
      this.elements[to].y + this.config.rectangleHeight * offset,
      diff,
      color
    );
    this.context.drawLeftArrow(
      this.elements[to].x + this.config.rectangleWidth,
      this.elements[to].y + this.config.rectangleHeight * offset,
      color
    );
  }

  lineTopBottom(from: string, to: string, color: string, offset: number = 0.5) {
    let diff =
      this.elements[from].y - this.elements[to].y - this.config.rectangleHeight;
    this.context.drawVerticalLine(
      this.elements[from].x + this.config.rectangleWidth * offset,
      this.elements[from].y,
      -diff,
      color
    );
    this.context.drawTopArrow(
      this.elements[to].x + this.config.rectangleWidth * offset,
      this.elements[to].y + this.config.rectangleHeight,
      color
    );
  }

  lineBottomTop(from: string, to: string, color: string, offset: number = 0.5) {
    let diff =
      this.elements[to].y - this.elements[from].y - this.config.rectangleHeight;
    this.context.drawVerticalLine(
      this.elements[to].x + this.config.rectangleWidth * offset,
      this.elements[to].y,
      -diff,
      color
    );
    this.context.drawBottomArrow(
      this.elements[to].x + this.config.rectangleWidth * offset,
      this.elements[to].y,
      color
    );
  }

  lineLeftLineLeft(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5,
    offsetX: number = 0.5
  ) {
    this.lineHorizontalVerticalHorizontal(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      offsetX,
      false,
      true
    );
  }

  lineLeftLineLeftForIf(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5,
    offsetX: number = 0.5
  ) {
    this.lineHorizontalVerticalHorizontalForIf(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      offsetX,
      false,
      true
    );
  }

  lineLeftLineRight(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5,
    offsetX: number = 0.5
  ) {
    this.lineHorizontalVerticalHorizontal(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      offsetX,
      true,
      true
    );
  }

  lineLeftLineTop(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5
  ) {
    this.lineHorizontalVertical(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      false,
      true
    );
  }

  lineLeftLineBottom(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5
  ) {
    this.lineHorizontalVertical(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      true,
      true
    );
  }

  lineRightLineLeft(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5,
    offsetX: number = 0.5
  ) {
    this.lineHorizontalVerticalHorizontal(
      from,
      to,
      color,
      offsetTo,
      offsetFrom,
      offsetX,
      false,
      false
    );
  }

  lineRightLineRight(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5,
    offsetX: number = 0.5
  ) {
    this.lineHorizontalVerticalHorizontal(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      offsetX,
      true,
      false
    );
  }

  lineRightLineTop(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5
  ) {
    this.lineHorizontalVertical(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      false,
      false
    );
  }

  lineRightLineBottom(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5
  ) {
    this.lineHorizontalVertical(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      true,
      false
    );
  }

  lineTopLineLeft(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5
  ) {
    this.lineVerticalHorizontal(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      false,
      true
    );
  }

  lineTopLineRight(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5
  ) {
    this.lineVerticalHorizontal(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      true,
      true
    );
  }

  lineTopLineTop(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5,
    offsetY: number = 0.5
  ) {
    let finalOffset =
      this.elements[to].y >= this.elements[from].y
        ? this.config.lineHeight * offsetY
        : this.elements[from].y -
          this.elements[to].y +
          this.config.lineHeight * offsetY;
    this.lineVerticalHorizontalVertical(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      finalOffset,
      false,
      true
    );
  }

  lineTopLineBottom(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5,
    offsetY: number = 0.5
  ) {
    let finalOffset =
      this.elements[to].y <= this.elements[from].y
        ? this.config.lineHeight * offsetY
        : this.elements[from].y -
          this.elements[to].y +
          this.config.rectangleHeight +
          this.config.lineHeight * offsetY;
    this.lineVerticalHorizontalVertical(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      finalOffset,
      true,
      true
    );
  }

  lineBottomLineLeft(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5
  ) {
    this.lineVerticalHorizontal(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      false,
      false
    );
  }

  lineBottomLineLeftForIf(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5
  ) {
    this.lineVerticalHorizontalForIf(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      false,
      false
    );
  }

  lineBottomLineRight(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5
  ) {
    this.lineVerticalHorizontal(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      true,
      false
    );
  }

  lineBottomLineRightForIf(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5
  ) {
    this.lineVerticalHorizontalForIf(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      true,
      false
    );
  }

  lineBottomLineTop(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5,
    offsetY: number = 0.5
  ) {
    let finalOffset = -(this.elements[to].y >= this.elements[from].y
      ? this.config.lineHeight * offsetY
      : this.elements[from].y -
        this.elements[to].y +
        this.config.lineHeight * offsetY);
    this.lineVerticalHorizontalVertical(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      finalOffset,
      false,
      false
    );
  }

  lineBottomLineBottom(
    from: string,
    to: string,
    color: string,
    offsetFrom: number = 0.5,
    offsetTo: number = 0.5,
    offsetY: number = 0.5
  ) {
    let finalOffset = -(this.elements[to].y >= this.elements[from].y
      ? this.config.lineHeight * offsetY +
        (this.elements[to].y - this.elements[from].y)
      : this.config.lineHeight * offsetY);
    this.lineVerticalHorizontalVertical(
      from,
      to,
      color,
      offsetFrom,
      offsetTo,
      finalOffset,
      true,
      false
    );
  }

  getDriver() {
    return this.context.getDriver();
  }

  //!Custom
  parallelogram(id: string, color: string) {
    const x = this.elements[id].x;
    const y = this.elements[id].y;
    const title = this.elements[id].title;
    this.context.drawParallelogram(x, y, color);
    this.context.drawText(
      title,
      x + this.config.rectangleWidth / 2,
      y + this.config.rectangleHeight / 2,
      this.config.rectangleWidth
    );
  }

  oval(id: string, color: string) {
    const x = this.elements[id].x;
    const y = this.elements[id].y;
    const title = this.elements[id].title;
    this.context.drawOval(x, y, color);
    this.context.drawText(
      title,
      x + this.config.rectangleWidth / 2,
      y + this.config.rectangleHeight / 2,
      this.config.rectangleWidth
    );
  }

  circle(id: string, color: string) {
    const x = this.elements[id].x;
    const y = this.elements[id].y;

    const width = this.config.rectangleWidth;
    const height = this.config.rectangleHeight;
    const radius = this.config.circleRadius;

    let lineDiff = this.config.rectangleHeight / 2 / radius - 1;

    this.context.drawCircle(x, y, color);
    this.context.drawVerticalLine(
      x + width / 2,
      y + height / 2 + radius,
      lineDiff * radius,
      'black'
    );
  }

  diamond(id: string, color: string) {
    const x = this.elements[id].x;
    const y = this.elements[id].y;
    const title = this.elements[id].title;
    this.context.drawDiamond(x, y, color);
    this.context.drawText(
      title,
      x + this.config.rectangleWidth / 2,
      y + this.config.rectangleHeight / 2,
      this.config.rectangleWidth
    );
  }

  drawAllText(title: string) {
    const filteredElements = Object.values(this.elements).filter(
      (element) => element.title === title
    );

    let offset = 0.2;

    filteredElements.map((element) =>
      this.context.drawText(
        element.title,
        element.x + this.config.rectangleWidth / 2,
        element.y + this.config.rectangleHeight * offset,
        this.config.rectangleWidth
      )
    );
  }

  //* generate
  generateShapes(flowchart: FlowNode[]) {
    flowchart.forEach((node: FlowNode) => {
      const id = node.id;
      switch (node.type) {
        case NodeType.Oval:
          this.oval(id, '#f5f5f5');
          break;
        case NodeType.Parallelogram:
          this.parallelogram(id, '#f5f5f5');
          break;
        case NodeType.Rectangle:
          this.rectangle(id, '#f5f5f5');
          break;
        case NodeType.Diamond:
          this.diamond(id, '#f5f5f5');
          if (node instanceof ConditionNode) {
            this.generateShapes(node.trueBranch);
            this.generateShapes(node.falseBranch);
          }
          break;
        case NodeType.WhileLoop:
          this.diamond(id, '#f5f5f5');
          if (node instanceof WhileNode) this.generateShapes(node.body);
          break;
        case NodeType.Temp:
          this.circle(id, '#f5f5f5');
          break;
        default:
          console.warn(`Unhandled node type: ${node.type}`);
          break;
      }
    });
  }

  generateLines(flowchart: FlowNode[]) {
    this.generateNodelineNode(flowchart[0], null, flowchart);
  }

  private generateNodelineNode(
    currNode: FlowNode,
    prevNode: FlowNode | null,
    flowchart: FlowNode[]
  ) {
    const id = currNode.id;

    switch (currNode.type) {
      case NodeType.Oval:
      case NodeType.Parallelogram:
      case NodeType.Rectangle:
        if (
          prevNode &&
          !(prevNode instanceof WhileNode || prevNode instanceof ConditionNode)
        )
          this.lineBottomTop(prevNode.id, id, 'black');
        if (prevNode instanceof WhileNode)
          this.lineLeftLineTop(prevNode.id, id, 'black');
        break;
      case NodeType.Diamond:
        if (prevNode && !(prevNode instanceof WhileNode))
          this.lineBottomTop(prevNode.id, id, 'black');
        if (prevNode instanceof WhileNode)
          this.lineLeftLineTop(prevNode.id, id, 'black');
        if (currNode instanceof ConditionNode) {
          this.lineRightLineTop(id, currNode.trueBranch[0].id, 'black');
          if (currNode.falseBranch.length > 0)
            this.lineLeftLineTop(id, currNode.falseBranch[0].id, 'black');

          this.generateNodelineNode(
            currNode.trueBranch[0],
            null,
            currNode.trueBranch
          );
          if (currNode.falseBranch.length > 0)
            this.generateNodelineNode(
              currNode.falseBranch[0],
              null,
              currNode.falseBranch
            );
        }
        break;
      case NodeType.WhileLoop:
        if (prevNode && !(prevNode instanceof WhileNode))
          this.lineBottomTop(prevNode.id, id, 'black');
        if (currNode instanceof WhileNode) {
          this.lineRightLineTop(id, currNode.body[0].id, 'black');
          this.lineLeftLineBottom(
            currNode.body[currNode.body.length - 1].id,
            id,
            'black'
          );
          this.generateNodelineNode(currNode.body[0], null, currNode.body);
        }
        break;
      case NodeType.Temp:
        if (prevNode && prevNode instanceof ConditionNode) {
          this.lineBottomLineRightForIf(
            prevNode.trueBranch[prevNode.trueBranch.length - 1].id,
            id,
            'black'
          );
          if (prevNode.falseBranch.length > 0) {
            this.lineBottomLineLeftForIf(
              prevNode.falseBranch[prevNode.falseBranch.length - 1].id,
              id,
              'black'
            );
            break;
          }
          this.lineLeftLineLeftForIf(prevNode.id, id, 'black', 0.5, 0.5, 2.5);
        }
        break;
      default:
        console.warn(`Unhandled node type: ${currNode.type}`);
        break;
    }

    const index = flowchart.indexOf(currNode);

    if (index + 1 < flowchart.length) {
      this.generateNodelineNode(flowchart[index + 1], currNode, flowchart);
    }
  }
}
