import React from 'react'
import './App.css'
import AuthContextProvider from './App/hooks/auth-context'
import AppRouter from './App/routes'

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>

  )
}

export default App
