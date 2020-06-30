import React from 'react'
import { Navbar } from './components'
import Routes from './routes'
import { useAuth } from './auth'

const App = () => {
  const { user } = useAuth()
  return (
    <div>
      <Navbar user={user} />
      <Routes user={user} />
    </div>
  )
}

export default App
