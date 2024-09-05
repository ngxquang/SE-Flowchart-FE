'use client';

import { useState } from 'react';
import AppContext from '../contexts/AppContext';

function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState('Hello ff');

  return (
    <AppContext.Provider
      value={{
        state,
        setState
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
