import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { fetchTourists, fetchAlerts } from '../api/mockApi'

export default function TouristProfile() {
  const { id } = useParams()
  const [tourist, setTourist] = useState(null)
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    fetchTourists().then(list => setTourist(list.find(t => t.id === id)))
    fetchAlerts().then(setAlerts)
  }, [id])

  if (!tourist) return <div className="flex"><Sidebar /><div className="flex-1"><Navbar /><div className="p-6">Loading...</div></div></div>

  const history = alerts.filter(a => a.touristId === id)

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col">
        <Navbar />
        <div className="p-6">
          <div className="p-4 bg-white border rounded">
            <div className="text-xl font-semibold">{tourist.name}</div>
            <div className="text-sm text-gray-500">{tourist.id} • {tourist.idType}</div>
            <div className="mt-2">Contacts: {tourist.contacts}</div>
            <div className="mt-2">Status: {tourist.status}</div>
            <div className="mt-4">
              <button className="px-3 py-2 bg-blue-600 text-white rounded">View Alert History ({history.length})</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
