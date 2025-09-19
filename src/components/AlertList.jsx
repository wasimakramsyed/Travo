import React from 'react'

export default function AlertList({ alerts = [] }) {
  return (
    <div className="w-80 border-l p-3 bg-white">
      <h3 className="font-semibold mb-2">Recent Alerts</h3>
      <ul className="space-y-2">
        {alerts.map(a => (
          <li key={a.id} className="p-2 border rounded">
            <div className="text-sm font-medium">{a.type} - {a.status}</div>
            <div className="text-xs text-gray-500">{new Date(a.time).toLocaleString()}</div>
            <div className="text-xs">Loc: {a.location.lat.toFixed(3)}, {a.location.lng.toFixed(3)}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
