import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <div className="flex items-center justify-between p-3 bg-white border-b">
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold">Gov - Travo</div>
        <div className="text-sm text-gray-500">Smart Tourist Safety</div>
      </div>
      <div className="flex items-center gap-4">
        <select className="border rounded px-2 py-1">
          <option>English</option>
          <option>हिन्दी</option>
        </select>
        {user && (
          <div className="flex items-center gap-3">
            <div className="text-sm">{user.username} ({user.role})</div>
            <button onClick={logout} className="text-sm px-3 py-1 bg-red-500 text-white rounded">Logout</button>
          </div>
        )}
      </div>
    </div>
  )
}
