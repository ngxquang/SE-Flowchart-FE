import {
  ConditionNode,
  FlowNode,
  InputNode,
  TempNode,
  WhileNode
} from '@/types';

export async function generateSteps(
  flowchart: FlowNode[],
  inputs: Record<string, number>
): Promise<string[]> {
  const steps: string[] = [];
  const variables: Record<string, number> = {}; // Initialize an empty record for variables

  async function executeNode(node: FlowNode) {
    if (node instanceof TempNode) {
      return;
    } else if (node instanceof InputNode) {
      steps.push(node.id);
      node.execute(variables, inputs);
    } else if (node instanceof WhileNode) {
      while (
        eval(
          node.condition.replace(/[a-zA-Z]+/g, (match) =>
            String(variables[match] || 0)
          )
        )
      ) {
        steps.push(node.id);
        for (const bodyNode of node.body) {
          await executeNode(bodyNode);
        }
      }
      steps.push(node.id);
    } else if (node instanceof ConditionNode) {
      steps.push(node.id);
      const conditionResult = eval(
        node.condition.replace(/[a-zA-Z]+/g, (match) =>
          String(variables[match] || 0)
        )
      );

      const branchToExecute = conditionResult
        ? node.trueBranch
        : node.falseBranch;
      for (const branchNode of branchToExecute) {
        await executeNode(branchNode);
      }
    } else {
      steps.push(node.id);
      node.execute(variables);
    }
  }

  for (const node of flowchart) {
    await executeNode(node);
  }

  return steps;
}
