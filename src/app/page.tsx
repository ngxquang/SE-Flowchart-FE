'use client';

import { useContext, useEffect } from 'react';
import { AppContext } from '@/contexts';
import { classNames } from '@/components';
import { getUsers } from '@/services/api';

export default function Home() {
  const { state, setState } = useContext(AppContext);
  const handleFetchData = async () => {
    try {
      const data = await getUsers(1);
      console.log('Fetched data:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <main
      className={classNames(
        'min-w-screen relative flex flex-col items-center justify-center px-4 py-1'
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
