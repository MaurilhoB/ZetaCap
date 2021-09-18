import React, { useCallback, useContext, createContext, useMemo } from "react"

import useStorageState from "../hooks/useStorageState"

import { DefaultTheme, ThemeProvider } from "styled-components"

import light from "../styles/themes/light"
import dark from "../styles/themes/dark"

interface IAppThemeContextData {
  currentTheme: DefaultTheme
  toggleTheme(): void
}

const AppTheme = createContext<IAppThemeContextData>({} as IAppThemeContextData)

const AppThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useStorageState("@ZetaCap:theme", "light")

  const currentTheme = useMemo(() => (theme === "light" ? dark : light), [
    theme
  ])

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [setTheme, theme])

  return (
    <AppTheme.Provider value={{ toggleTheme, currentTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </AppTheme.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(AppTheme)

  if (!context) {
    throw new Error("Context should be used inside the Provider")
  }

  return context
}

export default AppThemeProvider
