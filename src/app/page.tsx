'use client';

import { useContext } from 'react';
import { AppContext } from '@/contexts';
import { classNames } from '@/components';

export default function Home() {
  const { state, setState } = useContext(AppContext);

  return (
    <main
      className={classNames(
        'min-w-screen  relative flex flex-col items-center justify-center px-4 py-1'
      )}
    >
      <p>{state}</p>
      <button className="" onClick={() => setState('world')}>
        change
      </button>
      <p className="font-lato text-6xl font-bold ">Hello</p>
    </main>
  );
}