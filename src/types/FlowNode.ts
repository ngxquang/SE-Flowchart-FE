import { NodeType } from '@/enums';

const delayTime: number = 0;

export abstract class FlowNode {
  content: string;
  type: NodeType;
  id: string;
  color: string;

  constructor(content: string, type: NodeType) {
    this.content = content;
    this.type = type;
    this.id = this.generateUniqueID();
    this.color = '#f5f5f5';
  }

  private generateUniqueID(): string {
    return `${this.content}_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;
  }

  abstract execute(
    variables: Record<string, number>,
    inputs?: Record<string, number>
  ): void; // Phương thức trừu tượng phải được triển khai trong các lớp con
}

// Lớp con cho node "Bắt đầu"
export class StartNode extends FlowNode {
  constructor() {
    super('Bắt đầu', NodeType.Oval);
  }

  execute() {
    console.log(this.content);
  }
}

// Lớp con cho node "Kết thúc"
export class EndNode extends FlowNode {
  constructor() {
    super('Kết thúc', NodeType.Oval);
  }

  execute() {
    console.log(this.content);
  }
}

// Node khởi tạo biến
export class ProcessNode extends FlowNode {
  variable: string;
  formulaOrValue: string;

  constructor(variable: string, formulaOrValue: string) {
    super(variable + ' = ' + formulaOrValue, NodeType.Rectangle);
    this.variable = variable;
    this.formulaOrValue = formulaOrValue;
  }

  execute(variables: Record<string, number>) {
    const value = eval(
      this.formulaOrValue.replace(/[a-zA-Z]+/g, (match) =>
        String(variables[match] || 0)
      )
    );
    variables[this.variable] = value;
    console.log(`${this.variable} = ${value}`);
  }
}

// Node nhập liệu
export class InputNode extends FlowNode {
  variables: string[];

  constructor(variables: string[]) {
    super('Nhập ' + variables.join(', '), NodeType.Parallelogram);
    this.variables = variables;
  }

  execute(variables: Record<string, number>, inputs: Record<string, number>) {
    this.variables.forEach((variable) => {
      if (inputs[variable] !== undefined) {
        variables[variable] = inputs[variable];
      }
    });
    console.log(`${this.content}: ${JSON.stringify(inputs)}`);
  }
}

// Node xuất giá trị
export class OutputNode extends FlowNode {
  variables: string[];

  constructor(variables: string[]) {
    super('Xuất ' + variables.join(', '), NodeType.Parallelogram);
    this.variables = variables;
  }

  execute(variables: Record<string, number>) {
    const outputValues = this.variables.map(
      (variable) => `${variable} = ${variables[variable]?.toString()}`
    );
    console.log(`${this.content}: ${outputValues.join(', ')}`);
  }
}

// Node vòng lặp while
export class WhileNode extends FlowNode {
  condition: string;
  body: FlowNode[];

  constructor(condition: string, body: FlowNode[]) {
    super(condition, NodeType.WhileLoop);
    this.condition = condition;
    this.body = body;
  }

  async execute(variables: Record<string, number>) {
    while (
      eval(
        this.condition.replace(/[a-zA-Z]+/g, (match) =>
          String(variables[match] || 0)
        )
      )
    ) {
      console.log(this.condition);
      await delay(delayTime);
      for (const bodyNode of this.body) {
        bodyNode.execute(variables);
        await delay(delayTime);
      }
    }
  }
}

export class ConditionNode extends FlowNode {
  condition: string;
  trueBranch: FlowNode[]; // Các nút trong nhánh "Đúng"
  falseBranch: FlowNode[] | []; // Các nút trong nhánh "Sai"

  constructor(
    condition: string,
    trueBranch: FlowNode[],
    falseBranch: FlowNode[]
  ) {
    super(condition, NodeType.Diamond); // Điều kiện sẽ sử dụng hình thoi (Diamond)
    this.condition = condition;
    this.trueBranch = trueBranch;
    this.falseBranch = falseBranch;
  }

  async execute(variables: Record<string, number>) {
    const conditionResult = eval(
      this.condition.replace(/[a-zA-Z]+/g, (match) =>
        String(variables[match] || 0)
      )
    );

    console.log(`${this.content}: ${conditionResult ? 'Đúng' : 'Sai'}`);

    await delay(delayTime);

    // Thực thi nhánh tương ứng
    const branchToExecute = conditionResult
      ? this.trueBranch
      : this.falseBranch;

    for (const node of branchToExecute) {
      node.execute(variables);
      await delay(delayTime);
    }
  }
}

export class TempNode extends FlowNode {
  constructor() {
    super(' ', NodeType.Temp);
  }

  execute(
    variables: Record<string, number>,
    inputs?: Record<string, number>
  ): void {
    return;
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
