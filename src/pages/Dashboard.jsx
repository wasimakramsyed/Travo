import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import MapView from '../components/MapView'
import AlertList from '../components/AlertList'
import { fetchTourists, fetchAlerts, fetchAnalytics } from '../api/mockApi'

export default function Dashboard() {
  const [tourists, setTourists] = useState([])
  const [alerts, setAlerts] = useState([])
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    fetchTourists().then(setTourists)
    fetchAlerts().then(setAlerts)
    fetchAnalytics().then(setAnalytics)
  }, [])

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col">
        <Navbar />
        <div className="p-4 flex gap-4">
          <div className="flex-1">
            <MapView tourists={tourists} alerts={alerts} />
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="p-3 bg-white border rounded">
                <div className="text-sm text-gray-500">Active Tourists</div>
                <div className="text-2xl font-semibold">{tourists.filter(t => t.status === 'Active').length}</div>
              </div>
              <div className="p-3 bg-white border rounded">
                <div className="text-sm text-gray-500">Active Incidents</div>
                <div className="text-2xl font-semibold">{alerts.filter(a => a.status !== 'Closed').length}</div>
              </div>
              <div className="p-3 bg-white border rounded">
                <div className="text-sm text-gray-500">High Risk Zones</div>
                <div className="text-2xl font-semibold">{analytics ? analytics.highRiskZones.length : 0}</div>
              </div>
            </div>
          </div>
          <AlertList alerts={alerts} />
        </div>
      </div>
    </div>
  )
}
