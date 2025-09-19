import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  function login({ username, password }) {
    // Mock role assignment based on username
    const mapping = {
      police: 'Police',
      tourism: 'Tourism',
      admin: 'Admin'
    }
    const role = mapping[username] || 'Tourism'
    const mockUser = { username, role }
    setUser(mockUser)
    // role-based redirect
    if (role === 'Police') navigate('/incidents')
    else if (role === 'Tourism') navigate('/tourists')
    else navigate('/admin')
  }

  function logout() {
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}