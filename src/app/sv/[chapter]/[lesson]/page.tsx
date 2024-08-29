'use client'

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function LessonDetail() {
  const params = useParams();
  const { chapter, lesson } = params;

  return (
    <div>
      <h1>Bài học {lesson} trong chương {chapter}</h1>
      
      <Link href={`/sv/${chapter}/${lesson}/flowchart`}>
        Xem Flowchart
      </Link>
    </div>
  );
}
