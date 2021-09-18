import React from "react"

import Routes from "./routes"
import AppProvider from "./providers"

import GlobalStyle from "./styles/global"

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes />
      <GlobalStyle />
    </AppProvider>
  )
}

export default App
