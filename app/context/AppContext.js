/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [appContext, setAppContext] = useState({
    isLoadingStartApp: true,
    isLoading: false
  });

  useEffect(
    () => () => {
      setAppContext({ ...appContext, isLoadingStartApp: true });
    },
    []
  );

  return <AppContext.Provider value={[appContext, setAppContext]}>{children}</AppContext.Provider>;
};
