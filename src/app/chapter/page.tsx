import ChapterCard from '@/components/ChapterCard';
import Link from 'next/link';

export default function ChapterListScreen() {
  const chapters = [
    { id: 'chapter-1', title: 'Chương 1', content: 'Lưu đồ thuật toán' },
    {
      id: 'chapter-2',
      title: 'Chương 2',
      content: 'Hướng dẫn giải lưu đồ thuật toán'
    }
  ];

  return (
    <div className="flex flex-col justify-evenly gap-12 p-12 sm:flex-row">
      {chapters.map((chapter) => (
        <ChapterCard
          id={chapter.id}
          title={chapter.title}
          content={chapter.content}
          href={`/chapter/${chapter.id}/gv`}
        />
      ))}
    </div>
  );
}
