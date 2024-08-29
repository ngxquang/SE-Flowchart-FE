'use client'

import { useParams } from 'next/navigation';

export default function Flowchart() {
  const params = useParams();
  const { chapter, lesson } = params;

  return (
    <div>
      <h1>Flowchart cho Bài học {lesson} trong Chương {chapter}</h1>
      {/* Nội dung hoặc hiển thị flowchart cho bài học */}
    </div>
  );
}
