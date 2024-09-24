'use client';
import { HeaderEditor } from '@/components';
import { LessonProvider } from '@/providers';
import { useParams } from 'next/navigation';

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const { lesson } = params;
  return (
    <LessonProvider>
      <HeaderEditor title={lesson} />
      {children}
    </LessonProvider>
  );
}
