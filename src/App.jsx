import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tourists from './pages/Tourists'
import TouristProfile from './pages/TouristProfile'
import Incidents from './pages/Incidents'
import Analytics from './pages/Analytics'
import Admin from './pages/Admin'
import { useAuth } from './context/AuthContext'

function Protected({ children, roles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/tourists"
        element={
          <Protected>
            <Tourists />
          </Protected>
        }
      />
      <Route
        path="/tourists/:id"
        element={
          <Protected>
            <TouristProfile />
          </Protected>
        }
      />
      <Route
        path="/incidents"
        element={
          <Protected>
            <Incidents />
          </Protected>
        }
      />
      <Route
        path="/analytics"
        element={
          <Protected roles={['Admin', 'Tourism', 'Police']}>
            <Analytics />
          </Protected>
        }
      />
      <Route
        path="/admin"
        element={
          <Protected roles={['Admin']}>
            <Admin />
          </Protected>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
