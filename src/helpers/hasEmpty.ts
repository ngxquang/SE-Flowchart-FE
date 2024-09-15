import { ConditionNode, FlowNode, WhileNode } from '@/types';

const hasEmpty = (
  flowchart: FlowNode[],
  state: { hasEmpty: boolean }
): void => {
  flowchart.forEach((node) => {
    if (node instanceof ConditionNode) {
      if (node.trueBranch.length === 0) {
        state.hasEmpty = true;
        return;
      }
      hasEmpty(node.trueBranch, state);
      hasEmpty(node.falseBranch, state);
      return;
    }
    if (node instanceof WhileNode) {
      if (node.body.length === 0) {
        state.hasEmpty = true;
        return;
      }
      hasEmpty(node.body, state);
      return;
    }
  });
};

export const hasEmptyArray = (flowchart: FlowNode[]): boolean => {
  const state = { hasEmpty: false };
  hasEmpty(flowchart, state);
  return state.hasEmpty;
};
