import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

/* helper: create tourist id based on document type */
function createTouristId(documentType, idx) {
  // Aadhaar-like: AD-12digits
  if (documentType === 'Aadhaar') {
    const base = (idx * 123457) % 1000000000000 // deterministic-ish
    const num = String(100000000000 + base).slice(-12)
    return `AD-${num}`
  }
  // Passport-like: P-2LETTERS+6DIGITS
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const a = letters[(idx + 3) % 26]
  const b = letters[(idx + 7) % 26]
  const digits = String(100000 + (idx * 71) % 900000).padStart(6, '0')
  return `P-${a}${b}${digits}`
}

export default function Tourists() {
  // generate N mock tourists with varied names, statuses and randomuser portraits
  function generateMock(count = 60) {
    const firstNames = ['Alice','Akshay','Maria','John','Priya','David','Sara','Carlos','Emily','Liam','Noah','Olivia','Ava','Sophia','Mason','Lucas','Amelia','Ethan','Harper','Mia','Rohan','Isha','Zara','Arjun','Nina','Rahul','Maya']
    const lastNames = ['Kumar','Garcia','Smith','Patel','Lee','Kim','Ruiz','Chen','Singh','Sharma','Rao','Das','Nair','Joshi']
    // include Checked In so the status box can report that count
    const statuses = ['Active','Inactive','Checked Out','Checked In']
    const docs = ['Aadhaar','Passport']
    const list = []
    for (let i = 1; i <= count; i++) {
      const fn = firstNames[(i - 1) % firstNames.length]
      const ln = lastNames[(i * 3) % lastNames.length]
      const name = `${fn} ${ln}`
      const documentType = docs[Math.floor(Math.random() * docs.length)]
      const id = createTouristId(documentType, i)
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const gender = (i % 2 === 0) ? 'men' : 'women'
      const picId = ((i * 7) % 99) + 1
      const profileImage = `https://randomuser.me/api/portraits/${gender}/${picId}.jpg`
      list.push({ id, name, documentType, status, profileImage })
    }
    return list
  }

  const [tourists, setTourists] = useState([])
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let mounted = true
    // attempt to use fetchTourists if available, otherwise use generated mock
    if (typeof fetchTourists === 'function') {
      fetchTourists()
        .then(data => { if (mounted) setTourists(Array.isArray(data) ? data : generateMock(60)) })
        .catch(() => { if (mounted) setTourists(generateMock(60)) })
    } else {
      setTourists(generateMock(60))
    }
    return () => { mounted = false }
  }, [])

  // close modal on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const filtered = tourists.filter(t => {
    const s = q.trim().toLowerCase()
    if (!s) return true
    return (t.id || '').toLowerCase().includes(s) || (t.name || '').toLowerCase().includes(s)
  })

  const counts = {
    active: tourists.filter(t => t.status === 'Active').length,
    inactive: tourists.filter(t => t.status === 'Inactive').length,
    checkedOut: tourists.filter(t => t.status === 'Checked Out').length,
    checkedIn: tourists.filter(t => t.status === 'Checked In').length
  }

  function getDot(status) {
    if (status === 'Active') return <span className="inline-block w-3 h-3 rounded-full bg-green-600 mr-2" />
    if (status === 'Inactive') return <span className="inline-block w-3 h-3 rounded-full bg-gray-500 mr-2" />
    if (status === 'Checked Out') return <span className="inline-block w-3 h-3 rounded-full bg-blue-600 mr-2" />
    if (status === 'Checked In') return <span className="inline-block w-3 h-3 rounded-full bg-teal-500 mr-2" />
    return null
  }

  // open detail modal and assign random Age, Alerts, E-FIR and Safety score
  function viewDetails(t) {
    const age = Math.floor(Math.random() * 53) + 18 // 18..70
    const alertsCount = Math.floor(Math.random() * 6) // 0..5
    const efirCount = Math.floor(Math.random() * 4) // 0..3
    const safetyScore = Math.floor(Math.random() * 61) + 40 // 40..100
    setSelected({ ...t, age, alertsCount, efirCount, safetyScore })
  }

  function closeModal() { setSelected(null) }

  return (
    <div
      className="min-h-screen w-full flex"
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
        <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Search */}
          <div className="w-full mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative w-full md:w-96 mx-auto md:mx-0">
                <input
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Search by Name or ID..."
                  className="w-full border border-gray-300 rounded-full px-4 py-3 pl-12 bg-white text-gray-700 focus:outline-none shadow-sm"
                />
                <svg className="absolute left-4 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="bg-white/95 rounded-2xl shadow-lg p-0 overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-gray-700 text-left border-b">
                      <th className="py-4 px-6 font-semibold">Name</th>
                      <th className="py-4 px-6 font-semibold">Status</th>
                      <th className="py-4 px-6 font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={3} className="text-center text-gray-500 py-8">No tourists found.</td>
                      </tr>
                    )}
                    {filtered.map(t => (
                      <tr key={t.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <img src={t.profileImage} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" />
                            <div>
                              <div className="font-medium text-gray-900">{t.name}</div>
                              <div className="text-xs text-gray-500 flex items-center">
                                {getDot(t.status)}
                                <span>{t.status}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-800">{t.status}</td>
                        <td className="py-4 px-6">
                          <button onClick={() => viewDetails(t)} className="text-blue-600 hover:underline font-medium text-sm">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside className="w-full md:w-72 flex-shrink-0">
              <div className="bg-white/95 rounded-2xl shadow-lg p-6">
                <h2 className="font-semibold text-lg mb-4">Tourist Status</h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="inline-block w-4 h-4 rounded-full bg-green-600" />
                    <span className="text-sm">Active Tourists</span>
                    <span className="ml-auto font-bold">{counts.active}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-block w-4 h-4 rounded-full bg-gray-500" />
                    <span className="text-sm">Inactive</span>
                    <span className="ml-auto font-bold">{counts.inactive}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-block w-4 h-4 rounded-full bg-blue-600" />
                    <span className="text-sm">Checked Out</span>
                    <span className="ml-auto font-bold">{counts.checkedOut}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-block w-4 h-4 rounded-full bg-teal-500" />
                    <span className="text-sm">Checked In</span>
                    <span className="ml-auto font-bold">{counts.checkedIn}</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </main>

        {/* Detail modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
            <div className="relative bg-white rounded-xl shadow-xl w-[min(720px,96%)] max-h-[90vh] overflow-auto">
              <div className="flex items-start justify-between p-6 border-b">
                <div className="flex items-center gap-4">
                  <img src={selected.profileImage} alt={selected.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-200" />
                  <div>
                    <div className="text-lg font-bold text-gray-900">{selected.name}</div>
                    <div className="text-sm text-gray-500">{selected.documentType} · {selected.id}</div>
                  </div>
                </div>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">&times;</button>
              </div>

              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="text-sm text-gray-500">Tourist ID</div>
                  <div className="font-medium text-gray-900">{selected.id}</div>

                  <div className="text-sm text-gray-500 mt-4">Age</div>
                  <div className="font-medium text-gray-900">{selected.age}</div>

                  <div className="text-sm text-gray-500 mt-4">Safety Score</div>
                  <div className="flex items-center gap-3">
                    <div className="text-xl font-bold text-indigo-600">{selected.safetyScore}</div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div className="h-3 rounded-full bg-green-400" style={{ width: `${selected.safetyScore}%` }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Alerts</div>
                    <div className="mt-2 flex items-center gap-3">
                      <button className="px-3 py-2 bg-red-100 text-red-700 rounded-md font-semibold">{selected.alertsCount} Alerts</button>
                      <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md" onClick={() => alert(`${selected.alertsCount} alerts for ${selected.name}`)}>View Alerts</button>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500">E - FIRs Registered</div>
                    <div className="mt-2 flex items-center gap-3">
                      <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md font-semibold">{selected.efirCount} E-FIR</button>
                      <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md" onClick={() => alert(`${selected.efirCount} E-FIRs for ${selected.name}`)}>View E-FIRs</button>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500">Quick actions</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button className="px-3 py-2 bg-yellow-50 text-yellow-700 rounded-md">Flag</button>
                      <button className="px-3 py-2 bg-green-50 text-green-700 rounded-md">Send Message</button>
                      <button className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-md">Generate E-FIR</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t flex justify-end gap-3">
                <button onClick={closeModal} className="px-4 py-2 rounded-md bg-white border">Close</button>
                <button onClick={() => { alert('Action executed'); closeModal() }} className="px-4 py-2 rounded-md bg-indigo-600 text-white">Confirm</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
