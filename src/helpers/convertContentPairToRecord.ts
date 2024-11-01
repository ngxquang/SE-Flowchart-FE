import { ContentPair } from '@/types';

export function convertContentPairToRecord(
  contents: ContentPair[]
): Record<string, number> {
  return contents.reduce(
    (acc: Record<string, number>, content: ContentPair) => {
      acc[content.left] = Number(content.right); // Chuyển giá trị từ 'right' sang number
      return acc;
    },
    {}
  );
}

// const contents: ContentPair[] = [
//   { left: 'a', right: '5', type: NodeType.SomeType },
//   { left: 'b', right: '10', type: NodeType.SomeType }
// ];

// const result = convertContentPairToRecord(contents);

// {
//   a: 5,
//   b: 10
// }
