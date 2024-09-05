import Link from 'next/link';

export default function List() {
  const chapters = [
    { id: 1, title: 'Chương 1' },
    { id: 2, title: 'Chương 2' }
  ];

  return (
    <div>
      <h1>Danh sách chương</h1>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <Link href={`/sv/${chapter.id}`}>{chapter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
