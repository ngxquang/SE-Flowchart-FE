'use client'
import { HeaderEditor } from "@/components";
import { useParams } from "next/navigation";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
    const params = useParams();
    const { lesson } = params; 
  return (
    <>
      <HeaderEditor  title={lesson}/>
      {children}
    </>
  );
}
