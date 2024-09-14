import { NodeType } from '@/enums';
import { ConditionNode, FlowNode, IFlowchartPosition, WhileNode } from '.';
import { heightNode } from '@/helpers';

export class FlowchartPositions {
  private positions: IFlowchartPosition[][];

  constructor() {
    this.positions = [];
  }

  addRow(elements: IFlowchartPosition[]) {
    if (
      this.positions.length > 0 &&
      this.positions[this.positions.length - 1].length != elements.length
    ) {
      throw 'Each row must have same columns number';
    }
    this.positions.push(elements);
  }

  private insertColumnnRight(index: number) {
    const newColumnValue = { id: '', title: '' }; // value to insert in the new column

    this.positions.forEach((row) => {
      row.splice(index + 1, 0, newColumnValue);
    });
  }

  private insertColumnnLeft(index: number) {
    const newColumnValue = { id: '', title: '' }; // value to insert in the new column

    if (index === 0) {
      this.positions = this.positions.map((row) => [newColumnValue, ...row]);
      return;
    }

    this.insertColumnnRight(index - 1);
  }

  getAll() {
    if (this.positions.length == 0) {
      throw 'Flowchart: at least one row is mandatory';
    }
    return this.positions;
  }

  generatePositions(flowchart: FlowNode[]) {
    this.generateNode(flowchart[0], 0, 0, flowchart);
  }

  private generateUniqueID(): string {
    return `${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  private generateNode(
    node: FlowNode,
    posX: number,
    posY: number,
    flowchart: FlowNode[]
  ) {
    const label = node.content;
    console.log('🚀 ~ FlowchartPositionsv2 ~ label:', label);
    const id = node.id;
    switch (node.type) {
      case NodeType.Oval:
      case NodeType.Rectangle:
      case NodeType.Parallelogram:
      case NodeType.Temp:
        if (this.positions.length - 1 < posX) {
          const newColumnValue = { id: '', title: '' };
          const numberOfColumns =
            this.positions.length > 0 ? this.positions[0].length : 1;
          const emptyElements = new Array(numberOfColumns).fill(newColumnValue);
          this.addRow(emptyElements);
        }
        this.positions[posX][posY] = { id: id, title: label };
        break;
      case NodeType.Diamond:
        if (this.positions.length - 1 < posX) {
          const newColumnValue = { id: '', title: '' };

          const numberOfColumns =
            this.positions.length > 0 ? this.positions[0].length : 1;
          const emptyElements = new Array(numberOfColumns).fill(newColumnValue);
          this.addRow(emptyElements);
        }
        this.positions[posX][posY] = { id: id, title: label };

        const firstCondition = flowchart.find(
          (node) => node.type === NodeType.Diamond
        );

        const newY = id === firstCondition?.id ? posY + 1 : posY;

        if (id === firstCondition?.id) {
          this.insertColumnnLeft(posY);
          this.insertColumnnRight(newY);
        }

        this.positions[posX][newY + 1] = {
          id: this.generateUniqueID(),
          title: 'Đúng'
        };
        this.positions[posX][newY - 1] = {
          id: this.generateUniqueID(),
          title: 'Sai'
        };

        if (node instanceof ConditionNode) {
          this.generateNode(
            node.trueBranch[0],
            posX + 1,
            newY + 1,
            node.trueBranch
          );
          if (node.falseBranch.length > 0)
            this.generateNode(
              node.falseBranch[0],
              posX + 1,
              newY - 1,
              node.falseBranch
            );
        }
        break;

      case NodeType.WhileLoop:
        if (this.positions.length - 1 < posX) {
          const newColumnValue = { id: '', title: '' };

          const numberOfColumns =
            this.positions.length > 0 ? this.positions[0].length : 1;
          const emptyElements = new Array(numberOfColumns).fill(newColumnValue);
          this.addRow(emptyElements);
        }
        this.positions[posX][posY] = { id: id, title: label };

        this.insertColumnnLeft(posY);
        const newPosY = posY + 1;
        this.insertColumnnRight(newPosY);

        this.positions[posX][newPosY + 1].title = 'Đúng';
        this.positions[posX][newPosY + 1].id = this.generateUniqueID();

        this.positions[posX][newPosY - 1].title = 'Sai';
        this.positions[posX][newPosY - 1].id = this.generateUniqueID();

        if (node instanceof WhileNode)
          // Xử lý nhánh lặp
          this.generateNode(node.body[0], posX + 1, newPosY + 1, node.body);

        break;
      default:
        console.warn(`Unhandled node type: ${node.type}`);
        break;
    }

    const index = flowchart.indexOf(node);

    if (index + 1 < flowchart.length) {
      if (node instanceof ConditionNode) {
        const firstCondition = flowchart.find(
          (node) => node.type === NodeType.Diamond
        );
        const newPosX = posX + heightNode(node, flowchart) - 1;

        const newPosY = id === firstCondition?.id ? posY + 1 : posY;
        this.generateNode(flowchart[index + 1], newPosX, newPosY, flowchart);
        return;
      }
      this.generateNode(flowchart[index + 1], posX + 1, posY, flowchart);
    }
  }
}
