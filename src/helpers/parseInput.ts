import { NodeType } from '@/enums';
import { ContentPair } from '@/types';

export const parseInput = (input: ContentPair): ContentPair[] => {
  const parsedValues = JSON.parse(input.right); // Parse the JSON string

  return Object.keys(parsedValues).map((key) => {
    return {
      left: key,
      right: '',
      type: NodeType.Parallelogram
    };
  });
};
