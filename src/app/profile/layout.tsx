'use client';
import { classNames, HeaderNormal } from '@/components';

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={classNames("flex flex-col justify-center items-center")}>
      <HeaderNormal />
      {children}
    </div>
  );
}