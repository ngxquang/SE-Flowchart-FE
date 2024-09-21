import { ConditionNode, FlowNode, WhileNode } from '@/types';

export function setNodeColor(
  flowchart: FlowNode[],
  nodeId: string,
  color: string
): FlowNode[] {
  const newFlowchart = flowchart.map((node) => {
    if (node instanceof WhileNode) {
      node.body = setNodeColor(node.body, nodeId, color);
      if (node.id === nodeId) {
        node.color = color;
      } else {
        node.color = '#f5f5f5';
      }
      return node;
    }
    if (node instanceof ConditionNode) {
      node.trueBranch = setNodeColor(node.trueBranch, nodeId, color);
      if (node.falseBranch.length > 0)
        node.falseBranch = setNodeColor(node.falseBranch, nodeId, color);
      if (node.id === nodeId) {
        node.color = color;
      } else {
        node.color = '#f5f5f5';
      }
      return node;
    }
    if (node.id === nodeId) {
      node.color = color;
      return node;
    } else {
      node.color = '#f5f5f5';
      return node;
    }
  });

  return newFlowchart;
}
