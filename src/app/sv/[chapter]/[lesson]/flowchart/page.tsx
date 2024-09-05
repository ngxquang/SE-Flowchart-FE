"use client";

import { classNames } from "@/components";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Flowchart() {
  const params = useParams();
  const { chapter, lesson } = params;

  return (
    <div className="underline rounded font-bold text-3xl px-1">
      <h1 className=" underline rounded font-bold text-3xl px-1 ">
        Flowchart cho Bài học {lesson} trong Chương {chapter}
      </h1>
      <Image src={"/images/favicon.ico"} alt="logo" width={100} height={100} />
      {/* Nội dung hoặc hiển thị flowchart cho bài học */}
    </div>
  );
}
