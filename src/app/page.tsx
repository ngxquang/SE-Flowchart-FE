'use client';

import { useContext } from 'react';
import { AppContext } from '@/contexts';
import { classNames } from '@/components';
import Search from '@/components/Search/Search';

export default function Home() {
  const { state, setState } = useContext(AppContext);

  return (
    <main>
      <Search/>
      <p>{state}</p>
      <button className="" onClick={() => setState('world')}>
        change
      </button>
      <p className="font-lato text-6xl font-bold ">Hello</p>
    </main>
  );
}
