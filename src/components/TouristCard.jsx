import React from 'react'
import { Link } from 'react-router-dom'

export default function TouristCard({ t }) {
  return (
    <div className="p-3 border rounded flex justify-between items-center">
      <div>
        <div className="font-semibold">{t.name}</div>
        <div className="text-sm text-gray-500">{t.id} • {t.idType}</div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-sm">{t.status}</div>
        <Link to={`/tourists/${t.id}`} className="text-xs text-blue-600 mt-2">View Profile</Link>
      </div>
    </div>
  )
}
