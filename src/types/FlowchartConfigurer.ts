import { IFlowchartConfig } from '.';

export class FlowchartConfigurer {
  private config: IFlowchartConfig;

  constructor() {
    this.config = {
      rectangleWidth: 0,
      rectangleHeight: 0,
      arrowWidth: 0,
      arrowHeight: 0,
      lineWidth: 0,
      lineHeight: 0,
      circleRadius: 0,
      fontFamily: '',
      fontColor: ''
    };
  }

  setRectangleSizes(width: number, height: number) {
    this.config.rectangleWidth = width;
    this.config.rectangleHeight = height;
  }

  setArrowSizes(width: number, height: number) {
    this.config.arrowWidth = width;
    this.config.arrowHeight = height;
  }

  setLineSizes(width: number, height: number) {
    this.config.lineWidth = width;
    this.config.lineHeight = height;
  }

  setFontInfo(family: string, color: string) {
    this.config.fontFamily = family;
    this.config.fontColor = color;
  }
  setCircleRadius(radius: number) {
    this.config.circleRadius = radius;
  }

  getAll() {
    if (
      !this.config.hasOwnProperty('rectangleWidth') ||
      !this.config.hasOwnProperty('arrowWidth') ||
      !this.config.hasOwnProperty('lineWidth') ||
      !this.config.hasOwnProperty('fontFamily') ||
      !this.config.hasOwnProperty('circleRadius')
    ) {
      throw 'Flowchart: using all setters is mandatory';
    }
    return this.config;
  }
}
