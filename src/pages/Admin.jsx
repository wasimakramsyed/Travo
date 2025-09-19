import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function Admin() {
  const [users, setUsers] = useState([
    { username: 'admin', role: 'Admin' },
    { username: 'police', role: 'Police' },
    { username: 'tourism', role: 'Tourism' }
  ])
  const [form, setForm] = useState({ username: '', role: 'Tourism' })

  function addUser(e) {
    e.preventDefault()
    setUsers(u => [...u, form])
    setForm({ username: '', role: 'Tourism' })
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col">
        <Navbar />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Admin - Manage Users</h2>
          <form onSubmit={addUser} className="flex gap-2 mb-4">
            <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="username" className="border p-2 rounded" />
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="border p-2 rounded">
              <option>Admin</option>
              <option>Police</option>
              <option>Tourism</option>
            </select>
            <button className="px-3 py-2 bg-green-600 text-white rounded">Add</button>
          </form>

          <div className="space-y-2">
            {users.map(u => (
              <div key={u.username} className="p-3 border rounded flex justify-between items-center">
                <div>{u.username} <span className="text-sm text-gray-500">({u.role})</span></div>
                <button onClick={() => setUsers(us => us.filter(x => x.username !== u.username))} className="px-2 py-1 bg-red-500 text-white rounded text-sm">Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
