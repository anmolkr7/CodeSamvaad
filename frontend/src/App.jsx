import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/userContext'
import Navbar from './components/Navbar'
function App() {

  return (
    <UserProvider>
    <div className="flex flex-col h-screen">
    <Navbar />
    <div className="flex-grow overflow-hidden">
      <AppRoutes />
    </div>
    </div>
    </UserProvider>
  )
}

export default App
