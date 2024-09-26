import { NodeType } from '@/enums';
import { ContentPair } from '@/types';

export const parseInput = (input: ContentPair): ContentPair[] => {
  const variables = input.left
    .replace('Nhập', '') // Remove 'Nhập'
    .replace(/[()]/g, '') // Remove parentheses
    .split(',') // Split by commas
    .map((v) => v.trim()); // Trim each variable

  return variables.map((variable) => ({
    left: variable,
    right: '', // Initialize the 'right' value as empty
    type: NodeType.Parallelogram
  }));
};
