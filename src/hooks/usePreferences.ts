import { useContext } from 'react';
import { AppPreferences } from '../providers/preferences';

export const usePreferences = () => {
  const context = useContext(AppPreferences);

  if (!context) {
    throw new Error('Context should be used inside the Provider');
  }

  return context;
};

export default usePreferences;
