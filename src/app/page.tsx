'use client'

import { useContext } from "react";
import { AppContext } from "@/contexts";

export default function Home() {
  const { state, setState } = useContext(AppContext);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{state}</p>
      <button className=""
        onClick={() => setState("world")}>change</button>
      <p className="font-lato font-bold text-6xl">Hello</p>
    </main>
  );
}
