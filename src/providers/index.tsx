import React from 'react';
import AppPreferencesProvider from './preferences';
import AppThemeProvider from './theme';

const AppProvider: React.FC = ({ children }) => (
  <AppThemeProvider>
    <AppPreferencesProvider>{children}</AppPreferencesProvider>
  </AppThemeProvider>
);

export default AppProvider;
