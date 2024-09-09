import { LessonProvider } from '@/providers';

export default function LessonLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <LessonProvider>
        <header className="absolute z-10 w-full bg-primary">
          <div className="flex  max-w-[1440px] justify-between px-2 py-2">
            <span className="text-on-primary">Bài 001</span>
          </div>
        </header>
        {children}
      </LessonProvider>
    </div>
  );
}
