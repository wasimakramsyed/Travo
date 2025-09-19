import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { fetchTourists } from '../api/mockApi'
import TouristCard from '../components/TouristCard'

export default function Tourists() {
  const [tourists, setTourists] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => {
    fetchTourists().then(setTourists)
  }, [])

  const filtered = tourists.filter(t => t.id.toLowerCase().includes(q.toLowerCase()) || t.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col">
        <Navbar />
        <div className="p-6">
          <div className="mb-4 flex gap-2">
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by ID or name" className="border p-2 flex-1 rounded" />
          </div>
          <div className="grid gap-3">
            {filtered.map(t => <TouristCard key={t.id} t={t} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
