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
