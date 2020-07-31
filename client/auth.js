import React, { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'

const authContext = createContext()

function useProvideAuth() {
  const [user, setUser] = useState(null)

  const logout = async () => {
    await axios.post('/auth/logout')
    setUser(null)
    window.location = '/'
  }

  const getUser = async () => {
    const res = await axios.get('/auth/me')
    setUser(res.data || null)
  }

  useEffect(() => {
    getUser()
  }, [])

  return {
    user,
    logout
  }
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}
