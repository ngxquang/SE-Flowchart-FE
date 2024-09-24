import {
  ConditionNode,
  EndNode,
  FlowNode,
  InputNode,
  OutputNode,
  ProcessNode,
  StartNode,
  TempNode,
  WhileNode
} from '@/types';

export function parsePseudoCode(pseudoCode: string): FlowNode[] {
  const flowNodes: FlowNode[] = [];
  const lines = pseudoCode
    .trim()
    .split('\n')
    .map((line) => line.trim());

  const variableRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
  const processRegex = /^([a-zA-Z][a-zA-Z0-9]*)\s*=\s*(.+)$/;
  const inputRegex = /^INPUT\s+(.+)$/;
  const outputRegex = /^OUTPUT\s+(.+)$/;
  const whileRegex = /^WHILE\s+(.+)\s+DO$/;
  const endwhileRegex = /^ENDWHILE$/;
  const ifRegex = /^IF\s+(.+)\s+DO$/;
  const elseRegex = /^ELSE$/;
  const endifRegex = /^ENDIF$/;

  const stack: FlowNode[][] = [flowNodes]; // Stack để xử lý các khối lệnh lồng nhau

  if (lines[0] === 'BEGIN') flowNodes.push(new StartNode());

  lines.forEach((line) => {
    if (line.startsWith('INPUT')) {
      const variables =
        line
          .match(inputRegex)?.[1]
          .split(',')
          .map((v) => v.trim()) || [];
      stack[stack.length - 1].push(new InputNode(variables));
    } else if (line.startsWith('OUTPUT')) {
      const variables =
        line
          .match(outputRegex)?.[1]
          .split(',')
          .map((v) => v.trim()) || [];
      stack[stack.length - 1].push(new OutputNode(variables));
    } else if (processRegex.test(line)) {
      const [, variable, formulaOrValue] = line.match(processRegex) || [];
      stack[stack.length - 1].push(new ProcessNode(variable, formulaOrValue));
    } else if (line.startsWith('WHILE')) {
      const condition = line.match(whileRegex)?.[1].trim();
      if (condition) {
        const whileNode = new WhileNode(condition, []);
        stack[stack.length - 1].push(whileNode);
        stack.push(whileNode.body); // Bắt đầu khối WHILE, thêm body của nó vào stack
      }
    } else if (line.startsWith('ENDWHILE')) {
      stack.pop(); // Kết thúc khối WHILE, pop khỏi stack
    } else if (line.startsWith('IF')) {
      const condition = line.match(ifRegex)?.[1].trim();
      if (condition) {
        const trueBranch: FlowNode[] = [];
        const falseBranch: FlowNode[] = [];
        const conditionNode = new ConditionNode(
          condition,
          trueBranch,
          falseBranch
        );
        stack[stack.length - 1].push(conditionNode);
        stack.push(trueBranch); // Bắt đầu khối IF, thêm trueBranch vào stack
      }
    } else if (line.startsWith('ELSE')) {
      stack.pop(); // Kết thúc trueBranch, pop khỏi stack
      const falseBranch = stack[stack.length - 1].find(
        (node) => node instanceof ConditionNode
      )?.falseBranch;
      if (falseBranch) {
        stack.push(falseBranch); // Thêm falseBranch vào stack
      }
    } else if (line.startsWith('ENDIF')) {
      stack.pop(); // Kết thúc khối IF, pop khỏi stack
      stack[stack.length - 1].push(new TempNode());
    }
  });

  if (lines[lines.length - 1] === 'END') flowNodes.push(new EndNode());
  console.log('🚀 ~ parsePseudoCode ~ flowNodes:', flowNodes);

  return flowNodes;
}
