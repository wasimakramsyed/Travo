import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { fetchAnalytics } from '../api/mockApi'
import { TouristFlowChart, SafetyTrendChart, HighRiskBar } from '../components/ChartSection'

export default function Analytics() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetchAnalytics().then(setData)
  }, [])

  function exportCSV() {
    alert('Export CSV (mock)')
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col">
        <Navbar />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Analytics & Reports</h2>
            <div className="flex gap-2">
              <button onClick={exportCSV} className="px-3 py-1 border rounded">Export CSV</button>
              <button onClick={() => alert('Export PDF (mock)')} className="px-3 py-1 bg-blue-600 text-white rounded">Export PDF</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-white border rounded">
              <h3 className="font-medium mb-2">Tourist Flow</h3>
              <TouristFlowChart data={data ? data.touristFlow : []} />
            </div>
            <div className="p-3 bg-white border rounded">
              <h3 className="font-medium mb-2">Safety Score Trend</h3>
              <SafetyTrendChart data={data ? data.safetyTrend : []} />
            </div>
            <div className="p-3 bg-white border rounded">
              <h3 className="font-medium mb-2">High Risk Zones</h3>
              <HighRiskBar data={data ? data.highRiskZones : []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
