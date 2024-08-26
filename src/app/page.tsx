'use client'

import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { increment, decrement, incrementByAmount } from "@/redux/features/counterSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";

export default function Home() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{count}</div>
      <button
        className="bg-blue-300 rounded px-3 py-3"
        onClick={() => dispatch(increment())}>Increment</button>
      <button
        className="bg-green-300 rounded px-3 py-3"
        onClick={() => dispatch(decrement())}>Decrement</button>
      <button
        className="bg-red-300 rounded px-3 py-3"
        onClick={() => dispatch(incrementByAmount(2))}>Increment by 2</button>
    </main>
  );
}
