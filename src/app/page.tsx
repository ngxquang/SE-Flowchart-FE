'use client';

import { useContext } from 'react';
import { AppContext } from '@/contexts';
import { classNames } from '@/components';
import HeaderEditor from '@/components/Header/HeaderEditor';
import HeaderNormal from '@/components/Header/HeaderNormal';

export default function Home() {
  const { state, setState } = useContext(AppContext);

  return (
    <main>
      <HeaderEditor title="Hello everybody I am Huy ye ye" />
      
      <p>{state}</p>
      <HeaderNormal/>
      <button className="" onClick={() => setState('world')}>
        change
      </button>
      <p className="font-lato text-6xl font-bold ">Hello</p>
    </main>
  );
}
