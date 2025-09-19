import React from 'react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Dashboard' },
  { to: '/tourists', label: 'Tourists' },
  { to: '/incidents', label: 'Incidents' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/admin', label: 'Admin' }
]

export default function Sidebar() {
  return (
    <div className="w-60 bg-gray-50 border-r min-h-screen p-4">
      <nav className="flex flex-col gap-2">
        {items.map(i => (
          <NavLink
            key={i.to}
            to={i.to}
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'bg-blue-100 font-semibold' : 'text-gray-700'}`
            }
          >
            {i.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
