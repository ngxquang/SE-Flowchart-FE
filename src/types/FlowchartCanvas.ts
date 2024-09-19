import { IFlowchartConfig } from '.';

export class FlowchartCanvas {
  private config: IFlowchartConfig;
  private ctx: CanvasRenderingContext2D;

  constructor(
    canvasID: string,
    canvasWidth: number,
    canvasHeight: number,
    config: IFlowchartConfig
  ) {
    this.config = config;

    var c = document.getElementById(canvasID) as HTMLCanvasElement | null;
    if (!c || !(c instanceof HTMLCanvasElement)) {
      throw new Error(
        `Canvas element with ID ${canvasID} not found or is not a canvas element.`
      );
    }
    c.width = canvasWidth;
    c.height = canvasHeight;

    const context = c.getContext('2d');
    if (context) {
      this.ctx = context;
      this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    } else {
      throw new Error('Failed to get 2D context for the canvas.');
    }
  }

  drawRectangle(x: number, y: number, color: string) {
    this.ctx.lineWidth = 1;
    this.ctx.rect(
      x,
      y,
      this.config.rectangleWidth,
      this.config.rectangleHeight
    );
    this.ctx.fillStyle = color;
    this.ctx.strokeRect(
      x,
      y,
      this.config.rectangleWidth,
      this.config.rectangleHeight
    );
    this.ctx.fillRect(
      x,
      y,
      this.config.rectangleWidth,
      this.config.rectangleHeight
    );
  }

  drawText(text: string, x: number, y: number, width: number, color?: string) {
    this.ctx.font = this.config.fontFamily;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = color ? color : this.config.fontColor;
    this.ctx.fillText(text, x, y, width);
  }

  private drawLine(movex: number, movey: number, x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(movex, movey);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  drawHorizontalLine(x: number, y: number, xMove: number, color: string) {
    this.ctx.strokeStyle = color;
    this.drawLine(x, y, x + xMove, y);
    this.ctx.strokeStyle = 'black';
  }

  drawVerticalLine(x: number, y: number, yMove: number, color: string) {
    this.ctx.strokeStyle = color;
    this.drawLine(x, y, x, y + yMove);
    this.ctx.strokeStyle = 'black';
  }

  drawRightArrow(x: number, y: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x - this.config.arrowHeight, y - this.config.arrowWidth);
    this.ctx.lineTo(x - this.config.arrowHeight, y + this.config.arrowWidth);
    this.ctx.fill();
    this.ctx.fillStyle = 'black';
  }

  drawLeftArrow(x: number, y: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + this.config.arrowHeight, y - this.config.arrowWidth);
    this.ctx.lineTo(x + this.config.arrowHeight, y + this.config.arrowWidth);
    this.ctx.fill();
    this.ctx.fillStyle = 'black';
  }

  drawTopArrow(x: number, y: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x - this.config.arrowWidth, y + this.config.arrowHeight);
    this.ctx.lineTo(x + this.config.arrowWidth, y + this.config.arrowHeight);
    this.ctx.fill();
    this.ctx.fillStyle = 'black';
  }

  drawBottomArrow(x: number, y: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + this.config.arrowWidth, y - this.config.arrowHeight);
    this.ctx.lineTo(x - this.config.arrowWidth, y - this.config.arrowHeight);
    this.ctx.fill();
    this.ctx.fillStyle = 'black';
  }

  getDriver() {
    return this.ctx;
  }

  //Custom
  drawParallelogram(x: number, y: number, color: string) {
    this.ctx.lineWidth = 1;
    const width = this.config.rectangleWidth;
    const height = this.config.rectangleHeight;
    const offset = 10; // Define the horizontal offset for the slant

    this.ctx.beginPath();
    this.ctx.moveTo(x + offset / 2, y); // Top-left
    this.ctx.lineTo(x + width + offset / 2, y); // Top-right
    this.ctx.lineTo(x + width - offset / 2, y + height); // Bottom-right
    this.ctx.lineTo(x - offset / 2, y + height); // Bottom-left
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.stroke();
    this.ctx.fill();
  }

  drawOval(x: number, y: number, color: string) {
    this.ctx.lineWidth = 1;
    const width = this.config.rectangleWidth;
    const height = this.config.rectangleHeight;

    this.ctx.beginPath();
    this.ctx.ellipse(
      x + width / 2,
      y + height / 2,
      width / 2,
      height / 2,
      0,
      0,
      Math.PI * 2
    );
    this.ctx.fillStyle = color;
    this.ctx.stroke();
    this.ctx.fill();
  }

  drawCircle(x: number, y: number, color: string) {
    this.ctx.lineWidth = 1;
    const width = this.config.rectangleWidth;
    const height = this.config.rectangleHeight;
    const radius = this.config.circleRadius;

    this.ctx.beginPath();
    this.ctx.arc(
      x + width / 2,
      y + height / 2,
      radius, // Bán kính của hình tròn
      0, // Góc bắt đầu
      Math.PI * 2 // Vòng quay toàn bộ (360 độ)
    );
    this.ctx.fillStyle = color;
    this.ctx.stroke();
    this.ctx.fill();
  }

  drawDiamond(x: number, y: number, color: string) {
    this.ctx.lineWidth = 1;
    const width = this.config.rectangleWidth;
    const height = this.config.rectangleHeight;

    this.ctx.beginPath();
    this.ctx.moveTo(x + width / 2, y); // Top
    this.ctx.lineTo(x + width, y + height / 2); // Right
    this.ctx.lineTo(x + width / 2, y + height); // Bottom
    this.ctx.lineTo(x, y + height / 2); // Left
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.stroke();
    this.ctx.fill();
  }
}
