import { Breadcrumb, HeaderNormal } from '@/components';

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderNormal />
      <Breadcrumb />
      {children}
    </>
  );
}
