import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { fetchAlerts } from '../api/mockApi'

export default function Incidents() {
  const [alerts, setAlerts] = useState([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetchAlerts().then(setAlerts)
  }, [])

  const filtered = alerts.filter(a => filter === 'All' ? true : a.status === filter)

  function generateEFIR(a) {
    // auto-fill structure; for demo just alert JSON
    const eFir = {
      caseId: `FIR-${Date.now()}`,
      touristId: a.touristId,
      alertId: a.id,
      location: a.location,
      time: a.time,
      notes: 'Auto-filled from alert data - edit before submit'
    }
    alert('E-FIR generated (mock):\n' + JSON.stringify(eFir, null, 2))
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col">
        <Navbar />
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <select value={filter} onChange={e => setFilter(e.target.value)} className="border p-2 rounded">
                <option>All</option>
                <option>Open</option>
                <option>Investigating</option>
                <option>Closed</option>
              </select>
            </div>
          </div>
          <div className="space-y-3">
            {filtered.map(a => (
              <div key={a.id} className="p-3 border rounded flex justify-between items-center">
                <div>
                  <div className="font-semibold">{a.type} • {a.status}</div>
                  <div className="text-xs text-gray-500">{new Date(a.time).toLocaleString()}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => generateEFIR(a)} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Generate E-FIR</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
