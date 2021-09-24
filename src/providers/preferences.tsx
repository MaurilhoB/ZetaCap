import React, { createContext, Dispatch, SetStateAction } from 'react';

import useStorageState from '../hooks/useStorageState';

interface IAppPreferencesContextData extends IPreferencesProps {
  setPreferences: Dispatch<SetStateAction<IPreferencesProps>>;
}

interface IPreferencesProps {
  currency: 'USD' | 'BRL';
}

export const AppPreferences = createContext<IAppPreferencesContextData>(
  {} as IAppPreferencesContextData,
);

const AppPreferencesProvider: React.FC = ({ children }) => {
  const [preferences, setPreferences] = useStorageState<IPreferencesProps>(
    '@ZetaCap:preferences',
    {
      currency: 'USD',
    },
  );

  return (
    <AppPreferences.Provider value={{ ...preferences, setPreferences }}>
      {children}
    </AppPreferences.Provider>
  );
};

export default AppPreferencesProvider;
