import { NodeType } from '@/enums';
import {
  ConditionNode,
  ContentPair,
  EndNode,
  FlowNode,
  InputNode,
  OutputNode,
  ProcessNode,
  StartNode,
  TempNode,
  WhileNode
} from '@/types';

export async function generateContents(
  flowchart: FlowNode[],
  inputs: Record<string, number>
): Promise<ContentPair[]> {
  const contents: ContentPair[] = [];
  const variables: Record<string, number> = {};

  async function executeNode(node: FlowNode) {
    if (node instanceof InputNode) {
      node.execute(variables, inputs);
      const content: ContentPair = {
        left: node.content,
        right: JSON.stringify(inputs),
        type: NodeType.Parallelogram
      };
      contents.push(content);
    } else if (node instanceof WhileNode) {
      while (
        eval(
          node.condition.replace(/[a-zA-Z]+/g, (match) =>
            String(variables[match] || 0)
          )
        )
      ) {
        const content: ContentPair = {
          left: node.content,
          right: 'Đúng',
          type: NodeType.Diamond
        };
        contents.push(content);
        for (const bodyNode of node.body) {
          await executeNode(bodyNode);
        }
      }
      const content: ContentPair = {
        left: node.content,
        right: 'Sai',
        type: NodeType.Diamond
      };
      contents.push(content);
    } else if (node instanceof ConditionNode) {
      const conditionResult = eval(
        node.condition.replace(/[a-zA-Z]+/g, (match) =>
          String(variables[match] || 0)
        )
      );

      const content: ContentPair = {
        left: node.content,
        right: conditionResult ? 'Đúng' : 'Sai',
        type: NodeType.Diamond
      };
      contents.push(content);

      const branchToExecute = conditionResult
        ? node.trueBranch
        : node.falseBranch;
      for (const branchNode of branchToExecute) {
        await executeNode(branchNode);
      }
    } else if (node instanceof StartNode || node instanceof EndNode) {
      const content: ContentPair = {
        left: node.content,
        right: '',
        type: NodeType.Oval
      };
      contents.push(content);
    } else if (node instanceof ProcessNode) {
      const value = eval(
        node.formulaOrValue.replace(/[a-zA-Z]+/g, (match) =>
          String(variables[match] || 0)
        )
      );
      variables[node.variable] = value;
      const content: ContentPair = {
        left: node.variable,
        right: value,
        type: NodeType.Rectangle
      };
      contents.push(content);
    } else if (node instanceof OutputNode) {
      const outputValues = node.variables.map(
        (variable) => `${variable} = ${variables[variable]?.toString()}`
      );
      const content: ContentPair = {
        left: node.content,
        right: outputValues.join(', '),
        type: NodeType.Parallelogram
      };
      contents.push(content);
    } else {
      node.execute(variables);
    }
  }

  for (const node of flowchart) {
    await executeNode(node);
  }

  return contents;
}
