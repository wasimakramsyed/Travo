import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const INCIDENTS = [
  { id:'TRV-2025-001', type:'Theft', status:'Open', lastUpdate:'5m ago', lastUpdateMinutes:5, location:'Anandam Beach', description:'Distress signal detected near Anandam Beach — possible vessel in trouble', critical:true },
  { id:'TRV-2025-002', type:'Injury', status:'En Route', lastUpdate:'33m ago', lastUpdateMinutes:33, location:'Havelock Island', description:'Adult reported missing after leaving resort; search teams dispatched', critical:false },
  { id:'TRV-2025-003', type:'Missing', status:'Open', lastUpdate:'7m ago', lastUpdateMinutes:7, location:'North Bay', description:'Child separated from family at beach; last seen near lifeguard post', critical:false },
  { id:'TRV-2025-004', type:'Theft', status:'Resolved', lastUpdate:'1h ago', lastUpdateMinutes:60, location:'SeaView Resort', description:'Reported theft at SeaView Resort; CCTV review ongoing', critical:false },
  { id:'TRV-2025-005', type:'Medical', status:'Pending', lastUpdate:'2h ago', lastUpdateMinutes:120, location:'Cruise Route', description:'Passenger with chest pain on cruise ship; medical team en route', critical:false }
];

const statusColors = {
  Open: 'bg-green-600',
  'En Route': 'bg-orange-500',
  Resolved: 'bg-blue-600',
  Pending: 'bg-gray-500',
  Closed: 'bg-gray-400',
  Investigating: 'bg-yellow-500'
}

export default function Incidents() {
  const [alerts, setAlerts] = useState([])
  const [incidents, setIncidents] = useState(INCIDENTS)
  const [filterType, setFilterType] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterUpdated, setFilterUpdated] = useState('Any')
  const [lastUpdated, setLastUpdated] = useState('just now')

  // map query + small prediction toast
  const [mapQuery, setMapQuery] = useState(INCIDENTS[0]?.location || 'Andaman Islands')
  const [prediction, setPrediction] = useState(null)

  // For E-FIR demo
  function generateEFIR(a) {
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

  // set initial map when incidents load
  useEffect(() => {
    if (incidents && incidents.length > 0) setMapQuery(incidents[0].location)
  }, [incidents])

  // lightweight rule-based predictor for clicked alert
  function predictAlertType(a) {
    const text = ((a.type || '') + ' ' + (a.description || '')).toLowerCase()
    if (text.includes('distress')) return 'Distress'
    if (text.includes('medical') || text.includes('chest') || text.includes('injury')) return 'Medical'
    if (text.includes('missing') || text.includes('separated')) return 'Missing'
    if (text.includes('theft') || text.includes('stolen') || text.includes('cctv')) return 'Theft'
    if (text.includes('injur')) return 'Injury'
    return a.type || 'Unknown'
  }

  // when user clicks an alert block: update map and show prediction toast
  function handleAlertClick(a) {
    const p = predictAlertType(a)
    setPrediction(`${p} (predicted) — location: ${a.location}`)
    setMapQuery(a.location || a.description || a.id)
    // auto-clear toast
    setTimeout(() => setPrediction(null), 3000)
  }

  // Alerts: show top 6, critical first
  useEffect(() => {
    let sorted = [...incidents].sort((a, b) => (b.critical ? 1 : 0) - (a.critical ? 1 : 0))
    setAlerts(sorted.slice(0, 6))
  }, [incidents])

  // Filtered incidents for table
  const filteredIncidents = incidents.filter(i => {
    let ok = true
    if (filterType !== 'All') ok = ok && i.type === filterType
    if (filterStatus !== 'All') ok = ok && i.status === filterStatus
    if (filterUpdated === 'Today' || filterUpdated === '24h') ok = ok && i.lastUpdateMinutes <= 24 * 60
    return ok
  })

  // For filter dropdowns
  const types = Array.from(new Set(incidents.map(i => i.type)))
  const statuses = Array.from(new Set(incidents.map(i => i.status)))

  // Stats
  const activeCases = incidents.filter(i => i.status === 'Open').length
  const avgResponse = '32 mins'
  const totalToday = incidents.length

  // Simulate refresh
  function refresh() {
    setLastUpdated('just now')
    setTimeout(() => setLastUpdated('just now'), 400)
  }

  // Demo: add live alert every 20s
  useEffect(() => {
    const interval = setInterval(() => {
      const nowId = 'TRV-LIVE-' + Date.now().toString().slice(-4)
      const typesArr = ['Medical', 'Missing', 'Theft', 'Injury', 'Distress']
      const t = typesArr[Math.floor(Math.random() * typesArr.length)]
      const newItem = {
        id: nowId,
        type: t,
        status: 'Open',
        lastUpdate: 'Just now',
        lastUpdateMinutes: 0,
        location: 'Unknown',
        description: (t === 'Distress' ? 'Distress signal detected' : t + ' reported'),
        critical: Math.random() > 0.6
      }
      setIncidents(prev => [newItem, ...prev.slice(0, 199)])
    }, 20000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="flex min-h-screen w-full"
      style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.78), rgba(255,255,255,0.78)), url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6">
          {/* make the right column slightly smaller on large screens (fixed 280px) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_320px] gap-6">
            {/* LEFT: SOS Alerts */}
            <section className="bg-white/90 rounded-xl shadow-md border border-slate-100 p-4 flex flex-col order-1 md:order-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 2L3 7v5c0 5 3.9 9.8 9 10 5.1-.2 9-5 9-10V7l-9-5z" fill="#ef4444"/></svg>
                  <span className="font-semibold text-slate-800 text-sm sm:text-base">SOS Alerts</span>
                </div>
                <span className="text-xs text-gray-500">Latest emergency signals</span>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto max-h-[50vh] md:max-h-[62vh] pr-1">
                {alerts.map(a => (
                  <div key={a.id}
                    onClick={() => handleAlertClick(a)}
                    className="flex gap-3 p-3 rounded-lg bg-gradient-to-b from-white to-blue-50 border border-slate-100 items-start hover:shadow-md cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAlertClick(a) }}
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-blue-50 text-blue-700 font-bold text-lg flex-shrink-0">
                      {a.type === 'Medical' ? '❤' : a.type === 'Missing' ? '👤' : '!'}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <div className="font-bold text-slate-800 text-sm sm:text-base">{a.type === 'Distress' ? 'Distress signal' : a.type}</div>
                          <div className="text-xs sm:text-sm text-gray-500 mb-1">{a.description}</div>
                        </div>
                        <div className="flex-shrink-0">
                          {a.critical
                            ? <span className="bg-gradient-to-r from-red-400 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">JUST NOW</span>
                            : <span className="text-xs text-gray-400">{a.lastUpdate}</span>
                          }
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{a.location} · {a.lastUpdate}</div>
                    </div>
                  </div>
                ))}

                {/* small prediction toast */}
                {prediction && (
                  <div className="fixed top-6 right-6 z-40 bg-white/95 shadow-lg border rounded-lg px-4 py-2 text-sm text-gray-700">
                    {prediction}
                  </div>
                )}
               </div>

               <a href="#" className="mt-3 block py-2 rounded-lg text-center text-white bg-gradient-to-r from-blue-400 to-blue-700 font-bold text-sm hover:from-blue-500 hover:to-blue-800 transition">View All Alerts</a>
             </section>

             {/* CENTER: Case Tracking */}
             <section className="bg-white/90 rounded-xl shadow-md border border-slate-100 p-4 flex flex-col order-2 md:order-2 md:col-span-2 lg:col-span-1">
               <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-2">
                   <svg width="16" height="16" viewBox="0 0 24 24"><path d="M3 6h18v13H3z" fill="#2b8de6"/></svg>
                   <span className="font-semibold text-slate-800 text-sm sm:text-base">Case Tracking</span>
                 </div>
                 <span className="text-xs text-gray-500">Updated: {lastUpdated}</span>
               </div>

               <div className="flex flex-wrap gap-2 mb-3">
                 <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-2 sm:px-3 py-2 rounded-lg border border-gray-200 bg-white font-semibold text-gray-700 text-xs sm:text-sm">
                   <option value="All">All Types</option>
                   {types.map(t => <option key={t}>{t}</option>)}
                 </select>
                 <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-2 sm:px-3 py-2 rounded-lg border border-gray-200 bg-white font-semibold text-gray-700 text-xs sm:text-sm">
                   <option value="All">All Statuses</option>
                   {statuses.map(s => <option key={s}>{s}</option>)}
                 </select>
                 <select value={filterUpdated} onChange={e => setFilterUpdated(e.target.value)} className="px-2 sm:px-3 py-2 rounded-lg border border-gray-200 bg-white font-semibold text-gray-700 text-xs sm:text-sm">
                   <option value="Any">Updated: Any</option>
                   <option value="Today">Today</option>
                   <option value="24h">Last 24h</option>
                 </select>
                 <button onClick={refresh} className="ml-auto px-3 py-2 rounded-lg bg-white border border-gray-200 shadow text-xs sm:text-sm font-bold hover:bg-blue-50 transition">⟳ Refresh</button>
               </div>

               <div className="overflow-auto rounded-lg border border-slate-100">
                 <div className="min-w-full overflow-x-auto">
                   <table className="min-w-full bg-transparent text-xs sm:text-sm">
                     <thead>
                       <tr>
                         <th className="py-3 px-2 text-left font-bold text-slate-800">Case ID</th>
                         <th className="py-3 px-2 text-left font-bold text-slate-800">Type</th>
                         <th className="py-3 px-2 text-left font-bold text-slate-800">Status</th>
                         <th className="py-3 px-2 text-left font-bold text-slate-800">Last Update</th>
                       </tr>
                     </thead>
                     <tbody>
                       {filteredIncidents.length === 0 && (
                         <tr>
                           <td colSpan={4} className="py-8 text-center text-gray-400">No cases found</td>
                         </tr>
                       )}
                       {filteredIncidents.map(c => (
                         <tr key={c.id} className="hover:bg-blue-50 cursor-pointer transition" onClick={() => alert('Open details for ' + c.id)}>
                           <td className="py-2 px-2 break-words max-w-[120px] sm:max-w-none">{c.id}</td>
                           <td className="py-2 px-2">{c.type}</td>
                           <td className="py-2 px-2">
                             <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold ${statusColors[c.status] || 'bg-gray-400'}`}>{c.status}</span>
                           </td>
                           <td className="py-2 px-2">{c.lastUpdate}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>
             </section>

             {/* RIGHT: Metrics & Google Map */}
             <aside className="bg-white/90 rounded-xl shadow-md border border-slate-100 p-4 flex flex-col gap-4 order-3 md:order-3">
               <div className="grid grid-cols-1 gap-3">
                 <div className="p-3 rounded-lg bg-gradient-to-b from-white to-blue-50 shadow">
                   <div className="text-gray-500 font-semibold text-xs sm:text-sm">Active Cases</div>
                   <div className="text-xl sm:text-2xl font-extrabold text-blue-700 mt-2">{activeCases}</div>
                 </div>

                 <div className="p-3 rounded-lg bg-gradient-to-b from-white to-blue-50 shadow">
                   <div className="text-gray-500 font-semibold text-xs sm:text-sm">Average Response Time</div>
                   <div className="text-xl sm:text-2xl font-extrabold text-blue-700 mt-2">{avgResponse}</div>
                 </div>

                 <div className="p-3 rounded-lg bg-gradient-to-b from-white to-blue-50 shadow">
                   <div className="text-gray-500 font-semibold text-xs sm:text-sm">Total Incidents Today</div>
                   <div className="text-xl sm:text-2xl font-extrabold text-blue-700 mt-2">{totalToday}</div>
                 </div>

                 <div className="p-2 rounded-lg bg-white shadow">
                   <div className="text-gray-500 font-semibold text-xs sm:text-sm mb-2">Incident Location (Google Maps)</div>
                   <div className="w-full h-48 sm:h-56 rounded-lg overflow-hidden border">
                     <iframe
                       title="incident-map"
                       className="w-full h-full border-0"
                       src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery || '')}&z=12&output=embed`}
                     />
                   </div>
                   <div className="mt-2 text-xs text-gray-500">Click an alert to center the map and see a quick predicted alert type.</div>
                   <a className="mt-2 inline-block text-xs text-blue-600 hover:underline" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery || '')}`}>Open in Google Maps</a>
                 </div>
               </div>
             </aside>
           </div>
         </div>
       </div>
     </div>
   )
 }
