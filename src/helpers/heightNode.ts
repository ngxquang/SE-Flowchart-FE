import { NodeType } from '@/enums';
import { ConditionNode, FlowNode } from '@/types';

export const heightNode = (node: FlowNode, flowchart: FlowNode[]): number => {
  const getBranchHeight = (branch: FlowNode[]): number =>
    branch.length > 0 ? heightNode(branch[0], branch) : 0;

  const nextHeight =
    flowchart.indexOf(node) + 1 < flowchart.length
      ? heightNode(flowchart[flowchart.indexOf(node) + 1], flowchart)
      : 0;

  if (node.type === NodeType.Diamond && node instanceof ConditionNode) {
    return (
      2 +
      Math.max(
        getBranchHeight(node.trueBranch),
        getBranchHeight(node.falseBranch)
      )
    );
  }

  switch (node.type) {
    case NodeType.Oval:
    case NodeType.Parallelogram:
    case NodeType.Rectangle:
    case NodeType.WhileLoop:
      return 1 + nextHeight;
    case NodeType.Temp:
      break;
    default:
      console.warn(`Unhandled node type: ${node.type}`);
      return 0;
  }
  return 0;
};
