import { NodeType } from '@/enums';
import { ContentPair } from '@/types';

export const parseInput = (input: ContentPair): ContentPair[] => {
  const variables = input.left
    .replace('Nhập', '')
    .split(',')
    .map((v) => v.trim());

  return variables.map((variable) => ({
    left: variable,
    right: '', // Initialize the 'right' value as empty
    type: NodeType.Parallelogram
  }));
};
